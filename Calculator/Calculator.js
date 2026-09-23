/*
 * Calculator.js — embeddable scientific calculator in a classic Windows-style window.
 *
 * Embed:
 *   <link rel="stylesheet" href="Calculator.css">
 *   <script src="Calculator.js"></script>
 *   <script>
 *     const calc = Calculator.create({ angleMode: 'deg' });   // opens centered
 *   </script>
 *
 * Options (all optional):
 *   parent     element to attach to (default document.body)
 *   x, y       initial position in px (default: centered in the viewport)
 *   angleMode  'deg' | 'rad' | 'grad' (default 'deg')
 *   title      window title (default 'Calculator')
 *   visible    show immediately (default true)
 *   onResult   (value, text) => {}   called each time '=' produces a result
 *   onClose    () => {}              called when the window's close button is clicked
 *
 * Instance: show() hide() toggle() isVisible() focus() moveTo(x, y) clear()
 *           setAngleMode(m) getAngleMode() evaluate(expr) destroy()
 *           .value (last result)   .element (root DOM node)
 *
 * The evaluator also works without the window, e.g. for typed-in dimension fields:
 *   Calculator.evaluate('2*sin(30) + 10^2', { angleMode: 'deg' })   // → 101
 * It throws Calculator.CalcError with a short, user-facing message on bad input.
 *
 * Keyboard (while the calculator has focus):
 *   0-9 . + - * / ^ ( )   Enter or = to calculate   Backspace   Esc to clear
 *   s c t  sin cos tan     i  2nd        h  hyp       q  x²      @  √x      r  1/x
 *   l      log             n  ln         p  π         e  e       x  EXP     m  mod
 *   a      Ans             !  n!         %  percent   F9 ±
 *   F2 / F3 / F4  degrees / radians / grads           Ctrl+C / Ctrl+V  copy result / paste
 *   Backspace right after '=' brings the expression back for editing.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Calculator = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  class CalcError extends Error {
    constructor(message) {
      super(message);
      this.name = 'CalcError';
    }
  }

  const ANGLE_MODES = ['deg', 'rad', 'grad'];

  function checkMode(mode) {
    const m = String(mode || 'deg').toLowerCase();
    if (!ANGLE_MODES.includes(m)) throw new Error('angleMode must be "deg", "rad" or "grad"');
    return m;
  }

  // Up to 15 significant digits, which hides binary noise like 0.1 + 0.2 = 0.30000000000000004.
  function format(v) {
    if (v === 0) return '0';
    const a = Math.abs(v);
    if (a >= 1e15 || a < 1e-6) {
      const [mantissa, exponent] = v.toExponential(14).split('e');
      return mantissa.replace(/\.?0+$/, '') + 'E' + exponent;
    }
    return String(Number(v.toPrecision(15)));
  }

  // ---------------------------------------------------------------------------
  // Tokens
  //
  //   { t: 'num', s: '12.5E-3' }               number as typed
  //   { t: 'num', s, v, sealed: true }         a whole value (result, memory); v keeps full precision
  //   { t: 'const', s: 'π' | 'e' | 'Ans' }
  //   { t: 'fn', s: 'sin', paren }             function; carries its own '(' unless paren === false
  //   { t: '(' }  { t: ')' }
  //   { t: 'op', s: '+' | '−' | '×' | '÷' | '^' | 'mod' | 'yroot' }
  //   { t: 'neg' }                             unary minus
  //   { t: 'post', s: '²' | '³' | '⁻¹' | '!' | '%' }

  const FN_NAMES = {
    sin: 'sin', cos: 'cos', tan: 'tan',
    asin: 'sin⁻¹', acos: 'cos⁻¹', atan: 'tan⁻¹',
    sinh: 'sinh', cosh: 'cosh', tanh: 'tanh',
    asinh: 'sinh⁻¹', acosh: 'cosh⁻¹', atanh: 'tanh⁻¹',
    sqrt: '√', cbrt: '∛', log: 'log', log10: 'log', log2: 'log₂', ln: 'ln', abs: 'abs',
  };
  const CONST_NAMES = { pi: 'π', e: 'e', ans: 'Ans' };
  const OP_CHARS = { '+': '+', '-': '−', '−': '−', '*': '×', '×': '×', '·': '×', '/': '÷', '÷': '÷', '^': '^' };

  const OP = (s) => ({ t: 'op', s });
  const isOperandEnd = (t) => !!t && (t.t === 'num' || t.t === 'const' || t.t === ')' || t.t === 'post');
  const startsOperand = (t) => !!t && (t.t === 'num' || t.t === 'const' || t.t === 'fn' || t.t === '(');
  const isOpen = (t) => t.t === '(' || (t.t === 'fn' && t.paren !== false);

  function tokenize(src, afterOperand) {
    const s = String(src);
    const out = [];
    const prevIsOperand = () => (out.length ? isOperandEnd(out[out.length - 1]) : !!afterOperand);
    const openParen = () => {
      const m = /^\s*\(/.exec(s.slice(i));
      if (m) i += m[0].length;
      return !!m;
    };
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      const rest = s.slice(i);
      if (/\s/.test(c)) { i++; continue; }

      let m = /^(?:\d+\.?\d*|\.\d+)(?:[eE][+\-−]?\d+)?/.exec(rest);
      if (m) {
        out.push({ t: 'num', s: m[0].replace(/e/, 'E').replace('−', '-') });
        i += m[0].length;
        continue;
      }

      m = /^(?:log(?:10|2|₂)|[a-z]+)/i.exec(rest);
      if (m) {
        let name = m[0].toLowerCase().replace('₂', '2');
        let len = m[0].length;
        if (rest.startsWith('⁻¹', len) && FN_NAMES['a' + name]) { name = 'a' + name; len += 2; }
        i += len;
        if (FN_NAMES[name]) out.push({ t: 'fn', s: FN_NAMES[name], paren: openParen() });
        else if (CONST_NAMES[name]) out.push({ t: 'const', s: CONST_NAMES[name] });
        else if (name === 'mod' || name === 'yroot') out.push(OP(name));
        else throw new CalcError('Unknown name "' + m[0] + '"');
        continue;
      }

      if (c === '√' || c === '∛') { i++; out.push({ t: 'fn', s: c, paren: openParen() }); continue; }
      if (c === 'π') { i++; out.push({ t: 'const', s: 'π' }); continue; }
      if (rest.startsWith('**')) { i += 2; out.push(OP('^')); continue; }
      if (rest.startsWith('⁻¹')) { i += 2; out.push({ t: 'post', s: '⁻¹' }); continue; }
      if ('²³!%'.includes(c)) { i++; out.push({ t: 'post', s: c }); continue; }
      if (c === '(' || c === ')') { i++; out.push({ t: c }); continue; }
      if (OP_CHARS[c]) {
        const op = OP_CHARS[c];
        i++;
        if (prevIsOperand() || (op !== '−' && op !== '+')) out.push(OP(op));
        else if (op === '−') out.push({ t: 'neg' });
        continue;
      }
      throw new CalcError('Unexpected "' + c + '"');
    }
    return out;
  }

  function render(tokens) {
    let out = '';
    for (const t of tokens) {
      switch (t.t) {
        case 'num': out += t.sealed && t.v < 0 ? '(−' + t.s.slice(1) + ')' : t.s; break;
        case 'fn': out += t.s + (t.paren === false ? (/\w$/.test(t.s) ? ' ' : '') : '('); break;
        case 'op': out += t.s === '^' ? '^' : ' ' + t.s + ' '; break;
        case 'neg': out += '−'; break;
        case '(': case ')': out += t.t; break;
        default: out += t.s;
      }
    }
    return out;
  }

  // ---------------------------------------------------------------------------
  // Math

  const TURN = { deg: 360, grad: 400 };

  // Math.PI isn't exactly π, so sin(π) comes out as 1.2e-16. Anything that small
  // relative to the angle is rounding noise, not a real answer.
  const snap = (v, rad) => (Math.abs(v) < 1e-15 * Math.abs(rad) ? 0 : v);

  function trig(name, x, mode) {
    if (!Number.isFinite(x)) throw new CalcError('Invalid input');
    let rad = x;
    if (mode !== 'rad') {
      const turn = TURN[mode];
      let a = x % turn;
      if (a < 0) a += turn;
      // Exact answers on the axes: sin(180°) = 0, cos(90°) = 0, tan(90°) is undefined.
      if (a % (turn / 4) === 0) {
        const q = a / (turn / 4);
        if (name === 'sin') return [0, 1, 0, -1][q];
        if (name === 'cos') return [1, 0, -1, 0][q];
        if (q % 2) throw new CalcError('Invalid input');
        return 0;
      }
      rad = a * (2 * Math.PI / turn);
    }
    if (name === 'sin') return snap(Math.sin(rad), rad);
    if (name === 'cos') return snap(Math.cos(rad), rad);
    if (snap(Math.cos(rad), rad) === 0) throw new CalcError('Invalid input');
    return snap(Math.tan(rad), rad);
  }

  // Radians → current unit. Snaps float noise so sin⁻¹(0.5) is 30, not 30.000000000000004.
  function fromRad(r, mode) {
    if (mode === 'rad') return r;
    const v = r * (TURN[mode] / 2) / Math.PI;
    const n = Math.round(v);
    return Math.abs(v - n) < 1e-12 ? n : v;
  }

  // Lanczos approximation (Godfrey's g = 607/128 coefficients), good to ~5e-16 relative.
  const LANCZOS_G = 4.7421875;
  const LANCZOS = [
    0.99999999999999709182, 57.156235665862923517, -59.597960355475491248,
    14.136097974741747174, -0.49191381609762019978, 0.33994649984811888699e-4,
    0.46523628927048575665e-4, -0.98374475304879564677e-4, 0.15808870322491248884e-3,
    -0.21026444172410488319e-3, 0.21743961811521264320e-3, -0.16431810653676389022e-3,
    0.84418223983852743293e-4, -0.26190838401581408670e-4, 0.36899182659531622704e-5,
  ];

  function gamma(z) {
    if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    z -= 1;
    let x = LANCZOS[0];
    for (let k = 1; k < LANCZOS.length; k++) x += LANCZOS[k] / (z + k);
    const t = z + LANCZOS_G + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
  }

  function factorial(x) {
    if (Number.isInteger(x)) {
      if (x < 0) throw new CalcError('Invalid input');
      if (x > 170) throw new CalcError('Overflow');
      let r = 1;
      for (let k = 2; k <= x; k++) r *= k;
      return r;
    }
    const v = gamma(x + 1);   // non-integers: 0.5! = √π / 2
    if (!Number.isFinite(v)) throw new CalcError('Overflow');
    return v;
  }

  function power(base, exp) {
    if (base === 0 && exp < 0) throw new CalcError('Cannot divide by zero');
    const v = Math.pow(base, exp);
    if (Number.isNaN(v)) throw new CalcError('Invalid input');
    if (!Number.isFinite(v)) throw new CalcError('Overflow');
    return v;
  }

  function root(x, n) {
    if (n === 0) throw new CalcError('Invalid input');
    if (x < 0) {
      if (Number.isInteger(n) && n % 2) return -root(-x, n);   // odd roots of negatives are real
      throw new CalcError('Invalid input');
    }
    if (n === 2) return Math.sqrt(x);
    if (n === 3) return Math.cbrt(x);
    return power(x, 1 / n);
  }

  const FNS = {
    'sin': (x, m) => trig('sin', x, m),
    'cos': (x, m) => trig('cos', x, m),
    'tan': (x, m) => trig('tan', x, m),
    'sin⁻¹': (x, m) => fromRad(Math.asin(x), m),
    'cos⁻¹': (x, m) => fromRad(Math.acos(x), m),
    'tan⁻¹': (x, m) => fromRad(Math.atan(x), m),
    'sinh': Math.sinh, 'cosh': Math.cosh, 'tanh': Math.tanh,
    'sinh⁻¹': Math.asinh, 'cosh⁻¹': Math.acosh, 'tanh⁻¹': Math.atanh,
    '√': Math.sqrt, '∛': Math.cbrt,
    'log': Math.log10, 'log₂': Math.log2, 'ln': Math.log,
    'abs': Math.abs,
  };

  function applyFn(name, x, mode) {
    const v = FNS[name](x, mode);
    if (Number.isNaN(v)) throw new CalcError('Invalid input');
    if (!Number.isFinite(v)) {
      // log(0) and tanh⁻¹(1) are undefined; sinh(1000) is just too big.
      const tooBig = name === 'sinh' || name === 'cosh' || !Number.isFinite(x);
      throw new CalcError(tooBig ? 'Overflow' : 'Invalid input');
    }
    return v;
  }

  function parseNumber(s) {
    const v = Number(s.replace(/E[+-]?$/, ''));   // a dangling "1.5E" counts as 1.5
    if (Number.isNaN(v)) throw new CalcError('Invalid input');
    return v;
  }

  // Recursive descent, loosest binding first:
  //   sum      + −
  //   product  × ÷ mod, and implicit multiplication (2π, 3(4+1), 2sin(30))
  //   signed   unary minus, so −3² = −9
  //   exponent ^ yroot, right-associative
  //   postfix  ² ³ ⁻¹ ! %
  //   primary  number, constant, (group), function(group)
  // Unclosed parentheses are closed at the end of input.
  function evaluateTokens(tokens, ctx) {
    const mode = ctx.angleMode || 'deg';
    let i = 0;
    const peek = () => tokens[i];
    const isOp = (t, ...ops) => !!t && t.t === 'op' && ops.includes(t.s);

    function sum() {
      let v = product();
      while (isOp(peek(), '+', '−')) {
        const op = tokens[i++].s;
        const r = product();
        v = op === '+' ? v + r : v - r;
      }
      return v;
    }

    function product() {
      let v = signed();
      for (;;) {
        const t = peek();
        if (isOp(t, '×', '÷', 'mod')) {
          i++;
          const r = signed();
          if (t.s === '×') v *= r;
          else if (r === 0) throw new CalcError('Cannot divide by zero');
          else if (t.s === '÷') v /= r;
          else {
            // Floored modulo, so the sign follows the divisor: −30 mod 360 = 330.
            const m = v % r;
            v = m !== 0 && (m < 0) !== (r < 0) ? m + r : m;
          }
        } else if (startsOperand(t)) {
          v *= signed();
        } else {
          return v;
        }
      }
    }

    function signed() {
      if (peek() && peek().t === 'neg') { i++; return -signed(); }
      return exponent();
    }

    function exponent() {
      const base = postfix();
      const t = peek();
      if (!isOp(t, '^', 'yroot')) return base;
      i++;
      const e = signed();
      return t.s === '^' ? power(base, e) : root(base, e);
    }

    function postfix() {
      let v = primary();
      while (peek() && peek().t === 'post') {
        switch (tokens[i++].s) {
          case '²': v = v * v; break;
          case '³': v = v * v * v; break;
          case '⁻¹':
            if (v === 0) throw new CalcError('Cannot divide by zero');
            v = 1 / v;
            break;
          case '!': v = factorial(v); break;
          case '%': v = v / 100; break;
        }
      }
      return v;
    }

    function primary() {
      const t = tokens[i++];
      if (!t) throw new CalcError('Incomplete expression');
      switch (t.t) {
        case 'num': return t.v !== undefined ? t.v : parseNumber(t.s);
        case 'const': return t.s === 'π' ? Math.PI : t.s === 'e' ? Math.E : (ctx.ans || 0);
        case '(': return group();
        case 'fn': return applyFn(t.s, t.paren === false ? bareArg() : group(), mode);
      }
      throw new CalcError('Invalid input');
    }

    function group() {
      const v = sum();
      if (peek() && peek().t === ')') i++;
      else if (peek()) throw new CalcError('Invalid input');
      return v;
    }

    // Argument of a function typed without parentheses: √2, sin 30, √-4
    function bareArg() {
      if (peek() && peek().t === 'neg') { i++; return -bareArg(); }
      return postfix();
    }

    const v = sum();
    if (i < tokens.length) {
      throw new CalcError(tokens[i].t === ')' ? 'Mismatched parentheses' : 'Invalid input');
    }
    if (Number.isNaN(v)) throw new CalcError('Invalid input');
    if (!Number.isFinite(v)) throw new CalcError('Overflow');
    return v === 0 ? 0 : v;   // no −0
  }

  function evaluate(expr, options) {
    const o = options || {};
    return evaluateTokens(tokenize(expr), { angleMode: checkMode(o.angleMode), ans: o.ans || 0 });
  }

  // ---------------------------------------------------------------------------
  // Keys

  const trigName = (base, st) => base + (st.hyp ? 'h' : '') + (st.second ? '⁻¹' : '');

  const KEYS = {
    second: { label: '2nd', hint: 'Second functions (I)', toggle: 'second', run: (a) => a.toggle('second') },
    hyp: { label: 'hyp', hint: 'Hyperbolic (H)', toggle: 'hyp', run: (a) => a.toggle('hyp') },
    ans: { label: 'Ans', hint: 'Last answer (A)', run: (a) => a.constant('Ans') },
    sin: { label: (st) => trigName('sin', st), hint: 'Sine (S)', run: (a, st) => a.fn(trigName('sin', st)) },
    cos: { label: (st) => trigName('cos', st), hint: 'Cosine (C)', run: (a, st) => a.fn(trigName('cos', st)) },
    tan: { label: (st) => trigName('tan', st), hint: 'Tangent (T)', run: (a, st) => a.fn(trigName('tan', st)) },
    sq: { label: (st) => (st.second ? 'x³' : 'x²'), hint: 'Square / cube (Q)', run: (a, st) => a.postfix(st.second ? '³' : '²') },
    pow: { label: (st) => (st.second ? 'ʸ√x' : 'xʸ'), hint: 'Power / y-th root (^)', run: (a, st) => a.binary(st.second ? 'yroot' : '^') },
    sqrt: { label: (st) => (st.second ? '∛x' : '√x'), hint: 'Square / cube root (@)', run: (a, st) => a.fn(st.second ? '∛' : '√') },
    tenx: { label: (st) => (st.second ? '2ˣ' : '10ˣ'), hint: 'Power of 10 / power of 2', run: (a, st) => a.powerOf(st.second ? '2' : '10') },
    log: { label: (st) => (st.second ? 'log₂' : 'log'), hint: 'Log base 10 / base 2 (L)', run: (a, st) => a.fn(st.second ? 'log₂' : 'log') },
    ln: { label: (st) => (st.second ? 'eˣ' : 'ln'), hint: 'Natural log / eˣ (N)', run: (a, st) => (st.second ? a.powerOf('e') : a.fn('ln')) },
    inv: { label: '1/x', hint: 'Reciprocal (R)', run: (a) => a.postfix('⁻¹') },
    fact: { label: 'n!', hint: 'Factorial (!)', run: (a) => a.postfix('!') },
    abs: { label: '|x|', hint: 'Absolute value', run: (a) => a.fn('abs') },
    pi: { label: 'π', hint: 'Pi (P)', run: (a) => a.constant('π') },
    e: { label: 'e', hint: "Euler's number (E)", run: (a) => a.constant('e') },
    mod: { label: 'mod', hint: 'Modulo (M)', run: (a) => a.binary('mod') },
    exp: { label: 'EXP', hint: 'Exponent: 1.5 EXP 3 = 1500 (X)', run: (a) => a.exp() },
    pct: { label: '%', hint: 'Percent (%)', run: (a) => a.postfix('%') },
    neg: { label: '±', hint: 'Negate (F9)', run: (a) => a.negate() },
    mc: { label: 'MC', hint: 'Memory clear', run: (a) => a.memClear() },
    mr: { label: 'MR', hint: 'Memory recall', run: (a) => a.memRecall() },
    mplus: { label: 'M+', hint: 'Add to memory', run: (a) => a.memAdd(1) },
    mminus: { label: 'M−', hint: 'Subtract from memory', run: (a) => a.memAdd(-1) },
    clear: { label: 'C', hint: 'Clear (Esc)', run: (a) => a.clear() },
    back: { label: '⌫', hint: 'Backspace', run: (a) => a.backspace() },
    lparen: { label: '(', run: (a) => a.lparen() },
    rparen: { label: ')', run: (a) => a.rparen() },
    div: { label: '÷', run: (a) => a.binary('÷') },
    mul: { label: '×', run: (a) => a.binary('×') },
    sub: { label: '−', run: (a) => a.binary('−') },
    add: { label: '+', run: (a) => a.binary('+') },
    dot: { label: '.', digit: true, run: (a) => a.digit('.') },
    eq: { label: '=', hint: 'Equals (Enter)', run: (a) => a.equals() },
  };
  for (let d = 0; d <= 9; d++) KEYS['d' + d] = { label: String(d), digit: true, run: (a) => a.digit(String(d)) };

  const SCI_LAYOUT = [
    'second', 'hyp', 'ans',
    'sin', 'cos', 'tan',
    'sq', 'pow', 'sqrt',
    'tenx', 'log', 'ln',
    'inv', 'fact', 'abs',
    'pi', 'e', 'mod',
    'exp', 'pct', 'neg',
  ];
  const STD_LAYOUT = [
    'mc', 'mr', 'mplus', 'mminus',
    'clear', 'back', 'lparen', 'rparen',
    'd7', 'd8', 'd9', 'div',
    'd4', 'd5', 'd6', 'mul',
    'd1', 'd2', 'd3', 'sub',
    'd0', 'dot', 'add',
    'eq',
  ];
  const WIDE = { d0: 2, eq: 4 };

  const KEYBOARD = {
    '+': 'add', '-': 'sub', '*': 'mul', '/': 'div', '^': 'pow', '(': 'lparen', ')': 'rparen',
    '.': 'dot', ',': 'dot', '=': 'eq', Enter: 'eq', Backspace: 'back', Escape: 'clear', Delete: 'clear',
    '!': 'fact', '%': 'pct', '@': 'sqrt', F9: 'neg',
    s: 'sin', c: 'cos', t: 'tan', i: 'second', h: 'hyp', q: 'sq', r: 'inv', l: 'log', n: 'ln',
    p: 'pi', e: 'e', x: 'exp', m: 'mod', a: 'ans',
  };
  for (let d = 0; d <= 9; d++) KEYBOARD[d] = 'd' + d;
  const ANGLE_KEYS = { F2: 'deg', F3: 'rad', F4: 'grad' };

  // ---------------------------------------------------------------------------
  // Engine: keypad state machine, no DOM. The window below is one view of it.

  function createEngine(options) {
    const opts = options || {};
    const st = {
      tokens: [],
      lastTokens: [],
      history: '',
      justEvaluated: false,
      error: null,
      ans: 0,
      memory: 0,
      hasMemory: false,
      angleMode: checkMode(opts.angleMode),
      second: false,
      hyp: false,
    };

    const last = () => st.tokens[st.tokens.length - 1];
    const push = (...t) => st.tokens.push(...t);
    const ctx = () => ({ angleMode: st.angleMode, ans: st.ans });
    const sealed = (v) => ({ t: 'num', s: format(v), v, sealed: true });

    function openCount(tokens) {
      let n = 0;
      for (const t of tokens) n += isOpen(t) ? 1 : t.t === ')' ? -1 : 0;
      return n;
    }

    function closed(tokens) {
      const out = tokens.slice();
      for (let n = openCount(tokens); n > 0; n--) out.push({ t: ')' });
      return out;
    }

    function tryEvaluate(tokens) {
      try {
        return evaluateTokens(closed(tokens), ctx());
      } catch (e) {
        if (e instanceof CalcError) return e;
        throw e;
      }
    }

    // Starting a new number after '=' begins a new calculation...
    function fresh() {
      if (!st.justEvaluated) return;
      st.tokens = [];
      st.history = '';
      st.justEvaluated = false;
    }
    // ...while an operator or function carries on from the result.
    function resume() {
      st.justEvaluated = false;
    }

    // Index where the trailing operand starts (including any unary minus), or -1.
    function operandStart() {
      const toks = st.tokens;
      let k = toks.length - 1;
      while (k >= 0 && toks[k].t === 'post') k--;
      if (k < 0) return -1;
      if (toks[k].t === ')') {
        for (let depth = 0; k >= 0; k--) {
          if (toks[k].t === ')') depth++;
          else if (isOpen(toks[k]) && --depth === 0) break;
        }
        if (k < 0) return -1;
      } else if (toks[k].t !== 'num' && toks[k].t !== 'const') {
        return -1;
      }
      while (k > 0 && toks[k - 1].t === 'neg') k--;
      return k;
    }

    function currentValue() {
      if (st.justEvaluated) return st.ans;
      if (!st.tokens.length) return 0;
      const v = tryEvaluate(st.tokens);
      if (v instanceof CalcError) { st.error = v.message; return null; }
      return v;
    }

    const actions = {
      digit(d) {
        fresh();
        const t = last();
        if (t && t.t === 'num' && !t.sealed) {
          if (d === '.' && /[.E]/.test(t.s)) return;
          if (t.s.length >= 24) return;
          t.s = t.s === '0' && d !== '.' ? d : t.s + d;
          return;
        }
        if (t && t.sealed) st.tokens.pop();   // typing replaces a recalled value
        else if (isOperandEnd(t)) push(OP('×'));
        push({ t: 'num', s: d === '.' ? '0.' : d });
      },

      exp() {
        const t = last();
        if (t && t.t === 'num' && !t.sealed && !t.s.includes('E')) t.s += 'E';
      },

      constant(name) {
        fresh();
        if (isOperandEnd(last())) push(OP('×'));
        push({ t: 'const', s: name });
      },

      value(v) {
        fresh();
        const t = last();
        if (t && t.t === 'num') st.tokens.pop();
        else if (isOperandEnd(t)) push(OP('×'));
        push(sealed(v));
      },

      binary(op) {
        resume();
        const t = last();
        if (!t) {
          if (op === '−') push({ t: 'neg' });
          else push({ t: 'num', s: '0' }, OP(op));
        } else if (t.t === 'num' && /E$/.test(t.s) && op === '−') {
          t.s += '-';   // 1.5 EXP − 3
        } else if (t.t === 'op') {
          if (op === '−') push({ t: 'neg' });
          else t.s = op;   // change your mind: 5 × then + gives 5 +
        } else if (t.t === 'neg') {
          if (op === '−') return;
          st.tokens.pop();
          const p = last();
          if (p && p.t === 'op') p.s = op;
        } else if (t.t === '(' || t.t === 'fn') {
          if (op === '−') push({ t: 'neg' });
        } else {
          push(OP(op));
        }
      },

      postfix(p) {
        resume();
        if (isOperandEnd(last())) push({ t: 'post', s: p });
      },

      // sin, √, log…: wraps the number just entered (Windows style), or starts "sin(" if there is none.
      fn(name) {
        resume();
        const f = { t: 'fn', s: name, paren: true };
        const k = operandStart();
        if (k < 0) push(f);
        else if (st.tokens[k].t === '(' && last().t === ')') st.tokens[k] = f;
        else { st.tokens.splice(k, 0, f); push({ t: ')' }); }
      },

      // 10ˣ, 2ˣ, eˣ: same idea, producing 10^(…)
      powerOf(base) {
        resume();
        const b = base === 'e' ? { t: 'const', s: 'e' } : { t: 'num', s: base };
        const k = operandStart();
        if (k < 0) push(b, OP('^'), { t: '(' });
        else if (st.tokens[k].t === '(' && last().t === ')') st.tokens.splice(k, 0, b, OP('^'));
        else { st.tokens.splice(k, 0, b, OP('^'), { t: '(' }); push({ t: ')' }); }
      },

      negate() {
        resume();
        const t = last();
        if (t && t.t === 'num' && t.sealed) {
          Object.assign(t, sealed(-t.v));
        } else if (t && t.t === 'num' && t.s.includes('E')) {
          t.s = t.s.includes('E-') ? t.s.replace('E-', 'E') : t.s.replace('E', 'E-');   // exponent sign
        } else {
          const k = operandStart();
          if (k >= 0) {
            if (st.tokens[k].t === 'neg') st.tokens.splice(k, 1);
            else st.tokens.splice(k, 0, { t: 'neg' });
          } else if (t && t.t === 'neg') {
            st.tokens.pop();
          } else {
            push({ t: 'neg' });
          }
        }
      },

      lparen() {
        fresh();
        if (isOperandEnd(last())) push(OP('×'));
        push({ t: '(' });
      },

      rparen() {
        if (st.justEvaluated) return;
        if (openCount(st.tokens) > 0 && isOperandEnd(last())) push({ t: ')' });
      },

      backspace() {
        if (st.justEvaluated) {
          st.tokens = st.lastTokens.map((t) => Object.assign({}, t));
          st.justEvaluated = false;
          return;
        }
        const t = last();
        if (!t) return;
        if (t.t === 'num' && !t.sealed && t.s.length > 1) t.s = t.s.slice(0, -1);
        else st.tokens.pop();
      },

      clear() {
        st.tokens = [];
        st.history = '';
        st.justEvaluated = false;
        st.error = null;
      },

      equals() {
        if (st.justEvaluated || !st.tokens.length) return;
        const toks = closed(st.tokens);
        const v = tryEvaluate(st.tokens);
        if (v instanceof CalcError) { st.error = v.message; return; }
        st.lastTokens = toks;
        st.history = render(toks) + ' =';
        st.ans = v;
        st.tokens = [sealed(v)];
        st.justEvaluated = true;
        if (opts.onResult) opts.onResult(v, format(v));
      },

      memClear() {
        st.memory = 0;
        st.hasMemory = false;
      },

      memRecall() {
        actions.value(st.memory);
      },

      memAdd(sign) {
        const v = currentValue();
        if (v === null) return;
        st.memory += sign * v;
        st.hasMemory = true;
      },

      toggle(flag) {
        st[flag] = !st[flag];
      },
    };

    // Live result while typing. A trailing operator or open bracket is ignored,
    // so "2 + 3 ×" previews 5.
    function preview() {
      const toks = st.tokens.slice();
      while (toks.length && /^(op|neg|\(|fn)$/.test(toks[toks.length - 1].t)) toks.pop();
      if (!toks.length) return 0;
      const v = tryEvaluate(toks);
      return v instanceof CalcError ? null : v;
    }

    function view() {
      let result, kind;
      if (st.error) { result = st.error; kind = 'error'; }
      else if (st.justEvaluated) { result = format(st.ans); kind = 'final'; }
      else if (!st.tokens.length) { result = '0'; kind = 'empty'; }
      else { const v = preview(); result = v === null ? '' : format(v); kind = 'preview'; }
      return {
        expr: st.justEvaluated ? st.history : render(st.tokens),
        result,
        kind,
        angleMode: st.angleMode,
        second: st.second,
        hyp: st.hyp,
        hasMemory: st.hasMemory,
      };
    }

    return {
      state: st,
      view,
      press(id) {
        const key = KEYS[id];
        if (!key) return;
        st.error = null;
        key.run(actions, st);
      },
      label(id) {
        const l = KEYS[id].label;
        return typeof l === 'function' ? l(st) : l;
      },
      setAngleMode(mode) {
        st.angleMode = checkMode(mode);
      },
      evaluate(expr) {
        return evaluateTokens(tokenize(expr), ctx());
      },
      paste(text) {
        let toks;
        try {
          toks = tokenize(String(text).trim(), !st.justEvaluated && isOperandEnd(last()));
        } catch (e) {
          if (!(e instanceof CalcError)) throw e;
          st.error = "Can't paste that";
          return;
        }
        if (!toks.length) return;
        fresh();
        if (isOperandEnd(last()) && startsOperand(toks[0])) push(OP('×'));
        push(...toks);
      },
      copyText() {
        const v = view();
        return (v.kind !== 'error' && v.result) || v.expr;
      },
    };
  }

  // ---------------------------------------------------------------------------
  // Window

  const TEMPLATE = `
    <div class="calc-titlebar">
      <svg class="calc-icon" viewBox="0 0 14 14" aria-hidden="true">
        <rect x="2.5" y="0.5" width="9" height="13" fill="#c9d0d7" stroke="#000"/>
        <rect x="4" y="2" width="6" height="3" fill="#fff" stroke="#000" stroke-width="0.8"/>
        <path fill="#000" d="M4 7h1.5v1.5H4zM6.25 7h1.5v1.5h-1.5zM8.5 7H10v1.5H8.5zM4 9.75h1.5v1.5H4zM6.25 9.75h1.5v1.5h-1.5zM8.5 9.75H10v1.5H8.5z"/>
      </svg>
      <span class="calc-title"></span>
      <button type="button" class="calc-caption-btn" data-cmd="minimize" tabindex="-1" title="Minimize" aria-label="Minimize">
        <svg viewBox="0 0 8 7" aria-hidden="true"><path d="M1 6h5" stroke-width="2"/></svg>
      </button>
      <button type="button" class="calc-caption-btn" data-cmd="close" tabindex="-1" title="Close" aria-label="Close">
        <svg viewBox="0 0 8 7" aria-hidden="true"><path d="M1 0.5l6 6M7 0.5l-6 6" stroke-width="1.5"/></svg>
      </button>
    </div>
    <div class="calc-body">
      <div class="calc-display">
        <div class="calc-status">
          <span data-ref="mode"></span><span data-ref="flags"></span><span class="calc-mem" data-ref="mem">M</span>
        </div>
        <div class="calc-expr" data-ref="expr"></div>
        <div class="calc-result" data-ref="result" aria-live="polite"></div>
      </div>
      <div class="calc-angles" role="radiogroup" aria-label="Angle unit">
        <label><input type="radio" value="deg"> Degrees</label>
        <label><input type="radio" value="rad"> Radians</label>
        <label><input type="radio" value="grad"> Grads</label>
      </div>
      <div class="calc-keys">
        <div class="calc-keypad calc-keypad-sci" data-ref="sci"></div>
        <div class="calc-keypad calc-keypad-std" data-ref="std"></div>
      </div>
    </div>`;

  let instanceCount = 0;

  function create(options) {
    const opts = Object.assign({ angleMode: 'deg', visible: true, title: 'Calculator' }, options);
    const doc = document;
    const engine = createEngine(opts);
    const id = ++instanceCount;

    const rootEl = doc.createElement('div');
    rootEl.className = 'calc-window';
    rootEl.tabIndex = 0;
    rootEl.hidden = true;
    rootEl.setAttribute('role', 'application');
    rootEl.setAttribute('aria-label', opts.title);
    rootEl.innerHTML = TEMPLATE;
    rootEl.querySelector('.calc-title').textContent = opts.title;

    const ref = (name) => rootEl.querySelector('[data-ref="' + name + '"]');
    const refs = { mode: ref('mode'), flags: ref('flags'), mem: ref('mem'), expr: ref('expr'), result: ref('result') };
    const titlebar = rootEl.querySelector('.calc-titlebar');
    const radios = Array.from(rootEl.querySelectorAll('.calc-angles input'));

    const buttons = {};
    function addKeys(container, layout) {
      for (const key of layout) {
        const def = KEYS[key];
        const b = doc.createElement('button');
        b.type = 'button';
        b.tabIndex = -1;
        b.className = 'calc-key' + (def.digit ? ' calc-key-digit' : '') + (key === 'eq' ? ' calc-key-eq' : '');
        b.dataset.key = key;
        if (WIDE[key]) b.style.gridColumn = 'span ' + WIDE[key];
        if (def.hint) b.title = def.hint;
        if (def.toggle) b.setAttribute('aria-pressed', 'false');
        container.appendChild(b);
        buttons[key] = b;
      }
    }
    addKeys(ref('sci'), SCI_LAYOUT);
    addKeys(ref('std'), STD_LAYOUT);

    const focus = () => rootEl.focus({ preventScroll: true });

    function fitResult() {
      const r = refs.result;
      let size = 30;
      r.style.fontSize = size + 'px';
      while (r.scrollWidth > r.clientWidth && size > 12) r.style.fontSize = --size + 'px';
    }

    function update() {
      const v = engine.view();
      refs.expr.textContent = v.expr;
      refs.expr.scrollLeft = refs.expr.scrollWidth;
      refs.result.textContent = v.result;
      refs.result.className = 'calc-result' + (v.kind === 'preview' ? ' is-preview' : '');
      fitResult();
      refs.mode.textContent = v.angleMode.toUpperCase();
      refs.flags.textContent = [v.second && '2nd', v.hyp && 'HYP'].filter(Boolean).join(' ');
      refs.mem.style.visibility = v.hasMemory ? 'visible' : 'hidden';
      for (const key in buttons) {
        const label = engine.label(key);
        if (buttons[key].textContent !== label) buttons[key].textContent = label;
        if (KEYS[key].toggle) buttons[key].setAttribute('aria-pressed', String(!!engine.state[KEYS[key].toggle]));
      }
      for (const r of radios) r.checked = r.value === v.angleMode;
    }

    const flashTimers = {};
    function press(key, flash) {
      engine.press(key);
      update();
      const b = buttons[key];
      if (flash && b) {
        clearTimeout(flashTimers[key]);
        b.classList.add('is-down');
        flashTimers[key] = setTimeout(() => b.classList.remove('is-down'), 110);
      }
    }

    function setAngleMode(mode) {
      engine.setAngleMode(mode);
      update();
    }

    // Position -----------------------------------------------------------------

    const pos = { x: 0, y: 0 };
    let placed = false;

    function moveTo(x, y) {
      const maxX = Math.max(0, window.innerWidth - rootEl.offsetWidth);
      const maxY = Math.max(0, window.innerHeight - rootEl.offsetHeight);
      pos.x = Math.round(Math.min(Math.max(0, x), maxX));
      pos.y = Math.round(Math.min(Math.max(0, y), maxY));
      rootEl.style.left = pos.x + 'px';
      rootEl.style.top = pos.y + 'px';
    }

    function place() {
      if (placed) return moveTo(pos.x, pos.y);
      placed = true;
      if (opts.x != null || opts.y != null) moveTo(opts.x || 0, opts.y || 0);
      else moveTo((window.innerWidth - rootEl.offsetWidth) / 2, (window.innerHeight - rootEl.offsetHeight) / 2);
    }

    const onResize = () => { if (!rootEl.hidden) moveTo(pos.x, pos.y); };
    window.addEventListener('resize', onResize);

    titlebar.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || e.target.closest('button')) return;
      e.preventDefault();
      focus();
      const sx = e.clientX, sy = e.clientY, ox = pos.x, oy = pos.y;
      titlebar.setPointerCapture(e.pointerId);
      const move = (ev) => moveTo(ox + ev.clientX - sx, oy + ev.clientY - sy);
      const end = () => {
        titlebar.removeEventListener('pointermove', move);
        titlebar.removeEventListener('pointerup', end);
        titlebar.removeEventListener('pointercancel', end);
      };
      titlebar.addEventListener('pointermove', move);
      titlebar.addEventListener('pointerup', end);
      titlebar.addEventListener('pointercancel', end);
    });

    // Input ----------------------------------------------------------------------

    rootEl.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.key) press(b.dataset.key);
      else if (b.dataset.cmd === 'minimize') {
        // Hold the width, or the title bar shrinks to fit the title text.
        rootEl.style.width = rootEl.classList.contains('is-minimized') ? '' : rootEl.offsetWidth + 'px';
        rootEl.classList.toggle('is-minimized');
      }
      else if (b.dataset.cmd === 'close') {
        api.hide();
        if (opts.onClose) opts.onClose();
        return;
      }
      focus();   // keep keyboard input on the window, not the clicked button
    });

    for (const r of radios) {
      r.name = 'calc-angle-' + id;
      r.addEventListener('change', () => {
        setAngleMode(r.value);
        focus();
      });
    }

    rootEl.addEventListener('keydown', (e) => {
      // Leave Ctrl/Cmd shortcuts (copy, paste…) alone, but allow AltGr characters like @ on European layouts.
      if ((e.ctrlKey || e.metaKey || e.altKey) && !e.getModifierState('AltGraph')) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (ANGLE_KEYS[key]) setAngleMode(ANGLE_KEYS[key]);
      else if (KEYBOARD[key]) press(KEYBOARD[key], true);
      else return;
      e.preventDefault();
      e.stopPropagation();   // keep calculator typing from triggering the host app's shortcuts
    });

    rootEl.addEventListener('copy', (e) => {
      const sel = doc.getSelection();
      if (sel && !sel.isCollapsed) return;   // normal copy of text selected in the display
      e.clipboardData.setData('text/plain', engine.copyText());
      e.preventDefault();
    });

    rootEl.addEventListener('paste', (e) => {
      e.preventDefault();
      engine.paste(e.clipboardData.getData('text/plain'));
      update();
    });

    // Public API -------------------------------------------------------------------

    const api = {
      element: rootEl,
      show() {
        rootEl.hidden = false;
        place();
        update();
        focus();
        return api;
      },
      hide() {
        rootEl.hidden = true;
        return api;
      },
      toggle() {
        return rootEl.hidden ? api.show() : api.hide();
      },
      isVisible: () => !rootEl.hidden,
      focus() {
        focus();
        return api;
      },
      moveTo(x, y) {
        placed = true;
        moveTo(x, y);
        return api;
      },
      clear() {
        press('clear');
        return api;
      },
      setAngleMode(mode) {
        setAngleMode(mode);
        return api;
      },
      getAngleMode: () => engine.state.angleMode,
      evaluate: (expr) => engine.evaluate(expr),
      get value() {
        return engine.state.ans;
      },
      destroy() {
        window.removeEventListener('resize', onResize);
        rootEl.remove();
      },
    };

    (opts.parent || doc.body).appendChild(rootEl);
    update();
    if (opts.visible) {
      rootEl.hidden = false;   // shown without stealing focus from the host app
      place();
      update();
    }
    return api;
  }

  return { create, evaluate, format, createEngine, CalcError };
}));

// GravyCAD coordinate law:
//
// This program is built by a machinist, for machinists.
//
// X0 Y0 is the point where the axes cross.
// X+ moves right.
// Y+ moves up.
// Therefore X+ Y+ is the upper-right quadrant.
//
// SVG/browser coordinates normally put positive Y downward.
// That is NOT GravyCAD's user-facing coordinate system.
// Any SVG weirdness must be handled internally.

const cadCanvas = document.querySelector("#cadCanvas");
const gridLayer = document.querySelector("#gridLayer");
const axisLayer = document.querySelector("#axisLayer");

const VIEW = {
  xMin: -7.111,
  xMax: 7.111,
  yMin: -4,
  yMax: 4,
};
const ORIGIN = {
  x: 0,
  y: 0,
};
function createSvgElement(type, attributes) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", type);

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
}

function drawLine(parent, x1, y1, x2, y2, className) {
  const line = createSvgElement("line", {
    x1,
    y1,
    x2,
    y2,
    class: className,
  });

  parent.appendChild(line);
}

function drawAxesAndTicks() {
  gridLayer.innerHTML = "";
  axisLayer.innerHTML = "";

  const halfTick = 0.5;
  const tickSizeHalfInch = 0.06;
  const tickSizeFullInch = 0.12;

  // X axis
  drawLine(axisLayer, VIEW.xMin, 0, VIEW.xMax, 0, "axis-line");

  // Y axis
  drawLine(axisLayer, 0, VIEW.yMin, 0, VIEW.yMax, "axis-line");

  // Ticks along X axis
  for (let x = Math.ceil(VIEW.xMin * 2) / 2; x <= VIEW.xMax; x += halfTick) {
    if (Math.abs(x) < 0.0001) continue;

    const isFullInch = Math.abs(x % 1) < 0.0001;
    const tickSize = isFullInch ? tickSizeFullInch : tickSizeHalfInch;
    const className = isFullInch ? "tick-full" : "tick-half";

    drawLine(axisLayer, x, -tickSize, x, tickSize, className);
  }

  // Ticks along Y axis
  for (let y = Math.ceil(VIEW.yMin * 2) / 2; y <= VIEW.yMax; y += halfTick) {
    if (Math.abs(y) < 0.0001) continue;

    const isFullInch = Math.abs(y % 1) < 0.0001;
    const tickSize = isFullInch ? tickSizeFullInch : tickSizeHalfInch;
    const className = isFullInch ? "tick-full" : "tick-half";

    drawLine(axisLayer, -tickSize, y, tickSize, y, className);
  }
}

drawAxesAndTicks();

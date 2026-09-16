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
const entityLayer = document.querySelector("#entityLayer");
const worldLayer = document.querySelector("#worldLayer");
const pointCoordinatesWindow = document.querySelector("#pointCoordinatesWindow");
const pointWindowTitleBar = document.querySelector("#pointWindowTitleBar");
const pointCoordinatesForm = document.querySelector("#pointCoordinatesForm");
const pointCoordinatesMenu = document.querySelector("#pointCoordinatesMenu");
const pointMinimizeButton = document.querySelector("#pointMinimizeButton");
const pointMaximizeButton = document.querySelector("#pointMaximizeButton");
const pointMaximizeIcon = document.querySelector("#pointMaximizeIcon");
const pointCloseButton = document.querySelector("#pointCloseButton");
const pointContinueButton = document.querySelector("#pointContinueButton");
const pointCancelButton = document.querySelector("#pointCancelButton");
const pointXInput = document.querySelector("#pointX");
const pointYInput = document.querySelector("#pointY");
const toolMessage = document.querySelector("#toolMessage");
const zoomInMenu = document.querySelector("#zoomInMenu");
const zoomOutMenu = document.querySelector("#zoomOutMenu");
const homeViewMenu = document.querySelector("#homeViewMenu");
const graniteThemeMenu = document.querySelector("#graniteThemeMenu");
const lightThemeMenu = document.querySelector("#lightThemeMenu");
const darkThemeMenu = document.querySelector("#darkThemeMenu");
const matrixThemeMenu = document.querySelector("#matrixThemeMenu");
const themeMenuItem = graniteThemeMenu.closest(".menu-item");
const themeMenuButton = themeMenuItem.querySelector(".menu-button");
const singleSelectMenu = document.querySelector("#singleSelectMenu");
const cursorX = document.querySelector("#cursorX");
const cursorY = document.querySelector("#cursorY");
const zoomStatus = document.querySelector("#zoomStatus");
const entityCount = document.querySelector("#entityCount");
const commandStatus = document.querySelector("#commandStatus");

const documentModel = {
  entities: [],
  nextEntityId: 1,
};

const BASE_VIEW = {
  width: 14.222,
  height: 8,
};

const ZOOM_STEP = 0.2;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 5;

const THEME_MENUS = {
  granite: graniteThemeMenu,
  light: lightThemeMenu,
  dark: darkThemeMenu,
  matrix: matrixThemeMenu,
};

const THEME_DISPLAY_NAMES = {
  granite: "Granite",
  light: "Light",
  dark: "Dark",
  matrix: "Matrix",
};

const viewState = {
  zoom: 1,
};

const selectionState = {
  mode: null,
  selectedEntityId: null,
};

const pointWindowState = {
  hasPosition: false,
  restoreBounds: null,
  drag: null,
};

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

function fitViewToCanvas() {
  const pixelWidth = cadCanvas.clientWidth;
  const pixelHeight = cadCanvas.clientHeight;
  if (pixelWidth === 0 || pixelHeight === 0) return;

  const canvasAspect = pixelWidth / pixelHeight;
  const baseAspect = BASE_VIEW.width / BASE_VIEW.height;
  let viewWidth = BASE_VIEW.width;
  let viewHeight = BASE_VIEW.height;

  if (canvasAspect > baseAspect) {
    viewWidth = viewHeight * canvasAspect;
  } else {
    viewHeight = viewWidth / canvasAspect;
  }

  viewWidth /= viewState.zoom;
  viewHeight /= viewState.zoom;

  VIEW.xMin = ORIGIN.x - viewWidth / 2;
  VIEW.xMax = ORIGIN.x + viewWidth / 2;
  VIEW.yMin = ORIGIN.y - viewHeight / 2;
  VIEW.yMax = ORIGIN.y + viewHeight / 2;

  cadCanvas.setAttribute(
    "viewBox",
    `${VIEW.xMin} ${VIEW.yMin} ${viewWidth} ${viewHeight}`,
  );
  drawAxesAndTicks();
  renderEntities();
}

function setZoom(nextZoom, actionName) {
  viewState.zoom = Math.min(
    MAX_ZOOM,
    Math.max(MIN_ZOOM, Math.round(nextZoom * 10) / 10),
  );
  fitViewToCanvas();

  const zoomPercent = Math.round(viewState.zoom * 100);
  zoomStatus.textContent = `Zoom: ${zoomPercent}%`;
  commandStatus.textContent = `${actionName}: ${zoomPercent}%`;
}

function zoomIn() {
  setZoom(viewState.zoom + ZOOM_STEP, "Zoom In");
}

function zoomOut() {
  setZoom(viewState.zoom - ZOOM_STEP, "Zoom Out");
}

function homeView() {
  setZoom(1, "Home");
}

function applyTheme(themeName) {
  document.body.dataset.theme = themeName;

  Object.entries(THEME_MENUS).forEach(([menuTheme, menuButton]) => {
    const isCurrentTheme = menuTheme === themeName;
    menuButton.classList.toggle("current-menu-option", isCurrentTheme);
    menuButton.setAttribute("aria-pressed", String(isCurrentTheme));
  });

  commandStatus.textContent = `Theme: ${THEME_DISPLAY_NAMES[themeName]}`;
}

function closeThemeMenu() {
  themeMenuItem.classList.add("is-dismissed");
  document.activeElement?.blur();
}

function selectTheme(themeName) {
  applyTheme(themeName);
  closeThemeMenu();
}

function activateSingleSelect() {
  selectionState.mode = "single";
  cadCanvas.classList.add("select-single");
  commandStatus.textContent = "Select: Single";
}

function formatCoordinate(value) {
  const normalizedValue = Math.abs(value) < 0.00005 ? 0 : value;
  return normalizedValue.toFixed(4);
}

function renderPoint(point) {
  const pointGroup = createSvgElement("g", {
    class:
      selectionState.selectedEntityId === point.id
        ? "point-entity is-selected"
        : "point-entity",
    "data-entity-id": point.id,
  });

  // Counter the view zoom so point markers keep the same on-screen size.
  const pointDiagonal = 0.15 / viewState.zoom;
  const diagonalOffset = pointDiagonal / (2 * Math.SQRT2);
  pointGroup.appendChild(
    createSvgElement("circle", {
      cx: point.x,
      cy: point.y,
      r: 0.14 / viewState.zoom,
      class: "entity-hit-target",
    }),
  );

  drawLine(
    pointGroup,
    point.x - diagonalOffset,
    point.y - diagonalOffset,
    point.x + diagonalOffset,
    point.y + diagonalOffset,
    "point-x",
  );
  drawLine(
    pointGroup,
    point.x - diagonalOffset,
    point.y + diagonalOffset,
    point.x + diagonalOffset,
    point.y - diagonalOffset,
    "point-x",
  );

  const title = createSvgElement("title", {});
  title.textContent = `Point ${point.id}: X${formatCoordinate(point.x)} Y${formatCoordinate(point.y)}`;
  pointGroup.appendChild(title);
  entityLayer.appendChild(pointGroup);
}

function renderEntities() {
  entityLayer.innerHTML = "";

  documentModel.entities.forEach((entity) => {
    if (entity.type === "point") renderPoint(entity);
  });

  entityCount.textContent = `Entities: ${documentModel.entities.length}`;
}

function addPoint(x, y) {
  const point = {
    id: documentModel.nextEntityId,
    type: "point",
    x,
    y,
  };

  documentModel.nextEntityId += 1;
  documentModel.entities.push(point);
  renderEntities();
  return point;
}

function activatePointCoordinates() {
  commandStatus.textContent = "Point: Coordinates";
  toolMessage.textContent = "Enter the point coordinates.";
  pointCoordinatesWindow.hidden = false;
  setPointWindowMinimized(false);

  if (!pointWindowState.hasPosition) {
    positionPointWindowInitially();
  }

  pointXInput.focus();
  pointXInput.select();
}

function positionPointWindowInitially() {
  const windowBounds = pointCoordinatesWindow.getBoundingClientRect();
  const left = Math.max(8, window.innerWidth - windowBounds.width - 24);
  const top = Math.min(112, Math.max(8, window.innerHeight - windowBounds.height - 36));

  pointCoordinatesWindow.style.left = `${left}px`;
  pointCoordinatesWindow.style.top = `${top}px`;
  pointWindowState.hasPosition = true;
}

function setPointWindowMinimized(minimized) {
  pointCoordinatesWindow.classList.toggle("is-minimized", minimized);
  pointMinimizeButton.setAttribute(
    "aria-label",
    minimized ? "Restore Point Coordinates" : "Minimize Point Coordinates",
  );
  pointMinimizeButton.title = minimized ? "Restore" : "Minimize";
}

function restorePointWindow() {
  pointCoordinatesWindow.classList.remove("is-maximized");

  if (pointWindowState.restoreBounds) {
    const { left, top, width } = pointWindowState.restoreBounds;
    pointCoordinatesWindow.style.left = `${left}px`;
    pointCoordinatesWindow.style.top = `${top}px`;
    pointCoordinatesWindow.style.width = `${width}px`;
  }

  pointMaximizeButton.setAttribute("aria-label", "Maximize Point Coordinates");
  pointMaximizeButton.title = "Maximize";
  pointMaximizeIcon.textContent = "□";
}

function togglePointWindowMaximized() {
  setPointWindowMinimized(false);

  if (pointCoordinatesWindow.classList.contains("is-maximized")) {
    restorePointWindow();
    return;
  }

  const bounds = pointCoordinatesWindow.getBoundingClientRect();
  pointWindowState.restoreBounds = {
    left: bounds.left,
    top: bounds.top,
    width: bounds.width,
  };
  pointCoordinatesWindow.classList.add("is-maximized");
  pointMaximizeButton.setAttribute("aria-label", "Restore Point Coordinates");
  pointMaximizeButton.title = "Restore";
  pointMaximizeIcon.textContent = "❐";
}

function closePointCoordinatesWindow(statusMessage = "Ready") {
  if (pointCoordinatesWindow.classList.contains("is-maximized")) {
    restorePointWindow();
  }

  setPointWindowMinimized(false);
  pointCoordinatesWindow.hidden = true;
  commandStatus.textContent = statusMessage;
}

function createPointFromInputs(keepDialogOpen) {
  if (!pointCoordinatesForm.reportValidity()) return;

  const x = Number(pointXInput.value);
  const y = Number(pointYInput.value);

  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    toolMessage.textContent = "Enter a valid number for both X and Y.";
    return;
  }

  const point = addPoint(x, y);
  const resultMessage = `Created point ${point.id} at X${formatCoordinate(x)} Y${formatCoordinate(y)}.`;

  if (keepDialogOpen) {
    toolMessage.textContent = resultMessage;
    pointXInput.focus();
    pointXInput.select();
    return;
  }

  closePointCoordinatesWindow(resultMessage);
}

function screenToWorld(event) {
  const screenPoint = cadCanvas.createSVGPoint();
  screenPoint.x = event.clientX;
  screenPoint.y = event.clientY;
  return screenPoint.matrixTransform(worldLayer.getScreenCTM().inverse());
}

pointCoordinatesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createPointFromInputs(false);
});

pointCoordinatesMenu.addEventListener("click", activatePointCoordinates);

zoomInMenu.addEventListener("click", zoomIn);
zoomOutMenu.addEventListener("click", zoomOut);
homeViewMenu.addEventListener("click", homeView);
themeMenuButton.addEventListener("click", () => {
  themeMenuItem.classList.remove("is-dismissed");
});
themeMenuItem.addEventListener("pointerleave", () => {
  themeMenuItem.classList.remove("is-dismissed");
});
Object.entries(THEME_MENUS).forEach(([themeName, menuButton]) => {
  menuButton.addEventListener("click", () => selectTheme(themeName));
});
singleSelectMenu.addEventListener("click", activateSingleSelect);

cadCanvas.addEventListener("click", (event) => {
  if (selectionState.mode !== "single") return;

  const entityElement = event.target.closest(".point-entity");

  if (entityElement) {
    selectionState.selectedEntityId = Number(entityElement.dataset.entityId);
    renderEntities();
    commandStatus.textContent = `Selected point ${selectionState.selectedEntityId}`;
    return;
  }

  selectionState.selectedEntityId = null;
  renderEntities();
  commandStatus.textContent = "Selection cleared";
});

pointMinimizeButton.addEventListener("click", () => {
  if (pointCoordinatesWindow.classList.contains("is-maximized")) {
    restorePointWindow();
  }

  const minimized = !pointCoordinatesWindow.classList.contains("is-minimized");
  setPointWindowMinimized(minimized);
});

pointMaximizeButton.addEventListener("click", togglePointWindowMaximized);

pointCloseButton.addEventListener("click", () => {
  closePointCoordinatesWindow();
});

pointContinueButton.addEventListener("click", () => {
  createPointFromInputs(true);
});

pointCancelButton.addEventListener("click", () => {
  closePointCoordinatesWindow();
});

pointWindowTitleBar.addEventListener("pointerdown", (event) => {
  if (
    event.button !== 0 ||
    event.target.closest(".window-control") ||
    pointCoordinatesWindow.classList.contains("is-maximized")
  ) {
    return;
  }

  const bounds = pointCoordinatesWindow.getBoundingClientRect();
  pointWindowState.drag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - bounds.left,
    offsetY: event.clientY - bounds.top,
  };
  pointWindowTitleBar.classList.add("is-dragging");
  pointWindowTitleBar.setPointerCapture(event.pointerId);
});

pointWindowTitleBar.addEventListener("pointermove", (event) => {
  const drag = pointWindowState.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;

  const bounds = pointCoordinatesWindow.getBoundingClientRect();
  const maxLeft = Math.max(0, window.innerWidth - bounds.width);
  const maxTop = Math.max(0, window.innerHeight - pointWindowTitleBar.offsetHeight);
  const left = Math.min(maxLeft, Math.max(0, event.clientX - drag.offsetX));
  const top = Math.min(maxTop, Math.max(0, event.clientY - drag.offsetY));

  pointCoordinatesWindow.style.left = `${left}px`;
  pointCoordinatesWindow.style.top = `${top}px`;
  pointWindowState.hasPosition = true;
});

function stopPointWindowDrag(event) {
  if (pointWindowState.drag?.pointerId !== event.pointerId) return;

  pointWindowState.drag = null;
  pointWindowTitleBar.classList.remove("is-dragging");
  if (pointWindowTitleBar.hasPointerCapture(event.pointerId)) {
    pointWindowTitleBar.releasePointerCapture(event.pointerId);
  }
}

pointWindowTitleBar.addEventListener("pointerup", stopPointWindowDrag);
pointWindowTitleBar.addEventListener("pointercancel", stopPointWindowDrag);

pointWindowTitleBar.addEventListener("dblclick", (event) => {
  if (!event.target.closest(".window-control")) {
    togglePointWindowMaximized();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !pointCoordinatesWindow.hidden) {
    closePointCoordinatesWindow();
  }
});

window.addEventListener("resize", () => {
  fitViewToCanvas();

  if (
    pointCoordinatesWindow.hidden ||
    pointCoordinatesWindow.classList.contains("is-maximized")
  ) {
    return;
  }

  const bounds = pointCoordinatesWindow.getBoundingClientRect();
  const left = Math.min(bounds.left, Math.max(0, window.innerWidth - bounds.width));
  const top = Math.min(
    bounds.top,
    Math.max(0, window.innerHeight - pointWindowTitleBar.offsetHeight),
  );
  pointCoordinatesWindow.style.left = `${Math.max(0, left)}px`;
  pointCoordinatesWindow.style.top = `${Math.max(0, top)}px`;
});

cadCanvas.addEventListener("mousemove", (event) => {
  const worldPoint = screenToWorld(event);
  cursorX.textContent = `X: ${formatCoordinate(worldPoint.x)}`;
  cursorY.textContent = `Y: ${formatCoordinate(worldPoint.y)}`;
});

cadCanvas.addEventListener("mouseleave", () => {
  cursorX.textContent = "X: ----";
  cursorY.textContent = "Y: ----";
});

fitViewToCanvas();

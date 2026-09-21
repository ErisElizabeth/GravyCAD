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
const previewLayer = document.querySelector("#previewLayer");
const worldLayer = document.querySelector("#worldLayer");
const pointCoordinatesWindow = document.querySelector("#pointCoordinatesWindow");
const pointWindowTitleBar = document.querySelector("#pointWindowTitleBar");
const pointCoordinatesForm = document.querySelector("#pointCoordinatesForm");
const pointCoordinatesMenu = document.querySelector("#pointCoordinatesMenu");
const pointIntersectMenu = document.querySelector("#pointIntersectMenu");
const pointOnEntityMenu = document.querySelector("#pointOnEntityMenu");
const exportDxfMenu = document.querySelector("#exportDxfMenu");
const fileMenuItem = exportDxfMenu.closest(".menu-item");
const fileMenuButton = fileMenuItem.querySelector(".menu-button");
const lineJoinMenu = document.querySelector("#lineJoinMenu");
const circleCenterRadiusMenu = document.querySelector("#circleCenterRadiusMenu");
const drawMenuItem = lineJoinMenu.closest(".menu-item");
const drawMenuButton = drawMenuItem.querySelector(".menu-button");
const undoMenu = document.querySelector("#undoMenu");
const redoMenu = document.querySelector("#redoMenu");
const deleteMenu = document.querySelector("#deleteMenu");
const editMenuItem = undoMenu.closest(".menu-item");
const editMenuButton = editMenuItem.querySelector(".menu-button");
const pointMinimizeButton = document.querySelector("#pointMinimizeButton");
const pointMaximizeButton = document.querySelector("#pointMaximizeButton");
const pointMaximizeIcon = document.querySelector("#pointMaximizeIcon");
const pointCloseButton = document.querySelector("#pointCloseButton");
const pointContinueButton = document.querySelector("#pointContinueButton");
const pointCancelButton = document.querySelector("#pointCancelButton");
const pointXInput = document.querySelector("#pointX");
const pointYInput = document.querySelector("#pointY");
const toolMessage = document.querySelector("#toolMessage");
const circleRadiusWindow = document.querySelector("#circleRadiusWindow");
const circleWindowTitleBar = document.querySelector("#circleWindowTitleBar");
const circleRadiusForm = document.querySelector("#circleRadiusForm");
const circleRadiusInput = document.querySelector("#circleRadius");
const circleCenterReadout = document.querySelector("#circleCenterReadout");
const circleToolMessage = document.querySelector("#circleToolMessage");
const circleCreateButton = document.querySelector("#circleCreateButton");
const circleMinimizeButton = document.querySelector("#circleMinimizeButton");
const circleMaximizeButton = document.querySelector("#circleMaximizeButton");
const circleMaximizeIcon = document.querySelector("#circleMaximizeIcon");
const circleCloseButton = document.querySelector("#circleCloseButton");
const circleCancelButton = document.querySelector("#circleCancelButton");
const trimExtendMenu = document.querySelector("#trimExtendMenu");
const offsetMenu = document.querySelector("#offsetMenu");
const modifyMenuItem = offsetMenu.closest(".menu-item");
const modifyMenuButton = modifyMenuItem.querySelector(".menu-button");
const offsetWindow = document.querySelector("#offsetWindow");
const offsetWindowTitleBar = document.querySelector("#offsetWindowTitleBar");
const offsetForm = document.querySelector("#offsetForm");
const offsetAmountInput = document.querySelector("#offsetAmount");
const offsetSourceReadout = document.querySelector("#offsetSourceReadout");
const offsetToolMessage = document.querySelector("#offsetToolMessage");
const offsetMinimizeButton = document.querySelector("#offsetMinimizeButton");
const offsetMaximizeButton = document.querySelector("#offsetMaximizeButton");
const offsetMaximizeIcon = document.querySelector("#offsetMaximizeIcon");
const offsetCloseButton = document.querySelector("#offsetCloseButton");
const offsetCancelButton = document.querySelector("#offsetCancelButton");
const pointOnEntityWindow = document.querySelector("#pointOnEntityWindow");
const pointOnEntityWindowTitleBar = document.querySelector(
  "#pointOnEntityWindowTitleBar",
);
const pointOnEntityForm = document.querySelector("#pointOnEntityForm");
const pointOnEntitySourceReadout = document.querySelector(
  "#pointOnEntitySourceReadout",
);
const pointOnEntityValueLabel = document.querySelector(
  "#pointOnEntityValueLabel",
);
const pointOnEntityUnit = document.querySelector("#pointOnEntityUnit");
const pointOnEntityValueInput = document.querySelector("#pointOnEntityValue");
const pointOnEntityToolMessage = document.querySelector(
  "#pointOnEntityToolMessage",
);
const pointOnEntityCreateButton = document.querySelector(
  "#pointOnEntityCreateButton",
);
const pointOnEntityMinimizeButton = document.querySelector(
  "#pointOnEntityMinimizeButton",
);
const pointOnEntityMaximizeButton = document.querySelector(
  "#pointOnEntityMaximizeButton",
);
const pointOnEntityMaximizeIcon = document.querySelector(
  "#pointOnEntityMaximizeIcon",
);
const pointOnEntityCloseButton = document.querySelector(
  "#pointOnEntityCloseButton",
);
const pointOnEntityCancelButton = document.querySelector(
  "#pointOnEntityCancelButton",
);
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
const entityHoverInfo = document.querySelector("#entityHoverInfo");

const documentModel = {
  entities: [],
  nextEntityId: 1,
};

const HISTORY_LIMIT = 100;
const historyState = {
  undoStack: [],
  redoStack: [],
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

const joinState = {
  active: false,
  firstPointId: null,
  previewWorld: null,
};

const circleState = {
  active: false,
  centerPointId: null,
};

const intersectionState = {
  active: false,
  firstEntityId: null,
};

const offsetState = {
  active: false,
  sourceEntityId: null,
};

const trimExtendState = {
  active: false,
  sourceEntityId: null,
  endpointProperty: null,
  sourcePickWorld: null,
};

const pointOnEntityState = {
  active: false,
  sourceEntityId: null,
  zeroPointId: null,
  zeroChoiceIndex: null,
  awaitingDirection: false,
  directionChoices: [],
  linePercentage: 50,
  angleDegrees: 0,
};

const GEOMETRY_EPSILON = 1e-9;

const pointWindowState = {
  hasPosition: false,
  restoreBounds: null,
  drag: null,
};

const circleWindowState = {
  hasPosition: false,
  restoreBounds: null,
  drag: null,
};

const offsetWindowState = {
  hasPosition: false,
  restoreBounds: null,
  drag: null,
};

const pointOnEntityWindowState = {
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
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);
  selectionState.mode = "single";
  cadCanvas.classList.add("select-single");
  commandStatus.textContent = "Select: Single";
}

function formatCoordinate(value) {
  const normalizedValue = Math.abs(value) < 0.00005 ? 0 : value;
  return normalizedValue.toFixed(4);
}

function getEntityDescription(entity) {
  if (entity.type === "point") {
    return `Point ${entity.id}: X${formatCoordinate(entity.x)} Y${formatCoordinate(entity.y)}`;
  }

  if (entity.type === "line") {
    const startPoint = getPointById(entity.startPointId);
    const endPoint = getPointById(entity.endPointId);
    if (!startPoint || !endPoint) return `Line ${entity.id}`;
    const length = Math.hypot(
      endPoint.x - startPoint.x,
      endPoint.y - startPoint.y,
    );
    return `Line ${entity.id}: Length ${formatCoordinate(length)}`;
  }

  if (entity.type === "circle") {
    const centerPoint = getPointById(entity.centerPointId);
    if (!centerPoint) return `Circle ${entity.id}`;
    return (
      `Circle ${entity.id}: X${formatCoordinate(centerPoint.x)} ` +
      `Y${formatCoordinate(centerPoint.y)} R${formatCoordinate(entity.radius)}`
    );
  }

  if (entity.type === "arc") {
    const centerPoint = getPointById(entity.centerPointId);
    const startPoint = getPointById(entity.startPointId);
    const endPoint = getPointById(entity.endPointId);
    if (!centerPoint || !startPoint || !endPoint) return `Arc ${entity.id}`;
    const startAngle = Math.atan2(
      startPoint.y - centerPoint.y,
      startPoint.x - centerPoint.x,
    );
    const endAngle = Math.atan2(
      endPoint.y - centerPoint.y,
      endPoint.x - centerPoint.x,
    );
    const sweepDegrees =
      (getCounterClockwiseSweep(startAngle, endAngle) * 180) / Math.PI;
    return (
      `Arc ${entity.id}: X${formatCoordinate(centerPoint.x)} ` +
      `Y${formatCoordinate(centerPoint.y)} R${formatCoordinate(entity.radius)} ` +
      `Sweep ${formatCoordinate(sweepDegrees)}°`
    );
  }

  return `Entity ${entity.id}`;
}

function formatDxfNumber(value) {
  const normalizedValue = Math.abs(value) <= 1e-12 ? 0 : value;
  return normalizedValue
    .toFixed(12)
    .replace(/\.?0+$/, "");
}

function appendDxfPair(lines, code, value) {
  lines.push(String(code), String(value));
}

function appendDxfEntity(lines, type, layer, values) {
  appendDxfPair(lines, 0, type);
  appendDxfPair(lines, 8, layer);
  values.forEach(([code, value]) => appendDxfPair(lines, code, value));
}

function getDxfExportData() {
  const records = [];
  const extents = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
  };

  function includePoint(x, y) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    extents.minX = Math.min(extents.minX, x);
    extents.minY = Math.min(extents.minY, y);
    extents.maxX = Math.max(extents.maxX, x);
    extents.maxY = Math.max(extents.maxY, y);
  }

  documentModel.entities.forEach((entity) => {
    if (entity.type === "point") {
      if (!Number.isFinite(entity.x) || !Number.isFinite(entity.y)) return;
      includePoint(entity.x, entity.y);
      records.push({
        type: "POINT",
        layer: "POINTS",
        values: [
          [10, formatDxfNumber(entity.x)],
          [20, formatDxfNumber(entity.y)],
          [30, "0"],
        ],
      });
      return;
    }

    if (entity.type === "line") {
      const endpoints = getLineEndpointPair(entity);
      if (!endpoints) return;
      const { startPoint, endPoint } = endpoints;
      includePoint(startPoint.x, startPoint.y);
      includePoint(endPoint.x, endPoint.y);
      records.push({
        type: "LINE",
        layer: "GEOMETRY",
        values: [
          [10, formatDxfNumber(startPoint.x)],
          [20, formatDxfNumber(startPoint.y)],
          [30, "0"],
          [11, formatDxfNumber(endPoint.x)],
          [21, formatDxfNumber(endPoint.y)],
          [31, "0"],
        ],
      });
      return;
    }

    if (entity.type === "circle") {
      const centerPoint = getPointById(entity.centerPointId);
      if (!centerPoint || !Number.isFinite(entity.radius) || entity.radius <= 0) {
        return;
      }
      includePoint(centerPoint.x - entity.radius, centerPoint.y - entity.radius);
      includePoint(centerPoint.x + entity.radius, centerPoint.y + entity.radius);
      records.push({
        type: "CIRCLE",
        layer: "GEOMETRY",
        values: [
          [10, formatDxfNumber(centerPoint.x)],
          [20, formatDxfNumber(centerPoint.y)],
          [30, "0"],
          [40, formatDxfNumber(entity.radius)],
        ],
      });
      return;
    }

    if (entity.type === "arc") {
      const centerPoint = getPointById(entity.centerPointId);
      const startPoint = getPointById(entity.startPointId);
      const endPoint = getPointById(entity.endPointId);
      if (
        !centerPoint ||
        !startPoint ||
        !endPoint ||
        !Number.isFinite(entity.radius) ||
        entity.radius <= 0
      ) {
        return;
      }

      const startAngle =
        (normalizeAngle(
          Math.atan2(
            startPoint.y - centerPoint.y,
            startPoint.x - centerPoint.x,
          ),
        ) *
          180) /
        Math.PI;
      const endAngle =
        (normalizeAngle(
          Math.atan2(endPoint.y - centerPoint.y, endPoint.x - centerPoint.x),
        ) *
          180) /
        Math.PI;
      includePoint(centerPoint.x - entity.radius, centerPoint.y - entity.radius);
      includePoint(centerPoint.x + entity.radius, centerPoint.y + entity.radius);
      records.push({
        type: "ARC",
        layer: "GEOMETRY",
        values: [
          [10, formatDxfNumber(centerPoint.x)],
          [20, formatDxfNumber(centerPoint.y)],
          [30, "0"],
          [40, formatDxfNumber(entity.radius)],
          [50, formatDxfNumber(startAngle)],
          [51, formatDxfNumber(endAngle)],
        ],
      });
    }
  });

  if (!records.length) return { records, extents: null };
  return { records, extents };
}

function createDxfDocument() {
  const { records, extents } = getDxfExportData();
  if (!extents) return { content: null, entityCount: 0 };

  const lines = [];
  appendDxfPair(lines, 999, "GravyCAD R12 ASCII DXF - drawing units are inches");
  appendDxfPair(lines, 0, "SECTION");
  appendDxfPair(lines, 2, "HEADER");
  appendDxfPair(lines, 9, "$ACADVER");
  appendDxfPair(lines, 1, "AC1009");
  appendDxfPair(lines, 9, "$MEASUREMENT");
  appendDxfPair(lines, 70, 0);
  appendDxfPair(lines, 9, "$EXTMIN");
  appendDxfPair(lines, 10, formatDxfNumber(extents.minX));
  appendDxfPair(lines, 20, formatDxfNumber(extents.minY));
  appendDxfPair(lines, 30, 0);
  appendDxfPair(lines, 9, "$EXTMAX");
  appendDxfPair(lines, 10, formatDxfNumber(extents.maxX));
  appendDxfPair(lines, 20, formatDxfNumber(extents.maxY));
  appendDxfPair(lines, 30, 0);
  appendDxfPair(lines, 0, "ENDSEC");

  appendDxfPair(lines, 0, "SECTION");
  appendDxfPair(lines, 2, "TABLES");
  appendDxfPair(lines, 0, "TABLE");
  appendDxfPair(lines, 2, "LTYPE");
  appendDxfPair(lines, 70, 1);
  appendDxfPair(lines, 0, "LTYPE");
  appendDxfPair(lines, 2, "CONTINUOUS");
  appendDxfPair(lines, 70, 0);
  appendDxfPair(lines, 3, "Solid line");
  appendDxfPair(lines, 72, 65);
  appendDxfPair(lines, 73, 0);
  appendDxfPair(lines, 40, 0);
  appendDxfPair(lines, 0, "ENDTAB");
  appendDxfPair(lines, 0, "TABLE");
  appendDxfPair(lines, 2, "LAYER");
  appendDxfPair(lines, 70, 2);
  ["POINTS", "GEOMETRY"].forEach((layerName) => {
    appendDxfPair(lines, 0, "LAYER");
    appendDxfPair(lines, 2, layerName);
    appendDxfPair(lines, 70, 0);
    appendDxfPair(lines, 62, 7);
    appendDxfPair(lines, 6, "CONTINUOUS");
  });
  appendDxfPair(lines, 0, "ENDTAB");
  appendDxfPair(lines, 0, "ENDSEC");

  appendDxfPair(lines, 0, "SECTION");
  appendDxfPair(lines, 2, "ENTITIES");
  records.forEach((record) => {
    appendDxfEntity(lines, record.type, record.layer, record.values);
  });
  appendDxfPair(lines, 0, "ENDSEC");
  appendDxfPair(lines, 0, "EOF");

  return {
    content: `${lines.join("\r\n")}\r\n`,
    entityCount: records.length,
  };
}

function dismissFileMenu() {
  fileMenuItem.classList.add("is-dismissed");
  document.activeElement?.blur();
}

function exportDxf() {
  dismissFileMenu();
  clearEntityHoverInfo();
  const { content, entityCount: exportedEntityCount } = createDxfDocument();
  if (!content) {
    commandStatus.textContent = "Export DXF: There are no entities to export.";
    return;
  }

  const blob = new Blob([content], { type: "application/dxf;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = downloadUrl;
  downloadLink.download = "GravyCAD.dxf";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
  commandStatus.textContent =
    `Exported ${exportedEntityCount} ${exportedEntityCount === 1 ? "entity" : "entities"} ` +
    "to GravyCAD.dxf.";
}

function clearEntityHoverInfo() {
  entityHoverInfo.hidden = true;
  entityHoverInfo.textContent = "";
  entityHoverInfo.removeAttribute("data-entity-id");
  commandStatus.hidden = false;
}

function updateEntityHoverInfo(target) {
  const entityElement = target.closest(
    ".point-entity, .line-entity, .circle-entity, .arc-entity",
  );
  if (!entityElement) {
    clearEntityHoverInfo();
    return;
  }

  const entityId = Number(entityElement.dataset.entityId);
  if (entityHoverInfo.dataset.entityId === String(entityId)) return;
  const entity = getEntityById(entityId);
  if (!entity) {
    clearEntityHoverInfo();
    return;
  }

  entityHoverInfo.dataset.entityId = String(entityId);
  entityHoverInfo.textContent = getEntityDescription(entity);
  commandStatus.hidden = true;
  entityHoverInfo.hidden = false;
}

function renderPoint(point) {
  const isDirectionChoice = pointOnEntityState.directionChoices.some(
    (choice) => choice.pointId === point.id,
  );
  const pointGroup = createSvgElement("g", {
    class: [
      "point-entity",
      selectionState.selectedEntityId === point.id ? "is-selected" : "",
      joinState.firstPointId === point.id ? "is-join-start" : "",
      circleState.centerPointId === point.id ? "is-circle-center" : "",
      pointOnEntityState.awaitingDirection && isDirectionChoice
        ? "is-point-on-entity-direction"
        : "",
      pointOnEntityState.zeroPointId === point.id
        ? "is-point-on-entity-zero"
        : "",
    ]
      .filter(Boolean)
      .join(" "),
    "data-entity-id": point.id,
    "data-entity-type": point.type,
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

function getPointById(pointId) {
  return documentModel.entities.find(
    (entity) => entity.type === "point" && entity.id === pointId,
  );
}

function renderLineEntity(lineEntity) {
  const startPoint = getPointById(lineEntity.startPointId);
  const endPoint = getPointById(lineEntity.endPointId);
  if (!startPoint || !endPoint) return;

  const lineGroup = createSvgElement("g", {
    class: [
      "line-entity",
      selectionState.selectedEntityId === lineEntity.id ? "is-selected" : "",
      intersectionState.firstEntityId === lineEntity.id
        ? "is-intersection-first"
        : "",
      offsetState.sourceEntityId === lineEntity.id ? "is-offset-source" : "",
      trimExtendState.sourceEntityId === lineEntity.id
        ? "is-trim-extend-source"
        : "",
      pointOnEntityState.sourceEntityId === lineEntity.id
        ? "is-point-on-entity-source"
        : "",
    ]
      .filter(Boolean)
      .join(" "),
    "data-entity-id": lineEntity.id,
    "data-entity-type": lineEntity.type,
  });

  drawLine(
    lineGroup,
    startPoint.x,
    startPoint.y,
    endPoint.x,
    endPoint.y,
    "line-hit-target",
  );
  drawLine(
    lineGroup,
    startPoint.x,
    startPoint.y,
    endPoint.x,
    endPoint.y,
    "line-geometry",
  );

  const title = createSvgElement("title", {});
  title.textContent = `Line ${lineEntity.id}: Point ${startPoint.id} to Point ${endPoint.id}`;
  lineGroup.appendChild(title);
  entityLayer.appendChild(lineGroup);
}

function renderCircleEntity(circleEntity) {
  const centerPoint = getPointById(circleEntity.centerPointId);
  if (!centerPoint) return;

  const circleGroup = createSvgElement("g", {
    class: [
      "circle-entity",
      selectionState.selectedEntityId === circleEntity.id ? "is-selected" : "",
      intersectionState.firstEntityId === circleEntity.id
        ? "is-intersection-first"
        : "",
      offsetState.sourceEntityId === circleEntity.id ? "is-offset-source" : "",
      trimExtendState.sourceEntityId === circleEntity.id
        ? "is-trim-extend-source"
        : "",
      pointOnEntityState.sourceEntityId === circleEntity.id
        ? "is-point-on-entity-source"
        : "",
    ]
      .filter(Boolean)
      .join(" "),
    "data-entity-id": circleEntity.id,
    "data-entity-type": circleEntity.type,
  });

  circleGroup.appendChild(
    createSvgElement("circle", {
      cx: centerPoint.x,
      cy: centerPoint.y,
      r: circleEntity.radius,
      class: "circle-hit-target",
    }),
  );
  circleGroup.appendChild(
    createSvgElement("circle", {
      cx: centerPoint.x,
      cy: centerPoint.y,
      r: circleEntity.radius,
      class: "circle-geometry",
    }),
  );

  const title = createSvgElement("title", {});
  title.textContent = `Circle ${circleEntity.id}: Center point ${centerPoint.id}, radius ${formatCoordinate(circleEntity.radius)}`;
  circleGroup.appendChild(title);
  entityLayer.appendChild(circleGroup);
}

function renderArcEntity(arcEntity) {
  const centerPoint = getPointById(arcEntity.centerPointId);
  const startPoint = getPointById(arcEntity.startPointId);
  const endPoint = getPointById(arcEntity.endPointId);
  if (!centerPoint || !startPoint || !endPoint) return;

  const startAngle = Math.atan2(
    startPoint.y - centerPoint.y,
    startPoint.x - centerPoint.x,
  );
  const endAngle = Math.atan2(
    endPoint.y - centerPoint.y,
    endPoint.x - centerPoint.x,
  );
  const sweep = getCounterClockwiseSweep(startAngle, endAngle);
  if (sweep <= GEOMETRY_EPSILON) return;

  const arcPath = [
    `M ${startPoint.x} ${startPoint.y}`,
    `A ${arcEntity.radius} ${arcEntity.radius} 0 ${sweep > Math.PI ? 1 : 0} 1 ${endPoint.x} ${endPoint.y}`,
  ].join(" ");
  const arcGroup = createSvgElement("g", {
    class: [
      "arc-entity",
      selectionState.selectedEntityId === arcEntity.id ? "is-selected" : "",
      pointOnEntityState.sourceEntityId === arcEntity.id
        ? "is-point-on-entity-source"
        : "",
    ]
      .filter(Boolean)
      .join(" "),
    "data-entity-id": arcEntity.id,
    "data-entity-type": arcEntity.type,
  });

  arcGroup.appendChild(
    createSvgElement("path", {
      d: arcPath,
      class: "arc-hit-target",
    }),
  );
  arcGroup.appendChild(
    createSvgElement("path", {
      d: arcPath,
      class: "arc-geometry",
    }),
  );

  const title = createSvgElement("title", {});
  title.textContent =
    `Arc ${arcEntity.id}: Center point ${centerPoint.id}, ` +
    `endpoint points ${startPoint.id} and ${endPoint.id}`;
  arcGroup.appendChild(title);
  entityLayer.appendChild(arcGroup);
}

function getCircleRadiusInputValue() {
  const radius = Number(circleRadiusInput.value);
  return Number.isFinite(radius) && radius > 0 ? radius : null;
}

function renderToolPreview() {
  previewLayer.innerHTML = "";

  if (pointOnEntityState.active && pointOnEntityState.awaitingDirection) {
    pointOnEntityState.directionChoices.forEach((choice, index) => {
      if (choice.pointId !== null) return;
      const group = createSvgElement("g", {
        class: "temporary-direction-point",
        "data-choice-index": index,
      });
      const pointDiagonal = 0.15 / viewState.zoom;
      const diagonalOffset = pointDiagonal / (2 * Math.SQRT2);
      group.appendChild(
        createSvgElement("circle", {
          cx: choice.x,
          cy: choice.y,
          r: 0.14 / viewState.zoom,
          class: "entity-hit-target",
        }),
      );
      drawLine(
        group,
        choice.x - diagonalOffset,
        choice.y - diagonalOffset,
        choice.x + diagonalOffset,
        choice.y + diagonalOffset,
        "point-x",
      );
      drawLine(
        group,
        choice.x - diagonalOffset,
        choice.y + diagonalOffset,
        choice.x + diagonalOffset,
        choice.y - diagonalOffset,
        "point-x",
      );
      previewLayer.appendChild(group);
    });
    return;
  }

  if (joinState.active && joinState.firstPointId !== null && joinState.previewWorld) {
    const startPoint = getPointById(joinState.firstPointId);
    if (!startPoint) return;

    drawLine(
      previewLayer,
      startPoint.x,
      startPoint.y,
      joinState.previewWorld.x,
      joinState.previewWorld.y,
      "join-preview",
    );
    return;
  }

  if (!circleState.active || circleState.centerPointId === null) return;

  const centerPoint = getPointById(circleState.centerPointId);
  const radius = getCircleRadiusInputValue();
  if (!centerPoint || radius === null) return;

  previewLayer.appendChild(
    createSvgElement("circle", {
      cx: centerPoint.x,
      cy: centerPoint.y,
      r: radius,
      class: "circle-preview",
    }),
  );
}

function renderEntities() {
  clearEntityHoverInfo();
  entityLayer.innerHTML = "";

  documentModel.entities.forEach((entity) => {
    if (entity.type === "line") renderLineEntity(entity);
    if (entity.type === "circle") renderCircleEntity(entity);
    if (entity.type === "arc") renderArcEntity(entity);
  });

  documentModel.entities.forEach((entity) => {
    if (entity.type === "point") renderPoint(entity);
  });

  renderToolPreview();
  entityCount.textContent = `Entities: ${documentModel.entities.length}`;
  updateEditMenuState();
}

function addPoint(x, y) {
  recordDocumentChange(`Create point ${documentModel.nextEntityId}`);
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

function addJoinLine(startPointId, endPointId) {
  recordDocumentChange(`Create line ${documentModel.nextEntityId}`);
  const line = {
    id: documentModel.nextEntityId,
    type: "line",
    startPointId,
    endPointId,
  };

  documentModel.nextEntityId += 1;
  documentModel.entities.push(line);
  renderEntities();
  return line;
}

function addCircle(centerPointId, radius) {
  recordDocumentChange(`Create circle ${documentModel.nextEntityId}`);
  const circle = {
    id: documentModel.nextEntityId,
    type: "circle",
    centerPointId,
    radius,
  };

  documentModel.nextEntityId += 1;
  documentModel.entities.push(circle);
  renderEntities();
  return circle;
}

function addOffsetLine(start, end) {
  const startPointId = documentModel.nextEntityId;
  const endPointId = startPointId + 1;
  const lineId = startPointId + 2;
  recordDocumentChange(`Offset line ${lineId}`);

  const startPoint = {
    id: startPointId,
    type: "point",
    x: start.x,
    y: start.y,
  };
  const endPoint = {
    id: endPointId,
    type: "point",
    x: end.x,
    y: end.y,
  };
  const line = {
    id: lineId,
    type: "line",
    startPointId,
    endPointId,
  };

  documentModel.nextEntityId += 3;
  documentModel.entities.push(startPoint, endPoint, line);
  renderEntities();
  return { line, startPoint, endPoint };
}

function addOffsetCircle(centerPointId, radius) {
  recordDocumentChange(`Offset circle ${documentModel.nextEntityId}`);
  const circle = {
    id: documentModel.nextEntityId,
    type: "circle",
    centerPointId,
    radius,
  };

  documentModel.nextEntityId += 1;
  documentModel.entities.push(circle);
  renderEntities();
  return circle;
}

function getEntityById(entityId) {
  return documentModel.entities.find((entity) => entity.id === entityId);
}

function crossProduct(a, b) {
  return a.x * b.y - a.y * b.x;
}

function dotProduct(a, b) {
  return a.x * b.x + a.y * b.y;
}

function squaredDistance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

function normalizeAngle(angle) {
  const fullTurn = Math.PI * 2;
  return ((angle % fullTurn) + fullTurn) % fullTurn;
}

function getCounterClockwiseSweep(startAngle, endAngle) {
  return normalizeAngle(endAngle - startAngle);
}

function isAngleOnCounterClockwiseArc(angle, startAngle, endAngle) {
  return (
    getCounterClockwiseSweep(startAngle, angle) <=
    getCounterClockwiseSweep(startAngle, endAngle) + 1e-7
  );
}

function findExistingPointAt(worldPoint) {
  return documentModel.entities.find(
    (entity) =>
      entity.type === "point" &&
      squaredDistance(entity, worldPoint) <= 1e-14,
  );
}

function getOrCreatePointWithoutHistory(worldPoint) {
  const existingPoint = findExistingPointAt(worldPoint);
  if (existingPoint) return existingPoint;

  const point = {
    id: documentModel.nextEntityId,
    type: "point",
    x: worldPoint.x,
    y: worldPoint.y,
  };
  documentModel.nextEntityId += 1;
  documentModel.entities.push(point);
  return point;
}

function getLineEndpointPair(line) {
  const startPoint = getPointById(line.startPointId);
  const endPoint = getPointById(line.endPointId);
  return startPoint && endPoint ? { startPoint, endPoint } : null;
}

function getPointOnRayParameter(origin, direction, point) {
  const lengthSquared = dotProduct(direction, direction);
  if (lengthSquared <= GEOMETRY_EPSILON ** 2) return null;
  return (
    dotProduct(
      { x: point.x - origin.x, y: point.y - origin.y },
      direction,
    ) / lengthSquared
  );
}

function intersectInfiniteLines(origin, direction, targetStart, targetEnd) {
  const targetDirection = {
    x: targetEnd.x - targetStart.x,
    y: targetEnd.y - targetStart.y,
  };
  if (dotProduct(targetDirection, targetDirection) <= GEOMETRY_EPSILON ** 2) {
    return { point: null, parameter: null, kind: "degenerate" };
  }

  const denominator = crossProduct(direction, targetDirection);
  if (Math.abs(denominator) <= GEOMETRY_EPSILON) {
    return { point: null, parameter: null, kind: "parallel" };
  }

  const offset = {
    x: targetStart.x - origin.x,
    y: targetStart.y - origin.y,
  };
  const parameter = crossProduct(offset, targetDirection) / denominator;
  return {
    point: {
      x: origin.x + parameter * direction.x,
      y: origin.y + parameter * direction.y,
    },
    parameter,
    kind: "point",
  };
}

function intersectRayCircle(origin, direction, center, radius) {
  const fromCenter = {
    x: origin.x - center.x,
    y: origin.y - center.y,
  };
  const coefficientA = dotProduct(direction, direction);
  if (coefficientA <= GEOMETRY_EPSILON ** 2) return [];

  const coefficientB = 2 * dotProduct(fromCenter, direction);
  const coefficientC = dotProduct(fromCenter, fromCenter) - radius * radius;
  const discriminant = coefficientB ** 2 - 4 * coefficientA * coefficientC;
  if (discriminant < -GEOMETRY_EPSILON) return [];

  const root = Math.sqrt(Math.max(0, discriminant));
  const parameters = [
    (-coefficientB - root) / (2 * coefficientA),
    (-coefficientB + root) / (2 * coefficientA),
  ];
  return parameters
    .filter(
      (parameter, index) =>
        parameter > GEOMETRY_EPSILON &&
        parameters.findIndex(
          (candidate) => Math.abs(candidate - parameter) <= GEOMETRY_EPSILON,
        ) === index,
    )
    .map((parameter) => ({
      point: {
        x: origin.x + parameter * direction.x,
        y: origin.y + parameter * direction.y,
      },
      parameter,
    }));
}

function intersectInfiniteLineCircle(lineStart, lineEnd, center, radius) {
  const direction = {
    x: lineEnd.x - lineStart.x,
    y: lineEnd.y - lineStart.y,
  };
  const fromCenter = {
    x: lineStart.x - center.x,
    y: lineStart.y - center.y,
  };
  const coefficientA = dotProduct(direction, direction);
  if (coefficientA <= GEOMETRY_EPSILON ** 2) {
    return { points: [], kind: "degenerate" };
  }

  const coefficientB = 2 * dotProduct(fromCenter, direction);
  const coefficientC = dotProduct(fromCenter, fromCenter) - radius * radius;
  const discriminant = coefficientB ** 2 - 4 * coefficientA * coefficientC;
  if (discriminant < -GEOMETRY_EPSILON) {
    return { points: [], kind: "none" };
  }

  const root = Math.sqrt(Math.max(0, discriminant));
  const parameters = [
    (-coefficientB - root) / (2 * coefficientA),
    (-coefficientB + root) / (2 * coefficientA),
  ];
  const points = uniqueIntersectionPoints(
    parameters.map((parameter) => ({
      x: lineStart.x + parameter * direction.x,
      y: lineStart.y + parameter * direction.y,
    })),
  );
  return {
    points,
    kind: points.length ? "point" : "none",
  };
}

function uniqueIntersectionPoints(points) {
  return points.filter(
    (point, index) =>
      points.findIndex(
        (candidate) =>
          squaredDistance(point, candidate) <= GEOMETRY_EPSILON ** 2,
      ) === index,
  );
}

function intersectLineSegments(startA, endA, startB, endB) {
  const directionA = {
    x: endA.x - startA.x,
    y: endA.y - startA.y,
  };
  const directionB = {
    x: endB.x - startB.x,
    y: endB.y - startB.y,
  };
  const offset = {
    x: startB.x - startA.x,
    y: startB.y - startA.y,
  };
  const lengthSquaredA = dotProduct(directionA, directionA);
  const lengthSquaredB = dotProduct(directionB, directionB);
  if (
    lengthSquaredA <= GEOMETRY_EPSILON ** 2 ||
    lengthSquaredB <= GEOMETRY_EPSILON ** 2
  ) {
    return { points: [], kind: "degenerate" };
  }

  const denominator = crossProduct(directionA, directionB);
  const offsetCrossA = crossProduct(offset, directionA);
  if (Math.abs(denominator) <= GEOMETRY_EPSILON) {
    if (Math.abs(offsetCrossA) > GEOMETRY_EPSILON) {
      return { points: [], kind: "none" };
    }

    const parameterStart = dotProduct(offset, directionA) / lengthSquaredA;
    const parameterEnd =
      parameterStart + dotProduct(directionB, directionA) / lengthSquaredA;
    const overlapStart = Math.max(0, Math.min(parameterStart, parameterEnd));
    const overlapEnd = Math.min(1, Math.max(parameterStart, parameterEnd));
    if (overlapEnd < overlapStart - GEOMETRY_EPSILON) {
      return { points: [], kind: "none" };
    }
    if (Math.abs(overlapEnd - overlapStart) <= GEOMETRY_EPSILON) {
      return {
        points: [
          {
            x: startA.x + overlapStart * directionA.x,
            y: startA.y + overlapStart * directionA.y,
          },
        ],
        kind: "point",
      };
    }
    return { points: [], kind: "overlap" };
  }

  const parameterA = crossProduct(offset, directionB) / denominator;
  const parameterB = offsetCrossA / denominator;
  if (
    parameterA < -GEOMETRY_EPSILON ||
    parameterA > 1 + GEOMETRY_EPSILON ||
    parameterB < -GEOMETRY_EPSILON ||
    parameterB > 1 + GEOMETRY_EPSILON
  ) {
    return { points: [], kind: "none" };
  }

  return {
    points: [
      {
        x: startA.x + parameterA * directionA.x,
        y: startA.y + parameterA * directionA.y,
      },
    ],
    kind: "point",
  };
}

function intersectLineCircle(lineStart, lineEnd, center, radius) {
  const direction = {
    x: lineEnd.x - lineStart.x,
    y: lineEnd.y - lineStart.y,
  };
  const fromCenter = {
    x: lineStart.x - center.x,
    y: lineStart.y - center.y,
  };
  const coefficientA = dotProduct(direction, direction);
  if (coefficientA <= GEOMETRY_EPSILON ** 2) {
    return { points: [], kind: "degenerate" };
  }

  const coefficientB = 2 * dotProduct(fromCenter, direction);
  const coefficientC = dotProduct(fromCenter, fromCenter) - radius * radius;
  const discriminant = coefficientB ** 2 - 4 * coefficientA * coefficientC;
  if (discriminant < -GEOMETRY_EPSILON) {
    return { points: [], kind: "none" };
  }

  const root = Math.sqrt(Math.max(0, discriminant));
  const parameters = [
    (-coefficientB - root) / (2 * coefficientA),
    (-coefficientB + root) / (2 * coefficientA),
  ];
  const points = parameters
    .filter(
      (parameter) =>
        parameter >= -GEOMETRY_EPSILON && parameter <= 1 + GEOMETRY_EPSILON,
    )
    .map((parameter) => ({
      x: lineStart.x + parameter * direction.x,
      y: lineStart.y + parameter * direction.y,
    }));

  const uniquePoints = uniqueIntersectionPoints(points);
  return {
    points: uniquePoints,
    kind: uniquePoints.length ? "point" : "none",
  };
}

function intersectCircles(centerA, radiusA, centerB, radiusB) {
  const delta = {
    x: centerB.x - centerA.x,
    y: centerB.y - centerA.y,
  };
  const centerDistance = Math.hypot(delta.x, delta.y);
  if (centerDistance <= GEOMETRY_EPSILON) {
    return {
      points: [],
      kind:
        Math.abs(radiusA - radiusB) <= GEOMETRY_EPSILON
          ? "overlap"
          : "none",
    };
  }
  if (
    centerDistance > radiusA + radiusB + GEOMETRY_EPSILON ||
    centerDistance < Math.abs(radiusA - radiusB) - GEOMETRY_EPSILON
  ) {
    return { points: [], kind: "none" };
  }

  const along =
    (radiusA ** 2 - radiusB ** 2 + centerDistance ** 2) /
    (2 * centerDistance);
  const heightSquared = radiusA ** 2 - along ** 2;
  if (heightSquared < -GEOMETRY_EPSILON) {
    return { points: [], kind: "none" };
  }

  const base = {
    x: centerA.x + (along * delta.x) / centerDistance,
    y: centerA.y + (along * delta.y) / centerDistance,
  };
  const height = Math.sqrt(Math.max(0, heightSquared));
  if (height <= GEOMETRY_EPSILON) {
    return { points: [base], kind: "point" };
  }

  const perpendicular = {
    x: (-delta.y * height) / centerDistance,
    y: (delta.x * height) / centerDistance,
  };
  return {
    points: [
      { x: base.x + perpendicular.x, y: base.y + perpendicular.y },
      { x: base.x - perpendicular.x, y: base.y - perpendicular.y },
    ],
    kind: "point",
  };
}

function getEntityIntersections(firstEntity, secondEntity) {
  const firstIsLine = firstEntity.type === "line";
  const secondIsLine = secondEntity.type === "line";

  if (firstIsLine && secondIsLine) {
    const firstStart = getPointById(firstEntity.startPointId);
    const firstEnd = getPointById(firstEntity.endPointId);
    const secondStart = getPointById(secondEntity.startPointId);
    const secondEnd = getPointById(secondEntity.endPointId);
    if (!firstStart || !firstEnd || !secondStart || !secondEnd) {
      return { points: [], kind: "degenerate" };
    }
    return intersectLineSegments(firstStart, firstEnd, secondStart, secondEnd);
  }

  if (firstIsLine || secondIsLine) {
    const line = firstIsLine ? firstEntity : secondEntity;
    const circle = firstIsLine ? secondEntity : firstEntity;
    const lineStart = getPointById(line.startPointId);
    const lineEnd = getPointById(line.endPointId);
    const center = getPointById(circle.centerPointId);
    if (!lineStart || !lineEnd || !center) {
      return { points: [], kind: "degenerate" };
    }
    return intersectLineCircle(lineStart, lineEnd, center, circle.radius);
  }

  const firstCenter = getPointById(firstEntity.centerPointId);
  const secondCenter = getPointById(secondEntity.centerPointId);
  if (!firstCenter || !secondCenter) {
    return { points: [], kind: "degenerate" };
  }
  return intersectCircles(
    firstCenter,
    firstEntity.radius,
    secondCenter,
    secondEntity.radius,
  );
}

function captureDocumentSnapshot() {
  return {
    entities: documentModel.entities.map((entity) => ({ ...entity })),
    nextEntityId: documentModel.nextEntityId,
  };
}

function recordDocumentChange(label) {
  historyState.undoStack.push({
    label,
    snapshot: captureDocumentSnapshot(),
  });

  if (historyState.undoStack.length > HISTORY_LIMIT) {
    historyState.undoStack.shift();
  }

  historyState.redoStack = [];
  updateEditMenuState();
}

function restoreDocumentSnapshot(snapshot) {
  documentModel.entities = snapshot.entities.map((entity) => ({ ...entity }));
  documentModel.nextEntityId = snapshot.nextEntityId;
  selectionState.selectedEntityId = null;
  joinState.active = false;
  joinState.firstPointId = null;
  joinState.previewWorld = null;
  circleState.active = false;
  circleState.centerPointId = null;
  intersectionState.active = false;
  intersectionState.firstEntityId = null;
  offsetState.active = false;
  offsetState.sourceEntityId = null;
  trimExtendState.active = false;
  trimExtendState.sourceEntityId = null;
  trimExtendState.endpointProperty = null;
  trimExtendState.sourcePickWorld = null;
  pointOnEntityState.active = false;
  pointOnEntityState.sourceEntityId = null;
  pointOnEntityState.zeroPointId = null;
  pointOnEntityState.zeroChoiceIndex = null;
  pointOnEntityState.awaitingDirection = false;
  pointOnEntityState.directionChoices = [];
  cadCanvas.classList.remove("join-points");
  cadCanvas.classList.remove("circle-center-radius");
  cadCanvas.classList.remove("intersect-entities");
  cadCanvas.classList.remove("offset-entity");
  cadCanvas.classList.remove("trim-extend");
  cadCanvas.classList.remove("trim-extend-source-pick");
  cadCanvas.classList.remove("point-on-entity");
  cadCanvas.classList.remove("point-on-entity-source-pick");
  previewLayer.innerHTML = "";
  if (circleRadiusWindow.classList.contains("is-maximized")) {
    restoreCircleWindow();
  }
  setCircleWindowMinimized(false);
  circleRadiusWindow.hidden = true;
  if (offsetWindow.classList.contains("is-maximized")) {
    restoreOffsetWindow();
  }
  setOffsetWindowMinimized(false);
  offsetWindow.hidden = true;
  if (pointOnEntityWindow.classList.contains("is-maximized")) {
    restorePointOnEntityWindow();
  }
  setPointOnEntityWindowMinimized(false);
  pointOnEntityWindow.hidden = true;
  renderEntities();
}

function updateEditMenuState() {
  const selectedEntityExists = documentModel.entities.some(
    (entity) => entity.id === selectionState.selectedEntityId,
  );
  undoMenu.disabled = historyState.undoStack.length === 0;
  redoMenu.disabled = historyState.redoStack.length === 0;
  deleteMenu.disabled = !selectedEntityExists;
}

function dismissEditMenu() {
  editMenuItem.classList.add("is-dismissed");
  document.activeElement?.blur();
}

function undoDocumentChange() {
  dismissEditMenu();
  const historyEntry = historyState.undoStack.pop();
  if (!historyEntry) {
    commandStatus.textContent = "Nothing to undo.";
    updateEditMenuState();
    return;
  }

  historyState.redoStack.push({
    label: historyEntry.label,
    snapshot: captureDocumentSnapshot(),
  });
  restoreDocumentSnapshot(historyEntry.snapshot);
  commandStatus.textContent = `Undo: ${historyEntry.label}`;
}

function redoDocumentChange() {
  dismissEditMenu();
  const historyEntry = historyState.redoStack.pop();
  if (!historyEntry) {
    commandStatus.textContent = "Nothing to redo.";
    updateEditMenuState();
    return;
  }

  historyState.undoStack.push({
    label: historyEntry.label,
    snapshot: captureDocumentSnapshot(),
  });
  restoreDocumentSnapshot(historyEntry.snapshot);
  commandStatus.textContent = `Redo: ${historyEntry.label}`;
}

function deleteSelectedEntity() {
  dismissEditMenu();
  const selectedEntity = documentModel.entities.find(
    (entity) => entity.id === selectionState.selectedEntityId,
  );
  if (!selectedEntity) {
    commandStatus.textContent = "Select an entity to delete.";
    updateEditMenuState();
    return;
  }

  recordDocumentChange(`Delete ${selectedEntity.type} ${selectedEntity.id}`);

  if (selectedEntity.type === "point") {
    const joinedLineCount = documentModel.entities.filter(
      (entity) =>
        entity.type === "line" &&
        (entity.startPointId === selectedEntity.id ||
          entity.endPointId === selectedEntity.id),
    ).length;
    const centeredCircleCount = documentModel.entities.filter(
      (entity) =>
        entity.type === "circle" && entity.centerPointId === selectedEntity.id,
    ).length;
    const dependentArcCount = documentModel.entities.filter(
      (entity) =>
        entity.type === "arc" &&
        (entity.centerPointId === selectedEntity.id ||
          entity.startPointId === selectedEntity.id ||
          entity.endPointId === selectedEntity.id),
    ).length;

    documentModel.entities = documentModel.entities.filter(
      (entity) =>
        entity.id !== selectedEntity.id &&
        !(
          entity.type === "line" &&
          (entity.startPointId === selectedEntity.id ||
            entity.endPointId === selectedEntity.id)
        ) &&
        !(entity.type === "circle" && entity.centerPointId === selectedEntity.id) &&
        !(
          entity.type === "arc" &&
          (entity.centerPointId === selectedEntity.id ||
            entity.startPointId === selectedEntity.id ||
            entity.endPointId === selectedEntity.id)
        ),
    );
    selectionState.selectedEntityId = null;
    renderEntities();
    const dependentDescriptions = [];
    if (joinedLineCount) {
      dependentDescriptions.push(
        `${joinedLineCount} joined ${joinedLineCount === 1 ? "line" : "lines"}`,
      );
    }
    if (centeredCircleCount) {
      dependentDescriptions.push(
        `${centeredCircleCount} centered ${centeredCircleCount === 1 ? "circle" : "circles"}`,
      );
    }
    if (dependentArcCount) {
      dependentDescriptions.push(
        `${dependentArcCount} dependent ${dependentArcCount === 1 ? "arc" : "arcs"}`,
      );
    }
    commandStatus.textContent = dependentDescriptions.length
      ? `Deleted point ${selectedEntity.id} and ${dependentDescriptions.join(" and ")}.`
      : `Deleted point ${selectedEntity.id}.`;
    return;
  }

  documentModel.entities = documentModel.entities.filter(
    (entity) => entity.id !== selectedEntity.id,
  );
  selectionState.selectedEntityId = null;
  renderEntities();
  commandStatus.textContent = `Deleted ${selectedEntity.type} ${selectedEntity.id}.`;
}

function dismissDrawMenu() {
  drawMenuItem.classList.add("is-dismissed");
  document.activeElement?.blur();
}

function deactivateJoin(statusMessage) {
  joinState.active = false;
  joinState.firstPointId = null;
  joinState.previewWorld = null;
  cadCanvas.classList.remove("join-points");
  previewLayer.innerHTML = "";
  renderEntities();

  if (statusMessage) {
    commandStatus.textContent = statusMessage;
  }
}

function activateJoin() {
  dismissDrawMenu();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);

  const pointCount = documentModel.entities.filter(
    (entity) => entity.type === "point",
  ).length;
  if (pointCount < 2) {
    commandStatus.textContent = "Line - Join needs at least two points.";
    return;
  }

  selectionState.mode = null;
  selectionState.selectedEntityId = null;
  cadCanvas.classList.remove("select-single");
  joinState.active = true;
  joinState.firstPointId = null;
  joinState.previewWorld = null;
  cadCanvas.classList.add("join-points");
  renderEntities();
  commandStatus.textContent = "Line - Join: Select the first point.";
}

function handleJoinClick(event) {
  const pointElement = event.target.closest(".point-entity");
  if (!pointElement) {
    commandStatus.textContent =
      joinState.firstPointId === null
        ? "Line - Join: Select the first point."
        : "Line - Join: Select the second point.";
    return;
  }

  const pointId = Number(pointElement.dataset.entityId);
  if (joinState.firstPointId === null) {
    joinState.firstPointId = pointId;
    joinState.previewWorld = getPointById(pointId);
    renderEntities();
    commandStatus.textContent = "Line - Join: Select the second point.";
    return;
  }

  if (pointId === joinState.firstPointId) {
    commandStatus.textContent = "Line - Join: Choose a different second point.";
    return;
  }

  const startPointId = joinState.firstPointId;
  const duplicateLine = documentModel.entities.some(
    (entity) =>
      entity.type === "line" &&
      ((entity.startPointId === startPointId && entity.endPointId === pointId) ||
        (entity.startPointId === pointId && entity.endPointId === startPointId)),
  );

  if (duplicateLine) {
    joinState.firstPointId = null;
    joinState.previewWorld = null;
    renderEntities();
    commandStatus.textContent =
      `Line already joins point ${startPointId} and point ${pointId}. ` +
      "Select the first point for the next line.";
    return;
  }

  const line = addJoinLine(startPointId, pointId);
  joinState.firstPointId = null;
  joinState.previewWorld = null;
  renderEntities();
  commandStatus.textContent =
    `Created line ${line.id} joining point ${startPointId} to point ${pointId}. ` +
    "Select the first point for the next line.";
}

function deactivateIntersectingPoint(statusMessage) {
  intersectionState.active = false;
  intersectionState.firstEntityId = null;
  cadCanvas.classList.remove("intersect-entities");
  renderEntities();

  if (statusMessage) {
    commandStatus.textContent = statusMessage;
  }
}

function activateIntersectingPoint() {
  dismissDrawMenu();
  deactivateJoin();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow();

  const intersectableCount = documentModel.entities.filter(
    (entity) => entity.type === "line" || entity.type === "circle",
  ).length;
  if (intersectableCount < 2) {
    commandStatus.textContent =
      "Point - Intersecting needs at least two line or circle entities.";
    return;
  }

  selectionState.mode = null;
  selectionState.selectedEntityId = null;
  cadCanvas.classList.remove("select-single");
  intersectionState.active = true;
  intersectionState.firstEntityId = null;
  cadCanvas.classList.add("intersect-entities");
  renderEntities();
  commandStatus.textContent =
    "Point - Intersecting: Select the first line or circle.";
}

function handleIntersectingPointClick(event) {
  const entityElement = event.target.closest(".line-entity, .circle-entity");
  if (!entityElement) {
    commandStatus.textContent =
      intersectionState.firstEntityId === null
        ? "Point - Intersecting: Select the first line or circle."
        : "Point - Intersecting: Select the second line or circle.";
    return;
  }

  const entityId = Number(entityElement.dataset.entityId);
  if (intersectionState.firstEntityId === null) {
    intersectionState.firstEntityId = entityId;
    renderEntities();
    commandStatus.textContent =
      "Point - Intersecting: Select the second line or circle.";
    return;
  }

  if (entityId === intersectionState.firstEntityId) {
    commandStatus.textContent =
      "Point - Intersecting: Choose a different second entity.";
    return;
  }

  const firstEntity = getEntityById(intersectionState.firstEntityId);
  const secondEntity = getEntityById(entityId);
  if (!firstEntity || !secondEntity) {
    deactivateIntersectingPoint("Point - Intersecting canceled: entity missing.");
    return;
  }

  const result = getEntityIntersections(firstEntity, secondEntity);
  if (!result.points.length) {
    commandStatus.textContent =
      result.kind === "overlap"
        ? "These entities overlap or coincide, so they do not have one unique intersection. Select a different second entity."
        : "These entities do not have a finite intersection. Select a different second entity.";
    return;
  }

  const clickWorld = screenToWorld(event);
  const chosenIntersection = [...result.points].sort(
    (first, second) =>
      squaredDistance(first, clickWorld) - squaredDistance(second, clickWorld),
  )[0];
  const existingPoint = documentModel.entities.find(
    (entity) =>
      entity.type === "point" &&
      squaredDistance(entity, chosenIntersection) <= 1e-14,
  );
  if (existingPoint) {
    intersectionState.firstEntityId = null;
    renderEntities();
    commandStatus.textContent =
      `Intersection already exists as point ${existingPoint.id} at X${formatCoordinate(existingPoint.x)} Y${formatCoordinate(existingPoint.y)}. ` +
      "Select the first line or circle for the next point.";
    return;
  }

  const point = addPoint(chosenIntersection.x, chosenIntersection.y);
  const choiceDescription =
    result.points.length > 1 ? " (nearest of two intersections)" : "";
  intersectionState.firstEntityId = null;
  renderEntities();
  commandStatus.textContent =
    `Created intersecting point ${point.id} at X${formatCoordinate(point.x)} Y${formatCoordinate(point.y)}${choiceDescription}. ` +
    "Select the first line or circle for the next point.";
}

function positionCircleWindowInitially() {
  const windowBounds = circleRadiusWindow.getBoundingClientRect();
  const left = Math.max(8, window.innerWidth - windowBounds.width - 24);
  const top = Math.min(112, Math.max(8, window.innerHeight - windowBounds.height - 36));

  circleRadiusWindow.style.left = `${left}px`;
  circleRadiusWindow.style.top = `${top}px`;
  circleWindowState.hasPosition = true;
}

function setCircleWindowMinimized(minimized) {
  circleRadiusWindow.classList.toggle("is-minimized", minimized);
  circleMinimizeButton.setAttribute(
    "aria-label",
    minimized ? "Restore Circle" : "Minimize Circle",
  );
  circleMinimizeButton.title = minimized ? "Restore" : "Minimize";
}

function restoreCircleWindow() {
  circleRadiusWindow.classList.remove("is-maximized");

  if (circleWindowState.restoreBounds) {
    const { left, top, width } = circleWindowState.restoreBounds;
    circleRadiusWindow.style.left = `${left}px`;
    circleRadiusWindow.style.top = `${top}px`;
    circleRadiusWindow.style.width = `${width}px`;
  }

  circleMaximizeButton.setAttribute("aria-label", "Maximize Circle");
  circleMaximizeButton.title = "Maximize";
  circleMaximizeIcon.textContent = "□";
}

function toggleCircleWindowMaximized() {
  setCircleWindowMinimized(false);

  if (circleRadiusWindow.classList.contains("is-maximized")) {
    restoreCircleWindow();
    return;
  }

  const bounds = circleRadiusWindow.getBoundingClientRect();
  circleWindowState.restoreBounds = {
    left: bounds.left,
    top: bounds.top,
    width: bounds.width,
  };
  circleRadiusWindow.classList.add("is-maximized");
  circleMaximizeButton.setAttribute("aria-label", "Restore Circle");
  circleMaximizeButton.title = "Restore";
  circleMaximizeIcon.textContent = "❐";
}

function closeCircleRadiusWindow(statusMessage = "Ready") {
  if (circleRadiusWindow.classList.contains("is-maximized")) {
    restoreCircleWindow();
  }

  setCircleWindowMinimized(false);
  circleRadiusWindow.hidden = true;
  circleState.active = false;
  circleState.centerPointId = null;
  cadCanvas.classList.remove("circle-center-radius");
  previewLayer.innerHTML = "";
  renderEntities();

  if (statusMessage !== null) {
    commandStatus.textContent = statusMessage;
  }
}

function activateCircleCenterRadius() {
  dismissDrawMenu();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow();

  const pointCount = documentModel.entities.filter(
    (entity) => entity.type === "point",
  ).length;
  if (pointCount < 1) {
    commandStatus.textContent =
      "Circle - Point Center & Radius needs an existing center point.";
    return;
  }

  selectionState.mode = null;
  selectionState.selectedEntityId = null;
  cadCanvas.classList.remove("select-single");
  circleState.active = true;
  circleState.centerPointId = null;
  cadCanvas.classList.add("circle-center-radius");
  circleCenterReadout.textContent = "None selected";
  circleToolMessage.textContent = "Select an existing point for the center.";
  circleCreateButton.disabled = true;
  if (getCircleRadiusInputValue() === null) circleRadiusInput.value = "1";
  circleRadiusWindow.hidden = false;
  setCircleWindowMinimized(false);

  if (!circleWindowState.hasPosition) {
    positionCircleWindowInitially();
  }

  renderEntities();
  commandStatus.textContent = "Circle: Select the center point.";
}

function handleCircleCenterClick(event) {
  const pointElement = event.target.closest(".point-entity");
  if (!pointElement) {
    commandStatus.textContent = "Circle: Select an existing point for the center.";
    return;
  }

  const pointId = Number(pointElement.dataset.entityId);
  const centerPoint = getPointById(pointId);
  if (!centerPoint) return;

  circleState.centerPointId = pointId;
  circleCenterReadout.textContent = `Point ${pointId} — X${formatCoordinate(centerPoint.x)} Y${formatCoordinate(centerPoint.y)}`;
  circleToolMessage.textContent = "Enter a positive radius, then choose Create.";
  circleCreateButton.disabled = getCircleRadiusInputValue() === null;
  renderEntities();
  circleRadiusInput.focus();
  circleRadiusInput.select();
  commandStatus.textContent = `Circle: Center point ${pointId}; enter the radius.`;
}

function createCircleFromInput() {
  if (!circleRadiusForm.reportValidity()) return;

  const centerPoint = getPointById(circleState.centerPointId);
  const radius = getCircleRadiusInputValue();
  if (!centerPoint) {
    circleToolMessage.textContent = "Select an existing point for the center.";
    return;
  }
  if (radius === null) {
    circleToolMessage.textContent = "Enter a radius greater than zero.";
    return;
  }

  const circle = addCircle(centerPoint.id, radius);
  circleState.centerPointId = null;
  circleCenterReadout.textContent = "None selected";
  circleToolMessage.textContent =
    `Created circle ${circle.id}. Select the next center point.`;
  circleCreateButton.disabled = true;
  renderEntities();
  commandStatus.textContent =
    `Created circle ${circle.id} at point ${centerPoint.id} with radius ${formatCoordinate(radius)}. ` +
    "Select the center point for the next circle.";
}

function getOffsetAmount() {
  const amount = Number(offsetAmountInput.value);
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}

function dismissModifyMenu() {
  modifyMenuItem.classList.add("is-dismissed");
  document.activeElement?.blur();
}

function positionOffsetWindowInitially() {
  const windowBounds = offsetWindow.getBoundingClientRect();
  const left = Math.max(8, window.innerWidth - windowBounds.width - 24);
  const top = Math.min(
    112,
    Math.max(8, window.innerHeight - windowBounds.height - 36),
  );

  offsetWindow.style.left = `${left}px`;
  offsetWindow.style.top = `${top}px`;
  offsetWindowState.hasPosition = true;
}

function setOffsetWindowMinimized(minimized) {
  offsetWindow.classList.toggle("is-minimized", minimized);
  offsetMinimizeButton.setAttribute(
    "aria-label",
    minimized ? "Restore Offset" : "Minimize Offset",
  );
  offsetMinimizeButton.title = minimized ? "Restore" : "Minimize";
}

function restoreOffsetWindow() {
  offsetWindow.classList.remove("is-maximized");

  if (offsetWindowState.restoreBounds) {
    const { left, top, width } = offsetWindowState.restoreBounds;
    offsetWindow.style.left = `${left}px`;
    offsetWindow.style.top = `${top}px`;
    offsetWindow.style.width = `${width}px`;
  }

  offsetMaximizeButton.setAttribute("aria-label", "Maximize Offset");
  offsetMaximizeButton.title = "Maximize";
  offsetMaximizeIcon.textContent = "□";
}

function toggleOffsetWindowMaximized() {
  setOffsetWindowMinimized(false);

  if (offsetWindow.classList.contains("is-maximized")) {
    restoreOffsetWindow();
    return;
  }

  const bounds = offsetWindow.getBoundingClientRect();
  offsetWindowState.restoreBounds = {
    left: bounds.left,
    top: bounds.top,
    width: bounds.width,
  };
  offsetWindow.classList.add("is-maximized");
  offsetMaximizeButton.setAttribute("aria-label", "Restore Offset");
  offsetMaximizeButton.title = "Restore";
  offsetMaximizeIcon.textContent = "❐";
}

function closeOffsetWindow(statusMessage = "Ready") {
  if (offsetWindow.classList.contains("is-maximized")) {
    restoreOffsetWindow();
  }

  setOffsetWindowMinimized(false);
  offsetWindow.hidden = true;
  offsetState.active = false;
  offsetState.sourceEntityId = null;
  cadCanvas.classList.remove("offset-entity");
  renderEntities();

  if (statusMessage !== null) {
    commandStatus.textContent = statusMessage;
  }
}

function activateOffset() {
  dismissModifyMenu();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);

  const offsettableCount = documentModel.entities.filter(
    (entity) => entity.type === "line" || entity.type === "circle",
  ).length;
  if (offsettableCount < 1) {
    commandStatus.textContent = "Offset needs an existing line or circle.";
    return;
  }

  selectionState.mode = null;
  selectionState.selectedEntityId = null;
  cadCanvas.classList.remove("select-single");
  offsetState.active = true;
  offsetState.sourceEntityId = null;
  cadCanvas.classList.add("offset-entity");
  offsetSourceReadout.textContent = "None selected";
  offsetToolMessage.textContent =
    "Enter an amount, then select a line or circle.";
  if (getOffsetAmount() === null) offsetAmountInput.value = "0.25";
  offsetWindow.hidden = false;
  setOffsetWindowMinimized(false);

  if (!offsetWindowState.hasPosition) {
    positionOffsetWindowInitially();
  }

  renderEntities();
  offsetAmountInput.focus();
  offsetAmountInput.select();
  commandStatus.textContent = "Offset: Select a line or circle.";
}

function deactivateTrimExtend(statusMessage) {
  trimExtendState.active = false;
  trimExtendState.sourceEntityId = null;
  trimExtendState.endpointProperty = null;
  trimExtendState.sourcePickWorld = null;
  cadCanvas.classList.remove("trim-extend");
  cadCanvas.classList.remove("trim-extend-source-pick");
  renderEntities();

  if (statusMessage) {
    commandStatus.textContent = statusMessage;
  }
}

function resetTrimExtendSource(statusMessage) {
  trimExtendState.sourceEntityId = null;
  trimExtendState.endpointProperty = null;
  trimExtendState.sourcePickWorld = null;
  cadCanvas.classList.add("trim-extend-source-pick");
  renderEntities();
  commandStatus.textContent = statusMessage;
}

function activateTrimExtend() {
  dismissModifyMenu();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivatePointOnEntity();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);

  const sourceEntityCount = documentModel.entities.filter(
    (entity) => entity.type === "line" || entity.type === "circle",
  ).length;
  if (sourceEntityCount < 1) {
    commandStatus.textContent = "Trim/Extend needs an existing line or circle.";
    return;
  }

  selectionState.mode = null;
  selectionState.selectedEntityId = null;
  cadCanvas.classList.remove("select-single");
  trimExtendState.active = true;
  trimExtendState.sourceEntityId = null;
  trimExtendState.endpointProperty = null;
  trimExtendState.sourcePickWorld = null;
  cadCanvas.classList.add("trim-extend");
  cadCanvas.classList.add("trim-extend-source-pick");
  renderEntities();
  commandStatus.textContent =
    "Trim/Extend: Select a line near the endpoint to keep, or select the circle portion to keep.";
}

function trimCircleToArc(sourceCircle, targetEntity) {
  const centerPoint = getPointById(sourceCircle.centerPointId);
  const keepPoint = trimExtendState.sourcePickWorld;
  if (!centerPoint || !keepPoint) {
    deactivateTrimExtend("Trim/Extend canceled: source circle is not usable.");
    return;
  }

  let intersections = [];
  if (targetEntity.type === "point") {
    commandStatus.textContent =
      "A circle needs two cut points to create an arc; choose an intersecting line or circle.";
    return;
  }

  if (targetEntity.type === "line") {
    const targetEndpoints = getLineEndpointPair(targetEntity);
    if (!targetEndpoints) {
      commandStatus.textContent = "Trim/Extend: The target line is not usable.";
      return;
    }
    intersections = intersectInfiniteLineCircle(
      targetEndpoints.startPoint,
      targetEndpoints.endPoint,
      centerPoint,
      sourceCircle.radius,
    ).points;
  } else if (targetEntity.type === "circle") {
    const targetCenter = getPointById(targetEntity.centerPointId);
    if (!targetCenter) {
      commandStatus.textContent = "Trim/Extend: The target circle is not usable.";
      return;
    }
    intersections = intersectCircles(
      centerPoint,
      sourceCircle.radius,
      targetCenter,
      targetEntity.radius,
    ).points;
  }

  if (intersections.length !== 2) {
    commandStatus.textContent =
      "A circle needs two distinct intersections with the target to create an arc.";
    return;
  }

  let startWorld = intersections[0];
  let endWorld = intersections[1];
  const startAngle = Math.atan2(
    startWorld.y - centerPoint.y,
    startWorld.x - centerPoint.x,
  );
  const endAngle = Math.atan2(
    endWorld.y - centerPoint.y,
    endWorld.x - centerPoint.x,
  );
  const keepAngle = Math.atan2(
    keepPoint.y - centerPoint.y,
    keepPoint.x - centerPoint.x,
  );
  if (!isAngleOnCounterClockwiseArc(keepAngle, startAngle, endAngle)) {
    [startWorld, endWorld] = [endWorld, startWorld];
  }

  recordDocumentChange(`Trim circle ${sourceCircle.id} to arc`);
  const startPoint = getOrCreatePointWithoutHistory(startWorld);
  const endPoint = getOrCreatePointWithoutHistory(endWorld);
  sourceCircle.type = "arc";
  sourceCircle.startPointId = startPoint.id;
  sourceCircle.endPointId = endPoint.id;

  resetTrimExtendSource(
    `Trimmed circle ${sourceCircle.id} into arc ${sourceCircle.id} with endpoint points ` +
      `${startPoint.id} and ${endPoint.id}. Trim/Extend remains active; select the next line or circle.`,
  );
}

function handleTrimExtendClick(event) {
  if (trimExtendState.sourceEntityId === null) {
    const sourceElement = event.target.closest(".line-entity, .circle-entity");
    if (!sourceElement) {
      commandStatus.textContent =
        "Trim/Extend: The first entity must be a line or circle.";
      return;
    }

    const sourceEntity = getEntityById(Number(sourceElement.dataset.entityId));
    const clickWorld = screenToWorld(event);
    if (!sourceEntity) return;

    trimExtendState.sourceEntityId = sourceEntity.id;
    if (sourceEntity.type === "line") {
      const endpoints = getLineEndpointPair(sourceEntity);
      if (!endpoints) {
        trimExtendState.sourceEntityId = null;
        commandStatus.textContent = "Trim/Extend: The selected line is not usable.";
        return;
      }
      const keepStart =
        squaredDistance(clickWorld, endpoints.startPoint) <=
        squaredDistance(clickWorld, endpoints.endPoint);
      trimExtendState.endpointProperty = keepStart
        ? "endPointId"
        : "startPointId";
      trimExtendState.sourcePickWorld = null;
      const retainedPoint = keepStart
        ? endpoints.startPoint
        : endpoints.endPoint;
      commandStatus.textContent =
        `Trim/Extend: Line ${sourceEntity.id}, point ${retainedPoint.id} will be kept; ` +
        "choose a target point, line, or circle for the opposite endpoint.";
    } else {
      const centerPoint = getPointById(sourceEntity.centerPointId);
      if (!centerPoint) {
        trimExtendState.sourceEntityId = null;
        commandStatus.textContent = "Trim/Extend: The selected circle is not usable.";
        return;
      }
      trimExtendState.endpointProperty = null;
      trimExtendState.sourcePickWorld = {
        x: clickWorld.x,
        y: clickWorld.y,
      };
      commandStatus.textContent =
        `Trim/Extend: Circle ${sourceEntity.id} selected; choose an intersecting line or circle. ` +
        "The portion nearest the first click will be kept.";
    }

    cadCanvas.classList.remove("trim-extend-source-pick");
    renderEntities();
    return;
  }

  const targetElement = event.target.closest(
    ".point-entity, .line-entity, .circle-entity",
  );
  if (!targetElement) {
    commandStatus.textContent =
      "Trim/Extend: Choose a target point, line, or circle.";
    return;
  }

  const sourceEntity = getEntityById(trimExtendState.sourceEntityId);
  if (!sourceEntity) {
    deactivateTrimExtend("Trim/Extend canceled: source entity is missing.");
    return;
  }

  const targetEntity = getEntityById(Number(targetElement.dataset.entityId));
  if (!targetEntity) {
    commandStatus.textContent = "Trim/Extend: The target entity is missing.";
    return;
  }
  if (targetEntity.id === sourceEntity.id) {
    commandStatus.textContent =
      "Trim/Extend: Choose a different entity as the target.";
    return;
  }

  if (sourceEntity.type === "circle") {
    trimCircleToArc(sourceEntity, targetEntity);
    return;
  }

  const sourceLine = sourceEntity;
  const endpointProperty = trimExtendState.endpointProperty;
  const endpoints = getLineEndpointPair(sourceLine);
  if (sourceLine.type !== "line" || !endpointProperty || !endpoints) {
    deactivateTrimExtend("Trim/Extend canceled: source line is not usable.");
    return;
  }

  const movingStart = endpointProperty === "startPointId";
  const activePoint = movingStart ? endpoints.startPoint : endpoints.endPoint;
  const retainedPoint = movingStart ? endpoints.endPoint : endpoints.startPoint;
  const direction = {
    x: activePoint.x - retainedPoint.x,
    y: activePoint.y - retainedPoint.y,
  };
  const lineLength = Math.hypot(direction.x, direction.y);
  if (lineLength <= GEOMETRY_EPSILON) {
    commandStatus.textContent = "Trim/Extend: The selected line has no usable length.";
    return;
  }

  let targetPoint = null;
  let targetPointId = null;
  let targetParameter = null;

  if (targetEntity.type === "point") {
    const targetOffset = {
      x: targetEntity.x - retainedPoint.x,
      y: targetEntity.y - retainedPoint.y,
    };
    const distanceFromLine =
      Math.abs(crossProduct(direction, targetOffset)) / lineLength;
    if (distanceFromLine > 1e-7) {
      commandStatus.textContent = "Target point is not on the selected line.";
      return;
    }

    targetPoint = targetEntity;
    targetPointId = targetEntity.id;
    targetParameter = getPointOnRayParameter(
      retainedPoint,
      direction,
      targetEntity,
    );
  } else if (targetEntity.type === "line") {
    const targetEndpoints = getLineEndpointPair(targetEntity);
    if (!targetEndpoints) {
      commandStatus.textContent = "Trim/Extend: The target line is not usable.";
      return;
    }

    const result = intersectInfiniteLines(
      retainedPoint,
      direction,
      targetEndpoints.startPoint,
      targetEndpoints.endPoint,
    );
    if (!result.point) {
      commandStatus.textContent =
        result.kind === "parallel"
          ? "Trim/Extend: The selected lines are parallel or collinear."
          : "Trim/Extend: The target line is not usable.";
      return;
    }
    targetPoint = result.point;
    targetParameter = result.parameter;
  } else if (targetEntity.type === "circle") {
    const centerPoint = getPointById(targetEntity.centerPointId);
    if (!centerPoint) {
      commandStatus.textContent = "Trim/Extend: The target circle has no center point.";
      return;
    }

    const candidates = intersectRayCircle(
      retainedPoint,
      direction,
      centerPoint,
      targetEntity.radius,
    );
    if (!candidates.length) {
      commandStatus.textContent =
        "Trim/Extend: The selected line does not reach the target circle in that direction.";
      return;
    }
    const chosenCandidate = [...candidates].sort(
      (first, second) =>
        Math.abs(first.parameter - 1) - Math.abs(second.parameter - 1),
    )[0];
    targetPoint = chosenCandidate.point;
    targetParameter = chosenCandidate.parameter;
  }

  if (
    !targetPoint ||
    targetParameter === null ||
    targetParameter <= GEOMETRY_EPSILON
  ) {
    commandStatus.textContent =
      "Trim/Extend: The target is beyond the line's opposite endpoint.";
    return;
  }

  if (Math.abs(targetParameter - 1) <= 1e-7) {
    resetTrimExtendSource(
      `Line ${sourceLine.id} already ends at the target. Select the next line to trim or extend.`,
    );
    return;
  }

  const action = targetParameter < 1 ? "Trim" : "Extend";
  const resultWord = action === "Trim" ? "Trimmed" : "Extended";
  recordDocumentChange(`${action} line ${sourceLine.id}`);

  let endpointPoint =
    targetPointId === null ? findExistingPointAt(targetPoint) : targetEntity;
  if (!endpointPoint) {
    endpointPoint = {
      id: documentModel.nextEntityId,
      type: "point",
      x: targetPoint.x,
      y: targetPoint.y,
    };
    documentModel.nextEntityId += 1;
    documentModel.entities.push(endpointPoint);
  }
  sourceLine[endpointProperty] = endpointPoint.id;

  resetTrimExtendSource(
    `${resultWord} line ${sourceLine.id} to point ${endpointPoint.id}. ` +
      "Trim/Extend remains active; select the next line.",
  );
}

function handleOffsetClick(event) {
  const amount = getOffsetAmount();
  if (amount === null) {
    offsetToolMessage.textContent = "Enter an offset amount greater than zero.";
    commandStatus.textContent = "Offset: Enter a positive offset amount.";
    offsetAmountInput.focus();
    offsetAmountInput.select();
    return;
  }

  if (offsetState.sourceEntityId === null) {
    const entityElement = event.target.closest(".line-entity, .circle-entity");
    if (!entityElement) {
      commandStatus.textContent = "Offset: Select a line or circle; points are not supported.";
      return;
    }

    const entityId = Number(entityElement.dataset.entityId);
    const sourceEntity = getEntityById(entityId);
    if (!sourceEntity) return;

    offsetState.sourceEntityId = entityId;
    const entityName = sourceEntity.type === "line" ? "Line" : "Circle";
    offsetSourceReadout.textContent = `${entityName} ${entityId}`;
    offsetToolMessage.textContent =
      sourceEntity.type === "line"
        ? "Click the side where the parallel line should be created."
        : "Click inside to shrink or outside to enlarge the circle.";
    renderEntities();
    commandStatus.textContent = `Offset: ${entityName} ${entityId} selected; click the desired side.`;
    return;
  }

  const sourceEntity = getEntityById(offsetState.sourceEntityId);
  if (!sourceEntity) {
    closeOffsetWindow("Offset canceled: source entity missing.");
    return;
  }

  const sidePoint = screenToWorld(event);
  let resultMessage;
  if (sourceEntity.type === "line") {
    const startPoint = getPointById(sourceEntity.startPointId);
    const endPoint = getPointById(sourceEntity.endPointId);
    if (!startPoint || !endPoint) {
      closeOffsetWindow("Offset canceled: line endpoints are missing.");
      return;
    }

    const direction = {
      x: endPoint.x - startPoint.x,
      y: endPoint.y - startPoint.y,
    };
    const lineLength = Math.hypot(direction.x, direction.y);
    if (lineLength <= GEOMETRY_EPSILON) {
      offsetToolMessage.textContent = "This line has no usable length.";
      commandStatus.textContent = "Offset: Degenerate line cannot be offset.";
      return;
    }

    const clickVector = {
      x: sidePoint.x - startPoint.x,
      y: sidePoint.y - startPoint.y,
    };
    const signedSide = crossProduct(direction, clickVector) / lineLength;
    if (Math.abs(signedSide) <= 1e-6) {
      offsetToolMessage.textContent = "Click clearly on one side of the selected line.";
      commandStatus.textContent = "Offset: Choose one side of the line.";
      return;
    }

    const sideSign = Math.sign(signedSide);
    const offsetVector = {
      x: (-direction.y / lineLength) * amount * sideSign,
      y: (direction.x / lineLength) * amount * sideSign,
    };
    const result = addOffsetLine(
      { x: startPoint.x + offsetVector.x, y: startPoint.y + offsetVector.y },
      { x: endPoint.x + offsetVector.x, y: endPoint.y + offsetVector.y },
    );
    resultMessage =
      `Created offset line ${result.line.id} with endpoint points ` +
      `${result.startPoint.id} and ${result.endPoint.id}.`;
  } else {
    const centerPoint = getPointById(sourceEntity.centerPointId);
    if (!centerPoint) {
      closeOffsetWindow("Offset canceled: circle center is missing.");
      return;
    }

    const clickRadius = Math.hypot(
      sidePoint.x - centerPoint.x,
      sidePoint.y - centerPoint.y,
    );
    const sideTolerance = 0.02 / viewState.zoom;
    if (Math.abs(clickRadius - sourceEntity.radius) <= sideTolerance) {
      offsetToolMessage.textContent =
        "Click clearly inside or outside the selected circle.";
      commandStatus.textContent = "Offset: Choose inside or outside the circle.";
      return;
    }

    const isOutside = clickRadius > sourceEntity.radius;
    const nextRadius = isOutside
      ? sourceEntity.radius + amount
      : sourceEntity.radius - amount;
    if (nextRadius <= GEOMETRY_EPSILON) {
      offsetToolMessage.textContent =
        "That inward offset would make the circle radius zero or negative.";
      commandStatus.textContent = "Offset: Inward amount is too large for this circle.";
      return;
    }

    const circle = addOffsetCircle(sourceEntity.centerPointId, nextRadius);
    resultMessage =
      `Created ${isOutside ? "outside" : "inside"} offset circle ${circle.id} ` +
      `with radius ${formatCoordinate(nextRadius)}.`;
  }

  offsetState.sourceEntityId = null;
  offsetSourceReadout.textContent = "None selected";
  offsetToolMessage.textContent = `${resultMessage} Select the next line or circle.`;
  renderEntities();
  commandStatus.textContent =
    `${resultMessage} Offset remains active; select the next line or circle.`;
}

function positionPointOnEntityWindowInitially() {
  const windowBounds = pointOnEntityWindow.getBoundingClientRect();
  const left = Math.max(8, window.innerWidth - windowBounds.width - 24);
  const top = Math.min(
    112,
    Math.max(8, window.innerHeight - windowBounds.height - 36),
  );

  pointOnEntityWindow.style.left = `${left}px`;
  pointOnEntityWindow.style.top = `${top}px`;
  pointOnEntityWindowState.hasPosition = true;
}

function setPointOnEntityWindowMinimized(minimized) {
  pointOnEntityWindow.classList.toggle("is-minimized", minimized);
  pointOnEntityMinimizeButton.setAttribute(
    "aria-label",
    minimized ? "Restore Point on Entity" : "Minimize Point on Entity",
  );
  pointOnEntityMinimizeButton.title = minimized ? "Restore" : "Minimize";
}

function restorePointOnEntityWindow() {
  pointOnEntityWindow.classList.remove("is-maximized");

  if (pointOnEntityWindowState.restoreBounds) {
    const { left, top, width } = pointOnEntityWindowState.restoreBounds;
    pointOnEntityWindow.style.left = `${left}px`;
    pointOnEntityWindow.style.top = `${top}px`;
    pointOnEntityWindow.style.width = `${width}px`;
  }

  pointOnEntityMaximizeButton.setAttribute(
    "aria-label",
    "Maximize Point on Entity",
  );
  pointOnEntityMaximizeButton.title = "Maximize";
  pointOnEntityMaximizeIcon.textContent = "□";
}

function togglePointOnEntityWindowMaximized() {
  setPointOnEntityWindowMinimized(false);

  if (pointOnEntityWindow.classList.contains("is-maximized")) {
    restorePointOnEntityWindow();
    return;
  }

  const bounds = pointOnEntityWindow.getBoundingClientRect();
  pointOnEntityWindowState.restoreBounds = {
    left: bounds.left,
    top: bounds.top,
    width: bounds.width,
  };
  pointOnEntityWindow.classList.add("is-maximized");
  pointOnEntityMaximizeButton.setAttribute(
    "aria-label",
    "Restore Point on Entity",
  );
  pointOnEntityMaximizeButton.title = "Restore";
  pointOnEntityMaximizeIcon.textContent = "❐";
}

function hidePointOnEntityWindow() {
  if (pointOnEntityWindow.classList.contains("is-maximized")) {
    restorePointOnEntityWindow();
  }
  setPointOnEntityWindowMinimized(false);
  pointOnEntityWindow.hidden = true;
}

function clearPointOnEntitySource() {
  pointOnEntityState.sourceEntityId = null;
  pointOnEntityState.zeroPointId = null;
  pointOnEntityState.zeroChoiceIndex = null;
  pointOnEntityState.awaitingDirection = false;
  pointOnEntityState.directionChoices = [];
  pointOnEntitySourceReadout.textContent = "None selected";
  pointOnEntityCreateButton.disabled = true;
}

function deactivatePointOnEntity(statusMessage) {
  pointOnEntityState.active = false;
  clearPointOnEntitySource();
  cadCanvas.classList.remove("point-on-entity");
  cadCanvas.classList.remove("point-on-entity-source-pick");
  hidePointOnEntityWindow();
  renderEntities();

  if (statusMessage) {
    commandStatus.textContent = statusMessage;
  }
}

function resetPointOnEntityForNextSource(statusMessage) {
  clearPointOnEntitySource();
  hidePointOnEntityWindow();
  cadCanvas.classList.add("point-on-entity-source-pick");
  renderEntities();
  commandStatus.textContent = statusMessage;
}

function activatePointOnEntity() {
  dismissDrawMenu();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);

  const eligibleEntityCount = documentModel.entities.filter(
    (entity) =>
      entity.type === "line" ||
      entity.type === "circle" ||
      entity.type === "arc",
  ).length;
  if (!eligibleEntityCount) {
    commandStatus.textContent =
      "Point on Entity needs an existing line, circle, or arc.";
    return;
  }

  selectionState.mode = null;
  selectionState.selectedEntityId = null;
  cadCanvas.classList.remove("select-single");
  pointOnEntityState.active = true;
  clearPointOnEntitySource();
  hidePointOnEntityWindow();
  cadCanvas.classList.add("point-on-entity");
  cadCanvas.classList.add("point-on-entity-source-pick");
  renderEntities();
  commandStatus.textContent =
    "Point on Entity: Select a line, circle, or arc.";
}

function getLineDirectionChoices(line, lineElement) {
  const startPoint = getPointById(line.startPointId);
  const endPoint = getPointById(line.endPointId);
  const lineGeometry = lineElement?.querySelector(".line-geometry");
  const fallbackStart = lineGeometry
    ? {
        x: Number(lineGeometry.getAttribute("x1")),
        y: Number(lineGeometry.getAttribute("y1")),
      }
    : null;
  const fallbackEnd = lineGeometry
    ? {
        x: Number(lineGeometry.getAttribute("x2")),
        y: Number(lineGeometry.getAttribute("y2")),
      }
    : null;
  const start = startPoint ?? fallbackStart;
  const end = endPoint ?? fallbackEnd;
  if (
    !start ||
    !end ||
    !Number.isFinite(start.x) ||
    !Number.isFinite(start.y) ||
    !Number.isFinite(end.x) ||
    !Number.isFinite(end.y)
  ) {
    return [];
  }

  return [
    {
      pointId: startPoint?.id ?? null,
      x: start.x,
      y: start.y,
    },
    {
      pointId: endPoint?.id ?? null,
      x: end.x,
      y: end.y,
    },
  ];
}

function showPointOnEntityWindow(sourceEntity) {
  const isLine = sourceEntity.type === "line";
  pointOnEntityValueLabel.textContent = isLine ? "Percentage" : "Degrees";
  pointOnEntityUnit.textContent = isLine ? "%" : "°";
  pointOnEntityValueInput.value = String(
    isLine
      ? pointOnEntityState.linePercentage
      : pointOnEntityState.angleDegrees,
  );

  if (isLine) {
    pointOnEntityValueInput.min = "0";
    pointOnEntityValueInput.max = "100";
    const zeroChoice =
      pointOnEntityState.directionChoices[
        pointOnEntityState.zeroChoiceIndex
      ];
    pointOnEntitySourceReadout.textContent = zeroChoice?.pointId
      ? `Line ${sourceEntity.id} — Point ${zeroChoice.pointId} is 0%`
      : `Line ${sourceEntity.id} — selected endpoint is 0%`;
    pointOnEntityToolMessage.textContent =
      "Enter a percentage from 0 to 100 along the line.";
  } else {
    pointOnEntityValueInput.removeAttribute("min");
    pointOnEntityValueInput.removeAttribute("max");
    const entityName = sourceEntity.type === "circle" ? "Circle" : "Arc";
    pointOnEntitySourceReadout.textContent = `${entityName} ${sourceEntity.id}`;
    pointOnEntityToolMessage.textContent =
      "0° = right, 90° = up, 180° = left, 270° = down.";
  }

  pointOnEntityCreateButton.disabled = false;
  pointOnEntityWindow.hidden = false;
  setPointOnEntityWindowMinimized(false);
  if (!pointOnEntityWindowState.hasPosition) {
    positionPointOnEntityWindowInitially();
  }
  pointOnEntityValueInput.focus();
  pointOnEntityValueInput.select();
}

function selectPointOnEntityLineDirection(choiceIndex) {
  const sourceEntity = getEntityById(pointOnEntityState.sourceEntityId);
  const choice = pointOnEntityState.directionChoices[choiceIndex];
  if (!sourceEntity || sourceEntity.type !== "line" || !choice) return;

  pointOnEntityState.awaitingDirection = false;
  pointOnEntityState.zeroChoiceIndex = choiceIndex;
  pointOnEntityState.zeroPointId = choice.pointId;
  renderEntities();
  showPointOnEntityWindow(sourceEntity);
  commandStatus.textContent = choice.pointId
    ? `Point on Entity: Point ${choice.pointId} is the 0% endpoint; enter a percentage.`
    : "Point on Entity: The chosen temporary endpoint is 0%; enter a percentage.";
}

function handlePointOnEntityClick(event) {
  if (pointOnEntityState.awaitingDirection) {
    const pointElement = event.target.closest(".point-entity");
    const temporaryElement = event.target.closest(".temporary-direction-point");
    let choiceIndex = -1;
    if (pointElement) {
      const pointId = Number(pointElement.dataset.entityId);
      choiceIndex = pointOnEntityState.directionChoices.findIndex(
        (choice) => choice.pointId === pointId,
      );
    } else if (temporaryElement) {
      choiceIndex = Number(temporaryElement.dataset.choiceIndex);
    }

    if (choiceIndex < 0) {
      commandStatus.textContent =
        "Point on Entity: Direction ambiguous; select the 0% endpoint.";
      return;
    }
    selectPointOnEntityLineDirection(choiceIndex);
    return;
  }

  if (pointOnEntityState.sourceEntityId !== null) {
    commandStatus.textContent =
      "Point on Entity: Enter the value in the tool window, then choose Create.";
    return;
  }

  const sourceElement = event.target.closest(
    ".line-entity, .circle-entity, .arc-entity",
  );
  if (!sourceElement) {
    commandStatus.textContent =
      "Point on Entity: Select a line, circle, or arc.";
    return;
  }

  const sourceEntity = getEntityById(Number(sourceElement.dataset.entityId));
  if (!sourceEntity) return;
  pointOnEntityState.sourceEntityId = sourceEntity.id;
  cadCanvas.classList.remove("point-on-entity-source-pick");

  if (sourceEntity.type === "line") {
    const choices = getLineDirectionChoices(sourceEntity, sourceElement);
    if (choices.length !== 2) {
      pointOnEntityState.sourceEntityId = null;
      cadCanvas.classList.add("point-on-entity-source-pick");
      commandStatus.textContent =
        "Point on Entity: The selected line endpoints are not usable.";
      return;
    }

    pointOnEntityState.directionChoices = choices;
    const clickWorld = screenToWorld(event);
    const distanceToStart = Math.hypot(
      clickWorld.x - choices[0].x,
      clickWorld.y - choices[0].y,
    );
    const distanceToEnd = Math.hypot(
      clickWorld.x - choices[1].x,
      clickWorld.y - choices[1].y,
    );
    const lineLength = Math.hypot(
      choices[1].x - choices[0].x,
      choices[1].y - choices[0].y,
    );
    if (
      lineLength <= GEOMETRY_EPSILON ||
      !Number.isFinite(distanceToStart) ||
      !Number.isFinite(distanceToEnd)
    ) {
      pointOnEntityState.sourceEntityId = null;
      pointOnEntityState.directionChoices = [];
      cadCanvas.classList.add("point-on-entity-source-pick");
      commandStatus.textContent =
        "Point on Entity: The selected line has no usable length.";
      return;
    }

    if (Math.abs(distanceToStart - distanceToEnd) <= lineLength * 0.02) {
      pointOnEntityState.awaitingDirection = true;
      pointOnEntityState.zeroPointId = null;
      pointOnEntityState.zeroChoiceIndex = null;
      hidePointOnEntityWindow();
      renderEntities();
      commandStatus.textContent =
        "Point on Entity: Direction ambiguous; select the 0% endpoint.";
      return;
    }

    selectPointOnEntityLineDirection(
      distanceToStart < distanceToEnd ? 0 : 1,
    );
    return;
  }

  pointOnEntityState.directionChoices = [];
  pointOnEntityState.zeroPointId = null;
  pointOnEntityState.zeroChoiceIndex = null;
  renderEntities();
  showPointOnEntityWindow(sourceEntity);
  const entityName = sourceEntity.type === "circle" ? "Circle" : "Arc";
  commandStatus.textContent =
    `Point on Entity: ${entityName} ${sourceEntity.id} selected; enter degrees.`;
}

function createPointOnEntity() {
  if (!pointOnEntityForm.reportValidity()) return;
  const sourceEntity = getEntityById(pointOnEntityState.sourceEntityId);
  const value = Number(pointOnEntityValueInput.value);
  if (!sourceEntity || !Number.isFinite(value)) {
    pointOnEntityToolMessage.textContent = "Enter a valid numeric value.";
    return;
  }

  let worldPoint;
  let placementDescription;
  if (sourceEntity.type === "line") {
    if (value < 0 || value > 100) {
      pointOnEntityToolMessage.textContent =
        "Enter a percentage from 0 to 100.";
      return;
    }
    const zeroChoice =
      pointOnEntityState.directionChoices[
        pointOnEntityState.zeroChoiceIndex
      ];
    const oppositeChoice =
      pointOnEntityState.directionChoices[
        pointOnEntityState.zeroChoiceIndex === 0 ? 1 : 0
      ];
    if (!zeroChoice || !oppositeChoice) {
      pointOnEntityToolMessage.textContent =
        "Choose the line's 0% endpoint again.";
      return;
    }
    const fraction = value / 100;
    worldPoint = {
      x: zeroChoice.x + (oppositeChoice.x - zeroChoice.x) * fraction,
      y: zeroChoice.y + (oppositeChoice.y - zeroChoice.y) * fraction,
    };
    pointOnEntityState.linePercentage = value;
    placementDescription =
      `line ${sourceEntity.id} at ${formatCoordinate(value)}%`;
  } else if (sourceEntity.type === "circle" || sourceEntity.type === "arc") {
    const centerPoint = getPointById(sourceEntity.centerPointId);
    if (!centerPoint) {
      pointOnEntityToolMessage.textContent =
        "The selected entity has no usable center point.";
      return;
    }
    const normalizedDegrees = normalizeAngle((value * Math.PI) / 180) *
      (180 / Math.PI);
    const radians = (normalizedDegrees * Math.PI) / 180;
    const rawCosine = Math.cos(radians);
    const rawSine = Math.sin(radians);
    const cosine = Math.abs(rawCosine) <= 1e-12 ? 0 : rawCosine;
    const sine = Math.abs(rawSine) <= 1e-12 ? 0 : rawSine;
    worldPoint = {
      x: centerPoint.x + sourceEntity.radius * cosine,
      y: centerPoint.y + sourceEntity.radius * sine,
    };
    pointOnEntityState.angleDegrees = value;
    placementDescription =
      `${sourceEntity.type} ${sourceEntity.id} at ${formatCoordinate(normalizedDegrees)}°`;
  } else {
    pointOnEntityToolMessage.textContent = "The selected entity is not supported.";
    return;
  }

  const existingPoint = findExistingPointAt(worldPoint);
  if (existingPoint) {
    resetPointOnEntityForNextSource(
      `Point ${existingPoint.id} already exists on ${placementDescription}. ` +
        "Point on Entity remains active; select the next entity.",
    );
    return;
  }

  const point = addPoint(worldPoint.x, worldPoint.y);
  resetPointOnEntityForNextSource(
    `Created point ${point.id} on ${placementDescription}. ` +
      "Point on Entity remains active; select the next entity.",
  );
}

function activatePointCoordinates() {
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
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
  if (statusMessage !== null) {
    commandStatus.textContent = statusMessage;
  }
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

pointOnEntityForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createPointOnEntity();
});

circleRadiusForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createCircleFromInput();
});

offsetForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

circleRadiusInput.addEventListener("input", () => {
  circleCreateButton.disabled =
    circleState.centerPointId === null || getCircleRadiusInputValue() === null;
  renderToolPreview();
});

pointCoordinatesMenu.addEventListener("click", activatePointCoordinates);
pointIntersectMenu.addEventListener("click", activateIntersectingPoint);
pointOnEntityMenu.addEventListener("click", activatePointOnEntity);
exportDxfMenu.addEventListener("click", exportDxf);
lineJoinMenu.addEventListener("click", activateJoin);
circleCenterRadiusMenu.addEventListener("click", activateCircleCenterRadius);
offsetMenu.addEventListener("click", activateOffset);
trimExtendMenu.addEventListener("click", activateTrimExtend);
fileMenuButton.addEventListener("click", () => {
  fileMenuItem.classList.remove("is-dismissed");
});
fileMenuItem.addEventListener("pointerleave", () => {
  fileMenuItem.classList.remove("is-dismissed");
});
drawMenuButton.addEventListener("click", () => {
  drawMenuItem.classList.remove("is-dismissed");
});
drawMenuItem.addEventListener("pointerleave", () => {
  drawMenuItem.classList.remove("is-dismissed");
});
modifyMenuButton.addEventListener("click", () => {
  modifyMenuItem.classList.remove("is-dismissed");
});
modifyMenuItem.addEventListener("pointerleave", () => {
  modifyMenuItem.classList.remove("is-dismissed");
});
editMenuButton.addEventListener("click", () => {
  editMenuItem.classList.remove("is-dismissed");
});
editMenuItem.addEventListener("pointerleave", () => {
  editMenuItem.classList.remove("is-dismissed");
});
undoMenu.addEventListener("click", undoDocumentChange);
redoMenu.addEventListener("click", redoDocumentChange);
deleteMenu.addEventListener("click", deleteSelectedEntity);

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
  if (circleState.active) {
    handleCircleCenterClick(event);
    return;
  }

  if (offsetState.active) {
    handleOffsetClick(event);
    return;
  }

  if (trimExtendState.active) {
    handleTrimExtendClick(event);
    return;
  }

  if (pointOnEntityState.active) {
    handlePointOnEntityClick(event);
    return;
  }

  if (intersectionState.active) {
    handleIntersectingPointClick(event);
    return;
  }

  if (joinState.active) {
    handleJoinClick(event);
    return;
  }

  if (selectionState.mode !== "single") return;

  const entityElement = event.target.closest(
    ".point-entity, .line-entity, .circle-entity, .arc-entity",
  );

  if (entityElement) {
    selectionState.selectedEntityId = Number(entityElement.dataset.entityId);
    renderEntities();
    commandStatus.textContent = `Selected ${entityElement.dataset.entityType} ${selectionState.selectedEntityId}`;
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

pointOnEntityMinimizeButton.addEventListener("click", () => {
  if (pointOnEntityWindow.classList.contains("is-maximized")) {
    restorePointOnEntityWindow();
  }

  const minimized = !pointOnEntityWindow.classList.contains("is-minimized");
  setPointOnEntityWindowMinimized(minimized);
});

pointOnEntityMaximizeButton.addEventListener(
  "click",
  togglePointOnEntityWindowMaximized,
);

pointOnEntityCloseButton.addEventListener("click", () => {
  deactivatePointOnEntity("Point on Entity canceled.");
});

pointOnEntityCancelButton.addEventListener("click", () => {
  deactivatePointOnEntity("Point on Entity canceled.");
});

pointOnEntityWindowTitleBar.addEventListener("pointerdown", (event) => {
  if (
    event.button !== 0 ||
    event.target.closest(".window-control") ||
    pointOnEntityWindow.classList.contains("is-maximized")
  ) {
    return;
  }

  const bounds = pointOnEntityWindow.getBoundingClientRect();
  pointOnEntityWindowState.drag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - bounds.left,
    offsetY: event.clientY - bounds.top,
  };
  pointOnEntityWindowTitleBar.classList.add("is-dragging");
  pointOnEntityWindowTitleBar.setPointerCapture(event.pointerId);
});

pointOnEntityWindowTitleBar.addEventListener("pointermove", (event) => {
  const drag = pointOnEntityWindowState.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;

  const bounds = pointOnEntityWindow.getBoundingClientRect();
  const maxLeft = Math.max(0, window.innerWidth - bounds.width);
  const maxTop = Math.max(
    0,
    window.innerHeight - pointOnEntityWindowTitleBar.offsetHeight,
  );
  const left = Math.min(maxLeft, Math.max(0, event.clientX - drag.offsetX));
  const top = Math.min(maxTop, Math.max(0, event.clientY - drag.offsetY));

  pointOnEntityWindow.style.left = `${left}px`;
  pointOnEntityWindow.style.top = `${top}px`;
  pointOnEntityWindowState.hasPosition = true;
});

function stopPointOnEntityWindowDrag(event) {
  if (pointOnEntityWindowState.drag?.pointerId !== event.pointerId) return;

  pointOnEntityWindowState.drag = null;
  pointOnEntityWindowTitleBar.classList.remove("is-dragging");
  if (pointOnEntityWindowTitleBar.hasPointerCapture(event.pointerId)) {
    pointOnEntityWindowTitleBar.releasePointerCapture(event.pointerId);
  }
}

pointOnEntityWindowTitleBar.addEventListener(
  "pointerup",
  stopPointOnEntityWindowDrag,
);
pointOnEntityWindowTitleBar.addEventListener(
  "pointercancel",
  stopPointOnEntityWindowDrag,
);

pointOnEntityWindowTitleBar.addEventListener("dblclick", (event) => {
  if (!event.target.closest(".window-control")) {
    togglePointOnEntityWindowMaximized();
  }
});

circleMinimizeButton.addEventListener("click", () => {
  if (circleRadiusWindow.classList.contains("is-maximized")) {
    restoreCircleWindow();
  }

  const minimized = !circleRadiusWindow.classList.contains("is-minimized");
  setCircleWindowMinimized(minimized);
});

circleMaximizeButton.addEventListener("click", toggleCircleWindowMaximized);

circleCloseButton.addEventListener("click", () => {
  closeCircleRadiusWindow("Circle canceled.");
});

circleCancelButton.addEventListener("click", () => {
  closeCircleRadiusWindow("Circle canceled.");
});

circleWindowTitleBar.addEventListener("pointerdown", (event) => {
  if (
    event.button !== 0 ||
    event.target.closest(".window-control") ||
    circleRadiusWindow.classList.contains("is-maximized")
  ) {
    return;
  }

  const bounds = circleRadiusWindow.getBoundingClientRect();
  circleWindowState.drag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - bounds.left,
    offsetY: event.clientY - bounds.top,
  };
  circleWindowTitleBar.classList.add("is-dragging");
  circleWindowTitleBar.setPointerCapture(event.pointerId);
});

circleWindowTitleBar.addEventListener("pointermove", (event) => {
  const drag = circleWindowState.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;

  const bounds = circleRadiusWindow.getBoundingClientRect();
  const maxLeft = Math.max(0, window.innerWidth - bounds.width);
  const maxTop = Math.max(0, window.innerHeight - circleWindowTitleBar.offsetHeight);
  const left = Math.min(maxLeft, Math.max(0, event.clientX - drag.offsetX));
  const top = Math.min(maxTop, Math.max(0, event.clientY - drag.offsetY));

  circleRadiusWindow.style.left = `${left}px`;
  circleRadiusWindow.style.top = `${top}px`;
  circleWindowState.hasPosition = true;
});

function stopCircleWindowDrag(event) {
  if (circleWindowState.drag?.pointerId !== event.pointerId) return;

  circleWindowState.drag = null;
  circleWindowTitleBar.classList.remove("is-dragging");
  if (circleWindowTitleBar.hasPointerCapture(event.pointerId)) {
    circleWindowTitleBar.releasePointerCapture(event.pointerId);
  }
}

circleWindowTitleBar.addEventListener("pointerup", stopCircleWindowDrag);
circleWindowTitleBar.addEventListener("pointercancel", stopCircleWindowDrag);

circleWindowTitleBar.addEventListener("dblclick", (event) => {
  if (!event.target.closest(".window-control")) {
    toggleCircleWindowMaximized();
  }
});

offsetMinimizeButton.addEventListener("click", () => {
  if (offsetWindow.classList.contains("is-maximized")) {
    restoreOffsetWindow();
  }

  const minimized = !offsetWindow.classList.contains("is-minimized");
  setOffsetWindowMinimized(minimized);
});

offsetMaximizeButton.addEventListener("click", toggleOffsetWindowMaximized);

offsetCloseButton.addEventListener("click", () => {
  closeOffsetWindow("Offset canceled.");
});

offsetCancelButton.addEventListener("click", () => {
  closeOffsetWindow("Offset canceled.");
});

offsetWindowTitleBar.addEventListener("pointerdown", (event) => {
  if (
    event.button !== 0 ||
    event.target.closest(".window-control") ||
    offsetWindow.classList.contains("is-maximized")
  ) {
    return;
  }

  const bounds = offsetWindow.getBoundingClientRect();
  offsetWindowState.drag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - bounds.left,
    offsetY: event.clientY - bounds.top,
  };
  offsetWindowTitleBar.classList.add("is-dragging");
  offsetWindowTitleBar.setPointerCapture(event.pointerId);
});

offsetWindowTitleBar.addEventListener("pointermove", (event) => {
  const drag = offsetWindowState.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;

  const bounds = offsetWindow.getBoundingClientRect();
  const maxLeft = Math.max(0, window.innerWidth - bounds.width);
  const maxTop = Math.max(0, window.innerHeight - offsetWindowTitleBar.offsetHeight);
  const left = Math.min(maxLeft, Math.max(0, event.clientX - drag.offsetX));
  const top = Math.min(maxTop, Math.max(0, event.clientY - drag.offsetY));

  offsetWindow.style.left = `${left}px`;
  offsetWindow.style.top = `${top}px`;
  offsetWindowState.hasPosition = true;
});

function stopOffsetWindowDrag(event) {
  if (offsetWindowState.drag?.pointerId !== event.pointerId) return;

  offsetWindowState.drag = null;
  offsetWindowTitleBar.classList.remove("is-dragging");
  if (offsetWindowTitleBar.hasPointerCapture(event.pointerId)) {
    offsetWindowTitleBar.releasePointerCapture(event.pointerId);
  }
}

offsetWindowTitleBar.addEventListener("pointerup", stopOffsetWindowDrag);
offsetWindowTitleBar.addEventListener("pointercancel", stopOffsetWindowDrag);

offsetWindowTitleBar.addEventListener("dblclick", (event) => {
  if (!event.target.closest(".window-control")) {
    toggleOffsetWindowMaximized();
  }
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
  const isEditingText = event.target.closest(
    "input, textarea, select, [contenteditable='true']",
  );
  const commandKey = event.ctrlKey || event.metaKey;

  if (!isEditingText && commandKey && !event.altKey) {
    const key = event.key.toLowerCase();
    if (key === "z") {
      event.preventDefault();
      if (event.shiftKey) {
        redoDocumentChange();
      } else {
        undoDocumentChange();
      }
      return;
    }

    if (key === "y") {
      event.preventDefault();
      redoDocumentChange();
      return;
    }
  }

  if (!isEditingText && event.key === "Delete") {
    event.preventDefault();
    deleteSelectedEntity();
    return;
  }

  if (event.key === "Escape" && !pointCoordinatesWindow.hidden) {
    closePointCoordinatesWindow();
    return;
  }

  if (event.key === "Escape" && pointOnEntityState.active) {
    deactivatePointOnEntity("Point on Entity canceled.");
    return;
  }

  if (event.key === "Escape" && !circleRadiusWindow.hidden) {
    closeCircleRadiusWindow("Circle canceled.");
    return;
  }

  if (event.key === "Escape" && !offsetWindow.hidden) {
    closeOffsetWindow("Offset canceled.");
    return;
  }

  if (event.key === "Escape" && intersectionState.active) {
    deactivateIntersectingPoint("Point - Intersecting canceled.");
    return;
  }

  if (event.key === "Escape" && trimExtendState.active) {
    deactivateTrimExtend("Trim/Extend canceled.");
    return;
  }

  if (event.key === "Escape" && joinState.active) {
    deactivateJoin("Line - Join canceled.");
  }
});

function keepToolWindowInViewport(toolWindow, titleBar) {
  if (toolWindow.hidden || toolWindow.classList.contains("is-maximized")) return;

  const bounds = toolWindow.getBoundingClientRect();
  const left = Math.min(bounds.left, Math.max(0, window.innerWidth - bounds.width));
  const top = Math.min(
    bounds.top,
    Math.max(0, window.innerHeight - titleBar.offsetHeight),
  );
  toolWindow.style.left = `${Math.max(0, left)}px`;
  toolWindow.style.top = `${Math.max(0, top)}px`;
}

window.addEventListener("resize", () => {
  fitViewToCanvas();
  keepToolWindowInViewport(pointCoordinatesWindow, pointWindowTitleBar);
  keepToolWindowInViewport(circleRadiusWindow, circleWindowTitleBar);
  keepToolWindowInViewport(offsetWindow, offsetWindowTitleBar);
  keepToolWindowInViewport(
    pointOnEntityWindow,
    pointOnEntityWindowTitleBar,
  );
});

cadCanvas.addEventListener("mousemove", (event) => {
  const worldPoint = screenToWorld(event);
  cursorX.textContent = `X: ${formatCoordinate(worldPoint.x)}`;
  cursorY.textContent = `Y: ${formatCoordinate(worldPoint.y)}`;
  updateEntityHoverInfo(event.target);

  if (joinState.active && joinState.firstPointId !== null) {
    const hoveredPointElement = event.target.closest(".point-entity");
    const hoveredPoint = hoveredPointElement
      ? getPointById(Number(hoveredPointElement.dataset.entityId))
      : null;
    joinState.previewWorld = hoveredPoint ?? worldPoint;
    renderToolPreview();
  }
});

cadCanvas.addEventListener("mouseleave", () => {
  cursorX.textContent = "X: ----";
  cursorY.textContent = "Y: ----";
  clearEntityHoverInfo();

  if (joinState.active && joinState.firstPointId !== null) {
    joinState.previewWorld = null;
    renderToolPreview();
  }
});

fitViewToCanvas();

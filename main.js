// PrometheusCAD coordinate law:
//
// This program is built by a machinist, for machinists.
//
// X0 Y0 is the point where the axes cross.
// X+ moves right.
// Y+ moves up.
// Therefore X+ Y+ is the upper-right quadrant.
//
// SVG/browser coordinates normally put positive Y downward.
// That is NOT PrometheusCAD's user-facing coordinate system.
// Any SVG weirdness must be handled internally.

const APP_NAME = "PrometheusCAD";
const APP_VERSION = "0.1.1";

const cadCanvas = document.querySelector("#cadCanvas");
const gridLayer = document.querySelector("#gridLayer");
const axisLayer = document.querySelector("#axisLayer");
const entityLayer = document.querySelector("#entityLayer");
const previewLayer = document.querySelector("#previewLayer");
const worldLayer = document.querySelector("#worldLayer");
const cadHorizontalScrollbar = document.querySelector(
  "#cadHorizontalScrollbar",
);
const cadHorizontalTrack = document.querySelector("#cadHorizontalTrack");
const cadHorizontalThumb = document.querySelector("#cadHorizontalThumb");
const cadScrollLeft = document.querySelector("#cadScrollLeft");
const cadScrollRight = document.querySelector("#cadScrollRight");
const cadVerticalScrollbar = document.querySelector("#cadVerticalScrollbar");
const cadVerticalTrack = document.querySelector("#cadVerticalTrack");
const cadVerticalThumb = document.querySelector("#cadVerticalThumb");
const cadScrollUp = document.querySelector("#cadScrollUp");
const cadScrollDown = document.querySelector("#cadScrollDown");
const pointCoordinatesWindow = document.querySelector("#pointCoordinatesWindow");
const pointWindowTitleBar = document.querySelector("#pointWindowTitleBar");
const pointCoordinatesForm = document.querySelector("#pointCoordinatesForm");
const pointCoordinatesMenu = document.querySelector("#pointCoordinatesMenu");
const pointIntersectMenu = document.querySelector("#pointIntersectMenu");
const pointOnEntityMenu = document.querySelector("#pointOnEntityMenu");
const pointSketchMenu = document.querySelector("#pointSketchMenu");
const lineCoordinatesMenu = document.querySelector("#lineCoordinatesMenu");
const lineSketchMenu = document.querySelector("#lineSketchMenu");
const exportDxfMenu = document.querySelector("#exportDxfMenu");
const fileMenuItem = exportDxfMenu.closest(".menu-item");
const fileMenuButton = fileMenuItem.querySelector(".menu-button");
const lineJoinMenu = document.querySelector("#lineJoinMenu");
const circleCenterRadiusMenu = document.querySelector("#circleCenterRadiusMenu");
const circleSketchCenterMenu = document.querySelector("#circleSketchCenterMenu");
const circleThreeEntitiesMenu = document.querySelector("#circleThreeEntitiesMenu");
const hexagonMenu = document.querySelector("#hexagonMenu");
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
const lineCoordinatesWindow = document.querySelector("#lineCoordinatesWindow");
const lineCoordinatesWindowTitleBar = document.querySelector(
  "#lineCoordinatesWindowTitleBar",
);
const lineCoordinatesForm = document.querySelector("#lineCoordinatesForm");
const lineStartXInput = document.querySelector("#lineStartX");
const lineStartYInput = document.querySelector("#lineStartY");
const lineEndXInput = document.querySelector("#lineEndX");
const lineEndYInput = document.querySelector("#lineEndY");
const lineCoordinatesToolMessage = document.querySelector(
  "#lineCoordinatesToolMessage",
);
const lineCoordinatesMinimizeButton = document.querySelector(
  "#lineCoordinatesMinimizeButton",
);
const lineCoordinatesMaximizeButton = document.querySelector(
  "#lineCoordinatesMaximizeButton",
);
const lineCoordinatesMaximizeIcon = document.querySelector(
  "#lineCoordinatesMaximizeIcon",
);
const lineCoordinatesCloseButton = document.querySelector(
  "#lineCoordinatesCloseButton",
);
const lineCoordinatesContinueButton = document.querySelector(
  "#lineCoordinatesContinueButton",
);
const lineCoordinatesCancelButton = document.querySelector(
  "#lineCoordinatesCancelButton",
);
const circleRadiusWindow = document.querySelector("#circleRadiusWindow");
const circleWindowTitleBar = document.querySelector("#circleWindowTitleBar");
const circleRadiusTitle = document.querySelector("#circleRadiusTitle");
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
const hexagonWindow = document.querySelector("#hexagonWindow");
const hexagonWindowTitleBar = document.querySelector("#hexagonWindowTitleBar");
const hexagonForm = document.querySelector("#hexagonForm");
const hexagonAcrossFlatsInput = document.querySelector(
  "#hexagonAcrossFlats",
);
const hexagonCornerRadiusInput = document.querySelector(
  "#hexagonCornerRadius",
);
const hexagonCenterReadout = document.querySelector("#hexagonCenterReadout");
const hexagonToolMessage = document.querySelector("#hexagonToolMessage");
const hexagonCreateButton = document.querySelector("#hexagonCreateButton");
const hexagonMinimizeButton = document.querySelector(
  "#hexagonMinimizeButton",
);
const hexagonMaximizeButton = document.querySelector(
  "#hexagonMaximizeButton",
);
const hexagonMaximizeIcon = document.querySelector("#hexagonMaximizeIcon");
const hexagonCloseButton = document.querySelector("#hexagonCloseButton");
const hexagonCancelButton = document.querySelector("#hexagonCancelButton");
const trimExtendMenu = document.querySelector("#trimExtendMenu");
const filletRadiusMenu = document.querySelector("#filletRadiusMenu");
const offsetMenu = document.querySelector("#offsetMenu");
const rotateMenu = document.querySelector("#rotateMenu");
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
const filletWindow = document.querySelector("#filletWindow");
const filletWindowTitleBar = document.querySelector("#filletWindowTitleBar");
const filletForm = document.querySelector("#filletForm");
const filletRadiusInput = document.querySelector("#filletRadius");
const filletTrimExtendInput = document.querySelector("#filletTrimExtend");
const filletSourceReadout = document.querySelector("#filletSourceReadout");
const filletToolMessage = document.querySelector("#filletToolMessage");
const filletMinimizeButton = document.querySelector("#filletMinimizeButton");
const filletMaximizeButton = document.querySelector("#filletMaximizeButton");
const filletMaximizeIcon = document.querySelector("#filletMaximizeIcon");
const filletCloseButton = document.querySelector("#filletCloseButton");
const filletCancelButton = document.querySelector("#filletCancelButton");
const rotateWindow = document.querySelector("#rotateWindow");
const rotateWindowTitleBar = document.querySelector("#rotateWindowTitleBar");
const rotateForm = document.querySelector("#rotateForm");
const rotateAngleInput = document.querySelector("#rotateAngle");
const rotatePivotOriginInput = document.querySelector("#rotatePivotOrigin");
const rotatePivotPointInput = document.querySelector("#rotatePivotPoint");
const rotateSelectionReadout = document.querySelector(
  "#rotateSelectionReadout",
);
const rotatePivotReadout = document.querySelector("#rotatePivotReadout");
const rotateChoosePointButton = document.querySelector(
  "#rotateChoosePointButton",
);
const rotateToolMessage = document.querySelector("#rotateToolMessage");
const rotateMinimizeButton = document.querySelector("#rotateMinimizeButton");
const rotateMaximizeButton = document.querySelector("#rotateMaximizeButton");
const rotateMaximizeIcon = document.querySelector("#rotateMaximizeIcon");
const rotateCloseButton = document.querySelector("#rotateCloseButton");
const rotateCancelButton = document.querySelector("#rotateCancelButton");
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
const windowZoomMenu = document.querySelector("#windowZoomMenu");
const homeViewMenu = document.querySelector("#homeViewMenu");
const viewMenuItem = windowZoomMenu.closest(".menu-item");
const viewMenuButton = viewMenuItem.querySelector(".menu-button");
const layerCurrentMenu = document.querySelector("#layerCurrentMenu");
const newLayerMenu = document.querySelector("#newLayerMenu");
const layerMenuItem = layerCurrentMenu.closest(".menu-item");
const layerMenuButton = layerMenuItem.querySelector(".menu-button");
const aboutMenu = document.querySelector("#aboutMenu");
const helpMenuItem = aboutMenu.closest(".menu-item");
const helpMenuButton = helpMenuItem.querySelector(".menu-button");
const aboutWindow = document.querySelector("#aboutWindow");
const aboutWindowTitleBar = document.querySelector("#aboutWindowTitleBar");
const aboutCloseButton = document.querySelector("#aboutCloseButton");
const aboutVersion = document.querySelector("#aboutVersion");
const quickUndoButton = document.querySelector("#quickUndoButton");
const quickRedoButton = document.querySelector("#quickRedoButton");
const quickZoomInButton = document.querySelector("#quickZoomInButton");
const quickZoomOutButton = document.querySelector("#quickZoomOutButton");
const quickZoomWindowButton = document.querySelector(
  "#quickZoomWindowButton",
);
const quickCalculatorButton = document.querySelector(
  "#quickCalculatorButton",
);
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
  centerX: 0,
  centerY: 0,
  viewWidth: BASE_VIEW.width,
  viewHeight: BASE_VIEW.height,
  navigationAnchor: null,
};

const viewportScrollState = {
  horizontal: {
    enabled: false,
    minCenter: 0,
    maxCenter: 0,
  },
  vertical: {
    enabled: false,
    minCenter: 0,
    maxCenter: 0,
  },
  drag: null,
};

const windowZoomState = {
  active: false,
  drag: null,
  canceledPointerId: null,
  suppressClickUntil: 0,
};

const selectionState = {
  mode: null,
  selectedEntityId: null,
  hoveredEntityId: null,
  pickCycle: null,
};

const joinState = {
  active: false,
  firstPointId: null,
  previewWorld: null,
};

const pointSketchState = {
  active: false,
};

const lineSketchState = {
  active: false,
  startPointId: null,
  previewWorld: null,
};

const circleState = {
  active: false,
  centerPointId: null,
  centerMode: null,
};

const hexagonState = {
  active: false,
  centerPointId: null,
};

const intersectionState = {
  active: false,
  firstEntityId: null,
};

const threeEntityCircleState = {
  active: false,
  entityIds: [],
  clickPoints: [],
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

const filletState = {
  active: false,
  firstEntityId: null,
  firstPickWorld: null,
};

const rotateState = {
  active: false,
  entityId: null,
  pivotPointId: null,
  awaitingPivot: false,
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

const lineCoordinatesWindowState = {
  hasPosition: false,
  restoreBounds: null,
  drag: null,
};

const circleWindowState = {
  hasPosition: false,
  restoreBounds: null,
  drag: null,
};

const hexagonWindowState = {
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

const filletWindowState = {
  hasPosition: false,
  restoreBounds: null,
  drag: null,
};

const rotateWindowState = {
  hasPosition: false,
  restoreBounds: null,
  drag: null,
};

const aboutWindowState = {
  hasPosition: false,
  drag: null,
};

let calculatorWindow = null;
let calculatorHasBeenPositioned = false;

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

function applyApplicationIdentity() {
  const displayVersion = `V${APP_VERSION}`;
  document.title = `${APP_NAME} ${displayVersion}`;
  const versionMetadata = document.querySelector('meta[name="version"]');
  const headerVersion = document.querySelector(".app-version");
  if (versionMetadata) versionMetadata.content = APP_VERSION;
  if (headerVersion) headerVersion.textContent = displayVersion;
  aboutVersion.textContent = `${APP_NAME} ${displayVersion}`;
}

function clampViewportValue(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function getDocumentGeometryBounds() {
  const bounds = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
  };

  function includePoint(x, y) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    bounds.minX = Math.min(bounds.minX, x);
    bounds.minY = Math.min(bounds.minY, y);
    bounds.maxX = Math.max(bounds.maxX, x);
    bounds.maxY = Math.max(bounds.maxY, y);
  }

  documentModel.entities.forEach((entity) => {
    if (entity.type === "point") {
      if (!entity.isConstruction) includePoint(entity.x, entity.y);
      return;
    }

    if (entity.type === "line") {
      const endpoints = getLineEndpointPair(entity);
      if (!endpoints) return;
      includePoint(endpoints.startPoint.x, endpoints.startPoint.y);
      includePoint(endpoints.endPoint.x, endpoints.endPoint.y);
      return;
    }

    if (entity.type === "circle") {
      const centerPoint = getPointById(entity.centerPointId);
      if (!centerPoint || !Number.isFinite(entity.radius)) return;
      includePoint(centerPoint.x - entity.radius, centerPoint.y - entity.radius);
      includePoint(centerPoint.x + entity.radius, centerPoint.y + entity.radius);
      return;
    }

    if (entity.type !== "arc") return;
    const centerPoint = getPointById(entity.centerPointId);
    const startPoint = getPointById(entity.startPointId);
    const endPoint = getPointById(entity.endPointId);
    if (
      !centerPoint ||
      !startPoint ||
      !endPoint ||
      !Number.isFinite(entity.radius)
    ) {
      return;
    }

    const startAngle = Math.atan2(
      startPoint.y - centerPoint.y,
      startPoint.x - centerPoint.x,
    );
    const endAngle = Math.atan2(
      endPoint.y - centerPoint.y,
      endPoint.x - centerPoint.x,
    );
    includePoint(startPoint.x, startPoint.y);
    includePoint(endPoint.x, endPoint.y);
    [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].forEach((angle) => {
      if (!isAngleOnCounterClockwiseArc(angle, startAngle, endAngle)) return;
      includePoint(
        centerPoint.x + Math.cos(angle) * entity.radius,
        centerPoint.y + Math.sin(angle) * entity.radius,
      );
    });
  });

  return Number.isFinite(bounds.minX) ? bounds : null;
}

function getViewportScrollMetrics() {
  const viewWidth = viewState.viewWidth;
  const viewHeight = viewState.viewHeight;
  const homeBounds = {
    minX: ORIGIN.x - viewWidth / 2,
    maxX: ORIGIN.x + viewWidth / 2,
    minY: ORIGIN.y - viewHeight / 2,
    maxY: ORIGIN.y + viewHeight / 2,
  };
  const geometryBounds = getDocumentGeometryBounds();
  const paddingX = Math.max(viewWidth * 0.025, 0.05);
  const paddingY = Math.max(viewHeight * 0.025, 0.05);
  const contentBounds = { ...homeBounds };

  if (viewState.navigationAnchor) {
    contentBounds.minX = Math.min(
      contentBounds.minX,
      viewState.navigationAnchor.x - viewWidth / 2,
    );
    contentBounds.maxX = Math.max(
      contentBounds.maxX,
      viewState.navigationAnchor.x + viewWidth / 2,
    );
    contentBounds.minY = Math.min(
      contentBounds.minY,
      viewState.navigationAnchor.y - viewHeight / 2,
    );
    contentBounds.maxY = Math.max(
      contentBounds.maxY,
      viewState.navigationAnchor.y + viewHeight / 2,
    );
  }

  if (geometryBounds) {
    if (geometryBounds.minX < homeBounds.minX - GEOMETRY_EPSILON) {
      contentBounds.minX = geometryBounds.minX - paddingX;
    }
    if (geometryBounds.maxX > homeBounds.maxX + GEOMETRY_EPSILON) {
      contentBounds.maxX = geometryBounds.maxX + paddingX;
    }
    if (geometryBounds.minY < homeBounds.minY - GEOMETRY_EPSILON) {
      contentBounds.minY = geometryBounds.minY - paddingY;
    }
    if (geometryBounds.maxY > homeBounds.maxY + GEOMETRY_EPSILON) {
      contentBounds.maxY = geometryBounds.maxY + paddingY;
    }
  }

  const horizontal = {
    minCenter: contentBounds.minX + viewWidth / 2,
    maxCenter: contentBounds.maxX - viewWidth / 2,
    contentSize: contentBounds.maxX - contentBounds.minX,
    viewSize: viewWidth,
  };
  const vertical = {
    minCenter: contentBounds.minY + viewHeight / 2,
    maxCenter: contentBounds.maxY - viewHeight / 2,
    contentSize: contentBounds.maxY - contentBounds.minY,
    viewSize: viewHeight,
  };
  horizontal.enabled =
    horizontal.maxCenter - horizontal.minCenter > GEOMETRY_EPSILON;
  vertical.enabled =
    vertical.maxCenter - vertical.minCenter > GEOMETRY_EPSILON;

  if (!horizontal.enabled) {
    horizontal.minCenter = ORIGIN.x;
    horizontal.maxCenter = ORIGIN.x;
  }
  if (!vertical.enabled) {
    vertical.minCenter = ORIGIN.y;
    vertical.maxCenter = ORIGIN.y;
  }

  return { horizontal, vertical };
}

function updateCadScrollbarUi(metrics) {
  const scrollbarDefinitions = [
    {
      axis: "horizontal",
      container: cadHorizontalScrollbar,
      track: cadHorizontalTrack,
      thumb: cadHorizontalThumb,
      buttons: [cadScrollLeft, cadScrollRight],
      center: viewState.centerX,
      trackSize: cadHorizontalTrack.clientWidth,
      sizeProperty: "width",
      positionProperty: "left",
    },
    {
      axis: "vertical",
      container: cadVerticalScrollbar,
      track: cadVerticalTrack,
      thumb: cadVerticalThumb,
      buttons: [cadScrollUp, cadScrollDown],
      center: viewState.centerY,
      trackSize: cadVerticalTrack.clientHeight,
      sizeProperty: "height",
      positionProperty: "top",
    },
  ];

  scrollbarDefinitions.forEach((definition) => {
    const axisMetrics = metrics[definition.axis];
    const enabled = axisMetrics.enabled && definition.trackSize > 0;
    definition.container.classList.toggle("is-disabled", !enabled);
    definition.buttons.forEach((button) => {
      button.disabled = !enabled;
    });
    definition.track.setAttribute("aria-disabled", String(!enabled));
    definition.track.tabIndex = enabled ? 0 : -1;

    if (!enabled) {
      definition.thumb.style[definition.positionProperty] = "0px";
      definition.thumb.style[definition.sizeProperty] = "100%";
      definition.track.setAttribute("aria-valuenow", "0");
      return;
    }

    const centerRange = axisMetrics.maxCenter - axisMetrics.minCenter;
    let ratio =
      (definition.center - axisMetrics.minCenter) / centerRange;
    if (definition.axis === "vertical") ratio = 1 - ratio;
    ratio = clampViewportValue(ratio, 0, 1);
    const thumbSize = Math.min(
      definition.trackSize,
      Math.max(
        20,
        definition.trackSize *
          (axisMetrics.viewSize / axisMetrics.contentSize),
      ),
    );
    const thumbPosition = ratio * (definition.trackSize - thumbSize);
    definition.thumb.style[definition.sizeProperty] = `${thumbSize}px`;
    definition.thumb.style[definition.positionProperty] =
      `${thumbPosition}px`;
    definition.track.setAttribute(
      "aria-valuenow",
      String(Math.round(ratio * 100)),
    );
  });
}

function syncViewportToDocument() {
  if (
    !Number.isFinite(viewState.viewWidth) ||
    !Number.isFinite(viewState.viewHeight) ||
    viewState.viewWidth <= 0 ||
    viewState.viewHeight <= 0
  ) {
    return;
  }

  const metrics = getViewportScrollMetrics();
  viewportScrollState.horizontal = metrics.horizontal;
  viewportScrollState.vertical = metrics.vertical;
  viewState.centerX = clampViewportValue(
    viewState.centerX,
    metrics.horizontal.minCenter,
    metrics.horizontal.maxCenter,
  );
  viewState.centerY = clampViewportValue(
    viewState.centerY,
    metrics.vertical.minCenter,
    metrics.vertical.maxCenter,
  );

  VIEW.xMin = viewState.centerX - viewState.viewWidth / 2;
  VIEW.xMax = viewState.centerX + viewState.viewWidth / 2;
  VIEW.yMin = viewState.centerY - viewState.viewHeight / 2;
  VIEW.yMax = viewState.centerY + viewState.viewHeight / 2;

  cadCanvas.setAttribute(
    "viewBox",
    `${VIEW.xMin} ${-VIEW.yMax} ${viewState.viewWidth} ${viewState.viewHeight}`,
  );
  drawAxesAndTicks();
  updateCadScrollbarUi(metrics);
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
  viewState.viewWidth = viewWidth;
  viewState.viewHeight = viewHeight;
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
  deactivateWindowZoom();
  setZoom(viewState.zoom + ZOOM_STEP, "Zoom In");
}

function zoomOut() {
  deactivateWindowZoom();
  setZoom(viewState.zoom - ZOOM_STEP, "Zoom Out");
}

function homeView() {
  deactivateWindowZoom();
  viewState.centerX = ORIGIN.x;
  viewState.centerY = ORIGIN.y;
  viewState.navigationAnchor = null;
  setZoom(1, "Home");
}

function dismissViewMenu() {
  viewMenuItem.classList.add("is-dismissed");
  document.activeElement?.blur();
}

function deactivateWindowZoom(statusMessage = null) {
  const drag = windowZoomState.drag;
  if (drag) {
    windowZoomState.canceledPointerId = drag.pointerId;
    windowZoomState.suppressClickUntil = Infinity;
  }
  if (
    drag &&
    cadCanvas.hasPointerCapture?.(drag.pointerId)
  ) {
    cadCanvas.releasePointerCapture(drag.pointerId);
  }
  windowZoomState.active = false;
  windowZoomState.drag = null;
  cadCanvas.classList.remove("window-zoom");
  quickZoomWindowButton.classList.remove("is-active");
  quickZoomWindowButton.setAttribute("aria-pressed", "false");
  renderToolPreview();
  if (statusMessage) commandStatus.textContent = statusMessage;
}

function activateWindowZoom() {
  dismissViewMenu();
  deactivateWindowZoom();
  windowZoomState.active = true;
  windowZoomState.canceledPointerId = null;
  windowZoomState.suppressClickUntil = 0;
  cadCanvas.classList.add("window-zoom");
  quickZoomWindowButton.classList.add("is-active");
  quickZoomWindowButton.setAttribute("aria-pressed", "true");
  setSelectionProximityHover(null);
  clearEntityHoverInfo();
  renderToolPreview();
  commandStatus.textContent =
    "View - Window: Drag an area to enlarge. Window remains active until another action or Escape.";
}

function getAspectMatchedWindowRect(startClientX, startClientY, clientX, clientY) {
  const canvasBounds = cadCanvas.getBoundingClientRect();
  const clampedX = clampViewportValue(
    clientX,
    canvasBounds.left,
    canvasBounds.right,
  );
  const clampedY = clampViewportValue(
    clientY,
    canvasBounds.top,
    canvasBounds.bottom,
  );
  const rawLeft = Math.min(startClientX, clampedX);
  const rawRight = Math.max(startClientX, clampedX);
  const rawTop = Math.min(startClientY, clampedY);
  const rawBottom = Math.max(startClientY, clampedY);
  const rawWidth = rawRight - rawLeft;
  const rawHeight = rawBottom - rawTop;
  const canvasAspect = canvasBounds.width / canvasBounds.height;

  if (
    rawWidth <= GEOMETRY_EPSILON ||
    rawHeight <= GEOMETRY_EPSILON ||
    !Number.isFinite(canvasAspect) ||
    canvasAspect <= 0
  ) {
    return {
      left: rawLeft,
      right: rawRight,
      top: rawTop,
      bottom: rawBottom,
      width: rawWidth,
      height: rawHeight,
      rawWidth,
      rawHeight,
    };
  }

  let width = rawWidth;
  let height = rawHeight;
  if (rawWidth / rawHeight > canvasAspect) {
    height = rawWidth / canvasAspect;
  } else {
    width = rawHeight * canvasAspect;
  }

  const centerX = (rawLeft + rawRight) / 2;
  const centerY = (rawTop + rawBottom) / 2;
  let left = centerX - width / 2;
  let top = centerY - height / 2;
  left = clampViewportValue(
    left,
    canvasBounds.left,
    canvasBounds.right - width,
  );
  top = clampViewportValue(
    top,
    canvasBounds.top,
    canvasBounds.bottom - height,
  );

  return {
    left,
    right: left + width,
    top,
    bottom: top + height,
    width,
    height,
    rawWidth,
    rawHeight,
  };
}

function updateWindowZoomDrag(event) {
  const drag = windowZoomState.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;
  const screenBounds = getAspectMatchedWindowRect(
    drag.startClientX,
    drag.startClientY,
    event.clientX,
    event.clientY,
  );
  const topLeft = screenPointToWorld(screenBounds.left, screenBounds.top);
  const bottomRight = screenPointToWorld(
    screenBounds.right,
    screenBounds.bottom,
  );
  drag.screenBounds = screenBounds;
  drag.worldBounds = {
    minX: Math.min(topLeft.x, bottomRight.x),
    maxX: Math.max(topLeft.x, bottomRight.x),
    minY: Math.min(topLeft.y, bottomRight.y),
    maxY: Math.max(topLeft.y, bottomRight.y),
  };
  renderToolPreview();
}

function completeWindowZoom(event) {
  const drag = windowZoomState.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;
  updateWindowZoomDrag(event);
  const { screenBounds, worldBounds } = drag;
  if (cadCanvas.hasPointerCapture?.(event.pointerId)) {
    cadCanvas.releasePointerCapture(event.pointerId);
  }
  windowZoomState.drag = null;
  windowZoomState.suppressClickUntil = performance.now() + 200;

  if (
    !screenBounds ||
    !worldBounds ||
    screenBounds.rawWidth < 5 ||
    screenBounds.rawHeight < 5
  ) {
    renderToolPreview();
    commandStatus.textContent =
      "View - Window: Drag a larger rectangular area. Window remains active.";
    return;
  }

  const selectedWidth = worldBounds.maxX - worldBounds.minX;
  const baseViewWidth = viewState.viewWidth * viewState.zoom;
  const targetZoom = clampViewportValue(
    baseViewWidth / selectedWidth,
    Math.max(MIN_ZOOM, viewState.zoom),
    MAX_ZOOM,
  );
  const centerX = (worldBounds.minX + worldBounds.maxX) / 2;
  const centerY = (worldBounds.minY + worldBounds.maxY) / 2;

  viewState.zoom = targetZoom;
  viewState.centerX = centerX;
  viewState.centerY = centerY;
  viewState.navigationAnchor = { x: centerX, y: centerY };
  fitViewToCanvas();

  const zoomPercent = Math.round(viewState.zoom * 100);
  zoomStatus.textContent = `Zoom: ${zoomPercent}%`;
  commandStatus.textContent =
    `View - Window: X${formatCoordinate(VIEW.xMin)} to ` +
    `X${formatCoordinate(VIEW.xMax)}, Y${formatCoordinate(VIEW.yMin)} to ` +
    `Y${formatCoordinate(VIEW.yMax)} (${zoomPercent}%). ` +
    "Window remains active; drag the next area or choose another action.";
}

function cancelWindowZoomDrag(event) {
  const drag = windowZoomState.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;
  windowZoomState.drag = null;
  windowZoomState.canceledPointerId = null;
  windowZoomState.suppressClickUntil = 0;
  renderToolPreview();
  commandStatus.textContent =
    "View - Window: Drag interrupted. Window remains active.";
}

function panViewportTo(axis, nextCenter) {
  const axisState = viewportScrollState[axis];
  if (!axisState.enabled) return;
  const stateProperty = axis === "horizontal" ? "centerX" : "centerY";
  viewState[stateProperty] = clampViewportValue(
    nextCenter,
    axisState.minCenter,
    axisState.maxCenter,
  );
  syncViewportToDocument();
}

function panViewportBy(axis, distance) {
  const stateProperty = axis === "horizontal" ? "centerX" : "centerY";
  panViewportTo(axis, viewState[stateProperty] + distance);
}

function pageViewportTowardPointer(axis, event) {
  const axisState = viewportScrollState[axis];
  if (!axisState.enabled) return;
  const thumb =
    axis === "horizontal" ? cadHorizontalThumb : cadVerticalThumb;
  const thumbBounds = thumb.getBoundingClientRect();
  const pointerPosition =
    axis === "horizontal" ? event.clientX : event.clientY;
  const thumbStart =
    axis === "horizontal" ? thumbBounds.left : thumbBounds.top;
  const thumbEnd =
    axis === "horizontal" ? thumbBounds.right : thumbBounds.bottom;
  if (pointerPosition >= thumbStart && pointerPosition <= thumbEnd) return;

  const viewSize =
    axis === "horizontal" ? viewState.viewWidth : viewState.viewHeight;
  const visualDirection = pointerPosition < thumbStart ? -1 : 1;
  const worldDirection =
    axis === "vertical" ? -visualDirection : visualDirection;
  panViewportBy(axis, worldDirection * viewSize * 0.8);
}

function beginViewportScrollbarDrag(axis, event) {
  const axisState = viewportScrollState[axis];
  if (!axisState.enabled || event.button !== 0) return;
  event.preventDefault();
  event.stopPropagation();
  const thumb =
    axis === "horizontal" ? cadHorizontalThumb : cadVerticalThumb;
  viewportScrollState.drag = {
    axis,
    pointerId: event.pointerId,
    startPointer:
      axis === "horizontal" ? event.clientX : event.clientY,
    startCenter:
      axis === "horizontal" ? viewState.centerX : viewState.centerY,
  };
  thumb.setPointerCapture(event.pointerId);
}

function continueViewportScrollbarDrag(event) {
  const drag = viewportScrollState.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;
  const axisState = viewportScrollState[drag.axis];
  const track =
    drag.axis === "horizontal" ? cadHorizontalTrack : cadVerticalTrack;
  const thumb =
    drag.axis === "horizontal" ? cadHorizontalThumb : cadVerticalThumb;
  const trackSize =
    drag.axis === "horizontal" ? track.clientWidth : track.clientHeight;
  const thumbSize =
    drag.axis === "horizontal" ? thumb.offsetWidth : thumb.offsetHeight;
  const travel = trackSize - thumbSize;
  if (travel <= 0) return;

  const pointer =
    drag.axis === "horizontal" ? event.clientX : event.clientY;
  const visualDelta = pointer - drag.startPointer;
  const centerRange = axisState.maxCenter - axisState.minCenter;
  const direction = drag.axis === "vertical" ? -1 : 1;
  panViewportTo(
    drag.axis,
    drag.startCenter + (visualDelta / travel) * centerRange * direction,
  );
}

function endViewportScrollbarDrag(event) {
  const drag = viewportScrollState.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;
  const thumb =
    drag.axis === "horizontal" ? cadHorizontalThumb : cadVerticalThumb;
  if (thumb.hasPointerCapture(event.pointerId)) {
    thumb.releasePointerCapture(event.pointerId);
  }
  viewportScrollState.drag = null;
}

function handleViewportScrollbarKey(axis, event) {
  const axisState = viewportScrollState[axis];
  if (!axisState.enabled) return;
  const viewSize =
    axis === "horizontal" ? viewState.viewWidth : viewState.viewHeight;
  const smallStep = viewSize * 0.1;
  const pageStep = viewSize * 0.8;
  let nextCenter =
    axis === "horizontal" ? viewState.centerX : viewState.centerY;

  if (axis === "horizontal" && event.key === "ArrowLeft") {
    nextCenter -= smallStep;
  } else if (axis === "horizontal" && event.key === "ArrowRight") {
    nextCenter += smallStep;
  } else if (axis === "vertical" && event.key === "ArrowUp") {
    nextCenter += smallStep;
  } else if (axis === "vertical" && event.key === "ArrowDown") {
    nextCenter -= smallStep;
  } else if (event.key === "PageUp") {
    nextCenter += axis === "vertical" ? pageStep : -pageStep;
  } else if (event.key === "PageDown") {
    nextCenter += axis === "vertical" ? -pageStep : pageStep;
  } else if (event.key === "Home") {
    nextCenter =
      axis === "vertical" ? axisState.maxCenter : axisState.minCenter;
  } else if (event.key === "End") {
    nextCenter =
      axis === "vertical" ? axisState.minCenter : axisState.maxCenter;
  } else {
    return;
  }

  event.preventDefault();
  panViewportTo(axis, nextCenter);
}

cadScrollLeft.addEventListener("click", () => {
  panViewportBy("horizontal", -viewState.viewWidth * 0.1);
});
cadScrollRight.addEventListener("click", () => {
  panViewportBy("horizontal", viewState.viewWidth * 0.1);
});
cadScrollUp.addEventListener("click", () => {
  panViewportBy("vertical", viewState.viewHeight * 0.1);
});
cadScrollDown.addEventListener("click", () => {
  panViewportBy("vertical", -viewState.viewHeight * 0.1);
});
cadHorizontalTrack.addEventListener("pointerdown", (event) => {
  if (event.target === cadHorizontalTrack) {
    pageViewportTowardPointer("horizontal", event);
  }
});
cadVerticalTrack.addEventListener("pointerdown", (event) => {
  if (event.target === cadVerticalTrack) {
    pageViewportTowardPointer("vertical", event);
  }
});
cadHorizontalThumb.addEventListener("pointerdown", (event) => {
  beginViewportScrollbarDrag("horizontal", event);
});
cadVerticalThumb.addEventListener("pointerdown", (event) => {
  beginViewportScrollbarDrag("vertical", event);
});
[cadHorizontalThumb, cadVerticalThumb].forEach((thumb) => {
  thumb.addEventListener("pointermove", continueViewportScrollbarDrag);
  thumb.addEventListener("pointerup", endViewportScrollbarDrag);
  thumb.addEventListener("pointercancel", endViewportScrollbarDrag);
});
cadHorizontalTrack.addEventListener("keydown", (event) => {
  handleViewportScrollbarKey("horizontal", event);
});
cadVerticalTrack.addEventListener("keydown", (event) => {
  handleViewportScrollbarKey("vertical", event);
});

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

function dismissLayerMenu() {
  layerMenuItem.classList.add("is-dismissed");
  document.activeElement?.blur();
}

function selectCurrentLayer() {
  dismissLayerMenu();
  commandStatus.textContent = "Current layer: 0";
}

function dismissHelpMenu() {
  helpMenuItem.classList.add("is-dismissed");
  document.activeElement?.blur();
}

function positionAboutWindow() {
  if (aboutWindowState.hasPosition) return;
  const bounds = aboutWindow.getBoundingClientRect();
  const left = Math.max(8, (window.innerWidth - bounds.width) / 2);
  const top = Math.max(8, (window.innerHeight - bounds.height) / 2);
  aboutWindow.style.left = `${left}px`;
  aboutWindow.style.top = `${top}px`;
  aboutWindowState.hasPosition = true;
}

function openAboutWindow() {
  dismissHelpMenu();
  aboutWindow.hidden = false;
  positionAboutWindow();
  aboutCloseButton.focus();
  commandStatus.textContent = `About ${APP_NAME} V${APP_VERSION}`;
}

function closeAboutWindow(statusMessage = "Ready") {
  aboutWindow.hidden = true;
  aboutWindowState.drag = null;
  aboutWindowTitleBar.classList.remove("is-dragging");
  if (statusMessage !== null) commandStatus.textContent = statusMessage;
}

function setCalculatorButtonActive(active) {
  quickCalculatorButton.classList.toggle("is-active", active);
  quickCalculatorButton.setAttribute("aria-pressed", String(active));
}

function centerCalculatorOverDrawing() {
  const drawingBounds = cadCanvas.getBoundingClientRect();
  const calculatorBounds = calculatorWindow.element.getBoundingClientRect();
  calculatorWindow.moveTo(
    drawingBounds.left + (drawingBounds.width - calculatorBounds.width) / 2,
    drawingBounds.top + (drawingBounds.height - calculatorBounds.height) / 2,
  );
  calculatorHasBeenPositioned = true;
}

function openCalculatorWindow() {
  deactivateWindowZoom();
  if (!calculatorWindow) {
    calculatorWindow = Calculator.create({
      visible: false,
      title: "Calculator",
      angleMode: "deg",
      onClose: () => {
        setCalculatorButtonActive(false);
        commandStatus.textContent = "Calculator closed.";
      },
    });
  }

  calculatorWindow.show();
  if (calculatorWindow.element.classList.contains("is-minimized")) {
    calculatorWindow.element.classList.remove("is-minimized");
    calculatorWindow.element.style.width = "";
  }
  if (!calculatorHasBeenPositioned) centerCalculatorOverDrawing();
  calculatorWindow.focus();
  setCalculatorButtonActive(true);
  commandStatus.textContent = "Calculator opened.";
}

function activateSingleSelect() {
  deactivatePointSketch();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  deactivateFillet();
  deactivateRotate();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!hexagonWindow.hidden) closeHexagonWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);
  if (!lineCoordinatesWindow.hidden) closeLineCoordinatesWindow(null);
  selectionState.mode = "single";
  selectionState.hoveredEntityId = null;
  selectionState.pickCycle = null;
  cadCanvas.classList.add("select-single");
  commandStatus.textContent = "Select: Single";
}

function formatCoordinate(value) {
  const normalizedValue = Math.abs(value) < 0.00005 ? 0 : value;
  return normalizedValue.toFixed(4);
}

function evaluateArithmeticExpression(expression) {
  const source = String(expression).replaceAll("×", "*");
  let index = 0;

  function skipWhitespace() {
    while (/\s/.test(source[index] ?? "")) index += 1;
  }

  function parseNumber() {
    skipWhitespace();
    const match = source
      .slice(index)
      .match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/);
    if (!match) throw new Error("Expected a number");
    index += match[0].length;
    return Number(match[0]);
  }

  function parsePrimary() {
    skipWhitespace();
    if (source[index] !== "(") return parseNumber();

    index += 1;
    const value = parseExpression();
    skipWhitespace();
    if (source[index] !== ")") throw new Error("Expected a closing parenthesis");
    index += 1;
    return value;
  }

  function parseUnary() {
    skipWhitespace();
    if (source[index] === "+" || source[index] === "-") {
      const operator = source[index];
      index += 1;
      const value = parseUnary();
      return operator === "-" ? -value : value;
    }
    return parsePrimary();
  }

  function parseTerm() {
    let value = parseUnary();
    while (true) {
      skipWhitespace();
      const operator = source[index];
      if (operator !== "*" && operator !== "/") break;
      index += 1;
      const rightValue = parseUnary();
      if (operator === "/" && rightValue === 0) {
        throw new Error("Division by zero");
      }
      value = operator === "*" ? value * rightValue : value / rightValue;
    }
    return value;
  }

  function parseExpression() {
    let value = parseTerm();
    while (true) {
      skipWhitespace();
      const operator = source[index];
      if (operator !== "+" && operator !== "-") break;
      index += 1;
      const rightValue = parseTerm();
      value = operator === "+" ? value + rightValue : value - rightValue;
    }
    return value;
  }

  try {
    if (!source.trim()) return null;
    const value = parseExpression();
    skipWhitespace();
    if (index !== source.length || !Number.isFinite(value)) return null;
    return Object.is(value, -0) ? 0 : value;
  } catch {
    return null;
  }
}

function formatArithmeticResult(value) {
  const normalizedValue = Object.is(value, -0) ? 0 : value;
  return Number(normalizedValue.toPrecision(15)).toString();
}

function getArithmeticInputValue(input) {
  return evaluateArithmeticExpression(input.value);
}

function resolveArithmeticInput(
  input,
  {
    messageElement,
    invalidMessage = "Enter a valid arithmetic expression.",
    validationMessage = null,
    successMessage = null,
  },
) {
  const value = getArithmeticInputValue(input);
  let message = value === null ? invalidMessage : "";
  if (!message && validationMessage) {
    message = validationMessage(value) ?? "";
  }

  input.setCustomValidity(message);
  if (message) {
    if (messageElement) {
      messageElement.textContent = message;
      messageElement.dataset.arithmeticError = "true";
    }
    return null;
  }

  input.value = formatArithmeticResult(value);
  if (messageElement?.dataset.arithmeticError === "true") {
    const resolvedSuccessMessage =
      typeof successMessage === "function" ? successMessage() : successMessage;
    if (resolvedSuccessMessage) {
      messageElement.textContent = resolvedSuccessMessage;
    }
    delete messageElement.dataset.arithmeticError;
  }
  return value;
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
      if (entity.isConstruction) return;
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
  appendDxfPair(
    lines,
    999,
    `${APP_NAME} V${APP_VERSION} R12 ASCII DXF - drawing units are inches`,
  );
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
  downloadLink.download = `${APP_NAME}.dxf`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
  commandStatus.textContent =
    `Exported ${exportedEntityCount} ${exportedEntityCount === 1 ? "entity" : "entities"} ` +
    `to ${APP_NAME}.dxf.`;
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

  updateEntityHoverInfoById(Number(entityElement.dataset.entityId));
}

function updateEntityHoverInfoById(entityId) {
  if (entityId === null) {
    clearEntityHoverInfo();
    return;
  }
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

function setSelectionProximityHover(entityId) {
  if (selectionState.hoveredEntityId === entityId) return;
  selectionState.hoveredEntityId = entityId;
  entityLayer
    .querySelectorAll(".is-proximity-hovered")
    .forEach((element) => element.classList.remove("is-proximity-hovered"));
  if (entityId === null) return;
  [...entityLayer.querySelectorAll("[data-entity-id]")]
    .find((element) => Number(element.dataset.entityId) === entityId)
    ?.classList.add("is-proximity-hovered");
}

function renderPoint(point) {
  const isDirectionChoice = pointOnEntityState.directionChoices.some(
    (choice) => choice.pointId === point.id,
  );
  const pointGroup = createSvgElement("g", {
    class: [
      "point-entity",
      selectionState.selectedEntityId === point.id ? "is-selected" : "",
      threeEntityCircleState.entityIds.includes(point.id)
        ? "is-apollonius-source"
        : "",
      joinState.firstPointId === point.id ? "is-join-start" : "",
      lineSketchState.startPointId === point.id ? "is-line-sketch-start" : "",
      circleState.centerPointId === point.id ? "is-circle-center" : "",
      hexagonState.centerPointId === point.id ? "is-hexagon-center" : "",
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
      threeEntityCircleState.entityIds.includes(lineEntity.id)
        ? "is-apollonius-source"
        : "",
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
      filletState.firstEntityId === lineEntity.id ? "is-fillet-first" : "",
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
      threeEntityCircleState.entityIds.includes(circleEntity.id)
        ? "is-apollonius-source"
        : "",
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
      filletState.firstEntityId === circleEntity.id ? "is-fillet-first" : "",
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
      filletState.firstEntityId === arcEntity.id ? "is-fillet-first" : "",
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
  const radius = getArithmeticInputValue(circleRadiusInput);
  return Number.isFinite(radius) && radius > 0 ? radius : null;
}

function getHexagonAcrossFlatsInputValue() {
  const acrossFlats = getArithmeticInputValue(hexagonAcrossFlatsInput);
  return Number.isFinite(acrossFlats) && acrossFlats > 0
    ? acrossFlats
    : null;
}

function getHexagonCornerRadiusInputValue(acrossFlats) {
  const cornerRadius = getArithmeticInputValue(hexagonCornerRadiusInput);
  return Number.isFinite(cornerRadius) &&
    cornerRadius >= 0 &&
    Number.isFinite(acrossFlats) &&
    cornerRadius < acrossFlats / 2
    ? cornerRadius
    : null;
}

function getHexagonGeometry(centerPoint, acrossFlats, cornerRadius) {
  const circumradius = acrossFlats / Math.sqrt(3);
  const vertices = Array.from({ length: 6 }, (_, index) => {
    const angle = Math.PI / 6 + (index * Math.PI) / 3;
    return {
      x: centerPoint.x + circumradius * Math.cos(angle),
      y: centerPoint.y + circumradius * Math.sin(angle),
    };
  });

  if (cornerRadius <= GEOMETRY_EPSILON) {
    return { vertices, corners: null };
  }

  const tangentDistance = cornerRadius / Math.sqrt(3);
  const centerDistance = (2 * cornerRadius) / Math.sqrt(3);
  const corners = vertices.map((vertex, index) => {
    const previous = vertices[(index + 5) % 6];
    const next = vertices[(index + 1) % 6];
    const previousDirection = {
      x: (previous.x - vertex.x) / circumradius,
      y: (previous.y - vertex.y) / circumradius,
    };
    const nextDirection = {
      x: (next.x - vertex.x) / circumradius,
      y: (next.y - vertex.y) / circumradius,
    };
    const inwardDirection = {
      x: (centerPoint.x - vertex.x) / circumradius,
      y: (centerPoint.y - vertex.y) / circumradius,
    };
    return {
      previousTangent: {
        x: vertex.x + previousDirection.x * tangentDistance,
        y: vertex.y + previousDirection.y * tangentDistance,
      },
      nextTangent: {
        x: vertex.x + nextDirection.x * tangentDistance,
        y: vertex.y + nextDirection.y * tangentDistance,
      },
      arcCenter: {
        x: vertex.x + inwardDirection.x * centerDistance,
        y: vertex.y + inwardDirection.y * centerDistance,
      },
    };
  });
  return { vertices, corners };
}

function getHexagonPreviewPath(centerPoint, acrossFlats, cornerRadius) {
  const geometry = getHexagonGeometry(
    centerPoint,
    acrossFlats,
    cornerRadius,
  );
  if (!geometry.corners) {
    return [
      `M ${geometry.vertices[0].x} ${geometry.vertices[0].y}`,
      ...geometry.vertices
        .slice(1)
        .map((vertex) => `L ${vertex.x} ${vertex.y}`),
      "Z",
    ].join(" ");
  }

  const commands = [
    `M ${geometry.corners[0].previousTangent.x} ${geometry.corners[0].previousTangent.y}`,
  ];
  geometry.corners.forEach((corner, index) => {
    const nextCorner = geometry.corners[(index + 1) % 6];
    commands.push(
      `A ${cornerRadius} ${cornerRadius} 0 0 1 ${corner.nextTangent.x} ${corner.nextTangent.y}`,
      `L ${nextCorner.previousTangent.x} ${nextCorner.previousTangent.y}`,
    );
  });
  commands.push("Z");
  return commands.join(" ");
}

function renderToolPreview() {
  previewLayer.innerHTML = "";

  if (windowZoomState.active) {
    if (windowZoomState.drag?.worldBounds) {
      const bounds = windowZoomState.drag.worldBounds;
      previewLayer.appendChild(
        createSvgElement("rect", {
          x: bounds.minX,
          y: bounds.minY,
          width: bounds.maxX - bounds.minX,
          height: bounds.maxY - bounds.minY,
          class: "window-zoom-preview",
        }),
      );
    }
    return;
  }

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

  if (
    lineSketchState.active &&
    lineSketchState.startPointId !== null &&
    lineSketchState.previewWorld
  ) {
    const startPoint = getPointById(lineSketchState.startPointId);
    if (!startPoint) return;

    drawLine(
      previewLayer,
      startPoint.x,
      startPoint.y,
      lineSketchState.previewWorld.x,
      lineSketchState.previewWorld.y,
      "line-sketch-preview",
    );
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

  if (hexagonState.active && hexagonState.centerPointId !== null) {
    const centerPoint = getPointById(hexagonState.centerPointId);
    const acrossFlats = getHexagonAcrossFlatsInputValue();
    const cornerRadius = getHexagonCornerRadiusInputValue(acrossFlats);
    if (!centerPoint || acrossFlats === null || cornerRadius === null) return;
    previewLayer.appendChild(
      createSvgElement("path", {
        d: getHexagonPreviewPath(centerPoint, acrossFlats, cornerRadius),
        class: "hexagon-preview",
      }),
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
  syncViewportToDocument();
  clearEntityHoverInfo();
  selectionState.hoveredEntityId = null;
  entityLayer.innerHTML = "";

  documentModel.entities.forEach((entity) => {
    if (entity.type === "line") renderLineEntity(entity);
    if (entity.type === "circle") renderCircleEntity(entity);
    if (entity.type === "arc") renderArcEntity(entity);
  });

  documentModel.entities.forEach((entity) => {
    if (entity.type === "point" && !entity.isConstruction) renderPoint(entity);
  });

  renderToolPreview();
  const visibleEntityCount = documentModel.entities.filter(
    (entity) => entity.type !== "point" || !entity.isConstruction,
  ).length;
  entityCount.textContent = `Entities: ${visibleEntityCount}`;
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
  const startPoint = getPointById(startPointId);
  const endPoint = getPointById(endPointId);
  if (!startPoint || !endPoint) return null;

  const lineId = documentModel.nextEntityId + 2;
  recordDocumentChange(`Create line ${lineId}`);
  const { line } = createIndependentLineWithoutHistory(startPoint, endPoint);
  renderEntities();
  return line;
}

function findLineAtCoordinates(start, end) {
  return documentModel.entities.find((entity) => {
    if (entity.type !== "line") return false;
    const endpoints = getLineEndpointPair(entity);
    if (!endpoints) return false;
    const matchesForward =
      squaredDistance(endpoints.startPoint, start) <= 1e-14 &&
      squaredDistance(endpoints.endPoint, end) <= 1e-14;
    const matchesReverse =
      squaredDistance(endpoints.startPoint, end) <= 1e-14 &&
      squaredDistance(endpoints.endPoint, start) <= 1e-14;
    return matchesForward || matchesReverse;
  });
}

function addCoordinateLine(start, end) {
  const newPointCount =
    (findExistingPointAt(start) ? 0 : 1) +
    (findExistingPointAt(end) ? 0 : 1);
  const lineId = documentModel.nextEntityId + newPointCount + 2;
  recordDocumentChange(`Create coordinate line ${lineId}`);
  const startPoint = getOrCreatePointWithoutHistory(start);
  const endPoint = getOrCreatePointWithoutHistory(end);
  const { line } = createIndependentLineWithoutHistory(start, end);
  renderEntities();
  return { line, startPoint, endPoint };
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

function addApolloniusCircle(center, radius) {
  const existingCenterPoint = findExistingPointAt(center);
  const circleId =
    documentModel.nextEntityId + (existingCenterPoint ? 0 : 1);
  recordDocumentChange(`Create 3-entity circle ${circleId}`);
  const centerPoint =
    existingCenterPoint ?? getOrCreatePointWithoutHistory(center);
  const circle = {
    id: documentModel.nextEntityId,
    type: "circle",
    centerPointId: centerPoint.id,
    radius,
  };
  documentModel.nextEntityId += 1;
  documentModel.entities.push(circle);
  renderEntities();
  return { circle, centerPoint };
}

function addHexagon(centerPoint, acrossFlats, cornerRadius) {
  recordDocumentChange(`Create hexagon at point ${centerPoint.id}`);
  const geometry = getHexagonGeometry(
    centerPoint,
    acrossFlats,
    cornerRadius,
  );
  const createdLines = [];
  const createdArcs = [];

  function createLineWithoutHistory(startPointId, endPointId) {
    const line = {
      id: documentModel.nextEntityId,
      type: "line",
      startPointId,
      endPointId,
    };
    documentModel.nextEntityId += 1;
    documentModel.entities.push(line);
    createdLines.push(line);
  }

  function createArcWithoutHistory(centerPointId, startPointId, endPointId) {
    const arc = {
      id: documentModel.nextEntityId,
      type: "arc",
      centerPointId,
      startPointId,
      endPointId,
      radius: cornerRadius,
    };
    documentModel.nextEntityId += 1;
    documentModel.entities.push(arc);
    createdArcs.push(arc);
  }

  if (!geometry.corners) {
    const vertexPoints = geometry.vertices.map((vertex) =>
      createConstructionPointWithoutHistory(vertex),
    );
    vertexPoints.forEach((point, index) => {
      createLineWithoutHistory(point.id, vertexPoints[(index + 1) % 6].id);
    });
  } else {
    const cornerPoints = geometry.corners.map((corner) => ({
      previousTangent: createConstructionPointWithoutHistory(
        corner.previousTangent,
      ),
      nextTangent: createConstructionPointWithoutHistory(corner.nextTangent),
      arcCenter: createConstructionPointWithoutHistory(corner.arcCenter),
    }));
    cornerPoints.forEach((corner, index) => {
      const nextCorner = cornerPoints[(index + 1) % 6];
      createArcWithoutHistory(
        corner.arcCenter.id,
        corner.previousTangent.id,
        corner.nextTangent.id,
      );
      createLineWithoutHistory(
        corner.nextTangent.id,
        nextCorner.previousTangent.id,
      );
    });
  }

  renderEntities();
  return { lines: createdLines, arcs: createdArcs };
}

function addOffsetLine(start, end) {
  const startPointId = documentModel.nextEntityId;
  const endPointId = startPointId + 1;
  const lineId = startPointId + 4;
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
  documentModel.nextEntityId += 2;
  documentModel.entities.push(startPoint, endPoint);
  const { line } = createIndependentLineWithoutHistory(start, end);
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

const APOLLONIUS_TOLERANCE = 1e-7;

function dotProduct3(first, second) {
  return (
    first[0] * second[0] +
    first[1] * second[1] +
    first[2] * second[2]
  );
}

function crossProduct3(first, second) {
  return [
    first[1] * second[2] - first[2] * second[1],
    first[2] * second[0] - first[0] * second[2],
    first[0] * second[1] - first[1] * second[0],
  ];
}

function getApolloniusConstraint(entity) {
  if (entity.type === "point") {
    return {
      kind: "circle",
      isPoint: true,
      x: entity.x,
      y: entity.y,
      radius: 0,
    };
  }

  if (entity.type === "circle") {
    const centerPoint = getPointById(entity.centerPointId);
    if (!centerPoint || !Number.isFinite(entity.radius) || entity.radius <= 0) {
      return null;
    }
    return {
      kind: "circle",
      isPoint: false,
      x: centerPoint.x,
      y: centerPoint.y,
      radius: entity.radius,
    };
  }

  if (entity.type === "line") {
    const endpoints = getLineEndpointPair(entity);
    if (!endpoints) return null;
    const dx = endpoints.endPoint.x - endpoints.startPoint.x;
    const dy = endpoints.endPoint.y - endpoints.startPoint.y;
    const length = Math.hypot(dx, dy);
    if (length <= GEOMETRY_EPSILON) return null;
    return {
      kind: "line",
      a: -dy / length,
      b: dx / length,
      c:
        (dy * endpoints.startPoint.x - dx * endpoints.startPoint.y) /
        length,
    };
  }

  return null;
}

function getApolloniusSignBranches(constraints) {
  return constraints.reduce((branches, constraint) => {
    const signs = constraint.kind === "circle" && constraint.isPoint
      ? [1]
      : [-1, 1];
    return branches.flatMap((branch) =>
      signs.map((sign) => [...branch, sign]),
    );
  }, [[]]);
}

function solveLinearSystem3(matrix, values) {
  const augmented = matrix.map((row, index) => [
    ...row,
    values[index],
  ]);
  const matrixScale = Math.max(
    1,
    ...matrix.flat().map((value) => Math.abs(value)),
  );

  for (let column = 0; column < 3; column += 1) {
    let pivotRow = column;
    for (let row = column + 1; row < 3; row += 1) {
      if (Math.abs(augmented[row][column]) > Math.abs(augmented[pivotRow][column])) {
        pivotRow = row;
      }
    }
    if (Math.abs(augmented[pivotRow][column]) <= 1e-12 * matrixScale) {
      return null;
    }
    [augmented[column], augmented[pivotRow]] = [
      augmented[pivotRow],
      augmented[column],
    ];

    const pivot = augmented[column][column];
    for (let index = column; index < 4; index += 1) {
      augmented[column][index] /= pivot;
    }
    for (let row = 0; row < 3; row += 1) {
      if (row === column) continue;
      const factor = augmented[row][column];
      for (let index = column; index < 4; index += 1) {
        augmented[row][index] -= factor * augmented[column][index];
      }
    }
  }

  return augmented.map((row) => row[3]);
}

function intersectApolloniusPlanes(firstEquation, secondEquation) {
  const direction = crossProduct3(firstEquation.row, secondEquation.row);
  const directionLengthSquared = dotProduct3(direction, direction);
  const normalScale = Math.max(
    1,
    dotProduct3(firstEquation.row, firstEquation.row) *
      dotProduct3(secondEquation.row, secondEquation.row),
  );
  if (directionLengthSquared <= 1e-20 * normalScale) return null;

  const secondCrossDirection = crossProduct3(secondEquation.row, direction);
  const directionCrossFirst = crossProduct3(direction, firstEquation.row);
  const origin = [0, 1, 2].map(
    (index) =>
      (firstEquation.value * secondCrossDirection[index] +
        secondEquation.value * directionCrossFirst[index]) /
      directionLengthSquared,
  );
  return { origin, direction };
}

function solveQuadraticReal(coefficientA, coefficientB, coefficientC) {
  const coefficientScale = Math.max(
    1,
    Math.abs(coefficientA),
    Math.abs(coefficientB),
    Math.abs(coefficientC),
  );
  if (Math.abs(coefficientA) <= 1e-12 * coefficientScale) {
    if (Math.abs(coefficientB) <= 1e-12 * coefficientScale) return [];
    return [-coefficientC / coefficientB];
  }

  let discriminant =
    coefficientB * coefficientB -
    4 * coefficientA * coefficientC;
  const discriminantTolerance =
    1e-12 *
    Math.max(
      1,
      coefficientB * coefficientB,
      Math.abs(4 * coefficientA * coefficientC),
    );
  if (discriminant < -discriminantTolerance) return [];
  if (discriminant < 0) discriminant = 0;
  const squareRoot = Math.sqrt(discriminant);
  if (squareRoot <= 1e-12 * coefficientScale) {
    return [-coefficientB / (2 * coefficientA)];
  }

  const stableTerm =
    -0.5 * (coefficientB + Math.sign(coefficientB || 1) * squareRoot);
  return [stableTerm / coefficientA, coefficientC / stableTerm];
}

function getApolloniusLinearEquation(constraint, sign) {
  return {
    row: [constraint.a, constraint.b, -sign],
    value: -constraint.c,
  };
}

function subtractApolloniusCircleEquations(
  constraint,
  sign,
  baseConstraint,
  baseSign,
) {
  const constraintConstant =
    constraint.x * constraint.x +
    constraint.y * constraint.y -
    constraint.radius * constraint.radius;
  const baseConstant =
    baseConstraint.x * baseConstraint.x +
    baseConstraint.y * baseConstraint.y -
    baseConstraint.radius * baseConstraint.radius;
  return {
    row: [
      2 * (baseConstraint.x - constraint.x),
      2 * (baseConstraint.y - constraint.y),
      2 * (baseSign * baseConstraint.radius - sign * constraint.radius),
    ],
    value: baseConstant - constraintConstant,
  };
}

function isApolloniusBranchSolutionValid(solution, constraints, signs) {
  const [x, y, radius] = solution;
  if (
    !Number.isFinite(x) ||
    !Number.isFinite(y) ||
    !Number.isFinite(radius) ||
    radius <= GEOMETRY_EPSILON
  ) {
    return false;
  }

  return constraints.every((constraint, index) => {
    const scale = Math.max(
      1,
      Math.abs(x),
      Math.abs(y),
      radius,
      constraint.radius ?? 0,
    );
    const tolerance = APOLLONIUS_TOLERANCE * scale;
    if (constraint.kind === "line") {
      const signedDistance =
        constraint.a * x + constraint.b * y + constraint.c;
      return Math.abs(signedDistance - signs[index] * radius) <= tolerance;
    }

    const centerDistance = Math.hypot(x - constraint.x, y - constraint.y);
    const expectedDistance = Math.abs(
      radius + signs[index] * constraint.radius,
    );
    if (
      !constraint.isPoint &&
      centerDistance <= tolerance &&
      Math.abs(radius - constraint.radius) <= tolerance
    ) {
      return false;
    }
    return Math.abs(centerDistance - expectedDistance) <= tolerance;
  });
}

function addUniqueApolloniusCandidate(candidates, solution) {
  const candidate = {
    center: [solution[0], solution[1]],
    radius: solution[2],
  };
  const scale = Math.max(
    1,
    Math.abs(candidate.center[0]),
    Math.abs(candidate.center[1]),
    candidate.radius,
  );
  const duplicate = candidates.some(
    (existing) =>
      Math.hypot(
        candidate.center[0] - existing.center[0],
        candidate.center[1] - existing.center[1],
      ) <= APOLLONIUS_TOLERANCE * scale &&
      Math.abs(candidate.radius - existing.radius) <=
        APOLLONIUS_TOLERANCE * scale,
  );
  if (!duplicate) candidates.push(candidate);
}

function solveApolloniusThreeEntities(entities) {
  if (!Array.isArray(entities) || entities.length !== 3) return [];
  const constraints = entities.map(getApolloniusConstraint);
  if (constraints.some((constraint) => constraint === null)) return [];

  const candidates = [];
  getApolloniusSignBranches(constraints).forEach((signs) => {
    const baseIndex = constraints.findIndex(
      (constraint) => constraint.kind === "circle",
    );

    if (baseIndex === -1) {
      const equations = constraints.map((constraint, index) =>
        getApolloniusLinearEquation(constraint, signs[index]),
      );
      const solution = solveLinearSystem3(
        equations.map((equation) => equation.row),
        equations.map((equation) => equation.value),
      );
      if (
        solution &&
        isApolloniusBranchSolutionValid(solution, constraints, signs)
      ) {
        addUniqueApolloniusCandidate(candidates, solution);
      }
      return;
    }

    const baseConstraint = constraints[baseIndex];
    const baseSign = signs[baseIndex];
    const linearEquations = constraints
      .map((constraint, index) => {
        if (index === baseIndex) return null;
        return constraint.kind === "line"
          ? getApolloniusLinearEquation(constraint, signs[index])
          : subtractApolloniusCircleEquations(
              constraint,
              signs[index],
              baseConstraint,
              baseSign,
            );
      })
      .filter(Boolean);
    const parameterLine = intersectApolloniusPlanes(
      linearEquations[0],
      linearEquations[1],
    );
    if (!parameterLine) return;

    const [originX, originY, originRadius] = parameterLine.origin;
    const [directionX, directionY, directionRadius] =
      parameterLine.direction;
    const offsetX = originX - baseConstraint.x;
    const offsetY = originY - baseConstraint.y;
    const signedBaseRadius =
      originRadius + baseSign * baseConstraint.radius;
    const coefficientA =
      directionX * directionX +
      directionY * directionY -
      directionRadius * directionRadius;
    const coefficientB =
      2 *
      (offsetX * directionX +
        offsetY * directionY -
        signedBaseRadius * directionRadius);
    const coefficientC =
      offsetX * offsetX +
      offsetY * offsetY -
      signedBaseRadius * signedBaseRadius;

    solveQuadraticReal(
      coefficientA,
      coefficientB,
      coefficientC,
    ).forEach((parameter) => {
      const solution = [
        originX + directionX * parameter,
        originY + directionY * parameter,
        originRadius + directionRadius * parameter,
      ];
      if (isApolloniusBranchSolutionValid(solution, constraints, signs)) {
        addUniqueApolloniusCandidate(candidates, solution);
      }
    });
  });

  return candidates;
}

function getApolloniusTangencyPoint(candidate, entity) {
  if (
    !candidate ||
    !Array.isArray(candidate.center) ||
    candidate.center.length !== 2
  ) {
    return null;
  }
  const center = { x: candidate.center[0], y: candidate.center[1] };
  const constraint = getApolloniusConstraint(entity);
  if (!constraint) return null;

  if (entity.type === "point") return { x: entity.x, y: entity.y };
  if (entity.type === "line") {
    const signedDistance =
      constraint.a * center.x + constraint.b * center.y + constraint.c;
    return {
      x: center.x - constraint.a * signedDistance,
      y: center.y - constraint.b * signedDistance,
    };
  }

  const deltaX = constraint.x - center.x;
  const deltaY = constraint.y - center.y;
  const centerDistanceSquared = deltaX * deltaX + deltaY * deltaY;
  if (centerDistanceSquared <= GEOMETRY_EPSILON ** 2) return null;
  const interpolation =
    (candidate.radius * candidate.radius -
      constraint.radius * constraint.radius +
      centerDistanceSquared) /
    (2 * centerDistanceSquared);
  return {
    x: center.x + deltaX * interpolation,
    y: center.y + deltaY * interpolation,
  };
}

function selectApolloniusCandidate(candidates, entities, mouseClicks) {
  if (
    !Array.isArray(candidates) ||
    !Array.isArray(entities) ||
    !Array.isArray(mouseClicks) ||
    entities.length !== 3 ||
    mouseClicks.length !== 3
  ) {
    return null;
  }

  const scoredCandidates = candidates
    .map((candidate) => {
      let score = 0;
      for (let index = 0; index < 3; index += 1) {
        const tangentPoint = getApolloniusTangencyPoint(
          candidate,
          entities[index],
        );
        if (!tangentPoint) return null;
        score += squaredDistance(tangentPoint, mouseClicks[index]);
      }
      return { candidate, score };
    })
    .filter(Boolean);
  if (!scoredCandidates.length) return null;

  const lowestScore = Math.min(
    ...scoredCandidates.map(({ score }) => score),
  );
  return scoredCandidates
    .filter(({ score }) => score <= lowestScore + 1e-6)
    .sort(
      (first, second) => first.candidate.radius - second.candidate.radius,
    )[0].candidate;
}

function distanceToLineSegment(worldPoint, startPoint, endPoint) {
  const direction = {
    x: endPoint.x - startPoint.x,
    y: endPoint.y - startPoint.y,
  };
  const lengthSquared = dotProduct(direction, direction);
  if (lengthSquared <= GEOMETRY_EPSILON ** 2) {
    return Math.sqrt(squaredDistance(worldPoint, startPoint));
  }
  const offset = {
    x: worldPoint.x - startPoint.x,
    y: worldPoint.y - startPoint.y,
  };
  const parameter = Math.max(
    0,
    Math.min(1, dotProduct(offset, direction) / lengthSquared),
  );
  const closestPoint = {
    x: startPoint.x + direction.x * parameter,
    y: startPoint.y + direction.y * parameter,
  };
  return Math.sqrt(squaredDistance(worldPoint, closestPoint));
}

function distanceToEntityGeometry(entity, worldPoint) {
  if (entity.type === "point") {
    return Math.sqrt(squaredDistance(entity, worldPoint));
  }

  if (entity.type === "line") {
    const startPoint = getPointById(entity.startPointId);
    const endPoint = getPointById(entity.endPointId);
    return startPoint && endPoint
      ? distanceToLineSegment(worldPoint, startPoint, endPoint)
      : Number.POSITIVE_INFINITY;
  }

  if (entity.type === "circle") {
    const centerPoint = getPointById(entity.centerPointId);
    return centerPoint
      ? Math.abs(
          Math.sqrt(squaredDistance(worldPoint, centerPoint)) - entity.radius,
        )
      : Number.POSITIVE_INFINITY;
  }

  if (entity.type === "arc") {
    const centerPoint = getPointById(entity.centerPointId);
    const startPoint = getPointById(entity.startPointId);
    const endPoint = getPointById(entity.endPointId);
    if (!centerPoint || !startPoint || !endPoint) {
      return Number.POSITIVE_INFINITY;
    }
    const startAngle = Math.atan2(
      startPoint.y - centerPoint.y,
      startPoint.x - centerPoint.x,
    );
    const endAngle = Math.atan2(
      endPoint.y - centerPoint.y,
      endPoint.x - centerPoint.x,
    );
    const pointAngle = Math.atan2(
      worldPoint.y - centerPoint.y,
      worldPoint.x - centerPoint.x,
    );
    if (isAngleOnCounterClockwiseArc(pointAngle, startAngle, endAngle)) {
      return Math.abs(
        Math.sqrt(squaredDistance(worldPoint, centerPoint)) - entity.radius,
      );
    }
    return Math.min(
      Math.sqrt(squaredDistance(worldPoint, startPoint)),
      Math.sqrt(squaredDistance(worldPoint, endPoint)),
    );
  }

  return Number.POSITIVE_INFINITY;
}

function getWorldUnitsPerScreenPixel() {
  const screenMatrix = worldLayer.getScreenCTM();
  if (screenMatrix) {
    const xScale = Math.hypot(screenMatrix.a, screenMatrix.b);
    const yScale = Math.hypot(screenMatrix.c, screenMatrix.d);
    const pixelsPerWorldUnit = Math.max(xScale, yScale);
    if (pixelsPerWorldUnit > GEOMETRY_EPSILON) {
      return 1 / pixelsPerWorldUnit;
    }
  }
  return cadCanvas.clientWidth > 0
    ? (VIEW.xMax - VIEW.xMin) / cadCanvas.clientWidth
    : 0.01;
}

function getSelectionHitCandidates(worldPoint, target) {
  const tolerance = 10 * getWorldUnitsPerScreenPixel();
  const directEntityElement = target?.closest?.(
    ".point-entity, .line-entity, .circle-entity, .arc-entity",
  );
  const directEntityId = directEntityElement
    ? Number(directEntityElement.dataset.entityId)
    : null;
  const typePriority = { point: 0, arc: 1, line: 2, circle: 3 };

  return documentModel.entities
    .filter((entity) => entity.type !== "point" || !entity.isConstruction)
    .map((entity) => ({
      entity,
      distance: distanceToEntityGeometry(entity, worldPoint),
    }))
    .filter(({ distance }) => distance <= tolerance)
    .sort((first, second) => {
      const distanceDifference = first.distance - second.distance;
      if (Math.abs(distanceDifference) > GEOMETRY_EPSILON) {
        return distanceDifference;
      }
      if (first.entity.id === directEntityId) return -1;
      if (second.entity.id === directEntityId) return 1;
      const priorityDifference =
        typePriority[first.entity.type] - typePriority[second.entity.type];
      return priorityDifference || first.entity.id - second.entity.id;
    });
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
      !entity.isConstruction &&
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

function createConstructionPointWithoutHistory(worldPoint) {
  const point = {
    id: documentModel.nextEntityId,
    type: "point",
    x: worldPoint.x,
    y: worldPoint.y,
    isConstruction: true,
  };
  documentModel.nextEntityId += 1;
  documentModel.entities.push(point);
  return point;
}

function createIndependentLineWithoutHistory(start, end) {
  const startReference = createConstructionPointWithoutHistory(start);
  const endReference = createConstructionPointWithoutHistory(end);
  const line = {
    id: documentModel.nextEntityId,
    type: "line",
    startPointId: startReference.id,
    endPointId: endReference.id,
  };
  documentModel.nextEntityId += 1;
  documentModel.entities.push(line);
  return { line, startReference, endReference };
}

function pruneUnusedConstructionPoints() {
  const referencedPointIds = new Set();
  documentModel.entities.forEach((entity) => {
    if (entity.type === "line") {
      referencedPointIds.add(entity.startPointId);
      referencedPointIds.add(entity.endPointId);
    }
    if (entity.type === "circle") {
      referencedPointIds.add(entity.centerPointId);
    }
    if (entity.type === "arc") {
      referencedPointIds.add(entity.centerPointId);
      referencedPointIds.add(entity.startPointId);
      referencedPointIds.add(entity.endPointId);
    }
  });
  documentModel.entities = documentModel.entities.filter(
    (entity) =>
      entity.type !== "point" ||
      !entity.isConstruction ||
      referencedPointIds.has(entity.id),
  );
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

function getFilletRadiusInputValue() {
  const radius = getArithmeticInputValue(filletRadiusInput);
  return Number.isFinite(radius) && radius > 0 ? radius : null;
}

function getFilletCenterLoci(entity, filletRadius) {
  if (entity.type === "line") {
    const endpoints = getLineEndpointPair(entity);
    if (!endpoints) return [];
    const direction = {
      x: endpoints.endPoint.x - endpoints.startPoint.x,
      y: endpoints.endPoint.y - endpoints.startPoint.y,
    };
    const length = Math.hypot(direction.x, direction.y);
    if (length <= GEOMETRY_EPSILON) return [];
    const normal = {
      x: -direction.y / length,
      y: direction.x / length,
    };
    return [-1, 1].map((normalSign) => ({
      kind: "line",
      origin: {
        x: endpoints.startPoint.x + normal.x * filletRadius * normalSign,
        y: endpoints.startPoint.y + normal.y * filletRadius * normalSign,
      },
      direction,
      normal,
      normalSign,
      sourceEntity: entity,
    }));
  }

  if (entity.type === "circle" || entity.type === "arc") {
    const center = getPointById(entity.centerPointId);
    if (!center || !Number.isFinite(entity.radius) || entity.radius <= 0) {
      return [];
    }
    return [1, -1]
      .map((radiusSign) => entity.radius + radiusSign * filletRadius)
      .filter((signedRadius) => Math.abs(signedRadius) > GEOMETRY_EPSILON)
      .map((signedRadius) => ({
        kind: "circle",
        center,
        radius: Math.abs(signedRadius),
        signedRadius,
        sourceEntity: entity,
      }));
  }

  return [];
}

function intersectFilletLoci(firstLocus, secondLocus) {
  if (firstLocus.kind === "line" && secondLocus.kind === "line") {
    const result = intersectInfiniteLines(
      firstLocus.origin,
      firstLocus.direction,
      secondLocus.origin,
      {
        x: secondLocus.origin.x + secondLocus.direction.x,
        y: secondLocus.origin.y + secondLocus.direction.y,
      },
    );
    return result.point ? [result.point] : [];
  }

  if (firstLocus.kind === "line" || secondLocus.kind === "line") {
    const lineLocus = firstLocus.kind === "line" ? firstLocus : secondLocus;
    const circleLocus = firstLocus.kind === "circle" ? firstLocus : secondLocus;
    return intersectInfiniteLineCircle(
      lineLocus.origin,
      {
        x: lineLocus.origin.x + lineLocus.direction.x,
        y: lineLocus.origin.y + lineLocus.direction.y,
      },
      circleLocus.center,
      circleLocus.radius,
    ).points;
  }

  return intersectCircles(
    firstLocus.center,
    firstLocus.radius,
    secondLocus.center,
    secondLocus.radius,
  ).points;
}

function getFilletTangentPoint(locus, filletCenter, filletRadius) {
  if (locus.kind === "line") {
    return {
      x:
        filletCenter.x -
        locus.normal.x * filletRadius * locus.normalSign,
      y:
        filletCenter.y -
        locus.normal.y * filletRadius * locus.normalSign,
    };
  }

  const delta = {
    x: filletCenter.x - locus.center.x,
    y: filletCenter.y - locus.center.y,
  };
  const distance = Math.hypot(delta.x, delta.y);
  if (distance <= GEOMETRY_EPSILON) return null;
  const radialSign = Math.sign(locus.signedRadius);
  return {
    x: locus.center.x + (delta.x / distance) * locus.sourceEntity.radius * radialSign,
    y: locus.center.y + (delta.y / distance) * locus.sourceEntity.radius * radialSign,
  };
}

function getFilletExtensionDistanceSquared(entity, point) {
  if (entity.type === "circle") return 0;

  if (entity.type === "line") {
    const endpoints = getLineEndpointPair(entity);
    if (!endpoints) return Infinity;
    const direction = {
      x: endpoints.endPoint.x - endpoints.startPoint.x,
      y: endpoints.endPoint.y - endpoints.startPoint.y,
    };
    const lengthSquared = dotProduct(direction, direction);
    if (lengthSquared <= GEOMETRY_EPSILON ** 2) return Infinity;
    const parameter =
      dotProduct(
        {
          x: point.x - endpoints.startPoint.x,
          y: point.y - endpoints.startPoint.y,
        },
        direction,
      ) / lengthSquared;
    if (parameter >= -1e-7 && parameter <= 1 + 1e-7) return 0;
    const nearestEndpoint =
      parameter < 0 ? endpoints.startPoint : endpoints.endPoint;
    return squaredDistance(point, nearestEndpoint);
  }

  if (entity.type === "arc") {
    const center = getPointById(entity.centerPointId);
    const startPoint = getPointById(entity.startPointId);
    const endPoint = getPointById(entity.endPointId);
    if (!center || !startPoint || !endPoint) return Infinity;
    const angle = Math.atan2(point.y - center.y, point.x - center.x);
    const startAngle = Math.atan2(
      startPoint.y - center.y,
      startPoint.x - center.x,
    );
    const endAngle = Math.atan2(
      endPoint.y - center.y,
      endPoint.x - center.x,
    );
    if (isAngleOnCounterClockwiseArc(angle, startAngle, endAngle)) return 0;
    return Math.min(
      squaredDistance(point, startPoint),
      squaredDistance(point, endPoint),
    );
  }

  return Infinity;
}

function getFilletCandidate(
  firstEntity,
  secondEntity,
  firstPick,
  secondPick,
  filletRadius,
  allowTrimExtend,
) {
  const firstLoci = getFilletCenterLoci(firstEntity, filletRadius);
  const secondLoci = getFilletCenterLoci(secondEntity, filletRadius);
  const candidates = [];

  firstLoci.forEach((firstLocus) => {
    secondLoci.forEach((secondLocus) => {
      intersectFilletLoci(firstLocus, secondLocus).forEach((center) => {
        const firstTangent = getFilletTangentPoint(
          firstLocus,
          center,
          filletRadius,
        );
        const secondTangent = getFilletTangentPoint(
          secondLocus,
          center,
          filletRadius,
        );
        if (!firstTangent || !secondTangent) return;
        if (squaredDistance(firstTangent, secondTangent) <= 1e-14) return;

        const firstExtension = getFilletExtensionDistanceSquared(
          firstEntity,
          firstTangent,
        );
        const secondExtension = getFilletExtensionDistanceSquared(
          secondEntity,
          secondTangent,
        );
        if (
          !allowTrimExtend &&
          (firstExtension > 1e-12 || secondExtension > 1e-12)
        ) {
          return;
        }

        const firstAngle = Math.atan2(
          firstTangent.y - center.y,
          firstTangent.x - center.x,
        );
        const secondAngle = Math.atan2(
          secondTangent.y - center.y,
          secondTangent.x - center.x,
        );
        const firstToSecondSweep = getCounterClockwiseSweep(
          firstAngle,
          secondAngle,
        );
        const useFirstAsStart = firstToSecondSweep <= Math.PI;
        const sweep = useFirstAsStart
          ? firstToSecondSweep
          : Math.PI * 2 - firstToSecondSweep;
        if (sweep <= 1e-7 || sweep > Math.PI + 1e-7) return;

        candidates.push({
          center,
          firstTangent,
          secondTangent,
          startSource: useFirstAsStart ? "first" : "second",
          score:
            squaredDistance(firstTangent, firstPick) +
            squaredDistance(secondTangent, secondPick) +
            (firstExtension + secondExtension) * 100,
        });
      });
    });
  });

  const uniqueCandidates = candidates.filter(
    (candidate, index) =>
      candidates.findIndex(
        (other) =>
          squaredDistance(candidate.center, other.center) <= 1e-14 &&
          squaredDistance(candidate.firstTangent, other.firstTangent) <= 1e-14 &&
          squaredDistance(candidate.secondTangent, other.secondTangent) <= 1e-14,
      ) === index,
  );
  return [...uniqueCandidates].sort(
    (first, second) => first.score - second.score,
  )[0] ?? null;
}

function applyFilletTrimExtend(entity, pickWorld, tangentPoint) {
  if (entity.type === "line") {
    const endpoints = getLineEndpointPair(entity);
    if (!endpoints) return false;
    const replaceStart =
      squaredDistance(pickWorld, endpoints.startPoint) <=
      squaredDistance(pickWorld, endpoints.endPoint);
    const replacementPoint = createConstructionPointWithoutHistory(tangentPoint);
    entity[replaceStart ? "startPointId" : "endPointId"] = replacementPoint.id;
    return true;
  }

  if (entity.type === "arc") {
    const startPoint = getPointById(entity.startPointId);
    const endPoint = getPointById(entity.endPointId);
    if (!startPoint || !endPoint) return false;
    const replaceStart =
      squaredDistance(pickWorld, startPoint) <=
      squaredDistance(pickWorld, endPoint);
    entity[replaceStart ? "startPointId" : "endPointId"] = tangentPoint.id;
    return true;
  }

  return false;
}

function createFilletEntity(
  firstEntity,
  secondEntity,
  firstPick,
  secondPick,
  candidate,
  filletRadius,
  applyTrimExtend,
) {
  recordDocumentChange(
    `Fillet ${firstEntity.type} ${firstEntity.id} to ${secondEntity.type} ${secondEntity.id}`,
  );
  const centerPoint = getOrCreatePointWithoutHistory(candidate.center);
  const firstTangentPoint = getOrCreatePointWithoutHistory(
    candidate.firstTangent,
  );
  const secondTangentPoint = getOrCreatePointWithoutHistory(
    candidate.secondTangent,
  );

  if (applyTrimExtend) {
    applyFilletTrimExtend(firstEntity, firstPick, firstTangentPoint);
    applyFilletTrimExtend(secondEntity, secondPick, secondTangentPoint);
    pruneUnusedConstructionPoints();
  }

  const startPoint =
    candidate.startSource === "first"
      ? firstTangentPoint
      : secondTangentPoint;
  const endPoint =
    candidate.startSource === "first"
      ? secondTangentPoint
      : firstTangentPoint;
  const filletArc = {
    id: documentModel.nextEntityId,
    type: "arc",
    centerPointId: centerPoint.id,
    radius: filletRadius,
    startPointId: startPoint.id,
    endPointId: endPoint.id,
  };
  documentModel.nextEntityId += 1;
  documentModel.entities.push(filletArc);
  return filletArc;
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
  selectionState.hoveredEntityId = null;
  selectionState.pickCycle = null;
  pointSketchState.active = false;
  lineSketchState.active = false;
  lineSketchState.startPointId = null;
  lineSketchState.previewWorld = null;
  joinState.active = false;
  joinState.firstPointId = null;
  joinState.previewWorld = null;
  circleState.active = false;
  circleState.centerPointId = null;
  circleState.centerMode = null;
  hexagonState.active = false;
  hexagonState.centerPointId = null;
  intersectionState.active = false;
  intersectionState.firstEntityId = null;
  threeEntityCircleState.active = false;
  threeEntityCircleState.entityIds = [];
  threeEntityCircleState.clickPoints = [];
  offsetState.active = false;
  offsetState.sourceEntityId = null;
  trimExtendState.active = false;
  trimExtendState.sourceEntityId = null;
  trimExtendState.endpointProperty = null;
  trimExtendState.sourcePickWorld = null;
  filletState.active = false;
  filletState.firstEntityId = null;
  filletState.firstPickWorld = null;
  rotateState.active = false;
  rotateState.entityId = null;
  rotateState.pivotPointId = null;
  rotateState.awaitingPivot = false;
  pointOnEntityState.active = false;
  pointOnEntityState.sourceEntityId = null;
  pointOnEntityState.zeroPointId = null;
  pointOnEntityState.zeroChoiceIndex = null;
  pointOnEntityState.awaitingDirection = false;
  pointOnEntityState.directionChoices = [];
  cadCanvas.classList.remove("join-points");
  cadCanvas.classList.remove("point-sketch");
  cadCanvas.classList.remove("line-sketch");
  cadCanvas.classList.remove("circle-center-radius");
  cadCanvas.classList.remove("circle-sketch-center");
  cadCanvas.classList.remove("hexagon-center");
  cadCanvas.classList.remove("intersect-entities");
  cadCanvas.classList.remove("apollonius-entities");
  cadCanvas.classList.remove("offset-entity");
  cadCanvas.classList.remove("trim-extend");
  cadCanvas.classList.remove("trim-extend-source-pick");
  cadCanvas.classList.remove("fillet-entity");
  cadCanvas.classList.remove("rotate-active");
  cadCanvas.classList.remove("rotate-pivot-pick");
  cadCanvas.classList.remove("point-on-entity");
  cadCanvas.classList.remove("point-on-entity-source-pick");
  previewLayer.innerHTML = "";
  if (circleRadiusWindow.classList.contains("is-maximized")) {
    restoreCircleWindow();
  }
  setCircleWindowMinimized(false);
  circleRadiusWindow.hidden = true;
  if (hexagonWindow.classList.contains("is-maximized")) {
    restoreHexagonWindow();
  }
  setHexagonWindowMinimized(false);
  hexagonWindow.hidden = true;
  if (offsetWindow.classList.contains("is-maximized")) {
    restoreOffsetWindow();
  }
  setOffsetWindowMinimized(false);
  offsetWindow.hidden = true;
  if (filletWindow.classList.contains("is-maximized")) {
    restoreFilletWindow();
  }
  setFilletWindowMinimized(false);
  filletWindow.hidden = true;
  if (rotateWindow.classList.contains("is-maximized")) {
    restoreRotateWindow();
  }
  setRotateWindowMinimized(false);
  rotateWindow.hidden = true;
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
  quickUndoButton.disabled = historyState.undoStack.length === 0;
  quickRedoButton.disabled = historyState.redoStack.length === 0;
  deleteMenu.disabled = !selectedEntityExists;
}

function dismissEditMenu() {
  editMenuItem.classList.add("is-dismissed");
  document.activeElement?.blur();
}

function undoDocumentChange() {
  dismissEditMenu();
  const keepPointSketchActive = pointSketchState.active;
  const keepLineSketchActive = lineSketchState.active;
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
  if (keepPointSketchActive) {
    pointSketchState.active = true;
    cadCanvas.classList.add("point-sketch");
  }
  if (keepLineSketchActive) {
    lineSketchState.active = true;
    lineSketchState.startPointId = null;
    lineSketchState.previewWorld = null;
    cadCanvas.classList.add("line-sketch");
  }
  commandStatus.textContent =
    `Undo: ${historyEntry.label}` +
    (keepPointSketchActive
      ? ". Point - Sketch remains active."
      : keepLineSketchActive
        ? ". Line - Sketch remains active; click the first point."
        : "");
}

function redoDocumentChange() {
  dismissEditMenu();
  const keepPointSketchActive = pointSketchState.active;
  const keepLineSketchActive = lineSketchState.active;
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
  if (keepPointSketchActive) {
    pointSketchState.active = true;
    cadCanvas.classList.add("point-sketch");
  }
  if (keepLineSketchActive) {
    lineSketchState.active = true;
    lineSketchState.startPointId = null;
    lineSketchState.previewWorld = null;
    cadCanvas.classList.add("line-sketch");
  }
  commandStatus.textContent =
    `Redo: ${historyEntry.label}` +
    (keepPointSketchActive
      ? ". Point - Sketch remains active."
      : keepLineSketchActive
        ? ". Line - Sketch remains active; click the first point."
        : "");
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
    const connectedLines = documentModel.entities.filter(
      (entity) =>
        entity.type === "line" &&
        (entity.startPointId === selectedEntity.id ||
          entity.endPointId === selectedEntity.id),
    );
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

    connectedLines.forEach((line) => {
      if (line.startPointId === selectedEntity.id) {
        line.startPointId = createConstructionPointWithoutHistory(selectedEntity).id;
      }
      if (line.endPointId === selectedEntity.id) {
        line.endPointId = createConstructionPointWithoutHistory(selectedEntity).id;
      }
    });

    documentModel.entities = documentModel.entities.filter(
      (entity) =>
        entity.id !== selectedEntity.id &&
        !(entity.type === "circle" && entity.centerPointId === selectedEntity.id) &&
        !(
          entity.type === "arc" &&
          (entity.centerPointId === selectedEntity.id ||
            entity.startPointId === selectedEntity.id ||
            entity.endPointId === selectedEntity.id)
        ),
    );
    pruneUnusedConstructionPoints();
    selectionState.selectedEntityId = null;
    renderEntities();
    const dependentDescriptions = [];
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
    const deletionMessage = dependentDescriptions.length
      ? `Deleted point ${selectedEntity.id} and ${dependentDescriptions.join(" and ")}.`
      : `Deleted point ${selectedEntity.id}.`;
    commandStatus.textContent = connectedLines.length
      ? `${deletionMessage} ${connectedLines.length} connected ${connectedLines.length === 1 ? "line was" : "lines were"} kept unchanged.`
      : deletionMessage;
    return;
  }

  documentModel.entities = documentModel.entities.filter(
    (entity) => entity.id !== selectedEntity.id,
  );
  pruneUnusedConstructionPoints();
  selectionState.selectedEntityId = null;
  renderEntities();
  commandStatus.textContent = `Deleted ${selectedEntity.type} ${selectedEntity.id}.`;
}

function dismissDrawMenu() {
  drawMenuItem.classList.add("is-dismissed");
  document.activeElement?.blur();
}

function deactivatePointSketch(statusMessage) {
  pointSketchState.active = false;
  cadCanvas.classList.remove("point-sketch");
  if (lineSketchState.active) deactivateLineSketch();
  if (threeEntityCircleState.active) deactivateThreeEntityCircle();
  if (statusMessage) commandStatus.textContent = statusMessage;
}

function activatePointSketch() {
  dismissDrawMenu();
  deactivateLineSketch();
  deactivateThreeEntityCircle();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  deactivateFillet();
  deactivateRotate();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!hexagonWindow.hidden) closeHexagonWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);
  if (!lineCoordinatesWindow.hidden) closeLineCoordinatesWindow(null);

  selectionState.mode = null;
  selectionState.selectedEntityId = null;
  selectionState.pickCycle = null;
  cadCanvas.classList.remove("select-single");
  pointSketchState.active = true;
  cadCanvas.classList.add("point-sketch");
  renderEntities();
  commandStatus.textContent =
    "Point - Sketch: Click the drawing to create points; choose another task or press Escape to finish.";
}

function handlePointSketchClick(event) {
  const worldPoint = screenToWorld(event);
  const existingPoint = findExistingPointAt(worldPoint);
  if (existingPoint) {
    commandStatus.textContent =
      `Point ${existingPoint.id} already exists at X${formatCoordinate(existingPoint.x)} ` +
      `Y${formatCoordinate(existingPoint.y)}. Point - Sketch remains active.`;
    return;
  }

  const point = addPoint(worldPoint.x, worldPoint.y);
  commandStatus.textContent =
    `Created point ${point.id} at X${formatCoordinate(point.x)} ` +
    `Y${formatCoordinate(point.y)}. Point - Sketch remains active.`;
}

function deactivateLineSketch(statusMessage) {
  lineSketchState.active = false;
  lineSketchState.startPointId = null;
  lineSketchState.previewWorld = null;
  cadCanvas.classList.remove("line-sketch");
  previewLayer.innerHTML = "";
  if (statusMessage) commandStatus.textContent = statusMessage;
}

function activateLineSketch() {
  dismissDrawMenu();
  deactivatePointSketch();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  deactivateFillet();
  deactivateRotate();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!hexagonWindow.hidden) closeHexagonWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);
  if (!lineCoordinatesWindow.hidden) closeLineCoordinatesWindow(null);

  selectionState.mode = null;
  selectionState.selectedEntityId = null;
  selectionState.pickCycle = null;
  cadCanvas.classList.remove("select-single");
  lineSketchState.active = true;
  lineSketchState.startPointId = null;
  lineSketchState.previewWorld = null;
  cadCanvas.classList.add("line-sketch");
  renderEntities();
  commandStatus.textContent =
    "Line - Sketch: Click the first point; choose another task or press Escape to finish.";
}

function handleLineSketchClick(event) {
  const worldPoint = screenToWorld(event);

  if (lineSketchState.startPointId === null) {
    const existingPoint = findExistingPointAt(worldPoint);
    const startPoint = existingPoint ?? addPoint(worldPoint.x, worldPoint.y);
    lineSketchState.startPointId = startPoint.id;
    lineSketchState.previewWorld = { x: startPoint.x, y: startPoint.y };
    renderEntities();
    commandStatus.textContent =
      `Line - Sketch: Start point ${startPoint.id} at ` +
      `X${formatCoordinate(startPoint.x)} Y${formatCoordinate(startPoint.y)}; ` +
      "click the end point.";
    return;
  }

  const startPoint = getPointById(lineSketchState.startPointId);
  if (!startPoint) {
    lineSketchState.startPointId = null;
    lineSketchState.previewWorld = null;
    renderEntities();
    commandStatus.textContent =
      "Line - Sketch: The start point is no longer available; click a new first point.";
    return;
  }

  if (squaredDistance(startPoint, worldPoint) <= GEOMETRY_EPSILON ** 2) {
    commandStatus.textContent =
      "Line - Sketch: The end must differ from the start point.";
    return;
  }

  const duplicateLine = findLineAtCoordinates(startPoint, worldPoint);
  if (duplicateLine) {
    lineSketchState.startPointId = null;
    lineSketchState.previewWorld = null;
    renderEntities();
    commandStatus.textContent =
      `Line - Sketch: Line ${duplicateLine.id} already exists there; ` +
      "click the first point for the next line.";
    return;
  }

  lineSketchState.startPointId = null;
  lineSketchState.previewWorld = null;
  const { line, startPoint: visibleStart, endPoint } = addCoordinateLine(
    startPoint,
    worldPoint,
  );
  commandStatus.textContent =
    `Created line ${line.id} from point ${visibleStart.id} to point ${endPoint.id}. ` +
    "Line - Sketch remains active; click the first point for the next line.";
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
  deactivatePointSketch();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  deactivateFillet();
  deactivateRotate();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!hexagonWindow.hidden) closeHexagonWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);
  if (!lineCoordinatesWindow.hidden) closeLineCoordinatesWindow(null);

  const pointCount = documentModel.entities.filter(
    (entity) => entity.type === "point" && !entity.isConstruction,
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
  const startPoint = getPointById(startPointId);
  const endPoint = getPointById(pointId);
  const duplicateLine =
    startPoint && endPoint ? findLineAtCoordinates(startPoint, endPoint) : null;

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
  if (!line) {
    joinState.firstPointId = null;
    joinState.previewWorld = null;
    renderEntities();
    commandStatus.textContent =
      "Line - Join: One of the selected points is no longer available.";
    return;
  }
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
  deactivatePointSketch();
  deactivateJoin();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  deactivateFillet();
  deactivateRotate();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!hexagonWindow.hidden) closeHexagonWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow();
  if (!lineCoordinatesWindow.hidden) closeLineCoordinatesWindow(null);

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
      !entity.isConstruction &&
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
  circleState.centerMode = null;
  cadCanvas.classList.remove("circle-center-radius");
  cadCanvas.classList.remove("circle-sketch-center");
  previewLayer.innerHTML = "";
  renderEntities();

  if (statusMessage !== null) {
    commandStatus.textContent = statusMessage;
  }
}

function activateCircleCenterMode(centerMode) {
  dismissDrawMenu();
  deactivatePointSketch();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  deactivateFillet();
  deactivateRotate();
  if (!hexagonWindow.hidden) closeHexagonWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow();
  if (!lineCoordinatesWindow.hidden) closeLineCoordinatesWindow(null);

  if (centerMode === "point") {
    const pointCount = documentModel.entities.filter(
      (entity) => entity.type === "point" && !entity.isConstruction,
    ).length;
    if (pointCount < 1) {
      commandStatus.textContent =
        "Circle - Point Center & Radius needs an existing center point.";
      return;
    }
  }

  selectionState.mode = null;
  selectionState.selectedEntityId = null;
  cadCanvas.classList.remove("select-single");
  circleState.active = true;
  circleState.centerPointId = null;
  circleState.centerMode = centerMode;
  cadCanvas.classList.toggle("circle-center-radius", centerMode === "point");
  cadCanvas.classList.toggle("circle-sketch-center", centerMode === "sketch");
  circleRadiusTitle.textContent =
    centerMode === "sketch"
      ? "Circle - Sketch Center & Radius"
      : "Circle - Point Center & Radius";
  circleCenterReadout.textContent = "None selected";
  circleToolMessage.textContent =
    centerMode === "sketch"
      ? "Set the radius if needed, then click the drawing to sketch the center."
      : "Select an existing point for the center.";
  circleCreateButton.disabled = true;
  if (getCircleRadiusInputValue() === null) circleRadiusInput.value = "1";
  circleRadiusInput.setCustomValidity("");
  circleRadiusWindow.hidden = false;
  setCircleWindowMinimized(false);

  if (!circleWindowState.hasPosition) {
    positionCircleWindowInitially();
  }

  renderEntities();
  commandStatus.textContent =
    centerMode === "sketch"
      ? "Circle - Sketch Center: Click the drawing to create the center point."
      : "Circle: Select the center point.";
}

function activateCircleCenterRadius() {
  activateCircleCenterMode("point");
}

function activateCircleSketchCenter() {
  activateCircleCenterMode("sketch");
}

function handleCircleCenterClick(event) {
  let centerPoint;
  if (circleState.centerMode === "sketch") {
    const worldPoint = screenToWorld(event);
    centerPoint =
      findExistingPointAt(worldPoint) ?? addPoint(worldPoint.x, worldPoint.y);
  } else {
    const pointElement = event.target.closest(".point-entity");
    if (!pointElement) {
      commandStatus.textContent =
        "Circle: Select an existing point for the center.";
      return;
    }
    centerPoint = getPointById(Number(pointElement.dataset.entityId));
  }

  if (!centerPoint) return;

  circleState.centerPointId = centerPoint.id;
  circleCenterReadout.textContent = `Point ${centerPoint.id} — X${formatCoordinate(centerPoint.x)} Y${formatCoordinate(centerPoint.y)}`;
  circleToolMessage.textContent = "Enter a positive radius, then choose Create.";
  circleCreateButton.disabled = getCircleRadiusInputValue() === null;
  renderEntities();
  circleRadiusInput.focus();
  circleRadiusInput.select();
  commandStatus.textContent =
    `Circle: Center point ${centerPoint.id}; enter the radius.`;
}

function createCircleFromInput() {
  const centerPoint = getPointById(circleState.centerPointId);
  const radius = resolveArithmeticInput(circleRadiusInput, {
    messageElement: circleToolMessage,
    invalidMessage: "Enter a valid arithmetic expression for the radius.",
    validationMessage: (value) =>
      value > 0 ? null : "Enter a radius greater than zero.",
    successMessage: () =>
      circleState.centerPointId === null
        ? circleState.centerMode === "sketch"
          ? "Click the drawing to sketch the center point."
          : "Select an existing point for the center."
        : "Enter a positive radius, then choose Create.",
  });
  if (!circleRadiusForm.reportValidity()) return;
  if (!centerPoint) {
    circleToolMessage.textContent =
      circleState.centerMode === "sketch"
        ? "Click the drawing to sketch the center point."
        : "Select an existing point for the center.";
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
    circleState.centerMode === "sketch"
      ? `Created circle ${circle.id}. Click to sketch the next center point.`
      : `Created circle ${circle.id}. Select the next center point.`;
  circleCreateButton.disabled = true;
  renderEntities();
  commandStatus.textContent =
    `Created circle ${circle.id} at point ${centerPoint.id} with radius ${formatCoordinate(radius)}. ` +
    (circleState.centerMode === "sketch"
      ? "Click to sketch the center point for the next circle."
      : "Select the center point for the next circle.");
}

function deactivateThreeEntityCircle(statusMessage) {
  threeEntityCircleState.active = false;
  threeEntityCircleState.entityIds = [];
  threeEntityCircleState.clickPoints = [];
  cadCanvas.classList.remove("apollonius-entities");
  renderEntities();
  if (statusMessage) commandStatus.textContent = statusMessage;
}

function resetThreeEntityCircleSelection(statusMessage) {
  threeEntityCircleState.entityIds = [];
  threeEntityCircleState.clickPoints = [];
  renderEntities();
  commandStatus.textContent = statusMessage;
}

function activateThreeEntityCircle() {
  dismissDrawMenu();
  deactivatePointSketch();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  deactivateFillet();
  deactivateRotate();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!hexagonWindow.hidden) closeHexagonWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);
  if (!lineCoordinatesWindow.hidden) closeLineCoordinatesWindow(null);

  const eligibleCount = documentModel.entities.filter(
    (entity) =>
      (entity.type === "point" && !entity.isConstruction) ||
      entity.type === "line" ||
      entity.type === "circle",
  ).length;
  if (eligibleCount < 3) {
    commandStatus.textContent =
      "Circle - 3 Entities needs three point, line, or circle entities.";
    return;
  }

  selectionState.mode = null;
  selectionState.selectedEntityId = null;
  selectionState.pickCycle = null;
  cadCanvas.classList.remove("select-single");
  threeEntityCircleState.active = true;
  threeEntityCircleState.entityIds = [];
  threeEntityCircleState.clickPoints = [];
  cadCanvas.classList.add("apollonius-entities");
  renderEntities();
  commandStatus.textContent =
    "Circle - 3 Entities: Select the first point, line, or circle near the desired tangency.";
}

function handleThreeEntityCircleClick(event) {
  const entityElement = event.target.closest(
    ".point-entity, .line-entity, .circle-entity",
  );
  if (!entityElement) {
    commandStatus.textContent =
      `Circle - 3 Entities: Select entity ${threeEntityCircleState.entityIds.length + 1} of 3.`;
    return;
  }

  const entityId = Number(entityElement.dataset.entityId);
  if (threeEntityCircleState.entityIds.includes(entityId)) {
    commandStatus.textContent =
      "Circle - 3 Entities: Each selected entity must be different.";
    return;
  }
  const entity = getEntityById(entityId);
  if (!entity || !["point", "line", "circle"].includes(entity.type)) {
    commandStatus.textContent =
      "Circle - 3 Entities supports points, lines, and circles.";
    return;
  }

  threeEntityCircleState.entityIds.push(entityId);
  threeEntityCircleState.clickPoints.push(screenToWorld(event));
  renderEntities();
  if (threeEntityCircleState.entityIds.length < 3) {
    commandStatus.textContent =
      `Circle - 3 Entities: Selected ${entity.type} ${entity.id}; ` +
      `select entity ${threeEntityCircleState.entityIds.length + 1} of 3.`;
    return;
  }

  const selectedEntities = threeEntityCircleState.entityIds.map(getEntityById);
  const candidates = solveApolloniusThreeEntities(selectedEntities);
  const chosenCandidate = selectApolloniusCandidate(
    candidates,
    selectedEntities,
    threeEntityCircleState.clickPoints,
  );
  if (!chosenCandidate) {
    resetThreeEntityCircleSelection(
      "Circle - 3 Entities: No finite tangent circle was found. Select a new first entity.",
    );
    return;
  }

  threeEntityCircleState.entityIds = [];
  threeEntityCircleState.clickPoints = [];
  const { circle, centerPoint } = addApolloniusCircle(
    { x: chosenCandidate.center[0], y: chosenCandidate.center[1] },
    chosenCandidate.radius,
  );
  commandStatus.textContent =
    `Created circle ${circle.id} at point ${centerPoint.id} with radius ` +
    `${formatCoordinate(circle.radius)} from ${candidates.length} valid ` +
    `${candidates.length === 1 ? "solution" : "solutions"}. ` +
    "Circle - 3 Entities remains active; select the first entity for the next circle.";
}

function positionHexagonWindowInitially() {
  const windowBounds = hexagonWindow.getBoundingClientRect();
  const left = Math.max(8, window.innerWidth - windowBounds.width - 24);
  const top = Math.min(
    112,
    Math.max(8, window.innerHeight - windowBounds.height - 36),
  );
  hexagonWindow.style.left = `${left}px`;
  hexagonWindow.style.top = `${top}px`;
  hexagonWindowState.hasPosition = true;
}

function setHexagonWindowMinimized(minimized) {
  hexagonWindow.classList.toggle("is-minimized", minimized);
  hexagonMinimizeButton.setAttribute(
    "aria-label",
    minimized ? "Restore Hexagon" : "Minimize Hexagon",
  );
  hexagonMinimizeButton.title = minimized ? "Restore" : "Minimize";
}

function restoreHexagonWindow() {
  hexagonWindow.classList.remove("is-maximized");
  if (hexagonWindowState.restoreBounds) {
    const { left, top, width } = hexagonWindowState.restoreBounds;
    hexagonWindow.style.left = `${left}px`;
    hexagonWindow.style.top = `${top}px`;
    hexagonWindow.style.width = `${width}px`;
  }
  hexagonMaximizeButton.setAttribute("aria-label", "Maximize Hexagon");
  hexagonMaximizeButton.title = "Maximize";
  hexagonMaximizeIcon.textContent = "□";
}

function toggleHexagonWindowMaximized() {
  setHexagonWindowMinimized(false);
  if (hexagonWindow.classList.contains("is-maximized")) {
    restoreHexagonWindow();
    return;
  }
  const bounds = hexagonWindow.getBoundingClientRect();
  hexagonWindowState.restoreBounds = {
    left: bounds.left,
    top: bounds.top,
    width: bounds.width,
  };
  hexagonWindow.classList.add("is-maximized");
  hexagonMaximizeButton.setAttribute("aria-label", "Restore Hexagon");
  hexagonMaximizeButton.title = "Restore";
  hexagonMaximizeIcon.textContent = "❐";
}

function closeHexagonWindow(statusMessage = "Ready") {
  if (hexagonWindow.classList.contains("is-maximized")) {
    restoreHexagonWindow();
  }
  setHexagonWindowMinimized(false);
  hexagonWindow.hidden = true;
  hexagonState.active = false;
  hexagonState.centerPointId = null;
  cadCanvas.classList.remove("hexagon-center");
  previewLayer.innerHTML = "";
  renderEntities();
  if (statusMessage !== null) commandStatus.textContent = statusMessage;
}

function updateHexagonCreateState() {
  const acrossFlats = getHexagonAcrossFlatsInputValue();
  const cornerRadius = getHexagonCornerRadiusInputValue(acrossFlats);
  hexagonCreateButton.disabled =
    hexagonState.centerPointId === null ||
    acrossFlats === null ||
    cornerRadius === null;
}

function activateHexagon() {
  dismissDrawMenu();
  deactivatePointSketch();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  deactivateFillet();
  deactivateRotate();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);
  if (!lineCoordinatesWindow.hidden) closeLineCoordinatesWindow(null);

  const pointCount = documentModel.entities.filter(
    (entity) => entity.type === "point" && !entity.isConstruction,
  ).length;
  if (pointCount < 1) {
    commandStatus.textContent = "Hexagon needs an existing center point.";
    return;
  }

  selectionState.mode = null;
  selectionState.selectedEntityId = null;
  cadCanvas.classList.remove("select-single");
  hexagonState.active = true;
  hexagonState.centerPointId = null;
  cadCanvas.classList.add("hexagon-center");
  hexagonCenterReadout.textContent = "None selected";
  hexagonToolMessage.textContent = "Select an existing point for the center.";
  if (getHexagonAcrossFlatsInputValue() === null) {
    hexagonAcrossFlatsInput.value = "1";
  }
  const acrossFlats = getHexagonAcrossFlatsInputValue();
  if (getHexagonCornerRadiusInputValue(acrossFlats) === null) {
    hexagonCornerRadiusInput.value = "0";
  }
  hexagonAcrossFlatsInput.setCustomValidity("");
  hexagonCornerRadiusInput.setCustomValidity("");
  hexagonCreateButton.disabled = true;
  hexagonWindow.hidden = false;
  setHexagonWindowMinimized(false);
  if (!hexagonWindowState.hasPosition) positionHexagonWindowInitially();
  renderEntities();
  commandStatus.textContent = "Hexagon: Select the center point.";
}

function handleHexagonCenterClick(event) {
  const pointElement = event.target.closest(".point-entity");
  if (!pointElement) {
    commandStatus.textContent = "Hexagon: Select an existing point for the center.";
    return;
  }
  const centerPoint = getPointById(Number(pointElement.dataset.entityId));
  if (!centerPoint) return;
  hexagonState.centerPointId = centerPoint.id;
  hexagonCenterReadout.textContent =
    `Point ${centerPoint.id} — X${formatCoordinate(centerPoint.x)} ` +
    `Y${formatCoordinate(centerPoint.y)}`;
  hexagonToolMessage.textContent =
    "Enter the size across flats and an optional corner radius.";
  updateHexagonCreateState();
  renderEntities();
  hexagonAcrossFlatsInput.focus();
  hexagonAcrossFlatsInput.select();
  commandStatus.textContent =
    `Hexagon: Center point ${centerPoint.id}; enter the dimensions.`;
}

function createHexagonFromInputs() {
  const centerPoint = getPointById(hexagonState.centerPointId);
  const acrossFlats = resolveArithmeticInput(hexagonAcrossFlatsInput, {
    messageElement: hexagonToolMessage,
    invalidMessage:
      "Enter a valid arithmetic expression for the size across flats.",
    validationMessage: (value) =>
      value > 0 ? null : "Enter a size across flats greater than zero.",
    successMessage:
      "Enter the size across flats and an optional corner radius.",
  });
  const cornerRadius = resolveArithmeticInput(hexagonCornerRadiusInput, {
    messageElement: hexagonToolMessage,
    invalidMessage:
      "Enter a valid arithmetic expression for the corner radius.",
    validationMessage: (value) => {
      if (value < 0) return "Enter a corner radius of zero or greater.";
      if (acrossFlats !== null && value >= acrossFlats / 2) {
        return "Corner radius must be less than half the size across flats.";
      }
      return null;
    },
    successMessage:
      "Enter the size across flats and an optional corner radius.",
  });
  if (!hexagonForm.reportValidity()) return;
  if (!centerPoint) {
    hexagonToolMessage.textContent = "Select an existing point for the center.";
    return;
  }
  if (acrossFlats === null) {
    hexagonToolMessage.textContent =
      "Enter a size across flats greater than zero.";
    return;
  }
  if (cornerRadius === null || cornerRadius >= acrossFlats / 2) {
    hexagonToolMessage.textContent =
      "Corner radius must be zero or greater and less than half the size across flats.";
    return;
  }

  const result = addHexagon(centerPoint, acrossFlats, cornerRadius);
  hexagonState.centerPointId = null;
  hexagonCenterReadout.textContent = "None selected";
  hexagonCreateButton.disabled = true;
  const shapeDescription = cornerRadius <= GEOMETRY_EPSILON
    ? "sharp-corner hexagon"
    : `rounded hexagon with ${result.arcs.length} corner arcs`;
  const resultMessage =
    `Created ${shapeDescription} at point ${centerPoint.id}, ` +
    `${formatCoordinate(acrossFlats)} across flats` +
    (cornerRadius <= GEOMETRY_EPSILON
      ? "."
      : ` and radius ${formatCoordinate(cornerRadius)}.`);
  hexagonToolMessage.textContent =
    `${resultMessage} Select the next center point.`;
  renderEntities();
  commandStatus.textContent =
    `${resultMessage} Hexagon remains active; select the next center point.`;
}

function getOffsetAmount() {
  const amount = getArithmeticInputValue(offsetAmountInput);
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
  deactivatePointSketch();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  deactivateFillet();
  deactivateRotate();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!hexagonWindow.hidden) closeHexagonWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);
  if (!lineCoordinatesWindow.hidden) closeLineCoordinatesWindow(null);

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
  offsetAmountInput.setCustomValidity("");
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
  deactivatePointSketch();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivatePointOnEntity();
  deactivateFillet();
  deactivateRotate();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!hexagonWindow.hidden) closeHexagonWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);
  if (!lineCoordinatesWindow.hidden) closeLineCoordinatesWindow(null);

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
  const lineEndpoint = createConstructionPointWithoutHistory(targetPoint);
  sourceLine[endpointProperty] = lineEndpoint.id;
  pruneUnusedConstructionPoints();

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

function positionFilletWindowInitially() {
  const windowBounds = filletWindow.getBoundingClientRect();
  const left = Math.max(8, window.innerWidth - windowBounds.width - 24);
  const top = Math.min(
    112,
    Math.max(8, window.innerHeight - windowBounds.height - 36),
  );
  filletWindow.style.left = `${left}px`;
  filletWindow.style.top = `${top}px`;
  filletWindowState.hasPosition = true;
}

function setFilletWindowMinimized(minimized) {
  filletWindow.classList.toggle("is-minimized", minimized);
  filletMinimizeButton.setAttribute(
    "aria-label",
    minimized ? "Restore Fillet Radius" : "Minimize Fillet Radius",
  );
  filletMinimizeButton.title = minimized ? "Restore" : "Minimize";
}

function restoreFilletWindow() {
  filletWindow.classList.remove("is-maximized");
  if (filletWindowState.restoreBounds) {
    const { left, top, width } = filletWindowState.restoreBounds;
    filletWindow.style.left = `${left}px`;
    filletWindow.style.top = `${top}px`;
    filletWindow.style.width = `${width}px`;
  }
  filletMaximizeButton.setAttribute("aria-label", "Maximize Fillet Radius");
  filletMaximizeButton.title = "Maximize";
  filletMaximizeIcon.textContent = "□";
}

function toggleFilletWindowMaximized() {
  setFilletWindowMinimized(false);
  if (filletWindow.classList.contains("is-maximized")) {
    restoreFilletWindow();
    return;
  }
  const bounds = filletWindow.getBoundingClientRect();
  filletWindowState.restoreBounds = {
    left: bounds.left,
    top: bounds.top,
    width: bounds.width,
  };
  filletWindow.classList.add("is-maximized");
  filletMaximizeButton.setAttribute("aria-label", "Restore Fillet Radius");
  filletMaximizeButton.title = "Restore";
  filletMaximizeIcon.textContent = "❐";
}

function deactivateFillet(statusMessage) {
  filletState.active = false;
  filletState.firstEntityId = null;
  filletState.firstPickWorld = null;
  cadCanvas.classList.remove("fillet-entity");
  if (filletWindow.classList.contains("is-maximized")) {
    restoreFilletWindow();
  }
  setFilletWindowMinimized(false);
  filletWindow.hidden = true;
  renderEntities();
  if (statusMessage) commandStatus.textContent = statusMessage;
}

function resetFilletFirst(statusMessage) {
  filletState.firstEntityId = null;
  filletState.firstPickWorld = null;
  filletSourceReadout.textContent = "None selected";
  filletToolMessage.textContent =
    "Select the first line, circle, or arc near the intended fillet.";
  renderEntities();
  commandStatus.textContent = statusMessage;
}

function activateFillet() {
  dismissDrawMenu();
  deactivatePointSketch();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  deactivateRotate();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!hexagonWindow.hidden) closeHexagonWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);
  if (!lineCoordinatesWindow.hidden) closeLineCoordinatesWindow(null);

  const eligibleCount = documentModel.entities.filter((entity) =>
    ["line", "circle", "arc"].includes(entity.type),
  ).length;
  if (eligibleCount < 2) {
    commandStatus.textContent =
      "Fillet Radius needs at least two line, circle, or arc entities.";
    return;
  }

  selectionState.mode = null;
  selectionState.selectedEntityId = null;
  cadCanvas.classList.remove("select-single");
  filletState.active = true;
  filletState.firstEntityId = null;
  filletState.firstPickWorld = null;
  cadCanvas.classList.add("fillet-entity");
  filletSourceReadout.textContent = "None selected";
  filletToolMessage.textContent =
    "Enter a radius, then select the first entity near the intended fillet.";
  if (getFilletRadiusInputValue() === null) filletRadiusInput.value = "0.25";
  filletRadiusInput.setCustomValidity("");
  filletTrimExtendInput.checked = true;
  filletWindow.hidden = false;
  setFilletWindowMinimized(false);
  if (!filletWindowState.hasPosition) positionFilletWindowInitially();
  renderEntities();
  filletRadiusInput.focus();
  filletRadiusInput.select();
  commandStatus.textContent = "Fillet Radius: Select the first entity.";
}

function handleFilletClick(event) {
  const radius = resolveArithmeticInput(filletRadiusInput, {
    messageElement: filletToolMessage,
    invalidMessage: "Enter a valid arithmetic expression for the fillet radius.",
    validationMessage: (value) =>
      value > 0 ? null : "Enter a fillet radius greater than zero.",
    successMessage: () =>
      filletState.firstEntityId === null
        ? "Select the first line, circle, or arc near the intended fillet."
        : "Select the second line, circle, or arc near the intended fillet.",
  });
  if (radius === null) {
    commandStatus.textContent = "Fillet Radius: Enter a positive radius.";
    filletRadiusInput.focus();
    filletRadiusInput.select();
    return;
  }

  const entityElement = event.target.closest(
    ".line-entity, .circle-entity, .arc-entity",
  );
  if (!entityElement) {
    commandStatus.textContent =
      filletState.firstEntityId === null
        ? "Fillet Radius: Select the first line, circle, or arc."
        : "Fillet Radius: Select the second line, circle, or arc.";
    return;
  }

  const entity = getEntityById(Number(entityElement.dataset.entityId));
  if (!entity) return;
  const pickWorld = screenToWorld(event);
  if (filletState.firstEntityId === null) {
    filletState.firstEntityId = entity.id;
    filletState.firstPickWorld = { x: pickWorld.x, y: pickWorld.y };
    filletSourceReadout.textContent =
      `${entity.type[0].toUpperCase()}${entity.type.slice(1)} ${entity.id}`;
    filletToolMessage.textContent =
      "Select the second entity near the intended fillet.";
    renderEntities();
    commandStatus.textContent =
      `Fillet Radius: ${entity.type} ${entity.id} selected; choose the second entity.`;
    return;
  }

  const firstEntity = getEntityById(filletState.firstEntityId);
  if (!firstEntity) {
    resetFilletFirst("Fillet Radius: The first entity is missing; select again.");
    return;
  }
  if (entity.id === firstEntity.id) {
    commandStatus.textContent =
      "Fillet Radius: Choose a different second entity.";
    return;
  }

  const candidate = getFilletCandidate(
    firstEntity,
    entity,
    filletState.firstPickWorld,
    pickWorld,
    radius,
    filletTrimExtendInput.checked,
  );
  if (!candidate) {
    filletToolMessage.textContent =
      filletTrimExtendInput.checked
        ? "No tangent fillet was found for that radius and those selections."
        : "No tangent fillet fits on both existing entity spans. Enable Trim/Extend or choose another radius.";
    commandStatus.textContent =
      "Fillet Radius: No valid tangent solution; choose another second entity or radius.";
    return;
  }

  const filletArc = createFilletEntity(
    firstEntity,
    entity,
    filletState.firstPickWorld,
    pickWorld,
    candidate,
    radius,
    filletTrimExtendInput.checked,
  );
  const trimDescription = filletTrimExtendInput.checked
    ? " Automatic Trim/Extend was applied to eligible line and arc endpoints."
    : " The source entities were left unchanged.";
  resetFilletFirst(
    `Created fillet arc ${filletArc.id} with radius ${formatCoordinate(radius)}.` +
      trimDescription +
      " Fillet Radius remains active.",
  );
}

function positionRotateWindowInitially() {
  const windowBounds = rotateWindow.getBoundingClientRect();
  const left = Math.max(8, window.innerWidth - windowBounds.width - 24);
  const top = Math.min(
    112,
    Math.max(8, window.innerHeight - windowBounds.height - 36),
  );
  rotateWindow.style.left = `${left}px`;
  rotateWindow.style.top = `${top}px`;
  rotateWindowState.hasPosition = true;
}

function setRotateWindowMinimized(minimized) {
  rotateWindow.classList.toggle("is-minimized", minimized);
  rotateMinimizeButton.setAttribute(
    "aria-label",
    minimized ? "Restore Rotate" : "Minimize Rotate",
  );
  rotateMinimizeButton.title = minimized ? "Restore" : "Minimize";
}

function restoreRotateWindow() {
  rotateWindow.classList.remove("is-maximized");
  if (rotateWindowState.restoreBounds) {
    const { left, top, width } = rotateWindowState.restoreBounds;
    rotateWindow.style.left = `${left}px`;
    rotateWindow.style.top = `${top}px`;
    rotateWindow.style.width = `${width}px`;
  }
  rotateMaximizeButton.setAttribute("aria-label", "Maximize Rotate");
  rotateMaximizeButton.title = "Maximize";
  rotateMaximizeIcon.textContent = "□";
}

function toggleRotateWindowMaximized() {
  setRotateWindowMinimized(false);
  if (rotateWindow.classList.contains("is-maximized")) {
    restoreRotateWindow();
    return;
  }
  const bounds = rotateWindow.getBoundingClientRect();
  rotateWindowState.restoreBounds = {
    left: bounds.left,
    top: bounds.top,
    width: bounds.width,
  };
  rotateWindow.classList.add("is-maximized");
  rotateMaximizeButton.setAttribute("aria-label", "Restore Rotate");
  rotateMaximizeButton.title = "Restore";
  rotateMaximizeIcon.textContent = "❐";
}

function deactivateRotate(statusMessage) {
  const wasActive = rotateState.active;
  rotateState.active = false;
  rotateState.entityId = null;
  rotateState.pivotPointId = null;
  rotateState.awaitingPivot = false;
  cadCanvas.classList.remove("rotate-active");
  cadCanvas.classList.remove("rotate-pivot-pick");
  if (rotateWindow.classList.contains("is-maximized")) {
    restoreRotateWindow();
  }
  setRotateWindowMinimized(false);
  rotateWindow.hidden = true;
  if (wasActive && getEntityById(selectionState.selectedEntityId)) {
    selectionState.mode = "single";
    cadCanvas.classList.add("select-single");
  }
  renderEntities();
  if (statusMessage) commandStatus.textContent = statusMessage;
}

function describeRotateEntity(entity) {
  return `${entity.type[0].toUpperCase()}${entity.type.slice(1)} ${entity.id}`;
}

function beginRotatePivotSelection() {
  if (!rotateState.active) return;
  rotatePivotPointInput.checked = true;
  rotateChoosePointButton.disabled = false;
  rotateState.pivotPointId = null;
  rotateState.awaitingPivot = true;
  rotatePivotReadout.textContent = "Click an existing point";
  rotateToolMessage.textContent =
    "Click an existing point on the drawing to set the rotation pivot.";
  cadCanvas.classList.add("rotate-pivot-pick");
  commandStatus.textContent = "Rotate: Select an existing pivot point.";
}

function useRotateOrigin() {
  rotateState.pivotPointId = null;
  rotateState.awaitingPivot = false;
  rotateChoosePointButton.disabled = true;
  rotatePivotReadout.textContent = "X0 Y0";
  rotateToolMessage.textContent =
    "Enter a counterclockwise angle, then choose Rotate.";
  cadCanvas.classList.remove("rotate-pivot-pick");
  commandStatus.textContent = "Rotate: Using X0 Y0 as the pivot.";
}

function activateRotate() {
  dismissModifyMenu();
  deactivatePointSketch();
  const selectedEntity = getEntityById(selectionState.selectedEntityId);
  if (!selectedEntity) {
    commandStatus.textContent =
      "Rotate needs an entity selected with Select - Single.";
    return;
  }

  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  deactivateFillet();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!hexagonWindow.hidden) closeHexagonWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);
  if (!lineCoordinatesWindow.hidden) closeLineCoordinatesWindow(null);

  selectionState.mode = null;
  cadCanvas.classList.remove("select-single");
  rotateState.active = true;
  rotateState.entityId = selectedEntity.id;
  rotateState.pivotPointId = null;
  rotateState.awaitingPivot = false;
  cadCanvas.classList.add("rotate-active");
  cadCanvas.classList.remove("rotate-pivot-pick");
  rotateSelectionReadout.textContent = describeRotateEntity(selectedEntity);
  rotatePivotOriginInput.checked = true;
  rotateChoosePointButton.disabled = true;
  rotatePivotReadout.textContent = "X0 Y0";
  rotateToolMessage.textContent =
    "Enter a counterclockwise angle, then choose Rotate.";
  rotateAngleInput.setCustomValidity("");
  rotateWindow.hidden = false;
  setRotateWindowMinimized(false);
  if (!rotateWindowState.hasPosition) positionRotateWindowInitially();
  renderEntities();
  rotateAngleInput.focus();
  rotateAngleInput.select();
  commandStatus.textContent =
    `Rotate: ${describeRotateEntity(selectedEntity)} around X0 Y0.`;
}

function handleRotatePivotClick(event) {
  const pointElement = event.target.closest(".point-entity");
  if (!pointElement) {
    commandStatus.textContent = "Rotate: Select an existing pivot point.";
    return;
  }
  const point = getPointById(Number(pointElement.dataset.entityId));
  if (!point) return;
  rotateState.pivotPointId = point.id;
  rotateState.awaitingPivot = false;
  cadCanvas.classList.remove("rotate-pivot-pick");
  rotatePivotReadout.textContent =
    `Point ${point.id}: X${formatCoordinate(point.x)} Y${formatCoordinate(point.y)}`;
  rotateToolMessage.textContent =
    "Enter a counterclockwise angle, then choose Rotate.";
  commandStatus.textContent = `Rotate: Point ${point.id} selected as the pivot.`;
  rotateAngleInput.focus();
  rotateAngleInput.select();
}

function rotateWorldPoint(worldPoint, pivot, radians) {
  const rawCosine = Math.cos(radians);
  const rawSine = Math.sin(radians);
  const cosine = Math.abs(rawCosine) <= 1e-12 ? 0 : rawCosine;
  const sine = Math.abs(rawSine) <= 1e-12 ? 0 : rawSine;
  const relativeX = worldPoint.x - pivot.x;
  const relativeY = worldPoint.y - pivot.y;
  const x = pivot.x + relativeX * cosine - relativeY * sine;
  const y = pivot.y + relativeX * sine + relativeY * cosine;
  return {
    x: Math.abs(x) <= 1e-12 ? 0 : x,
    y: Math.abs(y) <= 1e-12 ? 0 : y,
  };
}

function rotateSelectedEntity() {
  const angleDegrees = resolveArithmeticInput(rotateAngleInput, {
    messageElement: rotateToolMessage,
    invalidMessage: "Enter a valid arithmetic expression for the angle.",
    successMessage: "Enter a counterclockwise angle, then choose Rotate.",
  });
  if (angleDegrees === null) {
    commandStatus.textContent = "Rotate: Enter a valid angle.";
    rotateAngleInput.focus();
    rotateAngleInput.select();
    return;
  }

  const entity = getEntityById(rotateState.entityId);
  if (!entity) {
    deactivateRotate("Rotate canceled: the selected entity no longer exists.");
    return;
  }

  let pivot = ORIGIN;
  let pivotDescription = "X0 Y0";
  if (rotatePivotPointInput.checked) {
    const pivotPoint = getPointById(rotateState.pivotPointId);
    if (!pivotPoint) {
      beginRotatePivotSelection();
      rotateToolMessage.textContent =
        "Choose an existing point before rotating around a specified point.";
      return;
    }
    pivot = pivotPoint;
    pivotDescription = `point ${pivotPoint.id}`;
  }

  const radians = (angleDegrees * Math.PI) / 180;
  const pointProperties = [];
  if (entity.type === "point") {
    pointProperties.push({ property: null, point: entity });
  } else if (entity.type === "line") {
    pointProperties.push(
      { property: "startPointId", point: getPointById(entity.startPointId) },
      { property: "endPointId", point: getPointById(entity.endPointId) },
    );
  } else if (entity.type === "circle") {
    pointProperties.push({
      property: "centerPointId",
      point: getPointById(entity.centerPointId),
    });
  } else if (entity.type === "arc") {
    pointProperties.push(
      { property: "centerPointId", point: getPointById(entity.centerPointId) },
      { property: "startPointId", point: getPointById(entity.startPointId) },
      { property: "endPointId", point: getPointById(entity.endPointId) },
    );
  }

  if (!pointProperties.length || pointProperties.some(({ point }) => !point)) {
    rotateToolMessage.textContent = "The selected entity has unusable geometry.";
    commandStatus.textContent = "Rotate: The selected entity could not be rotated.";
    return;
  }

  const transformations = pointProperties.map(({ property, point }) => ({
    property,
    point,
    rotated: rotateWorldPoint(point, pivot, radians),
  }));
  const changed = transformations.some(
    ({ point, rotated }) =>
      Math.hypot(point.x - rotated.x, point.y - rotated.y) > GEOMETRY_EPSILON,
  );
  if (!changed) {
    rotateToolMessage.textContent =
      `That rotation leaves ${describeRotateEntity(entity)} unchanged.`;
    commandStatus.textContent = "Rotate: No geometry changed.";
    return;
  }

  recordDocumentChange(`Rotate ${entity.type} ${entity.id}`);
  if (entity.type === "point") {
    entity.x = transformations[0].rotated.x;
    entity.y = transformations[0].rotated.y;
  } else {
    transformations.forEach(({ property, point, rotated }) => {
      entity[property] = point.isConstruction
        ? createConstructionPointWithoutHistory(rotated).id
        : getOrCreatePointWithoutHistory(rotated).id;
    });
  }

  pruneUnusedConstructionPoints();
  renderEntities();
  const angleText = formatArithmeticResult(angleDegrees);
  const resultMessage =
    `Rotated ${entity.type} ${entity.id} ${angleText}° counterclockwise ` +
    `around ${pivotDescription}.`;
  rotateToolMessage.textContent = resultMessage;
  commandStatus.textContent = resultMessage;
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
  deactivatePointSketch();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivateFillet();
  deactivateRotate();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!hexagonWindow.hidden) closeHexagonWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);
  if (!lineCoordinatesWindow.hidden) closeLineCoordinatesWindow(null);

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
      pointId: startPoint && !startPoint.isConstruction ? startPoint.id : null,
      x: start.x,
      y: start.y,
    },
    {
      pointId: endPoint && !endPoint.isConstruction ? endPoint.id : null,
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
  pointOnEntityValueInput.setCustomValidity("");
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
  const sourceEntity = getEntityById(pointOnEntityState.sourceEntityId);
  const value = resolveArithmeticInput(pointOnEntityValueInput, {
    messageElement: pointOnEntityToolMessage,
    invalidMessage: "Enter a valid arithmetic expression.",
    validationMessage: (resolvedValue) =>
      sourceEntity?.type === "line" &&
      (resolvedValue < 0 || resolvedValue > 100)
        ? "Enter a percentage from 0 to 100."
        : null,
    successMessage: () =>
      sourceEntity?.type === "line"
        ? "Enter a percentage from 0 to 100 along the line."
        : "0° = right, 90° = up, 180° = left, 270° = down.",
  });
  if (!pointOnEntityForm.reportValidity()) return;
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

function positionLineCoordinatesWindowInitially() {
  const windowBounds = lineCoordinatesWindow.getBoundingClientRect();
  const left = Math.max(8, window.innerWidth - windowBounds.width - 24);
  const top = Math.min(
    112,
    Math.max(8, window.innerHeight - windowBounds.height - 36),
  );
  lineCoordinatesWindow.style.left = `${left}px`;
  lineCoordinatesWindow.style.top = `${top}px`;
  lineCoordinatesWindowState.hasPosition = true;
}

function setLineCoordinatesWindowMinimized(minimized) {
  lineCoordinatesWindow.classList.toggle("is-minimized", minimized);
  lineCoordinatesMinimizeButton.setAttribute(
    "aria-label",
    minimized ? "Restore Line Coordinates" : "Minimize Line Coordinates",
  );
  lineCoordinatesMinimizeButton.title = minimized ? "Restore" : "Minimize";
}

function restoreLineCoordinatesWindow() {
  lineCoordinatesWindow.classList.remove("is-maximized");
  if (lineCoordinatesWindowState.restoreBounds) {
    const { left, top, width } = lineCoordinatesWindowState.restoreBounds;
    lineCoordinatesWindow.style.left = `${left}px`;
    lineCoordinatesWindow.style.top = `${top}px`;
    lineCoordinatesWindow.style.width = `${width}px`;
  }
  lineCoordinatesMaximizeButton.setAttribute(
    "aria-label",
    "Maximize Line Coordinates",
  );
  lineCoordinatesMaximizeButton.title = "Maximize";
  lineCoordinatesMaximizeIcon.textContent = "□";
}

function toggleLineCoordinatesWindowMaximized() {
  setLineCoordinatesWindowMinimized(false);
  if (lineCoordinatesWindow.classList.contains("is-maximized")) {
    restoreLineCoordinatesWindow();
    return;
  }
  const bounds = lineCoordinatesWindow.getBoundingClientRect();
  lineCoordinatesWindowState.restoreBounds = {
    left: bounds.left,
    top: bounds.top,
    width: bounds.width,
  };
  lineCoordinatesWindow.classList.add("is-maximized");
  lineCoordinatesMaximizeButton.setAttribute(
    "aria-label",
    "Restore Line Coordinates",
  );
  lineCoordinatesMaximizeButton.title = "Restore";
  lineCoordinatesMaximizeIcon.textContent = "❐";
}

function closeLineCoordinatesWindow(statusMessage = "Ready") {
  if (lineCoordinatesWindow.classList.contains("is-maximized")) {
    restoreLineCoordinatesWindow();
  }
  setLineCoordinatesWindowMinimized(false);
  lineCoordinatesWindow.hidden = true;
  if (statusMessage !== null) commandStatus.textContent = statusMessage;
}

function activateLineCoordinates() {
  dismissDrawMenu();
  deactivatePointSketch();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  deactivateFillet();
  deactivateRotate();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!hexagonWindow.hidden) closeHexagonWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!pointCoordinatesWindow.hidden) closePointCoordinatesWindow(null);

  selectionState.mode = null;
  selectionState.selectedEntityId = null;
  selectionState.pickCycle = null;
  cadCanvas.classList.remove("select-single");
  lineCoordinatesToolMessage.textContent =
    "Enter the start and end coordinates.";
  [lineStartXInput, lineStartYInput, lineEndXInput, lineEndYInput].forEach(
    (input) => input.setCustomValidity(""),
  );
  lineCoordinatesWindow.hidden = false;
  setLineCoordinatesWindowMinimized(false);
  if (!lineCoordinatesWindowState.hasPosition) {
    positionLineCoordinatesWindowInitially();
  }
  lineStartXInput.focus();
  lineStartXInput.select();
  commandStatus.textContent = "Line - Coordinates";
}

function createLineFromCoordinateInputs(keepDialogOpen) {
  const configurations = [
    {
      input: lineStartXInput,
      label: "start X",
    },
    {
      input: lineStartYInput,
      label: "start Y",
    },
    {
      input: lineEndXInput,
      label: "end X",
    },
    {
      input: lineEndYInput,
      label: "end Y",
    },
  ];
  const values = configurations.map(({ input, label }) =>
    resolveArithmeticInput(input, {
      messageElement: lineCoordinatesToolMessage,
      invalidMessage: `Enter a valid arithmetic expression for ${label}.`,
      successMessage: "Enter the start and end coordinates.",
    }),
  );
  if (!lineCoordinatesForm.reportValidity()) return;
  if (values.some((value) => value === null)) return;

  const [startX, startY, endX, endY] = values;
  const start = { x: startX, y: startY };
  const end = { x: endX, y: endY };
  if (squaredDistance(start, end) <= GEOMETRY_EPSILON ** 2) {
    lineCoordinatesToolMessage.textContent =
      "Start and end coordinates must define a line with a nonzero length.";
    commandStatus.textContent = "Line - Coordinates: Start and end are identical.";
    return;
  }

  const duplicateLine = findLineAtCoordinates(start, end);
  if (duplicateLine) {
    lineCoordinatesToolMessage.textContent =
      `Line ${duplicateLine.id} already exists at those coordinates.`;
    commandStatus.textContent =
      `Line - Coordinates: Line ${duplicateLine.id} already exists.`;
    return;
  }

  const { line, startPoint, endPoint } = addCoordinateLine(start, end);
  const resultMessage =
    `Created line ${line.id} from X${formatCoordinate(startPoint.x)} ` +
    `Y${formatCoordinate(startPoint.y)} to X${formatCoordinate(endPoint.x)} ` +
    `Y${formatCoordinate(endPoint.y)}.`;
  if (keepDialogOpen) {
    lineCoordinatesToolMessage.textContent = resultMessage;
    commandStatus.textContent = `${resultMessage} Line - Coordinates remains open.`;
    lineStartXInput.focus();
    lineStartXInput.select();
    return;
  }
  closeLineCoordinatesWindow(resultMessage);
}

function activatePointCoordinates() {
  deactivatePointSketch();
  deactivateJoin();
  deactivateIntersectingPoint();
  deactivateTrimExtend();
  deactivatePointOnEntity();
  deactivateFillet();
  deactivateRotate();
  if (!circleRadiusWindow.hidden) closeCircleRadiusWindow(null);
  if (!hexagonWindow.hidden) closeHexagonWindow(null);
  if (!offsetWindow.hidden) closeOffsetWindow(null);
  if (!lineCoordinatesWindow.hidden) closeLineCoordinatesWindow(null);
  commandStatus.textContent = "Point: Coordinates";
  toolMessage.textContent = "Enter the point coordinates.";
  pointXInput.setCustomValidity("");
  pointYInput.setCustomValidity("");
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
  const x = resolveArithmeticInput(pointXInput, {
    messageElement: toolMessage,
    invalidMessage: "Enter a valid arithmetic expression for X.",
    successMessage: "Enter the point coordinates.",
  });
  const y = resolveArithmeticInput(pointYInput, {
    messageElement: toolMessage,
    invalidMessage: "Enter a valid arithmetic expression for Y.",
    successMessage: "Enter the point coordinates.",
  });
  if (!pointCoordinatesForm.reportValidity()) return;

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

function screenPointToWorld(clientX, clientY) {
  const screenPoint = cadCanvas.createSVGPoint();
  screenPoint.x = clientX;
  screenPoint.y = clientY;
  return screenPoint.matrixTransform(worldLayer.getScreenCTM().inverse());
}

function screenToWorld(event) {
  return screenPointToWorld(event.clientX, event.clientY);
}

pointCoordinatesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createPointFromInputs(false);
});

lineCoordinatesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createLineFromCoordinateInputs(false);
});

pointOnEntityForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createPointOnEntity();
});

circleRadiusForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createCircleFromInput();
});

hexagonForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createHexagonFromInputs();
});

offsetForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

filletForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

rotateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  rotateSelectedEntity();
});

const arithmeticInputConfigurations = [
  {
    input: pointXInput,
    messageElement: toolMessage,
    invalidMessage: "Enter a valid arithmetic expression for X.",
    successMessage: "Enter the point coordinates.",
  },
  {
    input: pointYInput,
    messageElement: toolMessage,
    invalidMessage: "Enter a valid arithmetic expression for Y.",
    successMessage: "Enter the point coordinates.",
  },
  {
    input: lineStartXInput,
    messageElement: lineCoordinatesToolMessage,
    invalidMessage: "Enter a valid arithmetic expression for start X.",
    successMessage: "Enter the start and end coordinates.",
  },
  {
    input: lineStartYInput,
    messageElement: lineCoordinatesToolMessage,
    invalidMessage: "Enter a valid arithmetic expression for start Y.",
    successMessage: "Enter the start and end coordinates.",
  },
  {
    input: lineEndXInput,
    messageElement: lineCoordinatesToolMessage,
    invalidMessage: "Enter a valid arithmetic expression for end X.",
    successMessage: "Enter the start and end coordinates.",
  },
  {
    input: lineEndYInput,
    messageElement: lineCoordinatesToolMessage,
    invalidMessage: "Enter a valid arithmetic expression for end Y.",
    successMessage: "Enter the start and end coordinates.",
  },
  {
    input: circleRadiusInput,
    messageElement: circleToolMessage,
    invalidMessage: "Enter a valid arithmetic expression for the radius.",
    validationMessage: (value) =>
      value > 0 ? null : "Enter a radius greater than zero.",
    successMessage: () =>
      circleState.centerPointId === null
        ? circleState.centerMode === "sketch"
          ? "Click the drawing to sketch the center point."
          : "Select an existing point for the center."
        : "Enter a positive radius, then choose Create.",
  },
  {
    input: hexagonAcrossFlatsInput,
    messageElement: hexagonToolMessage,
    invalidMessage:
      "Enter a valid arithmetic expression for the size across flats.",
    validationMessage: (value) =>
      value > 0 ? null : "Enter a size across flats greater than zero.",
    successMessage: () =>
      hexagonState.centerPointId === null
        ? "Select an existing point for the center."
        : "Enter the size across flats and an optional corner radius.",
  },
  {
    input: hexagonCornerRadiusInput,
    messageElement: hexagonToolMessage,
    invalidMessage:
      "Enter a valid arithmetic expression for the corner radius.",
    validationMessage: (value) => {
      if (value < 0) return "Enter a corner radius of zero or greater.";
      const acrossFlats = getHexagonAcrossFlatsInputValue();
      return acrossFlats !== null && value >= acrossFlats / 2
        ? "Corner radius must be less than half the size across flats."
        : null;
    },
    successMessage: () =>
      hexagonState.centerPointId === null
        ? "Select an existing point for the center."
        : "Enter the size across flats and an optional corner radius.",
  },
  {
    input: offsetAmountInput,
    messageElement: offsetToolMessage,
    invalidMessage: "Enter a valid arithmetic expression for the offset amount.",
    validationMessage: (value) =>
      value > 0 ? null : "Enter an offset amount greater than zero.",
    successMessage: () => {
      const sourceEntity = getEntityById(offsetState.sourceEntityId);
      if (sourceEntity?.type === "line") {
        return "Click the side where the parallel line should be created.";
      }
      if (sourceEntity?.type === "circle") {
        return "Click inside to shrink or outside to enlarge the circle.";
      }
      return "Enter an amount, then select a line or circle.";
    },
  },
  {
    input: filletRadiusInput,
    messageElement: filletToolMessage,
    invalidMessage: "Enter a valid arithmetic expression for the fillet radius.",
    validationMessage: (value) =>
      value > 0 ? null : "Enter a fillet radius greater than zero.",
    successMessage: () =>
      filletState.firstEntityId === null
        ? "Select the first line, circle, or arc near the intended fillet."
        : "Select the second line, circle, or arc near the intended fillet.",
  },
  {
    input: rotateAngleInput,
    messageElement: rotateToolMessage,
    invalidMessage: "Enter a valid arithmetic expression for the angle.",
    successMessage: "Enter a counterclockwise angle, then choose Rotate.",
  },
  {
    input: pointOnEntityValueInput,
    messageElement: pointOnEntityToolMessage,
    invalidMessage: "Enter a valid arithmetic expression.",
    validationMessage: (value) => {
      const sourceEntity = getEntityById(pointOnEntityState.sourceEntityId);
      return sourceEntity?.type === "line" && (value < 0 || value > 100)
        ? "Enter a percentage from 0 to 100."
        : null;
    },
    successMessage: () => {
      const sourceEntity = getEntityById(pointOnEntityState.sourceEntityId);
      return sourceEntity?.type === "line"
        ? "Enter a percentage from 0 to 100 along the line."
        : "0° = right, 90° = up, 180° = left, 270° = down.";
    },
  },
];

arithmeticInputConfigurations.forEach((configuration) => {
  configuration.input.addEventListener("input", () => {
    configuration.input.setCustomValidity("");
  });
  configuration.input.addEventListener("blur", () => {
    if (!configuration.input.value.trim()) return;
    resolveArithmeticInput(configuration.input, configuration);
    if (configuration.input === circleRadiusInput) {
      circleCreateButton.disabled =
        circleState.centerPointId === null ||
        getCircleRadiusInputValue() === null;
      renderToolPreview();
    }
    if (
      configuration.input === hexagonAcrossFlatsInput ||
      configuration.input === hexagonCornerRadiusInput
    ) {
      updateHexagonCreateState();
      renderToolPreview();
    }
  });
});

circleRadiusInput.addEventListener("input", () => {
  circleCreateButton.disabled =
    circleState.centerPointId === null || getCircleRadiusInputValue() === null;
  renderToolPreview();
});

[hexagonAcrossFlatsInput, hexagonCornerRadiusInput].forEach((input) => {
  input.addEventListener("input", () => {
    updateHexagonCreateState();
    renderToolPreview();
  });
});

pointCoordinatesMenu.addEventListener("click", activatePointCoordinates);
pointIntersectMenu.addEventListener("click", activateIntersectingPoint);
pointOnEntityMenu.addEventListener("click", activatePointOnEntity);
pointSketchMenu.addEventListener("click", activatePointSketch);
lineCoordinatesMenu.addEventListener("click", activateLineCoordinates);
lineSketchMenu.addEventListener("click", activateLineSketch);
exportDxfMenu.addEventListener("click", exportDxf);
lineJoinMenu.addEventListener("click", activateJoin);
circleCenterRadiusMenu.addEventListener("click", activateCircleCenterRadius);
circleSketchCenterMenu.addEventListener("click", activateCircleSketchCenter);
circleThreeEntitiesMenu.addEventListener("click", activateThreeEntityCircle);
hexagonMenu.addEventListener("click", activateHexagon);
offsetMenu.addEventListener("click", activateOffset);
trimExtendMenu.addEventListener("click", activateTrimExtend);
filletRadiusMenu.addEventListener("click", activateFillet);
rotateMenu.addEventListener("click", activateRotate);
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
quickUndoButton.addEventListener("click", () => {
  deactivateWindowZoom();
  undoDocumentChange();
});
quickRedoButton.addEventListener("click", () => {
  deactivateWindowZoom();
  redoDocumentChange();
});
quickZoomInButton.addEventListener("click", zoomIn);
quickZoomOutButton.addEventListener("click", zoomOut);
quickZoomWindowButton.addEventListener("click", activateWindowZoom);
quickCalculatorButton.addEventListener("click", openCalculatorWindow);

document.querySelector(".menu-bar").addEventListener(
  "click",
  (event) => {
    const commandButton = event.target.closest(".dropdown-menu button");
    if (
      windowZoomState.active &&
      commandButton &&
      commandButton !== windowZoomMenu
    ) {
      deactivateWindowZoom();
    }
  },
  { capture: true },
);
viewMenuButton.addEventListener("click", () => {
  viewMenuItem.classList.remove("is-dismissed");
});
viewMenuItem.addEventListener("pointerleave", () => {
  viewMenuItem.classList.remove("is-dismissed");
});
zoomInMenu.addEventListener("click", () => {
  dismissViewMenu();
  zoomIn();
});
zoomOutMenu.addEventListener("click", () => {
  dismissViewMenu();
  zoomOut();
});
windowZoomMenu.addEventListener("click", activateWindowZoom);
homeViewMenu.addEventListener("click", () => {
  dismissViewMenu();
  homeView();
});
layerMenuButton.addEventListener("click", () => {
  layerMenuItem.classList.remove("is-dismissed");
});
layerMenuItem.addEventListener("pointerleave", () => {
  layerMenuItem.classList.remove("is-dismissed");
});
layerCurrentMenu.addEventListener("click", selectCurrentLayer);
helpMenuButton.addEventListener("click", () => {
  helpMenuItem.classList.remove("is-dismissed");
});
helpMenuItem.addEventListener("pointerleave", () => {
  helpMenuItem.classList.remove("is-dismissed");
});
aboutMenu.addEventListener("click", openAboutWindow);
aboutCloseButton.addEventListener("click", () => {
  closeAboutWindow();
});
aboutWindowTitleBar.addEventListener("pointerdown", (event) => {
  if (event.button !== 0 || event.target.closest(".window-control")) return;
  const bounds = aboutWindow.getBoundingClientRect();
  aboutWindowState.drag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - bounds.left,
    offsetY: event.clientY - bounds.top,
  };
  aboutWindowTitleBar.classList.add("is-dragging");
  aboutWindowTitleBar.setPointerCapture(event.pointerId);
});
aboutWindowTitleBar.addEventListener("pointermove", (event) => {
  const drag = aboutWindowState.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;
  const bounds = aboutWindow.getBoundingClientRect();
  const maxLeft = Math.max(0, window.innerWidth - bounds.width);
  const maxTop = Math.max(
    0,
    window.innerHeight - aboutWindowTitleBar.offsetHeight,
  );
  aboutWindow.style.left =
    `${Math.min(maxLeft, Math.max(0, event.clientX - drag.offsetX))}px`;
  aboutWindow.style.top =
    `${Math.min(maxTop, Math.max(0, event.clientY - drag.offsetY))}px`;
  aboutWindowState.hasPosition = true;
});

function stopAboutWindowDrag(event) {
  if (aboutWindowState.drag?.pointerId !== event.pointerId) return;
  aboutWindowState.drag = null;
  aboutWindowTitleBar.classList.remove("is-dragging");
  if (aboutWindowTitleBar.hasPointerCapture(event.pointerId)) {
    aboutWindowTitleBar.releasePointerCapture(event.pointerId);
  }
}

aboutWindowTitleBar.addEventListener("pointerup", stopAboutWindowDrag);
aboutWindowTitleBar.addEventListener("pointercancel", stopAboutWindowDrag);
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

cadCanvas.addEventListener("pointerdown", (event) => {
  if (!windowZoomState.active || event.button !== 0) return;
  event.preventDefault();
  windowZoomState.drag = {
    pointerId: event.pointerId,
    startClientX: event.clientX,
    startClientY: event.clientY,
    screenBounds: null,
    worldBounds: null,
  };
  cadCanvas.setPointerCapture(event.pointerId);
  updateWindowZoomDrag(event);
});

cadCanvas.addEventListener("pointermove", (event) => {
  if (windowZoomState.active) updateWindowZoomDrag(event);
});

cadCanvas.addEventListener("pointerup", (event) => {
  if (windowZoomState.active) {
    completeWindowZoom(event);
  } else if (windowZoomState.canceledPointerId === event.pointerId) {
    windowZoomState.canceledPointerId = null;
    windowZoomState.suppressClickUntil = performance.now() + 200;
  }
});

cadCanvas.addEventListener("pointercancel", (event) => {
  if (windowZoomState.active) {
    cancelWindowZoomDrag(event);
  } else if (windowZoomState.canceledPointerId === event.pointerId) {
    windowZoomState.canceledPointerId = null;
    windowZoomState.suppressClickUntil = 0;
  }
});

cadCanvas.addEventListener("click", (event) => {
  if (performance.now() <= windowZoomState.suppressClickUntil) {
    windowZoomState.suppressClickUntil = 0;
    return;
  }
  windowZoomState.suppressClickUntil = 0;
  if (windowZoomState.active) return;

  if (rotateState.active && rotateState.awaitingPivot) {
    handleRotatePivotClick(event);
    return;
  }

  if (pointSketchState.active) {
    handlePointSketchClick(event);
    return;
  }

  if (lineSketchState.active) {
    handleLineSketchClick(event);
    return;
  }

  if (threeEntityCircleState.active) {
    handleThreeEntityCircleClick(event);
    return;
  }

  if (circleState.active) {
    handleCircleCenterClick(event);
    return;
  }

  if (hexagonState.active) {
    handleHexagonCenterClick(event);
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

  if (filletState.active) {
    handleFilletClick(event);
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

  const worldPoint = screenToWorld(event);
  const candidates = getSelectionHitCandidates(worldPoint, event.target);
  if (candidates.length) {
    const candidateIds = candidates.map(({ entity }) => entity.id);
    const previousCycle = selectionState.pickCycle;
    const repeatsPreviousPick =
      previousCycle !== null &&
      Math.hypot(
        event.clientX - previousCycle.clientX,
        event.clientY - previousCycle.clientY,
      ) <= 4 &&
      candidateIds.length === previousCycle.candidateIds.length &&
      candidateIds.every((id, index) => id === previousCycle.candidateIds[index]);
    const candidateIndex = repeatsPreviousPick
      ? (previousCycle.index + 1) % candidates.length
      : 0;
    const selectedEntity = candidates[candidateIndex].entity;
    selectionState.pickCycle = {
      clientX: event.clientX,
      clientY: event.clientY,
      candidateIds,
      index: candidateIndex,
    };
    selectionState.selectedEntityId = selectedEntity.id;
    selectionState.hoveredEntityId = null;
    renderEntities();
    commandStatus.textContent =
      `Selected ${selectedEntity.type} ${selectedEntity.id}` +
      (candidates.length > 1
        ? ` (${candidates.length} entities here; click again to cycle).`
        : ".");
    return;
  }

  selectionState.selectedEntityId = null;
  selectionState.hoveredEntityId = null;
  selectionState.pickCycle = null;
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

lineCoordinatesMinimizeButton.addEventListener("click", () => {
  if (lineCoordinatesWindow.classList.contains("is-maximized")) {
    restoreLineCoordinatesWindow();
  }
  const minimized = !lineCoordinatesWindow.classList.contains("is-minimized");
  setLineCoordinatesWindowMinimized(minimized);
});

lineCoordinatesMaximizeButton.addEventListener(
  "click",
  toggleLineCoordinatesWindowMaximized,
);

lineCoordinatesCloseButton.addEventListener("click", () => {
  closeLineCoordinatesWindow("Line - Coordinates canceled.");
});

lineCoordinatesContinueButton.addEventListener("click", () => {
  createLineFromCoordinateInputs(true);
});

lineCoordinatesCancelButton.addEventListener("click", () => {
  closeLineCoordinatesWindow("Line - Coordinates canceled.");
});

lineCoordinatesWindowTitleBar.addEventListener("pointerdown", (event) => {
  if (
    event.button !== 0 ||
    event.target.closest(".window-control") ||
    lineCoordinatesWindow.classList.contains("is-maximized")
  ) {
    return;
  }
  const bounds = lineCoordinatesWindow.getBoundingClientRect();
  lineCoordinatesWindowState.drag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - bounds.left,
    offsetY: event.clientY - bounds.top,
  };
  lineCoordinatesWindowTitleBar.classList.add("is-dragging");
  lineCoordinatesWindowTitleBar.setPointerCapture(event.pointerId);
});

lineCoordinatesWindowTitleBar.addEventListener("pointermove", (event) => {
  const drag = lineCoordinatesWindowState.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;
  const bounds = lineCoordinatesWindow.getBoundingClientRect();
  const maxLeft = Math.max(0, window.innerWidth - bounds.width);
  const maxTop = Math.max(
    0,
    window.innerHeight - lineCoordinatesWindowTitleBar.offsetHeight,
  );
  const left = Math.min(maxLeft, Math.max(0, event.clientX - drag.offsetX));
  const top = Math.min(maxTop, Math.max(0, event.clientY - drag.offsetY));
  lineCoordinatesWindow.style.left = `${left}px`;
  lineCoordinatesWindow.style.top = `${top}px`;
  lineCoordinatesWindowState.hasPosition = true;
});

function stopLineCoordinatesWindowDrag(event) {
  if (lineCoordinatesWindowState.drag?.pointerId !== event.pointerId) return;
  lineCoordinatesWindowState.drag = null;
  lineCoordinatesWindowTitleBar.classList.remove("is-dragging");
  if (lineCoordinatesWindowTitleBar.hasPointerCapture(event.pointerId)) {
    lineCoordinatesWindowTitleBar.releasePointerCapture(event.pointerId);
  }
}

lineCoordinatesWindowTitleBar.addEventListener(
  "pointerup",
  stopLineCoordinatesWindowDrag,
);
lineCoordinatesWindowTitleBar.addEventListener(
  "pointercancel",
  stopLineCoordinatesWindowDrag,
);

lineCoordinatesWindowTitleBar.addEventListener("dblclick", (event) => {
  if (!event.target.closest(".window-control")) {
    toggleLineCoordinatesWindowMaximized();
  }
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

hexagonMinimizeButton.addEventListener("click", () => {
  if (hexagonWindow.classList.contains("is-maximized")) {
    restoreHexagonWindow();
  }
  const minimized = !hexagonWindow.classList.contains("is-minimized");
  setHexagonWindowMinimized(minimized);
});

hexagonMaximizeButton.addEventListener("click", toggleHexagonWindowMaximized);

hexagonCloseButton.addEventListener("click", () => {
  closeHexagonWindow("Hexagon canceled.");
});

hexagonCancelButton.addEventListener("click", () => {
  closeHexagonWindow("Hexagon canceled.");
});

hexagonWindowTitleBar.addEventListener("pointerdown", (event) => {
  if (
    event.button !== 0 ||
    event.target.closest(".window-control") ||
    hexagonWindow.classList.contains("is-maximized")
  ) {
    return;
  }
  const bounds = hexagonWindow.getBoundingClientRect();
  hexagonWindowState.drag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - bounds.left,
    offsetY: event.clientY - bounds.top,
  };
  hexagonWindowTitleBar.classList.add("is-dragging");
  hexagonWindowTitleBar.setPointerCapture(event.pointerId);
});

hexagonWindowTitleBar.addEventListener("pointermove", (event) => {
  const drag = hexagonWindowState.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;
  const bounds = hexagonWindow.getBoundingClientRect();
  const maxLeft = Math.max(0, window.innerWidth - bounds.width);
  const maxTop = Math.max(
    0,
    window.innerHeight - hexagonWindowTitleBar.offsetHeight,
  );
  const left = Math.min(maxLeft, Math.max(0, event.clientX - drag.offsetX));
  const top = Math.min(maxTop, Math.max(0, event.clientY - drag.offsetY));
  hexagonWindow.style.left = `${left}px`;
  hexagonWindow.style.top = `${top}px`;
  hexagonWindowState.hasPosition = true;
});

function stopHexagonWindowDrag(event) {
  if (hexagonWindowState.drag?.pointerId !== event.pointerId) return;
  hexagonWindowState.drag = null;
  hexagonWindowTitleBar.classList.remove("is-dragging");
  if (hexagonWindowTitleBar.hasPointerCapture(event.pointerId)) {
    hexagonWindowTitleBar.releasePointerCapture(event.pointerId);
  }
}

hexagonWindowTitleBar.addEventListener("pointerup", stopHexagonWindowDrag);
hexagonWindowTitleBar.addEventListener("pointercancel", stopHexagonWindowDrag);

hexagonWindowTitleBar.addEventListener("dblclick", (event) => {
  if (!event.target.closest(".window-control")) {
    toggleHexagonWindowMaximized();
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

filletMinimizeButton.addEventListener("click", () => {
  if (filletWindow.classList.contains("is-maximized")) {
    restoreFilletWindow();
  }
  const minimized = !filletWindow.classList.contains("is-minimized");
  setFilletWindowMinimized(minimized);
});

filletMaximizeButton.addEventListener("click", toggleFilletWindowMaximized);

filletCloseButton.addEventListener("click", () => {
  deactivateFillet("Fillet Radius canceled.");
});

filletCancelButton.addEventListener("click", () => {
  deactivateFillet("Fillet Radius canceled.");
});

filletWindowTitleBar.addEventListener("pointerdown", (event) => {
  if (
    event.button !== 0 ||
    event.target.closest(".window-control") ||
    filletWindow.classList.contains("is-maximized")
  ) {
    return;
  }
  const bounds = filletWindow.getBoundingClientRect();
  filletWindowState.drag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - bounds.left,
    offsetY: event.clientY - bounds.top,
  };
  filletWindowTitleBar.classList.add("is-dragging");
  filletWindowTitleBar.setPointerCapture(event.pointerId);
});

filletWindowTitleBar.addEventListener("pointermove", (event) => {
  const drag = filletWindowState.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;
  const bounds = filletWindow.getBoundingClientRect();
  const maxLeft = Math.max(0, window.innerWidth - bounds.width);
  const maxTop = Math.max(
    0,
    window.innerHeight - filletWindowTitleBar.offsetHeight,
  );
  const left = Math.min(maxLeft, Math.max(0, event.clientX - drag.offsetX));
  const top = Math.min(maxTop, Math.max(0, event.clientY - drag.offsetY));
  filletWindow.style.left = `${left}px`;
  filletWindow.style.top = `${top}px`;
  filletWindowState.hasPosition = true;
});

function stopFilletWindowDrag(event) {
  if (filletWindowState.drag?.pointerId !== event.pointerId) return;
  filletWindowState.drag = null;
  filletWindowTitleBar.classList.remove("is-dragging");
  if (filletWindowTitleBar.hasPointerCapture(event.pointerId)) {
    filletWindowTitleBar.releasePointerCapture(event.pointerId);
  }
}

filletWindowTitleBar.addEventListener("pointerup", stopFilletWindowDrag);
filletWindowTitleBar.addEventListener("pointercancel", stopFilletWindowDrag);

filletWindowTitleBar.addEventListener("dblclick", (event) => {
  if (!event.target.closest(".window-control")) {
    toggleFilletWindowMaximized();
  }
});

rotatePivotOriginInput.addEventListener("change", () => {
  if (rotatePivotOriginInput.checked) useRotateOrigin();
});

rotatePivotPointInput.addEventListener("change", () => {
  if (rotatePivotPointInput.checked) beginRotatePivotSelection();
});

rotateChoosePointButton.addEventListener("click", beginRotatePivotSelection);

rotateMinimizeButton.addEventListener("click", () => {
  if (rotateWindow.classList.contains("is-maximized")) {
    restoreRotateWindow();
  }
  const minimized = !rotateWindow.classList.contains("is-minimized");
  setRotateWindowMinimized(minimized);
});

rotateMaximizeButton.addEventListener("click", toggleRotateWindowMaximized);

rotateCloseButton.addEventListener("click", () => {
  deactivateRotate("Rotate canceled.");
});

rotateCancelButton.addEventListener("click", () => {
  deactivateRotate("Rotate canceled.");
});

rotateWindowTitleBar.addEventListener("pointerdown", (event) => {
  if (
    event.button !== 0 ||
    event.target.closest(".window-control") ||
    rotateWindow.classList.contains("is-maximized")
  ) {
    return;
  }
  const bounds = rotateWindow.getBoundingClientRect();
  rotateWindowState.drag = {
    pointerId: event.pointerId,
    offsetX: event.clientX - bounds.left,
    offsetY: event.clientY - bounds.top,
  };
  rotateWindowTitleBar.classList.add("is-dragging");
  rotateWindowTitleBar.setPointerCapture(event.pointerId);
});

rotateWindowTitleBar.addEventListener("pointermove", (event) => {
  const drag = rotateWindowState.drag;
  if (!drag || drag.pointerId !== event.pointerId) return;
  const bounds = rotateWindow.getBoundingClientRect();
  const maxLeft = Math.max(0, window.innerWidth - bounds.width);
  const maxTop = Math.max(
    0,
    window.innerHeight - rotateWindowTitleBar.offsetHeight,
  );
  const left = Math.min(maxLeft, Math.max(0, event.clientX - drag.offsetX));
  const top = Math.min(maxTop, Math.max(0, event.clientY - drag.offsetY));
  rotateWindow.style.left = `${left}px`;
  rotateWindow.style.top = `${top}px`;
  rotateWindowState.hasPosition = true;
});

function stopRotateWindowDrag(event) {
  if (rotateWindowState.drag?.pointerId !== event.pointerId) return;
  rotateWindowState.drag = null;
  rotateWindowTitleBar.classList.remove("is-dragging");
  if (rotateWindowTitleBar.hasPointerCapture(event.pointerId)) {
    rotateWindowTitleBar.releasePointerCapture(event.pointerId);
  }
}

rotateWindowTitleBar.addEventListener("pointerup", stopRotateWindowDrag);
rotateWindowTitleBar.addEventListener("pointercancel", stopRotateWindowDrag);

rotateWindowTitleBar.addEventListener("dblclick", (event) => {
  if (!event.target.closest(".window-control")) {
    toggleRotateWindowMaximized();
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
  if (event.target.closest(".calc-window")) return;

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

  if (event.key === "Escape" && !aboutWindow.hidden) {
    event.preventDefault();
    closeAboutWindow();
    return;
  }

  if (event.key === "Escape" && windowZoomState.active) {
    event.preventDefault();
    deactivateWindowZoom("View - Window canceled.");
    return;
  }

  if (event.key === "Escape" && pointSketchState.active) {
    deactivatePointSketch("Point - Sketch canceled.");
    return;
  }

  if (event.key === "Escape" && lineSketchState.active) {
    deactivateLineSketch("Line - Sketch canceled.");
    return;
  }

  if (event.key === "Escape" && threeEntityCircleState.active) {
    deactivateThreeEntityCircle("Circle - 3 Entities canceled.");
    return;
  }

  if (event.key === "Escape" && !pointCoordinatesWindow.hidden) {
    closePointCoordinatesWindow();
    return;
  }

  if (event.key === "Escape" && !lineCoordinatesWindow.hidden) {
    closeLineCoordinatesWindow("Line - Coordinates canceled.");
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

  if (event.key === "Escape" && !hexagonWindow.hidden) {
    closeHexagonWindow("Hexagon canceled.");
    return;
  }

  if (event.key === "Escape" && !offsetWindow.hidden) {
    closeOffsetWindow("Offset canceled.");
    return;
  }

  if (event.key === "Escape" && filletState.active) {
    deactivateFillet("Fillet Radius canceled.");
    return;
  }

  if (event.key === "Escape" && rotateState.active) {
    deactivateRotate("Rotate canceled.");
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
  keepToolWindowInViewport(
    lineCoordinatesWindow,
    lineCoordinatesWindowTitleBar,
  );
  keepToolWindowInViewport(circleRadiusWindow, circleWindowTitleBar);
  keepToolWindowInViewport(hexagonWindow, hexagonWindowTitleBar);
  keepToolWindowInViewport(offsetWindow, offsetWindowTitleBar);
  keepToolWindowInViewport(filletWindow, filletWindowTitleBar);
  keepToolWindowInViewport(rotateWindow, rotateWindowTitleBar);
  keepToolWindowInViewport(
    pointOnEntityWindow,
    pointOnEntityWindowTitleBar,
  );
  keepToolWindowInViewport(aboutWindow, aboutWindowTitleBar);
});

cadCanvas.addEventListener("mousemove", (event) => {
  const worldPoint = screenToWorld(event);
  cursorX.textContent = `X: ${formatCoordinate(worldPoint.x)}`;
  cursorY.textContent = `Y: ${formatCoordinate(worldPoint.y)}`;
  if (windowZoomState.active) {
    setSelectionProximityHover(null);
    clearEntityHoverInfo();
  } else if (selectionState.mode === "single") {
    const hoveredEntity = getSelectionHitCandidates(worldPoint, event.target)[0]
      ?.entity;
    const hoveredEntityId = hoveredEntity?.id ?? null;
    setSelectionProximityHover(hoveredEntityId);
    updateEntityHoverInfoById(hoveredEntityId);
  } else {
    setSelectionProximityHover(null);
    updateEntityHoverInfo(event.target);
  }

  if (joinState.active && joinState.firstPointId !== null) {
    const hoveredPointElement = event.target.closest(".point-entity");
    const hoveredPoint = hoveredPointElement
      ? getPointById(Number(hoveredPointElement.dataset.entityId))
      : null;
    joinState.previewWorld = hoveredPoint ?? worldPoint;
    renderToolPreview();
  }

  if (lineSketchState.active && lineSketchState.startPointId !== null) {
    lineSketchState.previewWorld = worldPoint;
    renderToolPreview();
  }
});

cadCanvas.addEventListener("mouseleave", () => {
  cursorX.textContent = "X: ----";
  cursorY.textContent = "Y: ----";
  clearEntityHoverInfo();
  setSelectionProximityHover(null);

  if (joinState.active && joinState.firstPointId !== null) {
    joinState.previewWorld = null;
    renderToolPreview();
  }

  if (lineSketchState.active && lineSketchState.startPointId !== null) {
    lineSketchState.previewWorld = null;
    renderToolPreview();
  }
});

applyApplicationIdentity();
fitViewToCanvas();

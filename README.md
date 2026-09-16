# GravyCAD

**You draw. It solves.**

GravyCAD is a portable 2D drawing and shop-math utility for machinists, inspectors, hobbyists, and anyone who needs quick geometry without CAM bloat.

It is meant to be simple, useful, and portable.

No toolpath generation.  
No G-code.  
No machine setup.  
No subscriptions.  
No bullshit.

Draw simple 2D geometry, solve the annoying math, and eventually export DXF.

---

## V0.0.0 Alpha Dev Build

Bare Bones

The first visible build exists.

### Current status

- HTML/CSS/JavaScript project structure is in place
- Runs through Live Server in VS Code
- 16:9 SVG drawing canvas is visible
- Drawing surface uses **Surface Plate Gray**: `#a3a0a0`
- X and Y axes render through origin
- Half-inch and full-inch tick marks render along the axes
- Tick and axis lines are intentionally thick for early development visibility

### Current scope

GravyCAD is currently only a layout shell and drawing surface.

It does not draw entities yet.  
It does not save files yet.  
It does not export DXF yet.  
It does not solve shop math yet.

The surface plate exists.

---

## Planned tools

### Drawing

- Line
- Circle
- Arc
- Point
- Basic selection/editing
- Snap points
- Save/load native project files
- Export DXF

### Shop math

- Tangent Finder
- Bolt Circle Solver
- Drill Point Calculator
- True Position Checker
- Angle/length endpoint solver
- Triangle helper

---

## What GravyCAD is

GravyCAD is:

- Easy 2D drawing
- Useful geometry
- Shop-floor trig
- Coordinate solving
- DXF export, eventually
- Portable by design

## What GravyCAD is not

GravyCAD is not CAM.

It will not generate toolpaths.  
It will not output G-code.  
It will not post-process for machines.  
It will not pretend to run your mill.

---

## Portability goal

Here. Have it.

No install. No cloud account. No subscription. No nonsense.

Run it from a folder, a jump drive, or wherever it does you good.

May it do ya fine.

## V0.0.2 Alpha Dev Build

Surface Plate and Menu Bones

Changes made since V0.0.1:

- Added a top menu bar with dropdowns for:
  - File
  - Edit
  - Draw
  - Dimension

- Commented out the older sidebar command buttons now represented in the menu bar.
  - Sidebar space is being reserved for future tool settings, entity info, and solver/results panels.

- Confirmed GravyCAD’s coordinate law:
  - X0 Y0 is where the axes cross.
  - X+ moves right.
  - Y+ moves up.
  - X+ Y+ is the upper-right quadrant.
  - Browser/SVG coordinate weirdness must be handled internally.

- Began accounting for SVG’s native downward-positive Y behavior.
  - GravyCAD’s user-facing coordinate system will follow machinist/CAD convention instead.

- Set the working UI font to Arial/Helvetica/sans-serif for maximum portability.
  - No external font download required.

- Confirmed the current drawing surface direction:
  - 16:9 canvas
  - Surface Plate Gray: `#a3a0a0`
  - X/Y axes through origin
  - Half-inch and full-inch tick marks
  - Thick temporary axis/tick lines for dev visibility

- Clarified early code cleanup habits:
  - `TEMP` for temporary build/test code
  - `SCRAP` for possibly reusable offcuts
  - `NFG` for obsolete code headed to the scrap barrel

Notes:

GravyCAD is still not drawing user-created geometry yet. This build is about application structure, visual layout, coordinate rules, and keeping the project’s machinist-first direction nailed down.

## V0.0.3 Alpha Dev Build

First Geometry: Point by Coordinates

Changes made since V0.0.2:

- Added the first real geometry entity: Point.
- Added a Point - Coordinates tool panel with separate X and Y inputs.
- The coordinate fields start at X0 Y0 so a new drawing can begin at origin.
- Pressing Enter or selecting Create Point adds the point to the drawing model.
- Added an in-memory document model as the foundation for future entities.
- Added point rendering on the SVG entity layer.
- Added live cursor coordinates in GravyCAD's X-right, Y-up coordinate system.
- Added a live entity count and active-command display to the status bar.
- Added Point - Sketch to the Draw menu as a disabled placeholder for later work.

Current limitation:

- Points exist only in memory and are lost when the page reloads.
- Selection, editing, undo/redo, snapping, and file saving are not implemented yet.

## V0.0.4 Alpha Dev Build

Point Coordinate Dialog

Changes made since V0.0.3:

- Replaced the permanent Point tool sidebar with a modal coordinate dialog.
- The dialog opens only from Draw > Point - Coordinates.
- Create adds one point and closes the dialog.
- Continue adds one point and keeps the dialog open for additional points.
- Cancel closes the dialog without creating a point.
- X0 Y0 remains the default coordinate pair on first use.

## V0.0.5 Alpha Dev Build

Floating Point Coordinate Window

Changes made since V0.0.4:

- Changed Point Coordinates from a modal dialog to a non-modal floating tool window.
- The drawing remains visible and interactive while the coordinate window is open.
- Added a draggable Windows-style title bar.
- Added Minimize, Maximize/Restore, and Close controls.
- Double-clicking the title bar also maximizes or restores the window.
- The window remembers its last normal position while it remains open.

## V0.0.6 Alpha Dev Build

Full Workspace Drawing Surface

Changes made since V0.0.5:

- Expanded the gray CAD drawing surface to fill 100% of the workspace below the menu bar and above the status bar.
- Removed the black padding and border around the drawing surface.
- Added automatic view-box fitting when the browser is resized.
- The visible coordinate range expands to fit the available aspect ratio without stretching or distorting geometry.

## V0.0.7 Alpha Dev Build

Point Marker Refinement

Changes made since V0.0.6:

- Replaced the yellow circle-and-crosshair point marker with a simple diagonal X.
- Set the point color to `#010b13`.
- Set each X diagonal to 0.15 drawing units, matching the diameter of the previous 0.075-radius yellow circle.

## V0.0.8 Alpha Dev Build

View Controls

Changes made since V0.0.7:

- Added a View dropdown menu.
- Added Zoom In and Zoom Out commands in 20% increments.
- Added Home to restore the current full-workspace view at 100%.
- Added the current zoom percentage to the status bar.
- Zooming remains centered on X0 Y0 and preserves equal X/Y drawing scale.

## V0.0.9 Alpha Dev Build

Constant-Size Point Markers

Changes made since V0.0.8:

- Point locations respond normally to changes in view scale.
- Point X markers compensate for the current zoom level so they retain the same visible size while zooming in or out.
- Point stroke thickness remains constant through SVG non-scaling strokes.

## V0.0.10 Alpha Dev Build

Single-Entity Selection

Changes made since V0.0.9:

- Added a Select dropdown menu with a Single command.
- Single selection mode allows one entity to be selected at a time.
- Hovering over a selectable entity changes it to `#000075`.
- Clicking an entity selects it and changes it to `#0000FF`.
- Clicking empty drawing space clears the current selection.
- Added a larger invisible hit target around points to make selection practical without changing the visible marker size.

## V0.0.11 Alpha Dev Build

Theme Menu Foundation

Changes made since V0.0.10:

- Named the existing GravyCAD appearance Granite.
- Added a Theme dropdown menu with Granite marked as the current theme.
- Added disabled placeholders for the planned Light, Dark, and Matrix themes.
- Theme switching and the additional color systems will be implemented in a later pass.

## V0.0.12 Alpha Dev Build

Matrix Theme

Changes made since V0.0.11:

- Enabled Matrix in the Theme dropdown while keeping Granite available as the default.
- Set the Matrix drawing background to `#050B06`.
- Set normal Matrix entities to `#00FF41`.
- Set hovered Matrix entities to `#85FF9E`.
- Set selected Matrix entities to `#00E5FF`.
- Set Matrix axes, tick marks, and future grid lines to `#0C1A0E`.
- Theme changes apply immediately to existing geometry and selection states.
- Light and Dark remain disabled placeholders for later passes.

## V0.0.13 Alpha Dev Build

Matrix Axis Contrast

Changes made since V0.0.12:

- Changed Matrix axes and tick marks from `#0C1A0E` to white (`#FFFFFF`).
- Added a faint layered `#00FF41` glow to Matrix axes and tick marks.
- Gave the Matrix axes a `0.75px` visible white core while preserving Granite's original line weight.
- Kept future Matrix grid lines at the original subtle `#0C1A0E`.
- Granite axes remain unchanged.

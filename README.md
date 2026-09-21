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

## V0.0.14 Alpha Dev Build

Theme Menu Dismissal

Changes made since V0.0.13:

- The Theme dropdown now closes immediately after choosing Granite or Matrix.
- The Theme button can reopen the dropdown normally after a selection.
- Moving away from the Theme menu resets its temporary dismissed state.

## V0.0.15 Alpha Dev Build

Light and Dark Themes

Changes made since V0.0.14:

- Enabled Light and Dark in the Theme dropdown with the same selection checkmark and auto-close behavior as Granite and Matrix.
- Light uses a `#FFFFFF` background, `#6B7280` axes, `#111827` entities, `#DC2626` hover, and `#2563EB` selection.
- Dark uses a `#1E2022` background, `#9CA3AF` axes, `#F9FAFB` entities, `#F87171` hover, and `#60A5FA` selection.
- Light and Dark axes use the visible `0.75px` line weight without a glow.
- Until dedicated grid colors are chosen, Light and Dark grid lines inherit their respective axis colors.

## V0.0.16 Alpha Dev Build

Line - Join

Changes made since V0.0.15:

- Added Draw > Line - Join for creating an exact line between two existing points.
- Added line entities to the geometry document model using references to their two endpoint point IDs.
- Lines are rendered independently from their stored geometry data and inherit the active theme's entity color.
- The Join command prompts for a first point and then a different second point.
- After the first point is chosen, a dashed live preview follows the cursor and snaps exactly onto a hovered point.
- The first endpoint is highlighted with the active theme's selection color while the command is in progress.
- Join prevents duplicate lines between the same two points.
- Escape cancels an active Join command.
- Join exits after creating one line and reports the new line in the status bar.
- Joined lines participate in Select > Single, including the active theme's hover and selection colors.

## V0.0.17 Alpha Dev Build

Delete, Undo, and Redo

Changes made since V0.0.16:

- Enabled Edit > Delete for the entity selected by Select > Single.
- Deleting a point also removes any lines joined to that point so the document never contains broken endpoint references.
- A single Undo restores a deleted point together with all of its joined lines.
- Enabled Edit > Undo and Edit > Redo with a 100-change in-memory history.
- Point creation, joined-line creation, and deletion are recorded as undoable document changes.
- Starting a new document change after Undo clears the redo history.
- Added Delete, Ctrl+Z, Ctrl+Y, and Ctrl+Shift+Z keyboard controls without intercepting normal editing inside coordinate fields.
- Edit commands enable and disable automatically based on selection and history availability.

## V0.0.18 Alpha Dev Build

Circle - Point Center & Radius

Changes made since V0.0.17:

- Added Draw > Circle - Point Center & Radius.
- The command uses an existing point entity as the exact circle center and a typed positive radius.
- Added a movable, minimizable, maximizable, and closable Circle tool window matching the Point Coordinates window behavior.
- The selected center point is highlighted and identified by point ID and exact coordinates in the tool window.
- Added a dashed, theme-aware live circle preview that updates as the radius is typed.
- Added circle entities to the geometry document model using a center point ID and numeric radius.
- Created circles inherit the active theme's entity, hover, and selection colors.
- Circles participate in Select > Single, Delete, Undo, and Redo.
- Deleting a center point also removes its dependent circles; one Undo restores the point and circles together.
- Escape, Cancel, and the window close button cancel the active Circle command.

## V0.0.19 Alpha Dev Build

Point - Intersecting

Changes made since V0.0.18:

- Added Draw > Point - Intersecting.
- The command selects two line or circle entities in sequence and creates one exact point at their intersection.
- Supports line-line, line-circle, and circle-circle intersections using finite line segments.
- The first entity remains highlighted while the command waits for the second entity.
- When two intersections are possible, the intersection nearest the second selection click is created.
- Parallel, separated, degenerate, overlapping, and coincident geometry is handled without creating an invalid point.
- An existing point at the chosen intersection is reused instead of creating a duplicate.
- Intersecting points are ordinary point entities and participate in selection, deletion, Undo, Redo, Join, and Circle commands.
- Escape cancels the active Intersecting Point command.

## V0.0.20 Alpha Dev Build

Continuous Geometry Commands

Changes made since V0.0.19:

- Line - Join remains active after a line is created and resets to selecting the first point for the next line.
- Point - Intersecting remains active after a point is created and resets to selecting the first line or circle for the next point.
- Circle - Point Center & Radius keeps its tool window open after creation and resets to selecting the next center point.
- The Circle command preserves the last entered radius to make repeated same-size circles fast.
- Duplicate Line and existing Intersecting Point results reset their commands for the next entity without ending the active method.
- Choosing another drawing or selection command cleanly ends the previous command and removes its temporary highlights or previews.
- Escape and the Circle window's Cancel or close controls still provide an explicit way to end the active command.

## V0.0.21 Alpha Dev Build

Modify Menu

Changes made since V0.0.20:

- Added a Modify dropdown to the main menu bar.
- Added Trim/Extend and Offset entries as the first Modify commands.
- These entries establish the menu structure for their geometry behavior in upcoming builds.

## V0.0.22 Alpha Dev Build

Offset

Changes made since V0.0.21:

- Implemented Modify > Offset for finite lines and circles; point entities cannot be selected as offset sources.
- Added a movable, minimizable, maximizable, and closable Offset tool window with a default amount of 0.25.
- Offset uses a two-click workflow: select the source entity, then click the desired side.
- Line offsets create a parallel line of equal length plus two visible endpoint points.
- A line and its generated endpoint points are recorded as one undoable document change.
- Circle offsets reuse the source circle's center point; clicking outside enlarges the radius and clicking inside reduces it.
- Inward circle offsets that would produce a zero or negative radius are rejected.
- Offset remains active after each successful creation and preserves the last entered amount for repeated work.
- Source entities use the active theme's selected color while waiting for the side click.
- Choosing another drawing, selection, or Modify command ends Offset; Escape, Cancel, and Close also end it explicitly.

## V0.0.23 Alpha Dev Build

Stable Status Bar and Entity Hover Information

Changes made since V0.0.22:

- Fixed the status bar to a single-line height so long command messages no longer move the drawing surface up and down.
- Long command messages are clipped with an ellipsis instead of wrapping.
- The bottom-right information slot temporarily shows a hovered entity's description and restores the current command message when the pointer leaves.
- Point descriptions show the point ID and exact X/Y coordinates.
- Line descriptions show the line ID and calculated length.
- Circle descriptions show the circle ID, center X/Y coordinates, and radius.
- Line and circle hit targets now support information hover even when Select or another geometry command is not active.

## V0.0.24 Alpha Dev Build

Trim/Extend

Changes made since V0.0.23:

- Implemented Modify > Trim/Extend for line source entities.
- The first click selects the source line; the end of the line nearest that click is the endpoint that will move.
- The second click selects the point, line, or circle to trim or extend to.
- Existing collinear point targets are reused as the line endpoint.
- A point target that is not on the source line reports: `Target point is not on the selected line.`
- Line targets use the apparent intersection of the two lines, and circle targets use the nearest valid intersection in the chosen endpoint direction.
- Computed intersections reuse an existing point at that location or create one visible endpoint point when needed.
- Each successful Trim/Extend operation is one undoable document change.
- Trim/Extend remains active after a successful operation so another source line can be selected immediately.
- Invalid targets leave the source line highlighted so a different target can be chosen.
- Escape or choosing another drawing, selection, or Modify command ends Trim/Extend.

Current limitation:

- At this build, a full circle could not yet be the source entity because the Arc entity model had not been added. This limitation is removed in V0.0.26.

## V0.0.25 Alpha Dev Build

Trim/Extend Direction and Source Selection Fix

Changes made since V0.0.24:

- Selecting a source line near one endpoint now keeps that endpoint fixed and moves the opposite endpoint to the target.
- For example, selecting an X0 Y0 to X2 Y2 line near X0 Y0 and trimming to X1 Y1 now produces the intended X0 Y0 to X1 Y1 line.
- Point hit targets are disabled while Trim/Extend is waiting for its first selection, so endpoint points no longer block selection of the line beneath them.
- Point hit targets are automatically restored after the source line is selected, allowing a point to be chosen as the second, target entity.
- Trim/Extend prompts now describe the first click as selecting the endpoint to keep.

## V0.0.26 Alpha Dev Build

Arc Entity and Circle Trimming

Changes made since V0.0.25:

- Added the first native Arc entity to the geometry document model.
- Modify > Trim/Extend can now use a full circle as its first, source entity.
- The location of the first click on the circle identifies the portion of the circle to keep.
- Selecting an intersecting line or circle as the second entity converts the source circle into an arc between the two intersections.
- Arc endpoints are ordinary point entities and reuse existing points when exact intersection points already exist.
- The circle-to-arc conversion and any generated endpoint points are recorded as one undoable document change.
- Arcs render with the active theme colors and participate in hover information, Select > Single, and Delete.
- Deleting an arc endpoint or center point also removes the dependent arc, preventing broken geometry references.
- A point or tangent target is rejected because trimming a full circle into a finite arc requires two distinct cut points.
- The Draw > Arc entry is disabled for now; additional standalone arc construction methods will be added later.

## V0.0.27 Alpha Dev Build

Point on Entity

Changes made since V0.0.26:

- Added Draw > Point - On Entity for creating exact points on lines, circles, and arcs.
- Added a movable, minimizable, maximizable, and closable Point on Entity tool window.
- Lines use a typed percentage from 0% to 100%.
- The line endpoint nearest the first click becomes the 0% endpoint; the opposite endpoint is 100%.
- A directionally ambiguous line click reports: `Point on Entity: Direction ambiguous; select the 0% endpoint.`
- During an ambiguous line choice, both existing endpoint points are highlighted as selected until the 0% endpoint is chosen.
- The direction-choice model also supports temporary endpoint markers that disappear after selection when persistent endpoint points are unavailable.
- Circles and arcs use typed degrees with 0° at 3 o'clock, 90° at 12 o'clock, 180° at 9 o'clock, and 270° at 6 o'clock.
- Arc degree placement uses the arc's underlying full circle, so a point can be created at an angle outside the visible arc without extending or modifying the arc.
- Existing points at the calculated location are reused instead of duplicated.
- Point on Entity remains active after creation and resets to selecting the next entity.

## V0.0.28 Alpha Dev Build

DXF Export

Changes made since V0.0.27:

- Implemented File > Export DXF as a direct browser download named `GravyCAD.dxf`.
- Exports the geometry document model rather than SVG screen coordinates, so zoom and display orientation do not affect the result.
- Uses the broadly compatible ASCII DXF R12 format (`AC1009`).
- Exports GravyCAD points as DXF `POINT` entities on a `POINTS` layer.
- Exports lines, circles, and arcs on a `GEOMETRY` layer.
- Arc start and end angles retain GravyCAD's counterclockwise CAD orientation.
- Includes drawing extents and marks the drawing as English measurement; coordinate values are intended as inches.
- Reports the number of exported entities in the status bar.
- An empty drawing reports that there are no entities to export instead of downloading an empty file.

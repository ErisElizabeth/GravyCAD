# PrometheusCAD

**You draw. It solves.**

**Current version: V0.1.1 Alpha Dev Build**

PrometheusCAD is a portable 2D drawing and shop-math utility for machinists, inspectors, hobbyists, and anyone who needs quick geometry without CAM bloat.

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

## What PrometheusCAD is

PrometheusCAD is:

- Easy 2D drawing
- Useful geometry
- Shop-floor trig
- Coordinate solving
- DXF export, eventually
- Portable by design

## What PrometheusCAD is not

PrometheusCAD is not CAM.

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

## V0.0.29 Alpha Dev Build

Arithmetic in Dialog Fields

Changes made since V0.0.28:

- Numeric dialog fields now accept arithmetic expressions using `+`, `-`, `*`, `/`, parentheses, decimals, and unary positive or negative signs.
- Moving to another field with Tab or clicking elsewhere evaluates the expression and replaces it with the numeric result; for example, `3/2` becomes `1.5`.
- Arithmetic works in Point - Coordinates X/Y, circle radius, offset amount, and Point on Entity percentage/degrees.
- Pressing Create also evaluates an expression if the field has not yet lost focus.
- Radius and offset expressions must resolve to values greater than zero, and line percentages must still resolve between 0 and 100.
- Invalid expressions and division by zero are rejected with a dialog message.
- Expressions are parsed by GravyCAD's arithmetic parser without executing JavaScript code.

## V0.0.30 Alpha Dev Build

Fillet Radius

Changes made since V0.0.29:

- Added Modify > Fillet Radius for lines, circles, and arcs.
- Added a movable, minimizable, maximizable, and closable Fillet Radius tool window.
- The radius field supports the same arithmetic expressions as the other numeric dialogs and defaults to `0.25`.
- Added an Automatic Trim/Extend checkbox that is checked by default whenever the command is opened.
- The first and second click locations identify the intended portions of the two entities and guide selection among possible tangent fillet solutions.
- The tangent solver supports line-line, line-circle, line-arc, circle-circle, circle-arc, and arc-arc combinations using the entities' exact CAD geometry.
- Fillets are created as native Arc entities with ordinary center and tangent endpoint points.
- With Automatic Trim/Extend checked, the nearby endpoint of each selected line or arc moves to its tangent point.
- Full circles remain intact because a single tangent point does not by itself define which portion of a closed circle should be removed.
- With Automatic Trim/Extend unchecked, both source entities remain unchanged and the fillet must fit on their existing finite spans.
- Each completed fillet, including generated points and endpoint changes, is recorded as one undoable document change.
- Fillet Radius remains active after creation so another pair of entities can be selected immediately.

## V0.0.31 Alpha Dev Build

Rotate

Changes made since V0.0.30:

- Added Modify > Rotate for the entity currently chosen with Select > Single.
- Added a movable, minimizable, maximizable, and closable Rotate tool window.
- The angle is entered in counterclockwise degrees and accepts the same arithmetic expressions as the other numeric dialogs.
- Rotation defaults to the CAD origin at X0 Y0.
- A Specified point option lets the user choose any existing point entity as the rotation pivot.
- Rotating a point moves that point directly, so geometry that depends on it follows naturally.
- Rotating a line, circle, or arc gives only that selected entity rotated reference points, avoiding unintended movement of other geometry that shared its original points.
- Circle and arc radii remain unchanged; arc center and endpoint references rotate together.
- Exact quarter-turn rotations suppress floating-point noise near zero.
- Each completed rotation is recorded as one undoable document change.
- The selected entity remains highlighted, and the Rotate window stays open for repeated rotations of that entity.

## V0.0.32 Alpha Dev Build

Hexagon

Changes made since V0.0.31:

- Added Draw > Hexagon for creating regular six-sided geometry around an existing center point.
- Hexagons are oriented with their left and right flats parallel to the Y axis, producing points at the top and bottom.
- Hexagon size is entered as the exact distance across the vertical flats.
- Added an optional corner-radius field that defaults to `0` for sharp corners.
- A positive corner radius produces six tangent line segments and six native arc entities.
- Corner radii must be zero or greater and less than half the across-flats size.
- Both dimension fields accept GravyCAD arithmetic expressions and show a live dashed preview after the center point is selected.
- Added a movable, minimizable, maximizable, and closable Hexagon tool window.
- The generated points, lines, and optional arcs are recorded as one undoable document change.
- Hexagon remains active after creation and preserves the entered dimensions for repeated placement.
- Generated lines and arcs are ordinary GravyCAD geometry and are included automatically in DXF export.

## V0.0.33 Alpha Dev Build

Independent Hexagon Arc Selection

Changes made since V0.0.32:

- Hexagon vertices, tangent locations, and arc centers are now internal construction references rather than visible Point entities.
- Internal construction references are not selectable, included in the visible entity count, or exported as DXF `POINT` records.
- Each rounded hexagon corner remains an individual native Arc entity and each flat remains an individual Line entity.
- Select > Single now resolves clicks by distance to the actual CAD geometry instead of accepting whichever invisible SVG hit target is visually on top.
- Clicking the body of a short rounded corner selects the arc even when its old endpoint hit areas would have covered the entire curve.
- Hover highlighting and the bottom entity description use the same nearest-geometry result as selection.
- When multiple entities occupy the same exact location, repeated clicks at that location cycle through the available entities.
- Rotating a selected hexagon arc creates new internal center and endpoint references for that arc only; its neighboring flats and corner arcs remain unchanged.
- Unused internal construction points are removed automatically after rotation or deletion.

## V0.0.34 Alpha Dev Build

Points Flyout Menu

Changes made since V0.0.33:

- Reorganized the Draw dropdown so all point-construction methods are grouped under a single Points entry.
- Points opens a right-side flyout menu containing Coordinates, Intersecting, On Entity, and Sketch.
- The flyout opens when Points is hovered and closes when the pointer leaves both the Points entry and its flyout.
- Keyboard focus also keeps the flyout available for accessibility.
- Coordinates, Intersecting, and On Entity retain their existing commands and behavior.
- Sketch remains disabled as a placeholder for the next implementation pass.

## V0.0.35 Alpha Dev Build

Point - Sketch

Changes made since V0.0.34:

- Enabled Draw > Points > Sketch.
- Activating Sketch changes the drawing pointer to a plain crosshair.
- Clicking the drawing creates an exact Point entity at the CAD/world coordinate beneath the center of the crosshair.
- Sketch remains active after every point so multiple points can be placed continuously.
- Each sketched point is recorded as its own undoable document change.
- Undo and Redo preserve the active Sketch mode and its crosshair cursor.
- Clicking the exact location of an existing explicit point does not create a duplicate.
- Choosing another drawing, selection, or Modify command ends Sketch mode automatically.
- Escape explicitly cancels Sketch mode.

## V0.0.36 Alpha Dev Build

Line Flyout Menu

Changes made since V0.0.35:

- Reorganized the Draw dropdown so line-construction methods are grouped under a single Line entry.
- Line opens a right-side flyout containing Coordinates, Join, and Sketch.
- Join retains the existing continuous Line - Join command and behavior.
- Coordinates and Sketch are disabled placeholders for their upcoming implementation passes.
- The Line flyout uses the same hover, pointer-leave, and keyboard-focus behavior as the Points flyout.

## V0.0.37 Alpha Dev Build

Line - Coordinates

Changes made since V0.0.36:

- Enabled Draw > Line > Coordinates.
- Added a movable, minimizable, maximizable, and closable Line Coordinates tool window.
- The dialog provides Start X/Y and End X/Y coordinate fields.
- All four coordinate fields support GravyCAD arithmetic expressions and evaluate when focus leaves the field or a creation button is used.
- Create makes one exact line and closes the dialog.
- Continue makes one exact line and leaves the dialog open for additional coordinate lines.
- Cancel, Close, and Escape close the window without creating another line.
- Existing explicit points at the typed endpoints are reused; missing endpoints are created as ordinary visible Point entities.
- A coordinate line and any newly created endpoint points are recorded as one undoable document change.
- Zero-length lines and duplicate lines at the same coordinates are rejected.
- Choosing another drawing, selection, or Modify command closes the Line Coordinates window.

## V0.0.38 Alpha Dev Build

Independent Line Geometry

Changes made since V0.0.37:

- Lines now own hidden internal endpoint geometry instead of depending on visible Point entities.
- Deleting a visible point at a line endpoint leaves the line in place and unchanged.
- Line - Join and Line - Coordinates still use or create visible endpoint points for the normal CAD workflow, but those points can be edited or deleted independently afterward.
- Offset lines use the same independent endpoint model.
- Trim/Extend and automatic Fillet trimming preserve line independence when they replace an endpoint.
- Point on Entity treats a line's hidden endpoints as temporary direction choices, so its ambiguous-direction workflow remains usable.
- Existing in-memory lines that still reference a visible point are detached automatically if that point is deleted.
- Undo and Redo preserve both the line and its independent internal endpoints as one document state.

## V0.0.39 Alpha Dev Build

Line - Sketch

Changes made since V0.0.38:

- Enabled Draw > Line > Sketch.
- Line Sketch uses the same plain crosshair cursor as Point Sketch.
- The first drawing click creates or reuses a visible start point.
- Pointer movement after the first click shows a live dashed line preview.
- The second click creates or reuses the visible end point and completes the line.
- Sketched lines use private internal endpoint geometry, so either visible endpoint point can be deleted or rotated without changing the line.
- Zero-length and duplicate lines are rejected.
- After each completed line, Line Sketch stays active and waits for the first point of the next line.
- Escape or choosing another drawing, selection, or Modify command exits Line Sketch.
- Undo and Redo leave Line Sketch active and ready for a new first point.

## V0.0.40 Alpha Dev Build

Arc Flyout Organization

Changes made since V0.0.39:

- Replaced the disabled top-level Arc placeholder with a Draw > Arc flyout.
- Moved the existing Circle - Point Center and Radius command into the Arc flyout and labeled it Point Center.
- Moved Fillet from Modify into the Arc flyout and shortened its menu label from Fillet Radius to Fillet.
- Fillet now dismisses the Draw menu when activated from its new location.
- Added disabled Sketch Center and 3 Entities placeholders for upcoming arc-construction passes.
- Modify now contains Trim/Extend, Offset, and Rotate.

## V0.0.41 Alpha Dev Build

Circle - Sketch Center

Changes made since V0.0.40:

- Enabled Draw > Arc > Sketch Center.
- Sketch Center reuses the existing movable Circle radius window and arithmetic-capable Radius field.
- The drawing cursor becomes the same plain crosshair used by the other Sketch tools.
- Clicking the drawing creates or reuses a visible Point entity at the circle center.
- The selected center point is highlighted and a live circle preview reflects the entered radius.
- Create adds a circle of the defined radius centered on the sketched point.
- After creation, Sketch Center remains active and waits for the next center click.
- Cancel, Close, Escape, or choosing another tool exits the command.
- Point Center remains unchanged and continues to require an existing point.

## V0.0.42 Alpha Dev Build

Circle - 3 Entities / Apollonius Solver

Changes made since V0.0.41:

- Enabled Draw > Arc > 3 Entities for three distinct Point, Line, or Circle selections.
- Added a unified signed algebraic solver for the Problem of Apollonius instead of separate implementations for the ten classical input combinations.
- Points are represented as zero-radius circle constraints.
- Circle constraints enumerate internal and external tangency orientations.
- Line constraints use normalized signed distance equations, avoiding the incompatible quadratic terms produced by squaring a line-distance equation.
- Mixed point/circle/line problems reduce to two linear planes in `(x, y, r)`; their intersection is parameterized and substituted into one remaining quadratic equation.
- Three-line problems are solved directly as a signed 3-by-3 linear system.
- Candidate roots are checked against the original tangency equations, non-positive radii are discarded, and duplicate solutions are removed.
- Lines are treated as their infinite supporting lines, matching the stated Apollonius distance equation.
- Each selected entity is highlighted, and its exact mouse-click coordinate is retained.
- Candidate filtering calculates the exact tangency point for each source entity and minimizes the sum of the three squared click distances.
- Scores within `1e-6` of the minimum use the smaller candidate radius as the tie-breaker.
- The chosen result creates a visible center point and Circle entity as one undoable document change.
- 3 Entities remains active after creation and resets for another three selections; Escape or another tool exits it.

## V0.0.43 Alpha Dev Build

Overlay Drawing Scrollbars

Changes made since V0.0.42:

- Added always-visible horizontal and vertical scrollbars over the bottom and right edges of the drawing surface.
- The SVG drawing area retains its full width and height; the scrollbars overlay it instead of shrinking the canvas.
- A scrollbar remains gray and disabled until document geometry extends beyond the centered visible view on that axis.
- Points, independent Lines, Circles, and the actual swept bounds of Arcs contribute to the scrollable document bounds.
- Enabled bars support arrow-button steps, track page steps, draggable thumbs, and keyboard navigation.
- The scrollbar thumb size reflects the visible drawing span relative to the total required geometry span.
- Vertical scrolling preserves GravyCAD's coordinate law: Up moves toward Y+ and Down moves toward Y-.
- Zooming recalculates the visible and scrollable spans while preserving the current view center whenever possible.
- Home now restores both 100% zoom and the original X0 Y0-centered view.
- Deleting or undoing outlying geometry disables the unnecessary bar and safely returns that axis to the centered view.

## V0.0.44 Alpha Dev Build

View - Window

Changes made since V0.0.43:

- Added Window to the View dropdown between Zoom Out and Home.
- View is now ordered Zoom In, Zoom Out, Window, and Home.
- Window changes the drawing cursor to a plain crosshair and accepts a drag in any direction.
- A dashed selection rectangle previews the exact area that will become the new view.
- The dragged area is expanded around its center as needed to preserve the drawing canvas's aspect ratio without cutting off any enclosed area.
- Releasing the pointer centers and zooms the drawing to the aspect-matched window.
- Window is a one-shot view operation; the drawing command that was active beforehand remains available afterward.
- A click or undersized drag cancels safely without changing the view, and Escape cancels Window immediately.
- Selecting another menu command while Window is waiting cancels the Window operation.
- Window-created off-center views participate in the overlay scrollbar navigation until Home is chosen.
- Home clears the Window navigation anchor and restores the original X0 Y0-centered 100% view.

## V0.1.0 Alpha Dev Build

PrometheusCAD Rechristening

Changes made since V0.0.44:

- Renamed the application from GravyCAD to **PrometheusCAD** to reflect the project’s expanded scope.
- Advanced the project version from the V0.0.x development series to **V0.1.0**.
- Updated the browser title, application header, application metadata, source identity comments, and current README branding.
- Added the visible V0.1.0 version marker beside the PrometheusCAD name in the application header.
- Renamed exported drawings from `GravyCAD.dxf` to `PrometheusCAD.dxf`.
- Updated the DXF identification comment to record PrometheusCAD V0.1.0 as the producing application.
- Retained historical GravyCAD references inside earlier version notes so the development record remains accurate.
- Changed View > Window from a one-shot command into a persistent view action.
- After each successful Window zoom, the crosshair remains active and another zoom area can be dragged immediately.
- An undersized or interrupted drag leaves Window active; choosing another menu action or pressing Escape exits it.

## V0.1.1 Alpha Dev Build

Layer and Help Menu Foundations

Changes made since V0.1.0:

- Added a Layer dropdown immediately after Dimension.
- Layer shows the current `Layer: 0` entry and a disabled New placeholder for future layer creation.
- Added a Help dropdown immediately after Layer.
- Added Help > About.
- About opens a compact movable window containing `PrometheusCAD V0.1.1` and `2026 eriselizabeth.com` on separate lines.
- `eriselizabeth.com` links to `https://eriselizabeth.com` in a new browser tab.
- About can be closed with its X button or Escape and remains inside the visible application area when the window is resized.
- Centralized the runtime application name and version so the browser title, header version marker, About text, DXF producer identity, and DXF filename use the same application identity.
- Updated the visible application version and metadata to V0.1.1.
- Added a right-aligned quick-tool strip to the menu bar using the PNGs in "Assets": Undo, Redo, Zoom In, Zoom Out, Zoom Window, and Calculator PNG artwork in that order.
- Each quick tool sits on a 28-pixel square `#D9DDDC` button with rounded corners, with Calculator occupying the far-right position.
- Wired the toolbar Undo and Redo buttons to the existing document-history commands; their enabled states mirror the Edit menu items.
- Wired toolbar Zoom In and Zoom Out to the existing 20% view commands.
- Wired toolbar Zoom Window to the persistent aspect-ratio-preserving Window command and added a pressed visual state while that command is active.
- Embedded the Calculator component directly from the `Calculator` folder without duplicating its implementation.
- Wired the toolbar Calculator button to open the existing scientific calculator in a movable window above the drawing canvas.
- The calculator opens centered over the drawing on first use, preserves its dragged position on subsequent openings, and restores from its minimized state when the toolbar button is used again.
- The Calculator toolbar button remains visually pressed while the calculator window is open and clears when its Close button is used.

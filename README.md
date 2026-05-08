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

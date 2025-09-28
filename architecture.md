# Collatz Box Universes Explorer Suite - Architecture Specification

## 1. Core Principles (Spec-Driven Development)

This project is built using Spec-Driven Development (SDD). All core components must be defined by explicit specifications and verified via Test-Driven Development (TDD) using Vitest before integration.

## 2. The Generalized Collatz Rule

The core function must support the fully generalized rule:
$$T_{X,Y,Z}(n) = \begin{cases} n/X & \text{if } n \equiv 0 \pmod X \\ nY+Z & \text{if } n \not\equiv 0 \pmod X \end{cases}$$

## 3. Technology Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **High-Precision Math** | JavaScript **BigInt** | Essential for preventing number overflow in long Collatz sequences. |
| **3D Visualization** | **Three.js** | Required for all 3D applications (FPS, Viewer, Line Explorer). |
| **2D Visualization** | **p5.js** (or standard Canvas) | Flexible base for 2D apps (Slicer, Dragon, Radial). |
| **Testing** | **Vitest** | Fast, modern framework for TDD verification. **(CRITICAL DEPENDENCY)** |
| **Tooling** | **npm/package.json** | Manages dependencies and defines test scripts (`npm test`). **(CRITICAL DEPENDENCY)** |
| **Styling** | **Tailwind CSS** | As specified in the project brief. |

## 4. Architectural Modules (The Pipeline)

The application is structured into four sequential, independent, and reusable modules.

| Phase | Module Name | Location | Responsibility |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Engine** | `js/collatz-engine.js` | Generates the BigInt sequence. |
| **Phase 2** | **Mapper** | `js/collatz-mapper.js` | Transforms BigInt sequence to **numerical coordinates** and residue classes. |
| **Phase 3** | **Visualizer** | `js/collatz-visualizer.js` | Contains reusable **geometric transformation** logic (Gilbert, Dragon, etc.). |
| **Phase 4** | **Application** | `*.html` + `js/app.js` | Orchestrates the pipeline and handles user interaction (8 different apps). |

---

### 4.5. The Box Universes Application Suite

The Phase 4 Application module will be implemented as eight distinct web-based applications, each providing a unique Level of Detail (LOD) for analysis:

1.  **index.html** (Box Universe Explorer: Quantitative Analysis & Launchpad)
2.  **slicer.html** (2D Pseudo-3D Slicer: Qualitative Exploration)
3.  **box-universe-fps.html** (Box Universe FPS: 3D Number Space Explorer)
4.  **box-universe-viewer.html** (Box Universe Viewer: 3D Rule Space Explorer)
5.  **collatz-dragon.html** (Collatz Dragon Explorer: Directional Sequence Mapper)
6.  **collatz-line-explorer.html** (Collatz Line Universe Explorer: Dynamic 3D Trajectory)
7.  **radial-animator.html** (Radial Animator: Dynamic Cyclic Visualization)
8.  **radial-viewer.html** (Radial Viewer: Static Cyclic Visualization)

---

## 5. Structural Analysis & Theoretical Foundation (RCWA)

The visualization is explicitly grounded in the structural analysis of modular arithmetic.

### A. Conceptual Integration of RCWA

We will integrate the *concepts* of **Residue Class Rings Modulo X ($\mathbb{Z}_X$)** into the data mapping phase.

* The `collatz-mapper.js` module will treat the $\text{value} \pmod X$ as the sequence's position within the $\mathbb{Z}_X$ ring.
* This $\text{value} \pmod X$ will be assigned to the coordinate $Y$, providing the core structural data for all visualizations.

### B. Attribution (Non-Negotiable)

The project will formally attribute the theoretical foundation and the implementation sources:

* The analysis of residue classes is conceptually informed by tools like the **GAP `rcwa` package** (Residue Class Rings With Absorbing Zero).
* The geometric transformations (e.g., Hilbert/Gilbert Curve) must be formally cited in the code and documentation.

## 6. Development Workflow

1.  **Environment Setup:** Run `npm install` to download dependencies (Vitest).
2.  **Define Component Specification** (Spec).
3.  **Implement Code** (TDD).
4.  **Run Verification:** Execute `npm test` (TDD verification).
5.  **Integrate** into the application HTML pages.
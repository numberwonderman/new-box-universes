/**
 * js/collatz-visualizer.js
 * Contains geometric transformation (Gilbert Curve) and rendering utilities.
 * (Meets Specs V1.0, V2.0, V3.0)
 */

// =================================================================
// 1. Geometric Transformation Helpers (Gilbert Curve) - (Spec V3.0)
// =================================================================

// V3.0 Helper: Rotates and flips coordinates for the curve.
function rot(n, x, y, rx, ry) {
    if (ry === 0) {
        if (rx === 1) {
            x = n - 1 - x;
            y = n - 1 - y;
        }
        // Swap x and y
        [x, y] = [y, x];
    }
    return [x, y];
}

/** * V3.0 Core Function: Maps a 1D index (d) to 2D Hilbert/Gilbert coordinates (x, y).
 * @param {number} m - Max dimension (2^segments) of the grid.
 * @param {number} d - The 1D index (the step index).
 * @returns {number[]} [x, y] coordinates on the curve.
 */
export function d2xy(m, d) {
    let x = 0;
    let y = 0;
    let s = 1;
    let t = d;
    
    // The curve is built recursively by segments
    while (s < m) {
        let rx = 1 & (t / 2);
        let ry = 1 & (t ^ rx);
        [x, y] = rot(s, x, y, rx, ry);
        x += s * rx;
        y += s * ry;
        t /= 4;
        s *= 2;
    }
    return [x, y];
}

// =================================================================
// 2. Common Visualization Utilities - (Spec V2.0)
// =================================================================

/**
 * V2.0 Utility: Scales a raw Z-coordinate (log value) to a renderable size.
 * @param {number} logValue - The log2(N) value from the mapper.
 * @param {number} maxLogValue - The maximum log2 value in the sequence.
 * @param {number} scaleFactor - The desired screen multiplier.
 * @returns {number} The final scaled size for a point or object.
 */
export function scaleLogValue(logValue, maxLogValue, scaleFactor = 1.0) {
    if (maxLogValue <= 0) return 0;
    // Normalize the value against the sequence max and apply scale factor
    return (logValue / maxLogValue) * scaleFactor; 
}

/**
 * V2.0 Utility: Generates a color based on the residue class (Y-coordinate).
 * Maps the residue class (0, 1, 2, ... X-1) to a hue in the HSL color space.
 * @param {number} residue - The value % X from the mapper (0 to X-1).
 * @param {number} X - The divisor factor (max residue value + 1).
 * @returns {string} An HSL color string (e.g., "hsl(0, 100%, 50%)").
 */
export function colorByResidue(residue, X) {
    // Calculate hue based on the residue class
    const hue = (residue / X) * 360; 
    // Return a vibrant HSL color
    return `hsl(${hue}, 80%, 55%)`; 
}
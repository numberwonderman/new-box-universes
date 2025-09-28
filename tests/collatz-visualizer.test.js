/**
 * tests/collatz-visualizer.test.js
 * Verifies geometric transformations and visualization utilities (Specs V2.0, V3.0).
 */
import { describe, it, expect } from 'vitest';
import { d2xy, scaleLogValue, colorByResidue } from '../js/collatz-visualizer.js';

describe('Collatz Visualizer - Geometric & Utility Verification', () => {

    // --- Gilbert Curve (d2xy) Verification (Spec V3.0) ---
    // The d2xy function maps a 1D index (d) to 2D coordinates (x, y).
    // Test the simplest 2x2 grid (m=2)
    const M_2X2 = 2; // Grid dimension

    it('should correctly map 1D index 0 on a 2x2 grid', () => {
        // Expected path: (0, 0)
        expect(d2xy(M_2X2, 0)).toEqual([0, 0]);
    });

    it('should correctly map 1D index 1 on a 2x2 grid', () => {
        // Expected path: (0, 1)
        expect(d2xy(M_2X2, 1)).toEqual([0, 1]);
    });
    
    it('should correctly map 1D index 2 on a 2x2 grid', () => {
        // Expected path: (1, 1)
        expect(d2xy(M_2X2, 2)).toEqual([1, 1]);
    });

    it('should correctly map 1D index 3 on a 2x2 grid', () => {
        // Expected path: (1, 0)
        expect(d2xy(M_2X2, 3)).toEqual([1, 0]);
    });


    // --- Visualization Utility Verification (Spec V2.0) ---

    it('should correctly scale a log value relative to the max (Spec V2.0)', () => {
        const max = 10;
        // Half of max should scale to half (when scaleFactor is 1)
        expect(scaleLogValue(5, max, 1)).toBeCloseTo(0.5); 
        // Applying a scale factor of 2 should double the normalized result
        expect(scaleLogValue(5, max, 2)).toBeCloseTo(1.0);
    });

    it('should generate distinct colors based on residue class', () => {
        const X_DIVISOR = 3; 
        
        // Residue 0 (0/3 * 360 = 0 degrees HUE)
        expect(colorByResidue(0, X_DIVISOR)).toBe('hsl(0, 80%, 55%)');
        
        // Residue 1 (1/3 * 360 = 120 degrees HUE)
        expect(colorByResidue(1, X_DIVISOR)).toBe('hsl(120, 80%, 55%)');
        
        // Residue 2 (2/3 * 360 = 240 degrees HUE)
        expect(colorByResidue(2, X_DIVISOR)).toBe('hsl(240, 80%, 55%)');
    });
});
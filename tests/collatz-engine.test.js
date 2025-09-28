/**
 * tests/collatz-engine.test.js
 * Verifies the generalized BigInt Collatz engine (Specs E3.0, E5.0).
 */
import { describe, it, expect } from 'vitest';
import { generateCollatzSequence, calculateNextTerm } from '../js/collatz-engine.js';

// --- Parameters for Standard Collatz (X=2, Y=3, Z=1) ---
const X = 2n;
const Y = 3n;
const Z = 1n;
const START_N = 6n;
const MAX_STEPS = 100;

describe('Collatz Engine - Core Math Verification', () => {

    it('should correctly calculate the next term for even numbers (n/X)', () => {
        // 6 / 2 = 3
        expect(calculateNextTerm(6n, X, Y, Z)).toBe(3n);
    });

    it('should correctly calculate the next term for odd numbers (nY+Z)', () => {
        // 3 * 3 + 1 = 10
        expect(calculateNextTerm(3n, X, Y, Z)).toBe(10n);
    });

    it('should pass the standard Collatz sequence test', () => {
        const resultSequence = generateCollatzSequence(START_N, X, Y, Z, MAX_STEPS);
        
        // Expected sequence for N=6, X=2, Y=3, Z=1
        const expectedSequence = [6n, 3n, 10n, 5n, 16n, 8n, 4n, 2n, 1n];

        expect(resultSequence).toEqual(expectedSequence);
    });

    it('should respect the maxSteps safety constraint', () => {
        // Sequence for N=6 requires 8 steps to reach 1n. Max steps is 5.
        const result = generateCollatzSequence(START_N, X, Y, Z, 5); 
        
        // Expect only the first 6 elements (N=6 + 5 steps)
        expect(result.length).toBe(6);
    });
});
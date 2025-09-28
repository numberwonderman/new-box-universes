/**
 * tests/collatz-mapper.test.js
 * Verifies the Residue Class (Modulo X) mapping. (Spec M5.0)
 */
import { describe, it, expect } from 'vitest';
import { mapSequenceToCoordinates } from '../js/collatz-mapper.js';

describe('Collatz Mapper - RCWA-Inspired Residue Mapping', () => {

    const X_STANDARD = 2n; 
    // Sequence for N=6, X=2, Y=3, Z=1: [6, 3, 10, 5, 16, 8, 4, 2, 1]
    const standardSequence = [6n, 3n, 10n, 5n, 16n, 8n, 4n, 2n, 1n];

    it('should correctly map the standard sequence to Modulo-2 residues (Y-coord) (Spec M5.0)', () => {
        const mappedCoords = mapSequenceToCoordinates(standardSequence, X_STANDARD);
        
        // Expected Modulo-2 residues (Even = 0, Odd = 1)
        const expectedResidues = [0, 1, 0, 1, 0, 0, 0, 0, 1];
        
        // Check the Y-coordinate (Residue Class)
        const yCoords = mappedCoords.map(coord => coord.y);

        expect(yCoords).toEqual(expectedResidues);
    });

    it('should correctly map the X-coordinate as the sequence index (step count)', () => {
        const mappedCoords = mapSequenceToCoordinates(standardSequence, X_STANDARD);
        
        const xCoords = mappedCoords.map(coord => coord.x);
        // Expect indices 0, 1, 2, 3, 4, 5, 6, 7, 8
        expect(xCoords).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('should correctly map sequence using a non-standard divisor (X=5)', () => {
        const X_FIVE = 5n;
        // The numbers are: [6, 3, 10, 5, 16]
        const sequenceSubset = [6n, 3n, 10n, 5n, 16n];
        
        const mappedCoords = mapSequenceToCoordinates(sequenceSubset, X_FIVE);

        // Expected Modulo-5 residues (6%5=1, 3%5=3, 10%5=0, 5%5=0, 16%5=1)
        const expectedResidues = [1, 3, 0, 0, 1];

        const yCoords = mappedCoords.map(coord => coord.y);
        expect(yCoords).toEqual(expectedResidues);
    });
});
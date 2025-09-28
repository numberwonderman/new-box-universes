/**
 * js/collatz-engine.js
 * Implements the BigInt-based generalized Collatz sequence generation
 * for the Box Universes project (Rule: n%X=0 -> n/X, else nY+Z).
 */

/**
 * Calculates the next term in the fully Generalized Collatz sequence: T_X,Y,Z(n).
 * @param {bigint} n - The current number.
 * @param {bigint} X - The divisor factor.
 * @param {bigint} Y - The multiplier factor.
 * @param {bigint} Z - The adder factor.
 * @returns {bigint} The next term in the sequence.
 */
export function calculateNextTerm(n, X, Y, Z) {
    // BigInt Precision Check
    if (typeof n !== 'bigint' || typeof X !== 'bigint' || typeof Y !== 'bigint' || typeof Z !== 'bigint') {
        throw new TypeError("All inputs (n, X, Y, Z) must be BigInt types.");
    }

    // Generalized Rule (n%X=0 -> n/X, else nY+Z)
    return (n % X === 0n) ? (n / X) : ((n * Y) + Z);
}

/**
 * Generates the full sequence of BigInts for the generalized Collatz map.
 * @param {bigint} startN - The starting number.
 * @param {bigint} X - The divisor factor.
 * @param {bigint} Y - The multiplier factor.
 * @param {bigint} Z - The adder factor.
 * @param {number} maxSteps - Maximum steps to run.
 * @returns {bigint[]} The Collatz sequence.
 */
export function generateCollatzSequence(startN, X, Y, Z, maxSteps) {
    const sequence = [startN];
    let n = startN;
    let steps = 0;

    // Run until n hits 1n or maxSteps is exceeded
    while (n !== 1n && steps < maxSteps) {
        try {
            n = calculateNextTerm(n, X, Y, Z); 
        } catch (e) {
            console.error("Collatz Engine Error:", e);
            break; 
        }
        sequence.push(n);
        steps++;
    }
    return sequence;
}
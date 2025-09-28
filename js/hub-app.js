// js/hub-app.js
// Orchestrates the Collatz pipeline for the Main Hub application.

// 1. Import all verified core modules
import { generateCollatzSequence } from './collatz-engine.js';
import { mapSequenceToCoordinates } from './collatz-mapper.js';
import { colorByResidue } from './collatz-visualizer.js'; 


// List of the 8 applications for the navigation panel (matches ARCHITECTURE.md)
const APPLICATIONS = [
    { name: "01. Quantitative Analysis Hub", file: "index.html", isHub: true },
    { name: "02. 2D Pseudo-3D Slicer", file: "slicer.html" },
    { name: "03. Box Universe FPS (3D)", file: "box-universe-fps.html" },
    { name: "04. 3D Rule Space Viewer", file: "box-universe-viewer.html" },
    { name: "05. Collatz Dragon Explorer", file: "collatz-dragon.html" },
    { name: "06. Line Universe Explorer (3D)", file: "collatz-line-explorer.html" },
    { name: "07. Radial Animator (Dynamic)", file: "radial-animator.html" },
    { name: "08. Radial Viewer (Static)", file: "radial-viewer.html" },
];

/**
 * Executes the full Collatz pipeline and updates the Hub display.
 */
function runFullPipeline() {
    // 1. Read Inputs (and convert to appropriate types)
    const startN = BigInt(document.getElementById('startN').value || 1);
    const X = BigInt(document.getElementById('X').value || 2);
    const Y = BigInt(document.getElementById('Y').value || 3);
    const Z = BigInt(document.getElementById('Z').value || 1);
    const maxSteps = parseInt(document.getElementById('maxSteps').value || 100);

    const seqOutput = document.getElementById('sequence-output');
    const coordOutput = document.getElementById('coordinates-output');

    try {
        // 2. Phase 1: Call the verified Engine
        const sequence = generateCollatzSequence(startN, X, Y, Z, maxSteps);
        
        // 3. Phase 2: Call the verified Mapper (RCWA Integration)
        const coordinates = mapSequenceToCoordinates(sequence, X);

        // 4. Update the Display
        
        // Display raw sequence
        seqOutput.textContent = sequence.map(n => n.toString()).join(' -> ');

        // Display coordinates (formatted for easy reading)
        const formattedCoords = coordinates.map(c => 
            `{step: ${c.x}, residue: ${c.residue}, log2(N): ${c.z.toFixed(2)}, color: ${colorByResidue(c.residue, Number(X))}}`
        ).join('\n');
        
        coordOutput.textContent = `Total Steps: ${sequence.length - 1}\n\n` + formattedCoords;

    } catch (error) {
        seqOutput.textContent = 'ERROR: ' + error.message;
        coordOutput.textContent = 'Ensure all inputs are valid BigInt numbers.';
    }
}

/**
 * Initializes the Hub: sets up the event listener and navigation panel.
 */
function initializeHub() {
    // Set up the event listener for the button
    document.getElementById('runSequence').addEventListener('click', runFullPipeline);

    // Populate the navigation panel links
    const navPanel = document.getElementById('nav-links');
    APPLICATIONS.forEach(app => {
        const link = document.createElement('a');
        link.href = app.file;
        link.textContent = app.name;
        link.className = 'block p-2 rounded transition duration-150 ' + 
                         (app.isHub ? 'bg-indigo-700 font-bold text-white' : 'bg-gray-700 hover:bg-gray-600 text-indigo-300');
        
        if (!app.isHub) {
            // For viewers, ensure current parameters are passed in the URL (State Management)
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const startN = document.getElementById('startN').value;
                const X = document.getElementById('X').value;
                const Y = document.getElementById('Y').value;
                const Z = document.getElementById('Z').value;
                const maxSteps = document.getElementById('maxSteps').value;

                // Pass the current rule set via query parameters
                const params = new URLSearchParams({ startN, X, Y, Z, maxSteps }).toString();
                window.location.href = `${app.file}?${params}`;
            });
        }
        navPanel.appendChild(link);
    });

    // Run the default sequence on load
    runFullPipeline();
}

// Start the application setup
initializeHub();
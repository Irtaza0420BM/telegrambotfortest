// WebGL game setup
const canvas = document.getElementById("gameCanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
    alert("WebGL not supported, falling back to 2D canvas.");
}

function setupWebGL() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black
    gl.clear(gl.COLOR_BUFFER_BIT);
}

setupWebGL();

let randomNumber = Math.floor(Math.random() * 100) + 1; // Generate random number between 1 and 100

function checkGuess() {
    const guessInput = document.getElementById("guessInput").value;
    const result = document.getElementById("result");

    if (guessInput == randomNumber) {
        result.textContent = "Congratulations! You guessed the correct number!";
        result.style.color = "green";
        resetGame();
    } else {
        result.textContent = "Wrong guess, try again!";
        result.style.color = "red";
    }
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // Reset random number
}

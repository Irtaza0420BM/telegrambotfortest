// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020); // Set a background color

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a rotating cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Counter for clicks
let counter = 0;

// Add animation loop
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// Function to handle clicks on the cube
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections
    const intersects = raycaster.intersectObject(cube);

    if (intersects.length > 0) {
        // Increment the counter and display it
        counter++;
        console.log(`Cube clicked! Counter: ${counter}`);
        alert(`Cube clicked! Current Counter: ${counter}`);

        // Optional: Change cube color on click
        cube.material.color.setHex(Math.random() * 0xffffff);

        // Example: Submit the updated counter to backend
        submitScore(counter);
    } else {
        console.log("Nothing was clicked.");
    }
}

// Listen for mouse clicks
document.addEventListener("click", onMouseClick);

// Function to send the counter to the backend
async function submitScore(score) {
    try {
        const response = await fetch("/api/test", {
            method: "GET", // Replace with "POST" if submitting the score
        });
        const data = await response.json();
        console.log(`API Response: ${data.message}`);
    } catch (error) {
        console.error("Error communicating with backend:", error);
    }
}

// Start the animation
animate();

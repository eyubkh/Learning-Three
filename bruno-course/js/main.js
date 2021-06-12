const canvas = document.getElementById('canvas');

const renderer = new THREE.WebGLRenderer({ canvas });

// Scene
const scene = new THREE.Scene();

//Camera

const fov = 50;
const aspect = 2;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 10;

/// light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

// cube

const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(geometry, material);

scene.add(box);
addEventListener('keydown', e => {
    console.log(e);
    if (e.key === 'ArrowRight') box.position.x += 0.3;
    if (e.key === 'ArrowLeft') box.position.x -= 0.3;
    if (e.key === 'ArrowUp') box.position.y += 0.3;
    if (e.key === 'ArrowDown') box.position.y -= 0.3;
});

let time = 0;
function render() {
    requestAnimationFrame(render);
    time += 0.01;
    box.rotation.y = time;
    box.rotation.x = -time;

    // Full screen
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight, false);

    /// Render
    renderer.render(scene, camera);
}

requestAnimationFrame(render);

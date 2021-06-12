import * as three from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
const canvas = document.getElementById('canvas');
const renderer = new three.WebGLRenderer({ canvas });

///////////////////
function main() {
    const scene = new three.Scene();

    const fov = 100;
    let aspect = null;
    const near = 0.1;
    const far = 100;
    const camera = new three.PerspectiveCamera(
        fov,
        aspect,
        near,
        far
    );
    camera.position.z = 2;

    const color = 0xffffff;
    const intensity = 1;
    const light = new three.DirectionalLight(color, intensity);
    light.position.set(0, 0, 2);
    scene.add(light);

    const box = new three.BoxGeometry(1, 1, 1);

    const cubs = [
        cub(box, 0xffffff, 0),
        cub(box, 0xff0000, -2),
        cub(box, 0xffff00, 2),
    ];
    function cub(box, color, x) {
        let material = new three.MeshPhongMaterial({ color: color });
        const cub = new three.Mesh(box, material);
        cub.position.x = x;
        return cub;
    }

    // Canvas and Camera size

    function resize() {
        renderer.setSize(
            innerWidth * window.devicePixelRatio,
            innerHeight * window.devicePixelRatio,
            false
        );
        camera.aspect =
            (innerWidth * window.devicePixelRatio) /
            (innerHeight * window.devicePixelRatio);
        camera.updateProjectionMatrix();
    }

    render(new Date().getSeconds());

    function render(time) {
        requestAnimationFrame(render);
        time *= 0.001;
        cubs.map(i => {
            i.rotation.x = time;
            i.rotation.y = time;
            scene.add(i);
        });

        renderer.render(scene, camera);
        resize();
    }
    requestAnimationFrame(render);
    console.log(window.devicePixelRatio);
}

addEventListener('DOMContentLoaded', () => {
    main();
});

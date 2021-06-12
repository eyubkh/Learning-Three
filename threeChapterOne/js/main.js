import * as three from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

function main() {
    const canvas = document.getElementById('canvas');
    const renderer = new three.WebGLRenderer({ canvas });

    //// Scene

    const scene = new three.Scene();
    scene.background = new three.Color('#A69CAC');

    ///// Camera

    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
    const camera = new three.PerspectiveCamera(
        fov,
        aspect,
        near,
        far
    );

    camera.position.set(0, 15, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    /// Light

    const color = 0xffffff;
    const intesity = 0.8;
    const light = new three.PointLight(color, intesity);
    scene.add(light);

    ///

    const object = [];

    ////// Sun

    const radius = 1;
    const widht = 10;
    const height = 10;
    const box = new three.SphereGeometry(radius, widht, height);
    const material = new three.MeshPhongMaterial({
        emissive: '#ffff00',
    });
    const sun = new three.Mesh(box, material);
    sun.scale.set(1, 1, 1);
    scene.add(sun);
    object.push(sun);

    // Earth

    const earthMaterial = new three.MeshPhongMaterial({
        // color: 0x2233ff,
        // emissive: 0x112244,
    });
    const earth = new three.Mesh(box, earthMaterial);
    earth.position.x = 10;
    earth.scale.set(0.5, 0.5, 0.5);
    sun.add(earth);
    object.push(earth);

    // Mooon

    const moonMaterial = new three.MeshPhongMaterial({
        color: 'red',
    });
    const moon = new three.Mesh(box, moonMaterial);
    moon.position.x = 3;
    moon.scale.set(0.3, 0.3, 0.3);
    earth.add(moon);
    object.push(moon);

    //// resize
    function resize() {
        let pixelRatio = window.devicePixelRatio;
        camera.aspect =
            (innerWidth * pixelRatio) / (innerHeight * pixelRatio);
        camera.updateProjectionMatrix();
        renderer.setSize(
            innerWidth * pixelRatio,
            innerHeight * pixelRatio,
            false
        );
    }

    // animation
    let time = 0;
    function render() {
        requestAnimationFrame(render);

        time += 0.01;

        object.map(item => {
            item.rotation.y = time;
        });

        resize();
        renderer.render(scene, camera);
    }

    requestAnimationFrame(render);
}

main();

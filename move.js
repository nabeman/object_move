//イベントを登録
window.addEventListener("DOMContentLoaded", init);
window.addEventListener("click",move);

function init(){
    const width = window.innerWidth;
    const height = window.innerHeight;

    //renderer
    const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#canvas')});
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(width, height);

    //scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);

    //camera
    const camera = new THREE.PerspectiveCamera(60,width/height,1,1000);
    //camera.lookAt(new THREE.Vector3(150,0,0));

    //light
    const light = new THREE.DirectionalLight(0xFFFFFF,0.5);
    light.castShadow = true;
    light.position.set(0,150,50)
    scene.add(light);
    
    //amibient light
    const ambient = new THREE.AmbientLight(0xFFFFFF, 1.0);
    scene.add(ambient); 

    //sphere
    const geometry = new THREE.SphereGeometry(20, 32, 32);
    const material = new THREE.MeshStandardMaterial({color: 0x0C8BD4});
    const sphere = new THREE.Mesh(geometry, material);
    sphere.receiveShadow = true;
    sphere.castShadow = true;
    sphere.position.set(150, 50, 0);
    scene.add(sphere);

    //box
    const box_geo = new THREE.BoxGeometry(40, 40, 40);
    const box_mat = new THREE.MeshStandardMaterial({color: 0x0C8BD4});
    const box = new THREE.Mesh(box_geo, box_mat);
    box.receiveShadow = true;
    box.castShadow = true;
    box.position.set(-150, 50 , 0);
    scene.add(box);

    //floor
    const floor_geo = new THREE.PlaneGeometry(1000,1000);
    const floor_mat = new THREE.MeshStandardMaterial({color: 0x95AAB7})
    const floor = new THREE.Mesh(floor_geo, floor_mat);
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI/2;
    scene.add(floor);

    light.target = box;
    scene.add(light.target);
    tick();

    //rendering
    function tick(){
        camera.position.z = 500;
        camera.position.y = 100;

        box.rotation.y += 0.01;
        box.rotation.x += 0.01;
        sphere.rotation.y += 0.01;

        if(mouse.x < width/2 && mouse.x != 0){
            box.position.x += (0 - box.position.x)* 0.01;
            box.position.y += (80 - box.position.y)* 0.01;
            box.position.z += (200 - box.position.z)*0.01;

            sphere.position.x += (150 - sphere.position.x)*0.013;
            sphere.position.y += (50 - sphere.position.y)*0.013;
            sphere.position.z += (0 - sphere.position.z)*0.013;
        }else if(mouse.x > width/2){
            box.position.x += (-150 - box.position.x)* 0.013;
            box.position.y += (50 - box.position.y)* 0.013;
            box.position.z += (0 - box.position.z)*0.013;

            sphere.position.x += (0 - sphere.position.x)*0.01;
            sphere.position.y += (80 - sphere.position.y)*0.01;
            sphere.position.z += (200 - sphere.position.z)*0.01;
        }
        camera.lookAt(0, 50, 0);

        renderer.render(scene,camera);
        requestAnimationFrame(tick);
    }
}

//マウスのスクリーン座標を登録
const mouse = new THREE.Vector2();

//クリックイベントを登録
function move(event){
    const element = event.currentTarget;

    //canvas要素上のx,y座標
    let x = event.clientX;
    let y = event.clientY;

    mouse.x = x;
    mouse.y = y;
}
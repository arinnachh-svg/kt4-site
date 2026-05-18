(function() {
  var wrapper = document.getElementById('canvas-wrapper');
  var canvas = document.getElementById('three-canvas');

  if (!wrapper || !canvas) return;

  var W = wrapper.clientWidth || 800;
  var H = 500;

  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe8e2d9);

  var camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100);
  camera.position.set(0, 1.5, 7);

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(W, H);

  var ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  var dirLight = new THREE.DirectionalLight(0xfff5e0, 1.2);
  dirLight.position.set(5, 8, 6);
  scene.add(dirLight);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;

  var box = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 1.3, 1.3),
    new THREE.MeshStandardMaterial({ color: 0x8c7b6b })
  );
  box.position.set(-2.5, 0, 0);
  scene.add(box);

  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xd4c9b8 })
  );
  sphere.position.set(0, 0, 0);
  scene.add(sphere);

  var torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.75, 0.28, 16, 60),
    new THREE.MeshStandardMaterial({ color: 0x5a4a3a })
  );
  torus.position.set(2.5, 0, 0);
  scene.add(torus);

  var mixer = null;
  var clock = new THREE.Clock();

  var loader = new THREE.GLTFLoader();
  loader.load('./models/model.glb', function(gltf) {
    var model = gltf.scene;
    model.position.set(0, -1.2, 0);
    model.scale.set(0.008, 0.008, 0.008);
    scene.add(model);
    if (gltf.animations && gltf.animations.length > 0) {
      mixer = new THREE.AnimationMixer(model);
      mixer.clipAction(gltf.animations[0]).play();
    }
  }, undefined, function() {});

  window.addEventListener('resize', function() {
    var w = wrapper.clientWidth || 800;
    renderer.setSize(w, H);
    camera.aspect = w / H;
    camera.updateProjectionMatrix();
  });

  function animate() {
    requestAnimationFrame(animate);
    var delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    box.rotation.y += 0.009;
    box.rotation.x += 0.005;
    torus.rotation.x += 0.009;
    torus.rotation.y += 0.007;
    sphere.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
})();

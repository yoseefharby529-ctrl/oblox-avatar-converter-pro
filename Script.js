// إعداد المشهد والكاميرا والرندر
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// مكعب تجريبي
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// زر تحميل OBJ
const button = document.createElement("button");
button.innerText = "Download OBJ";
document.body.appendChild(button);

button.addEventListener("click", () => {
  const exporter = new THREE.OBJExporter();
  const result = exporter.parse(cube);
  const blob = new Blob([result], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "avatar.obj";
  link.click();
});

// حلقة الرندر
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

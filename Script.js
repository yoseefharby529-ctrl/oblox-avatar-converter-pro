window.onload = function () {
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
  renderer.setClearColor(0x222222);
  document.body.appendChild(renderer.domElement);

  // مكعب تجريبي مؤقت
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 3;

  // زر تحميل OBJ
  const downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.addEventListener("click", () => {
    const exporter = new THREE.OBJExporter();
    const result = exporter.parse(cube); // لاحقًا نستبدل المكعب بالأفاتار
    const blob = new Blob([result], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "avatar.obj";
    link.click();
  });

  // جلب User ID من اسم اللاعب
  document.getElementById("converter-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const resultDiv = document.getElementById("result");

    try {
      const response = await fetch("https://users.roblox.com/v1/usernames/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernames: [username] })
      });
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        const userId = data.data[0].id;
        resultDiv.innerHTML = `✅ User ID: ${userId}`;
        // هنا لاحقًا هنجيب الأفاتار 3D ونبدل المكعب
      } else {
        resultDiv.innerHTML = "❌ Username not found!";
      }
    } catch (error) {
      resultDiv.innerHTML = "⚠️ Error fetching data.";
    }
  });

  // حلقة الرندر
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
};

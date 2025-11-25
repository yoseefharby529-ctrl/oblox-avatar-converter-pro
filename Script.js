document.getElementById("converter-form").addEventListener("submit", async function(e) {
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
      const avatarUrl = `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=150&height=150&format=png`;
      resultDiv.innerHTML = `<img src="${avatarUrl}" alt="Avatar"> <p>✅ User ID: ${userId}</p>`;
    } else {
      resultDiv.innerHTML = "❌ Username not found!";
    }
  } catch (error) {
    resultDiv.innerHTML = "⚠️ Error fetching data.";
  }
});

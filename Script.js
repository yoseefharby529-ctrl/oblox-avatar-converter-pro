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
      resultDiv.innerHTML = `✅ User ID: ${userId}`;
    } else {
      resultDiv.innerHTML = "❌ Username not found!";
    }
  } catch (error) {
    resultDiv.innerHTML = "⚠️ Error fetching data.";
  }
});

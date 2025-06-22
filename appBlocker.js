let html = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body, html {
    margin: 0; padding: 0; height: 100%; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    background: #1c1c1e; 
    color: white; 
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  }
  button {
    font-size: 24px;
    padding: 20px 40px;
    border: none;
    border-radius: 12px;
    background: #007aff;
    color: white;
    cursor: pointer;
  }
</style>
</head>
<body>
  <button id="open">OK</button>
  <script>
    document.getElementById("open").onclick = () => {
      window.location.href = "scriptable://action?open=true";
    }
  </script>
</body>
</html>
`;

let wv = new WebView();
const javascript = `
  document.querySelector("button").addEventListener("click", () => {
    window.location.href = "scriptable://action?open=true";
  });
`;

await wv.loadHTML(html);
await wv.present(true);
let url = await wv.waitForURL("scriptable://action?open=true");
if (url === "scriptable://action?open=true") {
  // Handle the action when the button is clicked
  console.log("Button clicked, proceeding with action.");
}

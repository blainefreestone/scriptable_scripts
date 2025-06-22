// HTML content for full-screen button
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
      // Send message to Scriptable to close the webview
      window.location = "scriptable://close?open=true";
    }
  </script>
</body>
</html>
`;

// Create a WebView and load the HTML
let wv = new WebView();
await wv.loadHTML(html);

// Present the WebView full screen
let result = await wv.present(true);

// Check if the user pressed the button
if (result === "open=true") {
  Safari.open("fb-messenger://");
}
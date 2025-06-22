let webview = new WebView();
let html = `
<!DOCTYPE html>
<html>
<head>
  <title>Button Example</title>
</head>
<body>
  <h1>Click the Button!</h1>
  <button id="myButton">Click Me!</button>

  <script>
    document.getElementById("myButton").addEventListener("click", function() {
      // JavaScript code to execute when the button is clicked
      alert("Button clicked!"); // Example: Show an alert
      // You can also call a function that communicates with Scriptable
      // for more complex actions
    });
  </script>
</body>
</html>
`;
await webview.loadHTML(html); // Load the HTML content
webview.present(); // Present the WebView
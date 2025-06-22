// Create and present webview
let webview = new WebView()

// HTML content for the webview
let html = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
            text-align: center;
            padding: 40px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            max-width: 300px;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
            font-size: 24px;
        }
        p {
            color: #666;
            margin-bottom: 30px;
            line-height: 1.5;
        }
        button {
            background: #1877f2;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(24, 119, 242, 0.3);
        }
        button:hover {
            background: #166fe5;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(24, 119, 242, 0.4);
        }
        button:active {
            transform: translateY(0);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🗨️ Messenger</h1>
        <p>Ready to open Facebook Messenger?</p>
        <button onclick="openMessenger()">Okay</button>
    </div>
    
    <script>
        function openMessenger() {
            // Send message to Scriptable
            window.webkit.messageHandlers.openMessenger.postMessage('open');
        }
    </script>
</body>
</html>
`

// Load the HTML
webview.loadHTML(html)

// Handle the message from webview
webview.evaluateJavaScript(`
    window.webkit.messageHandlers.openMessenger = {
        postMessage: function(message) {
            completion(message);
        }
    };
`, false).catch(e => console.log(e))

// Present the webview
let response = await webview.present()

// When the okay button is clicked, open Facebook Messenger
if (response === 'open') {
    // Try to open Messenger app using URL scheme
    let messengerURL = "fb-messenger://"
    let canOpen = await Safari.openInApp(messengerURL, false)
    
    if (!canOpen) {
        // If Messenger app isn't installed, open in App Store
        let appStoreURL = "https://apps.apple.com/app/messenger/id454638411"
        Safari.open(appStoreURL)
    }
}

Script.complete()
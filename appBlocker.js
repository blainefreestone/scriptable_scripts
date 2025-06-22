let strHTMLOriginal = `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
<body>
  <form>
    <input id="field1" value="one" /><br>
    <input id="field2" value="two" />
  </form>
</body>
</html>`

let viewOne = new WebView();
await viewOne.loadHTML(strHTMLOriginal);
await viewOne.present();

console.log(await viewOne.evaluateJavaScript(`document.getElementById("field1").value`));
console.log(await viewOne.evaluateJavaScript(`document.getElementById("field2").value`));
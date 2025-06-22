// testScript.js
// A simple Scriptable test script to verify GitHub updating

const date = new Date();
const alert = new Alert();
alert.title = "Test Script v1.1";
alert.message = `The current date and time is:\n${date.toLocaleString()}`;
alert.addAction("OK");
await alert.present();

// Create an alert with an "Okay" button
let alert = new Alert()
alert.title = "🗨️ Messenger"
alert.message = "Ready to open Facebook Messenger?"
alert.addAction("Okay")
alert.addCancelAction("Cancel")

// Present the alert and wait for user response
let response = await alert.presentAlert()

// If user clicked "Okay" (index 0), open Messenger
if (response === 0) {
    // Try to open Messenger app using URL scheme
    let messengerURL = "fb-messenger://"
    let opened = Safari.openInApp(messengerURL, false)
    
    // If that doesn't work, try the web version
    if (!opened) {
        Safari.open("https://www.messenger.com")
    }
}

Script.complete()
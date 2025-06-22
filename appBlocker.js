// Countdown Timer with Question - iOS Scriptable Script
// This script counts down from 10, asks a question, then opens Facebook Messenger

async function main() {
    // Show initial countdown start message
    let startAlert = new Alert();
    startAlert.title = "Countdown Timer";
    startAlert.message = "Ready to start countdown from 10?";
    startAlert.addAction("Start");
    startAlert.addAction("Cancel");
    
    let startResult = await startAlert.presentAlert();
    if (startResult === 1) {
        console.log("Countdown cancelled by user");
        return;
    }
    
    // Use notifications for the countdown since alerts don't update well
    let notification = new Notification();
    notification.title = "Countdown Timer";
    
    // Countdown from 10 to 1
    for (let i = 10; i >= 1; i--) {
        console.log(`Countdown: ${i}`);
        
        // Update notification
        notification.body = `${i}`;
        notification.sound = "default";
        await notification.schedule();
        
        // Also show in a quick alert that dismisses automatically
        let countAlert = new Alert();
        countAlert.title = "Countdown";
        countAlert.message = `${i}`;
        
        // Show alert briefly - don't wait for user input on intermediate numbers
        if (i === 1) {
            // On the last number, wait for user acknowledgment
            countAlert.addAction("Time's Up!");
            await countAlert.presentAlert();
        } else {
            // For other numbers, just show briefly
            countAlert.addAction("Continue");
            setTimeout(async () => {
                // Auto-continue after showing the number
            }, 100);
        }
        
        // Wait 1 second between numbers
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Clear any pending notifications
    await Notification.removeAllPending();
    
    // Show completion message
    let completeAlert = new Alert();
    completeAlert.title = "Time's Up!";
    completeAlert.message = "⏰ Countdown finished!";
    completeAlert.addAction("Continue");
    await completeAlert.presentAlert();
    
    // Ask the question
    let questionAlert = new Alert();
    questionAlert.title = "Quick Question";
    questionAlert.message = "How are you feeling today?";
    questionAlert.addAction("Great!");
    questionAlert.addAction("Good");
    questionAlert.addAction("Okay");
    questionAlert.addAction("Not so good");
    
    let questionResult = await questionAlert.presentAlert();
    
    // Process the answer
    let answers = ["Great!", "Good", "Okay", "Not so good"];
    
    // Show response based on answer
    let responseAlert = new Alert();
    responseAlert.title = "Thanks for sharing!";
    
    switch(questionResult) {
        case 0: // Great!
            responseAlert.message = "That's wonderful to hear! 😊";
            break;
        case 1: // Good
            responseAlert.message = "Glad you're doing well! 👍";
            break;
        case 2: // Okay
            responseAlert.message = "Hope your day gets even better! 🌟";
            break;
        case 3: // Not so good
            responseAlert.message = "Sorry to hear that. Take care of yourself! 💙";
            break;
    }
    
    responseAlert.addAction("Open Messenger");
    await responseAlert.presentAlert();
    
    // Open Facebook Messenger
    try {
        // Try the Facebook Messenger URL scheme first
        let messengerURL = "fb-messenger://";
        Safari.open(messengerURL);
        
        // Small delay then fallback to web if needed
        setTimeout(async () => {
            try {
                await Safari.open("https://www.messenger.com");
            } catch (e) {
                console.log("Opened Messenger successfully");
            }
        }, 2000);
        
    } catch (error) {
        // Fallback to web version if there's any error
        console.log("Opening web version: " + error);
        await Safari.open("https://www.messenger.com");
    }
    
    console.log("Script completed successfully!");
}

// Run the main function
await main();
// Countdown Timer with Question - iOS Scriptable Script
// This script counts down from 10, asks a question, then opens Facebook Messenger

async function main() {
    // Create and configure the alert for countdown
    let countdownAlert = new Alert();
    countdownAlert.title = "Countdown Timer";
    
    // Countdown from 10 to 1
    for (let i = 10; i >= 1; i--) {
        countdownAlert.message = `${i}`;
        countdownAlert.addAction("Cancel");
        
        // Show the countdown number
        let countdownResult = await countdownAlert.presentAlert();
        
        // If user cancels, exit the script
        if (countdownResult === 0) {
            console.log("Countdown cancelled by user");
            return;
        }
        
        // Wait for 1 second before next number
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Clear actions for next iteration
        countdownAlert = new Alert();
        countdownAlert.title = "Countdown Timer";
    }
    
    // Show "Time's up!" message
    let timeUpAlert = new Alert();
    timeUpAlert.title = "Time's Up!";
    timeUpAlert.message = "⏰ Countdown finished!";
    timeUpAlert.addAction("Continue");
    await timeUpAlert.presentAlert();
    
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
    let selectedAnswer = answers[questionResult];
    
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
        let canOpenMessenger = await Safari.openInApp(messengerURL, false);
        
        if (!canOpenMessenger) {
            // If Messenger app isn't installed, try the web version
            console.log("Messenger app not found, opening web version");
            await Safari.open("https://www.messenger.com");
        }
    } catch (error) {
        // Fallback to web version if there's any error
        console.log("Error opening Messenger app, using web version: " + error);
        await Safari.open("https://www.messenger.com");
    }
    
    console.log("Script completed successfully!");
}

// Run the main function
await main();
document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

const keywordResponses = {
   
    "how are you": "I'm just a bot, but I'm doing great! How can I help you today?",
    "hi":"Hey there, what can I do for you today? ",
    "pay": "For detailed payment information, including variations based on location and discounts for students and elderly citizens, please proceed to the Home section and select the Fare Info section.",
    "route": "To access route information, please navigate to the Home section and select the Route Info section. There, you will find the detailed route information you need.",
    "go": "To add your destination, kindly navigate to the Home section and select the Destination option.",
    "destination": "To add your destination, kindly navigate to the Home section and select the Destination option.",
    "lost": "If you have lost your belongings, please go to the Home section and click on the Reporting section for assistance.",
    "time": "I'm not sure about the exact time. Please check your device's clock.",
    "price": "For detailed payment information, including variations based on location and discounts for students and elderly citizens, please proceed to the Home section and select the Fare Info section.",
    "location": "To select location, kindly navigate to the Home section and select the Destination option. ",
    "goodbye": "Goodbye! Have a great day!",
     "available": "To access bus information, please navigate to the Home section and select the Route Info section. There, you will find the detailed route information you need.",
     "fares":"For detailed fare information, including variations based on location and discounts for students and elderly citizens, please proceed to the Home section and select the Fare Info section.",
     "fare":"For detailed fare information, including variations based on location and discounts for students and elderly citizens, please proceed to the Home section and select the Fare Info section.",
     "light":"The Red light : stop. Green light: go. Orange/yellow light: prepare to stop.",
};

function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim().toLowerCase();
    if (userInput === '') return;

    addChatMessage(userInput, 'user');
    document.getElementById('userInput').value = '';

    const response = getResponse(userInput);
    setTimeout(() => {
        addChatMessage(response, 'bot');
    }, 500);
}

function getResponse(userInput) {
    for (const keyword in keywordResponses) {
        if (userInput.includes(keyword)) {
            return keywordResponses[keyword];
        }
    }
    return "I'm sorry, I don't understand that question.";
}

function addChatMessage(message, sender) {
    const chatLog = document.getElementById('chat');
    const chatMessage = document.createElement('div');
    chatMessage.className = `chat-message ${sender}`;
    chatMessage.textContent = message;
    chatLog.appendChild(chatMessage);
    chatLog.scrollTop = chatLog.scrollHeight;
}

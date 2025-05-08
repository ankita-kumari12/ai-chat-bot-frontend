const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");


// appent message to existing message...
const appendMessage = (text, isUser = false) => {
  const message = document.createElement("div");
  message.className = `w-fit max-w-[75%] px-4 py-2 rounded-2xl shadow-md  text-base whitespace-pre-wrap break-words ${
    isUser
      ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white self-end ml-auto"
      : "bg-white text-gray-800 border border-gray-200"
  }`;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

// adding eventlistener to button...
sendBtn.addEventListener("click", async () => {
  const prompt = userInput.value.trim();
  // console.log("user input:", prompt);

  if (!prompt) {
    console.log("Please provide a prompt.");
    return;
  }
  appendMessage(prompt, true);
  userInput.value = "";


  try {
    const aiResponseRaw = await fetch(`https://bot-ai-2z06.onrender.com/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: prompt }),
    });

    const aiResponse = await aiResponseRaw.json();
    const aiChat = aiResponse?.response;

    // console.log("response from ai:", aiChat);

    appendMessage(aiChat);
  } catch (error) {
    console.log("Something went wrong, try again.", error);
  }
});

// adding eventlistener to 'enter' key..
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

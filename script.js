const chatForm = document.getElementById("chatForm");
const chatBox = document.getElementById("chatBox");
const queryInputRef = document.getElementById("query");


function typeEffect(element, text, speed = 4) {
  let i = 0;
  element.innerHTML = "<b>Answer:</b> ";
  const timer = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

async function getQueryAnswer() {
  try {
    const query = queryInputRef.value.trim();
    if (!query) return;


    chatBox.innerHTML += `<p class="user"><b>Arslan:</b> ${query}</p>`;

    
    const botMsg = document.createElement("p");
    botMsg.innerHTML = "<b>Typing:</b> ...typing";
    chatBox.appendChild(botMsg);

    const res = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            parts: [
                     {
                        text: "You are an Expert in Networking Software.  You will answer only Networking Software related queries.  If the user asks about anything outside Networking Software, you must strictly reply with: 'I don't know'.  The user may ask questions in any programming language or natural language."
                   },
              {
                 text: query

               },
            ],
          },
        ],
      },
      {
        headers: {
          "X-goog-api-key": "AIzaSyCZXerMjJRxePtH9vtLBhUFImlr6VomPyg",
          "Content-Type": "application/json",
        },
      }
    );

    const answer = res.data.candidates[0].content.parts[0].text;

    
    typeEffect(botMsg, answer, 0 );

    
    queryInputRef.value = "";

    
    chatBox.scrollTop = chatBox.scrollHeight;

    

  } catch (err) {
    console.error(err);
    alert("Something went wrong, please check your internet connection.");
  }
}
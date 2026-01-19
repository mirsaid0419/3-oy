const socket = io("http://localhost:3000");

const input = document.getElementById("msg-input");
const button = document.getElementById("send-btn");
const chatArea = document.getElementById("chat-messages");

socket.on("connect", () => {
  console.log("beckendga uladim");
});

button.addEventListener("click", () => {
  if (input.value.trim() !== "") {
    const p = document.createElement("p");
    p.classList.add("outgoing");
    p.innerText = input.value;
    chatArea.appendChild(p);

    socket.emit("sms", input.value);
    input.value=""
  }
});

socket.on("javob", (data) => {
  const p = document.createElement("p");
  p.classList.add("incoming");
  p.innerText = data;
  chatArea.appendChild(p);
});

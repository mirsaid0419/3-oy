const navbarList = document.querySelector(".navbar-list");
const iframesList = document.querySelector(".iframes-list");
const channel = document.querySelector(".channel");
const search_btn_hover_after = document.querySelector(
  ".search-btn-hover-after"
);

async function getAllUsers() {
  let allUser = await axios.get("http://10.10.1.20:2020/api/users/users");
  allUser = allUser.data.data;
  for (const element of allUser) {
    navbarList.innerHTML += `<li onclick='chat(${element.id},"${element.user_name}","${element.avatar}"); toggleChat()' class="channel" data-id="${element.id} ">
    <a>
    <img
    src="http://10.10.1.20:2020/api/files/files/${element.avatar}"
    alt="channel-icon"
    width="30px"
    height="30px"
    />
    <span>${element.user_name}</span>
    </a>
    </li>`;
  }
}
async function getAllFiles() {
  // inputSearch.value=search;
  iframesList.innerHTML = "";
  let getAllFiles = await axios.get(
    `http://10.10.1.20:2020/api/files/?title=${search}`
  );
  getAllFiles = getAllFiles.data.data;
  for (const element of getAllFiles) {
    iframesList.innerHTML += `<li class="iframe">
              <video
                src="http://10.10.1.20:2020/api/files/files/${element.file_name}"
                controls=""
              ></video>
              <div class="iframe-footer">
                <img
                  src="http://10.10.1.20:2020/api/files/files/${element.user.avatar}"
                  alt="channel-icon"
                />
                <div class="iframe-footer-text">
                  <h2 class="channel-name">${element.user.name}</h2>
                  <h3 class="iframe-title">${element.title}</h3>
                  <time class="uploaded-time">${element.created_at}</time>
                  <a class="download" href="#">
                    <span>${element.size} MB</span>
                    <img src="./img/download.png" />
                  </a>
                </div>
              </div>
            </li>`;
  }
}
async function avatarImg() {
  const avatar = window.localStorage.getItem("avatar");
  if (avatar) {
    const path = `http://10.10.1.20:2020/api/files/files/${avatar}`;
    list.innerHTML += `<img
              class="avatar-img"
              src=${path}
              alt="avatar-img"
              width="32px"
              height="32px"
            />`;
  } else {
    list.innerHTML += `<img
      class="avatar-img"
      src="./img/avatar.jpg"
      alt="avatar-img"
      width="32px"
      height="32px"
    />`;
  }
}

let search = "";
async function voice() {
  const voic = new SpeechRecognition();
  voic.start();
  voic.lang = "uz-Uz";

  voic.onresult = (e) => {
    search = e.results[0][0].transcript;
    iframesList.innerHTML = "";
    getAllFiles();
  };
}
lupa.addEventListener("click", async (e) => {
  e.preventDefault();

  search = inputSearch.value;
  getAllFiles();
});

list.addEventListener("click", () => {
  const token = window.localStorage.getItem("accesToken");
  if (!token) {
    window.location = "/register";
  } else {
    window.location = "/admin";
  }
});

const chatHeader = document.querySelector(".chat-header");
const chatBody = document.querySelector(".chat-body");
const chatInput = document.querySelector("#chatInput");
const inpFile = document.querySelector("#inpFile");
const server = io("http://10.10.1.20:2020/chat", {
  auth: { token: localStorage.getItem("accesToken") },
});
server.on("connect", () => {
  console.log("connect");
});

async function send() {
  const file = inpFile.files[0];
  let text = chatInput.value;
  // console.log(file)
  if (file) {
    try {
      const file_name = String(Date.now() + "." + file.name.split(".").at(-1));
      const formFile = new FormData();
      formFile.append("file", file);
      formFile.append("file_name", file_name);
      formFile.append("message", text);
      const { data } = await axios.post(
        `http://10.10.1.20:2020/api/messages/create/${window.to_id}`,
        formFile,
        {
          headers: { token: localStorage.getItem("accesToken") },
        }
      );
      if (data.status == 201) {
        server.emit("send_msg", {
          id: window.to_id,
          message: text,
          file_name,
          file_type: file.type,
        });
        let media = file.type.startsWith("image")
          ? `<img src="http://10.10.1.20:2020/api/files/files/${file_name}" style="max-width:200px; border-radius: 8px; display: block;" alt="">`
          : `<video src="http://10.10.1.20:2020/api/files/files/${file_name}" controls style="max-width:200px; border-radius: 8px; display: block;"></video>`;
        chatBody.innerHTML += `
          <div class="message me">
            ${media}
            ${text ? `<div style="margin-top:5px;">${text}</div>` : ""}
          </div>`;
        chatInput.value = "";
        inpFile.value = "";

        setTimeout(() => {
          chatBody.scrollTop = chatBody.scrollHeight;
        }, 200);
        
        chatInput.focus();
      }
    } catch (error) {
      console.log(error);
    }
  } else if (!text) {
    alert("text mavjud emas");
    return;
  } else {
    try {
      const { data } = await axios.post(
        "http://10.10.1.20:2020/api/messages/create/" + window.to_id,
        { message: text },
        {
          headers: { token: localStorage.getItem("accesToken") },
        }
      );
      if (data.status == 201) {
        server.emit("send_msg", {
          id: window.to_id,
          message: text,
          file_name: "",
          file_type: "",
        });
        chatBody.innerHTML += `<div class="message me">${text}</div>`;
        setTimeout(() => {
          chatBody.scrollTop = chatBody.scrollHeight;
          chatInput.focus();
        }, 200);
        chatInput.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  }
}

server.on("receive_msg", (data) => {
  console.log(data);
  // console.log(window.to_id)
  let content;
  if (data.from_id == window.to_id) {
    content = `<p style="margin-top:5px;">${data.message}</p>`;

    if (data.file_name) {
      const fileUrl = `http://10.10.1.20:2020/api/files/files/${data.file_name}`;
      content =
        data.file_type.split("/")[0] == "image"
          ? `<img src="${fileUrl}" style="max-width:200px;">`
          : `<video src="${fileUrl}" controls style="max-width:200px;"></video>`;
      content += data.message || `<br>${data.message}`;
    }
    chatBody.innerHTML += `<div class="message other">${content}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  }
});

async function chat(id, name, avatar) {
  chatBody.innerHTML = "";
  window.to_id = id;
  server.emit("join_room", id);
  try {
    const { data } = await axios.get(
      "http://10.10.1.20:2020/api/messages/messages/" + id,
      {
        headers: { token: localStorage.getItem("accesToken") },
      }
    );

    chatHeader.innerHTML = `<div class="chat-header">
  <img
              id="chatUserAvatar"
              src="http://10.10.1.20:2020/api/files/files/${avatar}"
            />
            <span id="chatUserName">${name}</span>`;

    for (const element of data) {
      if (element.file_name != null) {
        const fileUrl = `http://10.10.1.20:2020/api/files/files/${element.file_name}`;
        let file;
        if (element.file_type == "image") {
          file = `<img src="${fileUrl}" style="max-width:200px;">`;
        } else {
          file = `<video src="${fileUrl}" controls style="max-width:200px;"></video>`;
        }

        if (element.to_id == id) {
          chatBody.innerHTML += `<div class="message me">${file}${
            element.message ? `<div style="margin-top:5px;">${element.message}</div>` : ""
          }</div>`;
        } else {
          chatBody.innerHTML += `<div class="message other">${file}${
            element.message ? `<div style="margin-top:5px;">${element.message}</div>` : ""
          }</div>`;
        }
      } else if (element.to_id == id) {
        chatBody.innerHTML += `<div class="message me">${element.message}</div>`;
      } else {
        chatBody.innerHTML += `<div class="message other">${element.message}</div>`;
      }
    }
    setTimeout(() => {
      chatBody.scrollTop = chatBody.scrollHeight;
      chatInput.focus();
    }, 300);
    // chatBody.scrollTop = chatBody.scrollHeight;
  } catch (error) {
    console.log(error.response);
  }
}

function toggleChat() {
  const sidebar = document.getElementById("chatSidebar");
  const arrow = document.getElementById("arrowIcon");

  // Chatni ochish yoki yopish
  sidebar.classList.toggle("active");

  // Strelkani yo'nalishini o'zgartirish
  if (sidebar.classList.contains("active")) {
    arrow.innerText = "❯"; // Ochiqligida o'ngga
  } else {
    arrow.innerText = "❮"; // Yopiqligida chapga
  }
}

avatarImg();
getAllUsers();
getAllFiles();

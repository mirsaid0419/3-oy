const navbarList = document.querySelector(".navbar-list");
const iframesList = document.querySelector(".iframes-list");
const search_btn_hover_after = document.querySelector(
  ".search-btn-hover-after"
);

async function getAllUsers() {
  let allUser = await axios.get("http://localhost:2020/api/users/users");
  allUser = allUser.data.data;
  for (const element of allUser) {
    navbarList.innerHTML += `<li class="channel" data-id="1">
    <a href="#">
    <img
    src="http://localhost:2020/api/files/files/${element.avatar}"
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
    `http://localhost:2020/api/files/?title=${search}`
  );
  getAllFiles = getAllFiles.data.data;
  for (const element of getAllFiles) {
    iframesList.innerHTML += `<li class="iframe">
              <video
                src="http://localhost:2020/api/files/files/${element.file_name}"
                controls=""
              ></video>
              <div class="iframe-footer">
                <img
                  src="http://localhost:2020/api/files/files/${element.user.avatar}"
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
    const path = `http://localhost:2020/api/files/files/${avatar}`;
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



avatarImg();
getAllUsers();
getAllFiles();

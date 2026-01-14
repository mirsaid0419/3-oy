async function UploaVideo(e) {
  e.preventDefault();
  if(!window.localStorage.getItem("accesToken")){
    window.location("/login")
  }

  const data = new FormData();
  data.append("file", uploadInput.files[0]);
  data.append("title", videoInput.value);

  try {
    const NewData = await axios.post(
      "http://localhost:2020/api/files/save",
      data,
      { headers: { token: window.localStorage.getItem("accesToken") } }
    );

    alert("file yuklandi");
    location.reload();
  } catch (error) {
    alert("yuklashda hatolik");
    location.reload();
  }
}
submitButton.onclick = UploaVideo;

async function getAllUserVideos() {
  const token = window.localStorage.getItem("accesToken");
  let getAllFiles = await axios.get("http://localhost:2020/api/files/files", {
    headers: { token: token },
  });
  getAllFiles = getAllFiles.data.data;
  videosList.innerHTML = "";
  for (const element of getAllFiles) {
    videosList.innerHTML += `<li class="video-item">
                    <video 
                        controls 
                        src="http://localhost:2020/api/files/files/${element.file_name}">
                    </video>
                    <img 
                    class="delete-icon" 
                    src ="http://localhost:2020/api/files/files/delete.png"
                    width = "25"
                    onclick="deleteVideo(${element.id})">
                    
                    <p class = "content">${element.title}</p>
                </li>    `;
  }
}
async function deleteVideo(id) {
  try {
    await axios.delete(`http://localhost:2020/api/files/files/${id}`, {
      headers: { token: window.localStorage.getItem("accesToken") },
    });
    location.reload();
  } catch (error) {
    alert("O'chirishda hatolik");
    location.reload();
  }
}

getAllUserVideos();
async function logoutBtn() {
  window.localStorage.removeItem("accesToken");
  window.localStorage.removeItem("avatar");
  window.location.href = "/login";
}
logoutBtn.onclick = logoutBtn;

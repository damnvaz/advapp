import {
  ArrowBack,
  ChatMessage,
  Input,
  Loading,
  PageTitle,
} from "../../components/index.js";
import { baseRequest } from "../../queries/base.js";
import { translations } from "../../translations/index.js";
import { isUserNotLogged } from "../../utils/checkSession.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";

async function showPageContent() {
  Loading(true);

  isUserNotLogged();

  const user = JSON.parse(localStorage.getItem("userSession"));
  const lang = checkUserLanguage();

  let receiverId = window.location.href.split("chat.html?id=")[1];
  let userData = await baseRequest({
    id: receiverId,
    req: "get_user_by_id",
  });
  userData = await userData.result;

  document.getElementById("content").innerHTML = `
      <section class="section-area">
        <div class="content">
          ${ArrowBack()}
          <div class="top-content">
            <div class="top-content">
              <img 
                class="profile-icon"
                src="assets/icons/no-user.svg"
                alt="profile icon"
              />
              ${PageTitle(userData.name.split(" ")[0], "", "chat_user_name")}
            </div>
            <div class="top-content">
              <img 
                class="search-icon"
                src="assets/icons/search.svg"
                alt="search icon"
                id="search_icon"
              />
              <img 
                class="refresh-icon"
                src="assets/icons/refresh.svg"
                alt="refresh icon"
                id="refresh_icon"
              />

            </div>
          </div>

          <input
            type="search"
            placeholder="${"buscar mensagem"}"
            class="form-control input search-bar"
            style="display: none; margin: 30px auto; width: 100%;"
            maxLength="180"
            id="search_bar"
            required />
          
  
          <div class="subcontent" id="messages_area">
            
          </div>

          <div class="form-content p-3" 
            style="
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #fdfdfd;
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.35));
            ">

            <div style="
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              padding: 2px 5px;
              width: 95%;
              max-width: 400px;
              margin: 0px auto;
            ">
              <div style="display: table; width: 70%;">
              ${Input(
                "new_chat_your_message",
                "sua mensagem aqui",
                "text",
                "150",
                null
              )}
              </div>
              <div style="display: table; width: 20%"> 
                <button
                    class="button"
                    style="width: 100%; 
                      background-color: var(--button-green); 
                      color: #fff; border: 1px solid var(--button-green) !important;""
                    type="button"
                    id="send_message"
                >
                    ${"enviar"}
                </button>
              </div>
            </div>
            
          </div><br/>

        </div>
      </section>
    `;

  retriveMessages(user.id);

  document.querySelector("#search_icon").addEventListener("click", () => {
    if (document.querySelector("#search_bar").style.display === "none") {
      document.querySelector("#search_bar").style.display = "table";
      return;
    }

    document.querySelector("#search_bar").style.display = "none";
  });

  document.querySelector("#chat_user_name").addEventListener("click", () => {
    window.location.href = "user-details.html?id=" + receiverId;
  });

  document.querySelector("#refresh_icon").addEventListener("click", () => {
    retriveMessages(user.id);
  });

  document.querySelector("#send_message").addEventListener("click", () => {
    sendMessage(user.id);
  });

  document.querySelector("#search_bar").addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
      const searchMessage = document.querySelector("#search_bar").value;
      retriveMessagesBySearch(searchMessage, user.id);
    }
  });

  Loading(false);
}
showPageContent();

async function retriveMessages(userid) {
  Loading(true);

  const lang = checkUserLanguage();

  let messages = await baseRequest({
    id: userid,
    req: "get_messages",
  });

  messages = messages.result;

  if (messages.length === 0) {
    Loading(false);
    return [];
  }

  let receiverId = window.location.href.split("chat.html?id=")[1];

  let messagesArr = [];
  for (let i = 0; i < messages.length; i++) {
    let req = await baseRequest({
      id: messages[i].senderId,
      req: "get_user_by_id",
    });
    req = await req.result;

    if (userid === messages[i].senderId) {
      messagesArr.push({
        username: translations(lang)?.chats_page_you,
        time: messages[i].createdAt,
        message: messages[i].message,
        userid: userid,
      });
    }

    if (receiverId === messages[i].senderId) {
      let req = await baseRequest({
        id: receiverId,
        req: "get_user_by_id",
      });
      req = req.result;

      messagesArr.push({
        username: req.name,
        time: messages[i].createdAt,
        message: messages[i].message,
        userid: receiverId,
      });
    }
  }

  Loading(false);
  document.querySelector("#messages_area").innerHTML = ChatMessage(
    messagesArr,
    userid,
    false
  );
}

async function sendMessage(userid) {
  let receiverId = window.location.href.split("chat.html?id=")[1];
  let message = document.querySelector("#new_chat_your_message").value;
  let currentTime = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split(".")[0]
    .substring(0, 16);

  await baseRequest({
    senderId: userid,
    receiverId: receiverId,
    message: message.trim(),
    createdAt: currentTime,
    req: "send_message",
  });

  document.querySelector("#new_chat_your_message").value = "";
  retriveMessages(userid);
}

async function retriveMessagesBySearch(message, userid) {
  if (message === "") {
    retriveMessages(userid);
    return;
  }

  let messagesArr = [];
  let users = document.querySelectorAll(".chat-message-message");
  message = message.toLowerCase();

  for (let i = 0; i < users.length; i++) {
    let userName = document.querySelectorAll(".chat-message-message")[i]
      .innerHTML;
    if (userName.toLowerCase().includes(message)) {
      messagesArr.push({
        username: document.querySelectorAll(".chat-message-username")[i]
          .innerHTML,
        time: document.querySelectorAll(".chat-message-time")[i].innerHTML,
        message: document.querySelectorAll(".chat-message-message")[i]
          .innerHTML,
        userid: document.querySelectorAll(".chat-message-user-id")[i].innerHTML,
      });
    }
  }

  document.querySelector("#messages_area").innerHTML = ChatMessage(
    messagesArr,
    userid,
    false
  );
}

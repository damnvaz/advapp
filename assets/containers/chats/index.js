import { ChatRow } from "../../components/chat-row/index.js";
import {
  ArrowBack,
  Bottombar,
  Loading,
  PageTitle,
} from "../../components/index.js";
import { baseRequest } from "../../queries/base.js";
import { translations } from "../../translations/index.js";
import { isUserNotLogged } from "../../utils/checkSession.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";

function SearchBar(id, placeholder) {
  return `
  <input
    type="search"
    placeholder="${placeholder}"
    class="form-control input search-bar"
    maxLength="180"
    id="${id}"
    required />
  `;
}

async function showPageContent() {
  Loading(true);

  isUserNotLogged();

  const user = JSON.parse(localStorage.getItem("userSession"));

  const lang = checkUserLanguage();

  const bottombarArr = [
    { url: "phone-client.html", icon: "phone" },
    { url: "email-client.html", icon: "email" },
    { url: "community.html", icon: "community" },
    { url: "new-chat.html", icon: "add" },
  ];

  document.getElementById("content").innerHTML = `
      <section class="section-area">
        <div class="content">
          ${ArrowBack()}
          <div class="top-content">
            ${PageTitle(translations(lang)?.chats_page_title)}
            <img 
              class="refresh-icon"
              src="assets/icons/refresh.svg"
              alt="refresh icon"
              id="refresh_icon"
            />
          </div>
          ${SearchBar(
            "search_bar",
            translations(lang)?.chats_page_searchbar_placeholder
          )}
  
          <div class="subcontent" id="messages-list"></div>

          ${Bottombar(bottombarArr)}
        </div>
      </section>
    `;

  document.querySelector("#search_bar").addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
      const searchUser = document.querySelector("#search_bar").value;
      retriveMessagesByUsernameSearch(searchUser, user.id, lang);
    }
  });

  document.querySelector("#refresh_icon").addEventListener("click", (e) => {
    retriveMessages(user.id, lang);
  });

  retriveMessages(user.id, lang);

  Loading(false);
}
showPageContent();

async function retriveMessages(userid, lang) {
  Loading(true);

  let messages = await baseRequest({
    id: userid,
    req: "get_messages",
  });

  messages = messages.result;

  if (messages.length === 0) {
    document.querySelector("#messages-list").innerHTML = `
      <span class="no-messages">${
        translations(lang)?.chats_page_nomessages
      }</span>
    `;
    Loading(false);
    return;
  }

  const messagesSorted = sortMessagesOlderToNewer(messages);

  // const receiverArr = groupByUser(messagesSorted, (item) => item.receiverId);
  // const senderArr = groupByUser(messagesSorted, (item) => item.senderId);
  // const concatArr = [...receiverArr, ...senderArr];

  let cardsPeople = [];

  for (let i = 0; i < messagesSorted.length; i++) {
    if (userid !== messagesSorted[i].senderId) {
      let req = await baseRequest({
        id: messagesSorted[i].senderId,
        req: "get_user_by_id",
      });
      req = req.result;

      cardsPeople.push({
        username: req.name,
        time: messagesSorted[i].createdAt,
        message: messagesSorted[i].message,
        userid: messagesSorted[i].senderId,
      });
    }
  }

  // const messagesArr = removeDuplicates(cardsPeople, "username");

  document.querySelector("#messages-list").innerHTML = ChatRow(cardsPeople);

  Loading(false);
}

function sortMessagesOlderToNewer(messages) {
  return messages.sort(function (a, b) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

function groupByUser(data, key) {
  return [...new Map(data.map((item) => [key(item), item])).values()];
}

function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

async function retriveMessagesByUsernameSearch(clientName, userId, lang) {
  let messagesArr = [];

  let users = document.querySelectorAll(".chat-row-username");

  if (users.length === 0) {
    document.querySelector("#messages-list").innerHTML = `
      <span class="no-messages">${
        translations(lang)?.chats_page_nomessages
      }</span>
    `;
    return;
  }

  if (clientName === "") {
    retriveMessages(userId);
    return;
  }

  clientName = clientName.toLowerCase();

  for (let i = 0; i < users.length; i++) {
    let userName = document.querySelectorAll(".chat-row-username")[i].innerHTML;
    if (userName.toLowerCase().includes(clientName)) {
      messagesArr.push({
        username: document.querySelectorAll(".chat-row-username")[i].innerHTML,
        time: document.querySelectorAll(".chat-row-time")[i].innerHTML,
        message: document.querySelectorAll(".chat-row-message")[i].innerHTML,
        userid: document.querySelectorAll(".chat-row-user-id")[i].innerHTML,
      });
    }
  }

  document.querySelector("#messages-list").innerHTML = ChatRow(messagesArr);
}

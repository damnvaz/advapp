import {
  ArrowBack,
  Bottombar,
  Loading,
  PageTitle,
  ChatRow,
  UserRow,
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

  const users = [
    {
      userid: "1",
      username: "Anderson",
      document: "123.123.123-21",
      status: "Ativo",
    },
    {
      userid: "2",
      username: "Amanda",
      document: "111.222.333-12",
      status: "Inativo",
    },
  ];

  document.getElementById("content").innerHTML = `
      <section class="section-area">
        <div class="content">
          <div class="top-content">
            ${ArrowBack()}

            <span 
              id="new_user"
              class="new-user-icon"
              onclick="window.location.href='new-client.html'"
            >
              Novo
            </span>
          </div>
            ${PageTitle(translations(lang)?.users_page_title)}
            ${SearchBar("search_bar", translations(lang)?.users_page_searchbar)}
  
          <div class="subcontent" id="messages-list">
            ${UserRow(users)}
          </div>

        </div>
      </section>
    `;

  document.querySelector("#new_user").addEventListener("click", (e) => {});

  // retriveMessages(user.id, lang);

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

  const messagesArr = removeDuplicates(cardsPeople, "username");

  document.querySelector("#messages-list").innerHTML = ChatRow(messagesArr);
  Loading(false);
}

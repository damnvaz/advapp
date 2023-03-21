import { ChatRow } from "../../components/chat-row/index.js";
import {
  ArrowBack,
  Bottombar,
  Button,
  Input,
  InputDataList,
  InputLabel,
  Loading,
  PageTitle,
  Select,
  Toast,
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

  const options = await retriveUsers(user.id);

  document.getElementById("content").innerHTML = `
      <section class="section-area">
        <div class="content">
          ${ArrowBack()}
          ${PageTitle(translations(lang)?.email_client_page)}
          
  
          <div class="subcontent" >
            <div class="form-content p-3">
              ${InputLabel(translations(lang)?.new_chat_page_who_to_send)}
              ${InputDataList(
                "new_chat_who_to_send",
                options,
                translations(lang)?.new_chat_page_no_clients
              )}
            </div><br/>
            
            <div class="form-content p-3">
              ${InputLabel(translations(lang)?.new_chat_page_your_message)}
              ${Input("new_chat_your_message", "", "text", "150", null)}
            </div><br/>

            <div class="form-content mb-2 p-3" style="display: table; margin: 20px auto;">
              ${Button(
                translations(lang)?.new_chat_send_button,
                null,
                "send_message",
                "green"
              )}
            </div>
          </div>
        </div>
      </section>
    `;

  document.querySelector("#send_message").addEventListener("click", () => {
    if (options.length === 0) {
      Toast("danger", translations(lang)?.new_chat_validation_no_clients);
      return;
    }

    sendMessage();
  });

  Loading(false);
}
showPageContent();

async function retriveUsers(userid) {
  Loading(true);

  let messages = await baseRequest({
    id: userid,
    req: "clients_by_user_id",
  });

  messages = messages.result;

  if (messages.length === 0) {
    Loading(false);
    return [];
  }

  Loading(false);
  return messages;
}

async function sendMessage() {
  let email = document.querySelector("#new_chat_who_to_send").value;
  let message = document.querySelector("#new_chat_your_message").value;

  window.open(`mailto:${email}?body=${message}`, "_blank");
}

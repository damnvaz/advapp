import { ArrowBack, Loading, PageTitle } from "../../components/index.js";
import { baseRequest } from "../../queries/base.js";
import { translations } from "../../translations/index.js";
import { isUserNotLogged } from "../../utils/checkSession.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";

async function showPageContent() {
  Loading(true);

  isUserNotLogged();

  const user = JSON.parse(localStorage.getItem("userSession"));

  let req = await baseRequest({
    id: user.id,
    req: "notifications_by_user_id",
  });
  req = req.result;
  

  const lang = checkUserLanguage();

  let items = "";
  if (req.length === 0) {
    items = `<span class="no-messages">${translations(lang)?.notifications_page_nomessages}</span>`
  } else  {
      for (let i = 0; i < req.length; i++) {
        items += `
            <span 
                class="message ${req[i].wasRead === 1 ? "was-read" : ""}"
                id="message-${req[i].id}"
                >
                ${req[i].message}
            </span>
          `;
      }
  }

  document.getElementById("content").innerHTML = `
      <section class="section-area">
        <div class="content">
          ${ArrowBack()}
          ${PageTitle(translations(lang)?.notifications_page_title)}
  
          <div class="notifications-subcontent">
                ${items}
          </div>
        </div>
      </section>
    `;

  for (let i = 0; i < req.length; i++) {
    document.querySelector(`#message-${i}`).addEventListener("click", () => {
      updateMessage(i);

      window.location.href = req[i].url;
    });
  }

  Loading(false);
}
showPageContent();

async function updateMessage(id) {
  await baseRequest({
    id: id,
    req: "update_notification",
  });
}

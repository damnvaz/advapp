import { ArrowBack, Loading, PageTitle } from "../../components/index.js";
import { logout } from "../../queries/base.js";
import { translations } from "../../translations/index.js";
import { isUserNotLogged } from "../../utils/checkSession.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";

async function showPageContent() {
  Loading(true);

  isUserNotLogged();

  const lang = checkUserLanguage();

  let list = [
    { title: translations(lang)?.settings_page_profile, url: "profile.html" },
    { title: translations(lang)?.settings_page_notifications, url: "notifications.html" },
    { title: translations(lang)?.settings_page_plans, url: "subscriptions.html" },
    { title: translations(lang)?.settings_page_contact, url: "support.html?page=contact" },
  ];

  let items = "";
  for (let i = 0; i < list.length; i++) {
    items += `
        <div class='settings-item'>
            <a href="${list[i].url}">
                <span class='settings-item-title'>${list[i].title}</span>
                <img src='assets/icons/chevron-right.svg'
                    alt='arrow icon' 
                    class='icon settings-item-img' 
                />
            </a>
        </div>
    `;
  }

  document.getElementById("content").innerHTML = `
      <section class="section-area">
        <div class="content">
          ${ArrowBack()}
          ${PageTitle(translations(lang)?.settings_page_title)}
  
          <div class="subcontent">
            ${items}
          </div>

          
          <span id='logout_button' class='logout'>${
            translations(lang)?.settings_page_leave_account
          }</span>
        </div>
      </section>
    `;

  document.querySelector("#logout_button").addEventListener("click", () => {
    logout();
  });

  Loading(false);
}
showPageContent();

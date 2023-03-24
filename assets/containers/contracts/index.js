import {
  ArrowBack,
  Bottombar,
  Loading,
  PageTitle,
  ChatRow,
  UserRow,
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

  document.getElementById("content").innerHTML = `
      <section class="section-area">
        <div class="content">
            ${ArrowBack()}
            ${PageTitle('Contratos')}
           
  
          <div class="subcontent" id="contracts-list">
          </div>

        </div>
      </section>
    `;

  Loading(false);
}

showPageContent();

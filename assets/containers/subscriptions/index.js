import {
  ArrowBack,
  Button,
  Loading,
  PageTitle,
  Toast,
} from "../../components/index.js";
import { baseRequest } from "../../queries/base.js";
import { translations } from "../../translations/index.js";
import { isUserNotLogged } from "../../utils/checkSession.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";

function Cards(arr) {
  let items = "";

  let cards = "";
  for (let i = 0; i < arr.length; i++) {
    let details = arr[i].details.split(",");
    items = "";
    for (let j = 0; j < details.length; j++) {
      items += `
        <span class="plan-detail" style="color: ${arr[i].color}">${details[
        j
      ].replaceAll('"', "")}</span>
      `;
    }

    cards += `
      <a class="outter-card"
        style="background-color: ${arr[i].bg}"
        href="subscription-details.html?id=${arr[i].id}">
        <div style="display: flex; flex-direction: row; justify-content: space-between;">
          <span 
            class="card-title"
            style="color: ${arr[i].color}"
            >${arr[i].title}</span>
          <span 
            class="card-title"
            style="color: ${arr[i].color}"
            >${arr[i].price}</span>
        </div>
        <br/>
        ${items}
        <br/>
        <span class="plan-detail-button" >detalhes</span>
      </a>
    `;
  }

  return cards;
}

async function showPageContent() {
  Loading(true);

  isUserNotLogged();

  const user = JSON.parse(localStorage.getItem("userSession"));

  let req = await baseRequest({
    req: "get_plans",
  });
  req = req.result;

  const lang = checkUserLanguage();

  document.getElementById("content").innerHTML = `
        <section class="section-area">
          <div class="content">
            ${ArrowBack()}
            ${PageTitle(translations(lang)?.plans_page_title)}
    
            <div class="subcontent">
                <span class="current-plan">${
                  translations(lang)?.plans_page_current_plan
                } <strong>${user?.currentPlan || "Silver"}</strong></span>
                
                ${Cards(req)}

            </div>
          </div>
        </section>
    `;

  Loading(false);
}
showPageContent();

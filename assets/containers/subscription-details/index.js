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

function Items(req) {
  let items;
  let details = req.details.split(",");
  items = "";
  for (let j = 0; j < details.length; j++) {
    items += `
        <li>${details[j].replaceAll('"', "")}</li>
      `;
  }

  return items;
}

function Price(req) {
  return `
    <div class="plan-price-row">
      <div class="plan-price-column">
        <span class="plan-price-title">de</span>
        <span class="plan-price-old">${req.oldPrice}</span>
      </div>

      <div class="plan-price-column">
        <span class="plan-price-title">por</span>
        <span class="plan-price-new">${req.price}</span>
      </div>
    </div>
  `;
}

function ButtonArea() {
  return `
    <div style='display: table; margin: 80px auto 50px auto;'>
      ${Button("contratar / renovar", null, "save_data_button", "green")}
    </div>
  `;
}

async function showPageContent() {
  Loading(true);

  isUserNotLogged();

  const user = JSON.parse(localStorage.getItem("userSession"));

  let req = await baseRequest({
    id: window.location.href.split("?id=")[1],
    req: "get_plan_by_id",
  });
  req = req.result;

  const lang = checkUserLanguage();

  document.getElementById("content").innerHTML = `
        <section class="section-area">
          <div class="content">
            ${ArrowBack()}
            ${PageTitle("", "", "subscription_details_title")}
    
            <div class="subcontent">
              <span class="current-plan">Com este plano, você poderá:</span>
                
              <ul class="plan-table">
                ${Items(req)}
              </ul>
              
              ${Price(req)}

              ${ButtonArea()}
            </div>
          </div>
        </section>
    `;

  document.querySelector("#subscription_details_title").innerHTML = req.title;

  document.querySelector("#save_data_button").addEventListener("click", () => {
    // show modal, get data and update user plan
  });

  Loading(false);
}
showPageContent();

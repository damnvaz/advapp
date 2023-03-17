import {
  ArrowBack,
  Footer,
  Input,
  PageTitle,
  TextArea,
} from "../../components/index.js";
import { baseRequest } from "../../queries/base.js";
import { translations } from "../../translations/index.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";

function form(lang) {
  return `
    ${Input(
      "talk_to_us_username",
      translations(lang)?.talktous_page_fullname,
      "text",
      "180",
      null
    )}
      ${TextArea(
        "talk_to_us_message",
        translations(lang)?.talktous_page_message,
        "text",
        "255",
        null
      )}
    `;
}

function buttons() {
  return `
    <div class='talktous-button-row'>
        <button type="button" class="talktous-button email" id="talk_to_us_email">
            email
        </button>
        <button type="button" class="talktous-button whatsapp" id="talk_to_us_whatsapp">
            whatsapp
        </button>
    </div> 
    `;
}

function showMessage() {
  let user = document.querySelector("#talk_to_us_username").value;
  let message = document.querySelector("#talk_to_us_message").value;
  return `Olá, meu nome é ${user}. ${message}`;
}

async function showPageContent() {
  const lang = checkUserLanguage();

  let req = await baseRequest({
    req: "get_platform",
  });

  req = req.result[0];

  Footer();
  
  document.querySelector("#content").innerHTML = `
  <section class="section-area">
      <div class="content">
          ${ArrowBack()}
          ${PageTitle(translations(lang)?.talktous_page_whoa)}

          <div style="width: 100%; display: table; margin: 60px auto; text-align: justify">
              ${form(lang)}
              ${buttons()}   
          </div>
      </div>
  </section>
  `;

  document
    .querySelector("#talk_to_us_whatsapp")
    .addEventListener("click", () => {
      let whatsapp = `https://wa.me/+55${req.phone.replace(
        /\D/g,
        ""
      )}?text=${showMessage()}`;
      window.location.href = whatsapp;
    });
  document.querySelector("#talk_to_us_email").addEventListener("click", () => {
    let email = `mailto:${req.email}?body=${showMessage()}`;
    window.location.href = email;
  });
}

showPageContent();

import {
  Footer,
  ArrowBack,
  PageTitle,
  Input,
  TextArea,
  Accordion,
} from "../../components/index.js";
import { baseRequest, convertDateDash } from "../../queries/base.js";
import { translations } from "../../translations/index.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";

async function showTermsPage() {
  let req = await baseRequest({
    req: "terms",
  });

  // get last update from terms
  req = req.result.slice(-1)[0];

  let el = `
      ${req.terms
        .replaceAll("<titulo>", "<strong>")
        .replaceAll("</titulo>", "</strong>")
        .replaceAll("<paragrafo>", "<p>")
        .replaceAll("</paragrafo>", "</p>")
        .replaceAll("\r\n", "<br/>")}
    `;

  const lang = checkUserLanguage();

  document.getElementById("content").innerHTML = `
    <section class="section-area">
      <div class="content">
          ${ArrowBack()}
          ${PageTitle(translations(lang)?.terms_page_title)}

          <p class="date-update">Data da última atualização: ${convertDateDash(
            req.version
          )}</p>

          <div style="width: 100%; display: table; margin: 60px auto; text-align: justify">
            ${el}
          </div>

      </div>
    </section>
    `;

  Footer();
}

async function showPoliciesPage() {
  let req = await baseRequest({
    req: "policies",
  });

  // get last update from policies
  req = req.result.slice(-1)[0];

  let el = `
        ${req.policy
          .replaceAll("<titulo>", "<strong>")
          .replaceAll("</titulo>", "</strong>")
          .replaceAll("<paragrafo>", "<p>")
          .replaceAll("</paragrafo>", "</p>")
          .replaceAll("\r\n", "<br/>")}
      `;

  const lang = checkUserLanguage();

  document.getElementById("content").innerHTML = `
      <section class="section-area">
        <div class="content">
            ${ArrowBack()}
            ${PageTitle(translations(lang)?.policies_page_title)}
  
            <p class="date-update">Data da última atualização: ${convertDateDash(
              req.version
            )}</p>
  
            <div style="width: 100%; display: table; margin: 60px auto; text-align: justify">
              ${el}
            </div>
        </div>
      </section>
      `;

  Footer();
}

async function showFAQPage() {
  let req = await baseRequest({
    req: "faq",
  });

  let el = "";
  for (let i = 0; i < req.result.length; i++) {
    el += Accordion(req.result[i].doubt, req.result[i].details, i);
  }

  const lang = checkUserLanguage();

  document.getElementById("content").innerHTML = `
      <section class="section-area">
        <div class="content">
          ${ArrowBack()}
          ${PageTitle(translations(lang)?.faq_page)}
  
          <div class="subcontent">
            ${el}
          </div>
        </div>
      </section>
    `;

  Footer();

  for (let i = 0; i < req.result.length; i++) {
    document
      .querySelector(`#accordion-title-${i}`)
      .addEventListener("click", () => {
        document.querySelector(`#accordioncontent${i}`).style.display =
          document.querySelector(`#accordioncontent${i}`).style.display ==
          "table"
            ? "none"
            : "table";
        document.querySelector(`#accordionimg${i}`).innerHTML =
          document.querySelector(`#accordioncontent${i}`).style.display ==
          "table"
            ? (document.querySelector(`#accordionimg${i}`).src =
                "assets/icons/chevron-down.svg")
            : (document.querySelector(`#accordionimg${i}`).src =
                "assets/icons/chevron-right.svg");
      });
  }
}

async function showContactPage() {
  const lang = checkUserLanguage();

  let req = await baseRequest({
    req: "get_platform",
  });

  req = req.result[0];

  function showMessage() {
    let user = document.querySelector("#talk_to_us_username").value;
    let message = document.querySelector("#talk_to_us_message").value;
    return `Olá, meu nome é ${user}. ${message}`;
  }

  Footer();

  document.querySelector("#content").innerHTML = `
    <section class="section-area">
        <div class="content">
            ${ArrowBack()}
            ${PageTitle(translations(lang)?.talktous_page_whoa)}
  
            <div style="width: 100%; display: table; margin: 60px auto; text-align: justify">
            
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
            
              <div class='talktous-button-row'>
                  <button type="button" class="talktous-button email" id="talk_to_us_email">
                      email
                  </button>
                  <button type="button" class="talktous-button whatsapp" id="talk_to_us_whatsapp">
                      whatsapp
                  </button>
              </div> 
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

// Get page to load
function getPageToLoad() {
  if (window.location.href.includes("?page=terms")) {
    showTermsPage();
    return;
  }

  if (window.location.href.includes("?page=policies")) {
    showPoliciesPage();
    return;
  }

  if (window.location.href.includes("?page=faq")) {
    showFAQPage();
    return;
  }

  if (window.location.href.includes("?page=contact")) {
    showContactPage();
    return;
  }
}

getPageToLoad();

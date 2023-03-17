import {
  ArrowBack,
  Input,
  InputLabel,
  Toast,
  Loading,
  PageTitle,
  Copyright,
} from "../../components/index.js";
import { performRecover } from "../../queries/base.js";
import { isUserLogged } from "../../utils/checkSession.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { recoverText } from "./recoverText.js";

function recoverLabel(lang) {
  return `
      <div class="form-group" style="display: table; margin: 30px auto;">
        <label style="margin: 10px auto; display: table; width: 90%; color: #707087; ">
            ${recoverText(lang)?.info}
        </label>
      </div>`;
}

function form(lang) {
  return `
    <div class="form-group" style="display: table; margin: 10px auto 5px auto;">
      ${InputLabel(recoverText(lang)?.email)}
      ${Input("emailrecover", "", "email", "", null)}
    </div><br/>

    <div class="form-group" style="display: table; margin: 5px auto 50px auto;">
      <button
          class="button"
          type="button"
          id="recoverbutton"
      >
          ${recoverText(lang)?.button}
      </button>
    </div>
  `;
}

function showPageContent() {
  isUserLogged();

  const lang = checkUserLanguage();

  document.querySelector("#content").innerHTML = `
    <section class="section-area">
      <div class="content">
        ${ArrowBack()}
        ${PageTitle(recoverText(lang)?.title, "white")}
        <div class="form-area">
          ${recoverLabel(lang)}
          ${form(lang)}
        </div>
        ${Copyright()}
      </div>
    </section>
  `;

  document.querySelector("#recoverbutton").addEventListener("click", () => {
    recover(lang);
  });

  Loading(false);
}

showPageContent();

async function recover(lang) {
  Loading(true);

  if (!validateFields(lang)) {
    Loading(false);
    return;
  }

  let email = document.querySelector("#emailrecover").value;

  const aux = await performRecover(email.trim());

  if (aux.success === false) {
    Loading(false);
    Toast("danger", aux.result);
    return;
  }

  cleanForgotFields();

  Loading(false);
  Toast("success", aux.result);

  setTimeout(() => {
    window.location.href = "index.html";
  }, 6000);
}

function validateFields(lang) {
  var email = document.getElementById("emailrecover").value;

  if (email === "") {
    Loading(false);
    Toast("danger", recoverText(lang)?.validation);
    return;
  }

  return true;
}

function cleanForgotFields() {
  document.querySelector("#emailrecover").value = "";
}

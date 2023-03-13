import {
  Title,
  ArrowBack,
  Input,
  InputLabel,
  Toast,
  Loading,
} from "../../components/index.js";
import { performRecover } from "../../queries/base.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { recoverText } from "./recoverText.js";

function getPageContent() {
  if (JSON.parse(localStorage.getItem("userSession")) !== null) {
    window.location.href = "panel.html";
  }

  const lang = checkUserLanguage();

  const year = new Date().getFullYear();
  let copyright = `
    <span id="copyrightText" class="copyrightText copyright-data">© Copyright ${year}</span><br /><br />
  `;

  let form = `
    <section id="loginForm" class="section form">
          <div class="container form-area">

            <div class="form-group" style="display: table; margin: 10px auto 30px auto;">
                <label style="margin: 10px auto; display: table; width: 90%; color: #707087; ">
                    ${recoverText(lang)?.info}
                </label>
            </div>

            <div class="form-group" style="display: table; margin: 10px auto 5px auto;">
                ${InputLabel(recoverText(lang)?.email)}
                ${Input("emailrecover", "", "email", "", null)}
            </div>
            
            <div class="form-group" style="display: table; margin: 5px auto 50px auto;">
                <button
                    class="button"
                    type="button"
                    id="recoverbutton"
                >
                    ${recoverText(lang)?.button}
                </button>
            </div>
        </section>
  `;

  let el = `
    <div class="form-space">
        <section class="section">
            <div class="container form-container">
                ${ArrowBack()}
                ${Title(recoverText(lang)?.title, "white")}
            </div>
        </section>
      ${form}

      ${copyright}
    </div>
  `;

  document.querySelector(
    "#content"
  ).innerHTML = `<section class="section container">${el}</section>`;

  document.querySelector("#recoverbutton").addEventListener("click", () => {
    recover();
  });

  Loading(false);
}

getPageContent();

async function recover() {
  Loading(true);

  if (!validateFields()) {
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

function validateFields() {
  var email = document.getElementById("emailrecover").value;

  if (email === "") {
    Loading(false);
    Toast("danger", "Por favor, preencha o email.");
    return;
  }

  return true;
}

function cleanForgotFields() {
  document.querySelector("#emailrecover").value = "";
}

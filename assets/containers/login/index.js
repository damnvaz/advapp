import { Title, Subtitle, ArrowBack, Input, InputLabel, ButtonLink, Button, Toast, Loading } from "../../components/index.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { loginText } from "./loginText.js";

function getPageContent() {
  const lang = checkUserLanguage();

  if (JSON.parse(localStorage.getItem("userSession")) !== null) {
    window.location.href = "panel.html";
  }

  const year = new Date().getFullYear();
  let copyright = `
    <span id="copyrightText" class="copyrightText copyright-data">© Copyright ${year}</span><br /><br />
  `;

  let form = `
    <section id="loginForm" class="section form">
          <div class="container form-area">
            <div class="form-group" style="display: table; margin: 20px auto 5px auto;">
                ${InputLabel(loginText(lang)?.emailOrPhone)}
                ${Input("emailLogin", "", "text", "", null)}
            </div>

            <div class="form-group" style="display: table; margin: 5px auto 0px auto;">
                ${InputLabel(loginText(lang)?.password)}
                ${Input("senhaLogin", "", "password", "8", null)}
            </div>

            <div class="form-group row" style="display: table; margin: 0px auto 10px auto;">
                ${ButtonLink(loginText(lang)?.forgotPassword, "forgot.html")}
            </div>
            
            <div class="form-group" style="display: table; margin: 20px auto 40px auto;">
                ${Button(loginText(lang)?.loginButton, "login()")}
            </div>

            <div class="form-group row" style="display: table; margin: 5px auto 10px auto;">
                ${ButtonLink(loginText(lang)?.signupLink, "signup.html")}
            </div>
        </section>
  `;

  let el = `
    <div class="form-space">
        <section class="section">
            <div class="container form-container">
                ${ArrowBack()}
                ${Title("iusok - Login", 'white')}
            </div>
        </section>
      ${form}

      ${copyright}
    </div>
  `;

  document.getElementById(
    "content"
  ).innerHTML = `<section class="section container">${el}</section>`;

  if (window.location.href.includes("login.html?e=")) {
    let em = window.location.href.split("login.html?e=")[1];
    document.getElementById("emailLogin").value = em;
  }

  Loading(false);
}

getPageContent();

async function login() {
  const email = document.getElementById("emailLogin").value;
  const pass = document.getElementById("senhaLogin").value;

  Loading(true);

  if (!validateFields()) {
    Loading(false);
    return;
  }

  const aux = await performLogin(email.trim(), pass.trim());

  if (aux.success === false) {
    Toast("danger", aux.result);
    Loading(false);
    return;
  }

  Loading(false);
  localStorage.setItem("userSession", JSON.stringify(aux.result));

  cleanLoginFields();

  Toast("success", "Bem vindo");
  window.location.href = "panel.html";
}

function validateFields() {
  const email = document.querySelector("#emailLogin").value;
  const pass = document.querySelector("#senhaLogin").value;

  if (email === "") {
    Toast("danger", "Por favor, preencha o email.");
    return false;
  }

  if (pass === "") {
    Toast("danger", "Por favor, preencha o senha.");
    return false;
  }

  return true;
}

function cleanLoginFields() {
  document.querySelector("#emailLogin").value = "";
  document.querySelector("#senhaLogin").value = "";
}
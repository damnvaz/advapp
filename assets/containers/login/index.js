import {
  ArrowBack,
  Input,
  InputLabel,
  ButtonLink,
  InputPassword,
  Toast,
  Loading,
  PageTitle,
  Copyright,
  Button,
} from "../../components/index.js";
import { performLogin } from "../../queries/base.js";
import { isUserLogged } from "../../utils/checkSession.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { loginText } from "./loginText.js";

function form(lang, showPassword) {
  return `
    <div class="form-content p-3" style="margin-top: 30px">
      ${InputLabel(loginText(lang)?.emailOrPhone)}
      ${Input("emailLogin", "", "text", "", null)}
    </div>

    <div class="form-content p-3">
      ${InputLabel(loginText(lang)?.password)}
      ${InputPassword("senhaLogin", "", "10", showPassword)}
    </div>

    <div class="form-content" style="text-align: center;">
      ${ButtonLink(loginText(lang)?.forgotPassword, "forgot.html")}
    </div>

    <div class="form-content p-3" style="align-items: center; margin: 30px auto;">
      ${Button(loginText(lang)?.loginButton, null, "loginbutton")}
    </div>

    <div class="form-group row" style="display: table; margin: 5px auto 10px auto;">
      ${ButtonLink(loginText(lang)?.signupLink, "signup.html")}
    </div>
  `;
}

function showPageContent() {
  isUserLogged();

  const lang = checkUserLanguage();

  let showPassword = false;

  document.getElementById("content").innerHTML = `
    <section class="section-area">
      <div class="content">
        ${ArrowBack()}
        ${PageTitle(loginText(lang)?.title, "white")}
        <div class="form-area">
          ${form(lang, showPassword)}
        </div>
        ${Copyright()}
      </div>
    </section>
  `;

  if (window.location.href.includes("login.html?e=")) {
    let em = window.location.href.split("login.html?e=")[1];
    document.getElementById("emailLogin").value = em;
  }

  // password icon handler
  document.querySelector("#password-icon").addEventListener("click", () => {
    if (document.querySelector("#senhaLogin").type === "password") {
      document.querySelector("#senhaLogin").type = "text";
      document.querySelector("#password-icon").src = "assets/icons/eye-off.svg";
      return;
    }

    document.querySelector("#senhaLogin").type = "password";
    document.querySelector("#password-icon").src = "assets/icons/eye.svg";
  });

  // login handler
  document.querySelector("#loginbutton").addEventListener("click", () => {
    login(lang);
  });

  Loading(false);
}

showPageContent();

async function login(lang) {
  const login = document.getElementById("emailLogin").value;
  const pass = document.getElementById("senhaLogin").value;

  Loading(true);

  if (!validateFields(lang)) {
    Loading(false);
    return;
  }

  if (!login.includes("@")) {
    login.replace(/\D/g, "");
  }

  const aux = await performLogin(login.trim(), pass.trim());

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

function validateFields(lang) {
  const email = document.querySelector("#emailLogin").value;
  const pass = document.querySelector("#senhaLogin").value;

  if (email === "") {
    Toast("danger", loginText(lang)?.validationEmail);
    return false;
  }

  if (pass === "") {
    Toast("danger", loginText(lang)?.validationPass);
    return false;
  }

  return true;
}

function cleanLoginFields() {
  document.querySelector("#emailLogin").value = "";
  document.querySelector("#senhaLogin").value = "";
}

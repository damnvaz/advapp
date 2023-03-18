import {
  ArrowBack,
  Input,
  InputLabel,
  ButtonLink,
  Toast,
  Loading,
  Stepper,
  Select,
  PageTitle,
  Copyright,
} from "../../components/index.js";
import { goToStep } from "../../components/stepper/index.js";
import { performSignup } from "../../queries/base.js";
import { translations } from "../../translations/index.js";
import { isUserLogged } from "../../utils/checkSession.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import {
  fMasc,
  mCPFCNPJ,
  mDataNasc,
  mRG,
  mTel,
} from "../../utils/maskInput.js";

function step1(lang) {
  return `
      <span class="signup-title">${
        translations(lang)?.signup_page_personalData
      }</span>

      <div class="form-content">
        ${InputLabel(translations(lang)?.signup_page_fullname)}
        ${Input("nameSignup", "", "text", "", null)}
      </div><br/>
      
      <div class="form-content">
        ${InputLabel(translations(lang)?.signup_page_birthdate)}
        ${Input("birthSignup", "", "text", "", null)}
      </div><br/>
      
      <div class="form-content">
      ${InputLabel(translations(lang)?.signup_page_martialStatus)}
      ${Select(
        "martialStatusSignup",
        "",
        `<option style='color: #0a0a0a' value='1' selected='selected'>
            ${translations(lang)?.signup_page_single}
          </option>
          <option style='color: #0a0a0a' value='2'>
            ${translations(lang)?.signup_page_married}
          </option>
          <option style='color: #0a0a0a' value='2'>
            ${translations(lang)?.signup_page_separated}
          </option>
          <option style='color: #0a0a0a' value='2'>
            ${translations(lang)?.signup_page_divorced}
          </option>
          <option style='color: #0a0a0a' value='2'>
            ${translations(lang)?.signup_page_widowed}
          </option>
        `
      )}
    </div>
  `;
}

function step2(lang) {
  return `
    <span class="signup-title">${
      translations(lang)?.signup_page_generalData
    }</span>

    <div class="form-content">
      ${InputLabel(translations(lang)?.signup_page_document)}
      ${Input("cpfSignup", "", "tel", "18", null)}
    </div><br/>

    <div class="form-content">
        ${InputLabel(translations(lang)?.signup_page_rg)}
        ${Input("rgSignup", "", "tel", "12", null)}
    </div><br/>
    
    <div class="form-content">
        ${InputLabel(translations(lang)?.signup_page_phone)}
        ${Input("phoneSignup", "", "tel", "", null)}
    </div><br/>
  `;
}

function step3(lang) {
  return `
    <span class="signup-title">${
      translations(lang)?.signup_page_accountData
    }</span>
    <div class="form-content">
      ${InputLabel(translations(lang)?.signup_page_email)}
      ${Input("emailSignup", "", "email", "", null)}
    </div><br/>

    <div class="form-content">
      ${InputLabel(translations(lang)?.signup_page_pass)}
      ${Input("passSignup", "", "password", "8", null)}
    </div><br/>
    
    <div class="form-content">
      ${InputLabel(translations(lang)?.signup_page_iam)}
      ${Select(
        "typeSignup",
        "",
        `<option style='color: #0a0a0a' value='1' selected='selected'>
              ${translations(lang)?.signup_page_lawyer}
          </option>
          <option style='color: #0a0a0a' value='2'>
          ${translations(lang)?.signup_page_client}
          </option>
        `
      )}
    </div><br/>


    <p class="confirm">
      Ao apertar em cadastrar eu afirmo que Li e aceito os 
      <a href="support.html?page=terms">Termos de uso</a> e 
      <a href="support.html?page=policies">Politica de Privacidade</a>.          
    </p>
  `;
}

function showPageContent() {
  Loading(true);

  isUserLogged();

  let currentStep = 1;
  let numberOfSteps = 3;

  const lang = checkUserLanguage();

  let form = `
    <div class='step1'>
        ${step1(lang)}
        <div class="form-group" style="display: table; margin: 5px auto;">
          ${ButtonLink(translations(lang)?.signup_page_loginLink, "login.html")}
        </div>
    </div>
    <div class='step2 d-none'>
        ${step2(lang)}
    </div>
    <div class='step3 d-none'>
        ${step3(lang)}
    </div>
    <br/>
  `;

  document.querySelector("#content").innerHTML = `
    <section class="section-area">
      <div class="content">
        ${ArrowBack()}
        ${PageTitle(translations(lang)?.signup_page_title, "white")}
        <div class="form-area">
          <div class="step">
            ${Stepper(
              currentStep,
              numberOfSteps,
              form,
              translations(lang)?.signup_page_previousText,
              translations(lang)?.signup_page_nextText
            )}
          </div>
        </div>
        ${Copyright()}
      </div>
    </section>
  `;

  // input masker
  document.querySelector("#birthSignup").onkeydown = () => {
    fMasc(document.querySelector("#birthSignup"), mDataNasc);
  };
  document.querySelector("#cpfSignup").onkeydown = () => {
    fMasc(document.querySelector("#cpfSignup"), mCPFCNPJ);
  };
  document.querySelector("#rgSignup").onkeydown = () => {
    fMasc(document.querySelector("#rgSignup"), mRG);
  };
  document.querySelector("#phoneSignup").onkeydown = () => {
    fMasc(document.querySelector("#phoneSignup"), mTel);
  };
  document.querySelector("#passSignup").onkeyup = () => {
    document.querySelector("#pass").innerHTML =
      document.querySelector("#passSignup").value;
  };

  // stepper buttons handler
  document.querySelector("#previous").onclick = (e) => {
    document.querySelector(`.step${currentStep}`).classList.add("d-none");
    document
      .querySelector(`.step${currentStep - 1}`)
      .classList.remove("d-none");
    currentStep = currentStep - 1;
    goToStep(
      currentStep,
      numberOfSteps,
      translations(lang)?.signup_page_nextText,
      translations(lang)?.signup_page_finishText
    );
  };

  document.querySelector("#next").onclick = (e) => {
    if (currentStep === numberOfSteps) {
      signup(lang);
      return;
    }

    currentStep = currentStep + 1;
    goToStep(
      currentStep,
      numberOfSteps,
      translations(lang)?.signup_page_nextText,
      translations(lang)?.signup_page_finishText
    );

    document.querySelector(`.step${currentStep - 1}`).classList.add("d-none");
    document.querySelector(`.step${currentStep}`).classList.remove("d-none");
  };

  Loading(false);
}

showPageContent();

async function signup(lang) {
  Loading(true);

  if (!validateFields(lang)) {
    Loading(false);
    return;
  }

  const name = document.querySelector("#nameSignup").value;
  const userDoc = document.querySelector("#cpfSignup").value;
  const email = document.querySelector("#emailSignup").value;
  const pass = document.querySelector("#passSignup").value;
  const phone = document.querySelector("#phoneSignup").value;
  const rg = document.querySelector("#rgSignup").value;
  const type = document.querySelector("#typeSignup").value;
  const birthdate = document.querySelector("#birthSignup").value;

  const martialStatus = document.querySelector("#martialStatusSignup").value;
  const occupation = document.querySelector("#typeSignup").value
    ? "Advogado(a)"
    : "-";

  const today = new Date();
  const date =
    today.getDate() +
    "/" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    today.getFullYear();
  const createdAt = date;

  const aux = await performSignup({
    name: name.trim(),
    userDoc: userDoc.replace(/\D/g, "").trim(),
    rg: rg.replace(/\D/g, "").trim(),
    cnh: "-",
    email: email.trim(),
    pass: pass.trim(),
    phone: phone.replace(/\D/g, ""),
    type: type.trim(),
    status: "1",
    birthdate: birthdate.replace(/\D/g, "").trim(),
    address: "-",
    createdAt: createdAt.trim(),
    recipientId: "-",
    martialStatus: martialStatus.trim(),
    occupation: occupation.trim(),
    workPassport: "-",
  });

  if (aux.success === false) {
    Toast("danger", aux.result);
    Loading(false);
    return;
  }

  Loading(false);
  Toast("success", aux.result);

  setTimeout(() => {
    cleanSignupFields();
    window.location.href = "login.html";
  }, 5000);
}

function validateFields(lang) {
  const name = document.getElementById("nameSignup").value;
  const birth = document.getElementById("birthSignup").value;
  const userDoc = document.getElementById("cpfSignup").value;
  const rg = document.getElementById("rgSignup").value;
  const email = document.getElementById("emailSignup").value;
  const pass = document.getElementById("passSignup").value;
  const phone = document.getElementById("phoneSignup").value;

  if (name === "") {
    Toast("danger", translations(lang)?.signup_page_validationName);
    return false;
  }

  if (birth === "") {
    Toast("danger", translations(lang)?.signup_page_validationBirth);
    return false;
  }

  if (userDoc === "") {
    Toast("danger", translations(lang)?.signup_page_validationDoc);
    return false;
  }

  if (rg === "") {
    Toast("danger", translations(lang)?.signup_page_validationRG);
    return false;
  }

  if (phone === "") {
    Toast("danger", translations(lang)?.signup_page_validationPhone);
    return false;
  }

  if (email === "") {
    Toast("danger", translations(lang)?.signup_page_validationEmail);
    return false;
  }

  if (pass === "") {
    Toast("danger", translations(lang)?.signup_page_validationPass);
    return false;
  }

  if (pass.length > 8) {
    Toast("danger", translations(lang)?.signup_page_validationPass8);
    return false;
  }

  return true;
}

function cleanSignupFields() {
  document.querySelector("#nameSignup").value = "";
  document.querySelector("#cpfSignup").value = "";
  document.querySelector("#emailSignup").value = "";
  document.querySelector("#passSignup").value = "";
  document.querySelector("#phoneSignup").value = "";
  document.querySelector("#rgSignup").value = "";
  document.querySelector("#typeSignup").value = "";
  document.querySelector("#martialStatusSignup").value = "";
}

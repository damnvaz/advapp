import {
  Title,
  Subtitle,
  ArrowBack,
  Input,
  InputLabel,
  ButtonLink,
  Button,
  Toast,
  Loading,
  CheckboxWithLink,
  Stepper,
  Select,
} from "../../components/index.js";
import { goToStep, setProgressBar } from "../../components/stepper/index.js";
import { config } from "../../config/index.js";
import { convertDateDash, performSignup } from "../../queries/base.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import {
  fMasc,
  mCPFCNPJ,
  mDataNasc,
  mRG,
  mTel,
} from "../../utils/maskInput.js";
import { signupText } from "./signupText.js";

function step1(lang) {
  return `
      <span class="form-title">${signupText(lang)?.personalData}</span>

      <div style="display: table; margin: 0px auto; width: 78%;">
        ${InputLabel(signupText(lang)?.fullname)}
        ${Input("nameSignup", "", "text", "", null)}
      </div><br/>
      
      <div style="display: table; margin: 0px auto; width: 78%;">
        ${InputLabel(signupText(lang)?.birthdate)}
        ${Input("birthSignup", "", "text", "", null)}
      </div><br/>
      
      <div style="display: table; margin: 5px auto; width: 78%;">
      ${InputLabel(signupText(lang)?.martialStatus)}
      ${Select(
        "martialStatusSignup",
        "",
        `<option style='color: #0a0a0a' value='1' selected='selected'>
            ${signupText(lang)?.single}
          </option>
          <option style='color: #0a0a0a' value='2'>
            ${signupText(lang)?.married}
          </option>
          <option style='color: #0a0a0a' value='2'>
            ${signupText(lang)?.separated}
          </option>
          <option style='color: #0a0a0a' value='2'>
            ${signupText(lang)?.divorced}
          </option>
          <option style='color: #0a0a0a' value='2'>
            ${signupText(lang)?.widowed}
          </option>
        `
      )}
    </div><br/>
  `;
}

function step2(lang) {
  return `
    <span class="form-title">${signupText(lang)?.generalData}</span>

    <div style="display: table; margin: 0px auto; width: 78%;">
      ${InputLabel(signupText(lang)?.document)}
      ${Input("cpfSignup", "", "tel", "18", null)}
    </div><br/>

    <div style="display: table; margin: 0px auto; width: 78%;">
        ${InputLabel(signupText(lang)?.rg)}
        ${Input("rgSignup", "", "tel", "12", null)}
    </div><br/>
    
    <div style="display: table; margin: 0px auto; width: 78%;">
        ${InputLabel(signupText(lang)?.phone)}
        ${Input("phoneSignup", "", "tel", "", null)}
    </div><br/>
  `;
}

function step3(lang) {
  return `
    <span class="form-title">${signupText(lang)?.accountData}</span>
    <div style="display: table; margin: 5px auto; width: 75%;">
      ${InputLabel(signupText(lang)?.email)}
      ${Input("emailSignup", "", "email", "", null)}
    </div><br/>

    <div style="display: table; margin: 5px auto; width: 78%;">
      ${InputLabel(signupText(lang)?.pass)}
      ${Input("passSignup", "", "password", "8", null)}
      <span style="font-size:12px; color: #cecece;" id="pass"></span>
    </div><br/>
    
    <div style="display: table; margin: 5px auto; width: 78%;">
      ${InputLabel(signupText(lang)?.iam)}
      ${Select(
        "typeSignup",
        "",
        `<option style='color: #0a0a0a' value='1' selected='selected'>
              ${signupText(lang)?.lawyer}
          </option>
          <option style='color: #0a0a0a' value='2'>
          ${signupText(lang)?.client}
          </option>
        `
      )}
    </div><br/>



    <p class="confirm">
      Ao apertar em cadastrar eu afirmo que Li e aceito os 
      <a href="terms.html">Termos de uso</a> e 
      <a href="policies.html">Politica de Privacidade</a>.          
    </p>
  `;
}

function showPageContent() {
  Loading(true);

  if (JSON.parse(localStorage.getItem("userSession")) !== null) {
    window.location.href = "panel.html";
  }

  let currentStep = 1;
  let numberOfSteps = 3;

  const lang = checkUserLanguage();

  const year = new Date().getFullYear();
  let copyright = `
    <span id="copyrightText" class="copyrightText copyright-data">© Copyright ${year}. ${
    config().platformName
  }</span><br /><br />
  `;

  let form = `
    <div class='step1'>
        ${step1(lang)}
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
    <section class="section container">
      <div class="form-space">
        <section class="section">
            <div class="container form-container">
                ${ArrowBack()}
                ${Title(signupText(lang)?.title, "white")}
                ${Stepper(
                  currentStep,
                  numberOfSteps,
                  form,
                  signupText(lang)?.previousText,
                  signupText(lang)?.nextText
                )}
                ${copyright}
            </div>
        </section>
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
      signupText(lang)?.nextText,
      signupText(lang)?.finishText
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
      signupText(lang)?.nextText,
      signupText(lang)?.finishText
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
    Toast("danger", signupText(lang)?.validationName);
    return false;
  }

  if (birth === "") {
    Toast("danger", signupText(lang)?.validationBirth);
    return false;
  }

  if (userDoc === "") {
    Toast("danger", signupText(lang)?.validationDoc);
    return false;
  }

  if (rg === "") {
    Toast("danger", signupText(lang)?.validationRG);
    return false;
  }

  if (phone === "") {
    Toast("danger", signupText(lang)?.validationPhone);
    return false;
  }

  if (email === "") {
    Toast("danger", signupText(lang)?.validationEmail);
    return false;
  }

  if (pass === "") {
    Toast("danger", signupText(lang)?.validationPass);
    return false;
  }

  if (pass.length > 8) {
    Toast("danger", signupText(lang)?.validationPass8);
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

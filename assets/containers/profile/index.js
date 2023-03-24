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
import { getAddressByZipcode } from "../../utils/getAddressByZipcode.js";
import {
  fMasc,
  mCEP,
  mCPFCNPJ,
  mDataNasc,
  mRG,
  mTel,
} from "../../utils/maskInput.js";

function Input(id, placeholder, maxLength = "180", type, width = "100%") {
  return `
    <input 
      class="profile-input" 
      type="${type}" 
      placeholder="${placeholder}" 
      id="${id}"
      style="width: ${width}"
      maxLength="${maxLength === "" ? "180" : maxLength}"
    />`;
}

function Select(id, event, options, width) {
  return `
    <select
      class="profile-select"
      id="${id}"
      ${event !== "" ? JSON.parse(event) : ""}
      dir="ltr"
      ${width !== "" ? 'style="width: 100%"' : ""}
      > 
        ${options !== "" ? options : ""}
    </select>
  `;
}

function PersonalData(lang) {
  return `
  <span class='profile-content-title'>${
    translations(lang)?.profile_page_personal_data
  }</span>
  ${Input("user_name", "Nome completo", "", "text")}
  ${Input("user_document", "Documento (CPF/CNPJ)", "18", "tel")}
  <div style='display: flex; flex-direction: row; justify-content: space-between; width: 100%;'> 
   ${Input("user_national_registration", "RG", "14", "tel")}
   ${Input("user_drivers_license", "CNH", "14", "tel")}
  </div>

  ${Input("user_work_passport", "(Carteira de trabalho)", "", "tel")}
  ${Input("user_birthdate", "Data de nascimento", "", "tel")}
  `;
}

function ContactData(lang) {
  return `
    <span class='profile-content-title'>${
      translations(lang)?.profile_page_contact
    }</span>
    ${Input("user_phone", "Telefone celular", "", "tel")}
    ${Input("user_email", "Email", "", "email")}
    <div style='display: flex; flex-direction: row; align-items: center; width: 100%'> 
      ${Input("user_pass", "Senha", "", "password", "120px")}
      <span style='font-size: 14px; margin-top: 10px; color: cornflowerblue' id="pass"></span>
    </div>
  `;
}

function AddressData(lang) {
  return `
  <span class='profile-content-title'>${
    translations(lang)?.profile_page_address
  }</span>
  ${Input("user_zipcode", "CEP", "", "tel")}
  ${Input("user_address", "Endereço", "", "text")}
  ${Input("user_address_number", "Número", "", "tel")}
  ${Input("user_address_neighborhood", "Bairro", "", "text")}
  ${Input("user_address_complement", "Complemento", "", "text")}
  ${Input("user_address_city", "Cidade", "", "text")}
  ${Input("user_address_state", "Estado", "", "text")}
  `;
}

function OtherData(lang) {
  return `
    <span class='profile-content-title'>${
      translations(lang)?.profile_page_other
    }</span>
    ${Select(
      "user_martial_status",
      "",
      `<option style='color: #0a0a0a' value='1' selected='selected'>
        ${translations(lang)?.signup_page_single}
      </option>
      <option style='color: #0a0a0a' value='2'>
        ${translations(lang)?.signup_page_married}
      </option>
      <option style='color: #0a0a0a' value='3'>
        ${translations(lang)?.signup_page_separated}
      </option>
      <option style='color: #0a0a0a' value='4'>
        ${translations(lang)?.signup_page_divorced}
      </option>
      <option style='color: #0a0a0a' value='5'>
        ${translations(lang)?.signup_page_widowed}
      </option>
   `,
      "100%"
    )}
  ${Input("user_occupation", "Ocupação profissional")}
  `;
}

function SaveButton(lang) {
  return `
    <div style='display: table; margin: 80px auto 50px auto;'>
      ${Button(
        translations(lang)?.save_data,
        null,
        "save_data_button",
        "green"
      )}
    </div>
  `;
}

function LoadData(data) {
  let not = " - não informado";
  let addressData =
    data.address !== ""
      ? `Endereço: Endereço${not}, Número: Número${not}, Complemento: Complemento${not}, Bairro: Bairro${not}, CEP: CEP${not}, Cidade: Cidade${not}, Estado: Estado${not}`
      : data.address;
  let address = addressData.split("Endereço: ")[1].split(",")[0];
  let addressNumber = addressData.split("Número: ")[1].split(",")[0];
  let complement = addressData.split("Complemento: ")[1].split(",")[0];
  let neighborhood = addressData.split("Bairro: ")[1].split(",")[0];
  let zipcode = addressData.split("CEP: ")[1].split(",")[0];
  let city = addressData.split("Cidade: ")[1].split(",")[0];
  let state = addressData.split("Estado: ")[1].split(".")[0];

  document.querySelector("#user_name").value = data.name;
  document.querySelector("#user_document").value = data.document;
  document.querySelector("#user_national_registration").value =
    data.nationalRegistration;
  document.querySelector("#user_drivers_license").value = data.driversLicense;
  document.querySelector("#user_work_passport").value = data.workPassport;
  document.querySelector("#user_birthdate").value = data.birthdate;
  document.querySelector("#user_phone").value = data.phone;
  document.querySelector("#user_email").value = data.email;
  document.querySelector("#user_pass").value = data.pass;
  document.querySelector("#user_zipcode").value = zipcode;
  document.querySelector("#user_address").value = address;
  document.querySelector("#user_address_number").value = addressNumber;
  document.querySelector("#user_address_neighborhood").value = neighborhood;
  document.querySelector("#user_address_complement").value = complement;
  document.querySelector("#user_address_city").value = city;
  document.querySelector("#user_address_state").value = state;
  document.querySelector("#user_martial_status").value = data.martialStatus;
  document.querySelector("#user_occupation").value = data.occupation;
}

async function showPageContent() {
  Loading(true);

  isUserNotLogged();

  const user = JSON.parse(localStorage.getItem("userSession"));

  let req = await baseRequest({
    id: user.id,
    req: "get_user_by_id",
  });
  req = req.result;

  const lang = checkUserLanguage();

  document.getElementById("content").innerHTML = `
      <section class="section-area">
        <div class="content">
          ${ArrowBack()}
          ${PageTitle(translations(lang)?.profile_page_title)}
  
          <div class="subcontent">
              ${PersonalData(lang)}     
              ${ContactData(lang)}                
              ${AddressData(lang)}
              ${OtherData(lang)}
              ${SaveButton(lang)}
          </div>
        </div>
      </section>
  `;

  LoadData(req);

  // input handler
  document.querySelector("#user_birthdate").onkeydown = () => {
    fMasc(document.querySelector("#user_birthdate"), mDataNasc);
  };
  document.querySelector("#user_document").onkeydown = () => {
    fMasc(document.querySelector("#user_document"), mCPFCNPJ);
  };
  document.querySelector("#user_national_registration").onkeydown = () => {
    fMasc(document.querySelector("#user_national_registration"), mRG);
  };
  document.querySelector("#user_phone").onkeydown = () => {
    fMasc(document.querySelector("#user_phone"), mTel);
  };
  document.querySelector("#user_zipcode").onkeydown = () => {
    fMasc(document.querySelector("#user_zipcode"), mCEP);
  };
  document.querySelector("#user_pass").onkeyup = () => {
    document.querySelector("#pass").innerHTML =
      "(" + document.querySelector("#user_pass").value + ")";
  };
  document.querySelector("#user_pass").onblur = () => {
    document.querySelector("#pass").innerHTML =
      "(" + document.querySelector("#user_pass").value + ")";
  };

  // get address info
  document.querySelector(`#user_zipcode`).addEventListener("blur", async () => {
    let zipcode = document.querySelector(`#user_zipcode`).value;
    const info = await getAddressByZipcode(zipcode);

    if (info !== null) {
      document.querySelector(`#user_address`).value = info.address;
      document.querySelector(`#user_address_neighborhood`).value =
        info.neighborhood;
      document.querySelector(`#user_address_city`).value = info.city;
      document.querySelector(`#user_address_state`).value = info.state;
    }
  });

  document
    .querySelector(`#save_data_button`)
    .addEventListener("click", async () => {
      updateUserData(user.id);

      refreshData(user.id);
    });

  Loading(false);
}
showPageContent();

async function updateUserData(id) {
  let add = document.querySelector("#user_address").value;
  let num = document.querySelector("#user_address_number").value;
  let comp =
    document.querySelector("#user_address_complement").value === ""
      ? "(não possui complemento)"
      : document.querySelector("#user_address_complement").value;
  let neig = document.querySelector("#user_address_neighborhood").value;
  let zip = document.querySelector("#user_zipcode").value;
  let city = document.querySelector("#user_address_city").value;
  let uf = document.querySelector("#user_address_state").value;

  let workPassport =
    document.querySelector("#user_work_passport").value === ""
      ? "(não possui carteira de trabalho)"
      : document.querySelector("#user_work_passport").value;

  let cnh =
    document.querySelector("#user_drivers_license").value === ""
      ? "(não possui cnh)"
      : document
          .querySelector("#user_drivers_license")
          .value.replace(/\D/g, "")
          .trim();

  let address = `Endereço: ${add}, Número: ${num}, Complemento: ${comp}, Bairro: ${neig}, CEP: ${zip}, Cidade: ${city}, Estado: ${uf}.`;

  await baseRequest({
    id: Number(id),
    name: document.querySelector("#user_name").value,
    document: document
      .querySelector("#user_document")
      .value.replace(/\D/g, "")
      .trim(),
    nationalRegistration: document
      .querySelector("#user_national_registration")
      .value.replace(/\D/g, "")
      .trim(),
    driversLicense: cnh,
    email: document.querySelector("#user_email").value.trim(),
    pass: document.querySelector("#user_pass").value.trim(),
    phone: document.querySelector("#user_phone").value.replace(/\D/g, ""),
    birthdate: document
      .querySelector("#user_birthdate")
      .value.replace(/\D/g, "")
      .trim(),
    address: address,
    martialStatus: document.querySelector("#user_martial_status").value.trim(),
    occupation: document.querySelector("#user_occupation").value.trim(),
    workPassport: workPassport,
    req: "edit_user",
  });
}

async function refreshData(userId) {
  let req = await baseRequest({
    id: userId,
    req: "get_user_by_id",
  });
  req = req.result;

  Toast("success", "Dados salvos com sucesso");

  LoadData(req);
}

import { ArrowBack, Button, Loading, Toast } from "../../components/index.js";
import { baseRequest, convertDateDash } from "../../queries/base.js";
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

function Input(id, placeholder, type, maxLength = "180", width = "100%") {
  return `
    <input 
      class="profile-input ${id === "user_name" ? "profile-input-center" : ""}" 
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
  ${Input(
    "user_document",
    translations(lang)?.new_user_page_document,
    "tel",
    "",
    null
  )}
  ${Input(
    "user_national_registration",
    translations(lang)?.new_user_page_national_registration,
    "tel",
    "",
    null
  )}
  ${Input(
    "user_drivers_license",
    translations(lang)?.new_user_page_drivers_license,
    "tel",
    "",
    null
  )}
  ${Input(
    "user_work_passport",
    translations(lang)?.new_user_page_work_passport,
    "tel",
    "",
    null
  )}
  ${Input(
    "user_birthdate",
    translations(lang)?.new_user_page_birthdate,
    "tel",
    "",
    null
  )}
  `;
}

function ContactData(lang) {
  return `
    <span class='profile-content-title'>${
      translations(lang)?.new_user_page_contact_data
    }</span>
    ${Input(
      "user_phone",
      translations(lang)?.new_user_page_phone,
      "tel",
      "",
      null
    )}
    ${Input(
      "user_email",
      "Email",
      translations(lang)?.new_user_page_email,
      "",
      null
    )}
  `;
}

function AddressData(lang) {
  return `
  <span class='profile-content-title'>${
    translations(lang)?.new_user_page_address_data
  }</span>
  ${Input(
    "user_zipcode",
    translations(lang)?.new_user_page_zipcode,
    "tel",
    "",
    null
  )}
  ${Input(
    "user_address",
    translations(lang)?.new_user_page_address,
    "text",
    "",
    null
  )}
  ${Input(
    "user_address_number",
    translations(lang)?.new_user_page_address_number,
    "number",
    "",
    null
  )}
  ${Input(
    "user_address_neighborhood",
    translations(lang)?.new_user_page_neighborhood,
    "text",
    "",
    null
  )}
  ${Input(
    "user_address_complement",
    translations(lang)?.new_user_page_complement,
    "text",
    "",
    null
  )}
  ${Input(
    "user_address_city",
    translations(lang)?.new_user_page_city,
    "text",
    "",
    null
  )}
  ${Input(
    "user_address_state",
    translations(lang)?.new_user_page_state,
    "text",
    "",
    null
  )}
  `;
}

function OtherData(lang) {
  return `
    <span class='profile-content-title'>${
      translations(lang)?.new_user_page_other_data
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
  ${Input(
    "user_occupation",
    translations(lang)?.new_user_page_occupation,
    "text",
    "",
    null
  )}
  
  <br />
  <span class='profile-content-title'>${
    translations(lang)?.new_user_page_observation
  }</span>
  `;
}

function SaveButton(lang) {
  return `
    <div style='display: table; margin: 80px auto 50px auto;'>
      ${Button(
        translations(lang)?.new_user_page_save_data,
        null,
        "save_data_button",
        "green"
      )}
    </div>
  `;
}

async function showPageContent() {
  Loading(true);

  isUserNotLogged();

  const user = JSON.parse(localStorage.getItem("userSession"));

  const lang = checkUserLanguage();

  document.getElementById("content").innerHTML = `
      <section class="section-area">
        <div class="content">
          ${ArrowBack()}

          <img src="assets/icons/no-user.svg" alt="no user icon" class="user-icon" />
          ${Input("user_name", translations(lang)?.new_user_page_fullname, "", "text", "")}
  
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

  document.querySelector("#save_data_button").onclick = () => {
    saveUser(user.id);
  };

  Loading(false);
}
showPageContent();

async function saveUser(userid) {
  let zipcode = document.querySelector("#user_zipcode").value;
  let address = document.querySelector("#user_address").value;
  let addressNumber = document.querySelector("#user_address_number").value;
  let neighborhood = document.querySelector("#user_address_neighborhood").value;
  let complement =
    document.querySelector("#user_address_complement").value !== ""
      ? document.querySelector("#user_address_complement").value
      : "(não tem)";
  let city = document.querySelector("#user_address_city").value;
  let state = document.querySelector("#user_address_state").value;

  let fulladdress = `Endereço: ${address}, Número: ${addressNumber}, Complemento: ${complement}, Bairro: ${neighborhood}, CEP: ${zipcode}, Cidade: ${city}, Estado: ${state}`;

  let currentTime = convertDateDash(
    new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0]
  );

  await baseRequest({
    name: document.querySelector("#user_name").value.trim(),
    document: document
      .querySelector("#user_document")
      .value.replace(/\D/g, "")
      .trim(),
    nationalRegistration: document
      .querySelector("#user_national_registration")
      .value.replace(/\D/g, "")
      .trim(),
    driversLicense:
      document.querySelector("#user_drivers_license").value !== ""
        ? document
            .querySelector("#user_drivers_license")
            .value.replace(/\D/g, "")
            .trim()
        : "(não tem)",
    phone: document.querySelector("#user_phone").value.replace(/\D/g, ""),
    email: document.querySelector("#user_email").value.trim(),
    pass: document.querySelector("#user_phone").value.replace(/\D/g, "").trim(),
    birthdate: document
      .querySelector("#user_birthdate")
      .value.replace(/\D/g, "")
      .trim(),
    address: fulladdress,
    lawyerId: userid,
    createdAt: currentTime,
    martialStatus: document.querySelector("#user_martial_status").value.trim(),
    occupation:
      document.querySelector("#user_occupation").value !== ""
        ? document.querySelector("#user_occupation").value.trim()
        : "(não tem)",
    workPassport:
      document.querySelector("#user_work_passport").value !== ""
        ? document.querySelector("#user_work_passport").value.trim()
        : "(não tem)",
    req: "create_client",
  });

  Toast("success", "Dados salvos com sucesso");

  setTimeout(() => {
    window.location.href = "users.html";
  }, 3400);
}

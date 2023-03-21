import {
  ArrowBack,
  Button,
  Loading,
  PageTitle,
  Toast,
} from "../../components/index.js";
import { baseRequest, getUserMartialStatus } from "../../queries/base.js";
import { translations } from "../../translations/index.js";
import { isUserNotLogged } from "../../utils/checkSession.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";

function InputLabel(id, text) {
  return `<span class="input-label" id="${id}">${text}</span>`;
}

function PersonalData(lang) {
  return `
  <span class='profile-content-title'>${
    translations(lang)?.profile_page_personal_data
  }</span>
  ${InputLabel("user_document", "Documento (CPF/CNPJ)")}
  ${InputLabel("user_national_registration")}
  ${InputLabel("user_drivers_license", "CNH")}
  ${InputLabel("user_work_passport", "(Carteira de trabalho)")}
  ${InputLabel("user_birthdate", "Data de nascimento")}
  `;
}

function ContactData(lang) {
  return `
    <span class='profile-content-title'>${
      translations(lang)?.profile_page_contact
    }</span>
    ${InputLabel("user_phone", "Telefone celular")}
    ${InputLabel("user_email", "Email")}
  `;
}

function AddressData(lang) {
  return `
  <span class='profile-content-title'>${
    translations(lang)?.profile_page_address
  }</span>
  ${InputLabel("user_zipcode", "CEP")}
  ${InputLabel("user_address", "Endereço")}
  ${InputLabel("user_address_number", "Número")}
  ${InputLabel("user_address_neighborhood", "Bairro")}
  ${InputLabel("user_address_complement", "Complemento")}
  ${InputLabel("user_address_city", "Cidade")}
  ${InputLabel("user_address_state", "Estado")}
  `;
}

function OtherData(lang) {
  return `
    <span class='profile-content-title'>${
      translations(lang)?.profile_page_other
    }</span>
  ${InputLabel("user_martial_status", "Estado civil")}
  ${InputLabel("user_occupation", "Ocupação profissional")}
  `;
}

function LoadData(data) {
  let addressData = data.address;
  let address = addressData.split("Endereço: ")[1].split(",")[0];
  let addressNumber = addressData.split("Número: ")[1].split(",")[0];
  let complement = addressData.split("Complemento: ")[1].split(",")[0];
  let neighborhood = addressData.split("Bairro: ")[1].split(",")[0];
  let zipcode = addressData.split("CEP: ")[1].split(",")[0];
  let city = addressData.split("Cidade: ")[1].split(",")[0];
  let state = addressData.split("Estado: ")[1].split(".")[0];

  document.querySelector("#user_name").innerHTML = data.name;
  document.querySelector("#user_document").innerHTML = data.document;
  document.querySelector("#user_national_registration").innerHTML =
    data.nationalRegistration;
  document.querySelector("#user_drivers_license").innerHTML =
    data.driversLicense;
  document.querySelector("#user_work_passport").innerHTML = data.workPassport;
  document.querySelector("#user_birthdate").innerHTML = data.birthdate;
  document.querySelector("#user_phone").innerHTML = data.phone;
  document.querySelector("#user_email").innerHTML = data.email;
  document.querySelector("#user_zipcode").innerHTML = zipcode;
  document.querySelector("#user_address").innerHTML = address;
  document.querySelector("#user_address_number").innerHTML = addressNumber;
  document.querySelector("#user_address_neighborhood").innerHTML = neighborhood;
  document.querySelector("#user_address_complement").innerHTML = complement;
  document.querySelector("#user_address_city").innerHTML = city;
  document.querySelector("#user_address_state").innerHTML = state;
  document.querySelector("#user_martial_status").innerHTML =
    getUserMartialStatus(data.martialStatus);
  document.querySelector("#user_occupation").innerHTML = data.occupation;
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

          <img src="assets/icons/no-user.svg" alt="no user icon" class="user-icon" />
          ${PageTitle(translations(lang)?.profile_page_title, "", "user_name")}

          <div class="buttons-area">
            <div class="container-button" id="phone"> 
              <img src="assets/icons/phone.svg" alt="phone button" class="icon-button"  />
            </div> 
            <div class="container-button" id="email"> 
              <img src="assets/icons/email.svg" alt="email button" class="icon-button"  />
            </div>
            <div class="container-button" id="pin"> 
              <img src="assets/icons/pin.svg" alt="pin button" class="icon-button" />
            </div> 
          </div>
  
          <div class="subcontent">
            ${PersonalData(lang)}     
            ${ContactData(lang)}                
            ${AddressData(lang)}
            ${OtherData(lang)}
          </div>
        </div>
      </section>
  `;

  LoadData(req);

  document.querySelector("#phone").onclick = () => {
    let phone = document.querySelector("#user_phone").innerHTML;
    window.open(`tel:${phone}`, "_blank");
  };

  document.querySelector("#email").onclick = () => {
    let email = document.querySelector("#user_email").innerHTML;
    window.open(`mailto:${email}`, "_blank");
  };

  document.querySelector("#pin").onclick = () => {
    let address =
      document.querySelector("#user_address").innerHTML +
      ", " +
      document.querySelector("#user_address_number").innerHTML;
    window.open(`https://www.google.com/maps/place/${address}`, "_blank");
  };

  Loading(false);
}
showPageContent();

import {
  Navbar,
  Footer,
  Title,
  Subtitle,
  Button,
} from "../../components/index.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { indexText } from "./indexText.js";

function indexHero(lang) {
  const event = `window.location.href='signup.html'`;

  return `
    <div class="hero-container">
      <div>
      <p class="hero-title"> iusok <p>
        <p class="hero-description">${indexText(lang)?.heroDescription}</p>
        ${Button(indexText(lang)?.joinNow, event)}
      </div>
      <img src="assets/icons/balance.svg" class="balance" alt="balance" />
    </div>
  `;
}

function indexTools() {
  const lang = checkUserLanguage();

  return `
  <div class="container-legal-tool">
    <img src="assets/icons/hands-shaking.svg" class="hands-shake" alt="hands-shaking" />
    <div class="yourLegalAndEffectiveTool area">
      <p  class="title">${indexText(lang)?.yourLegalAndEffectiveToolTitle}</p>
      ${Subtitle(indexText(lang)?.yourLegalAndEffectiveToolDescription)}
    </div>
  </div>
  `;
}

function indexServicesOffered() {
  const lang = checkUserLanguage();

  const list = [
    {
      item1: indexText(lang)?.schedule,
      item2: indexText(lang)?.proceduralManagement,
      item3: indexText(lang)?.proceduralNotifications,
      item4: indexText(lang)?.financialManagement,
      item5: indexText(lang)?.petitionsModel,
      item6: indexText(lang)?.contractModel,
    },
    {
      item1: indexText(lang)?.helpForum,
      item2: indexText(lang)?.custumerManagement,
      item3: indexText(lang)?.filesManagement,
      item4: indexText(lang)?.tableValueOAB,
      item5: indexText(lang)?.fitsInYourPocket,
      item6: indexText(lang)?.andMuchMore,
    },
  ];

  let el = "";
  for (let i = 0; i < list.length; i++) {
    el += `<div>
        <div class="advantage-container">
          <img src="assets/icons/check.svg" class="check-icon" alt="check icon" /> 
          <span class="advantage-item">${list[i].item1}</span>
        </div>
        <div class="advantage-container">
          <img src="assets/icons/check.svg" class="check-icon" alt="check icon" /> 
          <span class="advantage-item">${list[i].item2}</span>
        </div>
        <div class="advantage-container">
          <img src="assets/icons/check.svg" class="check-icon" alt="check icon" /> 
          <span class="advantage-item">${list[i].item3}</span>
        </div>
        <div class="advantage-container">
          <img src="assets/icons/check.svg" class="check-icon" alt="check icon" /> 
          <span class="advantage-item">${list[i].item4}</span>
        </div>
        <div class="advantage-container">
          <img src="assets/icons/check.svg" class="check-icon" alt="check icon" /> 
          <span class="advantage-item">${list[i].item5}</span>
        </div>
        <div class="advantage-container">
          <img src="assets/icons/check.svg" class="check-icon" alt="check icon" /> 
          <span class="advantage-item">${list[i].item6}</span>
        </div>
      </div>`;
  }

  return `
    <div class="advantages d-table mx-auto area">
      ${Title(indexText(lang)?.whatWeOffer, "white")}
      <br>
        <div class="columns">
          ${el}
        </div>
      </div>     
  `;
}

function indexSignupNow() {
  const lang = checkUserLanguage();

  const event = `window.location.href='signup.html'`;

  return `
    <div class="mt-5 d-flex flex-column area">
      ${Title(indexText(lang)?.whatAreYouWaitingForTitle)}
      ${Subtitle(indexText(lang)?.whatAreYouWaitingForDescription)}
      <div class="d-flex align-items-center flex-column mb-5">
        ${Button(indexText(lang)?.signUpNow, event)}
      </div>
    </div>
  `;
}

function content() {
  const lang = checkUserLanguage();

  document.querySelector("#content").innerHTML = `
    <section class="section container mt-5">
      ${indexHero(lang)}
      ${indexTools()}
      ${indexServicesOffered()}
      ${indexSignupNow()}
    </section>`;
}

function PageContent() {
  Navbar();
  content();
  Footer();
}

PageContent();

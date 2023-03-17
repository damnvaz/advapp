import { Footer, Title, Subtitle, Button } from "../../components/index.js";
import { config } from "../../queries/base.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { indexText } from "./indexText.js";

function indexHero(lang) {
  const event = `window.location.href='login.html'`;

  return `
    <div class="index-hero-container">
      <div>
        <p class="index-hero-title">${config().platformName}<p>
        <p class="index-hero-description">${
          indexText(lang)?.heroDescription
        }</p>
        ${Button(indexText(lang)?.joinNow, event)}
      </div>
      <img src="assets/icons/balance.svg" 
        class="index-hero-img" 
        alt="balance" />
    </div>
  `;
}

function indexTools(lang) {
  return `
  <div class="legal-tool-container">
    <img src="assets/icons/hands-shaking.svg" 
      class="legal-tool-img" 
      alt="hands-shaking" />
    <div class="legal-tool-content">
      <p class="legal-tool-title">${
        indexText(lang)?.yourLegalAndEffectiveToolTitle
      }</p>
      ${Subtitle(indexText(lang)?.yourLegalAndEffectiveToolDescription)}
    </div>
  </div>
  `;
}

function indexServicesOffered(lang) {
  const list = [
    {
      item: indexText(lang)?.schedule,
    },
    { item: indexText(lang)?.proceduralManagement },
    { item: indexText(lang)?.proceduralNotifications },
    { item: indexText(lang)?.financialManagement },
    { item: indexText(lang)?.petitionsModel },
    { item: indexText(lang)?.contractModel },
    {
      item: indexText(lang)?.helpForum,
    },
    { item: indexText(lang)?.custumerManagement },
    { item: indexText(lang)?.filesManagement },
    { item: indexText(lang)?.tableValueOAB },
    {
      item: indexText(lang)?.fitsInYourPocket,
    },
    { item: indexText(lang)?.andMuchMore },
  ];

  let el = "";
  for (let i = 0; i < list.length; i++) {
    if (i === 0) {
      el += `<div>`;
    }

    el += `<div class="services-container">
          <img src="assets/icons/check.svg" 
            class="services-check-icon" 
            alt="check icon" /> 
          <span class="services-item">${list[i].item}</span>
      </div>`;

    if (i === 5) {
      el += `</div><div>`;
    }

    if (i === list.length - 1) {
      el += `</div>`;
    }
  }

  return `
    <div class="services">
      ${Title(indexText(lang)?.whatWeOffer, "white")}
      <br>
      <div class="services-columns">
        ${el}
      </div>
    </div>     
  `;
}

function PageContent() {
  const lang = checkUserLanguage();

  document.querySelector("#content").innerHTML = `
    <section class="section-area section-area-index">
      <div class="content">
        ${indexHero(lang)}
        ${indexServicesOffered(lang)}
        ${indexTools(lang)}
      </div>
    </section>
  `;
  Footer();
}

PageContent();

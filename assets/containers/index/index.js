import { Footer, Title, Subtitle, Button } from "../../components/index.js";
import { config } from "../../queries/base.js";
import { translations } from "../../translations/index.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";

function indexHero(lang) {
  const event = `window.location.href='login.html'`;

  return `
    <div class="index-hero-container">
      <div>
        <p class="index-hero-title">${config().platformName}<p>
        <p class="index-hero-description">${
          translations(lang)?.index_page_heroDescription
        }</p>
        ${Button(translations(lang)?.index_page_joinNow, event)}
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
        translations(lang)?.index_page_yourLegalAndEffectiveToolTitle
      }</p>
      ${Subtitle(
        translations(lang)?.index_page_yourLegalAndEffectiveToolDescription
      )}
    </div>
  </div>
  `;
}

function indexServicesOffered(lang) {
  const list = [
    {
      item: translations(lang)?.index_page_schedule,
    },
    { item: translations(lang)?.index_page_proceduralManagement },
    { item: translations(lang)?.index_page_proceduralNotifications },
    { item: translations(lang)?.index_page_financialManagement },
    { item: translations(lang)?.index_page_petitionsModel },
    { item: translations(lang)?.index_page_contractModel },
    {
      item: translations(lang)?.index_page_helpForum,
    },
    { item: translations(lang)?.index_page_custumerManagement },
    { item: translations(lang)?.index_page_filesManagement },
    { item: translations(lang)?.index_page_tableValueOAB },
    {
      item: translations(lang)?.index_page_fitsInYourPocket,
    },
    { item: translations(lang)?.index_page_andMuchMore },
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
      ${Title(translations(lang)?.index_page_whatWeOffer, "white")}
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

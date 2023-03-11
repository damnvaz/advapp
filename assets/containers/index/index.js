import { Navbar, Footer, Title, Subtitle, Button } from "../../components/index.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { indexText } from "./indexText.js";


function aboutUs() {
  const lang = checkUserLanguage();

  return `
    <div class="mt-5 mb-5">
      ${Title(indexText(lang)?.aboutUsTitle)}
      ${Subtitle(indexText(lang)?.aboutUsDescription)}
    </div>
  `;
}

function advantages() {
  const lang = checkUserLanguage();

  return `
    <div class="mt-5 mb-5">
      ${Title(indexText(lang)?.advantages)}
      ${Subtitle(indexText(lang)?.schedule)}
      ${Subtitle(indexText(lang)?.proceduralManagement)}
      ${Subtitle(indexText(lang)?.proceduralNotifications)}
      ${Subtitle(indexText(lang)?.financialManagement)}
      ${Subtitle(indexText(lang)?.modelPetitions)}
      ${Subtitle(indexText(lang)?.helpForum)}
      ${Subtitle(indexText(lang)?.custumerManagement)}
      ${Subtitle(indexText(lang)?.filesManagement)}
      ${Subtitle(indexText(lang)?.tableValueOAB)}
      ${Subtitle(indexText(lang)?.fitisInYourPocket)}
      ${Subtitle(indexText(lang)?.andMuchMore)}
  `;
}

function enrollNow() {
  const lang = checkUserLanguage();

  const event = `window.location.href='signup.html'`;

  return `
    <div class="mt-5 d-flex flex-column">
      ${Title(indexText(lang)?.whatAreYouWaitingForTitle)}
      ${Subtitle(indexText(lang)?.whatAreYouWaitingForDescription)}
      <div class="d-flex align-items-center flex-column mb-5">
        ${Button(indexText(lang)?.singUpNow, event)}
      </div>
    </div>
  `;
}

function content() {
  document.querySelector(
    "#content"
  ).innerHTML = `
  <section class="section container mt-5">
  <br/>
  <br/>
    ${aboutUs()}
    ${advantages()}
    ${enrollNow()}
  </section>`;
}

function PageContent() {
  Navbar();
  content();
  Footer();
}

PageContent();

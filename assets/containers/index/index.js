import { Navbar, Footer, Title, Subtitle, Button } from "../../components/index.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { indexText } from "./indexText.js";


function aboutUs() {
  const lang = checkUserLanguage();

  return `
    <div class="mt-5 mb-5 aboutUs ">
      ${Title(indexText(lang)?.aboutUsTitle)}
      ${Subtitle(indexText(lang)?.aboutUsDescription)}
    </div>
  `;
}

function advantages() {
  const lang = checkUserLanguage();

  return `
    <div class="mt-5 mb-5 advantages d-table mx-auto">
      ${Title(indexText(lang)?.advantages, 'white  ')}
      <br>
      <div class="columns">
        <div>
          ${Subtitle(indexText(lang)?.schedule, 'white')}
          ${Subtitle(indexText(lang)?.proceduralManagement, 'white')}
          ${Subtitle(indexText(lang)?.proceduralNotifications, 'white')}
          ${Subtitle(indexText(lang)?.financialManagement, 'white')}
          ${Subtitle(indexText(lang)?.petitionsModel, 'white')}
          ${Subtitle(indexText(lang)?.contractModel, 'white')}
        </div>
        <div>
          ${Subtitle(indexText(lang)?.helpForum, 'white')}
          ${Subtitle(indexText(lang)?.custumerManagement, 'white')}
          ${Subtitle(indexText(lang)?.filesManagement, 'white')}
          ${Subtitle(indexText(lang)?.tableValueOAB, 'white')}
          ${Subtitle(indexText(lang)?.fitsInYourPocket, 'white')}
          ${Subtitle(indexText(lang)?.andMuchMore, 'white')}
        </div>
      </div>
      </div>     
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
        ${Button(indexText(lang)?.signUpNow, event)}
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

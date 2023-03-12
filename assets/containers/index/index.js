import {
  Navbar,
  Footer,
  Title,
  Subtitle,
  Button,
} from "../../components/index.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { indexText } from "./indexText.js";

function aboutUs() {
  const lang = checkUserLanguage();

  return `
    <div class="aboutUs area">
      ${Title(indexText(lang)?.aboutUsTitle)}
      ${Subtitle(indexText(lang)?.aboutUsDescription)}
    </div>
  `;
}

function advantages() {
  const lang = checkUserLanguage();

  const list = [
    {
      item1: Subtitle(indexText(lang)?.schedule, "white"),
      item2: Subtitle(indexText(lang)?.proceduralManagement, "white"),
      item3: Subtitle(indexText(lang)?.proceduralNotifications, "white"),
      item4: Subtitle(indexText(lang)?.financialManagement, "white"),
      item5: Subtitle(indexText(lang)?.petitionsModel, "white"),
      item6: Subtitle(indexText(lang)?.contractModel, "white"),
    },
    {
      item1: Subtitle(indexText(lang)?.helpForum, "white"),
      item2: Subtitle(indexText(lang)?.custumerManagement, "white"),
      item3: Subtitle(indexText(lang)?.filesManagement, "white"),
      item4: Subtitle(indexText(lang)?.tableValueOAB, "white"),
      item5: Subtitle(indexText(lang)?.fitsInYourPocket, "white"),
      item6: Subtitle(indexText(lang)?.andMuchMore, "white"),
    },
  ];

  let el = '';
  for (let i = 0; i < list.length; i++) {
    el += 
      `<div>
        ${list[i].item1}
        ${list[i].item2}
        ${list[i].item3}
        ${list[i].item4}
        ${list[i].item5}
        ${list[i].item6}
      </div>`;
  }

  return `
    <div class="advantages d-table mx-auto area">
      ${Title(indexText(lang)?.advantages, "white")}
      <br>
        <div class="columns">
          ${el}
        </div>
      </div>     
  `;
}

function enrollNow() {
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
  document.querySelector("#content").innerHTML = `
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

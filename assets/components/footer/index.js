import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { Copyright } from "../copyright/index.js";
import { footerText } from "./footerText.js";

export function Footer() {
  const lang = checkUserLanguage();

  let footerContent = getFooterContent(lang);

  document.querySelector("#footer").innerHTML = `
      <div class="mt-5 mb-2 row footer-row footerBg">
        ${footerContent}
        <div class="mt-3 col-lg-4">
          <br/>
          ${Copyright()}
        </div>
      </div>
    `;
}

function getFooterContent(lang) {
  const footerLinks = [
    {
      title: footerText(lang)?.title1,
      text1: footerText(lang)?.text11,
      text2: footerText(lang)?.text12,
      url1: footerText(lang)?.url11,
      url2: footerText(lang)?.url12,
    },
    {
      title: footerText(lang)?.title2,
      text1: footerText(lang)?.text21,
      text2: footerText(lang)?.text22,
      url1: footerText(lang)?.url21,
      url2: footerText(lang)?.url22,
    },
  ];

  let footerContent = "";
  for (let i = 0; i < footerLinks.length; i++) {
    footerContent += `
      <div class="mt-2 col-lg-4 footer-content">
        <strong class="footerTextTitle">${footerLinks[i].title}</strong>
        <a href="${footerLinks[i].url1}" class="footerTextDescription">${footerLinks[i].text1}</a>
        <a href="${footerLinks[i].url2}" class="footerTextDescription">${footerLinks[i].text2}</a>
      </div>
    `;
  }
  return footerContent;
}

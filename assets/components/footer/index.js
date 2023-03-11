import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { footerText } from "./footerText.js";

export function Footer() {
  const lang = checkUserLanguage();

  const footerLinks = [
    {
      title: footerText(lang)?.title1,
      text1: footerText(lang)?.link11,
      text2: footerText(lang)?.link12,
      url1: footerText(lang)?.url11,
      url2: footerText(lang)?.url12,
    },
    {
      title: footerText(lang)?.title2,
      text1: footerText(lang)?.link21,
      text2: footerText(lang)?.link22,
      url1: footerText(lang)?.url21,
      url2: footerText(lang)?.url22,
    },
  ];

  const year = new Date().getFullYear();
  const copyright = `© Copyright ${year}, ${footerText(lang)?.copyright}`;

  let linksArea = "";
  for (let i = 0; i < footerLinks.length; i++) {
    linksArea += `<div class="mt-3 mb-3 col-lg-4 flex-column d-flex">
        <strong class="footerTextTitle">${footerLinks[i].title}</strong>
        <a href="${footerLinks[i].url1}" class="footerTextDescription">${footerLinks[i].text1}</a>
        <a href="${footerLinks[i].url2}" class="footerTextDescription">${footerLinks[i].text2}</a>
      </div>
    `;
  }

  document.querySelector(
    "#footer"
  ).innerHTML = `<div class="mt-5 mb-3 row rowFooter footerBg">
        ${linksArea}
        <div class="mt-4 col-lg-4 mb-3">
          <br/>
          <span class="copyrightText">${copyright}</span>
        </div>
      </div>
    `;
}

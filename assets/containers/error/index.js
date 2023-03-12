import { config } from "../../config/index.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { errorText } from "./errorText.js";


function showPageContent() {
  const year = new Date().getFullYear();

  const lang = checkUserLanguage();

  let el = `
        <div class="not-found-bg">
            <div class='navbar-brand'>
                <img  src='assets/logo.svg' alt="company logo" />
                <span class="company">${config()?.platformName}</span>
            </div>
            <div class="inner">
                <h2>${errorText(lang)?.whoa}</h2>
                <h5>${errorText(lang)?.message}</h5>
                <a href="index.html">${errorText(lang)?.home}</a>
            </div>

            <span id="copyrightText" class="copyrightText copyright-data">© Copyright ${year}</span><br /><br />
        </div>
    `;

  document.getElementById("content").innerHTML = el;
}

showPageContent();

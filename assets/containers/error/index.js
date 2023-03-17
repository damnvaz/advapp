import { Copyright } from "../../components/copyright/index.js";
import { config } from "../../queries/base.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { errorText } from "./errorText.js";

function showPageContent() {
  const lang = checkUserLanguage();

  let el = `
        <div class="navbar-brand">
            <img  src="assets/logo.svg" alt="company logo" class="not-found-logo" />
            <span class="not-found-company">${config()?.platformName}</span>
        </div>
        <div class="not-found-bg-inner">
            <h2>${errorText(lang)?.whoa}</h2>
            <h5>${errorText(lang)?.message}</h5>
            <a class="not-found-bg-inner-button" 
              href="index.html">${errorText(lang)?.home}</a>
        </div>

        ${Copyright()}
    `;

  document.getElementById("content").innerHTML = el;
}

showPageContent();

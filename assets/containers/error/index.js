import { Copyright } from "../../components/copyright/index.js";
import { config } from "../../queries/base.js";
import { translations } from "../../translations/index.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";

function showPageContent() {
  const lang = checkUserLanguage();

  let el = `
        <div class="not-found-bg-inner">
            <h1>iusok</h1>
            <h2>${translations(lang)?.error_page_whoa}</h2>
            <h5>${translations(lang)?.error_page_message}</h5>
            <a class="not-found-bg-inner-button" 
              href="index.html">${translations(lang)?.error_page_home}</a>
        </div>

        ${Copyright()}
    `;

  document.getElementById("content").innerHTML = el;
}

showPageContent();

import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { footerText } from "../footer/footerText.js";

export function Copyright() {
  const year = new Date().getFullYear();

  const lang = checkUserLanguage();

  return `
        <span 
            class="copyrightText"
        >
            © Copyright ${year}, ${footerText(lang)?.copyright}
        </span>
        <br /><br />
    `;
}

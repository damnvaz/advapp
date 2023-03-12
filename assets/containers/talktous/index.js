import { config } from "../../config/index.js";
import { baseRequest } from "../../queries/base.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { talktousText } from "./talktousText.js";


async function showPageContent() {
  const year = new Date().getFullYear();

  const lang = checkUserLanguage();

  let req = await baseRequest({
    req: "get_platform",
  });

  req = req.result[0];
  let whatsappUrl = `https://wa.me/+55${req.phone.replace(/\D/g, "")}`;
  let emailUrl = `mailto:${req.email}`;


  let el = `
        <div class="not-found-bg">
            <div class='navbar-brand'>
                <img  src='assets/logo.svg' alt="company logo" />
                <span class="company">${config()?.platformName}</span>
            </div>
            <div class="inner">
                <h2>${talktousText(lang)?.whoa}</h2>
                <h5>${talktousText(lang)?.message}</h5>
                <div class='d-flex row justify-content-between'>
                    <a href='${whatsappUrl}'>
                        <img src='assets/icons/whatsapp.svg' class='contact-icon' alt='whatsapp' />
                    </a>
                    <a href='${emailUrl}'>
                        <img src='assets/icons/email.svg' class='contact-icon' alt='phone' />
                    </a>
                </div>
                <a class='go-home' href="index.html">${talktousText(lang)?.home}</a>
            </div>

            <span id="copyrightText" class="copyrightText copyright-data">© Copyright ${year}</span><br /><br />
        </div>
    `;

  document.getElementById("content").innerHTML = el;
}

showPageContent();

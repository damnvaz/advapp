import { checkUserLanguage } from "../../utils/checkUserLanguage.js";
import { config } from "../../config/index.js";
import { navbarText } from "./navbarText.js";

export function Navbar() {
  const lang = checkUserLanguage();

  let myNavbar = "";

  let isLogged = false;
  let goTo = 'login.html';
  if (JSON.parse(localStorage.getItem("userSession")) !== null) {
    isLogged = true;
    goTo = 'panel.html';
  }

  let actionBtn = `
    <li class='d-none d-xl-block d-lg-block nav-item nav-link js-scroll-trigger navbar-login-button'>
        <a href="${goTo}">
          ${!isLogged ? navbarText(lang)?.login : navbarText(lang)?.panel}
        </a>
    </li>
  `;

  myNavbar = `
        <nav id='navbar' class='navbar navbar-expand-lg navbarcolor fixed-top'>
            <div class='container'>
                <button
                    class='navbar-btn navbar-toggler navbar-toggler-left navbar-menu-button'
                    type='button' 
                    data-toggle='collapse' 
                    data-target='#navbarResponsive'
                    arial-controls='navbarResponsive' 
                    aria-expanded='false' 
                    aria-label='Toggle Navigation'>
                      <i class='fas fa-bars'></i>
                </button>

                <label class='navbar-brand m-auto js-scroll-trigger'>
                    <div class='navbar-brand'>
                      <a href="index.html">
                        <img class='logoImg' id='logoImg'
                          src='assets/components/navbar/logonavbar.svg' />
                        <span>${config().platformName}</span>
                      </a>
                    </div>
                </label>

                <button
                    class='navbar-btn navbar-toggler  navbar-toggler-right navbar-menu-button'
                    type='button' 
                    onclick='window.location.href="${goTo}"'
                    arial-controls='navbarResponsive' 
                    aria-expanded='false' 
                    aria-label='Toggle Navigation'>
                      <i class='fas fa-user navbar-user-icon'></i>
                </button>
                
                <div class='collapse navbar-collapse' id='navbarResponsive'>
                    <ul class='navbar-nav  ml-auto textos-menu'>
                        ${actionBtn}
                    </ul>
                </div>
            </div>
        </nav>
    `;

  document.getElementById("navbarEl").innerHTML = myNavbar;
  return;
}


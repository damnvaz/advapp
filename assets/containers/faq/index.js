import { Accordion } from "../../components/accordion/index.js";
import { Footer, ArrowBack, PageTitle } from "../../components/index.js";
import { baseRequest } from "../../queries/base.js";
import { translations } from "../../translations/index.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";

async function showPageContent() {
  let req = await baseRequest({
    req: "faq",
  });

  let el = "";
  for (let i = 0; i < req.result.length; i++) {
    el += Accordion(req.result[i].doubt, req.result[i].details, i);
  }

  const lang = checkUserLanguage();

  document.getElementById("content").innerHTML = `
    <section class="section-area">
      <div class="content">
        ${ArrowBack()}
        ${PageTitle(translations(lang)?.faq_page)}

        <div class="faq-subcontent">
          ${el}
        </div>
      </div>
    </section>
  `;

  Footer();

  for (let i = 0; i < req.result.length; i++) {
    document
      .querySelector(`#accordion-title-${i}`)
      .addEventListener("click", () => {
        document.querySelector(`#accordioncontent${i}`).style.display =
          document.querySelector(`#accordioncontent${i}`).style.display ==
          "table"
            ? "none"
            : "table";
        document.querySelector(`#accordionimg${i}`).innerHTML =
          document.querySelector(`#accordioncontent${i}`).style.display ==
          "table"
            ? (document.querySelector(`#accordionimg${i}`).src =
                "assets/icons/chevron-down.svg")
            : (document.querySelector(`#accordionimg${i}`).src =
                "assets/icons/chevron-right.svg");
      });
  }
}

showPageContent();

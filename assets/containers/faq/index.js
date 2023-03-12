import { Accordion } from "../../components/accordion/index.js";
import { Navbar, Footer, ArrowBack } from "../../components/index.js";
import { baseRequest } from "../../queries/base.js";

async function showPageContent() {
  let req = await baseRequest({
    req: "faq",
  });

  let el = "";
  for (let i = 0; i < req.result.length; i++) {
    el += Accordion(req.result[i].doubt, req.result[i].details, i);
  }

  Navbar();
  document.getElementById("content").innerHTML = `
     <main id="hero" class="section container section-area">
      <div class="indexHeroWidth" style="padding: 0px 20px; min-height: 600px">
        ${ArrowBack()}
        <p class="terms-title">Perguntas frequentes</p>

        
        <div style="width: 100%; display: table; margin: 60px auto">
          ${el}
        </div>
      </div>
    </main>
  `;

  Footer();

  for (let i = 0; i < req.result.length; i++) {
    document
      .querySelector(`#accordiontitle${i}`)
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

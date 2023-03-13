import { Navbar, Footer, ArrowBack } from "../../components/index.js";
import { baseRequest, convertDateDash } from "../../queries/base.js";

async function showPageContent() {
  let req = await baseRequest({
    req: "terms",
  });

  // get last update from terms
  req = req.result.slice(-1)[0];


  let el = `
      ${req.terms
        .replaceAll("<titulo>", "<strong>")
        .replaceAll("</titulo>", "</strong>")
        .replaceAll("<paragrafo>", "<p>")
        .replaceAll("</paragrafo>", "</p>")
        .replaceAll("\r\n", "<br/>")}
    `;

  Navbar();
  document.getElementById("content").innerHTML = `
        <main id="hero" class="section container section-area">
      <div class="indexHeroWidth" style="padding: 0px 20px; min-height: 600px">
        ${ArrowBack()}
        <p class="terms-title">Termos e condições de uso</p>

        <p class="date-update">Data da última atualização: ${convertDateDash(req.version)}</p>

        <div style="width: 100%; display: table; margin: 60px auto; text-align: justify">
          ${el}
        </div>

        </div>
      </div>
    </main>
    `;

  Footer();
}

showPageContent();

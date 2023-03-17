import { Footer, ArrowBack, PageTitle } from "../../components/index.js";
import { baseRequest, convertDateDash } from "../../queries/base.js";

async function showPageContent() {
  let req = await baseRequest({
    req: "policies",
  });

  // get last update from policies
  req = req.result.slice(-1)[0];

  let el = `
      ${req.policy
        .replaceAll("<titulo>", "<strong>")
        .replaceAll("</titulo>", "</strong>")
        .replaceAll("<paragrafo>", "<p>")
        .replaceAll("</paragrafo>", "</p>")
        .replaceAll("\r\n", "<br/>")}
    `;

  document.getElementById("content").innerHTML = `
    <section class="section-area">
      <div class="content">
          ${ArrowBack()}
          ${PageTitle('Políticas de privacidade')}

          <p class="date-update">Data da última atualização: ${convertDateDash(
            req.version
          )}</p>

          <div style="width: 100%; display: table; margin: 60px auto; text-align: justify">
            ${el}
          </div>
      </div>
    </section>
    `;

  Footer();
}

showPageContent();

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

        <div style="width: 100%; display: table; margin: 60px auto">
          ${el}
        </div>

        <p class="terms-title">Politicas de privacidade</p>

        <div style="width: 100%; display: table; margin: 60px auto">
          <titulo>SEGURANÇA EM DADOS PESSOAIS</titulo>
          <paragrafo>
            Compartilhe suas informações conosco e nos ajude a melhorar o
            sistema de compras do site. Para que seu pedido possa ser efetuado
            em segurança, preencha os dados cadastrais com atenção. Asseguramos
            a privacidade e a segurança de nossos clientes durante todo o
            processo de navegação e compra no site. Seus dados cadastrais não
            serão utilizados em nenhuma hipótese para fins de ofertas a não ser
            que você autorize expressamente no momento do cadastramento. Os seus
            dados pessoais são fundamentais para que seu pedido seja
            bem-sucedido e sua compra seja segura.
          </p>

          <titulo>COOKIES E INFORMAÇÕES DE NAVEGAÇÃO</titulo>
          <paragrafo>
            Seus dados de navegação são coletados para que possamos aprimorar
            sua experiência de compra, garantindo um serviço personalizado para
            sua necessidade. Os cookies são pequenos arquivos de dados
            transferidos de um site da web para o disco do seu computador, sem
            armazenar dados pessoais (como logins e senhas, por exemplo). Assim
            como outros websites, nós utilizamos cookies e informações de
            navegação de nossos usuários (sessão do browser) que são agrupados e
            utilizados de maneira genérica, com o objetivo de aperfeiçoar os
            serviços que o site oferece, e assim garantindo as melhores ofertas
            e promoções sem oferecer conteúdo irrelevante. É importante
            ressaltar que durante todo este processo as informações pessoais são
            mantidas em sigilo absoluto. Importante! Para que seus dados
            permaneçam intactos, desaconselhamos expressamente a divulgação de
            senhas a terceiros, mesmo a amigos e parentes.
          </p>
        </div>
      </div>
    </main>
    `;

  Footer();
}

showPageContent();

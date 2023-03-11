import { Navbar, Footer, Title, Subtitle, Button } from "../../components/index.js";

function aboutUs() {
  return `
    <div class="mt-5 mb-5">
      ${Title('Sobre nós')}
      ${Subtitle('Nascemos com o propósito de...')}
    </div>
  `;
}

function advantages() {
  return `
    <div class="mt-5 mb-5">
      ${Title('Vantagens')}
      ${Subtitle('Agenda online')}
      ${Subtitle('Gestão financeira')}
      ${Subtitle('Gestão de processos')}
      ${Subtitle('e muito mais!')}
    </div>
  `;
}

function enrollNow() {

  const event = `window.location.href='signup.html'`;

  return `
    <div class="mt-5 d-flex flex-column">
      ${Title('Tá esperando o que?')}
      ${Subtitle('Cadastre sua agenda e disponibilize para seus clientes de forma rápida e prática!')}
      <div class="d-flex align-items-center flex-column mb-5">
        ${Button('Cadastrar agora', event)}
      </div>
    </div>
  `;
}

function content() {
  document.querySelector(
    "#content"
  ).innerHTML = `
  <section class="section container mt-5">
  <br/>
  <br/>
    ${aboutUs()}
    ${advantages()}
    ${enrollNow()}
  </section>`;
}

function PageContent() {
  Navbar();
  content();
  Footer();
}

PageContent();

function getPageContent() {
  if (JSON.parse(localStorage.getItem("userSession")) !== null) {
    // if has session, redirect to panel
    window.location.href = "panel.html";
  }

  const year = new Date().getFullYear();
  let copyright = `
    <span id="copyrightText" class="copyrightText copyright-data">© Copyright ${year}</span><br /><br />
  `;

  let form = `
    <section id="loginForm" class="section form">
          <div class="container form-area">
            <div class="form-group" style="display: table; margin: 20px auto 5px auto;">
                ${showInputLabel("Email")}
                ${showInput("emailLogin", "", "email", "", null)}
            </div>

            <div class="form-group" style="display: table; margin: 5px auto 0px auto;">
                ${showInputLabel("Senha")}
                ${showInput("senhaLogin", "", "password", "8", null)}
            </div>

            <div class="form-group row" style="display: table; margin: 0px auto 10px auto;">
                ${showButtonLink("Esqueci a senha", "forgot.html")}
            </div>
            
            <div class="form-group" style="display: table; margin: 20px auto 40px auto;">
                ${showButton("Login", "login()")}
            </div>

            <div class="form-group row" style="display: table; margin: 5px auto 10px auto;">
                ${showButtonLink("Novo aqui? Cadastrar", "signup.html")}
            </div>
        </section>
  `;

  let el = `
    <div class="form-space">
        <section class="section">
            <div class="container form-container">
                ${showArrowBack()}
                ${showTitle("eOfertas")}
                ${showSubtitle("Login")}
            </div>
        </section>
      ${form}

      ${copyright}
    </div>
  `;

  document.getElementById(
    "content"
  ).innerHTML = `<section class="section container">${el}</section>`;

  if (window.location.href.includes("login.html?e=")) {
    let em = window.location.href.split("login.html?e=")[1];
    document.getElementById("emailLogin").value = em;
  }

  showLoading(false);
}

getPageContent();

async function login() {
  const email = document.getElementById("emailLogin").value;
  const pass = document.getElementById("senhaLogin").value;

  showLoading(true);

  if (!validateFields()) {
    showLoading(false);
    return;
  }

  const aux = await performLogin(email.trim(), pass.trim());

  if (aux.success === false) {
    getToast("danger", aux.result);
    showLoading(false);
    return;
  }

  showLoading(false);
  localStorage.setItem("userSession", JSON.stringify(aux.result));

  cleanLoginFields();

  getToast("success", "Bem vindo");
  window.location.href = "panel.html";
}

function validateFields() {
  const email = document.getElementById("emailLogin").value;
  const pass = document.getElementById("senhaLogin").value;

  if (email === "") {
    getToast("danger", "Por favor, preencha o email.");
    return false;
  }

  if (pass === "") {
    getToast("danger", "Por favor, preencha o senha.");
    return false;
  }

  return true;
}

function cleanLoginFields() {
  document.getElementById("emailLogin").value = "";
  document.getElementById("senhaLogin").value = "";
}

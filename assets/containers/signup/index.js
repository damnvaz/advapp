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
    <section id="signupForm" class="section form">
          <div class="container form-area">
            <div class="form-group" style="display: table; margin: 5px auto;">
                <br/>
                ${showInputLabel("Qual é seu nome completo?")}
                ${showInput("nameSignup", "", "text", "", null)}
            </div>

            <div class ="form-group" style="display: table; margin: 5px auto;">
                ${showInputLabel("Qual é o seu CPF?")}
                ${showInput(
                  "cpfSignup",
                  "",
                  "tel",
                  "14",
                  JSON.stringify("onkeydown='javascript: fMasc( this, mCPF );'")
                )}
            </div>

            <div class="form-group" style="display: table; margin: 5px auto;">
                ${showInputLabel("Seu melhor email")}
                ${showInput("emailSignup", "", "email", "", null)}
            </div>

            <div class="form-group" style="display: table; margin: 5px auto;">
                ${showInputLabel("Digite uma senha")}
                ${showInput("passSignup", "", "password", "8", null)}
            </div>

            <div class="form-group" style="display: table; margin: 5px auto;">
                ${showInputLabel("Número do celular")}
                ${showInput(
                  "phoneSignup",
                  "",
                  "tel",
                  "",
                  JSON.stringify("onkeydown='javascript: fMasc( this, mTel );'")
                )}
            </div>

            <div class ='form-group row' style='display: table; margin: 30px auto 20px auto;'>
                ${showCheckboxWithLink(
                  "checkForSignup",
                  "Ao apertar em cadastrar eu afirmo que Li e aceito os",
                  "Termos de uso",
                  "e",
                  "Politica de Privacidade",
                  "terms.html"
                )}
            </div>
            <br/><br/>

            
            <div class="form-group" style="display: table; margin: 20px auto 40px auto;">
                ${showButton("Cadastrar", "signup()")}
            </div>

            <div class="form-group row" style="display: table; margin: 5px auto 10px auto;">
                ${showButtonLink("Tem uma conta? Entrar", "login.html")}
            </div>
        </section>
  `;

  let el = `
    <div class="form-space">
        <section class="section">
            <div class="container form-container">
                ${showArrowBack()}
                ${showTitle("eOfertas")}
                ${showSubtitle("Criar a conta")}
            </div>
        </section>
      ${form}

      ${copyright}
    </div>
  `;

  document.getElementById(
    "content"
  ).innerHTML = `<section class="section container">${el}</section>`;

  showLoading(false);
}

getPageContent();

async function signup() {
  const name = document.getElementById("nameSignup").value;
  const userDoc = document.getElementById("cpfSignup").value;
  const email = document.getElementById("emailSignup").value;
  const pass = document.getElementById("passSignup").value;
  const phone = document.getElementById("phoneSignup").value;

  showLoading(true);

  if (!validateFields()) {
    showLoading(false);
    return;
  }

  const aux = await performSignup(
    name.trim(),
    userDoc.replace(/\D/g, ""),
    email.trim(),
    pass.trim(),
    phone.replace(/\D/g, "")
  );

  if (aux.success === false) {
    getToast("danger", aux.result);
    showLoading(false);
    return;
  }

  //hide loading and show message
  showLoading(false);
  getToast("success", aux.result);

  setTimeout(() => {
    cleanSignupFields();

    // redirect to login
    window.location.href = "login.html";
  }, 5000);
}

function validateFields() {
  const name = document.getElementById("nameSignup").value;
  const userDoc = document.getElementById("cpfSignup").value;
  const email = document.getElementById("emailSignup").value;
  const pass = document.getElementById("passSignup").value;
  const phone = document.getElementById("phoneSignup").value;

  if (name === "") {
    getToast("danger", "Por favor, preencha o Nome.");
    return false;
  }

  if (userDoc === "") {
    getToast("danger", "Por favor, preencha o CPF.");
    return false;
  }

  let newCpf = userDoc.replace(/\D/g, "");
  if (newCpf.toString().length != 11 || /^(\d)\1{10}$/.test(newCpf)) {
    getToast("danger", "Por favor, informe um CPF válido.");
    return false;
  }

  let result = true;
  [9, 10].forEach(function (j) {
    let soma = 0,
      r;
    newCpf
      .split(/(?=)/)
      .splice(0, j)
      .forEach(function (e, i) {
        soma += parseInt(e) * (j + 2 - (i + 1));
      });
    r = soma % 11;
    r = r < 2 ? 0 : 11 - r;
    if (r != newCpf.substring(j, j + 1)) result = false;
  });

  if (result === false) {
    getToast("danger", "Por favor, informe um CPF válido.");
    return false;
  }

  if (email === "") {
    getToast("danger", "Por favor, preencha o email.");
    return false;
  }

  if (pass === "") {
    getToast("danger", "Por favor, preencha o senha.");
    return false;
  }

  if (pass.length > 8) {
    getToast("danger", "Por favor, preencha a senha com até 8 caracteres.");
    return false;
  }

  if (document.getElementById("checkForSignup").checked === false) {
    getToast(
      "danger",
      "Por favor, selecione aceite os termos de uso e politica de privacidade."
    );
    return false;
  }

  return true;
}

function cleanSignupFields() {
  document.getElementById("nameSignup").value = "";
  document.getElementById("cpfSignup").value = "";
  document.getElementById("emailSignup").value = "";
  document.getElementById("passSignup").value = "";
  document.getElementById("phoneSignup").value = "";
}

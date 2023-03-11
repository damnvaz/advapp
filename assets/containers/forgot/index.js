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

            <div class="form-group" style="display: table; margin: 10px auto 30px auto;">
                <label style="margin: 10px auto; display: table; width: 90%; color: #707087; ">
                    Insira seu CPF e e-mail para redefinir sua senha.
                </label>
            </div>
            
            <div class ="form-group" style="display: table; margin: 5px auto;">
                ${showInputLabel("CPF")}
                ${showInput(
                  "cpfrecover",
                  "",
                  "tel",
                  "14",
                  JSON.stringify("onkeydown='javascript: fMasc( this, mCPF );'")
                )}
            </div>

            <div class="form-group" style="display: table; margin: 20px auto 5px auto;">
                ${showInputLabel("Email")}
                ${showInput("emailrecover", "", "email", "", null)}
            </div>

            
            <div class="form-group" style="display: table; margin: 20px auto 40px auto;">
                ${showButton("Enviar", "recover()")}
            </div>
        </section>
  `;

  let el = `
    <div class="form-space">
        <section class="section">
            <div class="container form-container">
                ${showArrowBack()}
                ${showTitle("eOfertas")}
                ${showSubtitle("Esqueci a senha")}
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

async function recover() {
  var email = document.getElementById("emailrecover").value;
  var cpf = document.getElementById("cpfrecover").value;

  showLoading(true);

  if (!validateFields()) {
    showLoading(false);
    return;
  }

  const aux = await performRecover(email.trim(), cpf.replace(/\D/g, ""));

  if (aux.success === false) {
    showLoading(false);
    getToast("danger", aux.result);
    return;
  }

  //clean recover date
  cleanForgotFields();

  //hide loading and show message
  showLoading(false);
  getToast("success", aux.result);

  setTimeout(() => {
    window.location.href = "index.html";
  }, 6000);
}

function validateFields() {
  var email = document.getElementById("emailrecover").value;
  var cpf = document.getElementById("cpfrecover").value;

  if (cpf === "") {
    showLoading(false);
    getToast("danger", "Por favor, preencha o CPF.");
    return;
  }

  if (email === "") {
    showLoading(false);
    getToast("danger", "Por favor, preencha o email.");
    return;
  }

  return true;
}

function cleanForgotFields() {
  document.getElementById("emailrecover").value = "";
  document.getElementById("cpfrecover").value = "";
}

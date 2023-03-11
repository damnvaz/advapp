// COMPONENTS
function showHero() {
  return `
        <span
          onclick="history.back();"
          style="
            margin-top: 120px;
            color: #4c9be4;
            font-family: 'Medium';
            font-weight: 600;
            cursor: pointer;
            width: 70px;
            margin-bottom: 30px;
            display: flex;
          "
        >
          < voltar
        </span>
        <p class="profileTitle">Meu perfil</p>
        <br />
    `;
}

function showStep1() {
  return `
        <section class="profileStepArea" style="display: table">
          <h4 class="profileStepTitle">Dados gerais</h4>
          <br />

          <input
            disabled
            type="text"
            class="form-control mr-2"
            id="ownerName"
            placeholder="Nome"
          />

          <br />
          <input
            disabled
            type="text"
            class="form-control mr-2"
            id="ownerCPF"
            onkeydown="javascript: fMasc( this, mCPF );"
            placeholder="Documento CPF *"
            maxlength="14"
            required
          />
          
          <br />
          <input
            disabled
            type="text"
            class="form-control mr-2"
            id="ownerPhone"
            onkeydown="javascript: fMasc( this, mTel );"
            placeholder="Telefone *"
            maxlength="14"
            required
          />

          <br />
          <input
            disabled
            type="email"
            class="form-control mr-2"
            id="ownerEmail"
            placeholder="Email *"
            required
          />

          <br />
          <input
            type="password"
            class="form-control mr-2"
            id="ownerPass"
            placeholder="Senha *"
            required
          />
        </section>
    `;
}

function showStep2() {
  return `
        <section class="profileStepArea" style="display: table">
          <h4 class="profileStepTitle">Endereço</h4>

          <input
            type="tel"
            class="form-control mr-2"
            onkeydown="javascript: fMasc( this, mCEP );"
            maxlength="10"
            onblur="javascript: pesquisacep(this.value)"
            id="ownerZipcode"
            placeholder="CEP *"
          />

          <br />
          <input
            disabled
            type="text"
            class="form-control mr-2"
            id="ownerAddress"
            placeholder="Endereço *"
            maxlength="120"
            required
          />

          <br />
          <input
            type="text"
            class="form-control mr-2"
            id="ownerAddressNumber"
            placeholder="Número *"
          />

          <br />
          <input
            type="text"
            class="form-control mr-2"
            id="ownerComplement"
            placeholder="Complemento (opcional)"
            maxlength="14"
          />

          <br />
          <input
            disabled
            type="text"
            class="form-control mr-2"
            id="ownerNeighborhood"
            placeholder="Bairro *"
          />

          <br />
          <input
            disabled
            type="text"
            class="form-control mr-2"
            id="ownerCity"
            placeholder="Cidade *"
          />

          <br />
          <input
            disabled
            value=""
            class="form-control mr-2"
            maxlength="2"
            type="text"
            id="ownerState"
            placeholder="Estado *"
            name="state"
            required
          />
          <br />
        </section>
    `;
}

function showButtons() {
  return `
        <div
          class="form-group"
          style="
            display: flex;
            flex-direction: row;
            margin: 30px auto 100px auto;
            justify-content: center;
          "
        >
          <button
            onclick="deactivateAccount()"
            style="
              border-radius: 5px;
              border: 2px solid #c95e4b !important;
              background-color: #fff;
              color: #c95e4b;
              font-family: 'Medium';
              font-size: 1rem;
              font-weight: 600;
              letter-spacing: 1px;
              padding: 5px 10px;
            "
            class="btn btn-success mr-2"
          >
            desativar conta
          </button>

          <button
            onclick="updateProfile()"
            id="profile-nextbutton"
            style="
              border-radius: 5px;
              border: none;
              background-color: #2fc046;
              font-family: 'Medium';
              font-size: 1rem;
              font-weight: 600;
              letter-spacing: 1px;
              padding: 5px 35px;
            "
            class="btn btn-success mr-2"
          >
            Salvar
          </button>
        </div>
    `;
}

// CONTAINER
async function getPageContent() {
  if (JSON.parse(localStorage.getItem("userSession")) === null) {
    window.location.href = "index.html";
  }

  var user = JSON.parse(localStorage.getItem("userSession"));

  document.getElementById("content").innerHTML = `
    <div class="indexHeroWidth" style="padding: 0px 20px; min-height: 700pxp; align-items: center; display: flex; flex-direction: column;">
        <div id="hero">${showHero()}</div>

        <div id="step1">${showStep1()}</div>
        <br />

        <div id="step2">${showStep2()}</div>

        <div id="buttons">${showButtons()}</div>
    </div>
  `;

  document.getElementById("ownerName").value = user.name;
  document.getElementById("ownerCPF").value = user.document;
  document.getElementById("ownerEmail").value = user.email;
  document.getElementById("ownerPass").value = user.pass;
  document.getElementById("ownerPhone").value = user.phone;

  document.getElementById("ownerZipcode").value = user.addressZipcode;
  document.getElementById("ownerAddress").value = user.address;
  document.getElementById("ownerAddressNumber").value = user.addressNumber;
  document.getElementById("ownerComplement").value = user.addressComplement;
  document.getElementById("ownerNeighborhood").value = user.addressNeighborhood;
  document.getElementById("ownerCity").value = user.addressCity;
  document.getElementById("ownerState").value = user.addressState;
}

getPageContent();

// QUERIES

async function updateProfile() {
  showLoading(true);
  if (document.getElementById("ownerName").value === "") {
    getToast("danger", "Por favor, preencha o nome.");
    showLoading(false);
    return;
  }

  if (document.getElementById("ownerCPF").value === "") {
    getToast("danger", "Por favor, preencha o CPF.");
    showLoading(false);
    return;
  }

  if (document.getElementById("ownerEmail").value === "") {
    getToast("danger", "Por favor, preencha o email.");
    showLoading(false);
    return;
  }

  if (document.getElementById("ownerPass").value === "") {
    getToast("danger", "Por favor, preencha a senha.");
    showLoading(false);
    return;
  }

  if (document.getElementById("ownerZipcode").value === "") {
    getToast("danger", "Por favor, preencha o CEP.");
    showLoading(false);
    return;
  }

  if (document.getElementById("ownerAddress").value === "") {
    getToast("danger", "Por favor, preencha o Endereço.");
    showLoading(false);
    return;
  }

  if (document.getElementById("ownerAddressNumber").value === "") {
    getToast("danger", "Por favor, preencha o número do endereço.");
    showLoading(false);
    return;
  }

  if (document.getElementById("ownerNeighborhood").value === "") {
    getToast("danger", "Por favor, preencha o bairro.");
    showLoading(false);
    return;
  }

  if (document.getElementById("ownerCity").value === "") {
    getToast("danger", "Por favor, preencha a cidade.");
    showLoading(false);
    return;
  }

  if (document.getElementById("ownerState").value === "") {
    getToast("danger", "Por favor, preencha o estado.");
    showLoading(false);
    return;
  }

  var user = JSON.parse(localStorage.getItem("userSession"));

  const aux = await updateUser({
    id: user.id,
    name: document.getElementById("ownerName").value,
    document: document.getElementById("ownerCPF").value,
    email: document.getElementById("ownerEmail").value,
    pass: document.getElementById("ownerPass").value,
    phone: document.getElementById("ownerPhone").value,
    type: user.type,
    addressZipcode: document.getElementById("ownerZipcode").value,
    address: document.getElementById("ownerAddress").value,
    addressNumber: document.getElementById("ownerAddressNumber").value,
    addressComplement: document.getElementById("ownerComplement").value ?? "-",
    addressNeighborhood: document.getElementById("ownerNeighborhood").value,
    addressCity: document.getElementById("ownerCity").value,
    addressState: document.getElementById("ownerState").value,
    addressCountry: user.addressCountry,
    details: user.details,
    regulation: user.regulation,
    img: user.img,
    recipientId: user.recipientId,
    percent: user.percent,
    status: 1,
    req: "edit_user",
  });

  if (aux.success === false) {
    showLoading(false);
    getToast("danger", aux.result);
    return;
  }

  getToast("success", aux.result);
  showLoading(false);
}

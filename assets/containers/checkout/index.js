// COMPONENTS

function heroSection() {
  return `
        ${showArrowBack()}
        <p class="checkoutTitle">Pagamento</p>
        <br />
    `;
}

function step1() {
  return `
        <section
            id="checkout-step1"
            class="checkoutStepArea"
          >
          
          <h4 class="checkoutStepTitle">Dados de pagamento</h4>
            <div style="display: flex; align-items: center; width: 100%; flex-direction: column;">
                ${showInputLabel("Email para envio do voucher")}
                ${showInput("cemailCheckout", "", "email", "", null)}

                ${showInputLabel("Documento do Titular do cartão")}
                ${showInput(
                  "cdocumentCheckout",
                  "",
                  "tel",
                  "18",
                  JSON.stringify(
                    "onkeydown='javascript: fMasc( this, mCPFCNPJ );'"
                  )
                )}

            
                <div style="width: 100%; margin-top: 25px"></div>
                ${showInputLabel("Número do cartão")}
                ${showInput(
                  "ccnumCheckout",
                  "",
                  "tel",
                  "19",
                  JSON.stringify(
                    "onkeydown='javascript: fMasc( this, mCartao );'"
                  )
                )}

                ${showInputLabel("Nome do titular do cartão")}
                ${showInput("cnameCheckout", "", "text", "", null)}

                ${showInputLabel("Validade (mm/aa)")}
                ${showInput(
                  "expmonthCheckout",
                  "",
                  "tel",
                  "5",
                  JSON.stringify(
                    "onkeydown='javascript: fMasc( this, mValidadeCartao );'"
                  )
                )}

                ${showInputLabel("CVV")}
                ${showInput("usercvvCheckout", "", "password", "3", null)}
            </div>
        </section><br/><br/>
    `;
}

function step2() {
  return `
        <section
            id="checkout-step2"
            class="checkoutStepArea"
          >
            <h4 class="checkoutStepTitle">Endereço de cobrança</h4>

            <div style="display: flex; align-items: center; width: 100%; flex-direction: column;">
                ${showInputLabel("Documento do Titular do cartão")}
                ${showInput(
                  "zipcodeCheckout",
                  "",
                  "tel",
                  "15",
                  JSON.stringify(
                    `onkeydown='javascript: fMasc( this, mCEP );'
                    onblur='javascript: Zipcode(this.value, useraddressCheckout, userneighborhoodCheckout, usercityCheckout, userstateCheckout)'
                    `
                  )
                )}


                ${showInputLabel("Endereço")}
                ${showInput("useraddressCheckout", "", "text", "", null)}
                
                ${showInputLabel("Número")}
                ${showInput("addressNumberCheckout", "", "number", "", null)}
                
                ${showInputLabel("Bairro")}
                ${showInput("userneighborhoodCheckout", "", "text", "", null)}
                
                ${showInputLabel("Cidade")}
                ${showInput("usercityCheckout", "", "text", "", null)}
                
                ${showInputLabel("Estado")}
                ${showInput("userstateCheckout", "", "text", "2", null)}
            </div>
          </section>
    `;
}

function buttons() {
  return `
        <div
            class="form-group"
            style="
              display: flex;
              flex-direction: row;
              margin: 80px auto 20px auto;
              justify-content: center;
            "
          >
            <button
              onclick="payCheckout();"
              id="checkout-nextbutton"
              style="
                border-radius: 5px;
                border: none;
                background-color: #2fc046;
                font-family: 'Medium';
                font-size: 1rem;
                font-weight: 700;
                letter-spacing: 1px;
                padding: 10px 35px;
              "
              class="btn btn-success mr-2"
            >
              pagar
            </button>
        </div>
    `;
}

// CONTAINER

async function getPageContent() {
  showLoading(true);

  if (!window.location.href.includes("checkout.html?id")) {
    getToast("danger", "Reserva não encontrada.");
    showLoading(false);
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  }

  const aux = await getBookById(
    window.location.href.split("checkout.html?id=")[1]
  );

  if (aux.success === false) {
    getToast("danger", "Reserva não encontrada.");
    showLoading(false);
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
    return;
  }

  const estab = await getProductById(aux.result[0].productId);
  const userReq = await getUserById(estab.result[0].userId);

  let el = `
        <section
        class="section container indexHeroSection"
        style="margin-bottom: 100px"
      >
        <div class="indexHeroWidth" style="padding: 0px 20px">
          <div id="hero">${heroSection()}</div>

          <div class="checkoutStepAreaCart" style="padding-top: 20px">
            <div class="checkoutStepAreaCartTitle">
              <h5><strong id="productName">${
                aux.result[0].productName
              }</strong></h5>
            </div>
            <br /><br />

            <p>
              Total R$
              <span class="price" style="color: #2fc046; float: right"
                ><b id="totalToPay">${aux.result[0].bookedPrice.replace(
                  ".",
                  ","
                )}</b></span>
            </p>

            <div
              style="
                width: 100%;
                display: flex;
                margin: auto;
                max-width: 950px;
                border-top: 1px solid #cecece;
              "
            ></div>
            <br />

            <span style="display: none" id="estabId">${
              estab.result[0].userId
            }</span>
            <span style="display: none" id="productId">${
              aux.result[0].productId
            }</span>
            <span style="display: none" id="agentUserId">${
              aux.result[0].agentUserId
            }</span>
            <span style="display: none" id="bookedPercentual">${
              aux.result[0].bookedPercentual
            }</span>
            <span style="display: none" id="estabName">${
              userReq.result.name
            }</span>
          </div>

          <div id="step1">${step1()}</div>
          <div id="step2">${step2()}</div>
          <div id="buttons">${buttons()}</div>
        </div>
      </section>
    `;

  document.getElementById("content").innerHTML = el;
  showLoading(false);
}

getPageContent();

function validateFields() {
  let values = {
    document: document.getElementById("cdocumentCheckout").value,
    addressZipcode: document.getElementById("zipcodeCheckout").value,
    address: document.getElementById("useraddressCheckout").value,
    addressNumber: document.getElementById("addressNumberCheckout").value,
    addressNeighborhood: document.getElementById("userneighborhoodCheckout")
      .value,
    addressCity: document.getElementById("usercityCheckout").value,
    addressState: document.getElementById("userstateCheckout").value,
    cc: document.getElementById("ccnumCheckout").value,
    validThru: document.getElementById("expmonthCheckout").value,
    cvv: document.getElementById("usercvvCheckout").value,
    ccName: document.getElementById("cnameCheckout").value,
    cemail: document.getElementById("cemailCheckout").value,
  };

  if (values?.name === "") {
    getToast("danger", "Preencha o nome");
    showLoading(false);
    return false;
  }

  if (values?.document === "") {
    getToast("danger", "Preencha o documento");
    showLoading(false);
    return false;
  }

  if (values?.cemail === "") {
    getToast("danger", "Preencha o email");
    showLoading(false);
    return false;
  }

  if (values?.addressZipcode === "") {
    getToast("danger", "Preencha o cep");
    showLoading(false);
    return false;
  }

  if (values?.address === "") {
    getToast("danger", "Preencha o endereço");
    showLoading(false);
    return false;
  }

  if (values?.addressNumber === "") {
    getToast("danger", "Preencha o número do endereço");
    showLoading(false);
    return false;
  }

  if (values?.addressNeighborhood === "") {
    getToast("danger", "Preencha o bairro do endereço");
    showLoading(false);
    return false;
  }

  if (values?.addressCity === "") {
    getToast("danger", "Preencha a cidade do endereço");
    showLoading(false);
    return false;
  }

  if (values?.addressState === "") {
    getToast("danger", "Preencha o estado do endereço");
    showLoading(false);
    return false;
  }

  if (values?.cc === "") {
    getToast("danger", "Preencha o número do cartão");
    showLoading(false);
    return false;
  }

  if (values?.ccName === "") {
    getToast("danger", "Preencha o nome do titular do cartão");
    showLoading(false);
    return false;
  }

  if (values?.validThru === "") {
    getToast("danger", "Preencha a validade do cartão");
    showLoading(false);
    return false;
  }

  if (values?.cvv === "") {
    getToast("danger", "Preencha o cvv do cartão");
    showLoading(false);
    return false;
  }

  return true;
}

async function payCheckout() {
  showLoading(true);

  if (!validateFields()) {
    showLoading(false);
    return;
  }

  let user = {
    id: "1",
    document: "03982237000103",
    phone: "21991943672",
  };
  if (JSON.parse(localStorage.getItem("userSession")) !== null) {
    user = JSON.parse(localStorage.getItem("userSession"));
  }

  const payData = await getPaymentData(
    user.id,
    window.location.href.split("details.html?id=")[1]
  );

  let splitrule = [];
  if (document.getElementById("cdocumentCheckout").value !== user.document) {
    splitrule = [
      {
        recipient_id: payData.result[0].company_id,
        percentage: Number(payData.result[0].company_percent),
        liable: true,
        charge_processing_fee: true,
      },
      {
        recipient_id: payData.result[0].agency_id,
        percentage: Number(payData.result[0].agency_percent),
        liable: false,
        charge_processing_fee: false,
      },
    ];
  } else {
    splitrule = [
      {
        recipient_id: payData.result[0].company_id,
        percentage: Number(payData.result[0].company_percent),
        liable: true,
        charge_processing_fee: true,
      },
      {
        recipient_id: payData.result[0].agency_id,
        percentage: Number(payData.result[0].agency_percent),
        liable: false,
        charge_processing_fee: false,
      },
      {
        recipient_id: payData.result[0].portal_id,
        percentage: Number(payData.result[0].portal_percent),
        liable: false,
        charge_processing_fee: false,
      },
    ];
  }
  // // FOR TEST ONLY
  // splitrule = [
  //   {
  //     recipient_id: "re_ckcet7w4v0lkdej61yb1rl9uf",
  //     percentage: 90,
  //     liable: true,
  //     charge_processing_fee: true,
  //   },
  //   {
  //     recipient_id: "re_ckcet7w4v0lkdej61yb1rl9uf",
  //     percentage: 10,
  //     liable: false,
  //     charge_processing_fee: false,
  //   },
  // ];

  let values = {
    amount: Number(
      document.getElementById("totalToPay").innerHTML.replace(/\D/g, "")
    ),
    card_number: document
      .getElementById("ccnumCheckout")
      .value.replace(/\D/g, ""),
    card_cvv: document.getElementById("usercvvCheckout").value,
    card_expiration_date: document
      .getElementById("expmonthCheckout")
      .value.replace(/\D/g, ""),
    card_holder_name: document.getElementById("cnameCheckout").value,
    customer: {
      external_id: "#3311",
      name: document.getElementById("cnameCheckout").value,
      type:
        document.getElementById("cdocumentCheckout").value.length === 14
          ? "individual"
          : "corporation",
      country: "br",
      email: document.getElementById("cemailCheckout").value,
      documents: [
        {
          type:
            document.getElementById("cdocumentCheckout").value.length === 14
              ? "cpf"
              : "cnpj",
          number: document
            .getElementById("cdocumentCheckout")
            .value.replace(/\D/g, ""),
        },
      ],
      phone_numbers: ["+55" + user.phone.replace(/\D/g, "")],
      birthday: "1988-03-01",
    },
    billing: {
      name: document.getElementById("cnameCheckout").value,
      address: {
        country: "br",
        state: document.getElementById("userstateCheckout").value.toLowerCase(),
        city: document.getElementById("usercityCheckout").value,
        neighborhood: document.getElementById("userneighborhoodCheckout").value,
        street: document.getElementById("useraddressCheckout").value,
        street_number: document
          .getElementById("addressNumberCheckout")
          .value.replace(/\D/g, ""),
        zipcode: document
          .getElementById("zipcodeCheckout")
          .value.replace(/\D/g, ""),
      },
    },
    items: [
      {
        id: "1",
        title: "Pagamento Ingresso eOfertas",
        unit_price: Number(
          document.getElementById("totalToPay").innerHTML.replace(/\D/g, "")
        ),
        quantity: 1,
        tangible: true,
      },
    ],
    split_rules: splitrule,
    api_key: payData.result[0].key,
  };

  const paymentRes = await payForItem(values);
  if (paymentRes.errors) {
    getToast("danger", paymentRes.errors[0].message);
    showLoading(false);
    return;
  }

  let req = await updateBook(
    window.location.href.split("checkout.html?id=")[1],
    "PAID",
    "CREDIT CARD"
  );

  if (req.success === false) {
    getToast("danger", req.result);
    showLoading(false);
    return;
  }

  await sendEmailService(
    "1 reserva",
    document.getElementById("estabName").innerHTML,
    document.getElementById("productName").innerHTML,
    1,
    [document.getElementById("cnameCheckout").value.toString()],
    window.location.href.split("checkout.html?id=")[1],
    document.getElementById("totalToPay").innerHTML.replace(".", ","),
    document.getElementById("cemailCheckout").value
  );

  getToast("success", "Pagamento efetuado com sucesso.");
  setTimeout(() => {
    window.location.href =
      JSON.parse(localStorage.getItem("userSession")) !== null
        ? "bookings.html"
        : "index.html";
  }, 2000);

  showLoading(false);
}

async function payForItem(data) {
  return await fetch("https://api.pagar.me/1/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => await res.json());
}

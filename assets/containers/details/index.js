// CONTAINER
async function showPageContent() {
  showLoading(true);

  let el = `
    <section class='section section-content'>       
        <div class='container'>
            <div id="hero">
                ${showArrowBack()}
                <div class='hero-div'>
                    <img id='hero-img' /><br>
                    <div class='heroDesc'>
                        <p class='hero-title'></p>
                        <label class='hero-description-title'>Sobre</label>
                        <label class='hero-description'></label>
                    </div>
                </div>
            </div>
            
            <div class="row" style='padding: 20px 0px'>
                <div id="items" class="col-lg-6 col-md-6">
                    <div class='item-section' >
                        <label class='item-offer-title'>Ofertas disponíveis</label>
                        <div class='item-offer-container'>
                          <div id='EstabCards'></div>
                        </div><br>
                    </div>
                </div>

                <div id="regulation" class="col-lg-6 col-md-6">
                    <div class='regulation-section' >
                        <label class='regulation-title'>Informações importantes</label>
                        <div id='EstabTerms' class="regulation-description"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `;

  document.getElementById(
    "content"
  ).innerHTML = `<section class="section container">${el}</section>`;

  showLoading(false);
}

showPageContent();

//#region Establishment data

function info(data) {
  showModal("modalInfo");
  document.getElementById("labelModal").innerHTML = data;
}

async function checkDetails() {
  showLoading(true);

  if (!window.location.href.includes("?id=")) {
    window.location.href = "index.html";
  }

  const aux = await fetchDetails();

  if (JSON.parse(localStorage.getItem("types")) !== null) {
    localStorage.removeItem("types");
  }

  if (JSON.parse(localStorage.getItem("productId")) !== null) {
    localStorage.removeItem("productId");
  }

  if (JSON.parse(localStorage.getItem("productPrice")) !== null) {
    localStorage.removeItem("productPrice");
  }

  if (JSON.parse(localStorage.getItem("bookingCards")) !== null) {
    localStorage.removeItem("bookingCards");
  }

  const typeOfBook = await getTicketTypes();
  localStorage.setItem("types", JSON.stringify(typeOfBook));

  var itemsArr = "";
  for (var i = 0; i < aux.length; i++) {
    document.querySelector("#hero-img").src = aux[i].img;

    document.querySelector(".hero-title").innerHTML = aux[i].name;

    let estabDetails = aux[i].details;
    var description =
      estabDetails +
      `<a 
        href='${aux[i].location}' 
        class='hero-see-on-map' 
        target='_blank'>
          Ver no mapa
      </a>`;

    document.querySelector(".hero-description").innerHTML = description;
    document.getElementById("EstabTerms").innerHTML = aux[i].regulation;

    let products = aux[i].products;
    for (var j = 0; j < products.length; j++) {
      itemsArr += `
                    <div style='border-radius: 10px;  border: 1px solid #707087; 
                        min-height: 100px; margin: 10px auto; width: 95%; display: table; cursor: pointer;'>
                        <div style='padding: 15px;'>
                            <label style='display:none;' >${aux[i].document}</label>
                            <label style='display:none;' >${products[j].validThru}</label>
    
                            <div class='row'>
                                <div class='col-12'>
                                    <label id='ticketName${products[j].id}' 
                                        style='display: none; font-weight: bold; font-family: "Roboto";'>${products[j].title}</label><br />
                                    <label onclick="info('${products[j].details}')" 
                                        style='font-weight: bold; font-family: "Roboto"; cursor: pointer;'>${products[j].title}
                                        <i style='color: #4C9BE4; margin-left: 5px; font-size: 17px;' class="fas fa-question-circle"></i>
                                    </label>
    
                                    <br />
    
                                    <label class='SectionImmobileClickedPriceIndex' 
                                        style='text-decoration: line-through; color: #707087; font-size: 0.9rem; padding-left: 0px; 
                                            margin-left: 0px;' >R$ ${products[j].price}</label>
                                    <label class='productCard-price' 
                                        style='font-size: 0.9rem;' >R$ ${products[j].promoPrice}</label><br>

                                    <label class='SectionImmobileClickedPriceIndex' 
                                        onclick="goToItemDetails(${products[j].id})"
                                        style='font-weight: 700; 
                                            color: #4C9BE4; 
                                            font-size: 0.9rem; 
                                            display: table;
                                            margin: 5px 0px 0px auto;
                                            border: 2px solid #4C9BE4;
                                            border-radius: 5px;
                                            padding: 5px 10px;
                                            cursor: pointer;
                                          ' >Reservar ></label>
                                    
                                </div>
                            </div>
    
                        </div>
    
                    </div>
                `;
    }
  }

  document.getElementById("EstabCards").innerHTML = itemsArr;

  showLoading(false);
}

async function fetchDetails() {
  const productsByUserId = await getProductsByUserId(
    window.location.href.split("details.html?id=")[1]
  );

  const userInfo = await getUserById(
    window.location.href.split("details.html?id=")[1]
  );

  let data = {
    id: userInfo.result.id,
    name: userInfo.result.name,
    location:
      "https://www.google.com/maps/search/" +
      userInfo.result.address +
      ", " +
      userInfo.result.addressNumber +
      " - " +
      userInfo.result.addressNeighborhood +
      ", " +
      userInfo.result.addressCity +
      " - " +
      userInfo.result.addressState +
      ", " +
      userInfo.result.addressZipcode,
    details: userInfo.result.details,
    regulation: userInfo.result.regulation,
    img: userInfo.result.img,
    products: productsByUserId.result,
    document: userInfo.result.document,
  };

  return [data];
}

async function goToItemDetails(prod) {
  showLoading(true);

  const product = await getProductById(prod);
  localStorage.setItem("productId", JSON.stringify(product.result[0].id));
  localStorage.setItem(
    "productPrice",
    JSON.stringify(product.result[0].promoPrice)
  );
  const types = JSON.parse(localStorage.getItem("types"));
  const max = 30;

  document.getElementById("itemTitle").innerHTML = product.result[0].title;
  document.getElementById("itemUnitPrice").innerHTML =
    "R$ " + product.result[0].promoPrice.replace(".", ",") + " / un.";

  document.getElementById("totalToPay-modal").innerHTML =
    product.result[0].promoPrice.replace(".", ",");

  let el = `
    <div class="bookingCard" id="card1">
            <span class="bookingAmount" id="bookingAmountCount1">Reserva 1 de 1</span>

            <br />
            <input
                type="text"
                class="form-control mr-2"
                id="name1"
                placeholder="Nome completo"
            />

            <select
              class="form-control mr-2"
              style="margin-top: 25px"
              id="type1"
              dir="ltr"
              onchange="calculatePriceOnSelect()"
            >
                ${types} 
            </select>
    </div>
  `;

  document.getElementById("bookings").innerHTML = `
   <section id="sectionServices" class="section" >
        <div
          class="container"
          style="
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          "
          id="bookingCardsArea"
          runat="server"
        >
            ${el}
        </div>

        <div 
            style="display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            padding-top: 20px;
            padding-bottom: 40px;
            height: 100px;
            width: 100%;
            max-width: 400px;
            margin: 0px auto;
        ">
          <div style="
              background-color: #4C9BE4;
              border: none;
              width: 100%;
              max-width: 200px;
              height: 50px;
              border-radius: 5px;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              padding: 10px;
              font-weight: 600;
              color: #fff;
              cursor: pointer;"
              id="addCardButton"
            onclick='addCard(${max})'>
              adicionar reserva
          </div>
        </div>
    </section>
  `;

  showModal("modalBook");
  showLoading(false);
}

checkDetails();
//#endregion

//#region Booking data
async function getTicketTypes() {
  const estabId = window.location.href.split("details.html?id=")[1];

  const typesArr = await getTypeById(estabId.toString());

  const res = typesArr.result;
  let types = `
    <option value='' class='booking-option-select' selected='selected'>
        Tipo de reserva
    </option>
  `;

  for (let i = 0; i < res.length; i++) {
    if (Number(res[i].status) === 1) {
      let data = res[i].percentual === "0" ? 1 : Number(res[i].percentual);
      types += `
            <option class='booking-option-select' value='${data}'>
              ${res[i].title}
            </option>
        `;
    }
  }

  return types;
}

async function getMaxTicketsAllowed() {
  const platform = await getPlatform();
  return parseInt(platform.result[0].maxBookAllowed);
}

function calculatePriceOnSelect() {
  let price = 0;
  let total = Number(
    Number(JSON.parse(localStorage.getItem("productPrice"))).toFixed(2)
  );

  document.getElementById("totalToPay-modal").innerHTML = "";
  const bookings = document.getElementById("bookingCardsArea").children;
  for (let i = 0; i < bookings.length; i++) {
    let percent = document.getElementById("type" + (i + 1)).value;

    if (percent === "0" || percent === "1" || percent === "") {
      price += total;
    } else {
      price += Number(total - Number((total * percent) / 100).toFixed(2));
    }
  }

  document.getElementById("totalToPay-modal").innerHTML = price.toFixed(2);
}

function removeCard(max) {
  const elements = document.getElementById("bookingCardsArea").children.length;

  if (elements > 1) {
    let el = document.getElementById("bookingCardsArea");
    el.removeChild(el.lastChild);
    el.removeChild(el.lastChild);

    const total = document.getElementById("bookingCardsArea").children.length;
    for (let i = 0; i < total; i++) {
      document.getElementById("bookingAmountCount" + (i + 1)).innerHTML =
        "Reserva " + (i + 1) + " de " + total;
    }
  }

  if (elements < max) {
    document.getElementById("addCardButton").style.backgroundColor = "#2fc046";
  }
}

async function addCard(max) {
  let types = JSON.parse(localStorage.getItem("types"));
  const elements = document.getElementById("bookingCardsArea").children.length;

  if (elements < max) {
    let aux = "";
    let arr = [];
    for (let i = 0; i < elements; i++) {
      arr.push({
        num: document.getElementById("bookingAmountCount" + (i + 1)).innerHTML,
        name: document.getElementById("name" + (i + 1)).value,
        type: document.getElementById("type" + (i + 1)).value,
      });
    }
    localStorage.setItem("bookingCards", JSON.stringify(arr));

    for (let j = 0; j < elements + 1; j++) {
      aux += `<div class="bookingCard" id="card${j + 1}">
            <span class="bookingAmount" id="bookingAmountCount${
              j + 1
            }">Reserva ${j + 1} de ${elements + 1}</span>

            <br />
            <input
                type="text"
                class="form-control mr-2"
                id="name${j + 1}"
                placeholder="Nome completo"
            />

            <select
              class="form-control mr-2"
              style="margin-top: 25px"
              id="type${j + 1}"
              dir="ltr"
              onchange="calculatePriceOnSelect()"
            >
              ${types}
            </select>

            ${
              j !== 0
                ? `
              <div style="
                border: 2px solid #5b5b5b;
                width: 100%;
                max-width: 200px;
                height: 50px;
                border-radius: 5px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                padding: 10px;
                font-weight: 600;
                color: #5b5b5b;
                margin-top: 20px;
                cursor: pointer;"
                id="removeCardButton"
                onclick="removeCard(${elements + 1})">
                remover reserva
            </div>
              `
                : ""
            }
        </div>
      `;
    }

    document.getElementById("bookingCardsArea").innerHTML = aux;

    const cards = JSON.parse(localStorage.getItem("bookingCards"));

    for (let k = 0; k < cards.length; k++) {
      (document.getElementById("bookingAmountCount" + (k + 1)).innerHTML =
        cards[k].num),
        (document.getElementById("name" + (k + 1)).value = cards[k].name),
        (document.getElementById("type" + (k + 1)).value = cards[k].type);
    }

    document.getElementById("removeCardButton").style.color = "#5b5b5b";
    document.getElementById("removeCardButton").style.border =
      "2px solid #5b5b5b";
  }

  if (elements === max - 1) {
    document.getElementById("addCardButton").style.backgroundColor = "#82d990";
  }
}

function goBackToPaymentFromConfirm() {
  hideModal("modalConfirmPayment");
  showModal("modalBook");
}

async function book() {
  if (!validateFields()) {
    showLoading(false);
    return;
  }

  hideModal("modalBook");

  let estabName = document.querySelector(".hero-title").innerHTML;
  let productName = document.getElementById("itemTitle").innerHTML;
  let peopleCount = document.getElementById("bookingCardsArea").children.length;
  let people =
    peopleCount > 1 ? peopleCount + " reservas" : peopleCount + " reserva";

  let peopleArea = "";
  const bookings = document.getElementById("bookingCardsArea").children;
  for (let i = 0; i < bookings.length; i++) {
    peopleArea += `
    <span class="itemTitle"
        style="
          font-size: 0.9rem;
          margin: 20px 30px 0px 0px;
        ">
        Reserva ${i + 1}
    </span><br />
    <span class="itemTitle"
        style="
          font-size: 0.9rem;
          margin: 10px 30px 0px 0px;
          font-weight: 500;
        ">
        ${document.getElementById("name" + (i + 1)).value}
    </span><br />
  `;
  }

  let totalPaid = document
    .getElementById("totalToPay-modal")
    .innerHTML.replace(".", ",");

  let email = document.getElementById("cemail").value;

  let el = `
    <div style="
        width: 100%;
        display: flex;
        margin: auto;
        max-width: 950px;
        border-top: 1px solid #cecece;
      "></div>
    <br/>
    <span class="itemTitle"
        style="font-size: 1.1rem; font-family: 'Medium'; margin: 0px 30px 0px 0px;">
        Reservas    
    </span><br />
    <span class="itemTitle"
        style="
          font-size: 0.9rem;
          margin: 0px 30px 0px 0px;
          color: #666666;
          font-weight: 500;
        ">
        ${people}
    </span><br /><br />

    ${peopleArea}

    <br />
    <div style="
        width: 100%;
        display: flex;
        margin: auto;
        max-width: 950px;
        border-top: 1px solid #cecece;
      "></div>
    <br/>
    
    <span class="itemTitle" 
        style="font-size: 1.1rem; font-family: 'Medium'; margin: 0px 30px 0px 0px;">
        ${estabName}
    </span><br />
    <span class="itemTitle" 
        style="
          font-size: 0.9rem;
          margin: 0px 30px 0px 0px;
          color: #666666;
          font-weight: 500;
        ">
        ${productName}
    </span><br />
    <span class="itemTitle" 
        style="font-size: 1.1rem; margin: 0px 30px 0px 0px; color: #2fc046;">
        R$ ${totalPaid}
    </span><br /><br />
    
    <span class="itemTitle" 
        style="font-size: 1rem; font-family: 'Medium'; margin: 0px 30px 0px 0px;">
        Voucher enviado para
    </span>
    <span class="itemTitle" 
        style="font-size: 0.9rem; font-weight: 500; margin: 0px 30px 60px 0px;">
        ${email}
    </span>
  `;

  document.getElementById("confirm-payment-data").innerHTML = el;

  showModal("modalConfirmPayment");
}

function calculatePrice(percent) {
  let total = document
    .getElementById("itemUnitPrice")
    .innerHTML.replace(",", ".")
    .replace("R$ ", "")
    .replace(" / un.", "");

  return percent === "0" || percent === "1"
    ? Number(total).toFixed(2)
    : total - Number((total * percent) / 100).toFixed(2);
}

//#endregion

//#region Paying data
function validateFields() {
  let values = {
    document: document.getElementById("cdocument").value,
    addressZipcode: document.getElementById("zipcode").value,
    address: document.getElementById("useraddress").value,
    addressNumber: document.getElementById("addressNumber").value,
    addressNeighborhood: document.getElementById("userneighborhood").value,
    addressCity: document.getElementById("usercity").value,
    addressState: document.getElementById("userstate").value,
    cc: document.getElementById("ccnum").value,
    validThru: document.getElementById("expmonth").value,
    cvv: document.getElementById("usercvv").value,
    ccName: document.getElementById("cname").value,
    cemail: document.getElementById("cemail").value,
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

async function payForItem(data) {
  const req = await fetch("https://api.pagar.me/1/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => await res.json());

  return req;
}

async function pay() {
  showLoading(true);

  let user = {
    id: "1",
    document: "03982237000103",
    phone: "21991943672",
  };
  if (JSON.parse(localStorage.getItem("userSession")) !== null) {
    user = JSON.parse(localStorage.getItem("userSession"));
  }

  const prodId = JSON.parse(localStorage.getItem("productId"));

  const payData = await getPaymentData(
    user.id,
    window.location.href.split("details.html?id=")[1]
  );

  let splitrule = [];
  if (document.getElementById("cdocument").value !== user.document) {
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
      document.getElementById("totalToPay-modal").innerHTML.replace(/\D/g, "")
    ),
    card_number: document.getElementById("ccnum").value.replace(/\D/g, ""),
    card_cvv: document.getElementById("usercvv").value,
    card_expiration_date: document
      .getElementById("expmonth")
      .value.replace(/\D/g, ""),
    card_holder_name: document.getElementById("cname").value,
    customer: {
      external_id: "#3311",
      name: document.getElementById("cname").value,
      type:
        document.getElementById("cdocument").value.length === 14
          ? "individual"
          : "corporation",
      country: "br",
      email: document.getElementById("cemail").value,
      documents: [
        {
          type:
            document.getElementById("cdocument").value.length === 14
              ? "cpf"
              : "cnpj",
          number: document.getElementById("cdocument").value.replace(/\D/g, ""),
        },
      ],
      phone_numbers: ["+55" + user.phone.replace(/\D/g, "")],
      birthday: "1988-03-01",
    },
    billing: {
      name: document.getElementById("cname").value,
      address: {
        country: "br",
        state: document.getElementById("userstate").value.toLowerCase(),
        city: document.getElementById("usercity").value,
        neighborhood: document.getElementById("userneighborhood").value,
        street: document.getElementById("useraddress").value,
        street_number: document
          .getElementById("addressNumber")
          .value.replace(/\D/g, ""),
        zipcode: document.getElementById("zipcode").value.replace(/\D/g, ""),
      },
    },
    items: [
      {
        id: "1",
        title: "Pagamento Ingresso eOfertas",
        unit_price: Number(
          document
            .getElementById("totalToPay-modal")
            .innerHTML.replace(/\D/g, "")
        ),
        quantity: 1,
        tangible: true,
      },
    ],
    split_rules: splitrule,
    api_key: payData.result[0].key,
  };

  // pay
  const paymentRes = await payForItem(values);
  if (paymentRes.errors) {
    getToast("danger", paymentRes.errors[0].message);
    showLoading(false);
    return;
  }

  // create booking
  const bookings = document.getElementById("bookingCardsArea").children;
  let bookingEl = [];
  for (let i = 0; i < bookings.length; i++) {
    req = await createBook({
      productId: prodId,
      productTypeId: document.getElementById("type" + (i + 1)).value,
      status: "PAID",
      name: document.getElementById("name" + (i + 1)).value,
      document: document.getElementById("cdocument").value.replace(/\D/g, ""),
      price: calculatePrice(document.getElementById("type" + (i + 1)).value),
      paymentType: "CREDIT CARD",
      agent: user.id,
      email: document.getElementById("cemail").value,
      req: "create_booking",
    });

    if (req.success === false) {
      getToast("danger", req.result);
      showLoading(false);
      return;
    }

    bookingEl = [...bookingEl, req.result.toString()];
  }

  let em = document.getElementById("cemail").value;
  await sendEmail(em, bookingEl);

  // redirect to my books
  getToast(
    "success",
    "Pagamento efetuado com sucesso. Verifique seu email ou caixa de spam."
  );
  setTimeout(() => {
    window.location.href = "../reservas/reservas.html";
  }, 6000);

  showLoading(false);
}

// zipcode format
function clean_form() {
  document.getElementById("useraddress").value = "";
  document.getElementById("userneighborhood").value = "";
  document.getElementById("usercity").value = "";
  document.getElementById("userstate").value = "";
}

function Callsback(conteudo) {
  if (!("erro" in conteudo)) {
    document.getElementById("useraddress").value = conteudo.logradouro;
    document.getElementById("userneighborhood").value = conteudo.bairro;
    document.getElementById("usercity").value = conteudo.localidade;
    document.getElementById("userstate").value = conteudo.uf;
  } else clean_form();
}

function GetPaymentAddress(valor) {
  var cep = valor.replace(/\D/g, "");

  if (cep != "") {
    var validacep = /^[0-9]{8}$/;

    if (validacep.test(cep)) {
      var script = document.createElement("script");
      script.src =
        "https://viacep.com.br/ws/" + cep + "/json/?callback=Callsback";
      document.body.appendChild(script);
    } else clean_form();
  } else clean_form();
}

async function sendEmail(email, bookCode) {
  let peopleCount = document.getElementById("bookingCardsArea").children.length;
  let peopleArr = [];
  for (let i = 0; i < peopleCount; i++) {
    peopleArr = [
      ...peopleArr,
      document.getElementById("name" + (i + 1)).value.toString(),
    ];
  }

  await sendEmailService(
    peopleCount > 1 ? peopleCount + " reservas" : peopleCount + " reserva",
    document.querySelector(".hero-title").innerHTML,
    document.getElementById("itemTitle").innerHTML,
    peopleCount,
    peopleArr,
    bookCode,
    document.getElementById("totalToPay-modal").innerHTML.replace(".", ","),
    email
  );
}
//#endregion

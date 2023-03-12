function getUserByType(id) {
  let code = 1;
  switch (id) {
    case "ADMINISTRATOR":
      code = 1;
      break;

    case "ESTABLISHMENT-ATTRACTION":
      code = 2;
      break;

    case "ESTABLISHMENT-RESTAURANT":
      code = 3;
      break;

    case "ESTABLISHMENT-HOTEL":
      code = 4;
      break;

    case "GUIDE":
      code = 5;
      break;

    case "AUTHORIZER":
      code = 6;
      break;

    case "PARTNER":
      code = 7;
      break;

    case "CLIENT":
      code = 8;
      break;
  }

  return code;
}

function getBookStatus(code) {
  let data = "";
  switch (code) {
    case "BOOKED":
      data = "RESERVADO";
      break;

    case "USED":
      data = "UTILIZADO";
      break;

    case "WAITING PAYMENT":
      data = "AGUARDANDO PAGAMENTO";
      break;

    case "PAID":
      data = "PAGO";
      break;

    case "OVERDUE":
      data = "VENCIDO";
      break;
  }

  return data;
}

function getBookStatusColor(code) {
  let data = "";
  switch (code) {
    case "BOOKED":
      data = "#6aa84f";
      break;

    case "WAITING PAYMENT":
      data = "#e69138";
      break;

    case "PAID":
      data = "#0737f7";
      break;

    case "USED":
      data = "#3d85c6";
      break;

    case "OVERDUE":
      data = "#ef2f2f";
      break;
  }

  return data;
}

function convertDate(date) {
  var newDate = date.split("/");
  return newDate[2] + "-" + newDate[1] + "-" + newDate[0];
}

function convertDateDash(date) {
  let newDate = date.split("-");
  return newDate[2] + "/" + newDate[1] + "/" + newDate[0];
}

function formatDate(date) {
  var newDate = date.split("-");
  return newDate[2] + "/" + newDate[1] + "/" + newDate[0];
}

async function baseRequest(body) {
  const url = window.location.href.includes("https://")
    ? "https://danielvazdev.com/api.php"
    : "http://localhost/api.php";

  const heroku = "https://cors-anywhere.herokuapp.com/";

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  }).then(async (response) => {
    return await response.json();
  });
}

// AUTH
function logout() {
  //clean session data
  localStorage.removeItem("userSession");

  //go to index
  window.location.href = "index.html";
}

async function deactivateAccount() {
  $("#modalDeactivateAccount").modal("show");
}

async function confirmDeactivateAccount() {
  showLoading(true);

  let user = JSON.parse(localStorage.getItem("userSession"));

  const aux = await baseRequest({
    id: user.id,
    name: user.name,
    email: user.email,
    pass: user.pass,
    phone: user.phone,
    document: user.document,
    type: user.type,
    addressZipcode: user.addressZipcode,
    address: user.address,
    addressNumber: user.addressNumber,
    addressComplement: user.addressComplement,
    addressNeighborhood: user.addressNeighborhood,
    addressCity: user.addressCity,
    addressState: user.addressState,
    addressCountry: user.addressCountry,
    details: user.details,
    regulation: user.regulation,
    img: user.img,
    recipientId: user.recipientId,
    percent: user.percent,
    status: 2,
    req: "edit_user",
  });

  if (aux.success === false) {
    showLoading(false);
    getToast("danger", aux.result);
    return;
  }

  getToast("success", "Conta desativada com êxito.");

  window.setTimeout(function () {
    showLoading(false);
    logout();
  }, 4000);
}

async function performRecover(email, document) {
  return await baseRequest({
    email: email,
    document: document,
    req: "recover",
  });
}

async function performLogin(email, pass) {
  return await baseRequest({
    email: email,
    pass: pass,
    req: "login",
  });
}

async function performSignup(name, userDoc, email, pass, phone) {
  return await baseRequest({
    name: name.trim(),
    document: userDoc.replace(/\D/g, ""),
    email: email.trim(),
    pass: pass.trim(),
    phone: phone.replace(/\D/g, ""),
    req: "signup",
  });
}

//
async function getTicketByQRCode(id) {
  const aux = await baseRequest({
    id: id,
    req: "get_booking_by_id",
  });

  return aux.result[0];
}

// ESTABLISHMENTS
async function getEstablishmentsToBook() {
  return await baseRequest({
    req: "get_establishments_to_book",
  });
}

async function getEstablishments() {
  return await baseRequest({
    req: "get_establishments",
  });
}

// USER
async function getUsers(type) {
  return await baseRequest({
    type: type,
    req: "get_users",
  });
}

async function getUserById(id) {
  return await baseRequest({
    id: id,
    req: "get_user_by_id",
  });
}

async function updateUser(body) {
  return await baseRequest(body);
}

// BOOKS
async function getBooked(document) {
  return await baseRequest({
    document: document,
    req: "get_booked",
  });
}

async function getBookById(bookId) {
  return await baseRequest({
    id: bookId,
    req: "get_booking_by_id",
  });
}

async function createBook(body) {
  return await baseRequest(body);
}

async function updateBook(id, status, type) {
  return await baseRequest({
    id: id,
    status: status,
    paymentType: type,
    req: "edit_booking",
  });
}

// PRODUCTS
async function getProducts() {
  return await baseRequest({
    req: "get_products",
  });
}

async function getProductById(id) {
  return await baseRequest({
    id: id,
    req: "get_product_by_id",
  });
}

async function getProductsByUserId(userId) {
  return await baseRequest({
    id: userId,
    req: "get_products_by_user_id",
  });
}

// TYPE
async function getTypeById(id) {
  return await baseRequest({
    id: id,
    req: "get_type_by_user_id",
  });
}

// PAYMENT
async function getPaymentData(userId, companyId) {
  return await baseRequest({
    companyId: companyId,
    agencyId: userId,
    userId: userId,
    req: "get_payment_data",
  });
}

// EMAIL
async function sendEmailService(
  people,
  estabName,
  productName,
  peopleCount,
  peopleArr,
  bookingArr,
  totalPaid,
  email
) {
  return await baseRequest({
    people: people,
    estabName: estabName,
    productName: productName,
    peopleCount: peopleCount,
    peopleArr: peopleArr,
    bookingArr: bookingArr,
    totalPaid: totalPaid,
    email: email,
    req: "send_email",
  });
}

// PLATFORM
async function getPlatform() {
  return await baseRequest({
    req: "get_platform",
  });
}

async function generalRequest(body) {
  return await baseRequest(body);
}
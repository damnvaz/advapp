
export function convertDate(date) {
  var newDate = date.split("/");
  return newDate[2] + "-" + newDate[1] + "-" + newDate[0];
}

export function convertDateDash(date) {
  let newDate = date.split("-");
  return newDate[2] + "/" + newDate[1] + "/" + newDate[0];
}

export function formatDate(date) {
  var newDate = date.split("-");
  return newDate[2] + "/" + newDate[1] + "/" + newDate[0];
}

export async function baseRequest(body) {
  const url = window.location.href.includes("https://")
    ? "https://iusok.com/api.php"
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
export function logout() {

  localStorage.removeItem("userSession");

  window.location.href = "index.html";
}




export async function performRecover(email) {
  return await baseRequest({
    email: email.trim(),
    req: "recover",
  });
}

export async function performLogin(login, pass) {
  return await baseRequest({
    login: login,
    pass: pass,
    req: "login",
  });
}

export async function performSignup(body) {
  return await baseRequest({
    name: body.name.trim(),
    document: body.userDoc.replace(/\D/g, "").trim(),
    nationalRegistration: body.rg.replace.replace(/\D/g, "").trim(),
    driversLicense: body.cnh.replace.replace(/\D/g, "").trim(),
    email: body.email.trim(),
    pass: body.pass.trim(),
    phone: body.phone.replace(/\D/g, ""),
    type: body.type.trim(),
    status: '1',
    address: address.trim(),
    createdAt: body.createdAt.trim(),
    recipientId: recipientId.trim(),
    martialStatus: martialStatus.trim(),
    occupation: occupation.trim(),
    workPassport: body.workPassport.replace(/\D/g, "").trim(),
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






async function updateBook(id, status, type) {
  return await baseRequest({
    id: id,
    status: status,
    paymentType: type,
    req: "edit_booking",
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


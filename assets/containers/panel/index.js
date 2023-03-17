import { Bottombar, Card, Loading } from "../../components/index.js";
import { baseRequest } from "../../queries/base.js";
import { isUserNotLogged } from "../../utils/checkSession.js";

async function getPageContent() {
  Loading(true);

  isUserNotLogged();

  const user = JSON.parse(localStorage.getItem("userSession"));
  const data = await getData(user);

  let cardsArr = [
    {
      url: "agenda.html",
      bg: "#FFE7D0",
      color: "#BC8761",
      title: "Agenda",
      description1: "hoje",
      value1: data?.agenda?.agendaForToday || 0,
      description2: "esta semana",
      value2: data?.agenda?.agendaForWeek || 0,
    },
    {
      url: "clients.html",
      bg: "#FFD0D0",
      color: "#BC6161",
      title: "Clientes",
      description1: "cadastrados",
      value1: data?.clients?.total || 0,
      description2: "hoje",
      value2: data?.clients?.signedUpToday || 0,
    },
    {
      url: "transactions.html",
      bg: "#D0D8FF",
      color: "#6170BC",
      title: "Transações",
      description1: "à receber",
      value1: data?.transactions?.toReceive || "0,00",
      description2: "recebido",
      value2: data?.transactions?.received || "0,00",
    },
  ];

  let cards = "";
  for (var i = 0; i < cardsArr.length; i++) {
    cards += Card(cardsArr[i]);
  }

  let bottombarArr = [
    { url: "documents.html", icon: "document" },
    { url: "reports.html", icon: "report" },
    { url: "add.html", icon: "add" },
    { url: "chat.html", icon: "chat" },
    { url: "settings.html", icon: "settings" },
  ];

  let el = `
      <div id="options" class="container mb-5">
        <div class="indexOptionsRowCard">
            <div class='panel-row'>
              <h3 class='panel-title'>Dashboard</h3>
              <img src="assets/icons/refresh.svg" 
                  alt="refresh icon"
                  id="refresh-icon"
                  class="refresh-icon" 
              /> 
            </div>
            ${cards}
            ${Bottombar(bottombarArr)}
        </div>
      </div>
    `;

  document.getElementById("content").innerHTML = el;

  document.querySelector("#refresh-icon").addEventListener("click", () => {
    getData(user);
  });

  Loading(false);
}

getPageContent();

async function getData(user) {
  const today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate();

  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const endOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + (6 - today.getDay())
  );

  let agenda = await baseRequest({
    id: user.id,
    req: "agenda_by_user_id",
  });

  agenda = agenda.result;
  let agendaForToday = agenda.map((item) => {
    return item.day === date && item;
  });

  let agendaForWeek = agenda.map((item) => {
    let date = new Date(item.day);
    if (date >= startOfWeek && date <= endOfWeek) {
      return item;
    }
  });

  agenda = {
    ...agenda,
    agendaForToday: agendaForToday.length,
    agendaForWeek: agendaForWeek.length,
  };

  let clients = await baseRequest({
    id: user.id,
    req: "clients_by_user_id",
  });

  clients = clients.result;
  let signedUpToday = clients.map((item) => {
    return item.createdAt === date && item;
  });

  clients = {
    ...clients,
    total: clients.length,
    signedUpToday: signedUpToday.length,
  };

  let transactions = await baseRequest({
    id: user.id,
    req: "transactions_by_user_id",
  });

  transactions = transactions.result;
  let toReceiveList = transactions.map((item) => {
    return !item.wasPaid && item;
  });

  let totalToReceive = 0;
  toReceiveList.map((item) => {
    totalToReceive += Number(item.amount);
  });

  let totalReceived = 0;
  transactions.map((item) => {
    totalReceived += Number(item.amount);
  });

  transactions = {
    ...transactions,
    toReceive: Number(totalToReceive).toFixed(2),
    received: Number(totalReceived).toFixed(2),
  };

  return [agenda, clients, transactions];
}

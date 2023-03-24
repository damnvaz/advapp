import { Bottombar, Card, Loading, PageTitle } from "../../components/index.js";
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
      url: "contracts.html",
      bg: "#D0D8FF",
      color: "#6170BC",
      title: "Contratos",
      description1: "em curso",
      value1: data?.contracts?.inProgress || "0",
      description2: "fechados",
      value2: data?.contracts?.done || "0",
    },
  ];

  let cards = "";
  for (var i = 0; i < cardsArr.length; i++) {
    cards += Card(cardsArr[i]);
  }

  let bottombarArr = [
    { url: "transactions.html", icon: "transaction" },
    { url: "users.html", icon: "users" },
    { url: "chats.html", icon: "chat" },
    { url: "settings.html", icon: "settings" },
  ];

  let el = `
  <section class="section-area">
      <div class="content">
        <div class='panel-row'>
          ${PageTitle("Dashboard")}
          <img src="assets/icons/refresh.svg" 
              alt="refresh icon"
              id="refresh-icon"
              class="refresh-icon" 
          /> 
        </div>
        
        <div class='panel-cards-content'> 
          ${cards}
        </div>
        ${Bottombar(bottombarArr)}
      </div>
    </section>
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


  let contracts = {
    inProgress: '3',
    done: '2'
  }

  return [agenda, contracts];
}

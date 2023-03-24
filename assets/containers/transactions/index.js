import {
  ArrowBack,
  Loading,
  PageTitle,
  Toast,
  TransactionRow,
} from "../../components/index.js";
import { baseRequest } from "../../queries/base.js";
import { translations } from "../../translations/index.js";
import { isUserNotLogged } from "../../utils/checkSession.js";
import { checkUserLanguage } from "../../utils/checkUserLanguage.js";

function SearchBar(id, placeholder) {
  return `
  <input
    type="search"
    placeholder="${placeholder}"
    class="form-control input search-bar"
    maxLength="180"
    id="${id}"
    required />
  `;
}

async function showPageContent() {
  Loading(true);

  isUserNotLogged();

  const user = JSON.parse(localStorage.getItem("userSession"));
  const lang = checkUserLanguage();
  // let req = await baseRequest({
  //   id: user.id,
  //   req: "get_transactions",
  // });
  // req = req.result;
  let req = [];

  document.getElementById("content").innerHTML = `
      <section class="section-area">
        <div class="content">
          ${ArrowBack()}

          <div class="top-content"> 
            ${PageTitle("Transações")}

            <img 
              class="refresh-icon"
              src="assets/icons/refresh.svg"
              alt="refresh icon"
              id="refresh_icon"
            />
          </div>
  
          ${SearchBar("search_bar", "Buscar por data / cliente / valor")}
          <div class="subcontent" id="transactions-list">
            ${TransactionRow(req)}
          </div>
        </div>
      </section>
    `;

  document.querySelector("#search_bar").addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
      const searchItem = document.querySelector("#search_bar").value;
      if (searchItem === "") {
        Toast("danger", "Digite algo para pesquisar");
        document.querySelector("#transactions-list").innerHTML =
          TransactionRow(req);
        return;
      }

      retriveBySearch(searchItem);
    }
  });

  Loading(false);
}
showPageContent();

async function retriveBySearch(search) {
  Loading(true);

  let arr = [];
  let list = document.querySelectorAll(".transaction-row");
  search = search.toLowerCase();

  for (let i = 0; i < list.length; i++) {
    if (list[i].name.includes(search)) {
      arr.push({
        day: "",
        month: "",
        type: "",
        payer: "",
        id: "",
        amount: "",
      });
    }
  }
  document.querySelector("#transactions-list").innerHTML = TransactionRow(arr);

  Loading(false);
}

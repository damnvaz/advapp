import {
  ArrowBack,
  Bottombar,
  Loading,
  PageTitle,
  ChatRow,
  UserRow,
  Toast,
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
  let users = await baseRequest({
    id: user.id,
    req: "clients_by_user_id",
  });
  users = users.result;

  document.getElementById("content").innerHTML = `
      <section class="section-area">
        <div class="content">
          <div class="top-content">
            ${ArrowBack()}

            <span 
              id="new_user"
              class="new-user-icon"
              onclick="window.location.href='new-client.html'"
            >
              Novo
            </span>
          </div>
            ${PageTitle(translations(lang)?.users_page_title)}
            ${SearchBar("search_bar", translations(lang)?.users_page_searchbar)}
  
          <div class="subcontent" id="users-list">
            ${UserRow(users)}
          </div>

        </div>
      </section>
    `;

  document.querySelector("#new_user").addEventListener("click", (e) => {
    window.location.href = "new-user.html";
  });

  document.querySelector("#search_bar").addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
      const searchItem = document.querySelector("#search_bar").value;
      if (searchItem === "") {
        Toast("danger", translations(lang)?.users_page_searchbar_empty);
        document.querySelector("#users-list").innerHTML = UserRow(users);
        return;
      }

      retriveUsersBySearch(searchItem);
    }
  });

  Loading(false);
}
showPageContent();

async function retriveUsersBySearch(search) {
  Loading(true);

  let usersArr = [];
  let users = document.querySelectorAll(".user-row-username");
  search = search.toLowerCase();

  for (let i = 0; i < users.length; i++) {
    let status =
      document.querySelectorAll(".user-row-status")[i].innerHTML === "Ativo"
        ? "1"
        : "2";

    let userName = document.querySelectorAll(".user-row-username")[i].innerHTML;
    let userDoc = document.querySelectorAll(".user-row-document")[i].innerHTML.replace(/\D/g, "");
    if (userName.toLowerCase().includes(search) || userDoc.includes(search)) {
      usersArr.push({
        name: userName,
        status: status,
        document: userDoc ,
        id: document.querySelectorAll(".user-row-user-id")[i].innerHTML,
      });
    }
  }
  console.log(usersArr)

  document.querySelector("#users-list").innerHTML = UserRow(usersArr);

  Loading(false);
}

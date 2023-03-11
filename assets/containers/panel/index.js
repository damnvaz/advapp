async function getPageContent() {
  showLoading(true);

  if (JSON.parse(localStorage.getItem("userSession")) === null) {
    window.location.href = "index.html";
  }

  const user = JSON.parse(localStorage.getItem("userSession"));
  const aux = await getUserById(user.id);

  let userIntro = "Olá, " + aux.result.name.split(" ")[0];
  if (aux.result.type === "ADMINISTRATOR") {
    userIntro = "Olá, Benvenuto";
  } else if (
    aux.result.type === "ESTABLISHMENT-ATTRACTION" ||
    aux.result.type === "ESTABLISHMENT-RESTAURANT" ||
    aux.result.type === "ESTABLISHMENT-HOTEL" ||
    aux.result.type === "GUIDE" ||
    aux.result.type === "AUTHORIZER"
  ) {
    userIntro = "Olá, Benvenuto - " + aux.result.name.split(" ")[0];
  }

  const partnerPhone = "(XX)9XXXX-XXXX";
  const footerOnCards = `
    <div style="margin-top: 50px; margin-bottom: 150px;">
      <a href="tel:${partnerPhone.replace(/\D/g, "")}" target="_blank"
        class="footerTextSubtitle footerAnchor"
      >Benvenuto - ${partnerPhone}</a><br />
    </div>
  `;

  let data = "";
  let isAdm = aux.result.type === "ADMINISTRATOR";
  let isEstab =
    aux.result.type === "ESTABLISHMENT-ATTRACTION" ||
    aux.result.type === "ESTABLISHMENT-RESTAURANT" ||
    aux.result.type === "ESTABLISHMENT-HOTEL";
  let isGuide = aux.result.type === "GUIDE";
  let isAuth = aux.result.type === "AUTHORIZER";
  let isPartner = aux.result.type === "PARTNER";
  let isClient = aux.result.type === "CLIENT";

  let arr = [
    { url: "users", title: "Usuários", type: "ADMINISTRATOR" },
    {
      url: "products",
      title: "Produtos",
      type: "ADMINISTRATOR,ESTABLISHMENT",
    },
    {
      url: "index",
      title: "Reservar",
      type: "ADMINISTRATOR,ESTABLISHMENT,GUIDE",
    },
    {
      url: "promos",
      title: "Promoções",
      type: "ADMINISTRATOR,ESTABLISHMENT",
    },
    {
      url: "authorize",
      title: "Autenticar",
      type: "ADMINISTRATOR,ESTABLISHMENT,AUTHORIZER",
    },
    {
      url: "books",
      title: "Minhas reservas",
      type: "ADMINISTRATOR,ESTABLISHMENT,GUIDE,AUTHORIZER,CLIENT",
    },
    {
      url: "index",
      title: "Reservar",
      type: "CLIENT",
    },
    {
      url: "finances",
      title: "Financeiro",
      type: "ADMINISTRATOR,ESTABLISHMENT,GUIDE,PARTNER",
    },
    {
      url: "profile",
      title: "Meu perfil",
      type: "ADMINISTRATOR,ESTABLISHMENT,GUIDE,CLIENT",
    },
  ];

  let cardsCount = 0;
  let cards = "";

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].type.includes("ADMINISTRATOR") && isAdm) {
      cardsCount++;
      cards += `
          <div onclick="goTo('${arr[i].url}')" class="indexOptionsCard" style="background-color: #2573bb; ">
                <label class="indexOptionsCardTitle">${arr[i].title}</label><br />
          </div>
        `;
    }

    if (arr[i].type.includes("ESTABLISHMENT") && isEstab) {
      cardsCount++;
      cards += `
          <div onclick="goTo('${arr[i].url}')" class="indexOptionsCard" style="background-color: #2573bb; ">
                <label class="indexOptionsCardTitle">${arr[i].title}</label><br />
          </div>
        `;
    }

    if (arr[i].type.includes("GUIDE") && isGuide) {
      cardsCount++;
      cards += `
          <div onclick="goTo('${arr[i].url}')" class="indexOptionsCard" style="background-color: #2573bb; ">
                <label class="indexOptionsCardTitle">${arr[i].title}</label><br />
          </div>
        `;
    }

    if (arr[i].type.includes("AUTHORIZER") && isAuth) {
      cardsCount++;
      cards += `
          <div onclick="goTo('${arr[i].url}')" class="indexOptionsCard" style="background-color: #2573bb; ">
                <label class="indexOptionsCardTitle">${arr[i].title}</label><br />
          </div>
        `;
    }

    if (arr[i].type.includes("PARTNER") && isPartner) {
      cardsCount++;
      cards += `
          <div onclick="goTo('${arr[i].url}')" class="indexOptionsCard" style="background-color: #2573bb; ">
                <label class="indexOptionsCardTitle">${arr[i].title}</label><br />
          </div>
        `;
    }

    if (arr[i].type.includes("CLIENT") && isClient) {
      cardsCount++;
      cards += `
          <div onclick="goTo('${arr[i].url}')" class="indexOptionsCard" style="background-color: #2573bb; ">
                <label class="indexOptionsCardTitle">${arr[i].title}</label><br />
          </div>
        `;
    }
  }

  let space = "";
  if (cardsCount % 3 !== 0 && cardsCount % 2 !== 0) {
    space = "<div class='blankIndexOptionsCard'></div>";
  }

  if (cardsCount % 3 !== 0 && cardsCount % 2 === 0) {
    space =
      "<div class='d-none d-xl-block d-lg-block blankIndexOptionsCard'></div><div class='blankIndexOptionsCard'></div>";
  }

  let el = `
      <div id="hero">
        <section class="section container heroPanel">
            <p class="indexHeroTitle" style="font-size: 1.1rem" id="userNamePanel">${userIntro}</p>

            <div class="logoutItem" onclick="logout()">Sair</div>
            <br />
        </section>
      </div>

      <div id="options" class="container mb-5">
        <div class="indexOptionsRowCard">
            ${cards}
            ${space}
        </div>
        ${isEstab || isGuide || isAuth ? footerOnCards : ""}
      </div>
    `;

  document.getElementById("content").innerHTML = el;
  showLoading(false);
}

getPageContent();

function goTo(page) {
  window.location.href = page + ".html";
}

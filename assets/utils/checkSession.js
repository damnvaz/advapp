export function isUserLogged() {
  if (JSON.parse(localStorage.getItem("userSession")) !== null) {
    window.location.href = "panel.html";
  }
}

export function isUserNotLogged() {
  if (JSON.parse(localStorage.getItem("userSession")) === null) {
    window.location.href = "index.html";
  }
}
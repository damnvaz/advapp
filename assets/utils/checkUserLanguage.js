export function checkUserLanguage() {
    let userLang = navigator.language || navigator.userLanguage;
    return userLang.toString();
}
  
export function navbarText(language) {

    const languages = [
      {
        login: "Login",
        panel: "Painel",
      },
      {
        login: "Login",
        panel: "Panel",
      },
    ];
  
    switch (language) {
      case "pt-BR":
        return languages[0];
  
      default:
        return languages[1];
    }
  };
    
  
export function footerText(language) {

  const languages = [
    {
      title1: "Descubra",
      text11: "Fale com a gente",
      text12: "Perguntas frequentes",
      url11: "talktous.html",
      url12: "faq.html",
      title2: "Sobre",
      text21: "Termos de uso",
      text22: "Políticas de privacidade",
      url21: "terms.html",
      url22: "policies.html",
      copyright: "todos os direitos reservados."
    },
    {
      title1: "Discover",
      text11: "Contact us",
      text12: "FAQ",
      url11: "talktous.html",
      url12: "faq.html",
      title2: "About",
      text21: "Terms and conditions",
      text22: "Privacy policy",
      url21: "terms.html",
      url22: "policies.html",
      copyright: "all rights reserved."
    },
  ];

  switch (language) {
    case "pt-BR":
      return languages[0];

    default:
      return languages[1];
  }
};
  
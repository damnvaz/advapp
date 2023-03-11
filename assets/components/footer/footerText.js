  
export function footerText(language) {

  const languages = [
    {
      title1: "Descubra",
      link11: "Fale com a gente",
      link12: "Perguntas frequentes",
      url11: "talktous.html",
      url12: "faq.html",
      title2: "Sobre",
      link21: "Termos de uso",
      link22: "Políticas de privacidade",
      url21: "terms.html",
      url22: "policies.html",
      copyright: "todos os direitos reservados."
    },
    {
      title1: "Discover",
      link11: "Contact us",
      link12: "FAQ",
      url11: "talktous.html",
      url12: "faq.html",
      title2: "About",
      link21: "Terms and conditions",
      link22: "Privacy policy",
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
  
export function indexText(language) {
  const languages = [
    {
      heroDescription: `Foque no que importa: <span style='font-family: "bold"'>sua advocacia</span>.`,
      yourLegalAndEffectiveToolTitle:
        "A <span>sua</span> ferramenta jurídica eficaz",
      yourLegalAndEffectiveToolDescription:
        "Aqui, advogar ficou mais fácil. A marcação de consultas é simples, os relatórios saem na hora e você ainda pode tirar dúvidas com outros usuários.",
      whatWeOffer: "O que oferecemos:",
      schedule: "Agenda online",
      proceduralManagement: "Gestão processual",
      proceduralNotifications: "Notificações processuais",
      financialManagement: "Gestão financeira",
      petitionsModel: "Modelos de petições",
      contractModel: "Contratos Modelos",
      helpForum: "Fórum de ajuda",
      custumerManagement: "Gerenciamento de clientes",
      filesManagement: "Gerenciamento de arquivos",
      tableValueOAB: "Tabela de valores OAB",
      fitsInYourPocket: "Cabe no seu bolso",
      andMuchMore: "E muito mais",
      joinNow: "acesse agora",
    },
    {
      heroDescription: `Focus on what matters: <span style='font-family: "bold"'>your advocacy</span>.`,
      yourLegalAndEffectiveToolTitle: "<span>Your</span> effective legal tool",
      yourLegalAndEffectiveToolDescription:
        "Here, advocating became easier. Scheduling appointments is simple, reports are available in real time and you can even share doubts with others users.",
      whatWeOffer: "What we offer:",
      schedule: "Online schedule",
      proceduralManagement: "Procedural management",
      proceduralNotifications: "Procedural notifications",
      financialManagement: "Financial management",
      petitionsModel: "Model petitions",
      contractModel: "Model contract",
      helpForum: "Help morum",
      custumerManagement: "Custumer management",
      filesManagement: "Files management:",
      tableValueOAB: "Table value OAB:",
      fitsInYourPocket: "Fit is in your pocket",
      andMuchMore: "And much more",
      joinNow: "signin now",
    },
  ];

  switch (language) {
    case "pt-BR":
      return languages[0];

    default:
      return languages[1];
  }
}

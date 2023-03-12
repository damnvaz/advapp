export function talktousText(language) {
  const languages = [
    {
      whoa: "Fale com a gente!",
      message: "Entre em com a gente pelos canais abaixo:",
      home: "Voltar para início",
    },
    {
      whoa: "Talk to us!",
      message: "Talk to us using the channels below:",
      home: "Go back home",
    },
  ];

  switch (language) {
    case "pt-BR":
      return languages[0];

    default:
      return languages[1];
  }
}

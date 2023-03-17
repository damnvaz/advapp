export function talktousText(language) {
  const languages = [
    {
      whoa: "Fale com a gente!",
      fullname: "Seu nome completo",
      message: "Sua mensagem aqui...",
    },
    {
      whoa: "Talk to us!",
      fullname: "Your full name",
      message: "Your message here...",
    },
  ];

  switch (language) {
    case "pt-BR":
      return languages[0];

    default:
      return languages[1];
  }
}

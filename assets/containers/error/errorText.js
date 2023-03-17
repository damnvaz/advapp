export function errorText(language) {
  const languages = [
    {
      whoa: 'Opa!',
      message:
        "A página não foi encontrada. Esta pode não estar atualizada ou ter sido removida.",
      home: "Voltar para início",
    },
    {
      whoa: 'Whoa!',
      message:
        "Page could not be found. It might be outdated or it has been removed.",
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

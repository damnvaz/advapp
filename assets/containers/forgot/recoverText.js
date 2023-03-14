export function recoverText(language) {
  const languages = [
    {
      info: "Insira o e-mail para redefinir sua senha.",
      title: "Esqueci a senha",
      button: "Enviar",
      email: "Email",
      validation: "Por favor, preencha o email",
    },
    {
      info: "Type your email to reset your password",
      title: "Forgot password",
      button: "Send",
      email: "Email",
      validation: "Please, fullfill the email",
    },
  ];

  switch (language) {
    case "pt-BR":
      return languages[0];

    default:
      return languages[1];
  }
}

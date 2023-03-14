export function signupText(language) {
  const languages = [
    {
      title: "Criar conta",
      personalData: "Dados pessoais",
      fullname: "Qual é seu nome completo?",
      birthdate: "Qual é sua data de nascimento?",
      martialStatus: "Estado civil",
      single: "Solteiro(a)",
      married: "Casado(a)",
      separated: "Separado(a)",
      divorced: "Divorciado(a)",
      widowed: "Viuvo(a)",
      generalData: "Dados gerais",
      iam: "Eu sou...",
      lawyer: "Advogado(a)",
      client: "Cliente",
      document: "Documento (CPF/CNPJ)",
      rg: "RG",
      phone: "Telefone celular",
      accountData: "Dados da conta",
      email: "Seu melhor email",
      pass: "Digite uma senha",
      forgotPassword: "Esqueci a senha",
      nextText: "próximo",
      previousText: "anterior",
      finishText: "cadastrar",
      validationName: "Por favor, preencha o nome completo.",
      validationBirth: "Por favor, preencha a data de nascimento.",
      validationDoc: "Por favor, preencha o Documento.",
      validationRG: "Por favor, preencha o RG.",
      validationPhone: "Por favor, preencha o Telefone celular.",
      validationEmail: "Por favor, preencha o email.",
      validationPass: "Por favor, preencha a senha.",
      validationPass8: "Por favor, preencha a senha com até 8 caracteres.",
    },
    {
      title: "Create an account",
      personalData: "Personal data",
      fullname: "What is your fullname?",
      birthdate: "What is your birthdate?",
      martialStatus: "Martial status",
      single: "Single",
      married: "Married",
      separated: "Separated",
      divorced: "Divorced",
      widowed: "Widowed",
      generalData: "General data",
      iam: "I am...",
      lawyer: "Lawyer",
      client: "Client",
      document: "Document",
      rg: "National registration",
      phone: "Phone number",
      accountData: "Account data",
      email: "Type your best email",
      pass: "Type a password",
      forgotPassword: "Forgot password",
      nextText: "next",
      previousText: "previous",
      finishText: "signup",
      validationName: "Please, fullfill the fullname.",
      validationBirth: "Please, fullfill the birthday date.",
      validationDoc: "Please, fullfill the document.",
      validationRG: "Please, fullfill the RG.",
      validationPhone: "Please, fullfill the phone number.",
      validationEmail: "Please, fullfill the email.",
      validationPass: "Please, fullfill the password.",
      validationPass8: "Please, fullfill the password with 8 characters.",
    },
  ];

  switch (language) {
    case "pt-BR":
      return languages[0];

    default:
      return languages[1];
  }
}

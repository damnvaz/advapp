export function translations(lang) {
  switch (lang) {
    case "pt-BR":
      return ptBR();

    default:
      return enUS();
  }
}

function ptBR() {
  return {
    error_page_whoa: "Opa!",
    error_page_message:
      "A página não foi encontrada. Esta pode não estar atualizada ou ter sido removida.",
    error_page_home: "Voltar para início",

    faq_page: "Perguntas frequentes",

    forgot_page_info: "Insira o e-mail para redefinir sua senha.",
    forgot_page_title: "Esqueci a senha",
    forgot_page_button: "Enviar",
    forgot_page_email: "Email",
    forgot_page_validation: "Por favor, preencha o email",

    index_page_heroDescription: `Foque no que importa: <span style='font-family: "bold"'>sua advocacia</span>.`,
    index_page_yourLegalAndEffectiveToolTitle:
      "A <span>sua</span> ferramenta jurídica eficaz",
    index_page_yourLegalAndEffectiveToolDescription:
      "Aqui, advogar ficou mais fácil. A marcação de consultas é simples, os relatórios saem na hora e você ainda pode tirar dúvidas com outros usuários.",
    index_page_whatWeOffer: "O que oferecemos:",
    index_page_schedule: "Agenda online",
    index_page_proceduralManagement: "Gestão processual",
    index_page_proceduralNotifications: "Notificações processuais",
    index_page_financialManagement: "Gestão financeira",
    index_page_petitionsModel: "Modelos de petições",
    index_page_contractModel: "Contratos Modelos",
    index_page_helpForum: "Fórum de ajuda",
    index_page_custumerManagement: "Gerenciamento de clientes",
    index_page_filesManagement: "Gerenciamento de arquivos",
    index_page_tableValueOAB: "Tabela de valores OAB",
    index_page_fitsInYourPocket: "Cabe no seu bolso",
    index_page_andMuchMore: "E muito mais",
    index_page_joinNow: "acesse agora",

    login_page_title: "Login",
    login_page_emailOrPhone: "Email ou telefone celular",
    login_page_password: "Senha",
    login_page_forgotPassword: "Esqueci a senha",
    login_page_loginButton: "Entrar",
    login_page_signupLink: "Novo aqui? cadastrar",
    login_page_validationEmail:
      "Por favor, preencha o email ou telefone celular.",
    login_page_validationPass: "Por favor, preencha o senha.",

    policies_page_title: "Políticas de privacidade",

    signup_page_title: "Criar conta",
    signup_page_personalData: "Dados pessoais",
    signup_page_fullname: "Qual é seu nome completo?",
    signup_page_birthdate: "Qual é sua data de nascimento?",
    signup_page_martialStatus: "Estado civil",
    signup_page_single: "Solteiro(a)",
    signup_page_married: "Casado(a)",
    signup_page_separated: "Separado(a)",
    signup_page_divorced: "Divorciado(a)",
    signup_page_widowed: "Viuvo(a)",

    signup_page_generalData: "Dados gerais",
    signup_page_iam: "Eu sou...",
    signup_page_lawyer: "Advogado(a)",
    signup_page_client: "Cliente",
    signup_page_document: "Documento (CPF/CNPJ)",
    signup_page_rg: "RG",
    signup_page_phone: "Telefone celular",
    signup_page_accountData: "Dados da conta",
    signup_page_email: "Seu melhor email",
    signup_page_pass: "Digite uma senha",
    signup_page_forgotPassword: "Esqueci a senha",
    signup_page_nextText: "próximo",
    signup_page_previousText: "anterior",
    signup_page_finishText: "cadastrar",
    signup_page_loginLink: "Tem conta? acesse agora",
    signup_page_validationName: "Por favor, preencha o nome completo.",
    signup_page_validationBirth: "Por favor, preencha a data de nascimento.",
    signup_page_validationDoc: "Por favor, preencha o Documento.",
    signup_page_validationRG: "Por favor, preencha o RG.",
    signup_page_validationPhone: "Por favor, preencha o Telefone celular.",
    signup_page_validationEmail: "Por favor, preencha o email.",
    signup_page_validationPass: "Por favor, preencha a senha.",
    signup_page_validationPass8:
      "Por favor, preencha a senha com até 8 caracteres.",

    talktous_page_whoa: "Fale com a gente!",
    talktous_page_fullname: "Seu nome completo",
    talktous_page_message: "Sua mensagem aqui...",

    terms_page_title: "Termos e condições de uso",

    settings_page_title: "Configurações",

    settings_page_leave_account: "Sair da conta",

    settings_page_profile: "Meus dados",
    settings_page_notifications: "Notificações",
    settings_page_plans: "Meu plano",
    settings_page_contact: "Fale com a gente",

    notifications_page_title: "Notificações",
    notifications_page_nomessages: "Não há dados à exibir.",

    profile_page_title: "Meus dados",
    profile_page_personal_data: "Dados pessoais",
    profile_page_address: "Endereço",
    profile_page_contact: "Contato",
    profile_page_other: "Outros",
    save_data: "Salvar dados",
    plans_page_title: "Meu plano",
    plans_page_current_plan: "Plano atual: ",

    chats_page_title: "Conversas",
    chats_page_new_chat: "Novo",
    chats_page_searchbar_placeholder: "Buscar pelo nome",
    chats_page_nomessages: "Não há conversas. Comece uma agora!",
    chats_page_you: "Você: ",

    new_chat_page_title: "Nova mensagem",
    new_chat_page_who_to_send: "Para quem você deseja enviar?",
    new_chat_page_your_message: "Sua mensagem aqui",
    new_chat_page_no_clients: "Sem clientes para exibir.",
    new_chat_send_button: "Enviar",
    new_chat_validation_no_clients: "Sem clientes para enviar mensagens.",

    email_client_page: "Enviar email",

    phone_client_page: "Ligar",
    phone_client_page_who_to_send: "Para quem você deseja ligar?",
    phone_client_page_validation_no_clients: "Sem clientes para ligar.",
    phone_client_page_call: "Ligar",

    community_page_title: "Comunidade",
    community_page_search: "Buscar mensagem",
    community_page_message: "Sua mensagem aqui",
    community_page_button: "enviar",

    users_page_title: "Clientes",
    users_page_searchbar: "Buscar pelo nome ou documento..",
    users_page_searchbar_empty: "Digite o nome ou documento para buscar",

    user_edit_page_personal_data: "Dados pessoais",
    user_edit_page_document: "CPF/CNPJ:",
    user_edit_page_national_registration: "Identidade:",
    user_edit_page_drivers_license: "CNH:",
    user_edit_page_work_passport: "Carteira de trabalho:",
    user_edit_page_birthdate: "Data de nascimento",

    new_user_page_save_data: "salvar",
    new_user_page_personal_data: "Dados pessoais",
    new_user_page_fullname: "Nome completo",
    new_user_page_document: "Documento (CPF/CNPJ)",
    new_user_page_national_registration: "RG",
    new_user_page_drivers_license: "CNH",
    new_user_page_work_passport: "Carteira de trabalho",
    new_user_page_birthdate: "Data de nascimento",
    new_user_page_contact_data: "Contato",
    new_user_page_phone: "Telefone celular",
    new_user_page_email: "Email",
    new_user_page_address_data: "Endereço",
    new_user_page_zipcode: "CEP",
    new_user_page_address: "Endereço",
    new_user_page_address_number: "Número",
    new_user_page_neighborhood: "Bairro",
    new_user_page_complement: "Complemento",
    new_user_page_city: "Cidade",
    new_user_page_state: "Estado",
    new_user_page_other_data: "Outros",
    new_user_page_occupation: "Ocupação profissional",
    new_user_page_observation: "* A senha é o telefone informado",
  
  };
}

function enUS() {
  return {
    error_page_whoa: "Whoa!",
    error_page_message:
      "Page could not be found. It might be outdated or it has been removed.",
    error_page_home: "Go back home",

    faq_page: "Frequently asked questions",

    forgot_page_info: "Type your email to reset your password",
    forgot_page_title: "Forgot password",
    forgot_page_button: "Send",
    forgot_page_email: "Email",
    forgot_page_validation: "Please, fullfill the email",

    index_page_heroDescription: `Focus on what matters: <span style='font-family: "bold"'>your advocacy</span>.`,
    index_page_yourLegalAndEffectiveToolTitle:
      "<span>Your</span> effective legal tool",
    index_page_yourLegalAndEffectiveToolDescription:
      "Here, advocating became easier. Scheduling appointments is simple, reports are available in real time and you can even share doubts with others users.",
    index_page_whatWeOffer: "What we offer:",
    index_page_schedule: "Online schedule",
    index_page_proceduralManagement: "Procedural management",
    proceduralNotifications: "Procedural notifications",
    index_page_financialManagement: "Financial management",
    index_page_petitionsModel: "Model petitions",
    index_page_contractModel: "Model contract",
    index_page_helpForum: "Help forum",
    index_page_custumerManagement: "Custumer management",
    index_page_filesManagement: "Files management:",
    index_page_tableValueOAB: "Table value OAB:",
    index_page_fitsInYourPocket: "Fits in your pocket",
    index_page_andMuchMore: "And much more",
    index_page_joinNow: "signin now",

    login_page_title: "Login",
    login_page_emailOrPhone: "Email ou phone number",
    login_page_password: "Password",
    login_page_forgotPassword: "Forgot password",
    login_page_loginButton: "Login",
    login_page_signupLink: "New here? signup",
    login_page_validationEmail: "Please, fullfill the email or phone number.",
    login_page_validationPass: "Please, fullfill the password",

    signup_page_martialStatus: "Martial status",
    signup_page_single: "Single",
    signup_page_married: "Married",
    signup_page_separated: "Separated",
    signup_page_divorced: "Divorced",
    signup_page_widowed: "Widowed",

    policies_page_title: "Privacy policy",

    talktous_page_whoa: "Talk to us!",
    talktous_page_fullname: "Your full name",
    talktous_page_message: "Your message here...",

    terms_page_title: "Terms and use conditions",

    settings_page_title: "Settings",
    settings_page_leave_account: "logout",

    settings_page_profile: "My profile",
    settings_page_notifications: "Notifications",
    settings_page_plans: "My subscriptions",
    settings_page_contact: "Talk to us",

    notifications_page_title: "Notifications",
    notifications_page_nomessages: "No data to show.",

    profile_page_title: "My profile",
    profile_page_personal_data: "Personal data",
    profile_page_address: "Address",
    profile_page_contact: "Contact",
    profile_page_other: "Other",
    save_button: "Save data",
    plans_page_title: "My subscription",

    plans_page_current_plan: "Current plan: ",

    chats_page_title: "Chats",
    chats_page_new_chat: "Compose",
    chats_page_searchbar_placeholder: "Search by name",
    chats_page_nomessages: "No chats. Start one now!",
    chats_page_you: "You: ",

    new_chat_page_title: "New chat",
    new_chat_page_who_to_send: "Who do you want to send?",
    new_chat_page_your_message: "Your message here",
    new_chat_page_no_clients: "No clients to show.",
    new_chat_send_button: "Send",
    new_chat_validation_no_clients: "No clients to send message.",

    email_client_page: "Send email",

    phone_client_page: "Call",
    phone_client_page_who_to_send: "Who do you want to call?",
    phone_client_page_validation_no_clients: "No clients to call.",
    phone_client_page_call: "Call",

    community_page_title: "Community",
    community_page_search: "Search message",
    community_page_message: "Your message here",
    community_page_button: "send",

    users_page_title: "Clients",
    users_page_searchbar: "Search by name or document",
    users_page_searchbar_empty: "Type the name or document to search",

    new_user_page_save_data: "save",
    new_user_page_personal_data: "Personal data",
    new_user_page_fullname: "Fullname",
    new_user_page_document: "Document (CPF/CNPJ)",
    new_user_page_national_registration: "National registration",
    new_user_page_drivers_license: "Drivers license",
    new_user_page_work_passport: "Work passport",
    new_user_page_birthdate: "Birthdate",
    new_user_page_contact_data: "Contact",
    new_user_page_phone: "Phone number",
    new_user_page_email: "Email",
    new_user_page_address_data: "Address",
    new_user_page_zipcode: "Zipcode",
    new_user_page_address: "Address",
    new_user_page_address_number: "Address number",
    new_user_page_neighborhood: "Neighborhood",
    new_user_page_complement: "Complement",
    new_user_page_city: "City",
    new_user_page_state: "State",
    new_user_page_other_data: "Other",
    new_user_page_occupation: "Occupation",
    new_user_page_observation: "* user passcode is the phone provided",
  };
}

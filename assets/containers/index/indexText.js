  
export function indexText(language) {

    const languages = [
      {
        aboutUsTitle: 'Sobre nós',
        aboutUsDescription: 'Nascemos com o propósito de ...',
        advantages: 'Vantagens',
        schedule: 'Agenda online',
        proceduralManagement: 'Gestão processual',
        proceduralNotifications: 'Notificações processuais',
        financialManagement: 'Gestão financeira',
        modelPetitions: 'Modelos de petições',
        helpForum: 'Fórum de ajuda',
        custumerManagement: 'Gerenciamento de clientes',
        filesManagement: "Gerenciamento de arquivos",
        tableValueOAB: 'Tabela de valores OAB',
        fitisInYourPocket: 'Cabe no seu bolso',
        andMuchMore: 'E muito mais',
        whatAreYouWaitingForTitle: 'Tá esperando o que?',
        whatAreYouWaitingForDescription: 'Cadastre-se agora e faça petições em segundos',
        singUpNow: 'Cadastre-se Agora',
      },
      {
        aboutUsTitle: 'About us',
        aboutUsDescription: 'We were born with the purpous of ...',
        advantages: 'Advantages',
        schedule: 'Online schedule',
        proceduralManagement: 'Procedural management',
        proceduralNotifications: 'Procedural notifications:',
        financialManagement: 'Financial management',
        modelPetitions: 'Model petitions',
        helpForum: 'Help morum',
        custumerManagement: 'Custumer management',
        filesManagement: 'Files management:',
        tableValueOAB: 'Table value OAB:',
        fitisInYourPocket: 'Fit is in your pocket',
        andMuchMore: 'And much more',
        whatAreYouWaitingForTitle: 'What are you waiting for?',
        whatAreYouWaitingForDescription: 'Sign up now and make petitions in seconds',
        singUpNow: 'Sing up now',
      },
      
    ];
  
    switch (language) {
      case "pt-BR":
        return languages[0];
  
      default:
        return languages[1];
    }
  };
    
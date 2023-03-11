  
export function indexText(language) {

    const languages = [
      {
        aboutUsTitle: 'Sobre nós',
        aboutUsDescription: 'Nascemos com o propósito de ...',
        advantages: 'Vantagens',
      },
      {
        aboutUsTitle: 'About us',
        aboutUsDescription: 'We were born with the purpous of ...',
        advantages: 'Advantages',
      },
      
    ];
  
    switch (language) {
      case "pt-BR":
        return languages[0];
  
      default:
        return languages[1];
    }
  };
    
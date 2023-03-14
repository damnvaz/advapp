  
export function loginText(language) {

    const languages = [
      {
        emailOrPhone: 'Email ou telefone celular',
        password: 'Senha',
        forgotPassword: 'Esqueci a senha',
        loginButton: 'Entrar',
        signupLink: 'Novo aqui? cadastrar',
        validationEmail: 'Por favor, preencha o email ou telefone celular.',
        validationPass: 'Por favor, preencha o senha.',
      },
      {
        emailOrPhone: 'Email ou phone number',
        password: 'Password',
        forgotPassword: 'Forgot password',
        loginButton: 'Login',
        signupLink: 'New here? signup',
        validationEmail: 'Please, fullfill the email or phone number.',
        validationPass: 'Please, fullfill the password',
      },
      
    ];
  
    switch (language) {
      case "pt-BR":
        return languages[0];
  
      default:
        return languages[1];
    }
  };
    
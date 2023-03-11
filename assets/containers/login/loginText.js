  
export function loginText(language) {

    const languages = [
      {
        emailOrPhone: 'Email ou telefone celular',
        password: 'Senha',
        forgotPassword: 'Esqueci a senha',
        loginButton: 'Entrar',
        signupLink: 'Novo aqui? cadastrar'
      },
      {
        emailOrPhone: 'Email ou phone number',
        password: 'Password',
        forgotPassword: 'Forgot password',
        loginButton: 'Login',
        signupLink: 'New here? signup'
      },
      
    ];
  
    switch (language) {
      case "pt-BR":
        return languages[0];
  
      default:
        return languages[1];
    }
  };
    
function showPageContent() {
  const year = new Date().getFullYear();

  let el = `
        <div class="not-found-bg">
            <div class='navbar-brand'>
                <img  src='assets/logo.svg' alt="company logo" />
                <span class="company">eOfertas</span>
            </div>
            <div class="inner">
                <h2>Opa!</h2>
                <h5>
                    A página não foi encontrada. Esta pode não estar atualizada ou ter sido removida.
                </h5>
                <a href="index.html">Voltar para início</a>
            </div>

            <span id="copyrightText" class="copyrightText copyright-data">© Copyright ${year}</span><br /><br />
        </div>
    `;

  document.getElementById("content").innerHTML = el;
}

showPageContent();

export function Toast(bg, text) {
  //bg-color: success || danger;

  let el = `
        <div id="toastAlert" class="toast-area" role="dialog">
            <div class="toast-dialog">
                <div class="bg-${bg} toast-content" >
                    <div style="display: flex; flex-direction: row; padding-right: 20px;">
                        <span class="toast-title">${text}</span>
                        <button  
                            type="button" 
                            class="close text-white toast-close" id='closeToast'>
                                &times;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

  document.getElementById("toast").innerHTML = el;
  document.getElementById("toastAlert").style.display = "block";

  document.querySelector("#closeToast").addEventListener("click", () => {
    hideToast();
  });

  window.setTimeout(function () {
    hideToast();
  }, 5000);
}

export function hideToast() {
  document.getElementById("toastAlert").style.display = "none";
}

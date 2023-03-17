

function getModals() {

  document.getElementById("modals").innerHTML =
    modalInfo() +
    modalProduct() +
    modalDeactivateAccount() +
    modalPurchaseDetails() +
    modalUser() +
    modalPromo() +
    modalBook() + modalConfirmPayment();
}

function modalInfo() { 
  return `
        <div id="modalInfo" class="modal-area">
            <div class="modal-dialog">
                <div class="modal-content modal-content-area">
                    <div class="modal-header">
                        <span class="modal-title">Detalhes</span>
                        <span class="close modal-close-button" onclick="hideModal('modalInfo')">&times;</span>
                    </div>
                    <div class="modal-body modal-body-area">
                        <label class="modal-label" id='labelModal'></label>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function modalDeactivateAccount() {
  return `
        <div id="modalDeactivateAccount" class="modal-area">
            <div class="modal-dialog">
                <div class="modal-content modal-content-area">
                    <div class="modal-header">
                        <span class="modal-title">Aviso</span>
                        <span class="close modal-close-button" onclick="hideModal('modalDeactivateAccount')">&times;</span>
                    </div>
                    <div class="modal-body modal-body-area">

                        <label class="modal-label">
                            Ao desativar sua conta, você não terá mais acesso a plataforma. Deseja prosseguir?
                        </label>

                        <div style="display: flex; justify-content: center; margin-top: 40px;">
                            <button
                                onclick="confirmDeactivateAccount()"
                                class="btn btn-success mr-2 button-red-outline"
                            >
                                desativar
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function modalProduct() {
  return `
        <div id="modalProduct" class="modal-area">
            <div class="modal-dialog">
                <div class="modal-content modal-content-area">
                    <div class="modal-header">
                        <span class="modal-title">Promoção</span>
                        <span class="close modal-close-button" onclick="hideModal('modalProduct')">&times;</span>
                    </div>
                    <div class="modal-body modal-body-area">

                        <div class="form-group modal-form-group">
                            ${showInputLabel("Estabelecimento")}
                            ${showSelect("modalProduct-estab", "", ``)}
                        </div>

                        <div class="form-group modal-form-group">
                            ${showInputLabel("Título")}
                            ${showInput(
                              "modalProduct-title",
                              "",
                              "text",
                              "",
                              null
                            )}
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Preço antigo (R$)")}
                            ${showInput(
                              "modalProduct-price",
                              "Ex: 120.00",
                              "text",
                              "",
                              null
                            )}
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Preço novo (R$)")}
                            ${showInput(
                              "modalProduct-promoPrice",
                              "Ex: 90.00",
                              "text",
                              "",
                              null
                            )}
                            </div>
                            
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Detalhes")}
                            ${showTextArea(
                              "modalProduct-details",
                              "",
                              "text",
                              "1200",
                              null
                            )}
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Validade")}
                            ${showInput(
                              "modalProduct-validThru",
                              "",
                              "tel",
                              "10",
                              JSON.stringify(
                                "onkeydown='javascript: fMasc( this, mDataNasc );'"
                              )
                            )}
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Status")}
                            ${showSelect(
                              "modalProduct-status",
                              "",
                              `
                                <option style='color: #0a0a0a' value='1' selected='selected'>
                                    Ativo
                                </option>
                                <option style='color: #0a0a0a' value='2'>
                                    Inativo
                                </option>
                              `
                            )}
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Dia marcado")}
                            ${showSelect(
                              "modalProduct-hasScheduleDay",
                              "",
                              `
                              <option value='1' selected='selected'>Não</option>
                              <option value='2'>Sim</option>
                              `
                            )}
                        </div>
                        <div style="margin-bottom: 100px; display: table"></div>

                        <span id="modalProduct-id" style="display: none;" ></span>
                    </div>

                    <div class="modal-button-area">
                        <div class="modal-button-space">
                            <div class="modal-button" onclick="saveProduct()">
                                salvar
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  `;
}

function modalPurchaseDetails() {
  return `
        <div id="modalPurchaseDetails" class="modal-area">
            <div class="modal-dialog">
                <div class="modal-content modal-content-area">
                    <div class="modal-header">
                        <span class="modal-title">Reserva</span>
                        <span class="close modal-close-button" onclick="hideModal('modalPurchaseDetails')">&times;</span>
                    </div>
                    <div class="modal-body modal-body-area">
                        <div class="form-group" 
                            style="display: flex; flex-direction: column; margin: 0px auto; text-align: center;" 
                            id="modalPurchaseData">

                            <div id="modalDivQRCode" style="display: none;"> 
                                <img id="purchaseItemImg"
                                style="
                                    width: 300px;
                                    height: 300px;
                                    display: flex;
                                    margin: 0px auto;
                                "
                                src="" alt="purchase item qrcode" />
                            </div>
                            
                            <span class="modal-label-above" id="purchaseItemName"></span>
                            
                            <span class="modal-label-above">Reserva</span>
                            <span class="modal-label-below" id="purchaseItemBookingDate"></span>
                            
                            <span class="modal-label-above">Validade</span>
                            <span class="modal-label-below" id="purchaseItemValidDate"></span>
                            
                            <br/>
                            <span class="modal-label-above">Voucher</span>
                            <span class="modal-label-below" id="purchaseItemVoucher"></span>
                            <br/>
                            
                            <span class="modal-label-above">Valor (R$)</span>
                            <span class="modal-label-below" id="purchaseItemAmount"></span>
                            <br/>
                            
                            <br/>
                            <label style='display: table; margin: 0px auto; font-family: bold;' id="purchaseItemStatus"></label>
                            
                            <br />
                            <div id="modalDivGoToCheckoutPage" style="display: none;">
                                <div class="modal-button-space">
                                    <div class="modal-button" 
                                        onclick='goToCheckoutToPay(document.getElementById("purchaseItemVoucher").innerHTML.replace("#", ""))'>
                                        ir para pagamento
                                    </div>
                                </div>
                            </div>

                            <br/>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    `;
}

function modalUser() {
  return `
    <div id="modalUser" class="modal-area">
            <div class="modal-dialog">
                <div class="modal-content modal-content-area">
                    <div class="modal-header">
                        <span class="modal-title">Usuário</span>
                        <span class="close modal-close-button" onclick="hideModal('modalUser')">&times;</span>
                    </div>
                    <div class="modal-body modal-body-area">

                        <div class="form-group modal-form-group">
                            ${showInputLabel("Nome")}
                            ${showInput("modalUser-name", "", "text", "", null)}
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Status")}
                            ${showSelect(
                              "modalUser-status",
                              "",
                              `
                                <option value="1" selected="selected">Ativo</option>
                                <option value="2">Inativo</option>
                              `
                            )}
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Tipo de usuário")}
                            ${showSelect(
                              "modalUser-type",
                              "",
                              `
                                <option value="" selected="selected">Selecione</option>
                                <option value="ADMINISTRATOR">Administrador</option>
                                <option value="ESTABLISHMENT-ATTRACTION">Parque</option>
                                <option value="ESTABLISHMENT-RESTAURANT">Restaurante</option>
                                <option value="ESTABLISHMENT-HOTEL">Hotel</option>
                                <option value="GUIDE">Guia/Agência</option>
                                <option value="AUTORIZER">Autorizador</option>
                                <option value="CLIENT">Cliente</option>
                                `
                            )}
                        </div>

                        <div class="form-group modal-form-group">
                            ${showInputLabel("Documento")}
                            ${showInput(
                              "modalUser-document",
                              "",
                              "tel",
                              "18",
                              JSON.stringify(
                                "onkeydown='javascript: fMasc( this, mCPFCNPJ );'"
                              )
                            )}
                        </div>
                        

                        <div class="form-group modal-form-group">
                            ${showInputLabel("Telefone")}
                            ${showInput(
                              "modalUser-phone",
                              "",
                              "tel",
                              "14",
                              JSON.stringify(
                                "onkeydown='javascript: fMasc( this, mTel );'"
                              )
                            )}
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Email de acesso")}
                            ${showInput(
                              "modalUser-email",
                              "",
                              "email",
                              "",
                              null
                            )}
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Senha de acesso")}
                            ${showInput(
                              "modalUser-pass",
                              "",
                              "password",
                              "8",
                              null
                            )}
                            
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Detalhes")}
                            ${showTextArea(
                              "modalUser-details",
                              "",
                              "text",
                              "1200",
                              null
                            )}
                        </div>
                       
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Regulamento")}
                            ${showTextArea(
                              "modalUser-regulation",
                              "",
                              "text",
                              "1200",
                              null
                            )}
                        </div>

                        <div class="form-group modal-form-group">
                            ${showInputLabel("CEP")}
                            ${showInput(
                              "modalUser-zipcode",
                              "",
                              "tel",
                              "10",
                              JSON.stringify(
                                `onkeydown='javascript: fMasc( this, mCEP );' 
                                onblur='javascript: Zipcode(this.value,
                                    "modalUser-address", 
                                    "modalUser-addressNeighborhood", 
                                    "modalUser-addressCity", 
                                    "modalUser-addressState")'`
                              )
                            )}
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Endereço")}
                            ${showInput(
                              "modalUser-address",
                              "",
                              "text",
                              "",
                              null
                            )}
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Número")}
                            ${showInput(
                              "modalUser-addressNumber",
                              "",
                              "number",
                              "",
                              null
                            )}
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Complemento")}
                            ${showInput(
                              "modalUser-addressComplement",
                              "",
                              "text",
                              "",
                              null
                            )}
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Bairro")}
                            ${showInput(
                              "modalUser-addressNeighborhood",
                              "",
                              "text",
                              "",
                              null
                            )}
                        </div>

                        <div class="form-group modal-form-group">
                            ${showInputLabel("Cidade")}
                            ${showInput(
                              "modalUser-addressCity",
                              "",
                              "text",
                              "",
                              null
                            )}
                        </div>
                       
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Estado")}
                            ${showInput(
                              "modalUser-addressState",
                              "",
                              "text",
                              "2",
                              null
                            )}
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Id do recebedor")}
                            ${showInput(
                              "modalUser-recipientId",
                              "",
                              "text",
                              "",
                              null
                            )}
                        </div>
                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Percentual de recebimento")}
                            ${showInput(
                              "modalUser-percent",
                              "",
                              "tel",
                              "2",
                              null
                            )}
                        </div>

                        <div class="form-group modal-form-group">
                            ${showInputLabel("Imagem (link do drive)")}
                            ${showInput(
                              "modalUser-img",
                              "https://drive.google.com/uc?export=view&id=",
                              "text",
                              "",
                              null
                            )}
                        </div>

                        <div style="margin-bottom: 100px; display: table"></div>

                        <span id="modalUser-id" style="display: none;" ></span>
                        
                    </div>

                    <div class="modal-button-area">
                        <div class="modal-button-space">
                            <div class="modal-button" onclick="saveUser()">
                                salvar
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  `;
}

function modalPromo() {
  return `
   <div id="modalPromo" class="modal-area">
            <div class="modal-dialog">
                <div class="modal-content modal-content-area">
                    <div class="modal-header">
                        <span class="modal-title">Promoção</span>
                        <span class="close modal-close-button" onclick="hideModal('modalPromo')">&times;</span>
                    </div>
                    <div class="modal-body modal-body-area">

                        <div class="form-group modal-form-group">
                            ${showInputLabel("Estabelecimento")}
                            ${showSelect("modalPromo-estab", "", ``)}
                        </div>

                        <div class="form-group modal-form-group">
                            ${showInputLabel("Título")}
                            ${showInput(
                              "modalPromo-title",
                              "",
                              "text",
                              "",
                              null
                            )}
                        </div>

                        <div class="form-group modal-form-group">
                            ${showInputLabel("Percentual (%)")}
                            ${showInput(
                              "modalPromo-percent",
                              "placeholder",
                              "type",
                              "2",
                              null
                            )}
                        </div>

                        
                        <div class="form-group modal-form-group">
                            ${showInputLabel("Status")}
                            ${showSelect(
                              "modalPromo-status",
                              "",
                              `
                                <option value="1" selected="selected">Ativo</option>
                                <option value="2">Inativo</option>
                              `
                            )}
                        </div>
                        
                        <div style="margin-bottom: 100px; display: table"></div>

                        <span id="modalPromo-id" style="display: none;" ></span>
                        
                    </div>

                    <div class="modal-button-area">
                        <div class="modal-button-space">
                            <div class="modal-button" onclick="savePromo()">
                                salvar
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  `;
}

function modalBook() {
  return `
    <div id="modalBook" class="modal-area">
            <div class="modal-dialog">
                <div class="modal-content modal-content-area">
                    <div class="modal-body modal-body-area">
                        <div style="display: flex; flex-direction: column; padding: 10px 15px 0px 15px;">
                            <span class="modal-goback" onclick="hideModal('modalBook');"> &lt; voltar </span>
                            <span class="itemTitle" id="itemTitle" style="font-size: 1.1rem;"></span>

                            <span class="itemUnitPrice" id="itemUnitPrice"></span>
                        </div><br/>

                        <div id="bookings"></div>
                        <div style="display: table; margin-bottom: 20px;"></div>
                        
                        <section id="sectionServices" class="section">
                            <div
                                class="container"
                                style="
                                    display: flex;
                                    flex-direction: row;
                                    flex-wrap: wrap;
                                    justify-content: center;
                                "
                            >
                                <div class="bookingCard">
                                    <span class="itemTitle" id="itemTitle" style="font-size: 1.1rem;">
                                        Dados de pagamento
                                    </span><br/>
                                    
        
                                    <div class="form-group modal-form-group" style="margin-top: 25px; width: 100%;">
                                        ${showInputLabel("Número do cartão")}
                                        ${showInput(
                                          "ccnum",
                                          "",
                                          "tel",
                                          "19",
                                          JSON.stringify(
                                            "onkeydown='javascript: fMasc( this, mCartao );'"
                                          )
                                        )}
                                        
                                        ${showInputLabel(
                                          "Nome do Titular do Cartão"
                                        )}
                                        ${showInput(
                                          "cname",
                                          "",
                                          "text",
                                          "",
                                          null
                                        )}
                                        
                                        ${showInputLabel(
                                          "Documento do Titular do Cartão"
                                        )}
                                        ${showInput(
                                          "cdocument",
                                          "",
                                          "tel",
                                          "18",
                                          JSON.stringify(
                                            "onkeydown='javascript: fMasc( this, mCPFCNPJ );'"
                                          )
                                        )}
                                        
                                        ${showInputLabel("Validade (mm/aa)")}
                                        ${showInput(
                                          "expmonth",
                                          "",
                                          "tel",
                                          "5",
                                          JSON.stringify(
                                            "onkeydown='javascript: fMasc( this, mValidadeCartao );'"
                                          )
                                        )}
                                        
                                        ${showInputLabel("CVV")}
                                        ${showInput(
                                          "usercvv",
                                          "",
                                          "password",
                                          "4",
                                          null
                                        )}
                                        
                                        ${showInputLabel(
                                          "Email para envio do Voucher"
                                        )}
                                        ${showInput(
                                          "cemail",
                                          "",
                                          "email",
                                          "",
                                          null
                                        )}
                                    </div>
        
                                </div>
        
                                <div class="bookingCard">
                                    <span class="itemTitle" id="itemTitle" style="font-size: 1.1rem;">
                                        Endereço de cobrança
                                    </span><br/>

                                    <div class="form-group modal-form-group" style="margin-top: 25px; width: 100%;">
                                        ${showInputLabel("CEP")}
                                        ${showInput(
                                          "zipcode",
                                          "",
                                          "tel",
                                          "10",
                                          JSON.stringify(
                                            `
                                            onkeydown='javascript: fMasc( this, mCEP );' 
                                            onblur='javascript: Zipcode(this.value,
                                                "useraddress", 
                                                "userneighborhood", 
                                                "usercity", 
                                                "userstate")'
                                            `
                                          )
                                        )}
                                        
                                        ${showInputLabel("Endereço")}
                                        ${showInput(
                                          "useraddress",
                                          "",
                                          "text",
                                          "",
                                          null
                                        )}
                                        
                                        ${showInputLabel("Número")}
                                        ${showInput(
                                          "addressNumber",
                                          "",
                                          "number",
                                          "",
                                          null
                                        )}
                                        
                                        ${showInputLabel("Bairro")}
                                        ${showInput(
                                          "userneighborhood",
                                          "",
                                          "text",
                                          "",
                                          null
                                        )}
                                        
                                        ${showInputLabel("Cidade")}
                                        ${showInput(
                                          "usercity",
                                          "",
                                          "text",
                                          "",
                                          null
                                        )}
                                        
                                        ${showInputLabel("Estado")}
                                        ${showInput(
                                          "userstate",
                                          "",
                                          "text",
                                          "2",
                                          null
                                        )}
                                    </div>
                                </div>
                            
                            </div>
                        </section>
                        
                        <div style="display: table; margin-bottom: 30px;"></div>
                        <span class="itemTitle" style="font-size: 1.1rem;">Total a pagar (R$)</span>
                        <span class="itemTitle" style="font-size: 1.1rem; color: green;" id="totalToPay-modal"></span>

                        <div style="display: table; margin-bottom: 120px;"></div>
                    </div>

                    <div class="modal-button-area">
                        <div class="modal-button-space">
                            <div class="modal-button" onclick="book()">
                                pagar
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  `;
}

function modalConfirmPayment() {
    return `

    <div id="modalConfirmPayment" class="modal-area">
            <div class="modal-dialog">
                <div class="modal-content modal-content-area">
                    <div class="modal-body modal-body-area">
                        <div style="display: flex; flex-direction: column; padding: 10px 15px 0px 15px;">
                            <span class="modal-goback" onclick="hideModal('modalConfirmPayment'); showModal('modalBook');"> &lt; voltar </span>
                            <span class="itemTitle" id="itemTitle" style="font-size: 1.1rem;">Resumo do pedido</span>
                        </div>

                        <div style="display: flex; flex-direction: column; padding: 10px 15px 0px 15px;">
                            <div id="confirm-payment-data"></div><br/><br/>
                        </div>
                    </div>

                    <div class="modal-button-area">
                        <div class="modal-button-space">
                            <div class="modal-button" onclick="pay()">
                                confirmar compra
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  `;
}

function showModal(modal) {
  document.getElementById(modal).style.display = "block";
}

function hideModal(modal) {
  document.getElementById(modal).style.display = "none";
}

getModals();
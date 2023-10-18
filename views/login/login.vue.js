const AppTemplate = `

<div class="control-section" style="margin-top: 5%;">

    <div class="login-page">
        <div class="form">
            <div style="font-weight: bold; margin-bottom: 20px; font-size: 20px; color: black;">Login</div>
            <form class="register-form" id="frmregister">
                <input type="text" placeholder="name" />
                <input type="password" placeholder="password" />
                <input type="text" placeholder="email address" />
                <button>create</button>
                <p class="message">Already registered? <a href="#">Sign In</a></p>
            </form>
            <form class="login-form" id="frmLogin">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-bottom: 10px;">
                    <ejs-maskedtextbox
                        ref="CPF"
                        id="CPF"
                        mask="###.###.###-##"
                        floatLabelType="Auto"
                        cssClass="e-outline"
                        maxlength="14"
                        placeholder='CPF'
                        v-model="input.CPF">
                    </ejs-maskedtextbox>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-bottom: 10px;">
                    <ejs-textbox
                        ref="senhaAtual"
                        id="senha_atual"
                        type="password"
                        style="text-transform: unset;"
                        floatLabelType="Auto"
                        cssClass="e-outline"
                        maxlength="30"
                        placeholder="Senha"
                        v-model="input.SENHA">
                    </ejs-textbox>
                </div>
                <button type="button" id="btnLgn" @click="Login">login</button>
                <p class="message"><a @click="nova_senha" style="color: #4169E1">Esqueceu a senha?</a></p>
            </form>
        </div>
    </div>
    <footer class="bg-light text-lg-left fixed-bottom">
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
            Sistemas de Horas - 2023
        </div>
    </footer>
    <ejs-dialog
        isModal='true'
        :buttons="modalButtons"
        ref="modal"
        v-bind:visible="false"
        :animationSettings="{ effect: 'None' }"
        :showCloseIcon='false'
        :closeOnEscape='false'
        target="body"
        style="margin: 10px"
        width="700px">
        <div class="row">
            <div class="col col-md-12">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                    <div class="e-card-content" style="margin-bottom: 20px;">
                        <h5 style="font-weight: bold;">Informe seu E-mail</h5>
                    </div>
                    <div class="row">
                        <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"></div>
                        <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8" style="margin-bottom: 10px;">
                            <ejs-textbox
                                ref="emial"
                                id="email"
                                type="text"
                                style="text-transform: unset;"
                                floatLabelType="Auto"
                                cssClass="e-outline"
                                maxlength="100"
                                placeholder="E-mail"
                                v-model="input.EMAIL">
                            </ejs-textbox>
                        </div>
                        <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2"></div>
                    </div>
                </div>
            </div>
        </div>
    </ejs-dialog>
</div>
`;

/* ANOTAÇÕES
*/

Vue.component("AppVue", {
  template: AppTemplate,
  data() {
    return {
        input: {
            CPF: null,
            SENHA: null,
            EMAIL: null,
            count: 0
        },
        modalButtons: null,
    }
  },
    methods: {
        Login() {
            if(this.input.CPF == null || this.input.CPF.trim() == ''){
                dialogAlert({
                    msg: "Por Favor, insira o CPF.",
                    closeEsc: true,
                    btnOkText: "Fechar"
                })
                return;
            }
            if(this.input.SENHA == null || this.input.SENHA.trim() == ''){
                dialogAlert({
                    msg: "Por Favor, insira a Senha.",
                    closeEsc: true,
                    btnOkText: "Fechar"
                })
                return;
            }
            var obj = {
                'CPF': this.input.CPF,
                'SENHA': this.input.SENHA
            }
            axios.post(BASE + "/login/Login",obj).then(res => {
                if(res.data.code == "0"){
                    dialogAlert({
                        msg: res.data.msg,
                        closeEsc: true,
                        btnOkText: "Fechar"
                    })
                    return;
                }
                window.location.href = BASE + '/index/'
            });
        },
        nova_senha(){
            this.abrirModal();
        },
        EnviarEmail(){
            if(this.input.EMAIL == null || this.input.EMAIL.trim() == ''){
                dialogAlert({
                    msg: 'Por Favor, Insira o E-mail!!',
                    closeEsc: true,
                    btnOkText: "Fechar"
                })
                return;
            }
            var obj = {
                'EMAIL': this.input.EMAIL
            }
            axios.post(BASE + "/login/EnviarEmail",obj).then((res) => {
                if(res.data.code == "0"){
                    dialogAlert({
                        msg: res.data.msg,
                        closeEsc: true,
                        btnOkText: "Fechar"
                    })
                    return;
                }
                // dialogAlert({
                //     msg: res.data.msg,
                //     closeEsc: true,
                //     btnOkText: "Fechar"
                // })
                // return;
            })
        },
        abrirModal() {
            this.$refs.modal.show();
            this.modalButtons = [{ click: this.EnviarEmail, buttonModel: { cssClass: "e-outline", content: '<i class="fas fa-check"></i>&nbsp&nbspEnviar' } }, { click: this.fecharModal, buttonModel: { cssClass: "e-outline", content: '<i class="fas fa-times-circle"></i>&nbsp&nbspFechar' } }];
        },
        fecharModal() {
            this.$refs.modal.hide();
        },
    },
    mounted() {
        this.$refs.CPF.focusIn();
        // this.$refs.senhaAtual.addIcon('append', 'fas fa-eye-slash');
        // console.log(document.querySelector('#senha_atual> fa-eye-slash'));
        // document.querySelector('#senha_atual fa-eye-slash').addEventListener('click', () => {
        //     if (this.count == 0) {
        //         this.$refs.senhaAtual.ej2Instances.type = 'text';
        //         this.$refs.senhaAtual.$el.parentNode.childNodes[3].classList.value = 'fas fa-eye e-input-group-icon';
        //         this.count = 1;
        //     } else {
        //         this.$refs.senhaAtual.ej2Instances.type = 'password';
        //         this.$refs.senhaAtual.$el.parentNode.childNodes[3].classList.value = 'fas fa-eye-slash e-input-group-icon';
        //         this.count = 0;
        //     }
        // });
    },
});

function dialogAlert(args) {
    ej.base.enableRipple();
    const skipCancellationAction = false;
    const msgTypes = [{"id": "info", "icon": 'fas fa-info-circle fa-3x', "color": "#0d6efd"}, {
        "id": "error",
        "icon": "fas fa-times-circle fa-3x",
        "color": "#dc3545"
    }, {"id": "success", "icon": 'fas fa-info-circle fa-3x', "color": "#198754"}, {
        "id": "warning",
        "icon": 'fas fa-exclamation-triangle fa-3x',
        "color": "#fd7e14"
    }];
    args.type = (args.type ? args.type : "info");
    let icon = msgTypes.find(x => x.id === args.type).icon;
    let color = msgTypes.find(x => x.id === args.type).color;
    let d = ej.popups.DialogUtility.alert({
        target: document.getElementById('mainLayout'),
        position: {
        X: "center",
        Y: "center"
        },
        title: 'Mensagem',
        cssClass: 'customDlgHeader',
        content: `<div class="customDlg" style=" font-size:1.3em;"><div class="row" style="display: flex; align-items: center;"><div class="col-2 col-md-2 text-right" style="color: ${color};" ><i class="${icon}"></i></div><div class="col-10 col-md-10">${args.msg}</div></div></div>`,
        showCloseIcon: false,
        animationSettings: {
        effect: "FadeZoom",
        duration: 500
        },
        okButton: {
        text: args.btnOkText ? args.btnOkText : 'OK',
        icon: 'fas fa-check',
        click: function () {
            // args.okAction();
            if (args.okAction) {
            args.okAction();
            }
            this.hide(skipCancellationAction);
        }
        },
    });
}
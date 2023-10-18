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
</div>
`;


Vue.component("AppVue", {
  template: AppTemplate,
  data() {
    return {
        input: {
            CPF: null,
            SENHA: null,
            count: 0
        }
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
            console.log("test");
        }
    },
    mounted() {
        this.$refs.CPF.focusIn();
        this.$refs.senhaAtual.addIcon('append', 'fas fa-eye-slash');
        console.log(document.querySelector('#senha_atual> fa-eye-slash'));
        document.querySelector('#senha_atual fa-eye-slash').addEventListener('click', () => {
            if (this.count == 0) {
                this.$refs.senhaAtual.ej2Instances.type = 'text';
                this.$refs.senhaAtual.$el.parentNode.childNodes[3].classList.value = 'fas fa-eye e-input-group-icon';
                this.count = 1;
            } else {
                this.$refs.senhaAtual.ej2Instances.type = 'password';
                this.$refs.senhaAtual.$el.parentNode.childNodes[3].classList.value = 'fas fa-eye-slash e-input-group-icon';
                this.count = 0;
            }
        });
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




/* <input type="text" placeholder="CPF" OnKeyPress="formatar('###.###.###-##',this)" id="txtcpdf" v-model="input.CPF" ref="CPF"/>
<input type="password" placeholder="Senha" id="txtsenha" v-model="input.SENHA" ref="SENHA"/> */
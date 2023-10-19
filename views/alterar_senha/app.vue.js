const AppTemplate = `
	<div class="control-section" style="margin-top: 5%">
		<main class="mt-4 mb-5">
			<div class="container">
				<div class="border p-4 col-md-12">
					<div class="e-card-content text-center" style="margin-bottom: 20px;">
						<h4 style="font-weight: bold;">Alterar Senha</h4>
					</div>
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 row" style="margin-bottom: 5px;">
							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3" style="margin-bottom: 5px;"></div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" style="margin-bottom: 5px;">
								<ejs-textbox
									ref="senhaAtual"
									id="senha_atual"
									type="password"
									style="text-transform: unset;"
									floatLabelType="Auto"
									cssClass="e-outline"
									maxlength="30"
									placeholder="Senha Atual"
									v-model="input.SENHA_ATUAL">
								</ejs-textbox>
							</div>
							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3" style="margin-bottom: 5px;"></div>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 row" style="margin-bottom: 5px;">
							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3" style="margin-bottom: 5px;"></div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" style="margin-bottom: 5px;">
								<ejs-textbox
									ref="novasenha"
									id="nova_senha"
									type="password"
									style="text-transform: unset;"
									floatLabelType="Auto"
									cssClass="e-outline"
									maxlength="30"
									placeholder="Nova Senha"
									v-model="input.NOVA_SENHA">
								</ejs-textbox>
							</div>
							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3" style="margin-bottom: 5px;"></div>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 row" style="margin-bottom: 5px;">
							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3" style="margin-bottom: 5px;"></div>
							<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" style="margin-bottom: 5px;">
								<ejs-textbox
									ref="confirmsenha"
									id="confirm_senha"
									type="password"
									style="text-transform: unset;"
									floatLabelType="Auto"
									cssClass="e-outline"
									maxlength="30"
									placeholder="Confirmar Nova Senha"
									v-model="input.CONFIRM_SENHA">
								</ejs-textbox>
							</div>
							<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3" style="margin-bottom: 10px;"></div>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center" style="margin-top: 15px;">
							<ejs-button style="margin-top: 0px; height: 35px;" :isPrimary="true" v-on:click.native="alterar_senha" ref="alterar">Altera Senha</ejs-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
`;

/* ANOTAÇÕES
*/

Vue.component("AppVue", {
  template: AppTemplate,
  	data() {
    	return {
			input: {
				SENHA_ATUAL: null,
				NOVA_SENHA: null,
				CONFIRM_SENHA: null
			},
		}
	},
	methods: {
		alterar_senha(){
			if(this.input.SENHA_ATUAL == null || this.input.SENHA_ATUAL.trim() == ''){
				dialogAlert({
					msg: 'Por Favor, insira a Senha Atual!!',
					closeEsc: true,
					btnOkText: "Fechar"
				})
				return;
			}
			if(this.input.NOVA_SENHA == null || this.input.NOVA_SENHA.trim() == ''){
				dialogAlert({
					msg: 'Por Favor, insira a sua Nova Senha!!',
					closeEsc: true,
					btnOkText: "Fechar"
				})
				return;
			}
			if(this.input.CONFIRM_SENHA == null || this.input.CONFIRM_SENHA.trim() == ''){
				dialogAlert({
					msg: 'Por Favor, Confirme a sua Nova Senha!!',
					closeEsc: true,
					btnOkText: "Fechar"
				})
				return;
			}
			var obj = {
				'SENHA_ATUAL': this.input.SENHA_ATUAL,
				'NOVA_SENHA': this.input.NOVA_SENHA,
				'CONFIRM_SENHA': this.input.CONFIRM_SENHA
			}
			axios.post(BASE + "/alterar_senha/alterar_senha",obj).then((res) => {
				if(res.data.code == '0'){
					dialogAlert({
						msg: res.data.msg,
						closeEsc: true,
						btnOkText: "Fechar"
					})
					return;
				}
				dialogAlert({
					msg: res.data.msg,
					closeEsc: true,
					btnOkText: "Fechar"
				})
				return;
			});
		}
	}, 
	mounted() {
	},
});
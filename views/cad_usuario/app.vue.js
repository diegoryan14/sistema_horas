
const AppTemplate = `
<div class="control-section" style="margin-top: 5%">
	<main class="mt-4 mb-5">
		<div class="container">
			<div class="border p-4 col-md-12">
				<h4 class="text-center" style="font-weight: bold; margin-bottom: 20px;">Cadastrar Usuário</h4>
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 row">
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" style="margin-bottom: 10px;">
						<ejs-textbox
							ref="NOME"
							id="NOME"
							style="text-transform: unset;"
							floatLabelType="Auto"
							cssClass="e-outline"
							maxlength="100"
							placeholder="Nome do Usuário"
							v-model="input.NOME">
						</ejs-textbox>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" style="margin-bottom: 10px;">
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
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" style="margin-bottom: 10px;">
						<ejs-textbox
							ref="EMAIL"
							id="EMAIL"
							style="text-transform: unset;"
							floatLabelType="Auto"
							cssClass="e-outline"
							maxlength="100"
							placeholder="E-mail"
							v-model="input.EMAIL">
						</ejs-textbox>
					</div>
					<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6" style="margin-bottom: 10px;">
						<ejs-dropdownlist
							ref="TIPO_USUARIO"
							v-model="input.TIPO_USUARIO"
							:dataSource="tipoUsuario"
							:fields="{ text: 'DESCRICAO', value: 'SEQUENCIA'}"
							floatLabelType="Auto"
							cssClass="e-outline"
							placeholder="Tipo Usuário">
						</ejs-dropdownlist>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
						<ejs-button style="margin-top: 0px;" :isPrimary="true" v-on:click.native="cadastrar" ref="cadastrar">Cadastrar</ejs-button>
					</div>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-top: 20px;">
					<h6 class="" style="font-weight: bold; margin-bottom: 10px;">Usuários Cadastrados</h6>
					<ejs-grid
						ref="grid_Usuario"
						style="width: 300px"
						:toolbar='["Search"]'
						:dataSource="grid_Usuario"
						:allowPaging="true"
						:allowSorting='true'
						:pageSettings='{ pageSizes: true, pageSize: 5 }'>
						<e-columns>
							<e-column field='SEQ_USUARIO' headerText='Sequência' width=80></e-column>
							<e-column field='NOME' headerText='Nome' width=100></e-column>
							<e-column field='CPF' headerText='CPF' width=100></e-column>
							<e-column field='EMAIL' headerText='E-mail' width=100></e-column>
							<e-column field='TIPO_USUARIO' headerText='Tipo Usuário' width=80></e-column>
							<e-column headerText='Ações' :template='templateButtons' width='50'></e-column>
						</e-columns>
					</ejs-grid>
				</div>
			</div>
		</div>
	</div>
</div>
`;

/* ANOTAÇÕES
	TRANSFORMAR O ARGS SEQ_USUARIO PRA STR, TA INT
*/

Vue.component("AppVue", {
  template: AppTemplate,
  	data() {
    	return {
			input: {
				NOME: null,
				CPF: null,
				EMAIL: null,
				TIPO_USUARIO: null
			},
			tipoUsuario: [],
			grid_Usuario: [],
			templateButtons: function () {
				return {
					template: Vue.component('templateButtons', {
						template: `
							<div>
								<div class="icons">
									<ejs-tooltip
										style="cursor: pointer;"
										content="Editar"
										position='center'>
										<span style="font-weight: bold" @click="edit(data)"><i class="fas fa-edit"></i></span>
									</ejs-tooltip>
									<ejs-tooltip
										style="cursor: pointer;"
										content="Deletar"
										position='center'>
										<span style="font-weight: bold" @click="deletar(data)"><i class="fas fa-times-circle" style="color: red;"></i></span>
									</ejs-tooltip>
								</div>
								<ejs-dialog
									isModal='true'
									:buttons="modalButtons"
									ref="modal"
									v-bind:visible="false"
									:animationSettings="{ effect: 'None' }"
									:showCloseIcon='false'
									:closeOnEscape='false'
									zIndex="1001"
									target="body"
									style="margin: 10px"
									width="500px">
									<div class="row">
										<div class="col col-md-12">
											<h4 class="text-center" style="font-weight: bold; margin-bottom: 20px;">Editar o Usuário</h4>
											<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-bottom: 10px;">
												<ejs-maskedtextbox
													ref="SEQUENCIA"
													id="SEQUENCIA"
													floatLabelType="Auto"
													cssClass="e-outline"
													maxlength="14"
													readonly="true"
													placeholder='Sequência'
													v-model="modal.SEQUENCIA">
												</ejs-maskedtextbox>
											</div>
											<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-bottom: 10px;">
												<ejs-maskedtextbox
													ref="CPF"
													id="CPF"
													mask="###.###.###-##"
													floatLabelType="Auto"
													cssClass="e-outline"
													maxlength="14"
													readonly="true"
													placeholder='CPF'
													v-model="modal.CPF">
												</ejs-maskedtextbox>
											</div>
											<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-bottom: 10px;">
												<ejs-textbox
													ref="NOME"
													id="NOME"
													style="text-transform: unset;"
													floatLabelType="Auto"
													cssClass="e-outline"
													maxlength="100"
													placeholder="Nome do Usuário"
													v-model="modal.NOME">
												</ejs-textbox>
											</div>
											<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-bottom: 10px;">
												<ejs-textbox
													ref="EMAIL"
													id="EMAIL"
													style="text-transform: unset;"
													floatLabelType="Auto"
													cssClass="e-outline"
													maxlength="100"
													placeholder="E-mail"
													v-model="modal.EMAIL">
												</ejs-textbox>
											</div>
										</div>
									</div>
								</ejs-dialog>
							</div>
							`,
						data: function () { 
							return {
								modalButtons: null,
								modal: {
									SEQUENCIA: null,
									NOME: null,
									CPF: null,
									EMAIL: null,
								},
								data: {}
							}; 
						},
						methods: {
							deletar(args){
								dialogConfirm({
									msg: 'Você deseja deletar o Usuário ' + args.NOME + ' - ' + args.SEQ_USUARIO + '?',
									btnOkText: "Sim",
									btnCancelText: "Não",
									okAction: () => {
										var obj = {
											'SEQ': args.SEQ_USUARIO
										}
										axios.post(BASE + "/cad_usuario/deletar",obj).then((res) => {
											if(res.data.code == "0"){
												dialogAlert({
													msg: res.data.msg,
													closeEsc: true,
													btnOkText: "Fechar"
												})
												return;
											}
											this.$parent.$parent.usu_cadstrados();
										})
									},
									cancelAction: () => {
										false;
									}
								});
							},
							edit(args){
								this.abrirModal();
								this.modal.CPF = args.CPF;
								this.modal.SEQUENCIA = args.SEQ_USUARIO;
								this.modal.SEQUENCIA = this.modal.SEQUENCIA.toString()
								this.modal.NOME = args.NOME;
								this.modal.EMAIL = args.EMAIL;
							},
							edit_usuario(){
								if(this.modal.NOME == null || this.modal.NOME.trim() == ''){
									dialogAlert({
										msg: "Por Favor, insira o Nome.",
										closeEsc: true,
										btnOkText: "Fechar"
									})
									this.$refs.NOME.focusIn();
									return;
								}
								if(this.modal.EMAIL == null || this.modal.EMAIL.trim() == ''){
									dialogAlert({
										msg: "Por Favor, insira o E-mail.",
										closeEsc: true,
										btnOkText: "Fechar"
									})
									this.$refs.EMAIL.focusIn();
									return;
								}
								var obj = {
									'SEQ': this.modal.SEQUENCIA,
									'NOME': this.modal.NOME,
									'CPF': this.modal.CPF,
									'EMAIL': this.modal.EMAIL,
								}
								axios.post(BASE + "/cad_usuario/edit_usuario",obj).then((res) => {
									if(res.data.code == "0"){
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
										btnOkText: "Fechar",
										okAction: () =>{
											this.fecharModal();
											this.$parent.$parent.usu_cadstrados();
										}
									})
								})
							},
							abrirModal(){
								this.$refs.modal.show();
								this.modalButtons = [{click: this.edit_usuario, buttonModel: {content: '<i class="fas fa-check"></i>&nbsp&nbspSalvar'}},{click: this.fecharModal, buttonModel: {content: '<i class="fas fa-times-circle"></i>&nbsp&nbspFechar'}}];
							},
							fecharModal(){
								this.$refs.modal.hide();
								this.modal.CPF = null;
								this.modal.SEQUENCIA = null;
								this.modal.NOME = null;
								this.modal.EMAIL = null;
							}
						}
					})
				}
			}
		}
	},
	methods: {
		get_TipoUsuario(){
			axios.post(BASE + "/cad_usuario/get_TipoUsuario").then((res) => {
				this.tipoUsuario = res.data;
			})
		},
		usu_cadstrados(){
			axios.post(BASE + "/cad_usuario/usu_cadstrados").then((res) => {
				this.grid_Usuario = res.data;
			})
		},
		cadastrar() {
			if(this.input.NOME == null || this.input.NOME.trim() == ''){
				dialogAlert({
					msg: 'Por Favor, insira o Nome.',
					closeEsc: true,
					btnOkText: "Fechar"
				})
				this.$refs.NOME.focusIn();
				return;
			}
			if(this.input.CPF == null || this.input.CPF.trim() == ''){
				dialogAlert({
					msg: "Por Favor, insira o CPF.",
					closeEsc: true,
					btnOkText: "Fechar"
				})
				this.$refs.CPF.focusIn();
				return;
			}
			if(this.input.EMAIL == null || this.input.EMAIL.trim() == ''){
				dialogAlert({
					msg: "Por Favor, insira o E-mail.",
					closeEsc: true,
					btnOkText: "Fechar"
				})
				this.$refs.EMAIL.focusIn();
				return;
			}
			if(this.input.TIPO_USUARIO == null){
				dialogAlert({
					msg: "Por Favor, selecione o Tipo Usuário.",
					closeEsc: true,
					btnOkText: "Fechar"
				})
				this.$refs.TIPO_USUARIO.focusIn();
				return;
			}
			var obj = {
				'NOME': this.input.NOME,
				'CPF': this.input.CPF,
				'EMAIL': this.input.EMAIL,
				'TIPO_USUARIO': this.input.TIPO_USUARIO
			}
			axios.post(BASE + "/cad_usuario/cadastrar", obj).then((res) => {
				if(res.data.code == "0"){
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
					btnOkText: "Fechar",
					okAction: () =>{
						this.usu_cadstrados();
						this.limpar_input();
					}
				})
			})
		},
		limpar_input(){
			this.input.CPF = null;
			this.input.SEQUENCIA = null;
			this.input.NOME = null;
			this.input.EMAIL = null;
			this.input.TIPO_USUARIO = null;
		}
	}, 
	mounted() {
		this.get_TipoUsuario();
		this.usu_cadstrados();
		this.$refs.NOME.focusIn();
	},
});
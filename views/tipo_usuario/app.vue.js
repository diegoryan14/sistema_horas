
const AppTemplate = `
<div class="control-section" style="margin-top: 5%">
	<main class="mt-4 mb-5">
		<div class="container">
			<div class="border p-4 col-md-12">
				<h4 class="text-center" style="font-weight: bold; margin-bottom: 20px;">Cadastrar o Tipo do Usuário</h4>
				<div class="row text-center">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 row" style="margin-bottom: 20px;">
						<div class="col-xs-12 col-sm-10 col-md-10 col-lg-10" style="margin-bottom: 10px;">
							<ejs-textbox
								ref="DESCRICAO"
								id="DESCRICAO"
								style="text-transform: unset;"
								floatLabelType="Auto"
								cssClass="e-outline"
								maxlength="50"
								placeholder="Descrição"
								v-model="input.DESCRICAO">
							</ejs-textbox>
						</div>
						<div class="col-xs-12 col-sm-2 col-md-2 col-lg-2 text-center" style="margin-bottom: 0px;">
							<ejs-button style="margin-top: 0px; height: 40px;" :isPrimary="true" v-on:click.native="cadastrar" ref="cadastrar">Cadastrar</ejs-button>
						</div>
					</div>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-bottom: 20px;">
					<h6 class="" style="font-weight: bold; margin-bottom: 10px;">Tipo Usuário Cadastrados</h6>
					<ejs-grid
						ref="grid_Tipo"
						style="width: 300px"
						:toolbar='["Search"]'
						:dataSource="grid_Tipo"
						:allowPaging="true"
						:allowSorting='true'
						:pageSettings='{ pageSizes: true, pageSize: 5 }'>
						<e-columns>
							<e-column field='SEQUENCIA' headerText='Sequência' width=50></e-column>
							<e-column field='DESCRICAO' headerText='Tipo Usuário' width=100></e-column>
							<e-column headerText='Ações' textAlign='Center' :template='templateButtons' width='50'></e-column>
						</e-columns>
					</ejs-grid>
				</div>
			</div>
		</div>
	</div>
</div>
`;

Vue.component("AppVue", {
  template: AppTemplate,
  	data() {
    	return {
			input: {
				DESCRICAO: null
			},
			grid_Tipo: [],
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
											<h4 class="text-center" style="font-weight: bold; margin-bottom: 20px;">Editar o Tipo do Usuário</h4>
											<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-top: 1%">
												<ejs-textbox
													ref="SEQUENCIA"
													id="SEQUENCIA"
													style="text-transform: unset;"
													floatLabelType="Auto"
													cssClass="e-outline"
													maxlength="3"
													readonly="true"
													placeholder="Sequência"
													v-model="modal.SEQUENCIA">
												</ejs-textbox>
											</div>
											<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="margin-top: 1%">
												<ejs-textbox
													ref="DESCRICAO"
													id="DESCRICAO"
													style="text-transform: unset;"
													floatLabelType="Auto"
													cssClass="e-outline"
													maxlength="50"
													placeholder="Descrição"
													v-model="modal.DESCRICAO">
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
									DESCRICAO: null
								},
								data: {}
							}; 
						},
						methods: {
							deletar(args){
								console.log(args);
								dialogConfirm({
									msg: 'Você deseja deletar o Tipo Usuário ' + args.DESCRICAO + ' - ' + args.SEQUENCIA + '?',
									btnOkText: "Sim",
									btnCancelText: "Não",
									okAction: () => {
										var obj = {
											'SEQ': args.SEQUENCIA
										}
										axios.post(BASE + "/usuario/deletar",obj).then((res) => {
											if(res.data.code == "0"){
												alert(res.data.msg);
												return;
											}
											alert(res.data.msg);
											this.$parent.$parent.get_Cadastrados();
										})										
									},
									cancelAction: () => {
										false;
									}
								});
							},
							edit(args){
								this.abrirModal();
								this.modal.SEQUENCIA = args.SEQUENCIA;
								this.modal.DESCRICAO = args.DESCRICAO;
							},
							salvar(){
								if(this.modal.DESCRICAO == null || this.modal.DESCRICAO.trim() == ''){
									alert('Por Favor, insira a descrição.');
									return;
								}
								var obj = {
									'DESCRICAO': this.modal.DESCRICAO,
									'SEQ': this.modal.SEQUENCIA
								}
								axios.post(BASE + "/usuario/salvar",obj).then((res) => {
									if(res.data.code == "0"){
										alert(res.data.msg);
										return;
									}
									alert(res.data.msg);
									this.fecharModal();
									this.$parent.$parent.get_Cadastrados();
								})
							},
							abrirModal(){
								this.$refs.modal.show();
								this.modalButtons = [{click: this.salvar, buttonModel: {content: '<i class="fas fa-check"></i>&nbsp&nbspSalvar'}},{click: this.fecharModal, buttonModel: {content: '<i class="fas fa-times-circle"></i>&nbsp&nbspFechar'}}];
							},
							fecharModal(){
								this.$refs.modal.hide();
								this.grid_Tipo = [];
							}
						}
					})
				}
			},
		}
	},
	methods: {
		get_Cadastrados(){
			axios.post(BASE + "/usuario/get_Cadastrados").then((res) => {
				this.grid_Tipo = res.data;
			})
		},
		cadastrar(){
			if(this.input.DESCRICAO == null || this.input.DESCRICAO.trim() == ''){
				alert('Por Favor, insira a descrição.');
				setTimeout(() => {
					this.$refs.DESCRICAO.focusIn();
				}, 100);
				return;
			}
			var obj = {
				'DESCRICAO': this.input.DESCRICAO
			}
			axios.post(BASE + "/usuario/cadastrar",obj).then((res) => {
				if(res.data.code == "0"){
					alert(res.data.msg);
					return;
				}
				alert(res.data.msg);
				this.get_Cadastrados();
			})
		}
	}, 
	mounted() {
		this.get_Cadastrados();
		setTimeout(() => {
			this.$refs.DESCRICAO.focusIn();
		}, 100);
	},
});




/* <div class="col">
	<div class="col-md-12 control-section card-control-section basic_card_layout">
		<div class="e-card-resize-container" style="margin-bottom: 80px">
			<div class="row">
				<div class="col-md-12 card-layout" style="padding: 0 !important;">
					<div tabindex="0" class="e-card" id="basic_card">
						<div class="e-card-content">
							<div class="e-card-content" style="background-color: white;">
								<div class="row-input" style="margin: 0px;">
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div> */
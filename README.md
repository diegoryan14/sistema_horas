# Bem Vindos ao MVC-VUE

## Apresentação do Projeto

Este projeto se baseia na mesma ideia do repositório "MVC", em que é apresentado
uma estrutura que facilite a utilização de alguns componentes e o próprio uso
da tecnologia (no caso o VUE com o Javascript e PHP)

Sistema de Banco de Horas

oq fazer:
  - qnd for inserir o usuario, ver se aquele cpf ja existe, se existir dar uma mensagem perguntando se ele quer msm alterar as informações.
  - fazer a tela do usuario para cadastrar as horas trabalhadas, q somente o usuario pode ver suas horas.
  - fazer uma tela para o adm/coordenador cadastrar horas trabalhadas dos prof/estagiario.
  - fazer uma tela onde o adm/coordenador pode ver os cadastro de horas de todos os estagiario/prof e pode imprimir ou gerar um pdf.
  - adicionar o script do banco de dados na estrutura


example comboBox

<div class="col-xs-12 col-sm-8 col-lg-8 col-md-8" style="margin-bottom: 10px;">
    <ejs-combobox
        ref="ALUNO"
        id='aluno'
        v-model="input.RA"
        :dataSource='Aluno'
        :fields="{ text: 'NOMEALUNO', value: 'RA'}"
        :change = "getAction"
        @input.native='filtering'
        floatLabelType="Auto"
        maxlength="30"
        cssClass="e-outline"
        filterType='Contains'
        :placeholder="'Buscar Aluno [NOME - RA - CPF] *'">
    </ejs-combobox>
</div>


filtering: function (args) {
    clearTimeout(this.setTimeout);
    this.limpar_campos();

    if ((args.target.value.trim()).length >= 4) {
        this.$refs.ALUNO.hidePopup();

        this.setTimeout = setTimeout(() => {
            var regex = new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ0-9% ]{0,}$');
            var x = regex.test(args.target.value);
            if (x == false) {
                this.limpar_campos();
                return;
            } else {
                if (args.target.value.length <= 4){
                    return;
                }
                this.getDadosAluno(args.target.value);
                return;
            }
        }, 500);
    }
},
getDadosAluno(str) {
    this.Aluno = [];
    var filter = str;
    filter = filter.replace(' ', '%');
    str = filter;
    var obj = {
        'FILTRO': str
    }
    const uninterceptedAxiosInstance = axios.create();
    uninterceptedAxiosInstance.post(BASE + "/extrato_debitos/getDadosAluno", obj).then((res) => {
        if (res.data.code == 0) {
            this.exist_Aluno = 1;
            this.Aluno = [];
            return;
        } else {
            this.exist_Aluno = 0;
            this.Aluno = res.data.data;
            this.$refs.ALUNO.showPopup();
        }
    })
},

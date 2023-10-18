
<?php

class Usuario extends Controller {

    function __construct() {
        parent::__construct();
		$this->view->js = array();
		$this->view->css = array();
    }

    function index()
    {
        Auth::autentica();
        $this->view->title = "Tipo de Usuário";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/tipo_usuario/app.vue.js");
        array_push($this->view->css, "views/tipo_usuario/app.vue.css");
        $this->view->render("header");
        $this->view->render("footer");
    }

    function get_Cadastrados()
    {
        $this->model->get_Cadastrados();
    }

    function cadastrar()
    {
        $this->model->cadastrar();
    }

    function salvar()
    {
        $this->model->salvar();
    }

    function deletar()
    {
        $this->model->deletar();
    }
}
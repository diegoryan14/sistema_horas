
<?php

class Cad_usuario extends Controller {

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
        array_push($this->view->js, "views/cad_usuario/app.vue.js");
        array_push($this->view->css, "views/cad_usuario/app.vue.css");
        $this->view->render("header");
        $this->view->render("footer");
    }

    function get_TipoUsuario()
    {
        $this->model->get_TipoUsuario();
    }

    function usu_cadstrados()
    {
        $this->model->usu_cadstrados();
    }

    function cadastrar()
    {
        $this->model->cadastrar();
    }

    function edit_usuario()
    {
        $this->model->edit_usuario();
    }

    function deletar()
    {
        $this->model->deletar();
    }
}
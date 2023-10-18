
<?php

class Alterar_senha extends Controller {

    function __construct() {
        parent::__construct();
		$this->view->js = array();
		$this->view->css = array();
    }

    function index()
    {
        Auth::autentica();
        $this->view->title = "Alterar Senha";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/alterar_senha/app.vue.js");
        array_push($this->view->css, "views/alterar_senha/app.vue.css");
        $this->view->render("header");
        $this->view->render("footer");
    }

    function alterar_senha()
    {
        $this->model->alterar_senha();
    }
}
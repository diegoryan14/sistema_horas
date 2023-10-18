
<?php

class Login extends Controller {

    function __construct() {
        parent::__construct();
		$this->view->js = array();
		$this->view->css = array();
    }

    function index()
    {
        $this->view->title = "Login";
        /*Os array push devem ser feitos antes de instanciar o header e footer.*/
        array_push($this->view->js, "views/login/login.vue.js");
        array_push($this->view->css, "views/login/login.vue.css");
        $this->view->render("login/header");
        $this->view->render("footer");
    }

    function Login()
    {
        $this->model->Login();
    }

    function EnviarEmail()
    {
        $this->model->EnviarEmail();
    }
}
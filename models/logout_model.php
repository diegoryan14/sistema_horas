
<?php

require_once("util/param.php");

class Logout_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function example()
    {
    }

    public function logout()
    {
        // logout
        @session_start();
        session_destroy();
        header('Location: login/');
        exit;
        //echo("OK");
    }
}

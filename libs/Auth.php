<?php
/**
 * 
 */
class Auth
{
    
    public static function autentica()
    {
        @session_start();
        $logged = $_SESSION['logado'];
        if ($logged == false) {
            session_destroy();
            header('Location: login/');
            exit;
        }
    }

    public static function logout()
    {
        @session_start();
        $logged = $_SESSION['logado'];
        if ($logged == true) {
            session_destroy();
            header('Location: login/');
            exit;
        }
    }
    
}
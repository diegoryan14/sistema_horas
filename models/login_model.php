<?php

require_once("util/param.php");

class Login_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function example()
    {
    }

    public function Login()
    {
        $post = json_decode(file_get_contents('php://input'));
        // var_dump($post);exit;
        $cpf = $post->CPF;
        $senha = $post->SENHA;
		$dados=array(':CPF' => $cpf,':SENHA' => $senha);
        $result = $this->db->select("SELECT
                                        CPF,
                                        SENHA,
                                        NOME,
                                        TIPO_USUARIO
                                    FROM
                                        USUARIO
                                    WHERE
                                        CPF = :CPF
                                        AND SENHA = sha2(:SENHA,
                                        256)",$dados);
        
        // var_dump($result);exit;

        if (count($result) > 0) {
            // login
            Session::init();
            Session::set('CPF', $result[0]->CPF);
            Session::set('logado', true);
            Session::set('SENHA', $result[0]->SENHA);
            Session::set('NOME', $result[0]->NOME);
            Session::set('TIPO_USUARIO', $result[0]->TIPO_USUARIO);
            $msg = array("code" => 1,"msg" => "success");
        }
        else{
            $msg = array("code" => "0", "msg" => "Usuário Inexistente!!");
        }
        echo(json_encode($msg));
    }

    // public function listaLogin()
    // {
    //     $sql = "select nome,senha,nivel from usuario order by nome";
    //     $result = $this->db->select($sql);
    //     echo (json_encode($result));
    // }
}
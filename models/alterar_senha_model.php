<?php

require_once("util/param.php");

class Alterar_senha_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function alterar_senha()
    {
        $post = json_decode(file_get_contents('php://input'));

        $senha_atual = $post->SENHA_ATUAL;
        // SENHA E CONFIRMA SENHA
        $nova_senha = $post->NOVA_SENHA;
        $confirma_senha = $post->CONFIRM_SENHA;

        // if($nova_senha != $confirma_senha){
        //     exit(json_encode(array("code" => "0", "msg" => "Senha diferentes!!. Por favor, digite novamente.")));
        // }

        Session::init();        
        $o = Session::get('CPF');
        var_dump($o);exit;


        /* DECODIFICAÇAO DA SENHA */
        $senha_hash = hash('sha256', $nova_senha);

        if($nome == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o Nome.")));
        }
        else if($CPF == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o CPF.")));
        }
        else if($email == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira o E-mail.")));
        }
        else if($tipo_usuario == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, selecione o Tipo Usuário.")));
        }
        else {
            $nome = strtoupper($nome);
            $email = strtolower($email);

            // send_email($email, $senha_final);
            $result = $this->db->insert('USUARIO', array('NOME' =>$nome, 'CPF' => $CPF, 'EMAIL' => $email, 'TIPO_USUARIO' => $tipo_usuario, 'SENHA' => $senha_hash));

            if($result){
                exit(json_encode(array("code" => "1", "msg" => "Cadastro realizado com sucesso.")));
            } else{
                exit(json_encode(array("code" => "0", "msg" => "Erro ao inserir.")));
            }
        }
        echo (json_encode($msg));
    }

    // public function Login()
    // {
    //     $post = json_decode(file_get_contents('php://input'));
    //     // var_dump($post);exit;
    //     $cpf = $post->CPF;
    //     $senha = $post->SENHA;
	// 	$dados=array(':CPF' => $cpf,':SENHA' => $senha);
    //     $result = $this->db->select("SELECT
    //                                     CPF,
    //                                     SENHA,
    //                                     NOME,
    //                                     TIPO_USUARIO
    //                                 FROM
    //                                     USUARIO
    //                                 WHERE
    //                                     CPF = :CPF
    //                                     AND SENHA = sha2(:SENHA,
    //                                     256)",$dados);
        
    //     // var_dump($result);exit;

    //     if (count($result) > 0) {
    //         // login
    //         Session::init();
    //         Session::set('CPF', $result[0]->CPF);
    //         Session::set('logado', true);
    //         Session::set('SENHA', $result[0]->SENHA);
    //         Session::set('NOME', $result[0]->NOME);
    //         Session::set('TIPO_USUARIO', $result[0]->TIPO_USUARIO);
    //         $msg = array("code" => 1,"msg" => "success");
    //     }
    //     else{
    //         $msg = array("code" => "0", "msg" => "Usuário Inexistente!!");
    //     }
    //     echo(json_encode($msg));
    // }
}
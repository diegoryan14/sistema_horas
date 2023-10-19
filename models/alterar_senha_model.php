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
        $nova_senha = $post->NOVA_SENHA;
        $confirma_senha = $post->CONFIRM_SENHA;

        if($senha_atual == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira a Senha Atual.")));
        }
        if($nova_senha == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira a Nova Senha.")));
        }
        if($confirma_senha == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, Confirme sua Nova Senha.")));
        }
        // if($nova_senha != $confirma_senha){
        //     exit(json_encode(array("code" => "0", "msg" => "Senha diferentes!!. Por favor, digite novamente.")));
        // }

        Session::init();        
        $o = Session::get('CPF');
        // var_dump($o);exit;
        $cpf = $o;
        $senha_atual_hash = hash('sha256', $senha_atual);

        $dados = array(':par_CPF' => $cpf);
        $result = $this->db->select("SELECT 
                                       U.SENHA
                                     FROM 
                                        USUARIO U
                                     WHERE 
                                        U.CPF = :par_CPF",$dados);
        var_dump($result);exit;
        if(!$result){
            exit(json_encode(array("code" => "0", "msg" => "Erro ao Alterar Senha, Tente novamente mais tarde.")));
        }
        
        if($result[0]['SENHA'] != $senha_atual_hash){
            exit(json_encode(array("code" => "0", "msg" => "Senha atual está Incorreta, digite novamente.")));
        }

        /* DECODIFICAÇAO DA NOVA SENHA */
        $nova_senha_hash = hash('sha256', $nova_senha);
        
        if(strlen($nova_senha_hash) > 0){
            $dadosSave = array('SENHA' => $nova_senha_hash);
            $result = $this->db->update('BANCODEHORAS.USUARIO', $dadosSave,"CPF=$cpf");

            if($result){
                exit(json_encode(array("code" => "1", "msg" => "Senha atualizada com Sucesso!!")));
            } else{
                exit(json_encode(array("code" => "0", "msg" => "Erro atualizar a senha, Tente novamente mais tarde.")));
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
	// 	   $dados=array(':CPF' => $cpf,':SENHA' => $senha);
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
<?php

require_once("util/param.php");

class Usuario_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function get_Cadastrados()
    {
        $sql = "SELECT SEQUENCIA, DESCRICAO FROM TIPOUSUARIO ORDER BY DESCRICAO";
        $result = $this->db->select($sql);
        echo (json_encode($result));
    }

    public function cadastrar()
    {
        $post = json_decode(file_get_contents('php://input'));

        $descricao = $post->DESCRICAO;

        if($descricao == null){
            exit(json_encode(array("code" => "0", "msg" => "Por favor, insira a descrição.")));
        } else {
            $result = $this->db->insert('TIPOUSUARIO', array('DESCRICAO' =>$descricao));
            if($result){
                exit(json_encode(array("code" => "1", "msg" => "Cadastro realizado com sucesso.")));
            } else{
                exit(json_encode(array("code" => "0", "msg" => "Erro ao inserir.")));
            }
        }
        echo (json_encode($msg));
    }

    public function salvar()
    {
        $post = json_decode(file_get_contents('php://input'));
        
        $descricao = $post->DESCRICAO;
        $descricao = strtoupper($descricao);
        $seq = $post->SEQ;

        if ($seq > 0) {
            $dadosSave = array('DESCRICAO' => $descricao);
            $result = $this->db->update('BANCODEHORAS.TIPOUSUARIO', $dadosSave,"SEQUENCIA=$seq");
            if ($result) {
                exit(json_encode(array("code" => "1", "msg" => "Registro atualizado com sucesso.")));
            }
        }
        exit(json_encode(array("code" => "0", "msg" => "Erro ao autualizar.")));
    }

    public function deletar()
    {
        $post = json_decode(file_get_contents('php://input'));

        $seq = (int)$post ->SEQ;

        $sql = $this->db->select(
            "SELECT 
                *
            FROM 
                USUARIO
            WHERE
                TIPO_USUARIO = :PAR_SEQ", array(':PAR_SEQ' => $seq)
        );

        if(count($sql) > 0){
            exit(json_encode(array('code' => "0", 'msg' => 'Opss!! Esse registro não pode ser Excluído')));
        }

        if($seq > 0){
            $result = $this->db->delete('TIPOUSUARIO',"SEQUENCIA='$seq'");
            if ($result) {
                exit(json_encode(array('code' => "1", 'msg' => 'Registro excluido com sucesso')));
            } else {
                exit(json_encode(array('code' => "0", 'msg' => 'Não foi possível excluir esse registro')));
            }
        }
    }
}
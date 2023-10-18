<?php

require_once("util/param.php");

class Cad_usuario_Model extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    public function get_TipoUsuario()
    {
        $sql = "SELECT
                    SEQUENCIA,
                    DESCRICAO
                FROM
                    TIPOUSUARIO
                ORDER BY
                    DESCRICAO";
        $result = $this->db->select($sql);
        echo (json_encode($result));
    }

    public function usu_cadstrados()
    {
        $sql = "SELECT 
                    U.SEQ_USUARIO,
                    U.NOME,
                    U.CPF,
                    U.EMAIL,
                    T.DESCRICAO TIPO_USUARIO
                FROM 
                    USUARIO U,
                    TIPOUSUARIO T
                WHERE 
                    U.ATIVO = 'S'
                    AND U.TIPO_USUARIO = T.SEQUENCIA
                ORDER BY 
                    DESCRICAO";
        $result = $this->db->select($sql);
        echo (json_encode($result));
    }

    public function cadastrar()
    {
        $post = json_decode(file_get_contents('php://input'));

        $nome = $post->NOME;
        $CPF = $post->CPF;
        $email = $post->EMAIL;
        $tipo_usuario = $post->TIPO_USUARIO;

        // SENHA E CONFIRMA SENHA
        // $senha = $post->SENHA;
        // $confirma_senha = $post->CONFIRM_SENHA;

        // if($senha != $confirma_senha){
        //     exit(json_encode(array("code" => "0", "msg" => "Senha diferentes!!.Por favor, digite novamente.")));
        // }

        /* SEQUENCIA ALEATORIA DE CARACTERE E NUMEROS PRA SENHA */
        $numero_de_bytes = 4;
        $restultado_bytes = random_bytes($numero_de_bytes);
        $senha_final = bin2hex($restultado_bytes);

        // senha final mandar no email do usuario

        /* DECODIFICAÇAO DA SENHA */
        $senha_hash = hash('sha256', $senha_final);

        /* VALIDAR CPF */
        $test_cpf = validaCPF($CPF);
        if($test_cpf == false){
            exit(json_encode(array("code" => "0", "msg" => "Opss!! CPF inválido!!")));
        }

        /* VALIDAR E-MAIL */
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            true;
        } else{
            exit(json_encode(array("code" => "0", "msg" => "Opss!! E-mail está inválido!!")));
        }

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

    public function edit_usuario()
    {
        $post = json_decode(file_get_contents('php://input'));
        // var_dump($post);exit;
        
        $nome = $post->NOME;
        $email = $post->EMAIL;
        $seq = $post->SEQ;

        $seq = intval($seq);

        $nome = strtoupper($nome);
        $email = strtolower($email);

        if ($seq> 0) {
            $dadosSave = array('NOME' => $nome, 'EMAIL' => $email);
            $result = $this->db->update('BANCODEHORAS.USUARIO', $dadosSave,"SEQ_USUARIO=$seq");
            if ($result) {
                exit(json_encode(array("code" => "1", "msg" => "Registro atualizado com sucesso.")));
            }
        }
        exit(json_encode(array("code" => "0", "msg" => "Erro ao autualizar.")));
    }

    public function deletar()
    {
        $post = json_decode(file_get_contents('php://input'));
        // var_dump($post);exit;
        
        $seq = $post->SEQ;

        $seq = intval($seq);

        if ($seq> 0) {
            $dadosSave = array('ATIVO' => 'N');
            $result = $this->db->update('BANCODEHORAS.USUARIO', $dadosSave,"SEQ_USUARIO=$seq");
            if ($result) {
                exit(json_encode(array("code" => "1", "msg" => "Registro atualizado com sucesso.")));
            }
        }
        exit(json_encode(array("code" => "0", "msg" => "Erro ao autualizar.")));
    }

}


function validaCPF($cpf) {
 
    // Extrai somente os números
    $cpf = preg_replace( '/[^0-9]/is', '', $cpf );
     
    // Verifica se foi informado todos os digitos corretamente
    if (strlen($cpf) != 11) {
        return false;
    }

    // Verifica se foi informada uma sequência de digitos repetidos. Ex: 111.111.111-11
    if (preg_match('/(\d)\1{10}/', $cpf)) {
        return false;
    }

    // Faz o calculo para validar o CPF
    for ($t = 9; $t < 11; $t++) {
        for ($d = 0, $c = 0; $c < $t; $c++) {
            $d += $cpf[$c] * (($t + 1) - $c);
        }
        $d = ((10 * $d) % 11) % 10;
        if ($cpf[$c] != $d) {
            return false;
        }
    }
    return true;

}

function send_email($email, $senha_final){

    $from = "sistemasdehoras@gmail.com"; /* USUARIO Q VAI MANDAR MSG */
    $to = $email; /* QUEM VAI RECEBER A MSG */
    $subject = "Bem-vindo ao Sistema de Horas";
    $message = "Olá NOME_USUARIO,<br>
                Aqui está a senha para utilização do nosso site $senha_final.<br>
                Para logar no site basta informar seu CPF e essa senha aqui em cima, acessando LINK DO SITE.<br>
                Caso você esqueça sua senha, so clicar no 'esqueci minha senha', que enviaremos outra senha.<br>
                Nossa equipe está sempre disposta a resolver seus problemas!!<br>
                Nossos sinceros agradecimentos,<br>
                Sistema de Horas.";

    $headers = "From: $from";
    
    $verifica = mail($to,$subject,$message, $headers);
    
    if(!$verifica){
        echo "Error sending the email.";
        return;
    }
    echo "The email message was sent.";
}
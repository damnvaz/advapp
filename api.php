<?php

// ============== INCLUDE CONNECTION
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, HEAD, OPTIONS, POST, PUT');
header('Access-Control-Allow-Headers: *'); 
header('Content-Type: application/json; charset=utf-8');
header('Accept: application/json; charset=utf-8');
date_default_timezone_set('America/Sao_Paulo');


if ( isset($_SERVER['HTTPS'] ) ) {
    // ============== PROD
    define('DATABASE', 'advdb');
    define('USER', 'adv_adm');
    define('PASS', 'adv230311@');
    define('HOST', 'mysql831.umbler.com');
} else {
    // ============== LOCAL
    define('DATABASE', 'advdb');
    define('USER', 'root');
    define('PASS', '');
    define('HOST', 'localhost');
}

$mysqli = new mysqli(HOST, USER, PASS, DATABASE);
$postjson = json_decode(file_get_contents('php://input'), true);

// VALIDATE
if (!isset($postjson)) {
    echo 'API Running'; 
    return;
}

if ($postjson['req'] == '') {
    $result = json_encode(array('success' => false, 'result' => 'No request sent.'));
    echo $result; 
    return;
}


// AUTH
if ($postjson['req'] == 'login') {

	// VALIDATE INPUT BEFORE REQUEST
	if ($postjson['email'] == '') {
        $result = json_encode(array('success' => false, 'result' => 'Por favor informe o email.'));
        echo $result;
        return;
    }

	if ($postjson['pass'] == '') {
		$result = json_encode(array('success' => false, 'result' => 'Por favor informe a senha.'));
        echo $result; 
        return;
    }

	$e = $postjson['email'];
    $p = $postjson['pass'];

	$query = mysqli_query($mysqli, "SELECT * FROM users WHERE email = '$e' AND pass = '$p' ");
    $row = mysqli_num_rows($query);
    
    if ($row === 0) {
        $result = json_encode(array('success' => false, 'result' => 'Usuário ou senha inválidos.'));
        echo $result; 
        return;
    }

    $data = mysqli_fetch_array($query);
    $user_data = array(
        'id' => $data['id'], 
        'name' => utf8_encode($data['name']),
        'email' => $data['email'],
        'document' => $data['document'],
        'type' => $data['type'],
        'pass' => $data['pass'],
        'phone' => $data['phone'],
        'addressZipcode' => $data['addressZipcode'],
        'address' => utf8_encode($data['address']),
        'addressNumber' => $data['addressNumber'],
        'addressComplement' => utf8_encode($data['addressComplement']),
        'addressNeighborhood' => utf8_encode($data['addressNeighborhood']),
        'addressCity' => utf8_encode($data['addressCity']),
        'addressState' => utf8_encode($data['addressState']),
        'addressCountry' => utf8_encode($data['addressCountry']),
        'details' => utf8_encode($data['details']),
        'regulation' => utf8_encode($data['regulation']),
        'img' => utf8_encode($data['img']),
        'recipientId' => $data['recipientId'],
        'percent' => $data['percent'],
        'status' => $data['status']
    );

    if ($user_data['status'] != '1') {
        $result = json_encode(array('success' => false, 'result' => 'Usuário inativo.'));
        echo $result; 
        return;
    }

    $result = json_encode(array('success' => true, 'result' => $user_data));
    echo $result; 
    return;
}

if ($postjson['req'] == 'signup') {
    
    // VALIDATE INPUT BEFORE REQUEST
	if ($postjson['name'] == '') {
		$result = json_encode(array('success' => false, 'result' => 'Por favor informe o nome.'));
        echo $result; 
        return;
    }
	
    if ($postjson['document'] == '') {
		$result = json_encode(array('success' => false, 'result' => 'Por favor informe o documento.'));
        echo $result; 
        return;
    }

	if ($postjson['email'] == '') {
		$result = json_encode(array('success' => false, 'result' => 'Por favor informe o email.'));
        echo $result; 
        return;
    }

	if ($postjson['pass'] == '') {
		$result = json_encode(array('success' => false, 'result' => 'Por favor informe a senha.'));
        echo $result; 
        return;
    }
	
    if ($postjson['phone'] == '') {
		$result = json_encode(array('success' => false, 'result' => 'Por favor informe o telefone.'));
        echo $result; 
        return;
    }

    $name = utf8_decode($postjson['name']);
    $email = $postjson['email'];
    $pass = utf8_decode($postjson['pass']);
    $phone = $postjson['phone'];
    $document = $postjson['document'];

 	$query = mysqli_query($mysqli, 
        "INSERT INTO users SET 
            name = '$name',
            email = '$email',
            document = '$document',
            type = 'CLIENT',
            pass = '$pass',
            phone = '$phone',
            addressZipcode = '-',
            address = '-',
            addressNumber = '-',
            addressComplement = '-',
            addressNeighborhood = '-',
            addressCity = '-',
            addressState = '-',
            addressCountry = '-',
            details = '-',
            regulation = '-',
            img = '-',
            recipientId = '-',
            percent = '-',
            status = 1
        ");

 	$id = mysqli_insert_id($mysqli);
 	if ($query) {
 		$result = json_encode(array('success' => true, 'result' => 'Dados salvos com sucesso.', 'id' => $id));
        echo $result; 
        return;
    }

	$result = json_encode(array('success' => false, 'result' => 'Erro ao criar usuário.'));
    echo $result; 
    return;
}

if ($postjson['req'] == 'recover') {

    if ($postjson['email'] == '') {
		$result = json_encode(array('success' => false, 'result' => 'Por favor informe o email.'));
        echo $result; 
        return;
    }

    if ($postjson['document'] == '') {
		$result = json_encode(array('success' => false, 'result' => 'Por favor informe o documento.'));
        echo $result; 
        return;
    }

    $e = $postjson['email'];
    $d = $postjson['document'];

	$query = mysqli_query($mysqli, "SELECT * FROM users WHERE email = '$e' AND document = '$d' ");
    $row = mysqli_num_rows($query);
    
    if ($row === 0) {
        $result = json_encode(array('success' => false, 'result' => 'Usuário ou senha inválidos.'));
        echo $result; 
        return;
    }

    $data = mysqli_fetch_array($query);
    $user_data = array(
        'id' => $data['id'],
        'pass' => $data['pass'],
    );

    $to = $e;
    $subject = "Senha de acesso eOfertas";

    $pass = $user_data['pass'];

    $message = " 
        <span style='font-size: 18px; font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif; '> 

        <br><br> Olá, tudo bem?
        
        <br><br> É um grande prazer ter você em nossa plataforma. 
        <br> Gostaríamos de aproveitar essa oportunidade para agradecer pelo cadastro.

        <br><br> Nossos Clientes são nosso maior orgulho – e motivo de comprometimento e responsabilidade.

        <br><br> Sua senha de acesso é <strong>$pass</strong>. 
        <br><br>Recomendamos fortemente que altere a sua senha.
        
        <br><br>Nossos sinceros agradecimentos, 
        <br> eOfertas.
        </span>
        ";

    $dest = 'atendimento@e-oferta.net.br';
    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8;' . "\r\n";
    $headers .= "From: " . $dest;
    mail($to, $subject, $message, $headers);

    $result = json_encode(array('success' => true, 'result' => 'Email enviado. Verifique a caixa de entrada ou de spam'));
    echo $result; 
    return;
}


// USER
if ($postjson['req'] == 'create_user') {

    $name = utf8_decode($postjson['name']);
    $email = $postjson['email'];
    $pass = $postjson['pass'];
    $phone = $postjson['phone'];
    $document = $postjson['document'];
    $type = $postjson['type'];
    $addressZipcode = $postjson['addressZipcode'];
    $address = utf8_decode($postjson['address']);
    $addressNumber = $postjson['addressNumber'];
    $addressComplement = utf8_decode($postjson['addressComplement']);
    $addressNeighborhood = utf8_decode($postjson['addressNeighborhood']);
    $addressCity = utf8_decode($postjson['addressCity']);
    $addressState = utf8_decode($postjson['addressState']);
    $addressCountry = utf8_decode($postjson['addressCountry']);
    $details = utf8_decode($postjson['details']);
    $regulation = utf8_decode($postjson['regulation']);
    $img = utf8_decode($postjson['img']);
    $recipientId = $postjson['recipientId'];
    $percent = $postjson['percent'];
    
    $data = [
        'nome' => $name,
        'email' => $email,
        'senha' => $pass,
        'telefone' => $phone,
        'documento' => $document,
        'tipo' => $type,
        'cep' => $addressZipcode,
        'endereco' => $address,
        'numero' => $addressNumber,
        'complemento' => $addressComplement,
        'bairro' => $addressNeighborhood,
        'cidade' => $addressCity,
        'estado' => $addressState,
        'pais' => $addressCountry,
        'detalhes' => $details,
        'regulamento' => $regulation,
        'imagem' => $img,
        'id do recebedor' => $recipientId,
        'percentual de recebimento' => $percent
    ];
    
    // VALIDATE INPUT BEFORE REQUEST
	foreach ($data as $key => $val) {
 	    if ($val == '') {
            $result = json_encode(array('success' => false, 'result' => 'O campo (' . $key . ') não foi informado.'));
            echo $result; 
            return;
        }
    }

    
    $query = mysqli_query($mysqli, 
        "INSERT INTO users SET 
            name = '$name',
            email = '$email',
            document = '$document',
            type = '$type',
            pass = '$pass',
            phone = '$phone',
            addressZipcode = '$addressZipcode',
            address = '$address',
            addressNumber = '$addressNumber',
            addressComplement = '$addressComplement',
            addressNeighborhood = '$addressNeighborhood',
            addressCity = '$addressCity',
            addressState = '$addressState',
            addressCountry = '$addressCountry',
            details = '$details',
            regulation = '$regulation',
            img = '$img',
            recipientId = '$recipientId',
            percent = '$percent',
            status = 1
        ");

 	$id = mysqli_insert_id($mysqli);
 	if ($query) {
 		$result = json_encode(array('success' => true, 'result' => 'Dados salvos com sucesso.'));
        echo $result; 
        return;
    }

	$result = json_encode(array('success' => false, 'result' => 'Erro ao criar usuário.'));
    echo $result; 
    return;
}

if ($postjson['req'] == 'edit_user') {

    $id = $postjson['id'];
    $name = utf8_decode($postjson['name']);
    $email = $postjson['email'];
    $pass = $postjson['pass'];
    $phone = $postjson['phone'];
    $document = $postjson['document'];
    $type = $postjson['type'];
    $addressZipcode = $postjson['addressZipcode'];
    $address = utf8_decode($postjson['address']);
    $addressNumber = $postjson['addressNumber'];
    $addressComplement = utf8_decode($postjson['addressComplement']);
    $addressNeighborhood = utf8_decode($postjson['addressNeighborhood']);
    $addressCity = utf8_decode($postjson['addressCity']);
    $addressState = utf8_decode($postjson['addressState']);
    $addressCountry = utf8_decode($postjson['addressCountry']);
    $details = utf8_decode($postjson['details']);
    $regulation = utf8_decode($postjson['regulation']);
    $img = utf8_decode($postjson['img']);
    $recipientId = $postjson['recipientId'];
    $percent = $postjson['percent'];
    $status = $postjson['status'];
    
    $data = [
        'id' => $id,
        'nome' => $name,
        'email' => $email,
        'senha' => $pass,
        'telefone' => $phone,
        'documento' => $document,
        'tipo' => $type,
        'cep' => $addressZipcode,
        'endereco' => $address,
        'numero' => $addressNumber,
        'complemento' => $addressComplement,
        'bairro' => $addressNeighborhood,
        'cidade' => $addressCity,
        'estado' => $addressState,
        'pais' => $addressCountry,
        'detalhes' => $details,
        'regulamento' => $regulation,
        'imagem' => $img,
        'id do recebedor' => $recipientId,
        'percentual de recebimento' => $percent,
        'status' => $status
    ];

    // VALIDATE INPUT BEFORE REQUEST
	foreach ($data as $key => $val) {
 	    if ($val == '') {
            $result = json_encode(array('success' => false, 'result' => 'O campo (' . $key . ') não foi informado.'));
            echo $result; 
            return;
        }
    }

    $query = mysqli_query($mysqli, 
        "UPDATE users SET 
            name = '$name',
            email = '$email',
            document = '$document',
            type = '$type',
            pass = '$pass',
            phone = '$phone',
            addressZipcode = '$addressZipcode',
            address = '$address',
            addressNumber = '$addressNumber',
            addressComplement = '$addressComplement',
            addressNeighborhood = '$addressNeighborhood',
            addressCity = '$addressCity',
            addressState = '$addressState',
            addressCountry = '$addressCountry',
            details = '$details',
            regulation = '$regulation',
            img = '$img',
            recipientId = '$recipientId',
            percent = '$percent',
            status = '$status'
            WHERE id ='$id'
        ");

	if ($query) {
		$result = json_encode(array('success' => true, 'result' => 'Dados salvos com sucesso.'));
        echo $result; 
        return;
    }

	$result = json_encode(array('success' => false, 'result' => 'Erro ao atualizar.'));
    echo $result; 
    return;
}

if ($postjson['req'] == 'get_users') {
    
    $type = $postjson['type'];

    if ($type == '') {
        $query = mysqli_query($mysqli, "SELECT * FROM users");
    } else {
        $query = mysqli_query($mysqli, "SELECT * FROM users WHERE type = '$type' ");
    }

    if (mysqli_num_rows($query) == 0) {
        $result = json_encode(array('success' => false, 'result' => 'Não há dados.'));
        echo $result; 
        return;
    }

 	while ($row = mysqli_fetch_array($query)) {
        
 		$data[] = array(
 			'id' => $row['id'], 
            'name' => utf8_encode($row['name']),
            'email' => $row['email'],
            'document' => $row['document'],
            'type' => $row['type'],
            'pass' => $row['pass'],
            'phone' => $row['phone'],
            'addressZipcode' => $row['addressZipcode'],
            'address' => utf8_encode($row['address']),
            'addressNumber' => $row['addressNumber'],
            'addressComplement' => utf8_encode($row['addressComplement']),
            'addressNeighborhood' => utf8_encode($row['addressNeighborhood']),
            'addressCity' => utf8_encode($row['addressCity']),
            'addressState' => utf8_encode($row['addressState']),
            'addressCountry' => utf8_encode($row['addressCountry']),
            'details' => utf8_encode($row['details']),
            'regulation' => utf8_encode($row['regulation']),
            'img' => utf8_encode($row['img']),
            'recipientId' => $row['recipientId'],
            'percent' => $row['percent'],
            'status' => $row['status']
 		);
 	}

	$result = json_encode(array('success' => true, 'result' => $data));
    echo $result; 
    return;
}

if ($postjson['req'] == 'get_user_by_id') {
    
    if ($postjson['id'] == '') {
 		$result = json_encode(array('success'=>false, 'result' => 'Informe o id.'));
        echo $result; 
        return;
 	}

    $id = $postjson['id'];
 	$query = mysqli_query($mysqli, "SELECT * FROM users WHERE id = '$id' ");

    if (mysqli_num_rows($query) == 0) {
        $result = json_encode(array('success' => false, 'result' => 'Erro ao listar'));
        echo $result; 
        return;
    }

 	while ($row = mysqli_fetch_array($query)) { 
 		$data = array(
 			'id' => $row['id'], 
            'name' => utf8_encode($row['name']),
            'email' => $row['email'],
            'document' => $row['document'],
            'type' => $row['type'],
            'pass' => $row['pass'],
            'phone' => $row['phone'],
            'addressZipcode' => $row['addressZipcode'],
            'address' => utf8_encode($row['address']),
            'addressNumber' => $row['addressNumber'],
            'addressComplement' => utf8_encode($row['addressComplement']),
            'addressNeighborhood' => utf8_encode($row['addressNeighborhood']),
            'addressCity' => utf8_encode($row['addressCity']),
            'addressState' => utf8_encode($row['addressState']),
            'addressCountry' => utf8_encode($row['addressCountry']),
            'details' => utf8_encode($row['details']),
            'regulation' => utf8_encode($row['regulation']),
            'img' => utf8_encode($row['img']),
            'recipientId' => $row['recipientId'],
            'percent' => $row['percent'],
            'status' => $row['status']
 		);
 	}
	
    $result = json_encode(array('success'=>true, 'result' => $data));
    echo $result; 
    return;
}



// PLATFORM
if ($postjson['req'] == 'get_platform') {
    
 	$query = mysqli_query($mysqli, "SELECT * FROM platform");
    if (mysqli_num_rows($query) == 0)  {
        $result = json_encode(array('success' => true, 'result' => null));
        echo $result; 
        return;
    }

 	while ($row = mysqli_fetch_array($query)) { 
 		$data[] = array(
 			'email' => $row['email'],
			'phone' => utf8_encode($row['phone']),
            'stoneApiKey' => $row['stoneApiKey'],
            'recipientId' => $row['recipientId'],
 		);
 	}

	if ($query) {
 		$result = json_encode(array('success'=>true, 'result' => $data));
        echo $result; 
        return;
 	}
	
	$result = json_encode(array('success'=>false, 'result' => 'Erro ao listar'));
    echo $result; 
    return;
}


// STONE
if ($postjson['req'] == 'get_payment_data') {
    // get portal data
    $platformQuery = mysqli_query($mysqli, "SELECT * FROM platform ORDER BY id");
 	while ($pRow = mysqli_fetch_array($platformQuery)) { 
 		$pData[] = array(
            'stoneApiKey' => $pRow['stoneApiKey'],
            'recipientId' => $pRow['recipientId']
 		);
 	}

    // get company data
    $companyId = $postjson['companyId'];
 	$companyQuery = mysqli_query($mysqli, "SELECT * FROM users WHERE id = '$companyId' ");
 	while ($cRow = mysqli_fetch_array($companyQuery)) { 
 		$cData[] = array(
            'recipientId' => $cRow['recipientId'],
            'percent' => $cRow['percent']
 		);
 	}
    
    // get agency data
    $agencyId = $postjson['agencyId'];
 	$agencyQuery = mysqli_query($mysqli, "SELECT * FROM users WHERE id = '$agencyId' ");
 	while ($aRow = mysqli_fetch_array($agencyQuery)) { 
 		$aData[] = array(
            'recipientId' => $aRow['recipientId'],
            'percent' => $aRow['percent']
 		);
 	}

    $data[] = array(
        "portal_id" => $pData[0]['recipientId'],
        "portal_percent" => (100 - ((int)$cData[0]['percent'] + (int)$aData[0]['percent'])),
        "company_id" => $cData[0]['recipientId'],
        "company_percent" => (int)$cData[0]['percent'],
        "agency_id" => $aData[0]['recipientId'],
        "agency_percent" => (int)$aData[0]['percent'],
        "key" => $pData[0]['stoneApiKey']
    );

    echo json_encode(array('success' => true, 'result' => $data)); 
    return;
}

function convertAmount($amount) {
  $amount = (string)$amount;
  $last = substr($amount, -2);
  $start = substr($amount, 0, strlen($amount) - 2);
  return $start . '.' . $last;
}

function convertDate($str) {
  $str = (string)$str;
  $dateOnly = explode("T", $str)[0];
  $dateSplit = explode("-", $dateOnly);
  return $dateSplit[2] . "/" . $dateSplit[1] . "/" . $dateSplit[0]; 
}

function convertDateToStone($date) {
  $newDate = explode("/", $date);
  return $newDate[2] + '-' + $newDate[1] + '-' + $newDate[0];
}

if ($postjson['req'] == 'pay_cc') {

    $companyId = $postjson['companyId'];
    $agencyId = $postjson['agencyId'];
    $bookId = $postjson['bookId'];
    $userId = $postjson['userId'];
    $name = $postjson['name'];
    $userdocument = $postjson['userdocument'];
    $email = $postjson['email'];
    $phone = $postjson['phone'];
    $birthday = $postjson['birthday'];
    $zipcode = $postjson['zipcode'];
    $address = $postjson['address'];
    $number = $postjson['number'];
    $neighborhood = $postjson['neighborhood'];
    $city = $postjson['city'];
    $state = $postjson['state'];
    $totalToPay = $postjson['totalToPay'];
    $cc = $postjson['cc'];
    $validThru = $postjson['validThru'];
    $cvv = $postjson['cvv'];
    
    $data = [
        'id da empresa' => $companyId,
        'id da agencia' => $agencyId,
        'id da reserva' => $bookId,
        'id do usuario' => $userId,
        'nome' => $name,
        'documento' => $userdocument,
        'email' => $email,
        'telefone' => $phone,
        'data nascimento' => $birthday,
        'cep' => $zipcode,
        'endereço' => $address,
        'número do endereço' => $number,
        'bairro' => $neighborhood,
        'cidade' => $city,
        'estado' => $state,
        'valor a ser pago' => $totalToPay,
        'cartão' => $cc,
        'validade do cartão' => $validThru,
        'cvv' => $cvv,
    ];
    
    // VALIDATE INPUT BEFORE REQUEST
	foreach ($data as $key => $val) {
 	    if ($val == '') {
            $result = json_encode(array('success' => false, 'result' => 'O campo (' . $key . ') não foi informado.'));
            echo $result; 
            return;
        }
    }

    // get portal data
    $platformQuery = mysqli_query($mysqli, "SELECT * FROM platform ORDER BY id");
 	while ($pRow = mysqli_fetch_array($platformQuery)) { 
 		$pData[] = array(
            'stoneApiKey' => $pRow['stoneApiKey'],
            'recipientId' => $pRow['recipientId']
 		);
 	}

    // get company data
 	$companyQuery = mysqli_query($mysqli, "SELECT * FROM users WHERE id = '$companyId' ");
 	while ($cRow = mysqli_fetch_array($companyQuery)) { 
 		$cData[] = array(
            'recipientId' => $cRow['recipientId'],
            'percent' => $cRow['percent']
 		);
 	}
    
    // get agency data
 	$agencyQuery = mysqli_query($mysqli, "SELECT * FROM users WHERE id = '$agencyId' ");
 	while ($aRow = mysqli_fetch_array($agencyQuery)) { 
 		$aData[] = array(
            'recipientId' => $aRow['recipientId'],
            'percent' => $aRow['percent']
 		);
 	}

    
    $customer = array(
        "external_id" => "#3311",
        "name" => $postjson['name'],
        "type" => strlen($postjson['userdocument']) == 14 ? "individual" : "corporation",
        "country" => "br",
        "email" => $postjson['email'],
        "documents" => [
            array(
                "type" => strlen($postjson['userdocument']) == 14 ? "cpf" : "cnpj",
                "number" => preg_replace('/[^0-9]/', '', $postjson['userdocument'])
            )
        ],
        "phone_numbers" => ["+55" . preg_replace('/[^0-9]/', '', $postjson['phone'])],
        "birthday" => $postjson['birthday']
    );

    $billing = array(
        "name" => $postjson['name'],
        "address" => array(
            "country" => "br",
            "state" => strtolower($postjson['state']),
            "city" => $postjson['city'],
            "neighborhood" => $postjson['neighborhood'],
            "street" => $postjson['address'],
            "street_number" => $postjson['number'],
            "zipcode" => preg_replace('/[^0-9]/', '', $postjson['zipcode'])
        )
    );

    $items = [
        array(
            "id" => "1",
            "title" => "Pagamento Ingresso eOfertas",
            "unit_price" => (int)preg_replace('/[^0-9]/', '', $postjson['totalToPay']),
            "quantity" => 1,
            "tangible" => true
        )
    ];

    $split_rule = $postjson['agencyId'] == $postjson['userId'] ? 
        [
            array(
                "recipient_id" => $cData[0]['recipientId'],
                "percentage" => (int)$cData[0]['percent'],
                "liable" => true,
                "charge_processing_fee" => true
            ),
            array(
                "recipient_id" => $pData[0]['recipientId'],
                "percentage" => (100 - (int)$cData[0]['percent']),
                "liable" => false,
                "charge_processing_fee" => false
            )
        ] : [
            array(
                "recipient_id" => $cData[0]['recipientId'],
                "percentage" => (int)$cData[0]['percent'],
                "liable" => true,
                "charge_processing_fee" => true
            ),
            array(
                "recipient_id" => $aData[0]['recipientId'],
                "percentage" => (int)$aData[0]['percent'],
                "liable" => false,
                "charge_processing_fee" => false
            ),
            array(
                "recipient_id" => $pData[0]['recipientId'],
                "percentage" => (100 - ((int)$cData[0]['percent'] + (int)$aData[0]['percent'])),
                "liable" => false,
                "charge_processing_fee" => false
            )
        ];

    
    
 
    $body = array(
        "api_key" => $pData[0]['stoneApiKey'],
        "amount" => (int)preg_replace('/[^0-9]/', '', $postjson['totalToPay']),
        "card_number" => preg_replace('/[^0-9]/', '', $postjson['cc']),
        "card_cvv" => $postjson['cvv'],
        "card_expiration_date" => preg_replace('/[^0-9]/', '', $postjson['validThru']),
        "card_holder_name" => $postjson['name'],
        "customer" => $customer,
        "billing" => $billing,
        "items" => $items,
        "split_rules" => $split_rule
    );


    // perform stone request
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://api.pagar.me/1/transactions");
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        "Accept: application/json",
        "Content-Type: application/json",
        "Access-Control-Allow-Origin: *"
    ));
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($body));
    $result = curl_exec($curl);
    
    if ($result['status'] == 'refused') {
        echo json_encode(array('success' => false, 'result' => $result['acquirer_response_message']));
        return;
    }
        
    // update data on database
    $bookId = $postjson['bookId'];
    $query = mysqli_query($mysqli, 
        "UPDATE book SET 
            status = 'PAID',
            paymentType = 'CREDIT CARD'
            WHERE id = '$bookId'
        ");

	echo json_encode(array('success' => true, 'result' => 'Pagamento efetuado com sucesso.')); 
    return;
}

if ($postjson['req'] == 'get_withdraw') {

    $platformQuery = mysqli_query($mysqli, "SELECT * FROM platform ORDER BY id");
 	while ($pRow = mysqli_fetch_array($platformQuery)) { 
 		$pData[] = array(
            'stoneApiKey' => $pRow['stoneApiKey'],
            'recipientId' => $pRow['recipientId']
 		);
 	}

    $apiKey = $pData[0]['stoneApiKey'];
    $params = 'transfers?count=1000&page=1&recipient_id=' . $postjson['id'] . '&api_key=' . $apiKey;

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://api.pagar.me/1/" . $params);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        "Accept: application/json",
        "Content-Type: application/json",
        "Access-Control-Allow-Origin: *"
    ));
    $result = json_decode(curl_exec($curl));
    $arr = [$result];

    if (count($arr) == 0) {
        echo json_encode(array('success' => true, 'result' => [])); 
        curl_close($curl);
        return;
    }


    foreach($arr as $row) {
        $statusToShow = "";
        switch ($row["status"]) {
            case 'pending_transfer':
                $statusToShow = 'Transferência pendente';
                break;
    
            case 'transferred':
                $statusToShow = 'Transferido';
                break;
    
            case 'failed':
                $statusToShow = 'Erro no saque';
                break;
    
            case 'processing':
                $statusToShow = 'Processando';
                break;
    
            case 'canceled':
                $statusToShow = 'Cancelado';
                break;
        }
    
        $data = array(
            "date" => convertDate($row["date_created"]),
            "amount" => "R$ " . convertAmount($row["amount"]),
            "tax" => "R$ " . $row["fee"] == 0 ? "0.00" : convertAmount($row["fee"]),
            "status" => $statusToShow
        );
    }

    echo json_encode(array('success' => true, 'result' =>  $data)); 
    curl_close($curl);
    return;
}

if ($postjson['req'] == 'get_withdraw_available') {
    $platformQuery = mysqli_query($mysqli, "SELECT * FROM platform ORDER BY id");
 	while ($pRow = mysqli_fetch_array($platformQuery)) { 
 		$pData[] = array(
            'stoneApiKey' => $pRow['stoneApiKey'],
            'recipientId' => $pRow['recipientId']
 		);
 	}

    $apiKey = $pData[0]['stoneApiKey'];
    $params = 'balance?recipient_id=' . $postjson['id'] . '&api_key=' . $apiKey;

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://api.pagar.me/1/" . $params);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        "Accept: application/json",
        "Content-Type: application/json",
        "Access-Control-Allow-Origin: *"
    ));
    $result = curl_exec($curl);
    $res = json_decode($result);
    $arr = [$result];

    if (count($arr) == 0) {
        echo json_encode(array('success' => true, 'result' => [])); 
        curl_close($curl);
        return;
    }
   
    for ($i = 1; $i < count($arr); $i++) {
 		$data[] = array(
 			"withdrawable" => 'R$ '. convertAmount($arr[$i]["available"]["amount"]),
            "totalWithdraw" => 'R$ '. convertAmount($arr[$i]["transferred"]["amount"]),
            "toReceive" => 'R$ '. convertAmount($arr[$i]["waiting_funds"]["amount"])
 		);
 	}

    echo json_encode(array('success' => true, 'result' => $data)); 
    curl_close($curl);
    return;  
}

if ($postjson['req'] == 'get_recipient_account') {
   
  $platformQuery = mysqli_query($mysqli, "SELECT * FROM platform ORDER BY id");
 	while ($pRow = mysqli_fetch_array($platformQuery)) { 
 		$pData[] = array(
            'stoneApiKey' => $pRow['stoneApiKey'],
            'recipientId' => $pRow['recipientId']
 		);
 	}

    $apiKey = $pData[0]['stoneApiKey'];
    $params = 'recipients/?recipient_id=' . $postjson['id'] . '&api_key=' . $apiKey;

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://api.pagar.me/1/" . $params);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        "Accept: application/json",
        "Content-Type: application/json",
        "Access-Control-Allow-Origin: *"
    ));
    $result = curl_exec($curl);
    $res = json_decode($result);
    $arr = [$result];

    if (count($arr) == 0) {
        echo json_encode(array('success' => true, 'result' => [])); 
        curl_close($curl);
        return;
    }
   
    $bankData = $arr[0]["bank_account"];

    $type = '';
    switch ($bankData['type']) {
        case 'conta_corrente':
        $type = 'Conta Corrente';
        break;

        case 'conta_poupanca':
        $type = 'Conta Poupança';
        break;

        case 'conta_corrente_conjunta':
        $type = 'Conta Corrente Conjunta';
        break;

        case 'conta_poupanca_conjunta':
        $type = 'Conta Poupança Conjunta';
        break;
    }

    $code = '';
    switch ($bankData['bank_code']) {
        case '001':
        $code = 'BANCO DO BRASIL S.A.';
        break;

        case '003':
        $code = 'BANCO DA AMAZONIA S.A.';
        break;

        case '004':
        $code = 'BANCO DO NORDESTE DO BRASIL S.A.';
        break;

        case '007':
        $code = 'BNDES';
        break;

        case '010':
        $code = 'CREDICOAMO';
        break;

        case '011':
        $code = 'C.SUISSE HEDGING-GRIFFO CV S/A';
        break;

        case '012':
        $code = 'BANCO INBURSA';
        break;

        case '014':
        $code = 'STATE STREET BR S.A. BANCO COMERCIAL';
        break;

        case '015':
        $code = 'UBS BRASIL CCTVM S.A.';
        break;

        case '016':
        $code = 'CCM DESP TRÂNS SC E RS';
        break;

        case '017':
        $code = 'BNY MELLON BANCO S.A.';
        break;

        case '018':
        $code = 'BANCO TRICURY S.A.';
        break;

        case '021':
        $code = 'BANCO BANESTES S.A.';
        break;

        case '024':
        $code = 'BANCO BANDEPE S.A.';
        break;

        case '025':
        $code = 'BANCO ALFA S.A.';
        break;

        case '029':
        $code = 'BANCO ITAÚ CONSIGNADO S.A.';
        break;

        case '033':
        $code = 'BANCO SANTANDER (BRASIL) S.A.';
        break;

        case '036':
        $code = 'BANCO BBI S.A.';
        break;

        case '037':
        $code = 'BANCO DO EST. DO PA S.A.';
        break;

        case '040':
        $code = 'BANCO CARGILL S.A.';
        break;

        case '041':
        $code = 'BANCO DO ESTADO DO RS S.A.';
        break;

        case '047':
        $code = 'BANCO DO EST. DE SE S.A.';
        break;

        case '060':
        $code = 'CONFIDENCE CC S.A.';
        break;

        case '062':
        $code = 'HIPERCARD BM S.A.';
        break;

        case '063':
        $code = 'BANCO BRADESCARD';
        break;

        case '064':
        $code = 'GOLDMAN SACHS DO BRASIL BM S.A';
        break;

        case '065':
        $code = 'BANCO ANDBANK S.A.';
        break;

        case '066':
        $code = 'BANCO MORGAN STANLEY S.A.';
        break;

        case '069':
        $code = 'BANCO CREFISA S.A.';
        break;

        case '070':
        $code = 'BRB - BANCO DE BRASILIA S.A.';
        break;

        case '074':
        $code = 'BANCO J.SAFRA S.A.';
        break;

        case '075':
        $code = 'BANCO ABN AMRO S.A.';
        break;

        case '076':
        $code = 'BANCO KDB BRASIL S.A.';
        break;

        case '077':
        $code = 'BANCO INTER';
        break;

        case '078':
        $code = 'HAITONG BI DO BRASIL S.A.';
        break;

        case '079':
        $code = 'BANCO ORIGINAL DO AGRO S/A';
        break;

        case '080':
        $code = 'B&amp;T CC LTDA.';
        break;

        case '081':
        $code = 'BANCOSEGURO S.A.';
        break;

        case '082':
        $code = 'BANCO TOPÁZIO S.A.';
        break;

        case '083':
        $code = 'BANCO DA CHINA BRASIL S.A.';
        break;

        case '084':
        $code = 'UNIPRIME NORTE DO PARANÁ - CC';
        break;

        case '085':
        $code = 'COOP CENTRAL AILOS';
        break;

        case '089':
        $code = 'CCR REG MOGIANA';
        break;

        case '091':
        $code = 'CCCM UNICRED CENTRAL RS';
        break;

        case '092':
        $code = 'BRK S.A. CFI';
        break;

        case '093':
        $code = 'PÓLOCRED SCMEPP LTDA.';
        break;

        case '094':
        $code = 'BANCO FINAXIS';
        break;

        case '095':
        $code = 'TRAVELEX BANCO DE CÂMBIO S.A.';
        break;

        case '096':
        $code = 'BANCO B3 S.A.';
        break;

        case '097':
        $code = 'CREDISIS CENTRAL DE COOPERATIVAS DE CRÉDITO LTDA.';
        break;

        case '098':
        $code = 'CREDIALIANÇA CCR';
        break;

        case '099':
        $code = 'UNIPRIME CENTRAL CCC LTDA.';
        break;

        case '100':
        $code = 'PLANNER CV S.A.';
        break;

        case '101':
        $code = 'RENASCENCA DTVM LTDA';
        break;

        case '102':
        $code = 'XP INVESTIMENTOS CCTVM S/A';
        break;

        case '104':
        $code = 'CAIXA ECONOMICA FEDERAL';
        break;

        case '105':
        $code = 'LECCA CFI S.A.';
        break;

        case '107':
        $code = 'BANCO BOCOM BBM S.A.';
        break;

        case '108':
        $code = 'PORTOCRED S.A. - CFI';
        break;

        case '111':
        $code = 'OLIVEIRA TRUST DTVM S.A.';
        break;

        case '113':
        $code = 'MAGLIANO S.A. CCVM';
        break;

        case '114':
        $code = 'CENTRAL COOPERATIVA DE CRÉDITO NO ESTADO DO ESPÍRITO SANTO';
        break;

        case '117':
        $code = 'ADVANCED CC LTDA';
        break;

        case '118':
        $code = 'STANDARD CHARTERED BI S.A.';
        break;

        case '119':
        $code = 'BANCO WESTERN UNION';
        break;

        case '120':
        $code = 'BANCO RODOBENS S.A.';
        break;

        case '121':
        $code = 'BANCO AGIBANK S.A.';
        break;

        case '122':
        $code = 'BANCO BRADESCO BERJ S.A.';
        break;

        case '124':
        $code = 'BANCO WOORI BANK DO BRASIL S.A.';
        break;

        case '125':
        $code = 'PLURAL BANCO BM';
        break;

        case '126':
        $code = 'BR PARTNERS BI';
        break;

        case '127':
        $code = 'CODEPE CVC S.A.';
        break;

        case '128':
        $code = 'MS BANK S.A. BANCO DE CÂMBIO';
        break;

        case '129':
        $code = 'UBS BRASIL BI S.A.';
        break;

        case '130':
        $code = 'CARUANA SCFI';
        break;

        case '131':
        $code = 'TULLETT PREBON BRASIL CVC LTDA';
        break;

        case '132':
        $code = 'ICBC DO BRASIL BM S.A.';
        break;

        case '133':
        $code = 'CRESOL CONFEDERAÇÃO';
        break;

        case '134':
        $code = 'BGC LIQUIDEZ DTVM LTDA';
        break;

        case '136':
        $code = 'UNICRED';
        break;

        case '138':
        $code = 'GET MONEY CC LTDA';
        break;

        case '139':
        $code = 'INTESA SANPAOLO BRASIL S.A. BM';
        break;

        case '140':
        $code = 'EASYNVEST - TÍTULO CV SA';
        break;

        case '142':
        $code = 'BROKER BRASIL CC LTDA.';
        break;

        case '143':
        $code = 'TREVISO CC S.A.';
        break;

        case '144':
        $code = 'BEXS BANCO DE CAMBIO S.A.';
        break;

        case '145':
        $code = 'LEVYCAM CCV LTDA';
        break;

        case '146':
        $code = 'GUITTA CC LTDA';
        break;

        case '149':
        $code = 'FACTA S.A. CFI';
        break;

        case '157':
        $code = 'ICAP DO BRASIL CTVM LTDA.';
        break;

        case '159':
        $code = 'CASA CREDITO S.A. SCM';
        break;

        case '163':
        $code = 'COMMERZBANK BRASIL S.A. - BANCO MÚLTIPLO';
        break;

        case '169':
        $code = 'BANCO OLÉ BONSUCESSO CONSIGNADO S.A.';
        break;

        case '173':
        $code = 'BRL TRUST DTVM SA';
        break;

        case '174':
        $code = 'PERNAMBUCANAS FINANC S.A. CFI';
        break;

        case '177':
        $code = 'GUIDE';
        break;

        case '180':
        $code = 'CM CAPITAL MARKETS CCTVM LTDA';
        break;

        case '182':
        $code = 'DACASA FINANCEIRA S/A - SCFI';
        break;

        case '183':
        $code = 'SOCRED SA - SCMEPP';
        break;

        case '184':
        $code = 'BANCO ITAÚ BBA S.A.';
        break;

        case '188':
        $code = 'ATIVA S.A. INVESTIMENTOS CCTVM';
        break;

        case '189':
        $code = 'HS FINANCEIRA';
        break;

        case '190':
        $code = 'SERVICOOP';
        break;

        case '191':
        $code = 'NOVA FUTURA CTVM LTDA.';
        break;

        case '194':
        $code = 'PARMETAL DTVM LTDA';
        break;

        case '196':
        $code = 'FAIR CC S.A.';
        break;

        case '197':
        $code = 'STONE PAGAMENTOS S.A.';
        break;

        case '208':
        $code = 'BANCO BTG PACTUAL S.A.';
        break;

        case '212':
        $code = 'BANCO ORIGINAL';
        break;

        case '213':
        $code = 'BANCO ARBI S.A.';
        break;

        case '217':
        $code = 'BANCO JOHN DEERE S.A.';
        break;

        case '218':
        $code = 'BANCO BS2 S.A.';
        break;

        case '222':
        $code = 'BANCO CRÉDIT AGRICOLE BR S.A.';
        break;

        case '224':
        $code = 'BANCO FIBRA S.A.';
        break;

        case '233':
        $code = 'BANCO CIFRA';
        break;

        case '237':
        $code = 'BANCO BRADESCO S.A.';
        break;

        case '241':
        $code = 'BANCO CLASSICO S.A.';
        break;

        case '243':
        $code = 'BANCO MÁXIMA S.A.';
        break;

        case '246':
        $code = 'BANCO ABC BRASIL S.A.';
        break;

        case '249':
        $code = 'BANCO INVESTCRED UNIBANCO S.A.';
        break;

        case '250':
        $code = 'BCV';
        break;

        case '253':
        $code = 'BEXS CC S.A.';
        break;

        case '254':
        $code = 'PARANA BANCO S.A.';
        break;

        case '260':
        $code = 'NU PAGAMENTOS S.A.';
        break;

        case '265':
        $code = 'BANCO FATOR S.A.';
        break;

        case '266':
        $code = 'BANCO CEDULA S.A.';
        break;

        case '268':
        $code = 'BARI CIA HIPOTECÁRIA';
        break;

        case '269':
        $code = 'HSBC BANCO DE INVESTIMENTO';
        break;

        case '270':
        $code = 'SAGITUR CC LTDA';
        break;

        case '271':
        $code = 'IB CCTVM S.A.';
        break;

        case '272':
        $code = 'AGK CC S.A.';
        break;

        case '273':
        $code = 'CCR DE SÃO MIGUEL DO OESTE';
        break;

        case '274':
        $code = 'MONEY PLUS SCMEPP LTDA';
        break;

        case '276':
        $code = 'SENFF S.A. - CFI';
        break;

        case '278':
        $code = 'GENIAL INVESTIMENTOS CVM S.A.';
        break;

        case '279':
        $code = 'CCR DE PRIMAVERA DO LESTE';
        break;

        case '280':
        $code = 'AVISTA S.A. CFI';
        break;

        case '281':
        $code = 'CCR COOPAVEL';
        break;

        case '283':
        $code = 'RB CAPITAL INVESTIMENTOS DTVM LTDA.';
        break;

        case '285':
        $code = 'FRENTE CC LTDA.';
        break;

        case '286':
        $code = 'CCR DE OURO';
        break;

        case '288':
        $code = 'CAROL DTVM LTDA.';
        break;

        case '289':
        $code = 'DECYSEO CC LTDA.';
        break;

        case '290':
        $code = 'PAGSEGURO';
        break;

        case '292':
        $code = 'BS2 DTVM S.A.';
        break;

        case '293':
        $code = 'LASTRO RDV DTVM LTDA';
        break;

        case '296':
        $code = 'VISION S.A. CC';
        break;

        case '298':
        $code = 'VIPS CC LTDA.';
        break;

        case '299':
        $code = 'SOROCRED CFI S.A.';
        break;

        case '300':
        $code = 'BANCO LA NACION ARGENTINA';
        break;

        case '301':
        $code = 'BPP IP S.A.';
        break;

        case '306':
        $code = 'PORTOPAR DTVM LTDA';
        break;

        case '307':
        $code = 'TERRA INVESTIMENTOS DTVM';
        break;

        case '309':
        $code = 'CAMBIONET CC LTDA';
        break;

        case '310':
        $code = 'VORTX DTVM LTDA.';
        break;

        case '315':
        $code = 'PI DTVM S.A.';
        break;

        case '318':
        $code = 'BANCO BMG S.A.';
        break;

        case '319':
        $code = 'OM DTVM LTDA';
        break;

        case '320':
        $code = 'BANCO CCB BRASIL S.A.';
        break;

        case '321':
        $code = 'CREFAZ SCMEPP LTDA';
        break;

        case '322':
        $code = 'CCR DE ABELARDO LUZ';
        break;

        case '323':
        $code = 'MERCADO PAGO';
        break;

        case '325':
        $code = 'ÓRAMA DTVM S.A.';
        break;

        case '329':
        $code = 'QI SCD S.A.';
        break;

        case '330':
        $code = 'BANCO BARI S.A.';
        break;

        case '331':
        $code = 'FRAM CAPITAL DTVM S.A.';
        break;

        case '332':
        $code = 'ACESSO';
        break;

        case '335':
        $code = 'BANCO DIGIO';
        break;

        case '336':
        $code = 'BANCO C6 S.A.';
        break;

        case '340':
        $code = 'SUPER PAGAMENTOS E ADMINISTRACAO DE MEIOS ELETRONICOS S.A.';
        break;

        case '341':
        $code = 'ITAÚ UNIBANCO S.A.';
        break;

        case '342':
        $code = 'CREDITAS SCD';
        break;

        case '343':
        $code = 'FFA SCMEPP LTDA.';
        break;

        case '348':
        $code = 'BANCO XP S.A.';
        break;

        case '349':
        $code = 'AMAGGI S.A. CFI';
        break;

        case '352':
        $code = 'TORO CTVM LTDA';
        break;

        case '354':
        $code = 'NECTON INVESTIMENTOS S.A CVM';
        break;

        case '355':
        $code = 'ÓTIMO SCD S.A.';
        break;

        case '364':
        $code = 'GERENCIANET PAGAMENTOS DO BRASIL LTDA';
        break;

        case '366':
        $code = 'BANCO SOCIETE GENERALE BRASIL';
        break;

        case '370':
        $code = 'BANCO MIZUHO S.A.';
        break;

        case '376':
        $code = 'BANCO J.P. MORGAN S.A.';
        break;

        case '380':
        $code = 'PICPAY SERVIÇOS S.A.';
        break;

        case '389':
        $code = 'BANCO MERCANTIL DO BRASIL S.A.';
        break;

        case '394':
        $code = 'BANCO BRADESCO FINANC. S.A.';
        break;

        case '399':
        $code = 'KIRTON BANK';
        break;

        case '403':
        $code = 'CORA SCD S.A.';
        break;

        case '412':
        $code = 'BANCO CAPITAL S.A.';
        break;

        case '422':
        $code = 'BANCO SAFRA S.A.';
        break;

        case '456':
        $code = 'BANCO MUFG BRASIL S.A.';
        break;

        case '464':
        $code = 'BANCO SUMITOMO MITSUI BRASIL S.A.';
        break;

        case '473':
        $code = 'BANCO CAIXA GERAL BRASIL S.A.';
        break;

        case '477':
        $code = 'CITIBANK N.A.';
        break;

        case '479':
        $code = 'BANCO ITAUBANK S.A.';
        break;

        case '487':
        $code = 'DEUTSCHE BANK S.A. BANCO ALEMAO';
        break;

        case '488':
        $code = 'JPMORGAN CHASE BANK';
        break;

        case '492':
        $code = 'ING BANK N.V.';
        break;

        case '495':
        $code = 'BANCO LA PROVINCIA B AIRES BCE';
        break;

        case '505':
        $code = 'BANCO CREDIT SUISSE S.A.';
        break;

        case '545':
        $code = 'SENSO CCVM S.A.';
        break;

        case '600':
        $code = 'BANCO LUSO BRASILEIRO S.A.';
        break;

        case '604':
        $code = 'BANCO INDUSTRIAL DO BRASIL S.A.';
        break;

        case '610':
        $code = 'BANCO VR S.A.';
        break;

        case '611':
        $code = 'BANCO PAULISTA S.A.';
        break;

        case '612':
        $code = 'BANCO GUANABARA S.A.';
        break;

        case '613':
        $code = 'OMNI BANCO S.A.';
        break;

        case '623':
        $code = 'BANCO PAN';
        break;

        case '626':
        $code = 'BANCO FICSA S.A.';
        break;

        case '630':
        $code = 'SMARTBANK';
        break;

        case '633':
        $code = 'BANCO RENDIMENTO S.A.';
        break;

        case '634':
        $code = 'BANCO TRIANGULO S.A.';
        break;

        case '637':
        $code = 'BANCO SOFISA S.A.';
        break;

        case '643':
        $code = 'BANCO PINE S.A.';
        break;

        case '652':
        $code = 'ITAÚ UNIBANCO HOLDING S.A.';
        break;

        case '653':
        $code = 'BANCO INDUSVAL S.A.';
        break;

        case '654':
        $code = 'BANCO A.J. RENNER S.A.';
        break;

        case '655':
        $code = 'BANCO VOTORANTIM S.A.';
        break;

        case '707':
        $code = 'BANCO DAYCOVAL S.A';
        break;

        case '712':
        $code = 'BANCO OURINVEST S.A.';
        break;

        case '739':
        $code = 'BANCO CETELEM S.A.';
        break;

        case '741':
        $code = 'BANCO RIBEIRAO PRETO S.A.';
        break;

        case '743':
        $code = 'BANCO SEMEAR';
        break;

        case '745':
        $code = 'BANCO CITIBANK S.A.';
        break;

        case '746':
        $code = 'BANCO MODAL S.A.';
        break;

        case '747':
        $code = 'BANCO RABOBANK INTL BRASIL S.A.';
        break;

        case '748':
        $code = 'BANCO COOPERATIVO SICREDI S.A.';
        break;

        case '751':
        $code = 'SCOTIABANK BRASIL';
        break;

        case '752':
        $code = 'BANCO BNP PARIBAS BRASIL S A';
        break;

        case '753':
        $code = 'NOVO BANCO CONTINENTAL S.A. - BM';
        break;

        case '754':
        $code = 'BANCO SISTEMA';
        break;

        case '755':
        $code = 'BOFA MERRILL LYNCH BM S.A.';
        break;

        case '756':
        $code = 'BANCOOB';
        break;

        case '757':
        $code = 'BANCO KEB HANA DO BRASIL S.A.';
        break;
    }

    $accountData = array(
        "bank" => $code,
        "agency" => 'Agência - ' . $bankData["agencia"],
        "currentaccount" =>
        'Conta corrente - ' . $bankData["conta"] . '-' . $bankData["conta_dv"],
        "accounttype" => 'Tipo de conta - ' . $type,
        "receiver" => 'Recebedor - ' . $bankData["legal_name"]
    );

    
    echo json_encode(array('success' => true, 'result' => $accountData)); 
    curl_close($curl);
    return;
}

if ($postjson['req'] == 'withdraw') {

    $platformQuery = mysqli_query($mysqli, "SELECT * FROM platform ORDER BY id");
 	while ($pRow = mysqli_fetch_array($platformQuery)) { 
 		$pData[] = array(
            'stoneApiKey' => $pRow['stoneApiKey'],
            'recipientId' => $pRow['recipientId']
 		);
 	}

    $apiKey = $pData[0]['stoneApiKey'];

    $body = array(
        "recipient_id" => $postjson['id'],
        "amount" => (int)preg_replace('/[^0-9]/', '', $postjson['amount'])
    );

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, 'https://api.pagar.me/1/transfers/?api_key=' . $apiKey);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        "Accept: application/json",
        "Content-Type: application/json",
        "Access-Control-Allow-Origin: *"
    ));
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($body));
    $result = curl_exec($curl);
   

   echo json_encode(array('success' => true, 'result' => $result)); 
   curl_close($curl);
   return;
   
}

if ($postjson['req'] == 'anticipation') {
    $platformQuery = mysqli_query($mysqli, "SELECT * FROM platform ORDER BY id");
 	while ($pRow = mysqli_fetch_array($platformQuery)) { 
 		$pData[] = array(
            'stoneApiKey' => $pRow['stoneApiKey'],
            'recipientId' => $pRow['recipientId']
 		);
 	}

    $apiKey = $pData[0]['stoneApiKey'];
    $to = $postjson['to'];
    $id = $postjson['id'];

    $params = 
    'payables?api_key=' . $apiKey .
    '&recipient_id=' . $id .
    'status=waiting_funds&count=1000';

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://api.pagar.me/1/" . $params);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        "Accept: application/json",
        "Content-Type: application/json",
        "Access-Control-Allow-Origin: *"
    ));
    $result = json_decode(curl_exec($curl));
    $arr = [$result];

    if (count($arr) == 0) {
        echo json_encode(array('success' => true, 'result' => [])); 
        curl_close($curl);
        return;
    }


    for ($i = 0; $i < count($arr); $i++) {
        $type = '';
        switch ($arr[$i]["type"]) {
            case 'chargeback': {
                $type = 'CONTESTADO';
                break;
            }

            case 'refund': {
                $type = 'RECUSADO';
                break;
            }

            case 'chargeback_refund': {
                $type = 'CONTESTAÇÃO RECUSADA';
                break;
            }

            case 'credit': {
                $type = 'CREDITADA';
                break;
            }
        }

        $paymentDate = convertDate($arr[$i]["payment_date"]);


        $data = array(
            "date" => cconvertDate($arr[$i]["date_created"]),
            "amount" => 'R$ ' . convertAmount($arr[$i]["amount"]),
            "status" => $arr["status"] === 'paid' ? 'PAGO' : 'AGUARDANDO',
            "payment" =>
                $arr["payment_method"] === 'credit_card' ? 'Cartão de Crédito' : 'Boleto',
            "dateAvailable" => $paymentDate,
            "transactionType" => $type
        );
   }

   echo json_encode(array('success' => true, 'result' =>  $data)); 
   curl_close($curl);
   return;
}

if ($postjson['req'] == 'conciliation') {

    $platformQuery = mysqli_query($mysqli, "SELECT * FROM platform ORDER BY id");
 	while ($pRow = mysqli_fetch_array($platformQuery)) { 
 		$pData[] = array(
            'stoneApiKey' => $pRow['stoneApiKey'],
            'recipientId' => $pRow['recipientId']
 		);
 	}

    $apiKey = $pData[0]['stoneApiKey'];
    $to = $postjson['to'];
    $id = $postjson['id'];

    $params = 
    'payables?api_key=' . $apiKey .
    '&recipient_id=' . $id .
    '&created_at=<=' . convertDateToStone($to) .
    'T23:59:59.599Z&payment_date=&count=1000';

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://api.pagar.me/1/" . $params);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        "Accept: application/json",
        "Content-Type: application/json",
        "Access-Control-Allow-Origin: *"
    ));
    $result = json_decode(curl_exec($curl));
    $arr = $result;

    if (count($arr) == 0) {
        echo json_encode(array('success' => true, 'result' => [])); 
        curl_close($curl);
        return;
    }


    for ($i = 0; $i < count($arr); $i++) {
        $type = '';
        switch ($arr[$i]["type"]) {
            case 'chargeback': {
                $type = 'CONTESTADO';
                break;
            }

            case 'refund': {
                $type = 'RECUSADO';
                break;
            }

            case 'chargeback_refund': {
                $type = 'CONTESTAÇÃO RECUSADA';
                break;
            }

            case 'credit': {
                $type = 'CREDITADA';
                break;
            }
        }

        $paymentDate = convertDate($arr[$i]["payment_date"]);


        $data = array(
            "date" => cconvertDate($arr[$i]["date_created"]),
            "amount" => 'R$ ' . convertAmount($arr[$i]["amount"]),
            "status" => $arr["status"] === 'paid' ? 'PAGO' : 'AGUARDANDO',
            "payment" =>
                $arr["payment_method"] === 'credit_card' ? 'Cartão de Crédito' : 'Boleto',
            "dateAvailable" => $paymentDate,
            "transactionType" => $type
        );
   }

   echo json_encode(array('success' => true, 'result' =>  $data)); 
   curl_close($curl);
   return;
}


// SEND EMAIL
if ($postjson['req'] == 'send_email') {
    $to = $postjson['email'];
    $subject = "Voucher eOfertas";

    $people = $postjson['people']; 
    $estabName = $postjson['estabName'];
    $productName = $postjson['productName'];
    $totalPaid = $postjson['totalPaid'];
    $peopleCount = $postjson['peopleCount'];
    $bookingArr = $postjson['bookingArr'];
    $peopleArr = $postjson['peopleArr'];

    $el = '';
    for ($i = 0; $i < $peopleCount; $i++) {

        $bookCodeD = $i+1;
        $bookCodeValue = $bookingArr[$i];
        $bookPerson = $peopleArr[$i];

        $el .= "
            <img
                style='display: table; margin: 0px auto;' 
                src='https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=$bookCodeValue' 
                alt='qrcode-access' /><br/><br/>
            <span
                style='
                    color: #666;
                    font-weight: 700;
                    font-size: 0.9rem;
                    max-width: 450px;
                    text-align: left;
                    margin: 0px 30px 0px 0px;
                '>
                Reserva $bookCodeD
            </span><br/>
            <span
                style='
                    color: #666;
                    font-weight: 500;
                    font-size: 0.9rem;
                    max-width: 450px;
                    text-align: left;
                    margin: 0px 30px 0px 0px;
                '>
                $bookPerson
            </span><br /><br />
            <div style='
                width: 100%;
                display: flex;
                margin: auto;
                max-width: 950px;
                border-top: 1px solid #cecece;
                '></div>
            <br/>
            <br/><br/>
        ";
    }

    $message = " 
        <span style='font-size: 18px; font-family: 'Poppins', 'Helvetica', 'Arial', sans-serif; '> 
        <span class='itemTitle' id='itemTitle' 
            style='font-size: 1.1rem; margin: 0px 30px 0px 0px;'>
            eOfertas - Voucher
        </span><br /><br />

        <div style='background-color: #fff'>
            <span 
                style='
                color: #0e2431;
                font-weight: 700;
                font-size: 1.1rem;
                max-width: 450px;
                text-align: left;
                margin: 0px 30px 0px 0px;
                '>
                Resumo do pedido
            </span><br/><br/>
            <div style='
                width: 100%;
                display: flex;
                margin: auto;
                max-width: 950px;
                border-top: 1px solid #cecece;
                '></div>
            <br/>
            <span 
                style='
                    color: #0e2431;
                    font-weight: 700;
                    font-size: 1.1rem;
                    max-width: 450px;
                    text-align: left;
                    margin: 0px 30px 0px 0px;
                '>
                Reservas    
            </span><br />
            <span 
                style='
                    color: #666;
                    font-weight: 500;
                    font-size: 0.9rem;
                    max-width: 450px;
                    text-align: left;
                    margin: 0px 30px 0px 0px;
                '>
                $people
            </span><br /><br/><br/><br/>

            $el

            <br />
            <div style='
                width: 100%;
                display: flex;
                margin: auto;
                max-width: 950px;
                border-top: 1px solid #cecece;
                '></div>
            <br/>
            
            <span style='
                    color: #0e2431;
                    font-weight: 700;
                    font-size: 1.1rem;
                    max-width: 450px;
                    text-align: left;
                    margin: 0px 30px 0px 0px;
                '>
                $estabName
            </span><br />
            <span 
                style='
                    font-size: 0.9rem;
                    margin: 0px 30px 0px 0px;
                    color: #666666;
                    font-weight: 500;
                '>
                $productName
            </span><br /><br />
            <span 
                style='
                    color: #2fc046;
                    font-weight: 700;
                    font-size: 1.1rem;
                    max-width: 450px;
                    text-align: left;
                    margin: 0px 30px 60px 0px;
                '>
                R$ $totalPaid
            </span><br /><br />
        </div>
        <br /><br />

        <span>Crie uma conta ou acesse para ver mais detalhes do seu Voucher</span>
        <br />
        <a href='https://danielvazdev.com/pages/acesso/acesso.html?e=$to' target='_blank'>Clique aqui</a><br/>
        
        <br><br>Nossos sinceros agradecimentos, 
        <br> eOfertas.
        </span>
    ";

    $dest = 'atendimento@e-oferta.net.br';
    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8;' . "\r\n";
    $headers .= "From: " . $dest;
    mail($to, $subject, $message, $headers);

    $result = json_encode(array('success' => true, 'result' => 'Email enviado.'));
    echo $result; 
    return;
}

?>
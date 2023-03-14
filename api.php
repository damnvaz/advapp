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
	if ($postjson['login'] == '') {
        $result = json_encode(array('success' => false, 'result' => 'Por favor informe o email ou telefone celular.'));
        echo $result;
        return;
    }

	if ($postjson['login'] == '') {
		$result = json_encode(array('success' => false, 'result' => 'Por favor informe a senha.'));
        echo $result; 
        return;
    }

	$e = $postjson['login'];
    $p = $postjson['pass'];

	$query = mysqli_query($mysqli, "SELECT * FROM users WHERE (email = '$e' OR  phone = '$e' ) AND pass = '$p' ");
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
        'document' => $data['document'],
        'nationalRegistration' => $data['nationalRegistration'],
        'driversLicense' => $data['driversLicense'],
        'phone' => $data['phone'],
        'email' => $data['email'],
        'pass' => $data['pass'],
        'type' => $data['type'],
        'status' => $data['status'],
        'address' => $data['address'],
        'createdAt' => utf8_encode($data['createdAt']),
        'recipientId' => utf8_encode($data['recipientId']),
        'martialStatus' => utf8_encode($data['martialStatus']),
        'occupation' => utf8_encode($data['occupation']),
        'workPassport' => $data['workPassport']
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

	if ($postjson['nationalRegistration'] == '') {
		$result = json_encode(array('success' => false, 'result' => 'Por favor informe o rg.'));
        echo $result; 
        return;
    }
	
    if ($postjson['driversLicense'] == '') {
		$result = json_encode(array('success' => false, 'result' => 'Por favor informe a cnh.'));
        echo $result; 
        return;
    }
	
    if ($postjson['phone'] == '') {
		$result = json_encode(array('success' => false, 'result' => 'Por favor informe o telefone.'));
        echo $result; 
        return;
    }

    $name = $postjson['name'];
    $document = $postjson['document'];
    $nationalRegistration = $postjson['nationalRegistration'];
    $driversLicense = $postjson['driversLicense'];
    $email = $postjson['email'];
    $pass = $postjson['pass'];
    $phone = $postjson['phone'];
    $type = $postjson['type'];
    $createdAt = $postjson['createdAt'];
    $martialStatus = $postjson['martialStatus'];
    $occupation = $postjson['occupation'];
    $workPassport = $postjson['workPassport'];

 	$query = mysqli_query($mysqli, 
        "INSERT INTO users SET 
            name = '$name',
            document = '$document',
            nationalRegistration = '$nationalRegistration',
            driversLicense = '$driversLicense',
            phone = '$phone',
            email = '$email',
            pass = '$pass',
            type = '$type',
            status = 1,
            address = '-',
            createdAt = '$createdAt',
            recipientId = '-',
            martialStatus = '$martialStatus',
            occupation = '$occupation',
            workPassport = '$workPassport'
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
    
    if ($postjson['phone'] == '') {
		$result = json_encode(array('success' => false, 'result' => 'Por favor informe o telefone.'));
        echo $result; 
        return;
    }

    $e = $postjson['email'];
    $d = $postjson['document'];
    $p = $postjson['phone'];

	$query = mysqli_query($mysqli, "SELECT * FROM users WHERE email = '$e' AND document = '$d' AND phone = '$p'");
    $row = mysqli_num_rows($query);
    
    if ($row === 0) {
        $result = json_encode(array('success' => false, 'result' => 'Usuário inexistente. Verifique os dados.'));
        echo $result; 
        return;
    }

    $data = mysqli_fetch_array($query);
    $user_data = array(
        'id' => $data['id'],
        'email' => $data['email'],
        'pass' => $data['pass']
    );

    $to = $e;
    $subject = "Senha de acesso IUSOK";

    $email = $user_data['email'];
    $pass = $user_data['pass'];

    $message = " 
        <span style='font-size: 18px; font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif; '> 

        <br><br> Olá, tudo bem?
        
        <br><br> É um grande prazer ter você em nossa plataforma. 
        <br> Gostaríamos de aproveitar essa oportunidade para agradecer pelo cadastro.

        <br><br> Nossos Clientes são nosso maior orgulho – e motivo de comprometimento e responsabilidade.

        <br><br> Sua senha de acesso é <strong>$pass</strong>. 
        <br><br>Recomendamos fortemente que altere a sua senha.

        <a href='https://iusok.com/profile?r&e=$email&p=$pass'>Clique aqui</a> para alterar sua senha.
        
        <br><br>Nossos sinceros agradecimentos, 
        <br> IUSOK.
        </span>
    ";

    $dest = 'suporte@iusok.com';
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


// TERMS, POLICIES, FAQ
if ($postjson['req'] == 'terms') {
    
    $termsQuery = mysqli_query($mysqli, "SELECT * FROM terms_of_use ");
 	while ($row = mysqli_fetch_array($termsQuery)) { 
 		$data[] = array(
            'id' => $row['id'],
            'terms' => $row['terms'],
            'version' => $row['version']
 		);
 	}

    echo json_encode(array('success' => true, 'result' => $data)); 
    return;
}

if ($postjson['req'] == 'policies') {
    
    $policyQuery = mysqli_query($mysqli, "SELECT * FROM privacy_policy ");
 	while ($row = mysqli_fetch_array($policyQuery)) { 
 		$data[] = array(
            'id' => $row['id'],
            'policy' => $row['policy'],
            'version' => $row['version']
 		);
 	}

    echo json_encode(array('success' => true, 'result' => $data)); 
    return;
}

if ($postjson['req'] == 'faq') {
    
    $faqQuery = mysqli_query($mysqli, "SELECT * FROM faq ");
 	while ($row = mysqli_fetch_array($faqQuery)) { 
 		$data[] = array(
            'id' => $row['id'],
            'doubt' => $row['doubt'],
            'details' => $row['details']
 		);
 	}

    echo json_encode(array('success' => true, 'result' => $data)); 
    return;
}




// SEND EMAIL
if ($postjson['req'] == 'send_email') {
    $to = $postjson['email'];
    $subject = "Voucher IUSOK";

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
            IUSOK - Voucher
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
        <a href='https://iusok.com/pages/acesso/acesso.html?e=$to' target='_blank'>Clique aqui</a><br/>
        
        <br><br>Nossos sinceros agradecimentos, 
        <br> IUSOK.
        </span>
    ";

    $dest = 'suporte@iusok.com';
    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8;' . "\r\n";
    $headers .= "From: " . $dest;
    mail($to, $subject, $message, $headers);

    $result = json_encode(array('success' => true, 'result' => 'Email enviado.'));
    echo $result; 
    return;
}

?>
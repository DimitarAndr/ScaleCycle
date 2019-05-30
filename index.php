<?php
	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Headers:X-Request-With');
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
	//Cargamos el framework
	//require_once 'PHPMailer.php';
	use PHPMailer\PHPMailer\PHPMailer;
	//require_once 'PHPMailer.php';
	require_once 'vendor/autoload.php';
	$app = new \Slim\App();
	$GLOBALS['SLIM_SERVE'] = "http://localhost/M12";
	$GLOBALS['ScaleCycle'] = "http://localhost:4200";
	function getConnection() {
		$dbhost="localhost";
		$dbuser="root";
		$dbpass="";
		$dbname="scalecycleddbb";
		$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $dbh;
	}
	$app->post('/login', function ($request) {
		$usu = json_decode($request->getBody());
		$sql;
		switch ($usu->type) {
			case '1':
				$sql = "SELECT * FROM cliente WHERE Username=:username AND Password=:password AND Estado = 2";
				break;
			case '2':
				$sql = "SELECT * FROM empleado WHERE Username=:username AND Password=:password AND (Estado = 1 OR Estado = 2)";
				break;
			default:
				return '{"error":{"text":"Tipo de usuario incorrecto"}}';
				break;
		}
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("username", $usu->username);
			$stmt->bindParam("password", $usu->password);
			$stmt->execute();
			$datos = $stmt->fetchAll(PDO::FETCH_OBJ);
			if (!$datos) {
				return '{"error":{"text":"No existe usuario"}}';
			}else{
				return json_encode($datos);
			}
		}
		catch(Exception $e) {
			echo '{"error":{"text":"'. $e->getMessage() .'"}}';
		}
	});
	$app->post('/createAccount', function ($request) {
		//$SLIM_SERVE = "http://localhost/M12";
		$usu = json_decode($request->getBody());
		$typeIdentificador = ($usu->TypeIdentifier=="DNI")?1:($usu->TypeIdentifier=="NIE")?2:3;
		//$sql = "INSERT INTO `cliente`(`Identificador`) VALUES (:Identificador)";
		$sql = "INSERT INTO `cliente`(`Identificador`, `TipoIdentificador`, `Username`, `Password`, `Nombre`, `Apellido`, `Genero`, `Telefono`, `Email`, `Avatar`, `FechaNacimiento`, `Localidad`, `Direccion`) VALUES (:Identificador,:TypeIdentificador,:Username,:Password,:Name,:LastName,:Gender,:Phone,:Email,:Avatar,:Birthdate,:Location,:Address)";
		try {
			//INSERT INTO `cliente`(`Identificador`, `TipoIdentificador`, `Username`, `Password`, `Nombre`, `Apellido`, `Genero`, `Telefono`, `Email`, `Avatar`, `FechaNacimiento`, `Localidad`, `Direccion`) VALUES ('QEWQ',3,'qwe',"","","","No definido",12312,"asd","","","","");
			$x=0;
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("Identificador", $usu->Identifier);
			$stmt->bindParam("TypeIdentificador", $typeIdentificador);
			$stmt->bindParam("Username", $usu->Username);
			$stmt->bindParam("Password", $usu->Password);
			$stmt->bindParam("Name", $usu->Name);
			$stmt->bindParam("LastName", $usu->LastName);
			$stmt->bindParam("Gender", $usu->Gender);
			$stmt->bindParam("Phone", $usu->Phone);
			$stmt->bindParam("Email", $usu->Email);
			$stmt->bindParam("Avatar", $usu->Avatar);
			$stmt->bindParam("Birthdate", $usu->Birthdate);
			$stmt->bindParam("Location", $usu->Location);
			$stmt->bindParam("Address", $usu->Address);
			$stmt->execute();
			$x = $db->lastInsertId();;
			if (!$x>0) {
				return '{"error":{"text":"Fallo Insertar"}}';
			}else{
				$id = encrypt_decrypt('encrypt',$x);
				$body = "<p>clica <a href='".$GLOBALS['ScaleCycle']."/activateAccount/".$id."'><b>aqui</b></a> para activar cuenta</p>";
				$x=sendMail($usu->Email, $usu->Name, "Prueba", $body);
				if ($x) {
					return '{"correct":{"text":"Crear usuario Correctamente"}}';
				}else{
					return '{"Error":{"text":"Fallo Enviar E-Mail"}}';
				}
				
			}
		}
		catch(Exception $e) {
			echo '{"error":{"text":"'. $e->getMessage() .'"}}';
		}
	});
	function sendMail($cliEmail, $cliName, $subject, $body){
		$username = 'whoami62674@gmail.com';
		$password = 'joandaustria';
		$email = 'whoami62674@gmail.com';
		$name = 'ScaleCycle';
		$mail = new PHPMailer();
    $mail->isSMTP();
    $mail->Mailer =			'smtp';
    $mail->SMTPAuth =		true;
    $mail->SMTPSecure = 'ssl';
    $mail->Host =				'smtp.gmail.com';
    $mail->Port =				465;
    
    $mail->Username = $username;
    $mail->Password = $password;
    $mail->isHTML(true);
    $mail->setFrom($email,$name);
    $mail->addAddress($cliEmail, $cliName);
    $mail->Subject =	$subject;
    $mail->Body =			$body;
    if(!$mail->send()){
        return false;
    }else{
        return true;
    }
	}
	function encrypt_decrypt($action, $string) {
    $output = false;
    $encrypt_method = "AES-256-CBC";
    $secret_key = 'ScaleCycle';
    $secret_iv = '1234567812345678'; //16
    // hash
    $key = hash('sha256', $secret_key);
    
    // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
    $iv = substr(hash('sha256', $secret_iv), 0, 16);
    if ( $action == 'encrypt' ) {
        $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
        $output = base64_encode($output);
    } else if( $action == 'decrypt' ) {
        $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
    }
    return $output;
	}
	$app->get('/activateAccount/{id}', function ($request) {
		$id = encrypt_decrypt('decrypt',$request->getAttribute('id'));
		$sql = "SELECT *  FROM Cliente WHERE Id = $id";
		$update = "UPDATE Cliente SET Estado = 2 WHERE Id = $id;";
		try {
			$stmt = getConnection()->query($sql);
			$client = $stmt->fetchAll(PDO::FETCH_OBJ);
			if($client[0]->Estado == 1){
				$stmt = getConnection()->prepare($update);
				$x = $stmt->execute();
				if(!$x){
					echo '{"error":{"text":"Falla Actualizar Estado Usuario"}}';
				}else{
					echo '{"correct":{"text":"Activar Cuenta Correctamente"}}';
				}
			}else{
				echo '{"error":{"text":"Actualizacion Invalido"}}';
			}
			//return json_encode($producto);
		}
		catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->post('/sendRecoverPasswordMali', function ($request) {
		$usu = json_decode($request->getBody());
		$sql = "SELECT * FROM cliente WHERE Username=:username";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("username", $usu->username);
			$stmt->execute();
			$datos = $stmt->fetchAll(PDO::FETCH_OBJ);
			if (!$datos) {
				return '{"error":{"text":"No existe usuario"}}';
			}else{
				$username = encrypt_decrypt('encrypt',$usu->username);
				$body = "<p>clica <a href='".$GLOBALS['ScaleCycle']."/recoverPassword/".$username."'><b>aqui</b></a> para resetear contraseña</p>";
				$x = sendMail($datos[0]->Email, $datos[0]->Username, "Recuperar Contraseña", $body);
				if(!$x){
					return '{"error":{"text":"Falla Enviar Mail"}}';
				}else{
					return '{"correct":{"text":"Mail Enviada Correctamente"}}';
				}
			}
		}
		catch(Exception $e) {
			echo '{"error":{"text":"'. $e->getMessage() .'"}}';
		}
	});
	$app->post('/recoverPassword', function ($request) {
		$usu = json_decode($request->getBody());
		$username = encrypt_decrypt('decrypt',$usu->username);
		$select = "SELECT * FROM Cliente WHERE Username = :username";
		$update = "UPDATE Cliente SET Password = :password WHERE Username = :username;";
		try {
			$db = getConnection();
			$stmt = $db->prepare($select);
			$stmt->bindParam("username", $username);
			$stmt->execute();
			$datos = $stmt->fetchAll(PDO::FETCH_OBJ);
			if (!$datos) {
				return '{"error":{"text":"No existe usuario"}}';
			}else{
				$stmt = $db->prepare($update);
				$stmt->bindParam("username", $username);
				$stmt->bindParam("password", $usu->password);
				$x = $stmt->execute();
				if (!$x) {
					return '{"error":{"text":"Fallo update"}}';
				}else{
					return '{"correct":{"text":"Update Correct"}}';
				}
			}
		}
		catch(Exception $e) {
			echo '{"error":{"text":"'. $e->getMessage() .'"}}';
		}
	});
	$app->get('/getClient/{id}', function ($request) {
		$id = $request->getAttribute('id');
		$sql = "SELECT *  FROM Cliente WHERE Id = :id";
		try {
			$db = getConnection();
			$stmt = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$client = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!$client){
				echo '{"error":{"text":"No existe usuario"}}';
			}else{
				return json_encode($client);
			}
		}
		catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->get('/getEmployee/{id}', function ($request) {
		$id = $request->getAttribute('id');
		$sql = "SELECT *  FROM Empleado WHERE Id = :id";
		try {
			$db = getConnection();
			$stmt = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$client = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!$client){
				echo '{"error":{"text":"No existe usuario"}}';
			}else{
				return json_encode($client);
			}
		}
		catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->post('/changeEmployee', function ($request) {
		$usu = json_decode($request->getBody());
		$select = "SELECT * FROM Empleado WHERE Id = :id";
		$update = "UPDATE Empleado SET Password = :password, Nombre = :nombre, Apellido = :apellido WHERE Id = :id;";
		try {
			$db = getConnection();
			$stmt = $db->prepare($select);
			$stmt->bindParam("id", $usu->Id);
			$stmt->execute();
			$datos = $stmt->fetchAll(PDO::FETCH_OBJ);
			if (!$datos) {
				return '{"error":{"text":"No existe usuario"}}';
			}else{
				$stmt = $db->prepare($update);
				$stmt->bindParam("id", $usu->Id);
				$stmt->bindParam("password", $usu->Password);
				$stmt->bindParam("nombre", $usu->Name);
				$stmt->bindParam("apellido", $usu->LastName);
				$x = $stmt->execute();
				if (!$x) {
					return '{"error":{"text":"Fallo update"}}';
				}else{
					return '{"correct":{"text":"Update Correct"}}';
				}
			}
		}
		catch(Exception $e) {
			echo '{"error":{"text":"'. $e->getMessage() .'"}}';
		}
	});
	$app->get('/getClientForId/{id}', function ($request) {
		$id = $request->getAttribute('id');
		$select = "SELECT *  FROM Cliente WHERE Id = :id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($select);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$client = $stmt->fetchAll(PDO::FETCH_OBJ);
			if (!$client) {
				return '{"error":{"text":"No existe usuario"}}';
			}else{
				return json_encode($client);
			}
		}
		catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->get('/getClientForIdentification/{identificador}', function ($request) {
		$identificador = $request->getAttribute('identificador');
		$select = "SELECT *  FROM Cliente WHERE Identificador = :identificador";
		try {
			$db = getConnection();
			$stmt = $db->prepare($select);
			$stmt->bindParam("identificador", $identificador);
			$stmt->execute();
			$client = $stmt->fetchAll(PDO::FETCH_OBJ);
			if (!$client) {
				return '{"error":{"text":"No existe usuario"}}';
			}else{
				return json_encode($client);
			}
			//return json_encode($producto);
		}
		catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->get('/getAllEmployee', function ($request) {
		return selectEmpleado();
	});
	$app->get('/getEmployeeLocked', function ($request) {
		return selectEmpleado(" WHERE Estado = 0");
	});
	$app->get('/getEmployeeEmployee', function ($request) {
		return selectEmpleado(" WHERE Estado = 1");
	});
	$app->get('/getEmployeeAdmin', function ($request) {
		return selectEmpleado(" WHERE Estado = 2");
	});
	$app->get('/getEmployeeValid', function ($request) {
		return selectEmpleado(" WHERE Estado > 0");
	});
	function selectEmpleado($where = ""){
		$sql = "SELECT *  FROM Empleado".$where;
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$employees = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!$employees){
				return '{"error":{"text":"No hay ninguno empleado"}}';
			}else{
				return json_encode($employees);
			}
		}
		catch(PDOException $e) {
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
	$app->get('/getAllEvent', function ($request) {
		$sql = "SELECT *  FROM Evento";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$events = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!$events){
				return '{"error":{"text":"No hay ninguno empleado"}}';
			}else{
				return json_encode($events);
			}
		}
		catch(PDOException $e) {
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->get('/getEvent/{id}', function ($request) {
		$id = $request->getAttribute('id');
		$sql = "SELECT *  FROM Evento WHERE Id = :id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$events = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!$events){
				return '{"error":{"text":"No existe evento con id: '.$id.'"}}';
			}else{
				return json_encode($events);
			}
		}
		catch(PDOException $e) {
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->get('/getAllParticipants/{eventId}', function ($request) {
		$eventId = $request->getAttribute('eventId');
		$sql = "SELECT c.id as 'IdCliente', c.Identificador, c.Username, c.Nombre, c.Apellido, c.Telefono, p.id_evento as 'IdEvento', p.Descripcion, p.Estado FROM cliente c, participar p WHERE c.Id = p.id_cliente AND p.id_evento = :eventId";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("eventId", $eventId);
			$stmt->execute();
			$events = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!$events){
				return '{"error":{"text":"No hay ninguna participante en evento: '.$eventId.' / no existe evento"}}';
			}else{
				return json_encode($events);
			}
		}
		catch(PDOException $e) {
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->put('/updateEstadoPartipate', function ($request) {
		$data = json_decode($request->getBody());
		$sql = "UPDATE participar SET Estado = :estado  WHERE Id_cliente = :idClient AND Id_evento = :idEvento";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("idClient", $data->participant);
			$stmt->bindParam("idEvento", $data->event);
			$stmt->bindParam("estado", $data->estado);
			$events = $stmt->execute();
			if(!$events){
				return '{"error":{"text":"Falla Update"}}';
			}else{
				return '{"correct":{"text":"Update Correct"}}';
			}
		}
		catch(PDOException $e) {
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->put('/updateDescripcionPartipate', function ($request) {
		$data = json_decode($request->getBody());
		$sql = "UPDATE participar SET Descripcion=:description  WHERE Id_cliente = :idClient AND Id_evento = :idEvento";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("idClient", $data->participant);
			$stmt->bindParam("idEvento", $data->event);
			$stmt->bindParam("description", $data->descripcion);
			$events = $stmt->execute();
			if(!$events){
				return '{"error":{"text":"Falla Update"}}';
			}else{
				return '{"correct":{"text":"Update Correct"}}';
			}
		}
		catch(PDOException $e) {
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->post('/newEvnet', function ($request) {
		$event = json_decode($request->getBody());
		$sql = "INSERT INTO `evento`(`Id`,`Titulo`, `Lugar`, `Descripcion`, `Puntos`, `Fecha`, `HoraInicio`, `HoraFinal`, `Id_empleado`) VALUES(null,:titulo,:lugar,:descripcion,:puntos,:fecha,:horaInicio,:horaFinal,:idEmpleado)";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("titulo", $event->Titulo);
			$stmt->bindParam("lugar", $event->Lugar);
			$stmt->bindParam("descripcion", $event->Descripcion);
			$stmt->bindParam("puntos", $event->Puntos);
			$stmt->bindParam("fecha", $event->Fecha);
			$stmt->bindParam("horaInicio", $event->HoraInicio);
			$stmt->bindParam("horaFinal", $event->HoraFinal);
			$stmt->bindParam("idEmpleado", $event->Id_empleado);
			$x = $stmt->execute();
			if (!$x) {
				echo '{"error":{"text":"Error insert"}}';
			}else{
				echo '{"Correct":{"text":"Insert Correct"}}';
			}
		}
		catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->delete('/deleteEvent/{id}', function ($request) {
		$id = $request->getAttribute('id');
		$sql = "DELETE FROM `evento` WHERE Id = :id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $id);
			$x = $stmt->execute();
			if (!$x) {
				echo '{"error":{"text":"Error Delete"}}';
			}else{
				echo '{"Correct":{"text":"Delete Correct"}}';
			}
		}
		catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->put('/modifyEvent', function ($request) {
		$event = json_decode($request->getBody());
		$sql = "UPDATE `evento` SET `Titulo`=:Titulo,`Lugar`=:Lugar,`Descripcion`=:Descripcion,`Puntos`=:Puntos,`Fecha`=:Fecha,`HoraInicio`=:HoraInicio,`HoraFinal`=:HoraFinal WHERE Id = :id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $event->Id);
			$stmt->bindParam("Titulo", $event->Titulo);
			$stmt->bindParam("Lugar", $event->Lugar);
			$stmt->bindParam("Descripcion", $event->Descripcion);
			$stmt->bindParam("Puntos", $event->Puntos);
			$stmt->bindParam("Fecha", $event->Fecha);
			$stmt->bindParam("HoraInicio", $event->HoraInicio);
			$stmt->bindParam("HoraFinal", $event->HoraFinal);
			$x = $stmt->execute();
			if (!$x) {
				echo '{"error":{"text":"Error Modify"}}';
			}else{
				echo '{"Correct":{"text":"Modify Correct"}}';
			}
		}
		catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->get('/getAllClaim', function ($request) {
		$sql = "SELECT *  FROM Reclamacion";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$claims = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!$claims){
				return '{"error":{"text":"No hay ninguno reclamacion"}}';
			}else{
				return json_encode($claims);
			}
		}
		catch(PDOException $e) {
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->put('/updateStatudClaim', function ($request) {
		$data = json_decode($request->getBody());
		$sql = "UPDATE reclamacion SET Estado = :estado  WHERE Id = :id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("estado", $data->statud);
			$stmt->bindParam("id", $data->id);
			$events = $stmt->execute();
			if(!$events){
				return '{"error":{"text":"Falla Update"}}';
			}else{
				return '{"correct":{"text":"Update Correct"}}';
			}
		}
		catch(PDOException $e) {
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->delete('/deleteEmployee/{id}', function ($request) {
		$id = $request->getAttribute('id');
		$sql = "DELETE FROM `empleado` WHERE Id = :id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $id);
			$x = $stmt->execute();
			if (!$x) {
				echo '{"error":{"text":"Error Delete"}}';
			}else{
				echo '{"Correct":{"text":"Delete Correct"}}';
			}
		}
		catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->put('/modifyEmployee', function ($request) {
		$employee = json_decode($request->getBody());
		$sql = "UPDATE `empleado` SET `Password`=:Password,`Nombre`=:Nombre,`Apellido`=:Apellido WHERE Id=:Id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("Id", $employee->Id);
			$stmt->bindParam("Password", $employee->Password);
			$stmt->bindParam("Nombre", $employee->Nombre);
			$stmt->bindParam("Apellido", $employee->Apellido);
			$x = $stmt->execute();
			if (!$x) {
				echo '{"error":{"text":"Error Modify"}}';
			}else{
				echo '{"Correct":{"text":"Modify Correct"}}';
			}
		}
		catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->put('/updateEmployeeStatud', function ($request) {
		$data = json_decode($request->getBody());
		$sql = "UPDATE empleado SET Estado = :estado  WHERE Id = :id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("estado", $data->statud);
			$stmt->bindParam("id", $data->id);
			$events = $stmt->execute();
			if(!$events){
				return '{"error":{"text":"Falla Update"}}';
			}else{
				return '{"correct":{"text":"Update Correct"}}';
			}
		}
		catch(PDOException $e) {
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->put('/changeClient', function ($request) {
		$usu = json_decode($request->getBody());
		$typeIdentificador = ($usu->TipoIdentificador=="DNI")?1:($usu->TipoIdentificador=="NIE")?2:3;
		//$sql = "INSERT INTO `cliente`(`Identificador`) VALUES (:Identificador)";
		$sql = "UPDATE `cliente` SET `Identificador`=:Identificador,`TipoIdentificador`=:TipoIdentificador,`Password`=:Password,`Nombre`=:Nombre,`Apellido`=:Apellido,`Genero`=:Genero,`Telefono`=:Telefono,`Email`=:Email,`Avatar`=:Avatar,`FechaNacimiento`=:FechaNacimiento,`Localidad`=:Localidad,`Direccion`=:Direccion,`Oculto`=:Oculto WHERE Id = :Id";
		try {
			//INSERT INTO `cliente`(`Identificador`, `TipoIdentificador`, `Username`, `Password`, `Nombre`, `Apellido`, `Genero`, `Telefono`, `Email`, `Avatar`, `FechaNacimiento`, `Localidad`, `Direccion`) VALUES ('QEWQ',3,'qwe',"","","","No definido",12312,"asd","","","","");
			$x=0;
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("Id", $usu->Id);
			$stmt->bindParam("Identificador", $usu->Identificador);
			$stmt->bindParam("TipoIdentificador", $typeIdentificador);
			$stmt->bindParam("Password", $usu->Password);
			$stmt->bindParam("Nombre", $usu->Nombre);
			$stmt->bindParam("Apellido", $usu->Apellido);
			$stmt->bindParam("Genero", $usu->Genero);
			$stmt->bindParam("Telefono", $usu->Telefono);
			$stmt->bindParam("Email", $usu->Email);
			$stmt->bindParam("Avatar", $usu->Avatar);
			$stmt->bindParam("FechaNacimiento", $usu->FechaNacimiento);
			$stmt->bindParam("Localidad", $usu->Localidad);
			$stmt->bindParam("Direccion", $usu->Direccion);
			$stmt->bindParam("Oculto", $usu->Oculto);
			
			$x = $stmt->execute();
			if (!$x) {
				return '{"error":{"text":"Modify Incorrect"}}';
			}else{
				return '{"correct":{"text":"Modify Correct"}}';
			}
		}
		catch(Exception $e) {
			echo '{"error":{"text":"'. $e->getMessage() .'"}}';
		}
	});
	$app->post('/newRegisterSubmit', function ($request) {
		$date = date("Y-m-d");
		$time = date("H:i:s");
		$data = json_decode($request->getBody());
		$submit = $data->submit;
		$client = $data->client;
		$employeeId = $data->employee;
		$sql = "INSERT INTO `entrega`(`Plastico`, `Carton`, `Cristal`, `Metal`, `Aceite`, `Pila`, `Puntos`, `Fecha`, `Hora`, `id_empleado`, `id_cliente`) VALUES (:plastic,:paperboard,:crystal,:metal,:oil,:battery,:points,:date,:time,:employee,:client)";
		$update = "UPDATE `cliente` SET `Puntos`=`Puntos`+ :puntos WHERE `Id`= :id";
		try {
			$x=0;
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("plastic", $submit->plastic);
			$stmt->bindParam("paperboard", $submit->paperboard);
			$stmt->bindParam("crystal", $submit->crystal);
			$stmt->bindParam("metal", $submit->metal);
			$stmt->bindParam("oil", $submit->oil);
			$stmt->bindParam("battery", $submit->battery);
			$stmt->bindParam("points", $submit->points);
			$stmt->bindParam("date", $date);
			$stmt->bindParam("time", $time);
			$stmt->bindParam("employee", $employeeId);
			$stmt->bindParam("client", $client->Id);
			$stmt->execute();
			$x = $db->lastInsertId();;
			if (!$x>0) {
				return '{"error":{"text":"Error Insert"}}';
			}else{
				$stmt = $db->prepare($update);
				$stmt->bindParam("puntos", $submit->points);
				$stmt->bindParam("id", $client->Id);
				$x = $stmt->execute();
				if(!$x){
					return '{"error":{"text":"Error Update"}}';
				}else{
					return '{"correct":{"text":"Crear Entrega Correctamente"}}';
				}
			}
		}
		catch(Exception $e) {
			echo '{"error":{"text":"'. $e->getMessage() .'"}}';
		}
	});
	$app->get('/getAllEventByUser/{id}', function ($request) {
		$id = $request->getAttribute('id');
		$sql = "SELECT e.*, p.Estado as 'EstadoP', p.Descripcion as 'DescripcionP'  FROM Participar p, Evento e WHERE p.Id_cliente = :id AND p.Id_evento = e.Id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$events = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!$events){
				return '{"error":{"text":"No hay ninguno evento sobre este usuario"}}';
			}else{
				return json_encode($events);
			}
		}
		catch(PDOException $e) {
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->get('/getAllSubmitByUser/{id}', function ($request) {
		$id = $request->getAttribute('id');
		$sql = "SELECT * FROM Entrega WHERE Id_cliente = :id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$events = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!$events){
				return '{"error":{"text":"No hay ninguno empleado"}}';
			}else{
				return json_encode($events);
			}
		}
		catch(PDOException $e) {
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->post('/joinEvent', function ($request) {
		$data = json_decode($request->getBody());
		$eventId = $data->eventId;
		$clientId = $data->clientId;
		$sql = "INSERT INTO `participar`(`Id_cliente`, `Id_evento`) VALUES (:client,:event)";
		try {
			$x=0;
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("client", $clientId);
			$stmt->bindParam("event", $eventId);
			$x = $stmt->execute();
			if (!$x) {
				return '{"error":{"text":"Error Insert"}}';
			}else{
				return '{"correct":{"text":"Unirse Correctamente"}}';
			}
		}
		catch(Exception $e) {
			echo '{"error":{"text":"'. $e->getMessage() .'"}}';
		}
	});
	$app->get('/getAllEventActiv', function ($request) {
		$sql = "SELECT *  FROM Evento WHERE Estado = 1";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$events = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!$events){
				return '{"error":{"text":"No hay ninguno evento activado"}}';
			}else{
				return json_encode($events);
			}
		}
		catch(PDOException $e) {
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	$app->post('/createEmployee', function ($request) {
		$usu = json_decode($request->getBody());
		$sql = "INSERT INTO `empleado`(`Username`, `Password`, `Nombre`, `Apellido`) VALUES (:Username,:Password,:Nombre,:Apellido)";
		try {
			$x=0;
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("Username", $usu->Username);
			$stmt->bindParam("Password", $usu->Password);
			$stmt->bindParam("Nombre", $usu->Nombre);
			$stmt->bindParam("Apellido", $usu->Apellido);
			$x = $stmt->execute();
			if (!$x) {
				return '{"error":{"text":"Error Insert"}}';
			}else{
				return '{"correct":{"text":"Unirse Correctamente"}}';
			}
		}
		catch(Exception $e) {
			echo '{"error":{"text":"'. $e->getMessage() .'"}}';
		}
	});
	$app->get('/getChart', function ($request) {
		$sql = "SELECT SUM(Plastico), SUM(Carton), SUM(Cristal), SUM(Metal), SUM(Aceite), SUM(Pila), Fecha FROM entrega Group BY MONTH(Fecha)";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->execute();
			$events = $stmt->fetchAll(PDO::FETCH_OBJ);
			if(!$events){
				return '{"error":{"text":"No hay ninguno entrega"}}';
			}else{
				return json_encode($events);
			}
		}
		catch(PDOException $e) {
			return '{"error":{"text":'. $e->getMessage() .'}}';
		}
	});
	
	$app->run();
?>
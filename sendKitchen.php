<?php 
    $data = json_decode(file_get_contents('php://input'), true);
    $tableNum = $data["tableNum"];
    $order = $data["order"];
    $subtotal = $data["subtotal"];
    $total = $data["total"];

    $servername = "localhost";
    $username = "user";
    $password = "password";
    $dbname = "restaurant";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "INSERT INTO orders (tableNum, order, subtotal, total) VALUES ($tableNum, $order, $subtotal, $total)";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
?>
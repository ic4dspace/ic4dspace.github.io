<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["name"];
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email is required ";
} else {
    $email = $_POST["email"];
}

// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG .= "Message is required ";
} else {
    $message = $_POST["message"];
}

// Curren year
$current_year = date ( 'Y' );

// URL
$url = 'http' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') ? 's' : '') . '://';
$url = $url . $_SERVER['SERVER_NAME'];
define('URL', $url);

// Head
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=utf-8";

$emailTo = "example@example.com"; //<- Your Email
$subject = "New Message Received"; //<- Your Subject Email

// prepare email body text
$body = "<html><body>";
$body .= "<div style='background:#f9f9f9; padding:1px;'>";
$body .= "<div style='text-align: center; margin-top: 20px;'><img style='height:80px; width:80px;' src='$url/artstyles/artem/assets/images/icon-letter.png' alt='Email' /></div>";
$body .= "<div style='background:#fff; width:600px; margin:20px auto; padding:35px 60px 25px; box-sizing:border-box; border-radius:4px; box-shadow: 0 15px 40px rgba(141, 153, 167, 0.05);'>";
$body .= "<div style='color:#8d99a7;'>Name:</div>";
$body .= "<div style='margin-bottom:10px;'>$name</div>";
$body .= "<div style='color:#8d99a7;'>Email sender:</div>";
$body .= "<div style='margin-bottom:10px;'>$email</div>";
$body .= "<div style='color:#8d99a7;'>Comment:</div>";
$body .= "<div style='margin-bottom:10px;'>$message</div>";
$body .= "</div>";
$body .= "<div style='color:#8d99a7; font-size:12px; text-align:center; padding-bottom:20px;'>Copyright $current_year ARTEM. All rights reserved.</div>";
$body .= "</div>";
$body .= "</body></html>";

// send email
$success = mail($emailTo, $subject, $body, $headers, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}

?>
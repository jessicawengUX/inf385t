<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["inputName"];
    $email = $_POST["inputEmail"];
    $message = $_POST["inputMessage"];

    // You can now use the variables $name, $email, and $message to send an email or perform other actions.
    
    // For example, to send an email:
    $to = "jessica.weng@utexas.edu";
    $subject = "Contact Form Submission from $name";
    $headers = "From: $email";
    
    // Send the email
    mail($to, $subject, $message, $headers);
?>
<!-- SUCCESS MESSAGE -->
Thank you for getting in touch. We'll get back to you soon.
<?php
}
?>
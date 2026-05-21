<?php
// Telegram Bot Contact Form Handler
// This script sends contact form submissions to a Telegram bot

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? htmlspecialchars(strip_tags($_POST['name'])) : '';
$email = isset($_POST['email']) ? htmlspecialchars(strip_tags($_POST['email'])) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars(strip_tags($_POST['phone'])) : '';
$message = isset($_POST['message']) ? htmlspecialchars(strip_tags($_POST['message'])) : '';

// Validation
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'error' => 'Please fill in all required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Please enter a valid email address']);
    exit;
}

// Telegram Bot Configuration
// Load credentials from config file (outside web root)
$config = require __DIR__ . '/../config/telegram.php';
$botToken = $config['bot_token'];
$chatId = $config['chat_id'];

// Prepare the message
$text = "📨 *New Contact Form Submission*\n\n";
$text .= "*Name:* {$name}\n";
$text .= "*Email:* {$email}\n";
if (!empty($phone)) {
    $text .= "*Phone:* {$phone}\n";
}
$text .= "*Message:* {$message}\n";
$text .= "\n_Sent from N6 Solutions Landing Page_";

// Send to Telegram
$apiUrl = "https://api.telegram.org/bot{$botToken}/sendMessage";
$data = [
    'chat_id' => $chatId,
    'text' => $text,
    'parse_mode' => 'Markdown'
];

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($httpCode === 200) {
    echo json_encode(['success' => true]);
} else {
    $responseData = json_decode($response, true);
    $errorMessage = 'Failed to send message to Telegram';
    if ($curlError) {
        $errorMessage .= ': ' . $curlError;
    }
    if ($responseData && isset($responseData['description'])) {
        $errorMessage .= ': ' . $responseData['description'];
    }
    echo json_encode(['success' => false, 'error' => $errorMessage, 'debug' => ['http_code' => $httpCode, 'response' => $response]]);
}

<?php
/**
 * Basitleştirilmiş email gönderimi - mail() fonksiyonu kullanır
 */

// Output buffering başlat
ob_start();

// Headers
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    ob_end_clean();
    http_response_code(200);
    exit();
}

// Sadece POST kabul et
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ob_end_clean();
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed', 'status' => 'error']);
    ob_end_flush();
    exit();
}

// Response fonksiyonu
function sendResponse($success, $message, $statusCode = 200) {
    ob_end_clean();
    http_response_code($statusCode);
    if ($success) {
        echo json_encode(['message' => $message, 'status' => 'success']);
    } else {
        echo json_encode(['error' => $message, 'status' => 'error']);
    }
    ob_end_flush();
    exit();
}

try {
    // JSON input al
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    // Validation
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['subject']) || !isset($data['message'])) {
        sendResponse(false, 'Missing required fields', 400);
    }

    // Data temizleme
    $name = htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
    $phone = isset($data['phone']) && $data['phone'] ? htmlspecialchars(trim($data['phone']), ENT_QUOTES, 'UTF-8') : '-';
    $country = isset($data['country']) && $data['country'] ? htmlspecialchars(trim($data['country']), ENT_QUOTES, 'UTF-8') : '-';
    $subject = htmlspecialchars(trim($data['subject']), ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8');
    $referral = isset($data['referral']) && is_array($data['referral']) && count($data['referral']) > 0
        ? implode(', ', array_map(function($item) {
            return htmlspecialchars(trim($item), ENT_QUOTES, 'UTF-8');
        }, $data['referral']))
        : '-';

    // Email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendResponse(false, 'Invalid email address', 400);
    }

    // Email subject
    $emailSubject = "Yeni İletişim Formu Mesajı: " . $subject;

    // HTML email body
    $htmlContent = "
<!DOCTYPE html>
<html>
<head>
    <meta charset=\"utf-8\">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; padding: 0; }
        .header { background: linear-gradient(135deg, #C7A27A 0%, #B8946B 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #C7A27A; }
        .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 3px solid #C7A27A; }
        .footer { background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
    </style>
</head>
<body>
    <div class=\"container\">
        <div class=\"header\">
            <h2 style=\"margin: 0;\">🎯 Yeni İletişim Formu Mesajı</h2>
            <p style=\"margin: 10px 0 0 0;\">Roversan Gıda Web Sitesi</p>
        </div>
        <div class=\"content\">
            <div class=\"field\">
                <div class=\"label\">👤 Ad Soyad:</div>
                <div class=\"value\">{$name}</div>
            </div>
            <div class=\"field\">
                <div class=\"label\">📧 E-posta:</div>
                <div class=\"value\">{$email}</div>
            </div>
            <div class=\"field\">
                <div class=\"label\">📞 Telefon:</div>
                <div class=\"value\">{$phone}</div>
            </div>
            <div class=\"field\">
                <div class=\"label\">🌍 Ülke:</div>
                <div class=\"value\">{$country}</div>
            </div>
            <div class=\"field\">
                <div class=\"label\">📋 Konu:</div>
                <div class=\"value\">{$subject}</div>
            </div>
            <div class=\"field\">
                <div class=\"label\">💬 Mesaj:</div>
                <div class=\"value\" style=\"white-space: pre-wrap;\">{$message}</div>
            </div>
            <div class=\"field\">
                <div class=\"label\">📢 Roversan'ı Nereden Duydunuz:</div>
                <div class=\"value\">{$referral}</div>
            </div>
        </div>
        <div class=\"footer\">
            <p style=\"margin: 0;\">Bu mesaj Roversan Gıda web sitesi iletişim formundan gönderilmiştir.</p>
            <p style=\"margin: 5px 0 0 0;\">Gönderim Zamanı: " . date('d.m.Y H:i:s', strtotime('+3 hours')) . " (İstanbul)</p>
        </div>
    </div>
</body>
</html>
";

    // Plain text version
    $textContent = "Yeni İletişim Formu Mesajı\n\n";
    $textContent .= "Ad Soyad: {$name}\n";
    $textContent .= "E-posta: {$email}\n";
    $textContent .= "Telefon: {$phone}\n";
    $textContent .= "Ülke: {$country}\n";
    $textContent .= "Konu: {$subject}\n\n";
    $textContent .= "Mesaj:\n{$message}\n\n";
    $textContent .= "Roversan'ı Nereden Duydunuz: {$referral}\n\n";
    $textContent .= "Gönderim Zamanı: " . date('d.m.Y H:i:s', strtotime('+3 hours')) . " (İstanbul)";

    // Email headers
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Roversan Gıda Web Sitesi <contact@roversan.com>\r\n";
    $headers .= "Reply-To: {$name} <{$email}>\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "X-Priority: 1\r\n";

    // SMTP ayarları (bazı sunucularda gerekli)
    ini_set('SMTP', 'srvc92.trwww.com');
    ini_set('smtp_port', '465');
    ini_set('sendmail_from', 'contact@roversan.com');

    // Email gönder
    $mailSent = @mail('info@roversan.com', $emailSubject, $htmlContent, $headers);

    if ($mailSent) {
        sendResponse(true, 'Email sent successfully', 200);
    } else {
        // Hata logla
        error_log('Mail send failed for: ' . $email);
        sendResponse(false, 'Failed to send email. Please try again or contact us directly.', 500);
    }

} catch (Exception $e) {
    error_log('Contact form error: ' . $e->getMessage());
    sendResponse(false, 'Server error occurred', 500);
} catch (Throwable $e) {
    error_log('Contact form fatal error: ' . $e->getMessage());
    sendResponse(false, 'Fatal server error', 500);
}
?>

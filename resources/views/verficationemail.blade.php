<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 20px;">
        <p style="color: #555555;">
            Merci pour votre inscription. Veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse e-mail.
        </p>
        <a href="{{ $data['Url'] }}" style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
            vérifier Email
        </a>
        <p style="color: #999999; margin-top: 20px; font-size: 12px;">
            Si vous n'avez pas créé de compte, veuillez ignorer cet e-mail.
        </p>
    </div>
</body>
</html>

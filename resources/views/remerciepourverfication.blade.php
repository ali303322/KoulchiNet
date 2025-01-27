<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verified</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            padding: 50px;
        }
        .container {
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            margin: 0 auto;
        }
        h1 {
            color: #1c2b6d;
        }
        p {
            color: #333;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #0645a3;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .btn:hover {
            background-color: white;
            color: #0645a3;
        }
    </style>
</head>
<body>
    <div class="container text-center mt-5">
        <h1 class="text-success">Merci!</h1>
        <p>Votre e-mail a été vérifié avec succès.</p>
        <a href="{{$route}}" style="background-color: 1c2b6d" class="btn mt-3">Accéder au Dashboard</a>
    </div>
</body>
</html>
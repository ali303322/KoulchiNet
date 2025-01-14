<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MqcLPODsyh8FTOJDgf9ZLo5C9RNgf2loN2wYACkDsNaaPHvH07hzTBv8N90Cgm5j" crossorigin="anonymous">
</head>


<style>
.container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #e9ecef;
    border-radius: 10px;
    background-color: #f8f9fa;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 100px
}

/* Headings */
h1 {
    font-size: 2rem;
    font-weight: bold;
    color: #202fcf; /* Green success color */
    margin-bottom: 20px;
}

/* Paragraph Styling */
p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 15px;
}

/* Warning Text */
.text-warning {
    font-weight: bold;
    color: #242013; /* Dark yellow */
}

/* Margin Top */
.mt-3 {
    margin-top: 1rem;
}

/* Center Text */
.text-center {
    text-align: center;
}

/* Add a Light Glow to the Container */
.container:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease-in-out;
}

</style>
<body>
<div class="container text-center mt-5">
    <h1 class="text-success">Merci pour la confirmation de votre e-mail!</h1>
    <p class="text-warning">
        Votre compte est en attente d'approbation par l'administrateur. 
        Une fois approuvé, vous recevrez une notification.
    </p>
    <p class="mt-3">Veuillez patienter pendant le traitement de votre demande.</p>
</div> 


</body>
</html>

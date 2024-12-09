<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>
        var csrf_token="{{ echo csrf_token()}}"
    </script>
    <title>My App</title>
</head>
<body>
    <div id="root"></div>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
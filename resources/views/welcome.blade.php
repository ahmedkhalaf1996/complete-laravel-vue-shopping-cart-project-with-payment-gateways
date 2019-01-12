<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<meta name="csrf-token" content="{{ csrf_token() }}">
<script>window.laravel ={ csrfToken: '{{ csrf_token() }}'}</script>         <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
<script src="https://www.paypalobjects.com/api/checkout.js"></script>
</head>
<body>

<div id="app">
</div>

@yield('scripts')

    <script src="{{ asset('js/app.js') }}"></script>

</body>
</html>
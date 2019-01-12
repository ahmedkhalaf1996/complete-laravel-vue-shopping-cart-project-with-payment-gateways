<?php

/*
* paypal Config and Settings
*/

return [
   // sendcox
	'sandbox_client_id' => env('PAYPAL_SANDBOX_CLIENT_ID'),
	'sandbox_secret'    => env('PAYPAL_SANDBOX_SECRET'),
	// LIVE 

    'live_client_id' => env('PAYPAL_LIVE_CLIENT_ID'),
    'live_secret'    => env('PAYPAL_LIVE_SECRET'),
    // paypal SDK Congigrations

    'settings'  => [
       // Mode (live or sandcox)
       'mode' => env('PAYPAL_MODE', 'sandbox'),
       // Connection timeout
       'http.ConnectonTimeOut' => 3000,
       // logs
       'log.LongEnabled' => true,
       'log.FileName' => storage_path() .'/logs/paypal.log',
       // level: DEBUG , INFO ,WARN ,ERROR
       'log.LogLevel' => 'DEBUG'
    ]

];







<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



Route::middleware('auth:api')->group(function () {

Route::get('/isAdmin', 'AuthController@isAdmin');


Route::post('/logout','AuthController@logout');

Route::post('/AddProduct', 'ProductController@addnew');

Route::post('/AddNewUser', 'AuthController@AddNewUser');

Route::get('/product', 'ProductController@index');

Route::get('/AllUsers', 'AuthController@index');

Route::put('/EditUsers/{id}','AuthController@EditUsers');

Route::delete('/DeleteUser/{id}','AuthController@DeleteUser');

Route::get('/GetCartItems/{id}', 'ProductController@GetCartItems');


Route::put('/EditProduct/{id}','ProductController@EditProduct');


Route::delete('/DeleteProduct/{id}','ProductController@DeleteProduct');













});


// Route::middleware('auth:api')->get('/isAdmin', 'AuthController@isAdmin');
// Route::middleware('auth:api')->post('/logout','AuthController@logout');

// Route::get('/isAdmin', [
// 	'uses' =>  'AuthController@isAdmin'
// ]);

Route::post('/Pay', 'PaymentController@PayWithPaypal')->name('Pay');

Route::get('status', 'PaymentController@status')->name('status');

Route::get('canceled', 'PaymentController@canceled')->name('canceled');


Route::post('/login', [
	'uses' =>  'AuthController@login'
]);

Route::post('/register',[ 
	'uses' => 'AuthController@register'
]);





<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PayPal\Rest\ApiContext;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;
use PayPal\Api\PaymentExecution;


class PaymentController extends Controller
{
   private $apiContext;
   private $secret;
   private $clientId;

   public function __construct(){
    if (config('paypal.settings.mode') == 'live') {
    	$this->clientId = config('paypal_live_client_id');
    	$this->secret   = config('paypal_live_secret');
    } else {
    	$this->clientId = config('paypal.sandbox_client_id');
    	$this->secret   = config('paypal.sandbox_secret');    	
    }
    
   $this->apiContext = new ApiContext(new OAuthTokenCredential($this->clientId,$this->secret)); 
  
  $this->apiContext->setConfig(config('paypal.settings'));    
  
  }

   public function PayWithPaypal (Request $request){
      // $price = $request->input('price');
      // $name  = $request->input('name');
      
      $price = 300;
      $name  = 'i phone';  
    // set payer          
      $payer = new Payer();
      $payer->setPaymentMethod("paypal");

    // items
      $item = new Item();
      $item->setName($name)
          ->setCurrency('USD')
          ->setQuantity(1)
          ->setDescription("item description laravel")          
          ->setPrice($price);
    // all items
      $itemList = new ItemList();
      $itemList->setItems(array($item));

    //amount total price
      $amount = new Amount();
      $amount->setCurrency("USD")
          ->setTotal($price);
     
     // Transaction
      $transaction = new Transaction();
      $transaction->setAmount($amount)
          ->setItemList($itemList)
          ->setDescription("Payment description laravel pay test");
  // 
      $redirectUrls = new RedirectUrls();
      $redirectUrls->setReturnUrl("http://laravel-paypal-payment-gw/status")
          ->setCancelUrl("http://laravel-paypal-payment-gw/canceled");

      $payment = new Payment();
      $payment->setIntent("sale")
          ->setPayer($payer)
          ->setRedirectUrls($redirectUrls)
          ->setTransactions(array($transaction));
    
    try{
      $payment->create($this->apiContext);
    } catch(\PayPal\Exception\PPConnectionException $ex){
      die($ex);
    }
    
    $paymentLink = $payment->getApprovalLink();

    return redirect($paymentLink);

   }

  public function status(Request $request){
   
     if (empty($request->input('PayerID') || empty($request->input('token')))) {
         die('Payment Failed');
     }
        $apiContext = $this->apiContext;
 
     $paymentId = $request->get('paymentId');
    $payment = Payment::get($paymentId,  $apiContext );
     $execution = new PaymentExecution();
     $execution->setPayerId($request->input('PayerID'));
    $result = $payment->execute($execution , $apiContext);

     if ($result->getState() == 'approved') {
       die('Thank you get your mony bitch!!');
     }
    
    echo "Payment Failed again";
    die($result);
  }

  public function canceled(){
    return "payment canceled , no worries";
  }


}

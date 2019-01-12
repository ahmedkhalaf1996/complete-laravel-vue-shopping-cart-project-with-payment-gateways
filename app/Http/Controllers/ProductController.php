<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use Auth;

class ProductController extends Controller
{
       public function index()

    {
        //

        $products = Product::all();
    	$response = [
           'products' => $products
    	];
    	return response()->json($response, 200);
    }



   public function addnew(Request $request)
	  {
            $this->validate($request,[
              
           'imagePath' => 'required',
           'title' => 'required',
           'description' => 'required',
           'price' => 'required',           
            ]);

        $input = $request->all();
       //  convert 64 data to img start
        $exploded = explode(',', $request->imagePath);
        $decoded = base64_decode($exploded[1]);
        if (str_contains($exploded[0], 'jpeg')) {
          $extension = 'jpeg';
        } else {
          $extension = 'png';
        }

        $fileName = str_random().'.'.$extension;
        $path = public_path().'/productimages/'.$fileName;
        file_put_contents($path, $decoded);  
        // convert end

		  	$product = new Product([
		          'imagePath' => $fileName,
		          'title' => $request->input('title'),
		          'description' => $request->input('description'),
		          'price' => $request->input('price')
		  	]);
	     
		    $product->save();
            return response()->json(['product' => $product], 201);
        }

     public function   GetCartItems(Request $request, $id){
       
       $product = Product::find($id);
       return response()->json(['product' => $product], 200);

     }



     public function EditProduct(Request $request, $id){
       
       $product = Product::find($id);

      
       if(  file_exists( public_path().'/productimages/'.$request->imagePath ) )
        {
           $product->imagePath =  $request->input('imagePath');
           $product->title = $request->input('title');
           $product->description = $request->input('description');
           $product->price = $request->input('price');
        } 

        else {
        unlink(public_path() .'/productimages/'. $product->imagePath);
        
        $exploded = explode(',', $request->imagePath );
        $decoded = base64_decode($exploded[1]);
        if (str_contains($exploded[0], 'jpeg')) {
          $extension = 'jpeg';
        } else {
          $extension = 'png';
        }

        $fileName = str_random().'.'.$extension;
        $path = public_path().'/productimages/'.$fileName;
        file_put_contents($path, $decoded); 
       
          $product->imagePath =  $fileName;   
          $product->title = $request->input('title');
          $product->description = $request->input('description');
          $product->price = $request->input('price');             
        }

       $product->save();
       return response()->json(['product' => $product], 200);

     }
     


     public function DeleteProduct($id){

      $product = Product::find($id);
      unlink(public_path() .'/productimages/'. $product->imagePath);
      $product->delete();
      return response()->json(['message' => 'product deleted', 200]);
     
     }


}

<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Auth;


class AuthController extends Controller
{


   public function index()

{

    $users = User::all();

    $response = [
       'users' => $users
       ];
    return response()->json($response, 200);
}


public function login(Request $request)
{
 // 'http://laravel-vue-shipingcart-paymentgw/oauth/token'
 //2
 //'JjXJVbuAYxeyCAlUjuuOZJWCsuh1kJrLZtZpZjRv'
      $this->validate($request,[
           'username' => 'required|email',
           'password' => 'required'
      ]);

     $http = new \GuzzleHttp\Client();

      try {
         $response = $http->post(config('services.passport.login_endpoint'),[ 
           'form_params' => [
              'grant_type' => 'password',
              'client_id' => config('services.passport.client_id'),
              'client_secret' => config('services.passport.client_secret'),
               'username' => $request->username,
               'password' => $request->password,
           ]
        ]);
         return $response->getBody();

      } catch(\GuzzleHttp\Exception\BadResponseException $e){
      	if ($e->getCode() == 422) {

      	  return response()->json('Invalid Request, plese enter a username', $e->getCode());
      	}
      	else if ($e->getCode() == 401) {
      		
      		return response()->json('Invalid username Or password.try again', $e->getCode());
      	}

      	return response()->json('Something want wrrong ont the server,', $e->getCode());
      }

 }




   public function register(Request $request)
	  {
	  	$this->validate($request,[
	         'name' => 'required',
	         'email' => 'required|email|unique:users',
	         'password' => 'required'
	  	]);

	  	$user = new User([
	          'name' => $request->input('name'),
	          'email' => $request->input('email'),
	          'password' => bcrypt($request->input('password'))
	  	]);
	     
	    $user->save();

        Auth::login($user);

	    return response()->json([
	       'message' => 'Successfully created user!'
	    ], 201); 

	  }



    public function logout()
    {
    	auth()->user()->tokens->each(function ($token, $key){
    		$token->delete();
    	});

    	return response()->json('logged out Successfully', 200);
    }


    public function isAdmin(Request $request){

     $id = $request->user()->id;
     
     $user = User::find($id);

     $role = $user->role_id;
     if ($role == 1) {
      return response()->json(["role" => true], 200);
     }
     else{
      return response()->json(["role" => null], 200);
     }
    }

// function EditUsers start
     public function EditUsers(Request $request, $id){
       
       $user = User::find($id);

      
       if(file_exists( public_path().'/productimages/'.$request->imagePath) AND $user->imagePath !== null)
        {
          $user->imagePath =  $request->input('imagePath');
           $user->name = $request->input('name');
            $user->role_id = $request->input('role_id');          
            $user->email = $request->input('email');
            $user->password = bcrypt($request->input('password'));
        

        } 


        else if(file_exists( public_path().'/productimages/'.$request->imagePath) AND $user->imagePath == null)
        {

           $user->imagePath =  null; 
           $user->name = $request->input('name');
           $user->role_id = $request->input('role_id');          
           $user->email = $request->input('email');
           $user->password = bcrypt($request->input('password'));          
 
        } else if(!file_exists( public_path().'/productimages/'.$request->imagePath) AND $user->imagePath == null) {

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
       
           $user->imagePath =  $fileName; 
           $user->name = $request->input('name');
           $user->role_id = $request->input('role_id');          
           $user->email = $request->input('email');
           $user->password = bcrypt($request->input('password'));       
        }
        else  {
        unlink(public_path() .'/productimages/'. $user->imagePath);
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
       
           $user->imagePath =  $fileName; 
           $user->name = $request->input('name');
           $user->role_id = $request->input('role_id');          
           $user->email = $request->input('email');
           $user->password = bcrypt($request->input('password'));

        }

       $user->save();
       return response()->json(['user' => $user], 200);

     }
  //function EditUsers end


   public function AddNewUser(Request $request)
    {
            $this->validate($request,[
           'name' => 'required',
           'email' => 'required|email|unique:users',
           'password' => 'required'
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

        $user = new User([

           'imagePath' =>  $fileName, 
           'name' => $request->input('name'),
           'role_id' => $request->input('role_id'),          
           'email' => $request->input('email'),
           'password' => bcrypt($request->input('password'))
        ]);
       
        $user->save();
            return response()->json(['user' => $user], 201);
        }


     public function DeleteUser($id){

      $user = User::find($id);
      if ($user->imagePath !== null) {
      unlink(public_path() .'/productimages/'. $user->imagePath);
      }
      $user->delete();
      return response()->json(['message' => 'user deleted', 200]);
     
     }







}

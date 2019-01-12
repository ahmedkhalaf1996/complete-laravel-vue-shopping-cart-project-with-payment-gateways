<template>
<div class="row justify-content-md-center">
	<div class="col-lg-4 text-center">
		<br>
		<h3 style="font-family: fantasy;">Sign up Regester new account</h3>
           <div v-if="ServerErrors" class="alert-danger" >
			<span class="alert-danger"  v-for="errors in ServerErrors">
			{{ errors  }}</br> 
			</span>	
           </div>	 
		 <form @submit.prevent="register">
			<div class="form-group">
				<label for="email">E-Mail</label>
				<input 
				 type="text"
				 v-validate="'required|email'"
				 placeholder="email" 
				 id="email"
				 name="email"
				 class="form-control"
                 v-model="email"
                 :class="{ 'input-error' : errors.has('email') }"
				 > 
            <span class="alert-danger dang" >{{ errors.first('email') }}</span>    
			</div>
			<div class="form-group">
				<label for="name">Name</label>
				<input 
				type="text"
				v-validate="'required'"				 
				placeholder="name" 
				id="name" 
				name="name" 
				class="form-control"
                 v-model="name"
                :class="{ 'input-error' : errors.has('name') }"                               
				>
            <span class="alert-danger dang">{{ errors.first('name') }}</span>    
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input 
				type="password"
				v-validate="'required|min:6'"				  
				placeholder="password" 
				id="password" 
				name="password" 
				class="form-control"
                v-model="password"
                :class="{ 'input-error' : errors.has('password') }"                               
				>	
            <span class="alert-danger dang">{{ errors.first('password') }}</span>    				
            </div>			
			<button  class="btn btn-primary">Sign Up</button>
		</form>
	</div>
</div>
</template>


<script>

	export default {
		data(){
		 return {
			email: '',
			name: '',
			password: '',
 			ServerErrors: []
		 }
		},
		methods: {

	    register()
	    {
	    	this.$store.dispatch('register',{
	    		email: this.email,
	    		name: this.name,	    		
	    		password: this.password,
	    	})
	    	.then(response =>{
	    		this.$router.push({ path: '/Signin' })
	    	})
    	.catch(error =>{
    		if (error.response.data.errors) {
    			console.log(Object.values(error.response.data.errors))
    		this.ServerErrors= Object.values(error.response.data.errors)
    		}
    		else{
    			console.log(Object.values(error.response.data))
    		this.ServerErrors=Object.values(error.response.data) 			    			
    		}
    		this.password = ''
    	})


	    }


		}
	};
</script>
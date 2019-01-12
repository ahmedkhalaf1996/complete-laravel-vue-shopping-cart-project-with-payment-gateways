<template>
<div class="row justify-content-md-center">
	<div class="col-lg-4 text-center">
		<br>
		<h3 style="font-family: fantasy;">Sign In</h3>
           <div v-if="ServerErrors" class="alert-danger" >
			<span class="alert-danger"  v-for="errors in ServerErrors">
			{{ errors[0] }} </br> 
			</span>	
           </div>	 
		<form @submit.prevent="onSubmitted">
			<div class="form-group">
				<label for="email">E-Mail</label>
				<input 
				 v-validate="'required|email'"
				 type="email"
				 placeholder="email" 
				 id="username"
				 name="username"
				 class="form-control"
                 v-model="username"
                 :class="{ 'input-error' : errors.has('username') }"
				 >
            <span class="alert-danger dang" >{{ errors.first('username') }}</span>    
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
                :class="{'input-error' : errors.has('password')}"                      
				>
            <span class="alert-danger dang">{{ errors.first('password') }}</span> 			
            </div>			
			<button  class="btn btn-primary">login</button>
		</form>


	</div>


</div>
</template>


<script>
import axios from 'axios';

export default {

	data(){
		return {
			username: '',
			password: '',
			ServerErrors: []
		}
	},
	methods: {

    onSubmitted()
    {

    	this.$store.dispatch('retreveToken',{
    		username: this.username,
    		password: this.password,
    	})
    	.then(response =>{
            setTimeout(this.$router.push({ path: 'Profile' }), 3000);
    		
    	})
    	.catch(error =>{
    		if (error.response.data.errors) {
    		this.ServerErrors= Object.values(error.response.data.errors)
    		console.log( Object.values(error.response.data.errors))    			
    		}
    		else{
 
    		this.ServerErrors = Array(Array(error.response.data)) 
           console.log(Array(Array(error.response.data)) ) 	 
    		}
    		this.password = ''
    	})




    }

	}


};
</script>
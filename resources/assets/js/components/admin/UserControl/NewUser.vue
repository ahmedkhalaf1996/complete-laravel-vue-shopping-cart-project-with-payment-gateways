<template>
 <div class="row justify-content-md-center">
	<div class="col-lg-4 text-center">

		<br>
		<h3 style="font-family: fantasy;">Add New User</h3>
           <div v-if="ServerErrors" class="alert-danger" >
			<span class="alert-danger"  v-for="errors in ServerErrors">
			{{ errors[0]  }}</br> 
			</span>	
            </div>
		 <form @submit.prevent="AddNewUser" class="col-lg-12">
          <div>
          	    <div class="form-group">
				<label for="name">name</label>
				<input 
				 type="text"
				 v-validate="'required'"
				 placeholder="name" 
				 id="name"
				 name="name"
				 class="form-control"
                 v-model="name"
				 > 
            <span class="alert-danger dang" >{{ errors.first('name') }}</span>    
			</div>
          	    <div class="form-group">
				<label for="email">email</label>
				<input 
				 type="text"
				 v-validate="'required'"
				 placeholder="email" 
				 id="email"
				 email="email"
				 class="form-control"
                 v-model="email"
				 > 
            <span class="alert-danger dang" >{{ errors.first('email') }}</span>    
			</div>

        	    <div class="form-group">
				<label for="password">password</label>
				<input 
				 type="text"
				 v-validate="'required'"
				 placeholder="password" 
				 id="password"
				 password="password"
				 class="form-control"
                 v-model="password"
				 > 
            <span class="alert-danger dang" >{{ errors.first('password') }}</span>    
			</div>

           <div class="form-group">
           	<label for="roleID">role</label>
			<select id="roleID" v-model="role_id" class="form-control vx">
			  <option :value="1">admin</option>
			  <option :value="2">user</option>
			</select>
           </div>
			
			<div class="form-group">
             	<img :src="imagePath" v-model="imagePath" class="img-responsive col-lg-12">
                <input type="file" v-on:change="onFileChange" >
             </div>
			<button  class="btn btn-primary">Add</button>

          </div>





		</form>
	
	</div>
 </div>

</template>


<script>

	export default {
		data(){
		 return {
			name: '',
			email: '',
			password: '',
 			imagePath: '',
 			role_id: 2,
 			ServerErrors: [],
		 }
		},
		methods: {

	    AddNewUser()
	    {
	    	this.$store.dispatch('AddNewUser',{
	    		name: this.name,
	    		email: this.email,	    		
	    		password: this.password,
	    		imagePath: this.imagePath,
	    		role_id: this.role_id,	    		
	    	})
	    	.then(response =>{
	    		console.log(response)
	    		this.$router.push({ path: '/UserControl' })
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
    	})


	    },

        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = (e) => {
                vm.imagePath = e.target.result;
            };
            reader.readAsDataURL(file);
        }

		}
	};
</script>

<style scoped>
</style>
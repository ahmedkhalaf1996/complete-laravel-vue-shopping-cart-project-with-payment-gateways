<template>
 <div class="row justify-content-md-center">
	<div class="col-lg-4 text-center">

		<br>
		<h3 style="font-family: fantasy;">Add New Product</h3>
           <div v-if="ServerErrors" class="alert-danger" >
			<span class="alert-danger"  v-for="errors in ServerErrors">
			{{ errors[0]  }}</br> 
			</span>	
            </div>
		 <form @submit.prevent="AddNewProduct">
          <div>
          	    <div class="form-group">
				<label for="title">Title</label>
				<input 
				 type="text"
				 v-validate="'required'"
				 placeholder="title" 
				 id="title"
				 name="title"
				 class="form-control"
                 v-model="title"
				 > 
            <span class="alert-danger dang" >{{ errors.first('title') }}</span>    
			</div>
			<div class="form-group">
				<label for="description">description</label>
				<textarea 
				type="text"
				v-validate="'required'"				 
				placeholder="description" 
				id="description" 
				name="name" 
				class="form-control"
                 v-model="description"
                :class="{ 'input-error' : errors.has('description') }">
                </textarea>
            <span class="alert-danger dang">{{ errors.first('description') }}</span>    
			</div>
		
		    <div class="form-group"> 
		    	<label for="price" >price</label>
		        <input 
		        type="number" 
		        value="100" 
		        min="0" 
		        step="1" 
		        data-number-to-fixed="2" 
		        data-number-stepfactor="100" 
		        class="form-control currency" 
		        id="price"
		        name="price" 
                v-model="price"
       
		         />
		    </div>


			<div class="form-group">
             	<img :src="imagePath" class="img-responsive col-lg-12">
                <input type="file" v-on:change="onFileChange" >
             </div>
			<button type="submit"  class="btn btn-primary">Add</button>

          </div>
		</form>
	
	</div>
 </div>

</template>


<script>

	export default {
		data(){
		 return {
			title: '',
			description: '',
			price: '',
 			imagePath: '',
 			ServerErrors: []
		 }
		},
		methods: {

	    AddNewProduct()
	    {
	    	this.$store.dispatch('AddNewProduct',{
	    		title: this.title,
	    		description: this.description,	    		
	    		price: this.price,
	    		imagePath: this.imagePath,
	    	})
	    	.then(response =>{
	    		this.$router.push({ path: '/Admin' })
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
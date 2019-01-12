<template>
<!-- 	
	{{ qt.imagePath }}
 -->
<div class="col-lg-4" style="float:left">
	<br>

  <div class="card" v-if="qt.title">
    <img class="card-img-top" :src="dPath + image" alt="Card image" style="width:100%;height:400px;">
    <div class="card-body">
      <h4 class="card-title">{{ qt.title }}</h4>
      <p class="card-text">{{ qt.description }}</p>
      <div> 
       <strong class="card-text">Price{{ qt.price }}$</strong>
       </br>
      </div>
      	<div v-if="!editing">
		  <a  @click="onEdit" class="btn btn-primary">Edit</a>
		  <a  @click="onDelete" class="btn btn-danger">Delete</a>
		</div>
    </div>
  </div>

<div class="card" v-if="editing">
  <div class="card-body">
		 <div>
			<input class="form-control vx" type="text" v-model="editValue" >
			<input class="form-control vx" type="text" v-model="editdesc" >
			<input class="form-control vx" type="text" v-model="editprice" >

            <img  :src="dPath + image" 
             class="img-responsive"
             v-model="image"
             width="200px;">
            <input type="file" v-on:change="onFileChange"  class="form-control">
			
			<a  @click="onUpdate" class="btn btn-primary vx">Save</a>
			<a  @click="onCancel" class="btn btn-danger vx">Cancel</a>
		</div>
	</div>
</div>


</div>

</template>


<script>

	export default {
		props: ['qt'],
		data(){
			return {
				editing: false,

				editValue:this.qt.title,
				editdesc:this.qt.description,
				editprice:this.qt.price,
				image:this.qt.imagePath,
				path: 'productimages/'+this.qt.imagePath,
				dPath:'productimages/', 
			
			}
		},
		methods: {
			onEdit(){
				this.editing = true;
				this.editValue = this.qt.title;
				this.editdesc = this.qt.description;
				this.editprice = this.qt.price;
				this.image = this.qt.imagePath;

			},
			onCancel(){
				this.editing = false
			},
			onDelete() {
                this.qt.title = false
		    	
		    	this.$store.dispatch('DeleteProduct',{
		    		id:this.qt.id
		    	})
		    	.then(response =>{
		    		console.log(response)
		    	})
	    	.catch(error =>{
                   console.log(error)
	    	    })
			},
			onUpdate() {
				 this.editing  = false;
				this.qt.title = this.editValue;
				this.qt.description = this.editdesc;
				this.qt.price = this.editprice;
				this.qt.imagePath = this.image;

		    	this.$store.dispatch('EditProduct',{
		    		title: this.editValue,
		    		description: this.editdesc,	    		
		    		price: this.editprice,
		    		imagePath: this.image,
		    		id:this.qt.id,
		    	})
		    	.then(response =>{
		    		console.log(response)
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
                this.dPath = ''
            },
            createImage(file) {
                let reader = new FileReader();
                let vm = this;
                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            }

		}












	};
</script>

<style scoped>
	a{
		cursor: pointer;
	}
	.vx{
		margin: 5px auto !important;
	}

	.file-upload-form, .image-preview {
	font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
	padding: 20px;
	}
	img.preview {
	width: 200px;
	background-color: white;
	border: 1px solid #DDD;
	padding: 5px;
	}

</style>




<template>
<!-- 	
	{{ qt.imagePath }}
 -->
<div class="col-lg-12" style="float:left">
	<br>
	<i v-bind="ifimgnull"></i>

  <div class="card" v-if="qt.name">

    <img class="card-img-top" :src="dPath + image" alt="Card image" style="width:200px;height:250px;">
    <div class="card-body">
      <h4 class="card-name form-control">{{ qt.name }}</h4>
      <p class="card-text form-control">{{ qt.email }}</p>
      <div> 
       <strong class="card-text form-control">{{ role }}</strong>
       </br>
      </div>
      	<div v-if="!editing">
		  <a  @click="onEdit" class="btn btn-primary form-control">Edit</a>
		  <a  @click="onDelete" class="btn btn-danger form-control">Delete</a>
		</div>
    </div>
  </div>

<div class="card" v-if="editing">
 <div class="card-body">
	 <div>
		<input class="form-control vx" type="text" v-model="editValue" >
		<input class="form-control vx" type="text" v-model="editemail" >
		<input class="form-control vx" type="password" value="" v-model="editpassword" placeholder="password">
		
		<select v-model="roleID" class="form-control vx">
		  <option :value="1">admin</option>
		  <option :value="2">user</option>
		</select>

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
                role:'',
                roleID: this.qt.role_id,
				editValue:this.qt.name,
				editemail:this.qt.email,
				editpassword:this.qt.password,
				image:this.qt.imagePath,
				path: 'productimages/'+this.qt.imagePath,
				dPath:'productimages/', 
			
			}
		},
		methods: {
			onEdit(){

				this.editing = true;
				this.editValue = this.qt.name;
				this.editemail = this.qt.email;
				this.editpassword = '';
				this.roleID = this.qt.role_id;

				if (this.qt.imagePath == null) {
             	this.image = 'img.png'
                } else{
                this.image = this.qt.imagePath;
                }

			},
			onCancel(){
				this.editing = false
			},
			onDelete() {
                this.qt.name = false
		    	
		    	this.$store.dispatch('DeleteUser',{
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
				this.qt.role_id = this.roleID;
				this.qt.name = this.editValue;
				this.qt.email = this.editemail;
				this.qt.password = this.editpassword;
				this.qt.imagePath = this.image;

		    	this.$store.dispatch('EditUsers',{
		    		name: this.editValue,
		    		 email: this.editemail,	    		
		    		 password: this.editpassword,
		    		 role_id: this.roleID,
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

		},
        computed: {
          ifimgnull(){
             if (this.qt.imagePath == null) {
             	this.image = 'img.png'
             	//return false
             }
             if (this.qt.role_id == 1) {
             	this.role = 'admin'
             }
             if (this.qt.role_id == 2) {
             	this.role = 'user'
             }
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




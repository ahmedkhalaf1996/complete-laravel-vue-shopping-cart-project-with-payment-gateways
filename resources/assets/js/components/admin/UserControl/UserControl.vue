<template>
 <div>

  	
<div class="container">
    <div class="row">
     <button class="btn btn-primary col-md-6" @click="onGetUsers">Get Users</button>
           <router-link 
          tag="button"
          class="btn btn-warning col-md-6"
          to="/NewUser"
         >Add New User
       </router-link>
    </div>

	  <app-user 
	  v-for="user in users" 
	  :qt="user" 
      :key="user.id"
	  >
	  </app-user>

</div>


</div>
</template>

<script>
	import User from './User.vue';
	export default {
       data(){
       	return {
       		users:[],
       	}
       },
       methods: {
       	onGetUsers(){

                this.$store.dispatch('AllUsers')
                .then(response =>{
                 this.users =   this.$store.getters.AllUsers
                 console.log(this.users)
                })
                .catch(error =>{
                    console.log(error)
                    return false           
                })

       	}
       },
       components:{
       	'app-user': User
       }

	};
</script>





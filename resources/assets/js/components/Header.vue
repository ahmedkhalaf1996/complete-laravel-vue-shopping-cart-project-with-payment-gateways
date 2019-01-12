<template>
<nav class="navbar navbar-expand-lg navbar-light   navlev">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <router-link tag="a" class="navbar-brand" to="/">Navbar</router-link>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
    </ul>
    <form class="form-inline my-2 my-lg-0">
       
      <div class="btn-group">
       <router-link tag="a" class="btn" to="/ShopCart" >
          <i class="fa fa-shopping-cart" aria-hidden="true"></i> Shopping Cart
          <span class="badge" >
              <i v-bind="CartNum"></i>
              {{Num}}
          </span>

       </router-link>
	   </div>

     
      <div class="btn-group" v-if="isAdmin">
        <router-link  tag="a" class="btn" to="/Admin">
          <i class="fa fa-cog" aria-hidden="true"></i> Admin
        </router-link>
     </div>

     <div class="btn-group" v-if="isAdmin">
        <router-link  tag="a" class="btn" to="/UserControl">
          <i class="fa fa-users" aria-hidden="true"></i> Users Control
        </router-link>
     </div>

	<div class="btn-group">
	  <button type="button" class="btn  dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	    <i class="fa fa-user" aria-hidden="true"></i> User Mangement
	  </button>
	  <div class="dropdown-menu dropdown-menu-right">

    	 <router-link 
          v-if="!loggedIn" 
          tag="button"
          class="dropdown-item"
          to="/Signin"
         >signin
       </router-link>

       <router-link  
          v-if="!loggedIn"        
          tag="button"
          class="dropdown-item"
          to="/Signup"
         >signup
       </router-link>

       <router-link  
          v-if="loggedIn"        
          tag="button"
          class="dropdown-item"
          to="/Logout"
         >Logout
       </router-link>
	  </div>
	</div>


   </form>

  </div>
</nav>

</template>


<script>

    export default {

      data(){
        return {
          Num:[]
        }
       },
        computed: {
         // we have to chek is admin firist then // chech if logged in 
          isAdmin(){
            return this.$store.getters.isAdmin 
          },
          loggedIn() {
            return this.$store.getters.loggedIn
          },
          CartNum(){
         this.Num = this.$store.getters.CartNum.length
          }         

         
        },
        methods: {
        // CartNum(){
        //  // return    this.Num = this.$store.getters.CartNum 
        //  // console.log(this.Num)
        //  this.Num = this.$store.getters.CartNum
        //  // console.log(this.Num)
        //   }  
         }
    


    };

</script>

<style scoped>
  .badge {
    display: inline-block;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    background-color: #777;
    border-radius: 10px;
}
</style>



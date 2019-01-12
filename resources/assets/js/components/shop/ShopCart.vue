<template>

   <div>
   	   <i v-bind="GetCartItems"></i>
	 
	  <app-checkout
		  v-for="product in products" 
		  :id="product.id" 
		  :quntity="product.quntity"
		  :key="product.id"
	  >
	  </app-checkout>
    
    </br>
    <div class="clear"></div>
    </br>
   <button @click="CheckOut" type="submit" class="btn-primary form-control CheckOut">CheckOut Now</button>
        

<!--         <div v-bind="CheckOut"></div>
 -->      
<br>
<center>
       <div  id="paypal-button-container"></div>
</center>

   </div>
   
</template>

<script>

    	import Checkout from './Checkout.vue';
    export default {
      data(){
        return {
          products:[],

        }
       },
        computed: {
          GetCartItems(){
         this.products = this.$store.getters.CartNum
          },
        },

        methods: {

         CheckOut(){
          const Price = this.$store.getters.TotalPrice
          this.$store.dispatch('CheckOut' ,{
          price:Price
          })
          .then(response =>{
            this.data = response.data
          })
        .catch(error =>{
                   console.log(error)
            })

          }  

          },  
       
       components:{
       	'app-checkout': Checkout
       }
    };
    
</script>

<style scoped>
  #del{
    font-size: 20px;
    margin: 5px auto;
    cursor: pointer;
  }
  #del:hover{
    color: red;
  }
  .clear{
    width: 100%;
    height: 1px;
    clear: both;
  }
  .CheckOut{
        cursor: pointer;
  }

</style>

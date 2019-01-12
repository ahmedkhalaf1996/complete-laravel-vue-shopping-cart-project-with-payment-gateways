<template>
 <div>

  	
<div class="container">
    <div class="row">
     <button class="btn btn-primary col-md-6" @click="onGetQuotes">Get Products</button>
           <router-link 
          tag="button"
          class="btn btn-warning col-md-6"
          to="/NewProduct"
         >Add New Product
       </router-link>
    </div>

	  <app-product 
	  v-for="product in products" 
	  :qt="product" 
    :key="product.id"
	  >
	  </app-product>

</div>


</div>
</template>

<script>
	import Product from './Product.vue';
	export default {
       data(){
       	return {
       		products:[],
       	}
       },
       methods: {
       	onGetQuotes(){

                this.$store.dispatch('ProductData')
                .then(response =>{
                 this.products =   this.$store.getters.ProductData
                 console.log(this.products)
                })
                .catch(error =>{
                    console.log(error)
                    return false           
                })

       	},
       	onquoteDeleted(id){
          // const position = this.quotes.findIndex((element) =>{
          //     return element.id == id;
          // }); 
          // this.quotes.splice(position, 1);
       	console.log('onquoteDeleted')
       	},
        addnew(){
        console.log('addnew')
        }
       },
       components:{
       	'app-product': Product
       }

	};
</script>





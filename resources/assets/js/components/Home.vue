<template>
<div class="container" v-bind="getdata"> 
<div class="col-lg-4" style="float:left"  v-for="qt in products">
	<br>

  <div class="card" v-if="qt.title">
    <img class="card-img-top" :src="dPath + qt.imagePath" alt="Card image" style="width:100%;height:400px;">
    <div class="card-body">
      <h4 class="card-title">{{ qt.title }}</h4>
      <p class="card-text">{{ qt.description }}</p>
      <div> 
       <strong class="card-text">Price{{ qt.price }}$</strong>
       </br>
      </div>
      	<div>
		  <a  @click="AddToCart(qt.id , qt.price)" class="btn btn-primary">Add To Cart</a>
		</div>
    </div>
  </div>


</div>
</div>
</template>

<script>
    
    export default {

    data(){
       	return {
       		products:[],

			//path: 'productimages/'+this.qt.imagePath,
			dPath:'productimages/', 
			
       	}
       },
       computed: {
       	getdata(){
            this.$store.dispatch('ProductData')
            .then(response =>{
             this.products =   this.$store.getters.ProductData
             console.log(this.products)
            })
            .catch(error =>{
                console.log(error)
                return false           
            })
        }
       },
   		methods: {

		AddToCart(id , price){

	      const  productid = id
        const quntity = 1
        const Price = price
	       // console.log(productid)
	    	this.$store.dispatch('AddToCart',{
	    		id:productid,
          quntity:1,
          price:Price,
	    	})
	    	.then(response =>{
	    		console.log(response)
	    	})
    	   .catch(error =>{
          console.log('error')
    	  })

        }

       }



    };
    
</script>
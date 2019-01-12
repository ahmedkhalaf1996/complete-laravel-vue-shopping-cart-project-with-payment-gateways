<template>
  <div>
      <i v-bind="GetCartItems"></i>
      <div class="col-lg-3" style="float:left"  v-for="qt in data">
      <br>
      <div class="card" v-if="qt.title">
      <i v-on:click="TrashedFromCart(qt.id, qt.price)" class="fa fa-times" id="del" aria-hidden="true"></i>
      <hr>
      <img class="card-img-top" :src="dPath + qt.imagePath" alt="Card image" style="width:100%;height:200px;">
      <div class="card-body">
      <h4 class="text-center">quntity X {{quntity}}</h4>
      <hr>
      <h4 class="card-title">{{ qt.title }}</h4>
      <p class="card-text">{{ qt.description }}</p>
      <div> 
      <strong class="card-text">Price{{ qt.price }}$</strong>
      </br>
      </div>
     </div>
    </div>
   </div>

  </div>
</template>



<script>
    
    export default {
          props: ['id','quntity'],
      data(){
        return {
          data:[],
          dPath:'productimages/', 

        }
       },
        computed: {

          GetCartItems(){
		    	this.$store.dispatch('GetCartItems',{
		    		id:this.id,
		    	})
		    	.then(response =>{
		    		this.data = response.data
		    	})
	    	.catch(error =>{
                   console.log(error)
	    	    })
          }         

         
        },
      methods: {

    TrashedFromCart(id, price){

        const  productid = id
        const quntity = 1
        const Price = price

        this.$store.dispatch('TrashedFromCart',{
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









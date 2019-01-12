<template>
	
</template>

<script>
	export default{
		created(){
			this.$store.dispatch('destroytoken')
	    	.then(response =>{
	    		this.$router.push({ path: '/' })
	    	})			
			}
	};
</script>






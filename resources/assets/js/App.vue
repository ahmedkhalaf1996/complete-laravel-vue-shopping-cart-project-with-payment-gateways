<template>
<div>
    
    <app-header></app-header>
      <div class="container" >
         <div  v-bind="UserData">
          <div v-if="AuthData" class="text-center">
            <strong>Welcom 
            {{ AuthData.name }} </strong>
          </div>
         </div>
         
        <transition name="slide" mode="out-in">
           <router-view></router-view>
        </transition>

     </div>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  export default {
        data(){
          return {
            AuthData: null

            }
        },

      components: {
        appHeader: Header
      },

        computed: {

          UserData(){
                this.$store.dispatch('UserData')
                .then(response =>{
                   //  this.AuthData = response.data
              this.AuthData =   this.$store.getters.UserData

              //   console.log(this.AuthData)
                 return true
                  //   console.log(this.$store.getters.UserData)
                })
                .catch(error =>{
                    this.AuthData =   ' '
                    console.log(error)
                    return false           
                })
          }
      
        }

  };

</script>

<style>

.input-error{
  border:solid red  1px;
}
.dang{
  margin: 5px auto;
}

.slide-enter-active{
  animation:slide-in 200ms ease-out forwards;
}

.slide-leave-active {
  animation: slide-out 200ms ease-out forwards;
}

@keyframes slide-in {
  form {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-30px);
    opacity: 0;
  }
}


</style>

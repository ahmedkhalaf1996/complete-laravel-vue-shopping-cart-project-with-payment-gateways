import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = 'http://laravel-vue-shipingcart-paymentgw/api'

const state = {
   token:localStorage.getItem('access_token') || null,
   admin:localStorage.getItem('isAdmin') || null,
   UserData:null,
   ProductData:null,
   AllUsers:null,
   CartStore: JSON.parse(localStorage.getItem('CartStore')) || [],
   TotalPrice: localStorage.getItem('TotalPrice') || 0,
};




const getters = {
   TotalPrice(state){
        return  state.TotalPrice              
   },
   CartNum(state){
        return  state.CartStore              
   },
   loggedIn(state){
   return state.token !== null
   },
   isAdmin(state){
      return state.admin !== null               
   },
   UserData(state){
      return state.UserData               
   },

   ProductData(state){
      return state.ProductData               
   },
   AllUsers(state){
      return state.AllUsers               
   },


};

const mutations = {

   retreveToken(state, token){
   	state.token = token
   },

   AddToCart(state, data){
    const itemsprice = state.TotalPrice
    const TotalPrice = state.TotalPrice
    const NewArray = state.CartStore
    const item = data
    const Id = data.id
    const quntity = data.quntity
    const Price = data.price 

    const  lastPrice = Number(Price) * Number(quntity) + Number(itemsprice)
    state.TotalPrice = lastPrice
    localStorage.setItem("TotalPrice", lastPrice) 

    const record = NewArray.find(value => value.id === Id)
    if (record) {
    record.quntity++
    state.CartStore = NewArray
    localStorage.setItem("CartStore", JSON.stringify(NewArray))
    }
    else if(!record) {
    NewArray.push(item)
    state.CartStore = NewArray
    localStorage.setItem("CartStore", JSON.stringify(NewArray))      
    }
     


   },

   TrashedFromCart(state, data){
    const itemsprice = state.TotalPrice
    const Price = data.price     
    const NewArray = state.CartStore
    const item = data
    const Id = data.id
    const record = NewArray.find(value => value.id === Id)
    const quntity = record.quntity

    const  lastPrice = Number(itemsprice) -  Number(Price)  
    state.TotalPrice = lastPrice
    localStorage.setItem("TotalPrice", lastPrice) 


    if (quntity > 1) {
    record.quntity-=1
    state.CartStore = NewArray
    localStorage.setItem("CartStore", JSON.stringify(NewArray))
    }
    else if(quntity == 1) {
    NewArray.splice(record, 1)
    state.CartStore = NewArray
    localStorage.setItem("CartStore", JSON.stringify(NewArray))      
    }
   },
   isAdmin(state, isAdmin){
    state.admin = isAdmin
   },
    UserData(state, UserData){
    state.UserData = UserData
   },  
    ProductData(state, ProductData){
    state.ProductData = ProductData
   }, 
    AllUsers(state, AllUsers){
    state.AllUsers = AllUsers
   },        


   destroytoken(state) {
   	state.token = null,
    state.admin = null,
    state.UserData = null,
    state.ProductData = null

   }

};

const actions = {
    CheckOut(state, data)
    {


      var  price =  data.price
     
// start/////////////////////////////////////////////////// => 
      paypal.Button.render({


        env: 'sandbox', // sandbox | production

        style: {
            label: 'buynow',
            fundingicons: true, // optional
            branding: true, // optional
            size:  'responsive', // small | medium | large | responsive
            shape: 'pill',   // pill | rect
            color: 'silver'   // gold | blue | silver | black
        },

        client: {
            sandbox:    'ATwBhZGCs2k60iCBpJyyoEMX06G98zMTsV6ZyzpFZOePOYkcYsxaXs2GSY_cxY3TlaOQM6GuHvK6b3nN',
            production: 'EF4YeHgsD9vYyFoynuYIX3jXNNkbe73d4YIzVryPEWQYtTip8zZZVJfXNfo4s0XTS3mhyA4e7BlsdULa'
        },

        commit: true,

        payment: function(data, actions) {
   //   var  price = Number(state.TotalPrice);
            return actions.payment.create({
                transactions: [
                    {
                        amount: { total:price , currency: 'USD' }
                    }
                ]
            });
        },
        onAuthorize: function(data, actions) {
            return actions.payment.execute().then(function() {
                window.alert('Payment Complete!');
            });
        }

    }, '#paypal-button-container');


// end ////////////////////////////////////// <=
    },
    AddToCart(context, data)
    {
   // localStorage.removeItem('CartStore')
   // localStorage.removeItem('TotalPrice')
       
       const id = data
       context.commit('AddToCart',{
        id: data.id,
        price: data.price,
        quntity: data.quntity,
      }  
      )


    },
    TrashedFromCart(context, data)
    {
       const id = data
       context.commit('TrashedFromCart', {
        id: data.id,
        price: data.price,
        quntity: data.quntity,
      }
     )
    },
    GetCartItems(context, data)
    {
     axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
     return new Promise((resolve, reject) =>{ 
      axios.get('/GetCartItems/' + data.id)
   .then((response) => { 
    resolve(response)
      })
     .catch(error =>{
      reject(error)
      })
   
     })
    },

        retreveToken (context, credentials)
    {
     
     return new Promise((resolve, reject) =>{ 
      axios.post('/login',{
        username: credentials.username,
        password: credentials.password,
      })
   .then((response) => { 
    const token = response.data.access_token
   

    localStorage.setItem('access_token', token)
    context.commit('retreveToken', token)

//  check is admin function 
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
    axios.get('/isAdmin')
   .then((response) => { 
    const isAdmin = response.data.role
    localStorage.setItem('isAdmin', isAdmin)
    context.commit('isAdmin', isAdmin)    
//  end of check function
         resolve(response)   
      })
      
    resolve(response)   
      })
     .catch(error =>{
       reject(error)
      })
     })

   },

        ProductData (context, ProductData)
    {
     if (context.getters.loggedIn) {
     
     return new Promise((resolve, reject) =>{ 
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/product')
      .then((response) => { 
      context.commit('ProductData', response.data.products)    
         resolve(response)   
      })

      })
     .catch(error =>{
       reject(error)
      })
     }
     },


        AllUsers (context, AllUsers)
    {
     if (context.getters.loggedIn) {
     
     return new Promise((resolve, reject) =>{ 
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/AllUsers')
      .then((response) => { 
      context.commit('AllUsers', response.data.users)    
         resolve(response)   
      })

      })
     .catch(error =>{
       reject(error)
      })
     }
     },



        UserData (context, UserData)
    {
     if (context.getters.loggedIn) {
     
     return new Promise((resolve, reject) =>{ 

//  check is admin function 
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
    axios.get('/user')
   .then((response) => { 
    context.commit('UserData', response.data)    
//  end of check function
         resolve(response)   
      })

      })
     .catch(error =>{
       reject(error)
      })
     }
     },

    register(context, data)
    {
     return new Promise((resolve, reject) =>{ 
      axios.post('/register',{
      	name: data.name,
      	email: data.email,
      	password: data.password,
      })
	 .then((response) => { 
	 	resolve(response)
      })
     .catch(error =>{
     	reject(error)
      })
   
     })
    },

    AddNewProduct(context, data)
    {
     return new Promise((resolve, reject) =>{ 
      axios.post('/AddProduct',{
        title: data.title,
        description: data.description,
        price: data.price,
        imagePath: data.imagePath,
      })
   .then((response) => { 
    resolve(response)
      })
     .catch(error =>{
      reject(error)
      })
   
     })
    },

    EditProduct(context, data)
    {
   axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

     return new Promise((resolve, reject) =>{ 
      axios.put('/EditProduct/' + data.id ,{
        title: data.title,
        description: data.description,
        price: data.price,
        imagePath: data.imagePath,
      })
   .then((response) => { 
    resolve(response)
      })
     .catch(error =>{
      reject(error)
      })
   
     })
    },


    EditUsers(context, data)
    {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
     return new Promise((resolve, reject) =>{ 
      axios.put('/EditUsers/' + data.id ,{
         name: data.name,
         email: data.email,
         password: data.password,
         role_id: data.role_id,
         imagePath: data.imagePath,
      })
   .then((response) => { 
    resolve(response)
      })
     .catch(error =>{
      reject(error)
      })
   
     })
    },

    AddNewUser(context, data)
    {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
     return new Promise((resolve, reject) =>{ 
      axios.post('/AddNewUser',{
        name: data.name,
        email: data.email,
        password: data.password,
        imagePath: data.imagePath,
        role_id: data.role_id,
      })
   .then((response) => { 
    resolve(response)
      })
     .catch(error =>{
      reject(error)
      })
   
     })
    },
        DeleteProduct(context, data)
    {
   axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
     return new Promise((resolve, reject) =>{ 
      axios.delete('/DeleteProduct/' + data.id )
   .then((response) => { 
    resolve(response)
      })
     .catch(error =>{
      reject(error)
      })
   
     })
    },


        DeleteUser(context, data)
    {
   axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
     return new Promise((resolve, reject) =>{ 
      axios.delete('/DeleteUser/' + data.id )
   .then((response) => { 
    resolve(response)
      })
     .catch(error =>{
      reject(error)
      })
   
     })
    },

    destroytoken (context)
    {
//    state.token = null
     
     axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

     if (context.getters.loggedIn) {
     return new Promise((resolve, reject) =>{ 
      axios.post('/logout')
	 .then((response) => { 

    localStorage.removeItem('access_token')
    localStorage.removeItem('isAdmin')
	 	context.commit('destroytoken')
	 	resolve(response)
      })
     .catch(error =>{

    localStorage.removeItem('access_token')
    localStorage.removeItem('isAdmin')
	 	context.commit('destroytoken')
	 	reject(error)
      })
   
     })
    }
   }  




}


export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});





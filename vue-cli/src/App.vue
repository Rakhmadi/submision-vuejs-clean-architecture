<template>  
      <div class="flex justify-center sm-auto overflow-auto " id="app">
        <div class="shadow-lg rounded-md w-2/3 m-12">
          <div class="m-3">
            <div class="flex justify-center items-center">
                <h2 class="text-gray-500 text-2xl">Search Subtitle Youtube</h2>
            </div>
            <div class="flex flex-col m-2">
              <search-form v-model="keyword" />
              <div class="m-1">
                <app-button text="Clear" @click="clear"></app-button>
              </div>
              <router-view></router-view>
            </div> 
          </div>
        </div>
      </div>
</template>
<script>
import searchForm from './components/searchForm.vue'
import appButton from './components/appButton.vue'

export default {
  components:{
    'searchForm': searchForm,
    'appButton': appButton
  },
  data(){
    return{
      keyword:''
    }
  }
}
</script>
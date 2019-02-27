<template>
  <div id="SearchBox">
    <div class="SearchForm">
      <h1>Book Search</h1>
      <form @submit.prevent="search">
        <div class="form-group">
          <input type="text" 
                 v-model="form.search" 
                 class="form-control" 
                 id="SearchInput">
        </div>
        <button type="submit" class="btn btn-primary" :disabled="isDisabled">Search</button>
      </form>
    </div>
    <div class="container">
      <div class="row" v-if="isApiCall">
        <SearchResults v-for="item in items" :item="item"/> 
      </div>
    </div>      
  </div>
</template>

<script>
import SearchResults from './SearchResults.vue'
export default {

  data(){
    return{
      form:{
        search:''
      },

      items: '',

      isApiCall: false,

      isLoading: false
    }
  },

  methods:{
    search(){
      this.$axios.get(`/volumes?q=`+this.form.search)
      .then((response) => {
        this.isApiCall = true;
        this.items = response.data.items
        console.log(response.data.items)
      }).catch(e => {
        console.log(e)
      })
    }
  },
  computed:{
    isDisabled() {
      return this.form.search.length > 0 ? false : true;
    }
  },
  //Import child component
  components: {
    SearchResults
  }
}
</script>

<style>
#SearchBox{
  
}
.SearchForm{
  text-align:center;
  width:50%;
  margin: 0 auto;
  display: block;
}

</style>

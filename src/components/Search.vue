<template>
  <div id="SearchBox">
    <div class="SearchForm">
      <h1>BOOKTHOPIA</h1>
      <h6>A name inspired by my girlfriend.</h6>
      <form @submit.prevent="search()">
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
      <div class="row" v-else>
        <span class="spinner" v-if="isLoading">
          <img src="../assets/spinner.gif"  />
        </span>
        <span class="iniMessage" v-if="!isLoading">
          Nothing Here Yet - Try Searching For A Book!
        </span>
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
      this.isLoading = true;
      this.$axios.get(`/volumes?q=`+this.form.search)
      .then((response) => {
        this.isApiCall = true;
        this.isLoading = false;
        this.items = response.data.items
        console.log(response.data.items)
      }).catch(e => {
        console.log(e)
      })
    }
  },
  //disable search button
  computed:{
    isDisabled() {
      if(this.form.search.length > 0) {
        return false;
      } else if (this.isLoading) {
        return false;
      }
      return true;
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

.spinner,.iniMessage{
  text-align:center;
  margin: 50px auto;
}

</style>

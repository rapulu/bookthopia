<template>
    <div>
      <div class="row">
        <div class="col text-center">
          <span class="headerTitle"><h1>BOOKTHOPIA</h1></span>
          <form @submit.prevent="search()" autocomplete="off">
            <div class="form-group">
              <input type="text" 
                     v-model="form.search" 
                     class="form-control" 
                     id="SearchInput">
            </div>
            <button type="submit" 
                    class="btn btn-danger" 
                    :disabled="isDisabled">
                      Search
                    </button>
          </form>
        </div>
      </div>
      <div class="row" v-if="isApiCall">
        <SearchResults v-for="item in items" 
                        :item="item"
                        v-if="totalItems > 0"/>
        <span class="iniMessage" v-if="totalItems == 0">
          <h4>No Book Found.</h4>
          Try searching for another book.
        </span>                 
      </div>
      <div class="row" v-if="!isApiCall">
        <span class="spinner" v-if="isLoading">
          <img src="../assets/spinner.gif"  />
        </span>
        <span class="iniMessage" v-if="!isLoading">
          Nothing Here Yet - Try Searching For A Book!
        </span>
      </div>
      <div class="row" v-if="error">
        <span class="iniMessage" v-if="!isLoading">
          Something terribly went wrong
        </span>
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

      items: [],

      totalItems: 0,

      isApiCall: false,

      isLoading: false,

      error: false
    }
  },

  methods:{
    search(){
      this.isLoading = true;
      this.$axios.get(`/volumes?q=`+this.form.search)
      .then((response) => {
        this.isApiCall = true;
        this.isLoading = false;
        this.items = response.data.items;
        this.totalItems = response.data.totalItems;
        console.log(response.data.items)
      }).catch(e => {
        this.isApiCall = true;
        this.error = true;
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
form{
  width: 50%;
  margin: 0 auto;
}
.headerTitle{
  color:#6b67cc;
}

textarea:focus, 
textarea.form-control:focus, 
input.form-control:focus, 
input[type=text]:focus, 
input[type=password]:focus, 
input[type=email]:focus, 
input[type=number]:focus, 
[type=text].form-control:focus, 
[type=password].form-control:focus, 
[type=email].form-control:focus, 
[type=tel].form-control:focus, 
[contenteditable].form-control:focus {
  box-shadow: inset 0 -1px 0 #ddd;
}  

.spinner,.iniMessage{
  text-align:center;
  margin: 50px auto !IMPORTANT;
}

</style>

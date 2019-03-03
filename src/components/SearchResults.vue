<template>
  <div class="col-md-6 col-lg-6 col-sm-12" id="BookDisplay">
    <div class="media">
      <img class="media-left" v-bind:src="image.thumbnail" v-if="image">
      <div class="media-body">
        <div class="card-title">{{ title }}</div>
        <div class="card-text book-author">
          By: <span v-for="author in authors">{{ author }} </span>
        </div>
        <div class="card-text book-publisher">Published By: {{ publisher }}</div>
        <button type="button" :href="link" class="btn btn-link" target="_blank">
          More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],

  computed:{
    image() {
      return this.item.volumeInfo.imageLinks
    },

    title() {
      return this.item.volumeInfo.title
    },

    authors() {
      return this.item.volumeInfo.authors
    },

    publisher() {
      return this.item.volumeInfo.publisher
    },

    link() {
      return this.item.volumeInfo.previewLink
    }
  }
}
</script>

<style>
.media {
  background-color:#ffffff !important;
  border-radius: 4px;
  max-width: 100%;
  max-height: 100%;
  margin-top:50px;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  height: 200px;
}
.card-text,.card-title {
    word-wrap: break-word;
}

.card-title{
  font-size: 18px;
  font-weight: bold;
  color: #f3626a;
  line-height: .9 !important;
}

img{
  height:190px !important;
}

.book-author{
  line-height: 15px;
  font-size: 13px;
  color: #7a88b4;

}

.book-publisher{
  margin-top: 50px;
  font-size: 12px;
  align-self: flex-end;
  color: #b4bed6;
  padding-right: 20px;
}

.media-body{
  padding-left: 20px;
  padding-bottom: 30px;
  flex-wrap: wrap !important; 
  height: 200px !important;
}

.btn-link{
  padding-left: 0px !important;
  text-decoration: none !important;
  color: #6b67cc !important;
}
</style>

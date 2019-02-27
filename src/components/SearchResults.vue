<template>
  <div class="col-md-6" id="BookDisplay">
    <div class="media">
      <img class="media-left" v-bind:src="image.thumbnail" v-if="image">
      <div class="media-body">
        <div class="card-title">{{ title }}</div>
        <div class="card-text">
          By: <span v-for="author in authors">{{ author }} </span>
        </div>
        <div class="card-text">Published By: {{ publisher }}</div>
        <a :href="link" class="btn btn-primary" target="_blank">More</a>
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
}
.card-text,.card-title {
    word-wrap: break-word;
}
</style>

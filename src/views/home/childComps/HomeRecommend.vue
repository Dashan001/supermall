<template>
  <div class="recommends">
    <div v-for="item in recommends" class="recommends-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomeRecommend',
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style>
  .recommends {
    display: flex;
    width: 100%;
    text-align: center;
    padding: 10px 0 15px;
    border-bottom: 1px solid #eee;
    font-size: 12px;
  }
  .recommends-item {
    flex: 1;
  }
  .recommends img {
    width: 70px;
    height: 70px;
    margin-bottom: 5px;
  }
</style>

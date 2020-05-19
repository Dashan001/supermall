<template>
  <nav-bar>
    <div slot="left" class="nav-bar-left" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="titleInfos">
      <div v-for="(item,index) in titleInfos"
      class="title-item"
      @click="itemClick(index)"
      :class="{'active':currentIndex === index}">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        currentIndex: 0,
      }
    },
    props: {
      titleInfos: {
        type: Array,
        default() {
          return ['商品','参数','评论','推荐']
        }
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick',index)
      },
      backClick() {
        // this.$router.back()
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .titleInfos {
    display: flex;
    padding: 0 10px;
  }
  .title-item {
    flex: 1;
  }
  .nav-bar-left {
    text-align: center;
    padding-top: 5px;
  }
  .active {
    color: var(--color-high-text);
  }
</style>

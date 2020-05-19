<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar.vue'
  import { mapGetters } from 'vuex'
    export default {
        name: "ShopCart",
        components: {
          NavBar,
          CartList,
          CartBottomBar
        },
        computed: {
          // 两种语法
          // ...mapGetters(['cartLength', 'cartList'])
          ...mapGetters({
            length: 'cartLength',
            list:'cartList'
          })
        }
    }
</script>

<style scoped>
  .cart {
    position: relative;
    height: 100vh;
  }
  .nav-bar {
    position: relative;
    width: 100%;
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    z-index: 9;
  }
</style>

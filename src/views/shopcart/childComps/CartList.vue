<template>
  <scroll ref="scroll" class="content">
    <div>
      <cart-list-item v-for="item in cartList"
      :key="item.iid" :item-info="item"></cart-list-item>
    </div>
    <CartBottomBar/>
  </scroll>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  import CartBottomBar from './CartBottomBar.vue'

	export default {
		name: "CartList",
    components: {
		  Scroll, CartListItem,CartBottomBar
    },
    data() {
      return {
        isAllChecked: true
      }
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    },
	}
</script>

<style scoped>
  .content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 100px;
  }
</style>

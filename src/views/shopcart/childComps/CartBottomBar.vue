<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
      :isChecked = "isSelectAll"
      @click.native="checkClick"/>
      <span class="all">全选</span>
      <span class="price">合计:{{totalPrice}}</span>
      <span class="calculate" @click="calcClick">去计算({{choosedCount}})</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton.vue'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice () {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      choosedCount () {
        return  this.$store.state.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll () {
        // 有一个没有被选中的，全选按钮为false
        const cartList = this.$store.state.cartList
        if (cartList.length === 0) return false
        return !cartList.filter(item => !item.checked).length
      }
    },
    methods: {
      checkClick () {
        const cartList = this.$store.state.cartList
        // 1. 如果已经是全选状态，就全部改为不选中
        if (this.isSelectAll){
         cartList.forEach(item => item.checked = false);
        }else {
          cartList.forEach(item => item.checked = true);
        }
      },
      calcClick() {
        if (!this.isSelectAll) {
          this.$toast.show('请选择要购买的商品', 2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: absolute;
    display:flex;
    left: 0;
    bottom:-80px;
    height: 30px;
    z-index: 1;
  }
  .check-content {
    position: relative;
    align-items: center;
    bottom: 50px;
    left: 0;
    width: 100vw;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
  }
  .check-button {
    display: inline-block;
    line-height: 22px;
    width: 22px;
    height: 22px;
  }
  .all {
    font-size: 18px;
    margin-left: 5px;
  }
  .price {
    margin-left: 25px
  }
  .calculate {
    background-color: red;
    font-size: 20px;
    float: right;
    padding-right:15px;
    text-align: center;
    color: #fff;
  }
</style>

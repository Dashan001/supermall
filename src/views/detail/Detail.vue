<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="navBar"/>
    <scroll class="content"
    ref="scroll"
    :probe-type="3"
    @scroll="contentscroll">
      <div>
        <detail-swiper :images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo"
        @imgLoad="imgLoad"/>
        <detail-params-info :paramInfo="itemParams" ref="params"/>
        <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
        <goods-list :goods="recommends" ref="recommends"/>
      </div>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>

</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamsInfo from './childComps/DetailParamsInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'
  import GoodsList from 'components/content/goods/GoodsList'

  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import {backTopMixin} from 'common/mixin'

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        itemParams: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Scroll,
    },
    mixins: [backTopMixin],
    created() {
      // console.log(this.$route)
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        // console.log(res)
        // 1. 获取结果
        const data = res.result;

        // 2. 获取顶部信息
        this.topImages = data.itemInfo.topImages;

        // 2.3.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 2.4.获取店铺信息
        this.shop = new Shop(data.shopInfo);

        // 2.5.获取商品信息
        this.detailInfo = data.detailInfo

        // 2.6 获取参数的信息
        this.itemParams = data.itemParams

        // 2.7 取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      // 3. 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      // 4. 给getThemeTopY赋值(对getThemeTopY进行防抖)
      this.getThemeTopY = this.debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        // console.log(this.themeTopYs)
      })
    },
    mounted(){
      // 监听事件
      const newRefresh = this.debounce(this.$refs.scroll.refresh, 200)
        this.$bus.$on('homeItemImgLoad', () => {
          newRefresh()
        })
    },
    methods: {
      imgLoad() {
        // console.log('所有图片加载完毕')
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)

      },
      contentscroll(position) {
        // console.log(position)
        // 1. 获取y值
        const positionY = -position.y

        // 2. positionY的值和主题中的词进行对比
        switch(true) {
          case positionY<this.themeTopYs[1]:
            this.$refs.navBar.currentIndex = 0
            break
          case positionY<this.themeTopYs[2]:
            this.$refs.navBar.currentIndex = 1
            break
          case positionY<this.themeTopYs[3]:
            this.$refs.navBar.currentIndex = 2
            break
          case positionY>=this.themeTopYs[3]:
            this.$refs.navBar.currentIndex = 3
            break
        }

        // 3. 是否回到顶部,调用mixin里的方法
        this.listenShowBackTop(position)
      },

      addToCart() {
        // console.log('---加入购物车成功---')
        // 1. 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 2. 将商品添加到vuex
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart', product).then(res => {
          this.$toast.show(res)
        })

        // 3. 添加到购物车成功

      },

      // 防抖函数
      debounce(func, delay=200) {
        let timer = null
        return function(...args) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    background-color: #fff;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
    left: 0;
  }
  .detail-nav-bar {
    position: relative;
    z-index: 99;
    background-color: #fff;
  }
</style>

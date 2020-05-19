<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control"
          :titles="['流行','新款','精选']"
          @tabClick="tabClick"
          ref = "tabControlCp"
          v-show="isTabControlFixed"/>
    <scroll
      class="content"
      ref="scroll"
      :probe-type=3
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore">
        <home-swiper :banners='banners' @imgLoad.once="swiperImgLoad"></home-swiper>
        <home-recommend home-recommend :recommends='recommends'></home-recommend>
        <feature-view/>
        <tab-control class="tab-control"
          :titles="['流行','新款','精选']"
          @tabClick="tabClick"
          ref="tabControl"/>
        <goods-list :goods="goods[currentType].list"></goods-list>
      </scroll>
      <!-- 组件实例监听事件需要修饰符.native -->
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import FeatureView from './childComps/FeatureView'

  import {getHomeMultidata,getHomeGoods} from 'network/home'

  export default {
      name: "Home",
      data(){
        return {
          banners: [],
          recommends: [],
          goods: {
            'pop': {page: 0, list: []},
            'new': {page: 0 , list: []},
            'sell': {page: 0, list: []}
          },
          currentType: 'pop',
          tabControlTop: 0,
          saveY: 0,
          isShowBackTop: false,
          isTabControlFixed: false
        }
      },
      components: {
        NavBar,
        HomeSwiper,
        HomeRecommend,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
      },
      created() {
        // 1.请求多个数据
        this.getHomeMultidata()
        // 2. 请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
      },
      mounted() {
        this.$bus.$on('imgLoad', ()=>{
          this.$refs.scroll.refresh()
        })
        // const newRefresh = this.debounce(this.$refs.scroll.refresh, 10)
        // this.$bus.$on('homeItemImgLoad', () => {
        //   newRefresh()
        // })
      },
      destroyed() {
        console.log('Home组件被销毁')
      },
      activated() {
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
      },
      deactivated() {
        // console.log('Home组件deactived')
        this.saveY = this.$refs.scroll.scroll.y

      },
      methods: {
        // 防抖函数
        debounce(func, delay) {
          let timer = null
          return function (...args) {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
              func.apply(this, args)
            },delay)
          }
        },
        // 事件监听方法
        tabClick(index){
          // console.log(index)
          switch (index) {
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = "sell"
              break
          }
          this.$refs.tabControlCp.currentIndex = index
          this.$refs.tabControl.currentIndex = index

        },
        backClick() {
          this.$refs.scroll.scrollTo(0, 0)
        },
        contentScroll(position) {
          this.isShowBackTop = (-position.y) > 1000
          this.isTabControlFixed = -position.y>this.tabControlTop

        },
        loadMore () {
          // console.log('上拉加载更多')
          this.getHomeGoods(this.currentType)

        },
        swiperImgLoad () {
          // console.log('主页轮播图加载完毕');
          // console.log(this.$refs.tabControl.$el.offsetTop)
          this.tabControlTop = this.$refs.tabControl.$el.offsetTop

        },

        // 网络请求方法
        getHomeMultidata() {
          getHomeMultidata().then(res =>{
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
          })
        },
        getHomeGoods(type) {
          const page = this.goods[type].page + 1
          getHomeGoods(type, page).then(res => {
            // console.log(res)
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1
            // 完成一次上拉加载
            this.$refs.scroll.finishPullUp()
        })
        }
      }

  }
</script>

<style scoped>
  #home {
    position: relative;
    padding-top: 44px;
    height: 100vh;
  }
  .home-nav{
    position: fixed;
    left:0;
    top: 0;
    right:0;
    bottom: 0;
    background-color: var(--color-tint);
    color: #fff;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>

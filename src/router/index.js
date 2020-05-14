import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
    import ('views/home/Home.vue')
const Category = () =>
    import ('views/category/Category.vue')
const ShopCart = () =>
    import ('views/shopcart/Shopcart.vue')
const Profile = () =>
    import ('views/profile/Profile.vue')
// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [
{
  path: '',
  redirect: '/home'
  },
{
  path: '/home',
  component: Home
  },
{
  path: '/category',
  component: Category
  },
{
  path: '/shopcart',
  component: ShopCart
  },
{
  path: '/profile',
  component: Profile
  }]
const router = new VueRouter({
  routes,
  mode: 'history',
})

// 3.
export default router

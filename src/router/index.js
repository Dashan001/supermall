import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
    import ('views/home/Home.vue')
const Category = () =>
    import ('views/category/Category')
const ShopCart = () =>
    import ('views/shopcart/ShopCart')
const Profile = () =>
    import ('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
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
  },
{
  path: '/detail/:iid',
  component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history',
})

// 3.
export default router

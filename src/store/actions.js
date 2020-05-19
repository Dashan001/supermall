export default {
  addCart(context, payload) {
  return new Promise((resolve,reject) => {
    // 1. 查找之前数组中是否有该商品
    let oldProuduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 2. 判断oldProduct
    if (oldProuduct) {
      context.commit('addCount',oldProuduct)
      resolve('当前的商品数量+1')
    }else {
      context.commit('addCart', payload)
      resolve('成功添加到购物车')
    }
  })
  }
}

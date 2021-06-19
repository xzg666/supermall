import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
    addCart(state,payload){
      //现在是如果cartList里面有的商品，那么添加进来的，只增加数量，而不push
      //1.payload添加新的商品
      let oldProduct = null;
      for( let item of state.cartList){
        if( item.iid === payload.iid){
          oldProduct = item //浅拷贝
        }
      }
      //2.判断oldProduct
      if(oldProduct){
        oldProduct.count += 1  //因为是浅拷贝，因此state.cartList的count也发生变化！！！
      }else{
        payload.count = 1
        payload.checked = true
        state.cartList.push(payload)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})

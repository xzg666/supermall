<template>
    <div>
        <!-- 导航栏 -->
        <nav-bar class="nav-bar" >
            <div slot="center">购物车（<span>{{goodsNumber}}</span>）</div>
        </nav-bar>
       
        <!-- 商品 -->
        <cart-list  :product="cartList" ></cart-list>
        <!-- 底部计算 -->
        <account :goodsLength='goodsNumber'></account>
        <!-- <ul>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>

            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li><li>1</li>
            <li>1</li>

            <li>1</li><li>1</li>
            <li>1</li>

            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>

            <li>1</li>
            <li>1</li>
            <li>1</li>
            v
            <li>1</li>
            <li>1</li>


            v
            <li>1</li>

            <var>v</var>

        </ul> -->
        

    </div>
</template>

<script>
import navBar from 'common/navbar/navBar.vue'
import {mapState} from 'vuex'
import CartList from './childCom/cartList.vue'
import Account from './childCom/account.vue'

    export default {
        components:{
            navBar,
            CartList,
                Account,
                
        },
        computed:{
            ...mapState(['cartList']),
            goodsNumber(){
                return this.cartList.filter(item => {
                    return item.checked
                }).length
            }
        },
        created(){
            console.log(555555555566666,this.cartList[0])
        }
    }
</script>

<style  scoped>
.nav-bar{
    background: var(--color-tint);
  color: #fff;
}

</style>
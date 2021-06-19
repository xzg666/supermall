<template>
  <scroll class="content">
    <div v-for="(item,index) in product" :key="index" class="goods">
       <div class="left botton">
           <check-button :checked='item.checked' @click.native="item.checked = !item.checked"></check-button>
       </div>
       <div class="left"><img :src="item.img" alt="" class="cartGoodsImg"/></div>
       <div class="left info">
           <p class="title">{{item.title}}</p>
           <p class="desc">商品描述：{{item.desc}}</p>
           <div class="bottom">
               <span class="price">￥{{item.price}}</span>
               <span class="count">X{{item.count}}</span>
           </div>
       </div>
       <div class="clear"></div>
    </div>
     <!-- <ul>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>

         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>

         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>

         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>

         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>

         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>

         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
    </ul> -->
  </scroll>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll.vue";
import CheckButton from './checkButton.vue';
export default {
  components: { Scroll,CheckButton },
  props:{
     product:{
          type:Array,
          default(){
              return []
          }
      }
  },
  methods:{
     
  }
};
</script>

<style  scoped>
.content {
    height: calc(100vh - 44px - 49px - 40px);
    overflow: hidden;
}
.goods{
    width: 100%;
    height: 105px;
    margin-top: 5px;
    border-bottom: black 1px solid;
}
.botton{
    margin: 0 5px;
    margin-top: 30px;
    
}
.cartGoodsImg{
    width: 80px;
    height: 100px;
    border-radius: 5px;
}
.title,.desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: black;
}
.desc{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
    margin-left: 20px;
    
}
.count{
    margin-left: 45%;
    font-size: 16px;
    
}
.price{
    color: red;
}
.bottom{
    margin-top: 30px;
    
}   
.info{
    width: 60%;
    padding: 0 0 0 10px;
} 
</style>
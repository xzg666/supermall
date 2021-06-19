<template>
  <div class="detail">
    <detail-nav-bar @chooseIndex='getIndex' ref="navbar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scrollmes='scrollmes' :probe-type='3'>
      <detail-swiper :swiper-img="swiperImgs"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-info :detailInfo='detailInfo' @loadImg='loadImg'></detail-info>
      <detail-goods-params :item-params='itemParams' ref="params"></detail-goods-params>
      <detail-comment :comment-info='comment' ref="commend"></detail-comment>
        <goods-list :goods='recommendList' ref="recommend"></goods-list>
    </scroll>
    <!-- 底部加入购物车等功能 -->
    <detail-bottom-bar @addToCart='addToCart'></detail-bottom-bar>
    <!-- backTop -->
    <back-top @click.native="backClick" v-show="backShow"></back-top>
  </div>
</template>

<script>
import detailNavBar from "./chilComs/detailNavbar.vue";
import detailSwiper from "./chilComs/detailSwiper.vue";
import detailBaseInfo from "./chilComs/detailBaseInfo.vue";
import DetailShopInfo from "./chilComs/detailShopInfo.vue";
import scroll from "common/scroll/Scroll.vue";
import detailInfo from './chilComs/detailInfo.vue'
import detailGoodsParams from './chilComs/detailGoodsParams.vue'
import detailComment from './chilComs/detailComment.vue'
import goodsList from 'content/goods/goodsList.vue'
import detailBottomBar from './chilComs/detailBottomBar.vue'
import backTop from 'content/backTop/backTop.vue'

import { getDetail, Goods, Shop,recomGoods} from "network/detail.js";
import GoodsList from '../../components/content/goods/goodsList.vue';
import {debouce} from 'common/utils/utils.js'
import BackTop from '../../components/content/backTop/backTop.vue';
import { Toast } from 'vant'

export default {
  name: "Detail",
  data() {
    return {
      iid: "",
      swiperImgs: [],
      goods: {},
      shop: {},
      detailInfo:{},
      itemParams:{},
      comment:[],
      recommendList:[],
      themeTopY:[],
      getThemeTopY:null,
      scrollY:0,
      activeIndex:0,
      backShow: false,
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    //根据主页传来的iid发送请求
    this.getDetailData();
    //调用推荐商品数据请求
    this.getRecom()

    //给getThemeTopY赋值
    this.getThemeTopY = debouce(()=>{
      this.themeTopY = []
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.params.$el.offsetTop)
      this.themeTopY.push(this.$refs.commend.$el.offsetTop)
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopY.push(Number.MAX_VALUE)

      // console.log(this.themeTopY)
    })
  },
  methods: {
    btnClick(){
      this.$nextTick(()=>{
        this.activeIndex = 1
      })
      
      // console.log(this.activeIndex)
    },
    getDetailData() {
      getDetail(this.iid).then((res) => {
        console.log(3333,res);
        const data = res.result;
        this.swiperImgs = data.itemInfo.topImages;
        //取出商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        ); 
        //取出店铺信息
        this.shop = new Shop(data.shopInfo);
        //取出详情信息
        this.detailInfo = data.detailInfo
        //取出params参数信息
        this.itemParams = data.itemParams
        //取出评论参数
        if(data.rate.cRate !== 0){
          this.comment = data.rate.list
        } 
      });
    },
    loadImg(){
      //每次图片更新时都需要刷新计算高度，防止卡顿
      // debouce(()=>{
        this.$refs.scroll.refresh()
      // },200)()
      
      //当图片加载完成后调用获取主体offsetTop的值
      this.getThemeTopY()
    },
    //请求推荐商品数据
    getRecom(){
      recomGoods().then((res)=>{
        console.log(66666,res)
        this.recommendList = res.data.list
      })
    },
    getIndex(index){
      console.log(index)
      this.$refs.scroll.scrollTo(0 , (-this.themeTopY[index]))
    },
    scrollmes(position){
      this.scrollY = (-position.y)
      // console.log(this.scrollY)
      // if(this.scrollY >= this.themeTopY[3] ){
      //     this.activeIndex = 3
      //     this.$refs.navbar.currentIndex = 3
      // }else if(this.scrollY >= this.themeTopY[2]){
      //     this.activeIndex = 2
      //     this.$refs.navbar.currentIndex = 2
      // }else if(this.scrollY >= this.themeTopY[1]){
      //   this.activeIndex = 1
      //   this.$refs.navbar.currentIndex = 1
      // }else{
      //   this.activeIndex = 0
      //   this.$refs.navbar.currentIndex = 0
      // }
      for(let i=0;i<this.themeTopY.length-1;i++){
        if(this.activeIndex !==i && (this.scrollY >= this.themeTopY[i] && this.scrollY < this.themeTopY[i+1])){
          this.activeIndex = i
          this.$refs.navbar.currentIndex = this.activeIndex
        }
      } //hack做法：先在this.themeTopY的数组里面添加一个最大的值this.themeTopY.push(Number.MAX_VALUE)在上面created中！！！
      //然后for循环，if中的第一个条件this.activeIndex !==i 是为了直接滑动到临界值才变。不然会反复打印赋值
      //if中的第二个条件(this.scrollY >= this.themeTopY[i] && this.scrollY < this.themeTopY[i+1])是判断是在哪个区间大于等于多少小于多少就赋值，变化主题。
      // console.log(this.activeIndex)

      //2.判断backTop是否显示
      this.backShow = -position.y > 1000; //y大于1000为true，则backtop显示
    },
     backClick() {
      this.$refs.scroll.scrollTo(0, 0); //让他返回到首页
    },
    addToCart(){
      //获取购物车要展示的信息
      const product = {}
      product.img = this.swiperImgs[0] //商品图片
      product.title = this.goods.title //商品介绍
      product.desc = this.goods.desc //商品宣传语
      product.price = this.goods.price//商品价格
      product.iid = this.iid
      this.$store.commit('addCart',product)
      // console.log(product)
      Toast.success('加入购物车成功！'); //加入购物车的vant的Tost组件的使用，上面记得引入Tost
    }
  },
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    DetailShopInfo,
    scroll,
    detailInfo,
    detailGoodsParams,
    detailComment,
    goodsList,
    GoodsList,
    detailBottomBar,
    backTop,
    BackTop
  },
};
</script>

<style  scoped>
.detail {
  position: relative;
  z-index: 19;
  height: 100vh;
  background-color: #fff;
}
.content{
    height: calc(100% - 102px);
    overflow: hidden;
    background-color: #fff;
}
.recomtxt{margin: 10px;}
</style>
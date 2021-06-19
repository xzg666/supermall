<template>
  <div >
    <!-- 顶部栏 -->
    <nav-bar class="nav-bar">
      <p slot="center">购物车</p>
    </nav-bar>
    <!-- 分类 -->
     <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tabControl"
        v-show="isTabFixed"
      ></tab-control>

    <scroll
      class="contents"
      ref="scroll"
      @scrollmes="scrollmes"
      :probeType="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <carousel-figure
        :bannersData="banners"
        @swiperImgLoad="swiperImgLoad"
      ></carousel-figure>

      <!-- 推荐 -->
      <div @click="btnClick">
        <recommend-view :recoData="recommends"></recommend-view>
      </div>
      <!-- 特征图 -->
      <feature-view></feature-view>

      <!-- 分类 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <!-- 商品展示 -->
      <goods-list :goods="typeData"></goods-list>
    </scroll>
    <!-- 返回顶部 -->
    <back-top @click.native="backClick" v-show="backShow" />
  </div>
</template>
<script>
import CarouselFigure from "./childComs/CarouselFigure.vue";
import recommendView from "./childComs/recommendView.vue";
import featureView from "./childComs/featureView.vue";

import navBar from "common/navbar/navBar.vue";
import tabControl from "content/tabControl/tabControl.vue";
import goodsList from "content/goods/goodsList";
import scroll from "common/scroll/Scroll.vue";
import backTop from "content/backTop/backTop.vue";

import { getHomeMultidata, getHomeData } from "network/home";

export default {
  components: {
    navBar,
    CarouselFigure,
    recommendView,
    featureView,
    tabControl,
    goodsList,
    scroll,
    backTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        //先存放一个空对象，用来保存商品数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      backShow: false,
      tapOffsetTop: 0, //tabControl到顶部的高度
      isTabFixed: false,
      saveY:''
    };
  },
  computed: {
    typeData() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //1.请求多个数据
    this.getMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // console.log('sm',this.$refs.tabControl)
  },
  activated(){
    this.$refs.scroll.scrollTo(0 , this.saveY , 0)//进来该组件时跳到上次页面
    this.$refs.scroll.refresh() //并且重新刷新一下，以免划不动
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()//要切换首页时保存住当前scrollY的值
    console.log(99966,this.$refs.scroll.getScrollY())
  },
  methods: {
    /**
     * 事件监听相关的方法*/
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index //让两个tabcontrol的高亮保持点击的一致
    },
    btnClick() {
      console.log("btn");
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0); //让他返回到首页
    },
    scrollmes(position) {
      //1.判断backTop是否显示
      this.backShow = -position.y > 1000; //y大于1000为true，则backtop显示

      //2.决定tabcontrol是否吸顶
      this.isTabFixed = -position.y > this.tapOffsetTop; //滑动的是不是大于tabcontrol到顶部的距离
    },
    loadMore() {
      this.getHomeGoods(this.currentType); //重新发送请求，获取goods数据  下拉刷新更多
      console.log("123456");
      this.$refs.scroll.refresh(); //重新刷新scrol，重新计算图片高度
    },
    swiperImgLoad() {
      this.tapOffsetTop = this.$refs.tabControl2.$el.offsetTop; //拿到tabcontrol到顶部的高度,存起来
    },
    /**
     * 网络请求相关的方法*/
    getMultidata() {
      getHomeMultidata().then((res) => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1; //调用函数，使页码在原来基础上加1，初始值为0
      getHomeData(type, page).then((res) => {
        //发送请求
        console.log(123, res);
        this.goods[type].list.push(...res.data.list); //增加数据
        this.goods[type].page += 1; //最后将goods的页码更新

        this.$refs.scroll.finishPullUp(); //请求完调用finishPullUp方法，才能下一次下拉刷新更多
      });
    },
  },
};
</script>

<style  scoped>
.nav-bar {
  /* 使用base.css里的变量颜色 */
  background: var(--color-tint);
  color: #fff;
  /* 
  在使用浏览器原生滚动时，为了让导航不跟随一起滚动
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 8; */
}
.contents {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
/* .tabControl{
  W
} */
</style>
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
      //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      scrollY: true,
      click: true, //控制内部除了button以外标签的点击功能
    //   probeType:3//1:只显示一次，2：只显示你手指滑动过程的位置，3：只要滑动都出现位置信息      最好将参数设置为变量，props由父组件传来控制。
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
        mouseWheel: true,//开启鼠标滚轮
    });
    //2.监听滚动的位置
    this.scroll.on('scroll',(position)=>{
        // console.log(position)
        this.$emit('scrollmes',position)
    })
    //3.监听上拉事件
    this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
       
    })
  },
  methods: {
    scrollTo(x, y, time = 800) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);  //最好这样写，不然可能scroll话没出来就会报错
    },
    finishPullUp(){
        this.scroll.finishPullUp()  //调用该方法能让下拉重复使用
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }//获取到当前y的值
  },
};
</script>

<style scoped>
</style>
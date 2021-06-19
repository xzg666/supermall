<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in bannersData" :key="index">
        <a :href="item.link">
           <img :src="item.image" @load="imageLoad"/>
        </a>
       
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {
    bannersData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data(){
    return{
      isLoad:false
    }
  },
  mounted(){
    
  },
  methods:{
    imageLoad(){
      if(!this.isLoad){
        this.$emit('swiperImgLoad')
        this.isLoad=true
        //每次调用该轮播图组件，只需监测一张图片是否加载出来即可！
      }
      
    }
  }
};
</script>

<style  scoped>
.my-swipe{
  width: 100%;
}
.my-swipe img{
  width: 100%;
}
</style>
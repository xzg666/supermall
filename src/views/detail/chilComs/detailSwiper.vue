<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item, index) in swiperImg" :key="index">
      <img :src="item" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  props: {
    swiperImg: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style  scoped>
.my-swipe {
  width: 100%;
  height: 350px;
  overflow: hidden;
}
.my-swipe img {
  width: 100%;
}
</style>
<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in navBarData"
          :key="index"
          class="title-item"
          @click="itemClick(index)"
          :class="{ active: currentIndex == index }"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import navBar from "common/navbar/navBar.vue";

export default {
  components: {
    navBar,
  },
  data() {
    return {
      navBarData: ["商品", "参数", "评论", "推荐"],
      currentIndex:0
    };
  },
  methods:{
      backClick(){
          this.$router.back()//this.$router.go(-1)
      },
      itemClick(index){
          this.currentIndex = index
          this.$emit('chooseIndex',index)
      }
  }
};
</script>

<style  scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 14px;
}
.back {
  margin-top: 6px;
}
.active {
  color: var(--color-tint);
}
</style>
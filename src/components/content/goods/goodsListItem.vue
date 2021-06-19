<template>
  <div class="good-item" @click="itemClick">
    <img v-lazy='imgSrc' alt="" />
    <div class="good-item-txt">
      <p>{{ goodsItem.title }}</p>
      <span class="price">¥{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed:{
    imgSrc(){
      return this.goodsItem.image || this.goodsItem.show.img 
    }
    
  },
  methods:{
    itemClick(){
      this.$router.push('/detail/'+this.goodsItem.iid)
      console.log(555,this.goodsItem)
    }
  }
};
</script>

<style  scoped>
.good-item{
    width: 100%;
    position: relative;
    padding-bottom: 40px;
}
.good-item img{
    width: 100%;
    border-radius: 5px;
}
.good-item-txt{
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
}
.good-item-txt p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}
.price{
    color: var(--color-tint);
    margin-left: 20%;
}
.collect{
        position: relative;
        margin-left: 20%;
    }
.collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
<template>
  <div class="account">
    <div class="left botton">
      <check-button
        :checked="allSelect"
        @click.native="checkClick"
      ></check-button>
    </div>
    <p class="left allselect">全选</p>
    <p class="left total">合计：{{ totalPrice }}</p>
    <div class="right toAccount">去计算（{{ goodsLength }}）</div>
    <div class="clear"></div>
  </div>
</template>

<script>
import checkButton from "./checkButton.vue";
import { mapState } from "vuex";

export default {
  components: { checkButton },
  props: {
    goodsLength: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    allSelect() {
      return this.cartList.length
        ? this.cartList.length ==
            this.cartList.filter((item) => {
              return item.checked;
            }).length
        : false;
    },
  },
  methods: {
    checkClick() {
        //如果全选中的话，那么点击全选则都为false
        //如果部分选中，或者全为选中，那么点击全选则都设置为true
      if (this.allSelect) {//全选中
        this.cartList.forEach((item) => {
          return (item.checked = false);
        });
      }else{
          this.cartList.forEach((item) => {
          return (item.checked = true);
        });
      }
    //   console.log(this.allSelect);
    },
  },
  dta() {
    return {};
  },
};
</script>

<style  scoped>
.account {
  width: 100%;
  height: 40px;
  position: relative;
  left: 0;
  right: 0;
  bottom: 0px;
  line-height: 40px;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
}
.toAccount {
  width: 30%;
  background-color: red;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
}
.botton {
  margin-top: 2px;
  padding-bottom: 2px;
  margin-top: 10px;
  line-height: 20px;
}
.allselect {
  font-size: 12px;
}
.total {
  margin: 0 20px;
}
</style>
<template>
  <div class="button" :class="{ active: checked }">
    <img src="~/assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
    export default {
       props:{
           checked:{
               type:Boolean,
               default:false
           }
       } 
    }
</script>

<style  scoped>
.button {
  width: 20px;
  height: 20px;
  touch-action: none; 
  border-radius: 50%;
  text-align: center;
  border: gray 1px solid;
  cursor: pointer;
}
.active {
  background: red;
}
</style>
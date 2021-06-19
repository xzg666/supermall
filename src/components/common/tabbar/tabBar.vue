<template>
    <div class="tabbar">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style  scoped>
.tabbar{
     background-color: #f6f6f6;
    height: 49px;
    border-top: 1px solid #eee;
    box-shadow: 0px -1px 1px rgba(150,150,150,.08);

    /* 定位相关 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 12;

    /* 利用flex进行布局 */
    display: flex;
}
</style>
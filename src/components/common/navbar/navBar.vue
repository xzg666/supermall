<template>
    <div class="nav-bar">
        <div class="nav-left">
            <slot name="left"></slot>
        </div>
        <div class="nav-center">
            <slot name="center"></slot>
        </div>
        <div class="nav-right">
            <slot name="right"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .nav-bar{
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        box-shadow: 0 1px 1px rgba(100,100,100,.08);
        display: flex;
        
    }
    .nav-left{
        width: 60px;
    }
    .nav-center{
        flex: 1;
    }
    .nav-right{
         width: 60px;
    }
  
</style>
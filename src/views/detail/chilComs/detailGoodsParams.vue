<template>
    <div v-if="Object.keys(itemParams).length !== 0" class="goodsParmas">
        <table class="size">
            <tr v-for="(item,index) in itemParams.rule.tables[0]" :key='index'>
                <td v-for="(value,indexy) in item" :key='indexy'>{{value}}</td>
            </tr>
        </table>
        <table class="info">
            <tr v-for="(item,index) in itemParams.info.set" :key='index'>
                <td>
                    <span class="itemkey">{{item.key}}:</span>
                    <span class="item-value">{{item.value}}</span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        props:{
            itemParams:{
                type:Object,
                default(){
                    return{}
                }
            }
        }
    }
</script>

<style  scoped>
.goodsParmas{
    padding: 0 15px;
}
.size {
    width: 100%;
    border-collapse: collapse;
}
.size>tr{height: 40px;}
.size td{
    border-bottom: 1px solid rgba(100,100,100,.1);
}

.info{width: 100%;border-top: 5px solid rgba(100,100,100,.1);}
.info tr{height: 40px;line-height: 40px;}
.info td{
    border-bottom: 1px solid rgba(100,100,100,.1);
}
.item-value{
    color: var(--color-tint);
    margin-left: 40px;
}
</style>
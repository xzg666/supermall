<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: currentIndex == index }"
      @click="indexClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    indexClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index)
    },
  },
};
</script>

<style  scoped>
.tab-control {
  display: flex;
  background: #fff;
  width: 100%;
  height: 44px;
  line-height: 44px;
  position: sticky;
  top: 44px;
  z-index: 5;
}
.tab-control-item {
  flex: 1;
  text-align: center;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 2px solid var(--color-high-text);
  padding: 5px;
}
</style>
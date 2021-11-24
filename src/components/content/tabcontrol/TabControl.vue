<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="item"
      class="tab-contrlo-item"
      :class="{ active: index === currentIndex }"
      @click="itemclick(index)"
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
    itemclick(index) {
      this.currentIndex = index;
      this.$emit("tabclick", index);
    },
  },
};
</script>

<style lang="less" scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 17px;
  top: -1px;
  background-color: #fff;
  .tab-contrlo-item {
    flex: 1;
  }
  .tab-contrlo-item span {
    padding: 5px;
  }
  .active span {
    color: var(--color-tint);
    border-bottom: 3px solid var(--color-tint);
  }
}
</style>
<template>
  <div class="goods">
    <GoodsListItem v-for="item in goods" :key="item.index" :goodsItem="item" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
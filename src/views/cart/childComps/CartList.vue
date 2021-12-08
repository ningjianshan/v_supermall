<template>
  <div class="cartlist">
    <Scroll class="conten" ref="scroll">
      <CartListItem
        v-for="(item, index) in CartList"
        :key="index"
        :item="item"
      />
    </Scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem.vue";
import Scroll from "components/common/scroll/Scroll.vue";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    CartList() {
      return this.$store.state.cartList;
    },
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style lang="less" scoped>
.cartlist {
  height: calc(100% - 44px - 49px - 40px);
  .conten {
    height: 100%;
    overflow: hidden;
  }
}
</style>
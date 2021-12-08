<template>
  <div class="cart">
    <!-- 导航 -->
    <NavBar class="nav-bar">
      <div slot="centen">购物车({{ cartLength }})</div>
    </NavBar>
    <!-- 商品列表 -->
    <CartList />
    <!-- 商品的汇总 -->
    <CartBottomBar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/navbar.vue";
import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";
export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    cartLength() {
      return this.$store.state.cartList.length;
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  height: 100vh;
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
}
</style>
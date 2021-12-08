<template>
  <div class="bottom-bar">
    <div class="allcheck">
      <check-button
        class="check-item"
        :action="selectAll"
        @checkClick="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="totalPrice">
      <p>合计：￥{{ totalPrice }}</p>
    </div>
    <div class="close">去结算({{ cartLength }})</div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkbutton/CheckButton.vue";
export default {
  name: "CartBottomBar",
  data() {
    return {
      selectLength: 0,
      allLength: 0,
      action: false,
    };
  },
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return this.$store.getters.totalprice.toFixed(2);
    },
    cartLength() {
      this.selectLength = this.$store.getters.cartLength;
      return this.selectLength;
    },
    /**全选按钮判断 */
    selectAll() {
      this.allLength = this.$store.getters.allLength;
      if (this.allLength == 0) return false;
      this.action = this.allLength == this.selectLength;
      console.log(this.action);
      return this.action;
    },
  },
  methods: {
    checkClick() {
      if (this.action) {
        this.$store.commit("unAllSelected");
      } else {
        this.$store.commit("allSelected");
      }
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  height: 44px;
  background: #f6f6f6;
  display: flex;
  align-items: center;
  line-height: 44px;
}
.allcheck {
  width: 80px;
}
.check-item {
  margin: 0 -15px 0 10px;
  vertical-align: -3px;
}
.allcheck span {
  font-size: 15px;
}
.totalPrice {
  font-size: 17px;
  color: black;
}
.close {
  position: absolute;
  right: 0;
  background: #ff4500;
  width: 100px;
  text-align: center;
  color: #fff;
}
</style>
<template>
  <div class="check">
    <!--动态绑定class时监听不到对象里属性的变化如：:class="{action:item.checked}，通过click时修改item.checked时样式并不会随之变化-->
    <div class="item" :class="{ action: action }" @click="checkClick"></div>
  </div>
</template>
<script>
export default {
  name: "CheckButton",
  props: {
    action: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  methods: {
    checkClick() {
      this.changeCheck = !this.changeCheck;
      this.$emit("checkClick");
    },
  },
};
</script>
<style scoped>
.check {
  display: inline-block;
  width: 40px;
  height: 100%;
}
.item {
  border: 1px solid #aaa;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.action {
  border: 1px solid #fff;
  background-color: var(--color-tint);
  background-image: url("~assets/img/cart/tick.svg");
  background-size: 100%;
}
</style>
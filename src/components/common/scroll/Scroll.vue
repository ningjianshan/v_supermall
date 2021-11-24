<template>
  <div class="swiper" ref="swiper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    /**是否监听滚动 */
    probeType: {
      type: Number,
      default() {
        return 0;
      },
    },
    /**上拉加载更多 */
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      scroll: null, //为true时scroll内的子元素如div span等能监听点击事件
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.swiper, {
      click: true,
      probeType: this.probeType, //3时时监听滚动
      pullUpLoad: this.pullUpLoad, //上拉加载更多
    });

    // 监听滚动
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }
    // 监听上拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, timer = 500) {
      this.scroll && this.scroll.scrollTo(x, y, timer); //better-scroll内置方法，回到指定位置
    },
    // 上拉加载更多完成
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 从新计算滚动高度
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>
<style scoped>
</style>
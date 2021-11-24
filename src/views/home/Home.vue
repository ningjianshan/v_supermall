<template>
  <div id="home" class="wrapper">
    <!-- 导航栏组件 -->
    <Navbar class="home-navbar"><div slot="centen">购物街</div></Navbar>
    <TabControl
      class="tab-control"
      ref="tabControl1"
      :titles="['流行', '新款', '精选']"
      v-show="isTabFixed"
      @tabclick="tabclick"
    ></TabControl>
    <Scroll
      class="content"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="contenscroll"
      @pullingUp="loadMore"
    >
      <!-- 轮播图组件 -->
      <HomeSwiper
        :banners="banners"
        @SwiperImageLoad="SwiperImageLoad"
      ></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl
        ref="tabControl2"
        :titles="['流行', '新款', '精选']"
        @tabclick="tabclick"
      ></TabControl>
      <GoodsList :goods="ShowGoods"></GoodsList>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
/**
 * 私有组件
 */
// 导入轮播图组件
import HomeSwiper from "./childComps/HomeSwiper";
// 导入RecommendView 组件
import RecommendView from "./childComps/RecommendView.vue";
// 导入 FeatureView 组件
import FeatureView from "./childComps/FeatureView";
/**
 * 公共组件
 */
// 导入 Navbar 导航栏组件
import Navbar from "components/common/navbar/navbar.vue";
// 导入 TabControl 组件
import TabControl from "components/content/tabcontrol/TabControl";
// 导入 GoodsList 商品列表
import GoodsList from "components/content/goods/GoodsList.vue";
// 导入 Scroll 滚动组件
import Scroll from "components/common/scroll/Scroll.vue";
// 导入 BackTop 返回顶部组件
import BackTop from "components/common/backTop/BackTop.vue";

// 导入网络请求
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "../../common/utils";

export default {
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    Navbar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currenType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    ShowGoods() {
      return this.goods[this.currenType].list;
    },
  },
  destroyed() {
    console.log("home destroyed");
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    // 监听item中的图片加载完成
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    // 监听点击事件
    tabclick(index) {
      switch (index) {
        case 0:
          this.currenType = "pop";
          break;
        case 1:
          this.currenType = "new";
          break;
        case 2:
          this.currenType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contenscroll(position) {
      // 判断 BackTop 是否显示
      this.isShowBackTop = -position.y > 1000;
      // 决定 tabOffsetTop 是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      //加载更多图片
      this.getHomeGoods(this.currenType);
    },
    SwiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关的方法
     */
    // 请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 请求商品数据
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        // 完成加载更多
        this.goods[type].page++;
        this.$refs.scroll.finishPullUp(); //告诉better-scroll上拉加载数据已完毕
      });
    },
  },
};
</script>

<style lang="less" scoped>
#home {
  // padding-top: 44px;
  position: relative;
  height: 100vh;
  .home-navbar {
    background-color: var(--color-tint);
    color: #fff;

    // position: fixed;
    // left: 0;
    // right: 0;
    // top: 0;
    // z-index: 9;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  .content {
    position: absolute;
    top: 43px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>
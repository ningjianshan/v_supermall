<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" ref="navbar" @titleClick="titleClick" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contenScroll">
      <DetailSwiper :topImages="topImages" />
      <DetailBaseInfo :goods="goods" />
      <DetailShopsInfo :shops="shops" />
      <DetailGoodsInfo :info="info" @imgLoad="imgLoad" />
      <DetailParamInfo ref="param" :goodparam="goodparam" />
      <DetailCommentInfo ref="comment" :commentInfo="commentInfo" />
      <P class="title">看了又看</P>
      <GoodsList ref="recommend" :goods="recommends" />
    </scroll>
    <DetailBottomBar @showCart="addCart" />
    <BackTop
      class="backtop"
      @click.native="backClick"
      v-show="isShowBackTop"
    ></BackTop>
    <GoodStyle
      :product="product"
      @back="back"
      v-show="showcart"
      @showMess="showMess"
    />
    <div class="mess" v-show="showmess">
      <img src="~assets/img/common/mess.svg" alt="" />
      <span>添加购物车成功</span>
    </div>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import BackTop from "components/common/backTop/BackTop.vue";
import GoodStyle from "components/content/goods/GoodStyle.vue";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopsInfo from "./childComps/DetailShopsInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import { debounce } from "../../common/utils";
import { imgListenerMixin, backTopMixin } from "../../common/mixin";
import {
  getDetail,
  Goods,
  Shops,
  GoodParam,
  getRecommends,
  product,
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [], // 商品的图片
      goods: {}, // 商品的基本信息
      shops: {},
      goodparam: {}, // 商品尺码
      commentInfo: {}, // 评论信息
      recommends: {}, // 商品推荐信息
      themeTops: [], //点击DetailNavBar滚动到指定地方
      getThemeTopY: null, // 给点击 themeTops 进行防抖
      currentIndex: 0, // 记录滚动状态
      product: {}, //点击加入购物车时商品样式
      showcart: false,
      showmess: false, //添加购物车成功提示
      info: {}, // 商品穿着效果
    };
  },
  mixins: [imgListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopsInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar,
    BackTop,
    GoodStyle,
  },
  mounted() {
    // 保存商品id
    this.iid = this.$route.params.iid;
    // 根据iid请求详细数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      // 获取顶部的图片轮播图
      this.topImages = data.itemInfo.topImages;
      const { itemInfo, columns, shopInfo, detailInfo } = data;
      // 获取商品数据
      this.goods = new Goods(itemInfo, columns, shopInfo.services);
      // 商店信息
      this.shops = new Shops(shopInfo);
      // 商品上身效果数据
      this.info = detailInfo;
      // 商品尺码信息
      this.goodparam = new GoodParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate;
      }
      // 点击加入购物车时商品样式
      this.product = new product(this.iid, data.itemInfo, data.skuInfo);
    });
    // 商品推荐信息
    getRecommends().then((res) => {
      console.log(res);
      this.recommends = res.data;
    });
    // 给 getThemeTopY 赋值
    this.getThemeTopY = debounce(() => {
      this.themeTops = [];
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.param.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      this.themeTops.push(Number.MAX_VALUE);
      // console.log(this.themeTops);
    }, 300);
  },
  destroyed() {
    this.$bus.$off("imgLoad", this.imgLoadListener);
  },
  methods: {
    imgLoad() {
      this.refresh();
      this.getThemeTopY();
    },
    // 点击DetailDavBar滚动到对应区域
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 100);
    },
    // 监听滚动
    contenScroll(position) {
      // 获取到滚动的Y值
      const positionY = -position.y;
      // 拿Y值和主题中的值进行对比
      let length = this.themeTops.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTops[i] &&
          positionY < this.themeTops[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navbar.cuerrentIndex = this.currentIndex;
        }
        // 是否显示回到顶部
        this.isShowBackTop = -position.y > 1000;
      }
    },
    // 点击加入购物车
    showMess() {
      this.showcart = false;
      clearTimeout(timer);
      this.showmess = true;
      let timer = setTimeout(() => {
        this.showmess = false;
      }, 1500);
    },
    showCart() {
      this.showcart = true;
    },
    addCart() {
      this.showcart = true;
    },
    back() {
      this.showcart = false;
    },
  },
};
</script>

<style lang="less" scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
  .detail-nav {
    position: relative;
    z-index: 999;
    background-color: #fff;
  }
  .content {
    // height: calc(100% - 44px -58px);
    // height: calc(100% - 44px - 58px);
    position: absolute;
    top: 44px;
    bottom: 58px;
    overflow: hidden;
    .title {
      text-align: center;
      margin: 5px 0;
      color: coral;
    }
  }
  .backtop {
    bottom: 80px;
    right: 15px;
  }
  .mess {
    width: 200px;
    height: 100px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -72px;
    line-height: 100px;
    text-align: center;
    color: rgb(199, 197, 197);
    img {
      vertical-align: -6px;
    }
  }
}
</style>
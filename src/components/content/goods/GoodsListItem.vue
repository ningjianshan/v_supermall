<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },
  },
};
</script>

<style lang="less" scoped>
// 商品列表项
.goods-item {
  width: 46%;
  padding-bottom: 40px;
  position: relative; // 内层，相对外层定位

  img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0; // 左右为 0 内容就会居中
    right: 0; // 左右为 0 内容就会居中
    overflow: hidden; // 超出范围隐藏
    text-align: center;

    p {
      overflow: hidden; // 标题超出范围隐藏
      text-overflow: ellipsis; // 文本超出范围显示 ...
      white-space: nowrap; // 文本不进行换行
      margin-bottom: 3px;
    }

    .price {
      color: var(--color-tint);
      margin-right: 20px;
    }

    .collect {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: -15px;
        top: -3px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") no-repeat;
        background-size: 14px 16px;
      }
    }
  }
}
</style>
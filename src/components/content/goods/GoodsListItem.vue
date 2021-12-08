<template>
  <div class="good-item" @click="itemClick">
    <img :src="getImgSrc" alt="" @load="imgLoad" />
    <div class="good-info">
      <p>{{ item.title }}</p>
      <span class="price">{{ item.price }}</span>
      <span class="collect">{{ item.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodListItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    getImgSrc() {
      return this.item.image || this.item.show.img;
    },
  },
  methods: {
    imgLoad() {
      if (this.$route.path.indexOf("/home")) {
        this.$bus.$emit("itemImageLoad"); //事件总线
      }
    },
    itemClick() {
      if (this.item.iid !== undefined) {
        this.$router.push("/detail/" + this.item.iid);
      }
    },
  },
};
</script>
<style scoped>
.good-item {
  padding-bottom: 40px;
  position: relative;
  width: 46%;
  /* margin-left: 2%; */
}
.good-item img {
  width: 100%;
  border-radius: 5px;
}
.good-info {
  position: absolute;
  font-size: 12px;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.good-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.good-info .price {
  color: var(--color-height-text);
  margin-right: 20px;
}
.good-info .collect {
  position: relative;
}
.good-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
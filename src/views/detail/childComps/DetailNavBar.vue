<template>
  <div>
    <Navbar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="centen" class="title">
        <div
          v-for="(item, index) in titles"
          :key="item"
          :class="{ active: index === cuerrentIndex }"
          class="title-item"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </Navbar>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/navbar.vue";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      cuerrentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.cuerrentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  font-size: 15px;
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-tint);
  }
}
.back img {
  margin-top: 12px;
}
</style>
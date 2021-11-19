<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.index">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 13px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
  div {
    flex: 1;
    a {
      img {
        width: 80px;
        height: 80px;
      }
      div {
        margin-top: 10px;
      }
    }
  }
}
</style>
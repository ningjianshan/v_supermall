<template>
  <Swiper class="Swiper">
    <SwiperItem v-for="item in topImages" :key="item.index">
      <img :src="item" alt="" />
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style lang="less" scoped>
.Swiper {
  height: 300px;
  overflow: hidden;
}
</style>
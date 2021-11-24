<template>
  <Swiper>
    <Swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </Swiper-item>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("SwiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style>
</style>
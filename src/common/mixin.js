import {
    debounce
} from "./utils";

export const imgListenerMixin = {
    data() {
        return {
            // 监听图片
            itemImgListener: null,
            refresh: null
        };
    },
    mounted() {
        // 给防抖函数赋值一个新的函数
        this.refresh = debounce(this.$refs.scroll.refresh, 50);
        // 接收发射的事件总线,并用监听图片变量保存
        this.itemImgListener = () => {
            refresh();
        };
        // 监听item中的图片加载完成
        this.$bus.$on("imgLoad", this.itemImgListener);
        // console.log("我是混入中的内容");
    }
};

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false, //返回顶部按钮是否显示
        }
    },
    // components: {
    //     BackTop,
    // },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500);
        },
    }
}
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    cartList: [],
}

const store = new Vuex.Store({
    state,
    /**mutations:
     * 1.mutations唯一的目的就是修改state
     * 2.mutations中每个事件尽可能只做一间事，目的是为了更好的监听数据是哪个mutations修改的
     * actions:
     * 1.做异步操作，2.在action中进行条件判断
     */
    actions: {
        judgeProduct(context, product) {
            let list = state.cartList;
            for (let i in list) {
                if (list[i].iid == product.iid) {
                    context.commit("addCount", i);
                    return;
                }
            }
            context.commit("addProduct", product);
        }
    },
    mutations: {
        addCount(state, index) {
            state.cartList[index].count++
        },
        addProduct(state, product) {
            product.index = state.cartList.length;
            state.cartList.push(product);
        },
        modifyChecked(state, index) {
            state.cartList[index].checked = !state.cartList[index].checked;
        },
        /**反选 */
        unAllSelected(state) {
            state.cartList.map(item => {
                return item.checked = false;
            })
        },
        allSelected(state) {
            state.cartList.map(item => {
                return item.checked = true;
            })
        },
    },
    getters: {
        // 计算商品的价格
        totalprice(state) {
            if (state.cartList.length == 0) return 0;
            return state.cartList.filter(item => {
                return item.checked;
            }).reduce((pre, item) => {
                return pre + item.lowNowPrice * item.count;
            }, 0)
        },
        // 商品
        cartLength(state) {
            if (state.cartList.length == 0) return 0;
            return state.cartList.filter(item => {
                return item.checked;
            }).length;
        },
        allLength(state) {
            return state.cartList.length;
        }
    }
})
export default store
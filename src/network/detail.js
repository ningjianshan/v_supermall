import {
    request
} from './request'

export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

// 商品推荐信息
export function getRecommends() {
    return request({
        url: '/recommend'
    })
}

/**商品信息 */
export class Goods {
    constructor(appinfo, columns, services) {
        this.title = appinfo.title; // 商品的名称
        // this.desc = itemInof.desc // 商品介绍
        this.oldPrice = appinfo.oldPrice;
        this.price = appinfo.price; // 商品的价格
        // this.discountBgColor = itemInof.discountBgColor
        this.discountDesc = appinfo.discountDesc;
        this.columns = columns;
        this.services = services
    }
}

// 商店信息
export class Shops {
    constructor(shopinfo) {
        this.cFans = shopinfo.cFans; //粉丝
        this.cGoods = shopinfo.cGoods;
        this.cSells = shopinfo.cSells; //销量
        this.shopLogo = shopinfo.shopLogo;
        this.name = shopinfo.name;
        this.score = shopinfo.score;
    }
}

// 商品尺码信息
export class GoodParam {
    constructor(info, rule) {
        this.info = info.set,
            this.rule = rule
    }
}

// 要加入购物车的信息
export class product {
    constructor(iid, itemInfo, skuInfo) {
        this.iid = iid,
            this.img = itemInfo.topImages[0];
        this.priceRange = skuInfo.priceRange; //价格区间
        this.lowNowPrice = itemInfo.lowNowPrice; //价格
        this.title = itemInfo.title;
        this.rule = skuInfo.props[1]; //尺码
        this.styleColor = skuInfo.props[0]; //颜色
        this.totalStock = skuInfo.totalStock;
        this.count = 1; //数量
    }
}

// 加入购物车的商品信息
export class cartProduct {
    constructor(iid, img, lowNowPrice, title, rule, styleColor, count) {
        this.iid = iid,
            this.checked = true,
            this.img = img;
        this.lowNowPrice = lowNowPrice; //价格
        this.title = title;
        this.rule = rule; //尺码
        this.styleColor = styleColor; //颜色
        this.count = count; //数量
    }
}
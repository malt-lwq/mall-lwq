import {request} from "./request";

export function getDetailData(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
export function getRecommend() {
  return request({
    url: '/recommend',
    
  })
}
export class Goods {
  constructor(itemInfo, columns, shopInfo) {
    this.title = itemInfo.title;
    this.oldPrice = itemInfo.oldPrice;
    this.newPrice = itemInfo.price;
    this.realPrice = itemInfo.lowNowPrice;
    this.discount = itemInfo.discountDesc;
    this.desc = itemInfo.desc;
    this.columns = columns;
    this.services = shopInfo.services;


  }
}

export class Shop {
  constructor(shopInfo) {
    this.name = shopInfo.name;
    this.score = shopInfo.score;
    this.logo = shopInfo.shopLogo;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.goodsCount = shopInfo.cGoods;
  }
}

export class GoodsParams {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

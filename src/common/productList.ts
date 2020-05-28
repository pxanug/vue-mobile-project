const Mock = require("mockjs");
const productList = Mock.mock({
  "productList|100": [
    {
      "productId|+1": 1,
      "productMsg|1": "@ctitle(15)",
      "productName|1": "@cname",
      "phone|1": /^1(3|5|7|8)[0-9]{9}$/,
      " productAdress|1": "@country(true)",
      "star|1-5": "★",
      "price|9.9-1000": 9.9,
      "image|4": "@Image('100x40','#c33', '#ffffff','某某商品')",
      "recommend|7": [
        {
          "productId|+1": 101,
          "productMsg|1": "@ctitle(15)",
          "productName|1": "@cname",
          "phone|1": /^1(3|5|7|8)[0-9]{9}$/,
          " productAdress|1": "@country(true)",
          "star|1-5": "★",
          "price|9.9-1000": 9.9,
          "image|4": "@Image('100x40','#c33', '#ffffff','某某商品')"
        }
      ]
    }
  ],
  "resultMsg|1": "请求成功",
  "resultCode|1": "00"
});
const bannerList = Mock.mock({
  "bannerList|3": [
    {
      "bannerId|+1": 1,
      "image|1": "@Image('150x60','#c33', '#ffffff','某某商品')"
    }
  ],
  "resultMsg|1": "请求成功",
  "resultCode|1": "00"
});
Mock.mock("/api/way/productList", "post", (req, res) => {
  return productList;
});
Mock.mock("/api/method/bannerList", "post", (req, res) => {
  return bannerList;
});

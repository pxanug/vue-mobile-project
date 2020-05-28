import axios from "axios";
import { AxiosPromise } from "axios/index.d";
import { Message, Loading } from "element-ui";
let baseUrl =
  process.env.NODE_ENV === "production" ? process.env.VUE_APP_baseurl : "";
const $http = axios.create({
  baseURL: baseUrl,
  timeout: 20000
});
$http.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Message(handleHttpError(error));
    return Promise.reject(error);
  }
);
$http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    Message(handleHttpError(error));
    return Promise.reject(error);
  }
);
export function PostData(
  url,
  param,
  config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  }
) {
  const token = "";
  const header = {
    appVersionTP: "web.111",
    deviceID: "1111111111111",
    authorizationTP: token
  };
  config.headers = Object.assign(config.headers, header);
  let loading = Loading.service({ text: "加载中" });
  return new Promise((resolve, reject) => {
    $http
      .post(url, param, config)
      .then(response => {
        loading.close();
        const data = response.data;
        if (data.resultCode === "00") {
          resolve(data);
        } else {
          Message(data.resultMsg);
          reject(data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  });
}
let handleHttpError = (error): string => {
  let msg = error.toString().indexOf("Network Error") > 0 ? "网络错误" : error;
  let errors = (error && error.request) || (error && error.response);
  if (errors) {
    let status = errors.status;
    console.log(status);
    switch (status) {
      case 400:
        msg = "请求错误";
        break;

      case 401:
        msg = "未授权，请登录";
        break;

      case 403:
        msg = "拒绝访问";
        break;

      case 404:
        msg = `请求地址出错: ${error.response.config.url}`;
        break;

      case 408:
        msg = "请求超时";
        break;

      case 500:
        msg = "服务器内部错误";
        break;

      case 501:
        msg = "服务未实现";
        break;

      case 502:
        msg = "网关错误";
        break;

      case 503:
        msg = "服务不可用";
        break;

      case 504:
        msg = "网关超时";
        break;

      case 505:
        msg = "HTTP版本不受支持";
        break;
      default:
        msg = "网络请求错误";
        break;
    }
  }
  console.log(msg);
  return msg;
};

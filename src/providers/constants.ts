/*----------------------------------------后台Api地址----------------------------------------*/

export const APP_SERVE_URL = 'http://58.247.96.174:7101/budiuke/'; // 测试

/*----------------------------------------文件服务器地址----------------------------------------*/
export const FILE_SERVE_URL = 'http://172.16.19.136:9000/kit_file_server/'; // 文件服务:测试环境

/*----------------------------------------app版本升级服务地址,查询app最新版本号,更新日志.----------------------------------------*/
export const APP_VERSION_SERVE_URL = 'http://172.16.19.136:9001/api/';
// export const APP_VERSION_SERVE_URL = 'http://172.16.19.86/version/api/';// 新测试环境

export const IS_DEBUG = true; // 是否开发(调试)模式

export const DEFAULT_AVATAR = './assets/img/avatar.png'; // 用户默认头像
export const PAGE_SIZE = 5; // 默认分页大小
export const IMAGE_SIZE = 1024; // 拍照/从相册选择照片压缩大小
export const QUALITY_SIZE = 94; // 图像压缩质量，范围为0 - 100
export const REQUEST_TIMEOUT = 20000; // 请求超时时间,单位为毫秒

export const FUNDEBUG_API_KEY = '663317d6edbdd20cd931b32793f16c26fcfe11c13e91eb0cfe6c0fc37d88da23'; // 去https:// fundebug.com/申请key

export const HTTPSTATUS = {
	400:'请求失败',
	401:'密码已过期,请重新登录',
	403:'密码已过期,请重新登录',
	408:'请求超时',
	500:'服务器内部错误'
}

// code push 部署key
export const CODE_PUSH_DEPLOYMENT_KEY = {
  'android': {
    'Production': 'i0LgJRugiIfjVYTgmXs9go45Xc7g26690215-d954-4697-a879-90e0c4612b59',
    'Staging': 'WY29_Zyq_hg0eB3TSTGaKRSKPE6k26690215-d954-4697-a879-90e0c4612b59'
  },
  'ios': {
    'Production': 'kn3VJ28z0hB_zQYnW-KnblldnBzN26690215-d954-4697-a879-90e0c4612b59',
    'Staging': 'SRoxClVMoed8SgwIRxeVCPWx26Fk26690215-d954-4697-a879-90e0c4612b59'
  }
};

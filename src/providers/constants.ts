/*----------------------------------------后台Api地址----------------------------------------*/

export const APP_SERVE_URL = 'http://58.247.96.174:7070/budiuke/'; // 测试

/*----------------------------------------文件服务器地址----------------------------------------*/
export const FILE_SERVE_URL = 'http://172.16.19.136:9000/kit_file_server/'; // 文件服务:测试环境

/*----------------------------------------app版本升级服务地址,查询app最新版本号,更新日志.----------------------------------------*/
export const APP_VERSION_SERVE_URL = 'http://172.16.19.136:9001/api/';
// export const APP_VERSION_SERVE_URL = 'http://172.16.19.86/version/api/';// 新测试环境

export const IS_DEBUG = true; // 是否开发(调试)模式

export const DEFAULT_AVATAR = './assets/img/avatar.png'; // 用户默认头像
export const PAGE_SIZE = 20; // 默认分页大小
export const IMAGE_SIZE = 1024; // 拍照/从相册选择照片压缩大小
export const QUALITY_SIZE = 60; // 图像压缩质量，范围为0 - 100
export const REQUEST_TIMEOUT = 20000; // 请求超时时间,单位为毫秒

export const FUNDEBUG_API_KEY = '663317d6edbdd20cd931b32793f16c26fcfe11c13e91eb0cfe6c0fc37d88da23'; // 去https:// fundebug.com/申请key
//http常见错误状态
export const HTTPSTATUS = {
	400:'请求失败',
	401:'密码已过期,请重新登录',
	403:'密码已过期,请重新登录',
	408:'请求超时',
	500:'服务器内部错误'
}
//行业信息
export const INDUSTRY:Array<any> = ['互联网','电信广播传输','金融','服务','餐饮','服装','批发零售','房地产','教育','娱乐文化']

//客户标签信息
export const TAGS: Array<any> = ['重要客户', '老客户', '一般客户', '选号客户'];

export const CUSTOMTAGS: Array<any> = ['大户', '拖机', '美女','吃货', '房产客户','大套客户'];

//客户状态信息
export const FOLLOWSTATUS: Array<any> = [
    {
        value: 'WAIT',
        label: '待跟'
    },
    {
        value: 'ALREADY',
        label: '跟进'
    },
    {
        value: 'OVER',
        label: '成交'
    },
    {
        value: 'INVALID',
        label: '无效'
    },
];


export const FILTERDATA: any[] = [
    {
        name: '标签筛选',
        key: 'tagFiltrate',
        options: [
            {
                tag: '客户标签',
                key: 'clienteleTag',
                options: []
            },
            {
                tag: '自定义标签',
                key: 'customTag',
                options: []
            }
        ]
    },
    {
        name: '全部客户',
        key: 'stateFiltrate',
        options: [
            {
                value: undefined,
                label: '全部'
            },
            ...FOLLOWSTATUS
        ]
    },
    {
        name: '排序',
        key: 'sort',
        options: [
            {
                label: '默认排序',
                value: undefined
            },
            {
                label: '创建时间',
                value: 'CREATE_TIME'
            },
            {
                label: '跟进时间顺序',
                value: 'FOLLOW_TIME'
            }
        ]
    }
];
// code push 部署key
export const CODE_PUSH_DEPLOYMENT_KEY = {
  'android': {
    'Production': '7-EYzJUWF6G4NkSbTgbbNpaya8lL65d837ac-83a7-46ac-b3f7-d9f5df69ca82',
    'Staging': 'Xp74u9fR1Q3L33gd3uOaA2wv_jsd65d837ac-83a7-46ac-b3f7-d9f5df69ca82'
  },
  'ios': {
    'Production': 'b0FAimOPJgPqr8kNZKld1GQWOpa_65d837ac-83a7-46ac-b3f7-d9f5df69ca82',
    'Staging': 'IxCaGymFmvrMxbgW5wqY7EZgj8QX65d837ac-83a7-46ac-b3f7-d9f5df69ca82'
  }
};

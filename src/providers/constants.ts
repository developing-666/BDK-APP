/*----------------------------------------后台Api地址----------------------------------------*/

export const APP_SERVE_URL = 'http://58.247.96.174:7070/budiuke/'; // 测试

/*----------------------------------------文件服务器地址----------------------------------------*/
export const FILE_SERVE_URL = 'http://172.16.19.136:9000/kit_file_server/'; // 文件服务:测试环境

/*----------------------------------------app版本升级服务地址,查询app最新版本号,更新日志.----------------------------------------*/
export const APP_VERSION_SERVE_URL = 'http://172.16.19.136:9001/api/';
// export const APP_VERSION_SERVE_URL = 'http://172.16.19.86/version/api/';// 新测试环境

export const IS_DEBUG = true; // 是否开发(调试)模式

export const DEFAULT_AVATAR = 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODFEQThGRkQ3QzA3MTFFODhGNUNGMzZCQjIyRjM1MkEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODFEQThGRkU3QzA3MTFFODhGNUNGMzZCQjIyRjM1MkEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MURBOEZGQjdDMDcxMUU4OEY1Q0YzNkJCMjJGMzUyQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MURBOEZGQzdDMDcxMUU4OEY1Q0YzNkJCMjJGMzUyQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAYEBAQFBAYFBQYJBgUGCQsI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'; // 用户默认头像
export const PAGE_SIZE = 20; // 默认分页大小
export const IMAGE_SIZE = 1024; // 拍照/从相册选择照片压缩大小
export const QUALITY_SIZE = 60; // 图像压缩质量，范围为0 - 100
export const REQUEST_TIMEOUT = 20000; // 请求超时时间,单位为毫秒

export const FUNDEBUG_API_KEY = '663317d6edbdd20cd931b32793f16c26fcfe11c13e91eb0cfe6c0fc37d88da23'; // 去https:// fundebug.com/申请key
//http常见错误状态
export const HTTPSTATUS = {
	400: '请求失败',
	401: '密码已过期,请重新登录',
	403: '密码已过期,请重新登录',
	408: '请求超时',
	500: '服务器内部错误'
}
//行业信息
export const INDUSTRY: Array<any> = ['互联网', '电信广播传输', '金融', '服务', '餐饮', '服装', '批发零售', '房地产', '教育', '娱乐文化']

//客户标签信息
export const TAGS: Array<any> = ['重要客户', '老客户', '一般客户', '选号客户'];

export const CUSTOMTAGS: Array<any> = ['大户', '拖机', '美女', '吃货', '房产客户', '大套客户'];

//客户状态信息
export const FOLLOWSTATUS: Array<any> = [
	{
		value: undefined,
		label: '全部客户'
	},
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

//是否跟进
export const ISFOLLOW: Array<any> = [
	{
		value: undefined,
		label: '全部'
	},
	{
		value: false,
		label: '未跟进'
	},
	{
		value: true,
		label: '已跟进'
	}
];

//是否批注
export const ISCOMMENT: Array<any> = [
	{
		value: undefined,
		label: '全部'
	},
	{
		value: false,
		label: '未批注'
	},
	{
		value: true,
		label: '已批准'
	}
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
		options: FOLLOWSTATUS
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
				label: '创建时间升序',
				value: 'CREATE_TIME_ASC'
			},
			{
				label: '创建时间降序',
				value: 'CREATE_TIME_DESC'
			},
			{
				label: '跟进时间升序',
				value: 'FOLLOW_TIME_ASC'
			},
			{
				label: '跟进时间降序',
				value: 'FOLLOW_TIME_DESC'
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

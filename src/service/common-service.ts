import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../providers/http-service';
import { Utils } from '../providers/utils';
import { NativeService } from '../providers/native-service';
import { APP_VERSION_SERVE_URL } from '../providers/constants';
import { Logger } from '../providers/logger';

/**
 *
 */
@Injectable()
export class CommonService {
	constructor(public httpService: HttpService, public nativeService: NativeService, public logger: Logger) {}

	/**
	 * 登录获取token
	 */
	getToken(username, password) {
		return this.httpService.post('/v1/login', {
			'client_id': 'app',
			'username': username,
			'password': Utils.md5(password)
		});
	}

	/**
	 * 查询用户信息
	 */
	getUserInfo() {
		return this.httpService.get('/v1/public/user/self');
	}

	/**
	 * 获取新token
	 */
	getNewToken() {
		return this.httpService.post('/v1/refresh_token');
	}

	/**
	 * 查询登录用户所拥有的资源
	 * resourceType: 资源类型1:菜单,2:url,3:按钮
	 */
	getResource(resourceType = 1) {
		const url = '/v1/public/resource';
		const json = Utils.sessionStorageGetItem(url);
		if(json) {
			return Observable.of(json.filter((item) => {
				return item.resourceType == resourceType;
			}));
		}
		return this.httpService.post(url, {
			clientType: 2
		}).map((res) => {
			Utils.sessionStorageSetItem(url, res);
			return res.filter((item) => {
				return item.resourceType == resourceType;
			});
		});
	}

	/**
	 * 更新文件缓存文件关系
	 */
	fileRelationReplace(data) {
		return this.httpService.post('/fileRelation/replace', data);
	}

	/**
	 * 从版本管理服务中查询app版本信息
	 */
	getAppVersion() {
		return Observable.create(observer => {
			this.nativeService.getPackageName().subscribe(packageName => { // 获得app包名
				const appName = packageName.substring(packageName.lastIndexOf('.') + 1);
				const appType = this.nativeService.isAndroid() ? 'android' : 'ios';
				const url = Utils.formatUrl(`${APP_VERSION_SERVE_URL}/v1/apply/getDownloadPageByEName/${appName}/${appType}`);
				this.httpService.get(url, null, false).subscribe(res => {
					if(res && res.code == 1) {
						observer.next(res.data); // 返回app最新版本信息
					}
				}, err => {
					this.logger.log(err, '从版本升级服务获取版本信息失败', {
						url
					});
					observer.error(false);
				});
			}, err => {
				this.logger.log(err, '获取包名失败');
				observer.error(false);
			});
		});
	}

	/**
	 * 查询公告列表
	 */
	findPublishList() {
		return this.httpService.post('/sys/notice/findPublishList');
	}

	/**
	 * 查询公告详情
	 */
	getPublishDetail(id) {
		return this.httpService.get(`/sys/notice/getById/${id}`);
	}

}
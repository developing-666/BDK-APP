import { Injectable } from '@angular/core';
import { HttpService } from './http-service';

@Injectable()
export class AppApi {
    constructor(private _http: HttpService) {}
    /**
     * 登录
     */

    login(opts?: any): any {
        return this._http.post('/login', opts);
    }
    /**
     * 获取验证码
     */

    getCode(phone?: any): any {
        return this._http.get('/authenticationcode/sms/' + phone);
    }
    /**
     * 注册
     */

    signIn(opts: any): any {
        return this._http.post('/register', opts);
    }
    /**
     * 验证手机号
     */

    signInPhoneValid(opts?: any): any {
        return this._http.post('/register/valid', opts);
    }
    /**
     * 获取省份信息
     */
    queryProvinces(): any {
        return this._http.get('/province/queryProvinces');
    }
    /**
     * 获取城市信息
     */
    queryCitiesByProvinceId(id: any): any {
        return this._http.get('/city/queryCitiesByProvinceId/' + id);
    }
    /**
     * 创建客户
     * @param opts
     */
    customerCreate(opts?: any): any {
        return this._http.post('/customer/create', opts);
    }
    /**
     * 获取客户电话
     */
    customerCall(opts): any {
        return this._http.post('/customer/call', opts);
    }
    /**
     * 更新客户信息
     * @param opts
     */
    customerUpdate(opts?: any): any {
        return this._http.put('/customer/update', opts);
    }
    /**
     * 查询客户列表
     * @param opts
     */
    customerQuery(opts) {
        return this._http.post('/customer/queryCustomerByPage', opts);
    }
    /**
     * 查询客户详情
     * @param opts
     */
    customerDetails(id) {
        return this._http.get('/customer/queryCustomerById/' + id);
    }
	/**
	 * 恢复历史客户
	 * @param  id 客户idea
	 */
	enableCustomer(id) {
        return this._http.get('/customer/enableCustomer/' + id);
    }
    /**
     * 验证新客户手机号
     * @param phone
     */
    customerValid(phone) {
        return this._http.post('/customer/valid', { phone });
    }
    /**
     * 删除客户
     * @param id
     */
    customerDelete(id) {
        return this._http.delete('/customer/delete/' + id);
    }
    /**
     * 搜索客户
     * @param keyword
     */
    customerSearch(keyword) {
        return this._http.get(
            '/customer/getCustomerKeyword/',
            {
                keyword
            },
            true
        );
    }
    /**
     * 查询标签
     * @param type
     */
    queryLabelByType(type) {
        return this._http.post('/label/queryLabelByType', {
            type
        });
    }
    /**
     * 新建标签
     * @param opts
     */
    labelCreate(opts?: any) {
        return this._http.post('/label/create', opts);
    }
    /**
     * 删除标签
     * @param id
     */
    labelDelete(id) {
        return this._http.delete('/label/delete/' + id);
    }
    /**
     * 查询搜索记录
     */
    searchhistory() {
        return this._http.get('/searchhistory/queryHistory', {}, true);
    }
    /**
     * 删除所有搜索记录
     */
    searchHistoryDelete() {
        return this._http.delete('/searchhistory/deleteAll');
    }
    /**
     * 申请企业版
     */
    applyCompanyCreate(opts?: any): any {
        return this._http.post('/apply_company/create', opts);
    }
    /**
     * 获取申请企业版信息
     */
    applyCompanyQueryInfo(): any {
        return this._http.get('/apply_company/queryInfo');
    }
    /**
     * 获取用户信息
     */
    queryUserInfo(): any {
        return this._http.get('/user/queryUserInfo');
    }
    /**
     * 获取用户跟进信息
     */
    queryCustomerFollowById(id): any {
        return this._http.get('/customerfollow/queryCustomerFollowById/' + id);
    }
    /**
     * 创建用户
     */
    createByCompany(opts?: any): any {
        return this._http.post('/user/createByCompany', opts);
    }
    /**
     * 更新用户信息
     */
    updateUserInfo(opts?: any): any {
        return this._http.put('/user/update', opts);
    }

    /**
     * 修改密码
     */
    resetPassword(opts?: any): any {
        return this._http.post('/resetPassword', opts);
    }

    /**
     * 获取用户操作记录
     */
    queryCustomerOperateLogByPage(opts) {
        return this._http.post(
            'customeroperatelog/queryCustomerOperateLogByPage',
            opts
        );
    }
    /**
     * 跟进记录
     */
    queryCustomerFollowDetailByPage(opts) {
        return this._http.post(
            '/customerfollow/queryCustomerFollowDetailByPage',
            opts
        );
    }
    /**
     * 获取提醒
     */
    queryTaskDetailByPage(opts) {
        return this._http.post('/task/queryTaskDetailByPage', opts);
    }
    /**
     * 按日期查询提醒
     * @param opts
     */
    queryTaskCountByDate(opts) {
        return this._http.post('/task/queryTaskCountByDate', opts);
    }
    /**
     * 创建提醒
     * @param opts
     */
    taskCreate(opts) {
        return this._http.post('/task/create', opts);
    }
    /**
     * 删除提醒
     * @param id
     */
    taskDelete(id) {
        return this._http.delete('/task/delete/' + id);
    }
    /**
     * 批量删除提醒
     * @param ids
     */
    taskDeleteBatch(ids) {
        return this._http.delete('/task/deleteBatch', {
            ids
        });
    }
    /**
     * 延时提醒
     * @param opts
     */
    taskLazy(opts) {
        return this._http.post('/task/lazy', opts);
    }
    /**
     * 图片上传
     */
    upoadImage(opts) {
        return this._http.post('/upoad/image', opts);
    }
    /**
     * 通话记录
     */
    callRecord(opts) {
        return this._http.post(
            '/customercallrecord/queryCustomerCallRecordByPage',
            opts
        );
    }
    /**
     * 提醒跟进
     */
    followCreate(opts) {
        return this._http.post('/customerfollow/create', opts);
    }
	/**
	 * 获取提醒详情
	 * @param  id 提醒ID
	 */
	queryTaskById(id){
		return this._http.get('/task/queryTaskById/'+id);
	}
    /**
     * 忘记密码
     */
    forgetPassword(opts) {
        return this._http.post('/forgetPassword', opts);
    }
    /**
     * 退出登录
     */
    logout() {
        return this._http.post('/logout');
    }
	/**
	 * 查询所有角色
	 */
	queryAllRole(){
		return this._http.get('/role/queryAllRole/');
    }
    /**
     * 查询隐私号码省份
     */
    queryVirtualPhoneProvinces(){
        return this._http.get('/province/queryVirtualPhoneProvinces');
    }
    /**
     * 查询隐私号码城市
     */
    queryVirtualPhoneCitiesByProvinceId(id){
        return this._http.get('/city/queryVirtualPhoneCitiesByProvinceId/'+id);
    }
    /**
     * 查询隐私号码
     * @param opts
     */
    querySafetyPhones(opts){
        return this._http.post('/user/querySafetyPhones',opts);
    }
	/**
	 * 查询用户
	 */
	queryUserByPage(opts){
		return this._http.post('/user/queryUserByPage',opts);
	}
	/**
	 * 修改权限
	 */
	updateByCompany(opts){
		return this._http.post('/user/updateByCompany',opts);
	}
	/**
	 * 删除用户
	 */
	userDelete(id){
		return this._http.post('/user/delete/'+id);
	}
	/**
	 * 查询通话记录
	 */
	queryCallLog(opts){
		return this._http.post('/fourhundredtalkdtl/queryFourHundredTalkDtlByPage',opts);
    }
    /**
     * 获取被叫号码
     */
    queryAllCalled(){
        return this._http.get('/fourhundredtalkdtl/queryAllCalled');
    }
	/**
	 * 查询分配对象
	 */
	queryUserByCompany(opts){
		return this._http.post('/user/queryUserByCompany',opts);
	}
	/**
	 * 客户分配
	 */
	customerAssign(opts){
		return this._http.post('/customer/assign',opts);
	}
	/**
	 * 提醒批注
	 */
	taskCommentCreate(opts){
		return this._http.post('/taskcomment/create',opts);
	}
	/**
	 * 跟进批注
	 */
	customerFollowComment(opts){
		return this._http.post('/customerfollowcomment/create',opts);
	}
}

import { Injectable } from '@angular/core';
import { Base64 } from 'js-base64';
import md5 from 'blueimp-md5';

/**
 * Utils类存放和业务无关的公共方法
 * @description
 */
@Injectable()
export class Utils {
    static isEmpty(value): boolean {
        return (
            value == null || (typeof value === 'string' && value.length === 0)
        );
    }

    static isNotEmpty(value): boolean {
        return !Utils.isEmpty(value);
    }

    /**
     * 格式“是”or“否”
     * @param value
     * @returns {string|string}
     */
    static formatYesOrNo(value: number | string): string {
        return value == 1 ? '是' : value == '0' ? '否' : null;
    }

    /**
     * 日期对象转为日期字符串
     * @param date 需要格式化的日期对象
     * @param sFormat 输出格式,默认为yyyy-MM-dd                        年：y，月：M，日：d，时：h，分：m，秒：s
     * @example  dateFormat(new Date())                               "2017-02-28"
     * @example  dateFormat(new Date(),'yyyy-MM-dd')                  "2017-02-28"
     * @example  dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss')         "2017-02-28 13:24:00"   ps:HH:24小时制
     * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')         "2017-02-28 01:24:00"   ps:hh:12小时制
     * @example  dateFormat(new Date(),'hh:mm')                       "09:24"
     * @example  dateFormat(new Date(),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
     * @example  dateFormat(new Date('2017-02-28 13:24:00'),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
     * @returns {string}
     */
    static dateFormat(date: Date, sFormat: String = 'yyyy-MM-dd'): string {
        const time = {
            Year: 0,
            TYear: '0',
            Month: 0,
            TMonth: '0',
            Day: 0,
            TDay: '0',
            Hour: 0,
            THour: '0',
            hour: 0,
            Thour: '0',
            Minute: 0,
            TMinute: '0',
            Second: 0,
            TSecond: '0',
            Millisecond: 0
        };
        time.Year = date.getFullYear();
        time.TYear = String(time.Year).substr(2);
        time.Month = date.getMonth() + 1;
        time.TMonth = time.Month < 10 ? '0' + time.Month : String(time.Month);
        time.Day = date.getDate();
        time.TDay = time.Day < 10 ? '0' + time.Day : String(time.Day);
        time.Hour = date.getHours();
        time.THour = time.Hour < 10 ? '0' + time.Hour : String(time.Hour);
        time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
        time.Thour = time.hour < 10 ? '0' + time.hour : String(time.hour);
        time.Minute = date.getMinutes();
        time.TMinute =
            time.Minute < 10 ? '0' + time.Minute : String(time.Minute);
        time.Second = date.getSeconds();
        time.TSecond =
            time.Second < 10 ? '0' + time.Second : String(time.Second);
        time.Millisecond = date.getMilliseconds();

        return sFormat
            .replace(/yyyy/gi, String(time.Year))
            .replace(/yyy/gi, String(time.Year))
            .replace(/yy/gi, time.TYear)
            .replace(/y/gi, time.TYear)
            .replace(/MM/g, time.TMonth)
            .replace(/M/g, String(time.Month))
            .replace(/dd/gi, time.TDay)
            .replace(/d/gi, String(time.Day))
            .replace(/HH/g, time.THour)
            .replace(/H/g, String(time.Hour))
            .replace(/hh/g, time.Thour)
            .replace(/h/g, String(time.hour))
            .replace(/mm/g, time.TMinute)
            .replace(/m/g, String(time.Minute))
            .replace(/ss/gi, time.TSecond)
            .replace(/s/gi, String(time.Second))
            .replace(/fff/gi, String(time.Millisecond));
    }

    /**
     * 每次调用sequence加1
     * @type {()=>number}
     */
    static getSequence = (() => {
        let sequence = 1;
        return () => {
            return ++sequence;
        };
    })();

    /**
     * 返回字符串长度，中文计数为2
     * @param str
     * @returns {number}
     */
    static strLength(str: string): number {
        let len = 0;
        for (let i = 0, length = str.length; i < length; i++) {
            str.charCodeAt(i) > 255 ? (len += 2) : len++;
        }
        return len;
    }

    /**
     * 把url中的双斜杠替换为单斜杠
     * 如:http://localhost:8080//api//demo.替换后http://localhost:8080/api/demo
     * @param url
     * @returns {string}
     */
    static formatUrl(url = ''): string {
        let index = 0;
        if (url.startsWith('http')) {
            index = 7;
        }
        return (
            url.substring(0, index) +
            url.substring(index).replace(/\/\/*/g, '/')
        );
    }

    static sessionStorageGetItem(key: string) {
        const jsonString = sessionStorage.getItem(key);
        if (jsonString) {
            return JSON.parse(jsonString);
        }
        return null;
    }

    static sessionStorageSetItem(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    static sessionStorageRemoveItem(key: string) {
        sessionStorage.removeItem(key);
    }

    static sessionStorageClear() {
        sessionStorage.clear();
    }

    /**
     * 字符串加密
     * @param str
     * @returns {any}
     */
    static md5(str: string) {
        return md5(str).toUpperCase();
    }
    static base64(str: string) {
        return Base64.encode(str);
    }
    static base64Decode(str: string) {
        return Base64.decode(str);
    }
    /** 产生一个随机的32位长度字符串 */
    static uuid() {
        let text = '';
        const possible = 'abcdef0123456789';
        for (let i = 0; i < 19; i++) {
            text += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );
        }
        return text + new Date().getTime();
    }
    //获取动画结束事件名称
    static animationEnd() {
        let animations = {
            animation: 'animationend',
            OAnimation: 'oAnimationEnd',
            MozAnimation: 'mozAnimationEnd',
            WebkitAnimation: 'webkitAnimationEnd'
        };
        let el = document.createElement('div');
        for (let t in animations) {
            if (el.style[t] !== undefined) {
                return animations[t];
            }
        }
    }
    //获取过度结束事件名称
    static transitionEnd() {
        let transitions = {
            transition: 'transitionend',
            OTransition: 'oTransitionEnd',
            MozTransition: 'mozTransitionEnd',
            WebkitTransition: 'webkitTransitionEnd'
        };
        let el = document.createElement('div');
        for (let t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    }

    static getType(obj) {
        //tostring会返回对应不同的标签的构造函数
        var toString = Object.prototype.toString;
        var map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
        };
        if (obj instanceof Element) {
            return 'element';
        }
        return map[toString.call(obj)];
    }
    static deepClone(data) {
        var type = this.getType(data);
        var obj;
        if (type === 'array') {
            obj = [];
        } else if (type === 'object') {
            obj = {};
        } else {
            //不再具有下一层次
            return data;
        }
        if (type === 'array') {
            for (var i = 0, len = data.length; i < len; i++) {
                obj.push(this.deepClone(data[i]));
            }
        } else if (type === 'object') {
            for (var key in data) {
                obj[key] = this.deepClone(data[key]);
            }
        }
        return obj;
    }
    static isObjFunc(name) {
        let toString = Object.prototype.toString;
        return (...args) => toString.call(args[0]) === '[object ' + name + ']';
    }
    static extend(...args) {
        let isObject = this.isObjFunc('Object'),
            isArray = this.isObjFunc('Array'),
            isBoolean = this.isObjFunc('Boolean');
        let index = 0,
            isDeep = false,
            obj,
            copy,
            destination,
            source,
            i;
        if (isBoolean(args[0])) {
            index = 1;
            isDeep = args[0];
        }
        for (i = args.length - 1; i > index; i--) {
            destination = args[i - 1];
            source = args[i];
            if (isObject(source) || isArray(source)) {
                for (var property in source) {
                    obj = source[property];
                    if (isDeep && (isObject(obj) || isArray(obj))) {
                        copy = isObject(obj) ? {} : [];
                        let extended = this.extend(isDeep, copy, obj);
                        destination[property] = extended;
                    } else {
                        destination[property] = source[property];
                    }
                }
            } else {
                destination = source;
            }
        }
        return destination;
    }
    static closest(el, selector) {
        var matchesSelector =
            el.matches ||
            el.webkitMatchesSelector ||
            el.mozMatchesSelector ||
            el.msMatchesSelector;
        while (el) {
            if (matchesSelector.call(el, selector)) {
                break;
            }
            el = el.parentElement;
        }
        return el;
    }
    static getPicUrl(value,size:string = '-') {
		if(!value) return '';
		if (value.indexOf('base64') > -1) {
			return value;
		} else {
			const index = value.lastIndexOf('.');
	        const len = value.length;
	        const path = value.substring(0, index);
	        const suffix = value.substring(index, len);
	        return `${path}_-x${size}${suffix}`;
		}

    }
}

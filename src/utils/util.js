import { createFromIconfontCN } from '@ant-design/icons'
import { ICONURL } from './config'

export function formatDate (time, fmt) {
    var o = {
        "M+": new Date(time).getMonth() + 1,                 //月份   
        "d+": new Date(time).getDate(),                    //日   
        "h+": new Date(time).getHours(),                   //小时   
        "m+": new Date(time).getMinutes(),                 //分   
        "s+": new Date(time).getSeconds(),                 //秒   
        "q+": Math.floor((new Date(time).getMonth() + 3) / 3), //季度   
        "S": new Date(time).getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (new Date(time).getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


export function parseArticle (content) {
    var toc = [];
    var reg = /(?<!#+)(#{1,2})\s+?(.+?)\n/g;
    var regExecRes = null
    while ((regExecRes = reg.exec(content))) {
        if (regExecRes[1].length)
            toc.push({
                level: regExecRes[1].length,
                title: regExecRes[2]
            });
    }
    return toc
}


export function movieAarryFormat (arr) {
    if (arr.length < 2) {
        return arr[0]
    }
    return arr.join('/')
}

export const MyIcon = createFromIconfontCN({
    scriptUrl: ICONURL
});

export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

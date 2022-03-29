// 通用全局filters
// 使用方法   export

/**
 * 输入机器时间    导入 yyyy-MM-dd
 * @param time   需要格式化的时间原始数据
 */
export function formatDate (time) {
    let date = new Date(time);
    if (time) {
        return formatDateFn(date, 'yyyy-MM-dd');
    }
}
/**
 * //value为13位的时间戳
 * @param value
 * @returns {string}
 */
export function formatDateUnix (value) {
    function add0 (m) {
        return m < 10 ? '0' + m : m;
    }
    var time = new Date(parseInt(value));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var f = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d);
};
export function formatDateUnix2 (value) {
    function add0 (m) {
        return m < 10 ? '0' + m : m;
    }
    var time = new Date(parseInt(value));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var f = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m);
};
function formatDateFn (date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero (str) {
    return ('00' + str).substr(str.length);
}

/* 以元为单位的金额千分位转换 */
export function formatFilNew (value) {
    const pattern = /(?=((?!\b)\d{3})+$)/g; /* 小数位前加千分符 */
    if (value) {
        let value = (parseFloat(value));
        let xsd = value.toString().split('.');
        /* alert(xsd); */
        if (xsd.length == 1) { /* 没有小数的情况 */
            value = value.toString().replace(pattern, ',') + '.00';
            return value;
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) { /* 有一位小数的情况 */
                value = xsd[0].toString().replace(pattern, ',') + '.' + xsd[1] + '0';
            } else if (xsd[1].length >= 2) { /* 有两位小数的情况 */
                value = xsd[0].toString().replace(pattern, ',') + '.' + xsd[1];
            }
            return value;
        }
    }
}
/* 以分为单位的转换 */
export function amountFil (value) {
    const pattern = /(?=((?!\b)\d{3})+$)/g;
    if (value) {
        let value = Math.round(parseFloat(value / 1000) * 100) / 100; /* 分转成元 */
        let xsd = value.toString().split('.');
        if (xsd.length == 1) {
            value = xsd[0].toString().replace(pattern, ',') + '.00';
            return value;
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                value = xsd[0].toString().replace(pattern, ',') + '.' + xsd[1] + '0';
            } else if (xsd[1].length >= 2) {
                value = xsd[0].toString().replace(pattern, ',') + '.' + xsd[1];
            }
            return value;
        }
    }
}

/**
 * 商机、项目table中对创建时间的格式化处理
 */
export function prAndOppoTimeFmt (value) {
    if (value) {
        return value.substring(0, 10);
    }
}

/**
 * 商机、项目table中对创建人的格式化处理
 */
export function prAndOppoPersonFmt (value) {
    if (value) {
        return value.split('|')[1];
    }
}

/**
 * 商机、项目table中对金额的格式化处理
 */
export function amountFmt (value) {
    const pattern = /(?=((?!\b)\d{3})+$)/g;
    if (value) {
        var value = Math.round(parseFloat(value / 1000) * 100) / 100;
        var xsd = value.toString().split('.');
        if (xsd.length == 1) {
            value = value.toString().replace(pattern, ',') + '.00';
            return value;
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                value = value.toString().replace(pattern, ',') + '0';
            }
            return value;
        }
    }
}


export function getnbsp(str){
  return str ? str : "\xa0"
}

let CommonUtils = {
    NumberFormat: {
        /**
         * 将传入数据转换为字符串,并清除字符串中非数字与.的字符,按数字格式补全字符串
         * 输入int类型数字后自动在后面加.0，输入float型保留小数点后一位
         *  如 (2,0.9988) --> 0.99
         * @param decimals 保留多少位小数
         * @param orginalNum 原始数值或字符串
         * @returns {*|String}
         */
        toFloatStr: function (decimals, orginalNum) {
            if (!decimals || !orginalNum) {
                console.error('NumberFormat.toFloatStr(decimals,orginalNum) 缺少参数(' +
                    decimals + ',' + orginalNum + ')');
                return;
            }
            let zeroStr = '';
            for (var i = 0; i < decimals; i++) {
                zeroStr += '0';
            }
            orginalNum = new String(orginalNum);
            // 清除字符串中的非数字非.字符
            orginalNum = orginalNum.replace(/[^0-9|\.]/g, '');
            // 清除字符串开头的0
            if (/^0+/) { orginalNum = orginalNum.replace(/^0+/, ''); }
            // 为整数字符串在末尾添加.00
            if (!/\./.test(orginalNum)) { orginalNum += '.' + zeroStr; }
            if (/^\./.test(orginalNum)) // 字符以.开头时,在开头添加0
            { orginalNum = '0' + orginalNum; }
            orginalNum += zeroStr; // 在字符串末尾补零
            orginalNum = orginalNum.match(new RegExp('\\\d+\\\.\\\d{' + decimals + '}'))[0];
            return orginalNum;
        },

        /**
         *  数值格式化 TODO(有待优化)
         *   example: 123456789.012345678 ---> 123,456,789.012,345,678
         *   如果不传入dec,step 默认  dec = 1, step =3;
         * @param num 原始数值
         * @param dec 保留几位小数
         * @param step  每隔多少位添加一个','分隔符号
         * @returns {*}   123,456,789.012,345,678
         */
        numToFormatStr: function (num, dec, step) {
            // 默认取整，每三位进行一次逗号(',')分隔
            dec = dec || 1, step = step || 3;
            // --------得到num保留小数后dec的数值-------------
            num = parseFloat(num);
            if (isNaN(num)) {
                console.error('numToFormatStr(' + num + ',' + dec + ',' + step + ')...格式化失败num-->isNaN');
                return '';
            }
            let decpow = Math.pow(10, dec);
            // 四舍五入保留几位小数
            num = Math.round(num * decpow) / decpow;
            // 如果是整数，补填保留小数位为000...
            if (Math.round(num) === num) {
                num = num.toFixed(dec);
            }
            // --------------开始补全逗号------------------
            // 转换为字符串
            num += '';
            // 找到小数点的位置，切割出左右字符串，对左右字符串分别格式化
            let reg = new RegExp('\\\d{' + step + '}', 'g'); // 正则 /\d{3}/g
            let idot = num.indexOf('.');
            let sleft = num.substring(0, idot) || '';
            let sright = num.substring(idot + 1) || '';
            if (sleft && sleft.length > step) {
                let ilen = sleft.length;
                let ire = ilen % step; // 位数/step 的余数
                // dotLeftStr = !dotLeftStr || pr==0 ? (dotLeftStr.slice(pr,plen).match(/\d{3}/g).join(",")) : (b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","));
                sleft = ire == 0 ? (sleft.slice(ire, ilen).match(reg).join(',')) : (sleft.slice(0, ire) + ',' + sleft.slice(ire, ilen).match(reg).join(','));
            }
            if (sright && sright.length > step) {
                let ilen = sright.length;
                let ire = ilen % step; // 位数/step 的余数
                sright = ire == 0 ? (sright.slice(ire, ilen).match(reg).join(',')) : (sright.slice(0, ilen - ire).match(reg).join(',') + ',' + sright.slice(ilen - ire));
            }
            num = sleft + '.' + sright;
            return num;
        }
    }
};

export default CommonUtils;

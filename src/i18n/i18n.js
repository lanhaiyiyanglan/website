import Vue from 'vue'
import locale from 'element-ui/lib/locale';
import VueI18n from 'vue-i18n'
import messages from './langs'
Vue.use(VueI18n)
//从localStorage获取语言选择。
let langObj=localStorage.getItem('langObj');
let currentLang = langObj ? JSON.parse(langObj).value : '';
localStorage.lang=currentLang;
const i18n = new VueI18n({
    locale: localStorage.lang || 'zh_CN', //初始未选择默认 zh_CN 中文
    messages,
})
window.i18nList=[
    {
        label:'简体中文',
        value:'zh_CN'
    },
    // {
    //     label:'English',
    //     value:'en_US'
    // },
];
locale.i18n((key, value) => i18n.t(key, value)) //兼容element

export default i18n

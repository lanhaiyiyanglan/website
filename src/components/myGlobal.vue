<script>
    import util from '../libs/util';

    let myGlobal = {
        permission: {}
        // getPermission(resParentId){
        //     alert(resParentId);
        // }
    };

    myGlobal.getPermission = (resParentId) => {
        if (resParentId == '') { return '1111'; }
        var v = '1111';
        if (myGlobal.permission && myGlobal.permission.filter) {
            // var arr = this.global.permission.filter(o => (o.resParentId == '11101') && (o.resUrl == 'add'));
            var o = myGlobal.permission.filter(o => (o.resParentId == resParentId));
            v += o.filter(o => (o.resUrl == 'create')).length > 0 ? '1' : '0';
            v += o.filter(o => (o.resUrl == 'read')).length > 0 ? '1' : '0';
            v += o.filter(o => (o.resUrl == 'update')).length > 0 ? '1' : '0';
            v += o.filter(o => (o.resUrl == 'del')).length > 0 ? '1' : '0';
        }
        return v;
    };
    myGlobal.getPermissionEX = (v, idx, perimission) => {
        if (perimission == null || perimission == '') perimission = '0';
        if (v == null || v == '') v = '0';
        let num = Number.parseInt(perimission, 2) | Number.parseInt(v, 2);
        v = num.toString(2).length < 4 ? util.addPreZero(num.toString(2)) : num.toString(2);
        return v == null ? true : v.charAt(idx) != 1;
    };
    export default myGlobal;
</script>


//chs; 갱글리온 회원가입

const express = require('express');
const router = express.Router();
const mysql = require('sync-mysql');
const fs = require('fs');


const client = new mysql({
    host: 'localhost',
    user: 'root',
    password: 'gachon654321',
    database: 'luciddb'
});


//chs;
var userNum;

//fp1 데이터
var mp = new Array();
var mn = new Array();
var ips = new Array();
var ins = new Array();
var sop = new Array();
var son = new Array();
var sfp = new Array();
var sfn = new Array();
var dp = new Array();
var dn = new Array();
var count = 0;

var checkDB = false;
var inputDB = false;

var temp = new Array();
var resultArr = new Array();
var arrLenth = 0;

//fp2 데이터
var mp_fp2 = new Array();
var mn_fp2 = new Array();
var ips_fp2 = new Array();
var ins_fp2 = new Array();
var sop_fp2 = new Array();
var son_fp2 = new Array();
var sfp_fp2 = new Array();
var sfn_fp2 = new Array();
var dp_fp2 = new Array();
var dn_fp2 = new Array();
var count_fp2 = 0;

var checkDB_fp2 = false;
var inputDB_fp2 = false;

var temp_fp2 = new Array();
var resultArr_fp2 = new Array();
var arrLenth_fp2 = 0;



router.get('/', (req, res) => {
    console.log('get!');
    res.send('eeg!');
});

router.post('/', (req, res) => {
    userNum = req.body.token_java;
    console.log("chs; hello register"+userNum)


    var fp1s = fp1(req.body.TwoY);
    var fp2s = fp2(req.body.ThreeY);
    if (fp1s == 1 || fp2s == 1) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
        res.end("1");
    }
    else if (fp1s == 4 && fp2s == 4) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
        res.end("4");
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
        res.end("1");
    }
});


const isVaild = (x, TwoY, range) => {
    let tol = 1;
    for (let i = 0; i < range; i++) {
        if (temp[x - i] >= TwoY[range - i] - 2 && temp[x - i] <= TwoY[range - i] + 2) {
            ;
        }
        else {
            return false;
        }
    }
    return true;
}

const isVaild_fp2 = (x, ThreeY, range) => {
    let tol = 1;
    for (let i = 0; i < range; i++) {
        if (temp_fp2[x - i] >= ThreeY[range - i] - 2 && temp_fp2[x - i] <= ThreeY[range - i] + 2) {
            ;
        }
        else {
            return false;
        }
    }
    return true;
}

function fp1(fpdata) {

    if (checkDB == true && inputDB == false) {
        var max_mp = 0;
        var min_mp = 1000;
        var max_mn = 0;
        var min_mn = 1000;
        var max_ips = 0;
        var min_ips = 1000;
        var max_ins = 0;
        var min_ins = 1000;
        var max_sop = 0;
        var min_sop = 1000;
        var max_son = 0;
        var min_son = 1000;
        var max_sfp = 0;
        var min_sfp = 1000;
        var max_sfn = 0;
        var min_sfn = 1000;
        var max_dp = 0;
        var min_dp = 1000;
        var max_dn = 0;
        var min_dn = 1000;

        mp.forEach((data, index) => {
            if (max_mp < mp[index])
                max_mp = mp[index];
            if (min_mp > mp[index])
                min_mp = mp[index];
            if (max_mn < mn[index])
                max_mn = mn[index];
            if (min_mn > mn[index])
                min_mn = mn[index];
            if (max_ips < ips[index])
                max_ips = ips[index];
            if (min_ips > ips[index])
                min_ips = ips[index];
            if (max_ins < ins[index])
                max_ins = ins[index];
            if (min_ins > ins[index])
                min_ins = ins[index];
            if (max_sop < sop[index])
                max_sop = sop[index];
            if (min_sop > sop[index])
                min_sop = sop[index];
            if (max_son < son[index])
                max_son = son[index];
            if (min_son > son[index])
                min_son = son[index];
            if (max_sfp < sfp[index])
                max_sfp = sfp[index];
            if (min_sfp > sfp[index])
                min_sfp = sfp[index];
            if (max_sfn < sfn[index])
                max_sfn = sfn[index];
            if (min_sfn > sfn[index])
                min_sfn = sfn[index];
            if (max_dp < dp[index])
                max_dp = dp[index];
            if (min_dp > dp[index])
                min_dp = dp[index];
            if (max_dn < dn[index])
                max_dn = dn[index];
            if (min_dn > dn[index])
                min_dn = dn[index];

        });

        var Stringquery = "INSERT INTO LOGINEOGFP1 VALUES(" + userNum + ", " + min_mp + ", " + max_mp + ", " + min_mn + ", " + max_mn + ", " + min_ips + ", " + max_ips + ", " + min_ins + ", " + max_ins + ", " + min_sop + ", " + max_sop + ", " + min_son + ", " + max_son + ", " + min_sfp + ", " + max_sfp + ", " + min_sfn + ", " + max_sfn + ", " + min_dp + ", " + max_dp + ", " + min_dn + ", " + max_dn + ");";
        client.query(Stringquery);
        inputDB = true;
        return 4
    }
    else if (checkDB == true && inputDB == true) {
        return 4
    }
    else if (arrLenth >= 15 && checkDB == false) {
        resultArr.forEach((y) => {
            getG1(y, mp, mn, ips, ins, count++);
        });
        count = 0;
        resultArr.forEach((y) => {
            getG3(y, mp, mn, ips, ins, sop, son, sfp, sfn, dp, dn, count++);
        });
        var sum_mp = 0;
        var sum_mn = 0;
        var sum_ip = 0;
        var sum_in = 0;

        for (var i = 0; i < mp.length; i++) {
            var flag = 0;
            if (mp[i] == 0 || mp[i] == 1 || mn[i] == 199 || mn[i] == 200) {
                mp.splice(i, 1);
                mn.splice(i, 1);
                ips.splice(i, 1);
                ins.splice(i, 1);
                sop.splice(i, 1);
                son.splice(i, 1);
                sfp.splice(i, 1);
                sfn.splice(i, 1);
                dp.splice(i, 1);
                dn.splice(i, 1);
                resultArr.splice(i, 1);
                arrLenth--;
                flag = 1;
            }
            if (flag == 1)
                i = -1;
        }
        for (var i = 0; i < mp.length - 1; i++) {
            var flag = 0;
            console.log("ㅎㅎ2");
            if (mp[i] == mp[i + 1] && mn[i] == mn[i + 1] && ips[i] == ips[i + 1] && ins[i] == ins[i + 1]) {
                mp.splice(i, 1);
                mn.splice(i, 1);
                ips.splice(i, 1);
                ins.splice(i, 1);
                sop.splice(i, 1);
                son.splice(i, 1);
                sfp.splice(i, 1);
                sfn.splice(i, 1);
                dp.splice(i, 1);
                dn.splice(i, 1);
                resultArr.splice(i, 1);
                arrLenth--;
                flag = 1;
            }
            if (flag == 1)
                i = -1;
        }

        mp.forEach((data, index) => {
            console.log("ㅎ3");
            sum_mp += mp[index];
            sum_mn += mn[index];
            sum_ip += ips[index];
            sum_in += ins[index];
        });

        sum_mp = sum_mp / mp.length;
        sum_mn = sum_mn / mp.length;
        sum_ip = sum_ip / mp.length;
        sum_in = sum_in / mp.length;

        var total_mp = 0;
        var total_mn = 0;
        var total_ip = 0;
        var total_in = 0;

        mp.forEach((data, index) => {
            total_mp += (data - sum_mp) * (data - sum_mp);
            total_mn += (mn[index] - sum_mn) * (mn[index] - sum_mn);
            total_ip += (ips[index] - sum_ip) * (ips[index] - sum_ip);
            total_in += (ins[index] - sum_in) * (ins[index] - sum_in);
        });

        total_mp = total_mp / mp.length;
        total_mn = total_mn / mp.length;
        total_ip = total_ip / mp.length;
        total_in = total_in / mp.length;

        console.log("fp1 분산 : " + total_mp);
        console.log("fp1 표준편차 : " + Math.sqrt(total_mp));
        total_mp = Math.sqrt(total_mp);
        total_mn = Math.sqrt(total_mn);
        total_ip = Math.sqrt(total_ip);
        total_in = Math.sqrt(total_in);

        for (var i = 0; i < mp.length; i++) {
            var flag = 0;
            if (mp[i] > sum_mp + total_mp + 5 || mp[i] < sum_mp - total_mp - 5) {
                mp.splice(i, 1);
                mn.splice(i, 1);
                ips.splice(i, 1);
                ins.splice(i, 1);
                sop.splice(i, 1);
                son.splice(i, 1);
                sfp.splice(i, 1);
                sfn.splice(i, 1);
                dp.splice(i, 1);
                dn.splice(i, 1);
                resultArr.splice(i, 1);
                arrLenth--;
                flag = 1;
            }
            else if (mn[i] > sum_mn + total_mn + 5 || mn[i] < sum_mn - total_mn - 5) {
                mp.splice(i, 1);
                mn.splice(i, 1);
                ips.splice(i, 1);
                ins.splice(i, 1);
                sop.splice(i, 1);
                son.splice(i, 1);
                sfp.splice(i, 1);
                sfn.splice(i, 1);
                dp.splice(i, 1);
                dn.splice(i, 1);
                resultArr.splice(i, 1);
                arrLenth--;
                flag = 1;
            }
            else if (ips[i] > sum_ip + total_ip + 5 || ips[i] < sum_ip - total_ip - 5) {
                mp.splice(i, 1);
                mn.splice(i, 1);
                ips.splice(i, 1);
                ins.splice(i, 1);
                sop.splice(i, 1);
                son.splice(i, 1);
                sfp.splice(i, 1);
                sfn.splice(i, 1);
                dp.splice(i, 1);
                dn.splice(i, 1);
                resultArr.splice(i, 1);
                arrLenth--;
                flag = 1;
            }
            else if (ins[i] > sum_in + total_in + 5 || ins[i] < sum_in - total_in - 5) {
                mp.splice(i, 1);
                mn.splice(i, 1);
                ips.splice(i, 1);
                ins.splice(i, 1);
                sop.splice(i, 1);
                son.splice(i, 1);
                sfp.splice(i, 1);
                sfn.splice(i, 1);
                dp.splice(i, 1);
                dn.splice(i, 1);
                resultArr.splice(i, 1);
                arrLenth--;
                flag = 1;
            }
            if (flag == 1)
                i = -1;
        }

        mp.forEach((data, index) => {
            console.log("Mp : " + data + "    Mn : " + mn[index] + "    Ip : " + ips[index] + "    In : " + ins[index]);
        });
        if (mp.length >= 10)
            checkDB = true;
        else {
            count = 0;
            return 1
        }
    }
    else {
        let TwoY = null;
        TwoY = fpdata;
        console.log("TwoY 배열크기" + TwoY.length);

        // 처음 배열을 받는다면 temp로 덮어쓰고 종료
        if (temp.length == 0) {
            // 깊은 복사

            temp = JSON.parse(JSON.stringify(TwoY));
            console.log('first input!');
            return 1
            // 코드종료
        }
        else {

            var range = 700;
            var chkNum = 5;
            let check1 = 0;

            for (let i = temp.length - 1; i >= temp.length - range; i--) {

                // console.log(i+"안녕"+temp.length);
                if (isVaild(i, TwoY, chkNum)) {
                    check1 = 1;
                    console.log('배열 합치기 성공');
                    temp.splice(i - chkNum, range);
                    var result = temp.concat(TwoY);
                    temp = [];
                    break;
                }
                // console.log("성재바보");
            }
            if (check1 == 0) {
                console.log("실패")
                temp = [];
                return 1;

            }
            else {
                // console.log("1");

                var checkPoint1 = 0;
                var checkPoint2 = 0;
                var checkPoint3 = 0;
                var check = 0;
                var flag1 = 0;
                //console.log(TwoY);
                // console.log(typeof (TwoY));

                for (let i = 0; i < result.length; i++) {
                    if (result[i] <= 70 && flag1 == 0) {
                        for (let j = i; result[j] <= 100; j--) {
                            if (result[j] >= 100) {
                                checkPoint1 = j;
                                flag1 = 1;
                                console.log('z');
                                break;
                            }
                        }
                    }
                    // console.log("2");
                    if (flag1 == 1 && result[i] >= 100) {
                        console.log('qq');
                        flag1 = 2;
                        checkPoint2 = i;
                    }
                    if (flag1 == 2 && result[i] <= 100 && checkPoint2 + 10 < i) {
                        checkPoint3 = i;
                        break;
                    }
                }
                console.log(checkPoint1 + "   " + checkPoint2 + "   " + checkPoint3);

                if (checkPoint1 != 0 && checkPoint2 != 0 && checkPoint3 != 0) {
                    fp1_mkArray(result, checkPoint1, checkPoint3);
                }


                temp = JSON.parse(JSON.stringify(TwoY));

                return 1
            }
        }
    }
}

function fp2(fpdata) {
    if (checkDB_fp2 == true && inputDB_fp2 == false) {
        var max_mp = 0;
        var min_mp = 1000;
        var max_mn = 0;
        var min_mn = 1000;
        var max_ips = 0;
        var min_ips = 1000;
        var max_ins = 0;
        var min_ins = 1000;
        var max_sop = 0;
        var min_sop = 1000;
        var max_son = 0;
        var min_son = 1000;
        var max_sfp = 0;
        var min_sfp = 1000;
        var max_sfn = 0;
        var min_sfn = 1000;
        var max_dp = 0;
        var min_dp = 1000;
        var max_dn = 0;
        var min_dn = 1000;

        mp_fp2.forEach((data, index) => {
            if (max_mp < mp_fp2[index])
                max_mp = mp_fp2[index];
            if (min_mp > mp_fp2[index])
                min_mp = mp_fp2[index];
            if (max_mn < mn_fp2[index])
                max_mn = mn_fp2[index];
            if (min_mn > mn_fp2[index])
                min_mn = mn_fp2[index];
            if (max_ips < ips_fp2[index])
                max_ips = ips_fp2[index];
            if (min_ips > ips_fp2[index])
                min_ips = ips_fp2[index];
            if (max_ins < ins_fp2[index])
                max_ins = ins_fp2[index];
            if (min_ins > ins_fp2[index])
                min_ins = ins_fp2[index];
            if (max_sop < sop_fp2[index])
                max_sop = sop_fp2[index];
            if (min_sop > sop_fp2[index])
                min_sop = sop_fp2[index];
            if (max_son < son_fp2[index])
                max_son = son_fp2[index];
            if (min_son > son_fp2[index])
                min_son = son_fp2[index];
            if (max_sfp < sfp_fp2[index])
                max_sfp = sfp_fp2[index];
            if (min_sfp > sfp_fp2[index])
                min_sfp = sfp_fp2[index];
            if (max_sfn < sfn_fp2[index])
                max_sfn = sfn_fp2[index];
            if (min_sfn > sfn_fp2[index])
                min_sfn = sfn_fp2[index];
            if (max_dp < dp_fp2[index])
                max_dp = dp_fp2[index];
            if (min_dp > dp_fp2[index])
                min_dp = dp_fp2[index];
            if (max_dn < dn_fp2[index])
                max_dn = dn_fp2[index];
            if (min_dn > dn_fp2[index])
                min_dn = dn_fp2[index];
        });

        var Stringquery = "INSERT INTO LOGINEOGFP2 VALUES(" + userNum + ", " + min_mp + ", " + max_mp + ", " + min_mn + ", " + max_mn + ", " + min_ips + ", " + max_ips + ", " + min_ins + ", " + max_ins + ", " + min_sop + ", " + max_sop + ", " + min_son + ", " + max_son + ", " + min_sfp + ", " + max_sfp + ", " + min_sfn + ", " + max_sfn + ", " + min_dp + ", " + max_dp + ", " + min_dn + ", " + max_dn + ");";
        client.query(Stringquery);
        inputDB_fp2 = true;
        return 4
    }
    else if (checkDB_fp2 == true && inputDB_fp2 == true) {
        return 4
    }
    else if (arrLenth_fp2 >= 15 && checkDB_fp2 == false) {
        resultArr_fp2.forEach((y) => {
            getG1(y, mp_fp2, mn_fp2, ips_fp2, ins_fp2, count_fp2++);
        });
        count_fp2 = 0;
        resultArr_fp2.forEach((y) => {
            getG3(y, mp_fp2, mn_fp2, ips_fp2, ins_fp2, sop_fp2, son_fp2, sfp_fp2, sfn_fp2, dp_fp2, dn_fp2, count_fp2++);
        });
        var sum_mp = 0;
        var sum_mn = 0;
        var sum_ip = 0;
        var sum_in = 0;

        for (var i = 0; i < mp_fp2.length; i++) {
            var flag = 0;
            if (mp_fp2[i] == 0 || mp_fp2[i] == 1 || mn_fp2[i] == 199 || mn_fp2[i] == 200) {
                console.log("삭제");
                mp_fp2.splice(i, 1);
                mn_fp2.splice(i, 1);
                ips_fp2.splice(i, 1);
                ins_fp2.splice(i, 1);
                sop_fp2.splice(i, 1);
                son_fp2.splice(i, 1);
                sfp_fp2.splice(i, 1);
                sfn_fp2.splice(i, 1);
                dp_fp2.splice(i, 1);
                dn_fp2.splice(i, 1);
                resultArr_fp2.splice(i, 1);
                arrLenth_fp2--;
                flag = 1;
            }
            if (flag == 1)
                i = -1;
        }

        for (var i = 0; i < mp_fp2.length - 1; i++) {
            var flag = 0;
            if (mp_fp2[i] == mp_fp2[i + 1] && mn_fp2[i] == mn_fp2[i + 1] && ips_fp2[i] == ips_fp2[i + 1] && ins_fp2[i] == ins_fp2[i + 1]) {
                mp_fp2.splice(i, 1);
                mn_fp2.splice(i, 1);
                ips_fp2.splice(i, 1);
                ins_fp2.splice(i, 1);
                sop_fp2.splice(i, 1);
                son_fp2.splice(i, 1);
                sfp_fp2.splice(i, 1);
                sfn_fp2.splice(i, 1);
                dp_fp2.splice(i, 1);
                dn_fp2.splice(i, 1);
                resultArr_fp2.splice(i, 1);
                arrLenth_fp2--;
                flag = 1;
            }
            if (flag == 1)
                i = -1;
        }

        mp_fp2.forEach((data, index) => {
            sum_mp += mp_fp2[index];
            sum_mn += mn_fp2[index];
            sum_ip += ips_fp2[index];
            sum_in += ins_fp2[index];
        });

        console.log("합계 : " + sum_mp);
        sum_mp = sum_mp / mp_fp2.length;
        sum_mn = sum_mn / mp_fp2.length;
        sum_ip = sum_ip / mp_fp2.length;
        sum_in = sum_in / mp_fp2.length;

        var total_mp = 0;
        var total_mn = 0;
        var total_ip = 0;
        var total_in = 0;

        mp_fp2.forEach((data, index) => {
            total_mp += (data - sum_mp) * (data - sum_mp);
            total_mn += (mn_fp2[index] - sum_mn) * (mn_fp2[index] - sum_mn);
            total_ip += (ips_fp2[index] - sum_ip) * (ips_fp2[index] - sum_ip);
            total_in += (ins_fp2[index] - sum_in) * (ins_fp2[index] - sum_in);
        });

        total_mp = total_mp / mp_fp2.length;
        total_mn = total_mn / mp_fp2.length;
        total_ip = total_ip / mp_fp2.length;
        total_in = total_in / mp_fp2.length;

        console.log("fp2 분산 : " + total_mp);
        console.log("fp2 표준편차 : " + Math.sqrt(total_mp));
        total_mp = Math.sqrt(total_mp);
        total_mn = Math.sqrt(total_mn);
        total_ip = Math.sqrt(total_ip);
        total_in = Math.sqrt(total_in);

        for (var i = 0; i < mp_fp2.length; i++) {
            var flag = 0;
            if (mp_fp2[i] > sum_mp + total_mp + 5 || mp_fp2[i] < sum_mp - total_mp - 5) {
                mp_fp2.splice(i, 1);
                mn_fp2.splice(i, 1);
                ips_fp2.splice(i, 1);
                ins_fp2.splice(i, 1);
                sop_fp2.splice(i, 1);
                son_fp2.splice(i, 1);
                sfp_fp2.splice(i, 1);
                sfn_fp2.splice(i, 1);
                dp_fp2.splice(i, 1);
                dn_fp2.splice(i, 1);
                resultArr_fp2.splice(i, 1);
                arrLenth_fp2--;
                flag = 1;
            }
            else if (mn_fp2[i] > sum_mn + total_mn + 5 || mn_fp2[i] < sum_mn - total_mn - 5) {
                mp_fp2.splice(i, 1);
                mn_fp2.splice(i, 1);
                ips_fp2.splice(i, 1);
                ins_fp2.splice(i, 1);
                sop_fp2.splice(i, 1);
                son_fp2.splice(i, 1);
                sfp_fp2.splice(i, 1);
                sfn_fp2.splice(i, 1);
                dp_fp2.splice(i, 1);
                dn_fp2.splice(i, 1);
                resultArr_fp2.splice(i, 1);
                arrLenth_fp2--;
                flag = 1;
            }
            else if (ips_fp2[i] > sum_ip + total_ip + 5 || ips_fp2 < sum_ip - total_ip - 5) {
                mp_fp2.splice(i, 1);
                mn_fp2.splice(i, 1);
                ips_fp2.splice(i, 1);
                ins_fp2.splice(i, 1);
                sop_fp2.splice(i, 1);
                son_fp2.splice(i, 1);
                sfp_fp2.splice(i, 1);
                sfn_fp2.splice(i, 1);
                dp_fp2.splice(i, 1);
                dn_fp2.splice(i, 1);
                resultArr_fp2.splice(i, 1);
                arrLenth_fp2--;
                flag = 1;
            }
            else if (ins_fp2[i] > sum_in + total_in + 5 || ins_fp2[i] < sum_in - total_in - 5) {
                mp_fp2.splice(i, 1);
                mn_fp2.splice(i, 1);
                ips_fp2.splice(i, 1);
                ins_fp2.splice(i, 1);
                sop_fp2.splice(i, 1);
                son_fp2.splice(i, 1);
                sfp_fp2.splice(i, 1);
                sfn_fp2.splice(i, 1);
                dp_fp2.splice(i, 1);
                dn_fp2.splice(i, 1);
                resultArr_fp2.splice(i, 1);
                arrLenth_fp2--;
                flag = 1;
            }
            if (flag == 1)
                i = -1;
        }


        mp_fp2.forEach((data, index) => {
            console.log("Mp : " + data + "    Mn : " + mn_fp2[index] + "    Ip : " + ips_fp2[index] + "    In : " + ins_fp2[index]);
        });
        if (mp_fp2.length >= 10)
            checkDB_fp2 = true;
        else {
            count_fp2 = 0;
            return 1
        }
    }
    else {
        let ThreeY = null;
        ThreeY = fpdata;
        console.log("ThreeY 배열크기" + ThreeY.length);

        // 처음 배열을 받는다면 temp_fp2로 덮어쓰고 종료
        if (temp_fp2.length == 0) {
            // 깊은 복사

            temp_fp2 = JSON.parse(JSON.stringify(ThreeY));
            console.log('first input!');
            return 1
            // 코드종료
        }
        else {
            //배열 합치기

            var range = 700;
            var chkNum = 5;
            let check1 = 0;

            for (let i = temp_fp2.length - 1; i >= temp_fp2.length - range; i--) {

                if (isVaild_fp2(i, ThreeY, chkNum)) {
                    check1 = 1;
                    console.log('배열 합치기 성공');
                    temp_fp2.splice(i - chkNum, range);
                    var result = temp_fp2.concat(ThreeY);
                    temp_fp2 = [];
                    break;
                }
            }
            if (check1 == 0) {
                console.log("실패")
                temp_fp2 = [];
                return 1

            }
            else {
                var checkPoint1 = 0;
                var checkPoint2 = 0;
                var checkPoint3 = 0;
                var check = 0;
                var flag1 = 0;

                for (let i = 0; i < result.length; i++) {
                    if (result[i] <= 70 && flag1 == 0) {
                        for (let j = i; result[j] <= 100; j--) {
                            if (result[j] >= 100) {
                                checkPoint1 = j;
                                flag1 = 1;
                                console.log('z');
                                break;
                            }
                        }
                    }
                    // console.log("2");
                    if (flag1 == 1 && result[i] >= 100) {
                        console.log('qq');
                        flag1 = 2;
                        checkPoint2 = i;
                    }
                    if (flag1 == 2 && result[i] <= 100 && checkPoint2 + 10 < i) {
                        checkPoint3 = i;
                        break;
                    }
                }
                console.log(checkPoint1 + "   " + checkPoint2 + "   " + checkPoint3);

                if (checkPoint1 != 0 && checkPoint2 != 0 && checkPoint3 != 0) {
                    // 뽑은 특징 배열 저장.
                    fp2_mkArray(result, checkPoint1, checkPoint3)
                }

                temp_fp2 = JSON.parse(JSON.stringify(ThreeY));

                return 1
            }
        }
    }
}

function fp1_mkArray(result, checkPoint1, checkPoint3) {
    resultArr[arrLenth++] = result.slice(checkPoint1, checkPoint3);

    //console.log(resultArr[arrLenth-1]);
    console.log(arrLenth);
}

function fp2_mkArray(result, checkPoint1, checkPoint3) {
    resultArr_fp2[arrLenth_fp2++] = result.slice(checkPoint1, checkPoint3);

    console.log(resultArr_fp2[arrLenth_fp2 - 1]);
    console.log(arrLenth_fp2);
}

function getG1(y, mp, mn, ips, ins, count) {
    let max = 100; let maxX = 0;
    let min = 100; let minX = 0;
    var a = "";
    for (let i = 0; i < y.length; i++) {
        if (max > y[i]) {
            max = y[i];
            mp[count] = max;
            maxX = i;
        }
    }

    for (let i = 0; i < y.length; i++) {
        if (min < y[i]) {
            min = y[i];
            mn[count] = min;
            minX = i;
        }
    }

    let ip = maxX;
    ips[count] = ip;
    let in1 = 0;

    let check = 0;
    for (let i = 0; i < y.length; i++) {
        if (i > maxX + 2 && y[i] >= 100) {
            in1 = minX - i;

            //console.log("aa");
            //in1 = j;
            check = 1;
            break;
        }
        if (check == 1)
            break;
    }

    in1 = minX - in1;
    ins[count] = in1;
    console.log(maxX + "   " + minX);
    console.log("Mp : " + max + "    Mn : " + min + "    Ip : " + ip + "    In : " + in1);
}

function getG3(y, mp, mn, ips, ins, sop, son, sfp, sfn, dp, dn, count) {
    var temp_sop = mp[count] / ips[count];
    var temp_son = mn[count] / ins[count];
    sop[count] = temp_sop;
    son[count] = temp_son;
    var temp_index = 10000;
    var temp_index2 = 10000;
    var temp_dn = 0;
    var flag1 = false;
    var flag2 = false;
    var flag3 = false
    y.some((data, index) => {
        if (flag3 == true)
            return true
        if (data == mp[count] && flag1 == false) {
            temp_index = index;
            flag1 = true;
        }
        else if (index > temp_index && data >= 100 && flag1 == true && flag2 == false) {
            var temp_sfp = (index - temp_index) / mp[count];
            sfp[count] = temp_sfp;
            var temp_dp = index;
            temp_dn = y.length - 1 - index;
            console.log(temp_dn);
            dp[count] = temp_dp;
            dn[count] = temp_dn;
            flag2 = true;
        }
        else if (index > temp_index && data == mn[count] && flag2 == true && flag3 == false) {
            temp_index2 = index;
            var temp_sfn = (temp_dn - ins[count]) / mn[count];
            sfn[count] = temp_sfn;
            flag3 = true;
        }
    });
}

module.exports = router;

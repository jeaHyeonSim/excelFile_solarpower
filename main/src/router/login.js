const express = require('express');
const router = express.Router();
var requestIp = require('request-ip');
const login = require("../services/login");
const LoginService = new login();

router.get('/', (req, res) => {
   if(!!req.session.loginInfo) {
        return res.redirect('/monitoring');
   } else return res.redirect('/login');
});

router.get('/login', (req, res) =>   {
        let errMsg = req.flash("errMsg");
        let userID = req.flash("userID");
        if(errMsg == []) {
            errMsg = "";
        }
        if(userID == []) {
            userID = "";
        }
        res.render('login', {
            errMsg: errMsg,
            userID : userID
        });
    }
);

router.post('/login', async (req, res) => {
    try {
        const userDTO = {
            userId : req.body.userId,
            userPw : req.body.userPw,
        };
        const loginInfo = await LoginService.login(userDTO);
        loginInfo.ip = requestIp.getClientIp(req);

        const menulist = await LoginService.getUserMenuList(loginInfo);
        const acesslist = await LoginService.getUseAcessList(loginInfo);
        req.session.loginInfo = loginInfo;

        // 유저 발전소 검색
        const userPowerPlantInfo = await LoginService.getPowerPlantInfo(userDTO.userId);

        await LoginService.insertLoginHistory(loginInfo);
        req.session.userPowerPlantInfo = userPowerPlantInfo;
        req.session.menulist = menulist;
        req.session.acesslist = acesslist;

        req.session.save( (err) => {
            return res.redirect("/monitoring");
            // return res.redirect("/monitoring-statistics"); 
        });

    } catch (err) {
        switch(err.message) {
            case 'notfound':
                req.flash("errMsg", "사용자를 찾을 수 없습니다."); 
                break;
            case 'loginfail': 
                req.flash("errMsg", "아이디 또는 패스위드가 다릅니다.");  
                break;
            default: 
                req.flash("errMsg","로그인할 수 없습니다. 관리자에게 문의해주세요."); 
                break;
        }
        req.flash("userID", req.body.userId);
        res.redirect("/login");
    }
});

router.get('/logout', (req, res) => {
    if(!!req.session.loginInfo) {
        LoginService.insertLogoutHistory(req.session.loginInfo);
    }
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
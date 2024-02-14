const login = require("../models/login");
const crypto = require('crypto');
const LoginModel = new login();

class Login {
    async login(userDTO) {
        let loginInfo = await LoginModel.login(userDTO);
        if (loginInfo == undefined) throw new Error("notfound");
        if (loginInfo.pw != hashPassword(userDTO.userPw, String(loginInfo.salt))) {
            throw new Error("loginfail");
        }
        return loginInfo;
    }
    async insertLoginHistory(loginInfo) {
        await LoginModel.insertLoginHistory(loginInfo);
    }
    async insertLogoutHistory(loginInfo) {
        await LoginModel.insertLogoutHistory(loginInfo);
    }
    async getUserMenuList(loginInfo) {
        return await LoginModel.getUserMenuList(loginInfo);
    }
    async getUseAcessList(loginInfo) {
        return await LoginModel.getUseAcessList(loginInfo);
    }
    async getPowerPlantInfo(userDTO) {
        return await LoginModel.getPowerPlantInfo(userDTO);
    }
}

function hashPassword(password, salt) {
    // const salt = crypto.randomBytes(32).toString('hex')
    return crypto.pbkdf2Sync(password, salt, 1, 32, 'sha512').toString('hex');
}


module.exports = Login;
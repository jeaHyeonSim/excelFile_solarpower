const { transactionQuery, query } = require("../loaders/db");
const { logger } = require("../config/winston");
class LoginModel {
    async login(userDTO) {
        try {
            let loginInfo = await query("SELECT * FROM user_info WHERE admin_id = ?", userDTO.userId);
            return loginInfo[0];
        } catch (error) {
            console.log(error);
            logger.error(error);
            throw new Error('dberror');
        }
    }
    async getPowerPlantInfo(userDTO) {
        try {
            let userPowerPlantInfo = await query(
                `SELECT A.*, B.powerplantName, B.address FROM user_powerplant A LEFT JOIN powerplant_info B ON A.powerplantId = B.powerplantId
                WHERE A.admin_id = ?
                AND B.use_yn = 'Y'
                ORDER BY A.seq asc `
                , userDTO);
            return userPowerPlantInfo;
        } catch (error) {
            logger.error(error);
            throw new Error('dberror');
        }
    }
    async insertLoginHistory(loginInfo) {
        await transactionQuery(`
                insert into login_log (
                    CONECT_ID, 
                    CONECT_IP, 
                    CONECT_MTHD,    
                    CREAT_DT
                ) values (
                    '${loginInfo.esntl_id}',
                    '${loginInfo.ip}',
                    'IN',
                    now()
                )`);

    }
    async insertLogoutHistory(loginInfo) {
        await query(`
            insert into login_log (
                CONECT_ID, 
                CONECT_IP, 
                CONECT_MTHD, 
                CREAT_DT
            ) values (
                '${loginInfo.esntl_id}',
                '${loginInfo.ip}',
                'OUT',
                now()
            );
        `);
    }
    async getUserMenuList(loginInfo) {
       return await query(`
        select * from menu_info
        where MENU_NO IN (select MENU_NO from menu_auth
                          where AUTHOR_CODE = (select AUTHOR_CODE from user_auth
                                               where SCRTY_DTRMN_TRGET_ID = (select esntl_id from user_info where admin_id ='${loginInfo.admin_id}')));
        `);
    }
    async getUseAcessList(loginInfo) {
       return await query(`
       select b.* from
       (select * from auth_roll_mapping
       where AUTHOR_CODE = (select AUTHOR_CODE from user_auth where SCRTY_DTRMN_TRGET_ID = (select esntl_id from user_info where admin_id = '${loginInfo.admin_id}'))) a 
       left join auth_roll_info b
       on a.ROLE_CODE = b.ROLE_CODE;
        `);
    }
}

module.exports = LoginModel;
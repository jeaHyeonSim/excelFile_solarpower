
const login = require("../services/login");
const LoginService = new login();

module.exports = async (req, res, next) => {
    var result = false;
    const accessList = req.session.acesslist;

    accessList.forEach(element => {
        menuArr = element.ROLE_PTTRN.split("/");
        pathArr = req._parsedOriginalUrl.path.split("/");
        console.log(menuArr);
        console.log(pathArr);
        for (let index = 0; index < menuArr.length; index++) {
            const menuIndex = menuArr[index];
            const pathIndex = pathArr[index];
            
            if(menuIndex != "*" && menuIndex != pathIndex) {
                continue;
            };  

            if(index == menuArr.length-1) {
                result = true;
            } 
        }
    });

    if(result) next();
    else res.render("errors/noPermission");
}
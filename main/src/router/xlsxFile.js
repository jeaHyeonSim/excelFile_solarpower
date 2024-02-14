const express = require('express');
const router = express.Router();
const convert = require('xml-js');
const fs = require('fs');
const path = require('path');


/* ============ xlsx파일 읽고 ⇒ json 변환 ⇒ json파일로 저장하기 ============ */
router.get('/', async (req, res) => {
    const xlsx = require('xlsx');
    const path = require('path');
    const fs = require('fs');
    const resData = {};
    try {
        console.log("xlsx 파일 읽기");
        let pathFiles = path.join(__dirname, '../webapp/public/assets', '2024KTC인증 데이터.xlsx');
        const workbook = xlsx.readFile(pathFiles);
        const sheetnames = Object.keys(workbook.Sheets);
    
        let i = sheetnames.length;
    
        while (i--) {
            const sheetname = sheetnames[i];
            // 시트를 JSON으로 변환합니다. 날짜를 그대로 유지하기 위해 raw: false 옵션을 사용합니다.
            resData[sheetname] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname], { raw: false });
        }
        console.log("xlsx => json 저장");
        let pathFiles2 = path.join(__dirname, '../webapp/public/assets');
        fs.writeFileSync(`${pathFiles2}/2024_02.json`,  JSON.stringify(resData));

    } catch (error) {
        console.log("xlsx 파일 ERROR");
        console.log(error);
    }

});






module.exports = router;
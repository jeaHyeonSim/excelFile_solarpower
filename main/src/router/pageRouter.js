const express = require('express');
const router = express.Router();


router.get('/', async function (req, res) {
	try {
		res.render('isExcelFile');
		// res.render('2023', {
        //     menu :"2023"
		// });
		
	} catch (error) {
		return(error);
	}
});

router.get('/xlsxTojson', async function (req, res) {
	try {
		res.render('xlsxTojson', {
            menu :"xlsxTojson"
		});
		
	} catch (error) {
		return(error);
	}

});

// router.get('/2024_02_01', async function (req, res) {
// 	let UpToMinutes = 0;
// 	let isTimeLimit = "false";
// 	let file = '/assets/sh0003.xlsx';
// 	try {
// 		res.render('2024', {
//             menu :"2024_02_01",
// 			UpToMinutes,
// 			isTimeLimit,
// 			file,
// 		});
		
// 	} catch (error) {
// 		return(error);
// 	}

// });
// router.get('/2024_02_02', async function (req, res) {
// 	let UpToMinutes = 6;
// 	let isTimeLimit = "true";
// 	let file = '/assets/sh0002.xlsx';
// 	try {
// 		res.render('2024', {
//             menu :"2024_02_02",
// 			UpToMinutes,
// 			isTimeLimit,
// 			file,
// 		});
		
// 	} catch (error) {
// 		return(error);
// 	}

// });









module.exports = router;
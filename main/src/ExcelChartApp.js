// Module dependencies.
const express = require('express'),
	session = require('express-session'),
	MemoryStore = require('memorystore')(session),
	methodOverride = require('method-override'),
	// bodyParser = require('body-parser'),
	flash = require('connect-flash'),
	path = require('path'),
	ejs = require('ejs'),
	// pool = require("./loaders/db"),
	properties = require("./config/properties"),
	{ logger } = require("./config/winston"),
	morgan = require('morgan');

// All environments
const app = express()
	.set('views', path.join(__dirname, 'webapp/views'))
	// .set('view engine', 'ejs')
	.engine('html', require('ejs').renderFile)
	.set('view engine', 'html')
	.use(express.static(__dirname + '/webapp/public'))
	.use('/jquery', express.static(__dirname + '/../node_modules/jquery/dist'))
	.use('/jquery-ui', express.static(__dirname + '/../node_modules/jquery-ui/dist'))
	.use('/axios', express.static(__dirname + '/../node_modules/axios/dist'))
	.use('/datetimepicker', express.static(__dirname + '/../node_modules/jquery-datetimepicker'))
	.use('/chartJs', express.static(__dirname + '/../node_modules/chart.js/dist'))
	.use('/moment', express.static(__dirname + '/../node_modules/moment/min'))
	// .use(bodyParser.json())
	// .use(bodyParser.urlencoded({ extended: false }))
	.use(methodOverride('_method'))
	.use(flash())
	.use(session({
		key : 'greenfesco-secret-key-9099',
		secret: 'greenfesco-secret-key',
		resave: false,
		saveUninitialized: true,
		store: new MemoryStore({ checkPeriod: properties.session_time }),
		cookie: {
			//   maxAge:  properties.cookie_time,
		}
	}));

// Routes
// write logger files
if (properties.env !== "prod") app.use(morgan("tiny", {
	skip: (req, res) => {
		if (req.url.indexOf("/imgs")) return false;
		if (req.url.indexOf("/css")) return false;
		if (req.url.indexOf("/js")) return false;
		if (req.url.indexOf("/plugin")) return false;
		if (req.url.indexOf("/fonts")) return false;
		if (req.url.indexOf("/chartJs")) return false;
		return true;
	},
	stream: logger.stream
}));

// const checkLogin = require('./middleware/checkLogin');

// 미들웨어 공통정보
app.use(function (req, res, next) {
	// res.locals.loginInfo = req.session.loginInfo;
	// res.locals.menulist = req.session.menulist;
	next();
});

// 로그인 인증

app.use('/', require("./router/pageRouter"));
app.use('/xlsxFile', require("./router/xlsxFile"));

// 통계 화면
// app.use('/monitoringStatistics', require('./router/monitoringStatistics'));


// 404 page 처리
app.all('*', function (req, res) {
	res.render('errors/notFound', {
		msg: "죄송합니다. 관리자에게 문의하여 주시기 바랍니다."
	});
});

// Error Handling
app.use((err, req, res, next) => {
	logger.log(err.stack)
	res.render('errors/notFound', {
		msg: "죄송합니다. 관리자에게 문의하여 주시기 바랍니다."
	});
});



app.listen(properties.server_port, () => logger.info('greenfesco server on!' + " http://" + properties.server_ip + ":" + properties.server_port));

$('.menuBox > .menuUl > li').on('click', function(e) {
    let dataObj = $(this).data().obj;
    UpToMinutes = dataObj.UpToMinutes;
	isTimeLimit = dataObj.isTimeLimit;
	file = dataObj.file;
	divNum = dataObj.divNum;

    $('.menuBox > .menuUl > li').removeClass("active");
    $(this).addClass("active");

    fileRead();
});

function firstInit() {
    return new Promise((resolve, reject) => {
        // 함수 1의 실행 코드
        $('.menuBox > .menuUl > li').removeClass("active");
        let $firstLi = $('.menuBox > .menuUl > li');
        $firstLi.eq(0).addClass("active");
        let dataObj = $firstLi.eq(0).data().obj;
        UpToMinutes = dataObj.UpToMinutes;
        isTimeLimit = dataObj.isTimeLimit;
        file = dataObj.file;
        divNum = dataObj.divNum;
        resolve();
    });
}



(function () {
    firstInit().then(fileRead());
    getDataTime(); 
    let timerId = setTimeout(function tick() {
        getDataTime();
        timerId = setTimeout(tick, 1000);
    }, 1000);
})();
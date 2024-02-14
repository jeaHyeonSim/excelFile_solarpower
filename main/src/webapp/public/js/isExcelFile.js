let time = [];
let wpE1 = [];
let wpE2 = [];
let divNum = 10; // 데이터 갯수가 너무 많기 때문에 단위로 끈었음.

class SliceFn {
    constructor(data) {
        this.time = data.time;
        this.wpE1 = data.wpE1;
        this.wpE2 = data.wpE2;
        this.divNum = data.divNum;
    }
    sliceTime(list, name) {
        let listRs = [];
        let sum = 0;
        let cnt = 0;
        for (let i = 0; i < list.length + 1; i++) {
            if (cnt < this.divNum) {
                cnt++;
            } else {
                listRs.push(list[i].slice(-5));
                sum = 0;
                cnt = 0;
            }
        }
        return listRs;
    }

    slicezz(list, name) {
        // console.log(list);
        let listRs = [];
        let sum = 0;
        let cnt = 0;
        for (let i = 0; i < list.length + 1; i++) {
            if (cnt < this.divNum) {
                cnt++;
            } else {
                listRs.push(Number(list[i]).toFixed(2));
                sum = 0;
                cnt = 0;
            }
        }
        return listRs;
    }
}

/**
 * 차트 옵션
 * 스트링별 전력량 비교 데이터 그래프로 만들기 위함
 * @param {arr} chartData 
 */
let setStringModChartConfig = (chartData) => {
    let config = {
        type: 'bar',
        data: {
            labels: ['05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
            datasets: [{
                label: '발전량',
                fill: true,
                backgroundColor: "rgba(254, 215, 245, 0.3)",
                borderColor: 'rgba(254, 215, 245, 1)',
                data: chartData
            }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 16,
                            weight: 600,
                        },
                        color: '#fff'
                    }
                },

            },
            elements: {
                line: {
                    borderWidth: 2, // 라인 넓이
                    borderCapStyle: 'round', // 라인 끝 스타일
                    tension: 0.4 // 곡선
                },
            },
            animation: {
                duration: 0
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: "발  전  량 [ K W ]",
                        font: {
                            size: 12,
                            weight: 'bold',
                        },
                        color: 'white'
                    },
                    display: true,
                    min: 0,
                    max: 600,
                    ticks: {
                        stepSize: 10,
                        color: "#fff",
                        font: {
                            size: 10
                        },
                        padding: 3,
                    },
                    grid: {
                        color: "rgba(132, 133, 142, 0.6)",
                        drawTicks: false,
                    }
                },
                x: {
                    display: true,
                    ticks: {
                        color: "#fff",
                        font: {
                            size: 12
                        },
                        padding: 7,
                    },
                }
            }
        }
    };
    return config;
}

/**
* 그래프 생성
*/
let graphId = document.getElementById('line_graph');
let stringModChart = function (chartData) {
    return new Chart(graphId, setStringModChartConfig(chartData));
}();

const setStringModChartData = async () => {
    let sliceFn = new SliceFn({
        time,wpE1,wpE2,divNum
    });
    let timeData = await sliceFn.sliceTime(time, 'time');
    let wpE1Data = await sliceFn.slicezz(wpE1, 'wpE1');
    let wpE2Data = await sliceFn.slicezz(wpE2, 'wpE2');
    let dataList = [wpE1Data, wpE2Data];
    let label = [];
    for (let i = 0; i < wpE2Data.length; i++) {
        label.push(timeData[i]);
    }
    let labelName = ['MLPE부착 스트링', '일반 스트링']
    let colorList = [
        // [
        //     "rgba(40, 144, 90, 0.3)",
        //     'rgba(40, 144, 90, 1)'
        // ], 
        [

            "rgba(254, 255, 137,1)",
            'rgba(254, 255, 137, 1)'
        ],
        // [

        //     "rgba(181, 15, 92, 0.3)",
        //     'rgba(181, 15, 92, 1)'
        // ],
        [
            "rgba(254, 215, 245,1)",
            'rgba(254, 215, 245, 1)'
        ]
    ];

    let datasetItemList = [];
    for (let i = 0; i < 2; i++) {
        datasetItemList.push({
            label: labelName[i],
            fill: false,
            backgroundColor: colorList[i][1],
            borderColor: colorList[i][0],
            data: dataList[i],
            borderWidth: 1
        });

    }


    stringModChart.data.labels = label;
    stringModChart.data.datasets = datasetItemList;
    stringModChart.update();
}





/**
 * 차트 옵션
 * @param {arr} chartData 
 */
let setChartConfig2 = (chartData) => {
    let config = {
        type: 'bar',
        data: {
            labels: ['05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
            datasets: [{
                label: '발전량',
                fill: true,
                backgroundColor: "rgba(254, 215, 245, 0.3)",
                borderColor: 'rgba(254, 215, 245, 1)',
                data: chartData
            }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 16,
                            weight: 600,
                        },
                        color: '#fff'
                    }
                },
            },
            elements: {
                line: {
                    borderWidth: 2, // 라인 넓이
                    borderCapStyle: 'round', // 라인 끝 스타일
                    tension: 0.4 // 곡선
                },
            },
            animation: {
                duration: 0
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                'y-left': {
                    type: 'linear', // ? 'linear' : 'logarithmic',
                    title: {
                        display: true,
                        text: "백 분 율",
                        font: {
                            size: 12,
                            weight: 'bold',
                        },
                        color: 'white'
                    },
                    display: true,
                    min: 0,
                    max: 30,
                    position: 'left',
                    ticks: {
                        stepSize: 1,
                        color: "#fff",
                        font: {
                            size: 14
                        },
                        padding: 3,
                    },
                    grid: {
                        color: "rgba(132, 133, 142, 0.6)",
                        drawTicks: false,
                    }
                },
                'y-right': {
                    type: 'linear',
                    title: {
                        display: true,
                        font: {
                            size: 12,
                        },
                    },
                    display: true,
                    min: 0,
                    max: 30,
                    position: 'right',
                    ticks: {
                        stepSize: 1,
                        color: "#fff",
                        font: {
                            size: 14
                        },
                        padding: 3,
                    },
                    grid: {
                        display: false,
                    }
                },
                x: {
                    display: true,
                    ticks: {
                        color: "#fff",
                        font: {
                            size: 12
                        },
                        padding: 7,
                    },
                }
            }
        }
    };
    return config;
}

/**
* 그래프 생성
*/
let graphId2 = document.getElementById('line_graph2');
let stringModChart2 = function (chartData) {
    return new Chart(graphId2, setChartConfig2(chartData));
}();

const setChartData = async () => {
    let sliceFn = new SliceFn({
        time,wpE1,wpE2,divNum
    });
    let timeData = await sliceFn.sliceTime(time, 'time');
    let wpE1Data = await sliceFn.slicezz(wpE1, 'wpE1');
    let wpE2Data = await sliceFn.slicezz(wpE2, 'wpE2');

    let wpEDataAvg = [];
    for (let i = 0; i < wpE1Data.length; i++) {
        let a = Number(wpE1Data[i]);
        let b = Number(wpE2Data[i]);
        wpEDataAvg.push(Number(((a / b) * 100 - 100).toFixed(1)));

    }
    // console.log(wpEDataAvg);
    let dataList = [wpEDataAvg];
    let label = [];
    for (let i = 0; i < wpEDataAvg.length; i++) {
        label.push(timeData[i]);

    }
    let labelName = ['발전 효율 개선율 %']
    let colorList = [
        [
            "rgba(254, 255, 137, 0.3)",
            'rgba(254, 255, 137, 1)'
        ],
    ];

    let datasetItemList = [];
    for (let i = 0; i < 1; i++) {
        datasetItemList.push({
            label: labelName[i],
            fill: false,
            // yAxisID: 'y-left',
            backgroundColor: colorList[i][1],
            borderColor: colorList[i][0],
            data: dataList[i],
            borderWidth: 1
        });

    }


    stringModChart2.data.labels = label;
    stringModChart2.data.datasets = datasetItemList;
    stringModChart2.update();
}

function fileRead(){

    // xlsx 파일을 읽어옵니다.s
    const reader = new FileReader();

    reader.onload = function (event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // 첫 번째 시트를 가져옵니다.
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // 시트를 JSON으로 변환합니다. 날짜를 그대로 유지하기 위해 raw: false 옵션을 사용합니다.
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

        // 열 이름별로 데이터를 분리합니다.
        const separatedData = {};
        time = [];
        wpE1 = [];
        wpE2 = [];
        jsonData.forEach(row => {
            if(isTimeLimit) {
                var time1 =  moment(`00:0${UpToMinutes}:00`, 'HH:mm:ss');
            }
            // moment("00:05:00", 'HH:mm:ss') > moment("00:04:59", 'HH:mm:ss')
            Object.keys(row).forEach(column => {

                if (!separatedData[column]) {
                    separatedData[column] = [];
                }
                separatedData[column].push(row[column]);
                if(isTimeLimit) {
                    var time2 =   moment(row['Time-E1'], 'HH:mm:ss');
                    if(time1 > time2) {
                        if (column == "Time-E1") {
                            time.push(row[column]);
                        }
                        if (column == "WP+-E1[Wh]") {
                            wpE1.push(row[column]);
                        }
                        if (column == "WP+-E2[Wh]") {
                            wpE2.push(row[column]);
                        }
                    }
                }else {
                    if (column == "Time-E1") {
                        time.push(row[column]);
                    }
                    if (column == "WP+-E1[Wh]") {
                        wpE1.push(row[column]);
                    }
                    if (column == "WP+-E2[Wh]") {
                        wpE2.push(row[column]);
                    }
                }
            });
        });
        // 변환된 JSON 데이터를 출력합니다.
        // console.log(jsonData);
        // console.log(separatedData);
        // console.log(time, wpE1, wpE2);


        setChartData();
        setStringModChartData();
    };

    // 파일을 읽어옵니다.
    fetch(file)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
            const data = new Uint8Array(arrayBuffer);
            reader.readAsArrayBuffer(new Blob([data]));
        })
        .catch(error => console.error('파일을 읽는 중 오류가 발생했습니다:', error));
}


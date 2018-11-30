$(function () {

    
})

$(function () {
    var myChart = echarts.init(document.querySelector(".chart_left"));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['销量', "人数"]
        },
        xAxis: {
            data: ["Jan", "Feb", "Marc", "Apri", "May", "Jane"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }, {
            name: '人数',
            type: 'bar',
            data: [50, 10, 30, 19, 23, 54]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option1);

    var myChart = echarts.init(document.querySelector(".chart_right"));
    option2 = {
        legend: {
            data: ['阿迪达斯', '老爹鞋', '特步', '李宁', '361°'],
            orient: 'vertical',
            left: "left"
        },
        title: {
            text: "热门品牌销售",
            left: 'center',
            subtext: '2018年11月'
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ["50%", "60%"],
                data: [
                    { value: 235, name: '阿迪达斯' },
                    { value: 274, name: '老爹鞋' },
                    { value: 310, name: '特步' },
                    { value: 335, name: '李宁' },
                    { value: 400, name: '361°' }
                ]
            }
        ]
    };
    myChart.setOption(option2);
})
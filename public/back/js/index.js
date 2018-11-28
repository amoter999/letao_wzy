$(function () {


    // 基于准备好的dom，初始化echarts实例
    var chart_left = echarts.init(document.querySelector('.chart-left'));
    // 绘制图表
    chart_left.setOption({
        title: {
            text: '2018年注册人数',
            left: 'left'
        },
        tooltip: {},
        legend: {
            data: ['人数', '销量']
        },
        xAxis: {
            data: ['Jau', 'Feb', 'Mar', 'Apr', 'May', 'Jane']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        },
        {
            name: '人数',
            type: 'bar',
            data: [24, 87, 23, 70, 60, 34]
        }]
    });

    var chart_right = echarts.init(document.querySelector('.chart-right'));
    chart_right.setOption({
        legend: {
            data: ['特步', "老爹鞋", "阿迪", "贵人鸟", "森马"],
            orient: "vertical",
            left: "left"
        },
        title: {
            text: "热门品牌销售",
            subtext: "2018年11月28日",
            left: "center"
        },

        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ["50%", "60%"],
                data: [
                    { value: 235, name: '特步' },
                    { value: 274, name: '老爹鞋' },
                    { value: 310, name: '阿迪' },
                    { value: 335, name: '贵人鸟' },
                    { value: 400, name: '森马' }
                ]
            }
        ],

    });
})
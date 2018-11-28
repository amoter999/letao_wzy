$(document).ajaxStart(function () {
    NProgress.start();
})
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 500)

    // 需求：
    // 第一个ajax发送的时候，开启进度条
    // 等待所有的ajax都完成之后，关闭进度条

    // 进度条的基本使用：
    // NProgress.start()  开启进度条

    // 关闭进度条：
    // NProgress.done();
    // ajax全局事件：
    // .ajaxComplete() 每个ajax完成时进行调用
    // .ajaxSuccess() 每个ajax只要成功了就会进行调用
    // .ajaxError() 每个ajax只要发送了就会进行调用
    // .ajaxSend() 在所有的ajax发送前进行调用

    // .ajaxStart()  在第一个ajax发送请求开始时调用
    // .ajaxStop()  在所有的ajax请求都完成时进行调用

})


// 点击分类管理，会让下面的一二级目录下拉进行切换
$(function () {
    $(".category").click(function () {
        $(this).next().slideToggle();
    });

    $(".lt_menu").click(function () {
        $(".lt_aside").toggleClass("disappear");
        $(".topBar").toggleClass("change");
        $(".content").toggleClass("change");
    });

    $("#exit").click(function () {
        $.ajax({
            url: "/employee/employeeLogout",
            dataType: 'json',
            type: "get",
            success: function (info) {
                if (info.success) {
                    // console.log(info.success);
                    location.href = "login.html";
                }

            }

        });
    });
})



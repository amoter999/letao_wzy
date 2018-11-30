$(document).ajaxStart(function () {
    NProgress.start();
})
$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 500);
});


$(function(){
    $(".topBar .menu").click(function () {
        $(".lt_aside").toggleClass("disappear");
        $(".lt_main .topBar").toggleClass("change");
        $(".lt_main .content").toggleClass("change");
    });

    $(".category").click(function () {
        $(this).next().stop().slideToggle();
    });

    $(".confirm").click(function () {
        $.ajax({
            url: "/employee/employeeLogout",
            type: 'get',
            dataType: "json",
            success: function (info) {
                console.log();
                if (info.success) {
                    location.href = "login.html";
                }
            }
        });
    });
})


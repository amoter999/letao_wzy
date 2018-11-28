
$.ajax({
    url: '/employee/checkRootLogin',
    dataType: 'json',
    type: 'get',
    success: function (info) {
        if (info.error === 400) {
            location.href = "login.html";
        }
        if (info.success) {
            console.log(info);
        }
    }
});

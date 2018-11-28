$(function () {
    $("#form").bootstrapValidator({
        // 表单验证的状态
        feedbackIcons: {
            // 验证成功
            valid: 'glyphicon glyphicon-ok',
            // 验证失败
            invalid: 'glyphicon glyphicon-remove',
            // 正在验证中的
            validating: 'glyphicon glyphicon-refresh'
        },
        // 字段名
        fields: {
            // 用户名
            username: {
                // 验证的规则
                validators: {
                    // 不能为空的
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    // 限制长度
                    stringLength: {
                        min: 4,
                        max: 20,
                        message: "用户名的长度必须在4~20位"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 4,
                        max: 20,
                        message: "密码的长度必须在4~20位"
                    },
                    callback: {
                        message: "密码错误"
                    }
                }
            }
        }

    })
    $("#form").on("success.form.bv", function (e) {
        e.preventDefault();
        $.ajax({
            url: "/employee/employeeLogin",
            type: "post",
            data: $("#form").serialize(),
            dataType: "json",
            success: function (info) {
                // console.log(info);
                if (info.error == 1001) {
                    // alert("密码错误");
                    $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                    return;
                }
                if (info.error == 1000) {
                    // alert("用户名不存在");
                    $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                    return;
                }
                if (info.success) {
                    location.href = "index.html"

                }

            }
        });
    });

    $("[type='reset']").click(function () {
        $("#form").data("bootstrapValidator").resetForm();
    });
})
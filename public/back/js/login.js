$(document).ajaxStart(function(){
    NProgress.start();
})

$(function () {
    $("#form").bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        // excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应input表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 4,
                        max: 20,
                        message: '用户名长度必须在4到20之间'
                    },
                    callback:{
                        message:"用户名不存在"
                    }

                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 4,
                        max: 20,
                        message: '密码的长度必须在4到20之间'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.组成'
                    },
                    callback:{
                        message:"密码输入错误"
                    }
                }
            },
        }

    });
    

    // 重置内容和一些小图标
    // validators：是属于验证器
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url:"/employee/employeeLogin",
            type:"post",
            data:$("#form").serialize(),
            dataType:"json",
            success:function (info) {
                console.log(info)
                if(info.error===1000){
                    $("#form").data('bootstrapValidator').updateStatus("username","INVALID","callback");
                    return ;
                }
                if(info.error===1001){
                    $("#form").data('bootstrapValidator').updateStatus("password","INVALID","callback");
                    return ;
                }
                if(info.success){
                    location.href="index.html";
                }
            }
        })
    });

    $("[type='reset']").on("click",function () {
        $("#form").data('bootstrapValidator').resetForm();
    })
})




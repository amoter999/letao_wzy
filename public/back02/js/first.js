$(function () {
    // 开始进行页面的渲染以及分页的处理
    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            type: 'get',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                var htmlStr = template("firstTmp", info);
                $(".content tbody").html(htmlStr);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),

                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }

                });

            }

        });
    }


    // 点击添加分类，弹出模态框
    $(".add").click(function () {
        $("#addModal").modal("show");

    });
    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "分类名不能为空"
                    }
                }
            }
        }

    });

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        console.log($("#cateName").val());

        //使用ajax提交逻辑
        $.ajax({
            url: "/category/addTopCategory",
            type: "post",
            dataType: "json",
            data: $("#form").serialize(),
            success: function (info) {
                console.log(info);
                if (info.success) {
                    $("#addModal").modal("hide");
                    currentPage = 1;
                    render();

                }


            }
        })

    });




})
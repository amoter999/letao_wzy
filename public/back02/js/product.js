$(function () {
    var currentPage = 1;
    var pageSize = 5;

    var picArr = [];
    // 专门用于存储所有用于提交的图片对象
    render();

    function render() {
        $.ajax({
            url: "/product/queryProductDetailList",
            dataType: 'json',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                var htmlStr = template("productTpl", info);
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

    $("#addCate").click(function () {
        $("#productModal").modal("show");

        $.ajax({
            url: "/category/querySecondCategoryPaging",
            type: "get",
            dataType: 'json',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                console.log(info);
                var str = template("optionTpl", info);
                $(".dropdown-menu").html(str);
            }
        });
    });

    $(".dropdown-menu").on("click", "a", function () {
        var txt = $(this).text();
        $("#chooseName").text(txt);
        $("#brandId").val($(this).data("id"));
        $("#form").data("bootstrapValidator").updateStatus("brandId", "VALID");
    });

    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            console.log(data.result);

            var picObj = data.result;
            // 将每次上传的完成的图片对象，添加在数组的最前面
            picArr.unshift(picObj);
            // 获取的是图片的地址
            var picUrl = picObj.picAddr;
            // 并且将每次上传完成的图片显示在结构的最前面

            $("#imgBox").prepend("<img src=" + picUrl + " style='width:100px'>");


            if (picArr.length > 3) {
                picArr.pop();
                $("#imgBox img:last-of-type").remove();
            }

            $("#form").data("bootstrapValidator").updateStatus("picStatus", "VALID");

        }
    })


    $("#form").bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类名"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存",

                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: "商品库存格式，必须是以不为0的数字开头"
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺寸"
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: "商品尺寸，必须是35-48之间，例如：35-48"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品现价"
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请上传图片，图片数量必须是3张"
                    }
                }
            },
        }
    });




    $("#form").on("success.form.bv", function (e) {
            e.preventDefault();
            var paramStr = $("#form").serialize();
            paramStr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
            paramStr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
            paramStr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
            $.ajax({
                url: "/product/addProduct",
                data: paramStr,
                dataType: "json",
                type: "post",
                success: function (info) {
                    // console.log(info);
                    $("#productModal").modal("hide");
                    render();
                }

            });
    })



 



})
$(function(){
    var currentPage=1;
    var pageSize=5;
    render();
    function render(){
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"get",
            data:{
                page: currentPage,
                pageSize: pageSize,
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var str=template("secondTmp",info);
                $(".content table tbody").html(str);
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage=page;
                        render();
                    }
                });
                  
            }
        });
    }

    $("#secondCate").click(function(){
        $("#secondModal").modal("show");
    });

    $.ajax({
        url:"/category/queryTopCategoryPaging",
        type:"get",
        dataType:"json",
        data:{
            page:1,
            pageSize:100
        },
        success:function(info){
            console.log(info);
            var str = template("optionTmp",info);
            $(".dropdown-menu").html(str);
        }
    });

    $(".dropdown-menu").on("click","a",function(){
        // alert(666);
        var txt = $(this).text();
        $("#chooseName").text(txt);
        var id = $(this).data("id");
        $("[name='categoryId']").val(id);
        $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");

    })


  $("#fileupload").fileupload({
      dataType:'json',
    //   e:事件对象
    // data：图片上传之后的对象，通过data.result.picAddr可以获取上传之后的图片地址
      done:function(e,data){
        //   console.log(data.result);
        // data就是一个对象，是上传之后就会有的一个对象
        // data中的result属性中的picAddr属性就是上传的地址图片
        var picUrl = data.result.picAddr;
        console.log(picUrl);
        // 然后将图片上传之后的地址赋值给下面的img的src属性，这样图片就能够显示出来
        $(".downImg").attr("src",picUrl);

        $("[name='brandLogo']").val(picUrl);
        $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
      }
  })
  // 表单提交成功后调用的函数
  $("#form").on('success.form.bv', function (e) {

    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url:"/category/addSecondCategory",
      type:"post",
      dataType:"json",
      data:$("#form").serialize(),
      success:function(info){
        if(info.success){
          $("#secondModal").modal("hide");
          currentPage=1;
          render();
        }
      }
    });
});

  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
  
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级分类'
          },
        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级分类'
          },
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传照片'
          },
        }
      },
    }
  
  });


})

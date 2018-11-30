$(function () {
  // 定义一个全局变量currentPage，以便于后面能够直接修改里面的值，因为开始需要渲染一次，先赋值一个定死的变量
  var currentPage = 1;
  // pagesize就是一页所需要的用户条数
  var pageSize = 5;
  // 定义一个当前的id，便于后面修改状态的时候，知道修改的是哪一个用户
  var currentId;
  // 初始化变量{状态}
  var isDelete = 1;
  render();

  function render() {
    // 发送ajax请求
    $.ajax({
      url: "/user/queryUser",
      type: "get",
      dataType: "json",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        
        var str = template("tmp", info);
        $(".content table tbody").html(str);
        $("#paginator").bootstrapPaginator({

          // 分页的操作
          // 先定义一下版本号是多少，参数是必须填写的
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          // info.page 就是我们所需要的currentPage
          currentPage:info.page,//当前页
          // 向上取整数，因为总的用户条数除以一页的条数是一个小数
          totalPages:Math.ceil(info.total/info.size),//总页数
          // size:"small",//设置控件的大小，mini, small, normal,large
          // 需要传上去四个值，前三个如果没有，就直接传形参，但是必须要填写，参数是有顺序的
          onPageClicked:function(a,b,c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage=page;
            render();        

          }
        });
        



      }
    });
  }
  // 给动态生成的button进行注册点击事件，因此，是需要使用事件委托的
  $("tbody").on("click", ".btn", function () {
    // 点击禁用或者启用的按钮，是要显示模态框的
    $("#userModal").modal("show");
    // 根据按钮上面是否有btn-danger这个类名，有的话就让他切换成0，没有的话就让他切换成为1
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    // 同时获取自定义属性中的id值的大小，通过这个值，向后台发送ajax请求，知道是哪一个用户进行的操作
    currentId = $(this).parent().data("id");
  });

  $(".ensure").click(function () {
    // 点击模态框中的确定,发送ajax请求给后台
    $.ajax({
      url: '/user/updateUser',
      type: "post",
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: "json",
      success: function (info) {
        // 根据后台给的info.success来判断，并且需要隐藏模态框
        // console.log(info);
        if (info.success) {
          $("#userModal").modal("hide");
          // 并且进行重新的渲染
          render();
        }
      }
    });
  })






});
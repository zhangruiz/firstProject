/**
 * Created by Administrator on 2018/1/13.
 */


$(function(){

  var page = 1;
  var pageSize = 5;

  var render = function(){

    $.ajax({

      type:'get',
      url: '/user/queryUser',
      data: {
        page:page,
        pageSize: pageSize
      },
      success:function(info){
        console.log(info);

        $("tbody").html( template("tmp",info));


        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          numberOfPages: 5,

          itemTexts: function (type, page, current) {
            //根据type的不同，返回不同的字符串
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              case "page":
                return page;
            }
          },

          onPageClicked: function (a, b, c, p) {

            page = p;

            render();
          }
        });
      }
    })
  }
  render();

  $("tbody").on("click", ".btn", function () {

    //让模态框显示
    $("#userModal").modal("show");

    //获取到id
    var id = $(this).parent().data("id");

    var isDelete = $(this).hasClass("btn-success") ? 1 : 0;

    $(".btn_confirm").off().on("click", function () {
      $.ajax({
        type:'post',
        url:"/user/updateUser",
        data:{
          id:id,
          isDelete:isDelete
        },
        success:function (info) {
          if(info.success) {
            //关闭模态框
            $("#userModal").modal('hide');
            //重新渲染页面
            render();
          }
        }
      })
    });
  });


})
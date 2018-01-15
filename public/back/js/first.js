/**
 * Created by Administrator on 2018/1/13.
 */

$(function(){


  //动态生成数据，渲染  生成分页

  var page = 1;
  var pageSize = 5;

  var render = function(){

    $.ajax({

      type:'get',
      url:'/category/queryTopCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info){
        //console.log(info);

        $("tbody").html( template("tmp",info) );

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          crrentPage:page,
          totalPages: Math.ceil(info.total / info.size),

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

          onPageClicked:function(a,b,c,p){

            page = p,
            render()
          }
        })
      },
    })
  }
   render();


//点击按钮，显示蒙层

  $(".btn_add").on("click",function(){

    //console.log("hehe");

    $("#addModal").modal('show');
  })

  //表单校验

  var $form = $("form");

  $form.bootstrapValidator({
//校验图标
    feedbackIcon: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //配置校验

    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类名称不能为空"
          }
        }
      }
    }
  });


  //校验成功 发送ajax请求， 隐藏蒙层  当前页为第一页 添加的数据渲染到页面上
  //表单重置
  $form.on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({

      type: 'post',
      url: '/category/addTopCategory',
      data: $form.serialize(),
      success:function(info){
        //console.log(info);

        if(info.success){
          $("#addModal").modal("hide");
          page = 1;
          render();

          $form.data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })


















})
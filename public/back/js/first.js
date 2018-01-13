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
          onPageClicked:function(a,b,c,p){

            page = p,
            render()
          }
        })
      }
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
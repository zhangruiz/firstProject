/**
 * Created by Administrator on 2018/1/13.
 */

$(function(){

  var page = 1;
  var pageSize = 5;

  var render = function(){

    $.ajax({

      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success:function(info){
        //console.log(info);

        $("tbody").html( template("tmp",info) )

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

    $.ajax({

      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize:1000
      },
      success:function(info){
        //console.log(info);

        $(".dropdown-menu").html( template("tmp_form",info) );
      }
    })
  });


  //下拉列表显示功能

  //注册委托事件  注意格式   给  A 注册


  $(".dropdown-menu").on("click","a",function(){

    var context = $(this).text();

    $(".dropdown-text").text(context);

    var id = $(this).data("id");
    $("#categoryId").val(id);

    $form.data("bootstrapValidator").updateStatus("categoryId","VALID");

  });

  $("#fileupload").fileupload({

    datatype:'json',
    done:function(e,data){
      //console.log(data);

      $(".img_box img").attr("src",data.result.picAddr);

      $("#brandLogo").val(data.result.picAddr);

      $form.data("bootstrapValidator").updateStatus("brandLogo","VALID");

    },
});


  var $form = $("form");

  //表单校验

  $form.bootstrapValidator({
    //配置不做校验的内容
    excluded:[],

    feedbackIcons: {
      vaild:'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "亲，请选择一级分类",
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "亲，请输入品牌名称",
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message:"亲，请上传一张品牌图片",
          }
        }
      }
    }
  });


  //点击确认按钮上传


  $("form").on("success.form.bv",function(e){

    e.preventDefault();

    $.ajax({

      type:'post',
      url:'/category/addSecondCategory',
      data:$form.serialize(),

      success:function(info){
        //console.log(info);
        if(info.success){

          $("#addModal").modal("hide");

          page = 1;
          render();

          $form.data("bootstrapValidator").resetForm(true);

          $(".dropdown-text").text("请选择一级分类");
          $(".img_box img").attr("src","images/none.png");

        }
      }

    })

  })








})
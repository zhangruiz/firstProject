/**
 * Created by Administrator on 2018/1/14.
 */

$(function(){


  //数据渲染到页面

  var page = 1;
  var pageSize = 5;

  var render = function(){

    $.ajax({

      type:'get',
      url: '/product/queryProductDetailList',
      data: {
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        //console.log(info);

        $("tbody").html( template("tmp",info ) );


        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total/info.size),

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
            page = p;
            render();
          }
        })
      },
    })
  };

  render();

//上架下架修改

  $("tbody").on("click",".btn",function(){

    //$("#addModal").modal("show");
    //
    //
    //  //console.log("111")
    //
    //var id = $(this).parent().data("id");
    //var status = $(this).hasClass("btn-success")?1:0;
    //
    //$(".btn_confirm").off().on("click",function(){
    //
    //  $.ajax({
    //
    //    type:'post',
    //    url:'/product/updateProduct',
    //    data:{
    //      id:id,
    //      statu:status
    //    },
    //    success:function(info){
    //      console.log(info);
    //    }
    //  })
    //})
  })


//点击添加商品


  $(".btn_add").on("click",function(){

    $("#addModal").modal("show");

    $.ajax({

      type:'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page:1,
        pageSize:100
      },
      success:function(info){
        //console.log(info);

        $(".dropdown-menu").html( template("tmp_product",info))
      }
    })
  });

  //下拉框显示点击的内容

  $(".dropdown-menu").on("click","a",function(){

    $(".dropdown-text").text($(this).text());

    $("#brandId").val($(this).data("id"));

    $form.data("bootstrapValidator").updateStatus("brandId","VALID");
  })

  //上传图片  并显示  至少上传3张，

  var arr = [];

  $("#fileupload").fileupload({

    dataType: 'json',
    done: function(e,data){
      if(arr.length >= 3){

        return;
      }

      //获得的data方法：data.result.picAddr
      //也就是图片的地址
      var result = data.result.picAddr;
      $(".img_box").append('<img src="'+ result +'" width="100" height="100" alt="">');

      //把照片存储到数组中
      arr.push(data.result);

      if(arr.length === 3){
        $form.data("bootstrapValidator").updateStatus("productLogo","VALID");
      }else {
        $form.data("bootstrapValidator").updateStatus("productLogo","INVALID");
      }
    }
  });


  //表单验证 bootstrapVaildator方法

  var $form = $("form");

  $form.bootstrapValidator({

    excluded:[],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "亲，二级分类必须选一个哦！"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "亲，商品名称必须填写哦!"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "亲，商品描述必须填写哦!"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "亲，商品库存必须填写哦!"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "请输入合法的库存"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "亲,商品尺码必须填写哦!"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入合法的尺码，比如(32-44)"
          }
        }
      },
      oldPrice: {
        validators:{
          notEmpty: {
            message:"亲,商品原价必须填写哦!"
          }
        }
      },
      price: {
        validators:{
          notEmpty: {
            message:"亲,商品现价必须填写哦!"
          }
        }
      },
      productLogo: {
        validators:{
          notEmpty: {
            message:"亲,必须上传3张商品图片哦!"
          }
        }
      },
    }
  });

//给表单注册校验成功事件

  $form.on("success.form.bv",function(e){

    e.preventDefault();

    var pic = $form.serialize();

    pic += "&picName1=" + arr[0].picName + "&picAddr1=" + arr[0].picAddr;
    pic += "&picName2=" + arr[1].picName + "&picAddr2=" + arr[1].picAddr;
    pic += "&picName3=" + arr[2].picName + "&picAddr3=" + arr[2].picAddr;

    $.ajax({

      type:'post',
      url:'/product/addProduct',
      data: pic,
      success: function(info){
        //console.log(info);

        if(info.success){

          $("#addModal").modal("hide");

          page = 1;

          render();

          arr = [];

          $form.data("bootstrapValidator").resetForm(true);
          $(".dropdown-text").text("请选择二级分类");
          $(".img_box img").remove();
        }
      }

    })
  })



});
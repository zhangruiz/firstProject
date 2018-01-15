/**
 * Created by Administrator on 2018/1/15.
 */

$(function(){


  //左模板渲染
  $.ajax({

    type:'get',
    url:'/category/queryTopCategory',
    success:function(info){
      //console.log(info);

      $(".category_left .mui-scroll").html(template("tmp_left",info))

      renderSecond(info.rows[0].id);
    }
  });


  //右模板渲染
  function renderSecond(id){

    $.ajax({

      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function(info){
        console.log(info);

        $(".category_right .mui-scroll").html(template("tmp_right",info))
      }
    })
  }


  //点击左模板，右模板显示对应品牌

  $(".category_left .mui-scroll").on("click","li",function(){

    $(this).addClass("active").siblings().removeClass("active");
    var id = $(this).data("id");
    renderSecond(id);

    mui(".mui-scroll-wrapper").scroll()[1].scrollTo(0,0,500);

  })

});
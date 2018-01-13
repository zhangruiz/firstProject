/**
 * Created by Administrator on 2018/1/11.
 */


// 进度条
  NProgress.configure({showSpinner: false});
  $(document).ajaxStart(function(){
    NProgress.start();
  });

  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();
    },10);

  });


//非登录页面 判断

if(location.href.indexOf("login.html")== -1){

  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    success:function(info){
      //console.log(info);

      if(info.error === 400){

        location.href = "login.html";
      }
    }
  })

}

//二级分类导航开启隐藏

$(".second").prev().on("click",function(){
  $(this).next().slideToggle();

})



//侧边栏显示/隐藏
$(".icon_menu").on("click", function () {

  $(".lt_aside").toggleClass("now");
  $(".lt_content").toggleClass("now");
  $(".lt_header").toggleClass("now");

})


//退出功能

$(".icon_logout").on("click", function () {
   $("#logoutModal").modal("show");
});

$(".btn_logout").on("click", function () {
  //console.log("111");
  $.ajax({
    type:"get",
    url:"/employee/employeeLogout",
    success:function (info) {
      if(info.success){
        location.href = "login.html";
      }
    }
  });


})
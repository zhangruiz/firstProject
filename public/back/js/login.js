/*
  Created by Administrator on 2018/1/11.
 */
;(function(){


  $('form').bootstrapValidator({

    fields: {
      username: {
        validators: {
          notEmpty: {
            message: "用户名不能为空!"
          },
          callback: {
            message: "用户名输入错误!"
          }
        }
      },

      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空!"
          },
          stringLength: {
            min:5,
            max:15,
            message: "密码长度必须是5到15位!"
          },
          callback: {
            message: "密码输入错误!"
          }
        }
      }
    }
  });

  $('form').on("success.form.bv",function(e){

    e.preventDefault();

    $.ajax({

      type: 'post',
      url:'/employee/employeeLogin',
      data: $('form').serialize(),
      success:function(info){
        if(info.success){
          location.href = "index.html"

        }

        if(info.error == 1001){
          //alert("密码错误");

          $('form').data("bootstrapValidator").updateStatus("password","INVALID","callback");

        }

        if(info.error == 1000){
          //alert("用户名错误");

          $('form').data("bootstrapValidator").updateStatus("username","INVALID","callback");

        }
      }
    })
  })

//重置提示
  $("[type='reset']").on("click",function(){

    $("form").data('bootstrapValidator').resetForm()
  });


})();
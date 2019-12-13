(function () {
  $('.imgpre').click(function () {
    $('#file').click()
  })
  // 选择图片后处理
  $('#file').on('change', function () {
    canvasDataURL(this)
  })
  $('.loading, .analyze').hide()
  $('#spread').hide()

  $('#verifyBt').click(function () {
    var code = Number($('#authCode').val())
    if (code == '') {
      alert('请输入内测码！')
      return false
    } else {
      var result = authTest(code)
      if (!result) {
        $('#authCode').val('')
        alert('内测码无效！')
      } else {
        $('.verify').hide()
        $('#spread').show()
      }

    }
  })
  // 对比验证码
  function authTest(code) {
    var arr = [960616, 920723, 666666]
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === code) {
        return code
      }
    }
  }

  // canvas 图片压缩
  function canvasDataURL(file) {
    var file = file.files[0];
    var imgSize = file.size;
    console.log(imgSize);

    lrz(file, {
      width: 200,
      before: function () {
        // console.log('压缩开始');
      },
      fail: function (err) {
        console.error(err);
      },
      always: function () {
        // console.log('压缩结束');
      },
      done: function (results) {
        // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
        console.log(results);
        $('.imgpre').show().attr('src', results.base64)
        $('.btn-success').hide()
        $('.box').css('border', 'none')
        $('.compare').show()
        $('#artwork').val(results.origin.size)
        $('#artwork-after').val(results.base64Len)
      }
    });
  }
})()
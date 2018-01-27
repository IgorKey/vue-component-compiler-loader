(function () {
  return {
    name: 'js-html-css.vue',
    data: function () {
      return {
        msg: 'Hello world!'
      }
    }, template: '<h1 class="red">{{msg}}</h1>', _injectCss: '.red{color:red}'
  }
})()
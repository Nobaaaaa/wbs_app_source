//require("core-js/stable");
//require("regenerator-runtime/runtime");

var Vue = require("vue");
var MainAreaComponent = require("./Components/Area_MainComponent.vue");
//var CommonDao = require("./Model/CommonDao.js");

//CommonDao.SaveTask([]);

var viewModel = new Vue({
  el: "#main",
  components: {
    MainArea: MainAreaComponent
  }
});

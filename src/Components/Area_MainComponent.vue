<template>
  <div id="main-area">
    <head-area></head-area>
    <div id="body-area">
      <form-area></form-area>
      <wbs-area></wbs-area>
    </div>
  </div>
</template>


<style scoped>
#body-area{
  height: 675px;
  width: 10000px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  font-size: 10px;
}
</style>


<script>
var HeadAreaComponent = require("./Area_HeadComponent.vue");
var FormAreaComponent = require("./Area_FormComponent.vue");
var WbsAreaComponent = require("./Area_WbsComponent.vue");

module.exports = {
  components: {
    HeadArea: HeadAreaComponent,
    FormArea: FormAreaComponent,
    WbsArea: WbsAreaComponent
  }
};
</script>

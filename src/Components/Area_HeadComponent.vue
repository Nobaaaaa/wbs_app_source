<template>
  <div id="head-area" v-if="headLoadCompleted == true || LoadHeadData()">
    <h1 id="title">WBS App</h1>
    <div class="project">
      <input class="project-name" size="20" placeholder="プロジェクト名" v-model="projectName">
      <div class="project-span">
        <span>プロジェクト開始日　<input type="date" v-model="inputProjectStartDate"></span>
        <span>プロジェクト終了日　<input type="date" v-model="inputProjectEndDate"></span>
      </div>
      <input class="project-submit" type="button" value="この日付で設定する" v-on:click="SetProjectDays">
    </div>
  </div>
</template>


<style scoped>
#head-area{
  top: 0px;
  left: 10px;
  position: fixed;
  z-index: 1;
  color: #696969;
  background-color: #c1e4e9;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 75px;
  width: 10000px;
  font-size: 10px;
}
#head-area *{
  background: #c1e4e9;
}
#title{
  margin-left: 10px;
  font-size: 20px;
}
.project{
  margin-left: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
}
.project input{
  color: #696969;
  border-style: solid;
  border-color: #efefef;
}
.project-name{
  font-size: 15px;
}
.project-span{
  display: flex;
  flex-direction: column;
}
.project-span span{
  margin: 5px 10px 5px;
}
#head-area .project-submit{
  background-color: #efefef;
}
</style>


<script>
var model = require("../Model/HeadModel.js");

module.exports = model;
</script>

<template>
  <div id="wbs-area" v-if="wbsLoadCompleted == true || LoadWbsData()">
    <div class="wbs-navi">
      <h2>■WBS</h2>
      <span><input class="active-submit" type="button" value="実績を登録する" v-on:click="RegisterActiveDays"></span>
    </div>
    <table border="1">
      <thead class="wbs-head">
        <tr>
          <th v-for="(day, index) in days">
            <span v-if="index == 0 || day.date == 1">{{day.month}}</span>
            <span v-else>-</span>
          </th>
        </tr>
        <tr>
          <th v-for="day in days">{{day.date}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks">
          <td v-for="day in days">
            <span class="day-item" v-if="task.days.includes(day.fulldate)">
              <select class="working-day" v-model="activeDays[index].data[day.fulldate]">
                <option value="false"></option>
                <option value="true">[■]</option>
              </select>
            </span>
            <span class="day-item" v-else>
              <select class="no-working-day" v-model="activeDays[index].data[day.fulldate]">
                <option value="false"></option>
                <option value="true">[■]</option>
              </select>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>
#wbs-area{
  color: #696969;
  background-color: #f7efff;
  margin-top: 80px;
  margin-left: 15px;
  height: 600px;
  width: 9000px;
}
#wbs-area *{
  color: #696969;
  background-color: #f7efff;
}
#wbs-area input{
  color: #696969;
  border-style: solid;
  border-color: #efefef;
  height: 16px;
  font-size: 10px;
}
#wbs-area .wbs-navi{
  display: flex;
  flex-direction: row;
  align-items: center;
}
#wbs-area .active-submit{
  margin-left: 50px;
  background-color: #c0c0c0;
}
#wbs-area .wbs-head *{
  background-color: #c1e4e9;
}
#wbs-area tr{
  height: 16px;
}
#wbs-area th, #wbs-area td{
  width: 20px;
}
.day-item{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#wbs-area .working-day{
  border-style: none;
  border-radius: 0px;
  background-color: #fffacd;
  -webkit-appearance: none;
  height: 16px;
  width: 20px;
}
#wbs-area .no-working-day{
  border-style: none;
  border-radius: 0px;
  background-color: #f7efff;
  -webkit-appearance: none;
  height: 16px;
  width: 20px;
}
</style>


<script>
var model = require("../Model/WbsModel.js");

module.exports = model;
</script>

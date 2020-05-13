<template>
  <div id="form-area" v-if="formLoadCompleted == true || LoadFormData()">
    <div class="form-navi">
      <h2>■Task</h2>
    </div>
    <table>
      <thead>
        <tr>
          <th>状態</th>
          <th>タスク名</th>
          <th>フェーズ</th>
          <th>担当者</th>
          <th>工数</th>
          <th>
            <span>開始日：
              <select class="start-date-input-type" v-model="startDateTimeInputType">
                <option value="input">入力</option>
                <option value="auto">自動</option>
              </select>
            </span>
          </th>
          <th>開始日時</th>
          <th>終了日時</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <select v-model="inputStatus">
              <option value="未着手">未着手</option>
              <option value="対応中">対応中</option>
              <option value="完了">完了</option>
              <option value="中断中">中断中</option>
              <option value="不要">不要</option>
            </select>
          </td>
          <td><input size="10" v-model="inputName"></td>
          <td>
            <select v-model="inputPhase">
              <option value="要件">要件</option>
              <option value="設計">設計</option>
              <option value="製造">製造</option>
              <option value="試験作成">試験作成</option>
              <option value="試験実施">試験実施</option>
            </select>
          </td>
          <td><input size="1" v-model="inputPerson"></td>
          <td><input size="1" v-model="inputVolume"></td>
          <td class="input-start-date-block">
            <input class="input-start-date" type="date" v-if="startDateTimeInputType == 'input'" v-model="inputStartDateTime">
            <span v-else>自動計算</span>
          </td>
          <td class="input-start-date-time"><span>自動計算</span></td>
          <td class="input-end-date-time"><span>自動計算</span></td>
          <td><input class="task-submit" type="button" value="登録" v-on:click="RegisterTask"></td>
        </tr>
        <tr v-for="task in tasks">
          <td class="status">{{task.status}}</td>
          <td class="name">{{task.name}}</td>
          <td class="phase">{{task.phase}}</td>
          <td class="person">{{task.person}}</td>
          <td class="volume">{{task.volume}}</td>
          <td class="start-date-time" v-if="task.startDateTimeInputType == 'auto'">自動</td>
          <td class="start-date-time" v-else>入力：{{task.displayStartDate}}</td>
          <td class="start-date">{{task.startDateTime}}</td>
          <td class="end-date">{{task.endDateTime}}</td>
          <td><input class="task-delete" type="button" value="×" v-on:click="RemoveTask(task.id)"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>
#form-area{
  position: sticky;
  top: 0px;
  left: 10px;
  margin-top: 80px;
  color: #696969;
  background-color: #ffefe0;
  height: 600px;
  width: 730px;
}
#form-area *{
  background-color: #ffefe0;
}
#form-area input{
  color: #696969;
  border-style: solid;
  border-color: #c0c0c0;
  height: 16px;
  font-size: 10px;
}
#form-area tr{
  height: 16px;
}
#form-area .form-navi{
  display: flex;
  flex-direction: row;
  align-items: center;
}
#form-area .start-date-input-type{
  font-size: 10px;
  color: #696969;
  border-style: solid;
  border-color: #c0c0c0;
  border-radius: 0px;
  background-color: #c0c0c0;
  -webkit-appearance: none;
}
#form-area .input-start-date-time-block{
  text-align: center;
}
#form-area .input-start-date-block{
  width: 120px;
  text-align: center;
}
#form-area .input-start-date{
  width: 110px;
}
#form-area .input-start-date-time, #form-area .input-end-date-time{
  text-align: center;
  width: 130px;
}
#form-area .task-submit, #form-area .task-delete{
  background-color: #c0c0c0;
}

</style>


<script>
var model = require("../Model/FormModel.js");

module.exports = model;
</script>

const fs = require("fs");

var dao = {
  SaveProjectName: function(projectName){
    ChangeJsonData("projectName", projectName);
  },
  LoadProjectName: function(){
    return GetJsonData("projectName");
  },
  SaveTask: function(task){
    AddToJsonDataList("tasks", task);
  },
  LoadTasks: function(){
    return GetJsonDataList("tasks");
  },
  DeleteTask: function(taskId){
    ChangeJsonDataById("tasks", null, taskId);
  },
  SaveDays: function(days){
    ChangeJsonData("days", days);
  },
  LoadDays: function(){
    return GetJsonDataList("days");
  },
  SaveNextTaskId: function(nextTaskId){
    ChangeJsonData("nextTaskId", nextTaskId);
  },
  LoadNextTaskId: function(){
    return GetJsonData("nextTaskId");
  },
  SaveTaskActiveDays: function(taskActiveDays){
    AddToJsonDataList("activeDays", taskActiveDays);
  },
  SaveAllActiveDays: function(allActiveDays){
    ChangeJsonData("activeDays", allActiveDays);
  },
  LoadAllActiveDays: function(){
    return GetJsonDataList("activeDays");
  },
  DeleteActiveDays: function(taskId){
    ChangeJsonDataById("activeDays", null, taskId);
  }
};

var ChangeJsonData = function(key, newData){
  try {
    var allData = JSON.parse(fs.readFileSync("./Data/data.json", "utf8"));;

    allData[key] = newData;

    fs.writeFileSync("./Data/data.json", JSON.stringify(allData));
  }
  catch (ex) {
    alert("データの更新に失敗しました　エラー：" + ex);
  }
};

var ChangeJsonDataById = function(key, newData, id){
  try {
    var allData = JSON.parse(fs.readFileSync("./Data/data.json", "utf8"));;
    var keyDataArray = Array.from(allData[key]);
    var newKeyDataArray = [];

    for(var index in keyDataArray){
      var item = keyDataArray[index];
      if(item.id != id){
        newKeyDataArray.push(item);
        continue;
      }
      if(newData != null){
        newKeyDataArray.push(newData);
        continue;
      }
    }

    allData[key] = newKeyDataArray == [] ? "": newKeyDataArray;

    fs.writeFileSync("./Data/data.json", JSON.stringify(allData));
  }
  catch (ex) {
    alert("データの更新に失敗しました　エラー：" + ex);
  }
};

var AddToJsonDataList = function(key, newData){
  try {
    var allData = JSON.parse(fs.readFileSync("./Data/data.json", "utf8"));;
    var keyDataArray = Array.from(allData[key]);

    keyDataArray.push(newData);
    allData[key] = keyDataArray;

    fs.writeFileSync("./Data/data.json", JSON.stringify(allData));
  }
  catch (ex) {
    alert("データの更新に失敗しました　エラー：" + ex);
  }
};

var GetJsonData = function(key){
  try {
    var allData = JSON.parse(fs.readFileSync("./Data/data.json", "utf8"));

    return allData[key];
  }
  catch (ex) {
    alert("データの取得に失敗しました　エラー：" + ex);
    return [];
  }
};

var GetJsonDataList = function(key){
  try {
    var allData = JSON.parse(fs.readFileSync("./Data/data.json", "utf8"));

    return Array.from(allData[key]);
  }
  catch (ex) {
    alert("データの取得に失敗しました　エラー：" + ex);
    return [];
  }
};

module.exports = dao;

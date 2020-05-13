var utils = require("./CommonUtils.js");
var dao = require("./CommonDao.js");
var data = require("./CommonData.js");

module.exports = {
  data: function(){
    return data;
  },
  methods: {
    LoadFormData: function(){
      this.tasks = dao.LoadTasks();
      this.nextTaskId = dao.LoadNextTaskId();
      this.formLoadCompleted = true;
      return true;
    },
    RegisterTask: function(){
      var newTask  = this.GetInputTask();

      if(this.CheckInputTask(newTask) == false) return;

      dao.SaveTask(newTask);
      dao.SaveTaskActiveDays(this.GetTaskActiveDays(newTask.id));

      this.tasks = dao.LoadTasks();
      this.activeDays = dao.LoadAllActiveDays();
      this.ClearInputTask();
    },
    RemoveTask: function(taskId){
      if(confirm("このタスクを本当に削除していいですか") == false) return;

      dao.DeleteTask(taskId);
      dao.DeleteActiveDays(taskId);

      this.tasks = dao.LoadTasks();
      this.activeDays = dao.LoadAllActiveDays();
    },
    GetInputTask: function(){
      var startDateTime = new Date();

      if(this.startDateTimeInputType == "input"){
        startDateTime = new Date(Date.parse(this.inputStartDateTime));
        startDateTime.setHours(9);
        startDateTime.setMinutes(0);
        startDateTime.setSeconds(0);
      }
      else{
        startDateTime = utils.GetTaskStartDateTimeByAuto(this.tasks);
        if(startDateTime == "") return {
          id: utils.GetNextTaskId(),
          status: "",
          name: "",
          phase: "",
          person: "",
          volume: "",
          startDateTime: "",
          startDateTimeInputType: "",
          endDateTime: "",
          displayStartDate: "",
          displayStartDateTime: "",
          displayEndDateTime: "",
          days: []
        };
      }

      var endDateTime = utils.AddDayToDateTime(startDateTime, this.inputVolume);

      var taskDays = [];

      for(var date = new Date(startDateTime.getTime()); date <= endDateTime; date.setDate(date.getDate() + 1)){
        taskDays.push(utils.GetYmdDate(date));
      }

      return {
        id: utils.GetNextTaskId(),
        status: this.inputStatus,
        name: this.inputName,
        phase: this.inputPhase,
        person: this.inputPerson,
        volume: this.inputVolume,
        startDateTime: utils.GetYmdhmsDate(startDateTime),
        startDateTimeInputType: this.startDateTimeInputType == "auto" ? "auto" : "input",
        endDateTime: utils.GetYmdhmsDate(endDateTime),
        displayStartDate: utils.GetYmdDate(startDateTime),
        days: taskDays,
      };
    },
    CheckInputTask: function(task){
      if(this.CheckInputShortage(task) == false){
        alert("タスクの入力に不足があります");
        return false;
      }
      return true;
    },
    CheckInputShortage: function(data){
      for(var key in data){
        if(data[key] == false){
          return false;
        }
      }
      return true;
    },
    GetTaskActiveDays: function(id){
      return {
        id: id,
        data: {}
      };
    },
    ClearInputTask: function(){
      this.inputStatus = "";
      this.inputName = "";
      this.inputPhase = "";
      this.inputPerson = "";
      this.inputVolume = "";
      this.inputStartDateTime = "";
    }
  }
};

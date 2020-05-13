var dao = require("./CommonDao.js");

var utils = {
  GetYmdDate: function(date){
    return date.getFullYear() +
           "/" +
           ("0" + (date.getMonth() + 1)).slice(-2) +
           "/" +
           ("0" + date.getDate()).slice(-2);
  },
  GethmsDate: function(date){
    return ("0" + date.getHours()).slice(-2) +
           ":" +
           ("0" + date.getMinutes()).slice(-2) +
           ":" +
           ("0" + date.getSeconds()).slice(-2);
  },
  GetYmdhmsDate: function(date){
    return date.getFullYear() +
           "/" +
           ("0" + (date.getMonth() + 1)).slice(-2) +
           "/" +
           ("0" + date.getDate()).slice(-2) +
           " " +
           ("0" + date.getHours()).slice(-2) +
           ":" +
           ("0" + date.getMinutes()).slice(-2) +
           ":" +
           ("0" + date.getSeconds()).slice(-2);
  },
  GetNextTaskId: function(){
    var nextTaskId = Number(dao.LoadNextTaskId());
    dao.SaveNextTaskId(nextTaskId + 1);
    return nextTaskId;
  },
  AddDayToDateTime: function(dateTime, addingDay){
    return AddDayToDateTimeWithWorkRules(dateTime, addingDay);
  },
  GetTaskStartDateTimeByAuto: function(tasks){
    if(tasks.length == 0){
        return "";
    }

    var lastInputTaskIndex = null;

    for(var index in tasks){
      if (tasks[index].startDateTimeInputType == "input"){
        lastInputTaskIndex = index
      }
    }

    var targetVolume = 0;

    for(var i = lastInputTaskIndex; i < tasks.length; i++){
      targetVolume += Number(tasks[i].volume);
    }

    var criteriaDate = new Date(Date.parse(tasks[lastInputTaskIndex].startDateTime));

    return AddDayToDateTimeWithWorkRules(criteriaDate, targetVolume);
  }
};

var AddDayToDateTimeWithWorkRules = function(dateTime, addingDay){
  var resultDateTime = new Date(dateTime.getTime());

  //人日を日数に直す
  var addingRealDay = Math.floor(addingDay);
  var addingDayFraction = addingDay - addingRealDay

  //日数分だけ先に加算する
  resultDateTime.setDate(resultDateTime.getDate() + addingRealDay);

  //昼休みをまたいだかの判定用フラグ
  var beforeRest = false;

  if(resultDateTime.getHours() < 12) beforeRest = true;

  resultDateTime.setMinutes(resultDateTime.getMinutes() + addingDayFraction * 8 * 60);

  //昼休みをまたいでいたら1時間分加算する
  if(beforeRest && resultDateTime.getHours() >= 13){
    resultDateTime.setHours(resultDateTime.getHours() + 1);
  }

  //昼休み中だったら1時間分加算する
  if(resultDateTime.getHours() >= 12 && resultDateTime.getHours() < 13){
    resultDateTime.setHours(resultDateTime.getHours() + 1);
  }

  //18時を超えたら15時間分加算する
  if(resultDateTime.getHours() >= 18 || resultDateTime.getHours() < 9){
    resultDateTime.setHours(resultDateTime.getHours() + 15);
  }

  //昼休み中だったら1時間分加算する
  if(resultDateTime.getHours() >= 12 && resultDateTime.getHours() < 13){
    resultDateTime.setHours(resultDateTime.getHours() + 1);
  }

  return resultDateTime;
}

module.exports = utils;

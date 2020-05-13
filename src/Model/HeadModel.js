var utils = require("./CommonUtils.js");
var dao = require("./CommonDao.js");
var data = require("./CommonData.js");

module.exports = {
  data: function(){
    return data;
  },
  methods: {
    LoadHeadData: function(){
      this.projectName = dao.LoadProjectName();
      this.days = dao.LoadDays();
      if(this.days.length >= 1){
        this.inputProjectStartDate = this.days[0].fulldate.replace(/\//g, "-");
        this.inputProjectEndDate = this.days[this.days.length - 1].fulldate.replace(/\//g, "-");
      }
      this.headLoadCompleted = true;
      return true;
    },
    SetProjectDays: function(){
      var startDate = new Date(Date.parse(this.inputProjectStartDate));
      var endDate = new Date(Date.parse(this.inputProjectEndDate));
      var newDays = [];

      for(var date = startDate; date <= endDate; date.setDate(date.getDate() + 1)){
        newDays.push({
          fulldate: utils.GetYmdDate(date),
          year: date.getYear(),
          month: date.getMonth() + 1,
          date: date.getDate()
          });
      }

      dao.SaveProjectName(this.projectName);
      dao.SaveDays(newDays);

      this.projectName = dao.LoadProjectName();
      this.days = dao.LoadDays();

    }
  }
};

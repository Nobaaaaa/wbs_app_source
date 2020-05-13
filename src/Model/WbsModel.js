var dao = require("./CommonDao.js");
var data = require("./CommonData.js");

module.exports = {
  data: function(){
    return data;
  },
  methods: {
    LoadWbsData: function(){
      this.days = dao.LoadDays();
      this.activeDays = dao.LoadAllActiveDays();
      this.wbsLoadCompleted = true;
      return true;
    },
    RegisterActiveDays: function(){
      if(confirm("実績を本当に登録していいですか") == false) return;

      dao.SaveAllActiveDays(this.activeDays);

      this.activeDays = dao.LoadAllActiveDays();
    }
  }
};

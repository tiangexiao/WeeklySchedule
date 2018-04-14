const app = getApp()
var touchDot = 0;//触摸时的原点    copy from https://blog.csdn.net/UFO00001/article/details/73163600
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动  
var interval = "";// 记录/清理时间记录  
Page({
  data: {
    currentUserNameList: [],   //当前值周用户姓名列表，第一个用户为本周值周用户，依次类推
    monDayAndSunDayList: []    //当前值周用户日期列表，第一个日期为本周（周一，周日），依次类推
  },
  onLoad: function () {
    this.initData()
  },

  /**
   * 初始化信息，
   * 初始化 本地的值周生姓名列表和值周生日期列表
   * 初始化 全局的值周生姓名列表和值周生日期列表
   */
  initData : function(){
    this.setCurrentNameFromInitNameList()
    this.setMonDayAndSunDayList()
    app.globalData.currentUserNameList = this.data.currentUserNameList; //设置全局变量namelist
    app.globalData.currentUserTimeList = this.data.monDayAndSunDayList;
  },
  
  /**
   * 根据初始的（为全局变量）用户姓名和初始的日期信息，得到当前值周的用户姓名
   * 第一个姓名为本周值周生，依次类推
   */
  setCurrentNameFromInitNameList: function(){

    var userNameList = new Array();
    var beginDate = new Date(app.globalData.initDate);
    var nowDate = new Date();
    var weekFromInitDay = Math.floor((nowDate - beginDate) / (86400000 * 7));

    for (var i = 0; i < app.globalData.initUserNameList.length; i++) {
      var name = app.globalData.initUserNameList[(i + weekFromInitDay) % app.globalData.initUserNameList.length]
      userNameList.push(name)
    }

    this.setData({
      currentUserNameList: userNameList
    })

  },



  /** 
* @param 页面日期控件取得的日期（yyyy/mm/dd） 
* @author rockjava  http://rockjava.iteye.com/blog/299845
* @modefy xiaotiange 
* @modifyDate 2018-4-13 
* @date 2008-12-23 
* */
  getMonDayAndSunDay: function (datevalue) {
    var dateValue = datevalue;
    var arr = dateValue.split("/")
    //月份-1 因为月份从0开始 构造一个Date对象  
    var date = new Date(arr[0], arr[1] - 1, arr[2]);

    var dateOfWeek = date.getDay();//返回当前日期的在当前周的某一天（0～6--周日到周一）  

    var dateOfWeekInt = parseInt(dateOfWeek, 10);//转换为整型  

    if (dateOfWeekInt == 0) {//如果是周日  
      dateOfWeekInt = 7;
    }
    var aa = 7 - dateOfWeekInt;//当前于周末相差的天数  

    var temp2 = parseInt(arr[2], 10);//按10进制转换，以免遇到08和09的时候转换成0  
    var sunDay = temp2 + aa;//当前日期的周日的日期  
    var monDay = sunDay - 6//当前日期的周一的日期  

    var startDate = new Date(arr[0], arr[1] - 1, monDay);
    var endDate = new Date(arr[0], arr[1] - 1, sunDay);

    var sm = parseInt(startDate.getMonth()) + 1;//月份+1 因为月份从0开始  
    var em = parseInt(endDate.getMonth()) + 1;

    // if (month.length < 2) month = '0' + month;
    // if (day.length < 2) day = '0' + day;
    //  alert("星期一的日期："+startDate.getYear()+"-"+sm+"-"+startDate.getDate());  
    //  alert("星期日的日期："+endDate.getYear()+"-"+em+"-"+endDate.getDate());  
    var start = startDate.getFullYear() + "/" + sm + "/" + startDate.getDate();
    var end = endDate.getFullYear() + "/" + em + "/" + endDate.getDate();
    var result = this.formatDateToDot(start) + '-' + this.formatDateToDot(end)

    return result;
  },

  /**
   * 根据当前日期得到一个人员对应的值周日期列表，第一个日子总是当前周，一次类推
   */
  setMonDayAndSunDayList: function () {
    var monDayAndSunDayList = new Array();
    for (var userNumber = 0; userNumber < app.globalData.initUserNameList.length; userNumber++) {
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + userNumber * 7)
      var currentDateFormet = this.formatDate(currentDate)
      var monDayAndSunDay = this.getMonDayAndSunDay(currentDateFormet)
      monDayAndSunDayList.push(monDayAndSunDay)
    }

    this.setData({
      monDayAndSunDayList: monDayAndSunDayList
    })

  },

  /**
   * 将日期格式化，输入一个日期，格式化为yyyy/MM/dd的形式
   */
  formatDate: function (date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('/');
  },

  /**
   * 日期格式化为 输入一个日期，格式化为 MM.dd的形式
   */
  formatDateToDot: function (date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day].join('.');
  },




  /**
   * 实现滑动效果 
   * copy from https://blog.csdn.net/UFO00001/article/details/73163600
   */
  // 触摸开始事件  
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点  
    // 使用js计时器记录时间    
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸移动事件  
  touchMove: function (e) {
    var touchMove = e.touches[0].pageX;
    console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));

    // 向右滑动  
    if (touchMove - touchDot <= -45 && time < 10) {
      console.log('向右滑动');
      wx.switchTab({
        url: '../../showTable/table'
      });
    }
    if (touchMove - touchDot >= 100 && time < 10) {

    }
  },

  // 触摸结束事件  
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval  
    time = 0;
  }


})
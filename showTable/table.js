var touchDot = 0;//触摸时的原点    copy from https://blog.csdn.net/UFO00001/article/details/73163600
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动  
var interval = "";// 记录/清理时间记录  
const app = getApp()
// showTable/table.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userNameAndTime:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setUserNameAndTime()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 存放用户的姓名和时间，第一个为上周的，第二个为本周的，依次类推
   */
  setUserNameAndTime:function(){
    var userNameAndTime = []
    var userNameList = app.globalData.currentUserNameList;
    var userTimeList = app.globalData.currentUserTimeList;
    var userNumbers = app.globalData.initUserNameList.length;
    userNameAndTime.push({ "name": userNameList[userNumbers-1], "time": userTimeList[userNumbers-1] });
    for(var userIndex = 0; userIndex < userNumbers -1; userIndex ++){
      userNameAndTime.push({"name":userNameList[userIndex], "time":userTimeList[userIndex] });
    }
    this.setData({
      userNameAndTime: userNameAndTime
    })
    console.log('table page set name and time successful')
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
    // 向左滑动    
    if (touchMove - touchDot >= 50  && time < 10) {
      wx.switchTab({
        url: '../pages/index/index'
      });
    }

    if (touchMove - touchDot <= -100 && time < 10) {

    }
  },
  // 触摸结束事件  
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval  
    time = 0;
  }

})
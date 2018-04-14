# WeeklySchedule
微信小程序实现的排班表，没有使用服务器。数据是初始的时候设置的，运行后不能修改，除非再次修改数据后提交才能改变。
需要在app.js文件末尾部分配置两个数据：initDate 和 initUserNameList。其中initDate是初始时间，必须为周一，而且必须用“/”隔开，否则iso会出现不兼容现象。
initUserNameList为初始用户姓名，第一个用户为initDate设置时间值周的用户，以后依次类推。

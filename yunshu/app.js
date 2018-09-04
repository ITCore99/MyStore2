//app.js
const Towxml=require("/towxml/main")
App({
  data:{
  },
  onLaunch: function () {
  },
  towxml:new Towxml(),
  globalData:{
    userInfo:null
  }
})
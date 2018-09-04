import {MyFetch} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      bookID:"",
      bookContent:{},
      isLoading:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookID:options.id,
    });
    this.getData()
  },
  /**
   *获取数据
   */
  getData(id)
  {
    this.setData({
      isLoading:true,
    });
    MyFetch.get(`/book/${this.data.bookID}`).then(res=>{
      this.setData({
        bookContent:res,
        isLoading: false,
      });
    }).catch(err=>{
      console.log(err);
      this.setData({
        isLoading: false,
      });
    })
  },
  /**
   * 跳转函数
   */
  JumpCatalog(e)
  {
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookID}`,
    });
  }

})
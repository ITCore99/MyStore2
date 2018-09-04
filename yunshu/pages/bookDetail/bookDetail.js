import {MyFetch} from "../../utils/util.js"
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    catalogID:"",
    bookID:"",
    catalogName:"",
    BookContent:{},
    catalogData:[],
    isShow:false,/**通过变量控制目录与遮罩层的显示 */
    isLoading:false,/**控制加载页的实现 */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      catalogID: options.id, 
      bookID: options.bookID, 
    });
    this.getData();
    this.getCatalog();
  },
  /**
   * 获取内容数据
   */
  getData()
  { 
    this.setData({
      isLoading: true,
    });
    MyFetch.get(`/article/${this.data.catalogID}`).then(res=>{
      let data = app.towxml.toJson(res.data.article.content,"markdown");
     this.setData({
       BookContent:data,
       catalogName:res.data.title,
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
   * 获取目录
   */
  getCatalog()
  { 
    this.setData({
      isLoading: true,
    });
    MyFetch.get(`/titles/${this.data.bookID}`).then(res => {
      this.setData({
        catalogData: res.data,
        isLoading: false,
      });
    }).catch(err => {
      console.log(err);
      this.setData({
        isLoading: false,
      });
    })
  },
  /**
   * 定义目录切换函数
   */
  toggleCatalog()
  {
    let isShow=!this.data.isShow;
    this.setData({
      isShow,
    });
  },
  /**
   * 定义目录点击函数
   */
  handGet(e)
  {
      let id=e.currentTarget.dataset.id;
      this.setData({
        catalogID:id,
     });
     this.getData(); //注意尽量应变量表示
  }
})
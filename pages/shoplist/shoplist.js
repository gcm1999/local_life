// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: {},
    shopList: [],
    page: 1,
    pageSize: 10,
    total: 0,
    isloading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      query: options
    });
    this.getShopList();
    wx.setNavigationBarTitle({
      title: options.title
    })
  },

  getShopList(cb) {
    // 设置节流阀
    this.setData({
      isloading: true
    })
    // 展示loading效果
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method: 'GET',
      data: {
        _page: this.data.page,
        _limit: this.data.pageSize
      },
      success: (res) => {
        // console.log(res);
        this.setData({
          shopList: [...this.data.shopList, ...res.data],
          total: res.header['X-Total-Count'] - 0
        });
      },
      complete: () => {
        wx.hideLoading();
        this.setData({
          isloading: false
        })
        cb && cb()
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      page: 1,
      shopList: [],
      total: 0
    })
    // 重新发起数据请求
    this.getShopList(() => {
      // 关闭下拉刷新
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 判断数据是否还有下一页
    if (this.data.page * this.data.pageSize >= this.data.total) {
      return wx.showToast({
        title: '到底啦！',
        icon: 'none'
      })
    }
    if (this.data.isloading) return
    this.setData({
      page: this.data.page + 1
    })
    // console.log(this.data.page);
    this.getShopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
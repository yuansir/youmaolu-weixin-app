// pages/image.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    currentPage: 1,
    totalPages: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: app.globalData.api + "images",
      complete: function (response) {
        if (response.data.status_code != 200) {
          console.log('error...')
        }
        that.setData({ images: response.data.data.list, currentPage: response.data.data.currentPage, totalPages: response.data.data.totalPages })
      },
    })
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
    if (this.data.currentPage == this.data.totalPages) {

    }
    wx.showNavigationBarLoading()
    let that = this
    wx.request({
      url: app.globalData.api + "images",
      data: { page: ++that.data.currentPage },
      complete: function (response) {
        if (response.data.status_code != 200) {
          console.log('error...')
        }
        wx.hideNavigationBarLoading()
        that.setData({ images: response.data.data.list.concat(that.data.images), currentPage: response.data.data.currentPage, totalPages: response.data.data.totalPages })
      },
    })
    wx.stopPullDownRefresh
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

  show: function (e) {
    let src = e.currentTarget.dataset.src
    wx.previewImage({
      current: src,
      urls: [src]
    })
  }
})
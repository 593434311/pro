Component({

  properties: {
    dataCode: String
  },
  data: {

  }, 
  methods: {
    copyTBL:function(){
      wx.setClipboardData({
        data: this.data.dataCode,
        success: function (res){
          wx.getClipboardData({
            success: function(res) {
              console.log(res.data) 
            }
          })  
        }
      })
    }
  }
})
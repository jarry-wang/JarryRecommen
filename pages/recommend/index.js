//index.js
var Bmob = require('../../utils/bmob.js');
var that;
Page({
	data: {
		imgUrls: [
		],
		recommends:{},
		recommendsList:[]
	},
	onLoad: function() {
		that = this;
		var rs = {},
			rsList = [],
			idsMap = {},
			len = 0;


		var Song = Bmob.Object.extend("Song");
        var query = new Bmob.Query(Song);
        query.descending("updatedAt");
        // 查询所有数据
        query.find({
            success: function(results) {
            console.log("共查询到 " + results.length + " 条记录");
			len = results.length;
			for (var i = 0; i <  len; i++) {
				var k = results[i].id;
				rsList.push(results[i]);
				rs[k] = results[i];
				idsMap[k] = {
					preid: i > 0 ? results[i - 1].id : 0,
					nextid: i < len - 1 ? results[i + 1].id : 0
				}
			}
		    idsMap[results[0].id].preid = results[len - 1].id;
			idsMap[results[len - 1].id].nextid = results[0].id;

			console.log("rs["+k+"]="+rs[k]);
			
			that.setData({
				recommends: rs,
				recommendsList : rsList
			});
			wx.setStorageSync('ids', idsMap);
			wx.setStorageSync('songs', that.data.recommends);
          },
          error: function(error) {
            console.log("查询失败: " + error.code + " " + error.message);
          }
        });   
		this.getBanner();
	},
	playTap: function(e) {
		const dataset = e.currentTarget.dataset;
		 console.log("playTap--id="+dataset.id+";"+that.data.recommends);
		wx.navigateTo({
			url: `../play/index?id=${dataset.id}`
		})
	},
	getBanner: function(){
		var Banner = Bmob.Object.extend("Banner");
        var query = new Bmob.Query(Banner);
        query.descending("updatedAt");
        // 查询所有数据
        query.find({
            success: function(results) {
            console.log("共查询到 " + results.length + " 条记录");
			
			that.setData({
				imgUrls:results,
			});
          },
          error: function(error) {
            console.log("查询失败: " + error.code + " " + error.message);
          }
        });   

	}
})
var store = require("mods:store");

angular.module('Services.Order', [])
.factory("Order", function(){
	return {
		Create: function(tempOrder, callback){
			setTimeout(function(){
				callback({
					code: 200,
					content: {
						orderId: 1
					}
				});
			}, 1000);
		},
		List: function(filters, callback){
			setTimeout(function(){
				callback({
					code: 200,
					content: {
						page: 1,
						pageCount: 5,
						orders: [{
							orderId: 1234567,
							tourName: "巴厘岛6日4晚•尊享双岛",
							travelDate: "12/10",
							people: 3,
							price: 29999,
							status: "待支付"
						}, {
							orderId: 1234567,
							tourName: "巴厘岛6日4晚•尊享双岛",
							travelDate: "12/10",
							people: 3,
							price: 29999,
							status: "待支付"
						}, {
							orderId: 1234567,
							tourName: "巴厘岛6日4晚•尊享双岛",
							travelDate: "12/10",
							people: 3,
							price: 29999,
							status: "待支付"
						}, {
							orderId: 1234567,
							tourName: "巴厘岛6日4晚•尊享双岛",
							travelDate: "12/10",
							people: 3,
							price: 29999,
							status: "待支付"
						}, {
							orderId: 1234567,
							tourName: "巴厘岛6日4晚•尊享双岛",
							travelDate: "12/10",
							people: 3,
							price: 29999,
							status: "待支付"
						}, {
							orderId: 1234567,
							tourName: "巴厘岛6日4晚•尊享双岛",
							travelDate: "12/10",
							people: 3,
							price: 29999,
							status: "待支付"
						}, {
							orderId: 1234567,
							tourName: "巴厘岛6日4晚•尊享双岛",
							travelDate: "12/10",
							people: 3,
							price: 29999,
							status: "待支付"
						}, {
							orderId: 1234567,
							tourName: "巴厘岛6日4晚•尊享双岛",
							travelDate: "12/10",
							people: 3,
							price: 29999,
							status: "待支付"
						}, {
							orderId: 1234567,
							tourName: "巴厘岛6日4晚•尊享双岛",
							travelDate: "12/10",
							people: 3,
							price: 29999,
							status: "待支付"
						}, {
							orderId: 1234567,
							tourName: "巴厘岛6日4晚•尊享双岛",
							travelDate: "12/10",
							people: 3,
							price: 29999,
							status: "待支付"
						}]
					}
				});
			}, 1000);
		},
		Info: function(orderId, callback){
			setTimeout(function(){
				callback({
					code: 200,
					content: {
						id: 157296,
						price: 29999,
						status: "待支付",
						time: "2015-11-11 11:11:11",
						tour: {
							id: 1,
							code: "ETI-BJPYZMU-151124-02",
							name: "巴厘岛6日4晚•尊享双岛",
							travelDate: "2015-12-10"
						},
						sales: {
							name: "张三",
							tel: "13666666666"
						},
						customer: {
							name: "李四",
							tel: "13888888888"
						},
						users: [{
							name: "王五",
							type: "成人"
						}, {
							name: "赵六",
							type: "成人"
						}, {
							name: "聂七",
							type: "儿童	"
						}]
					}
				})
			}, 1000);
		},
		// 清位订单
		ClearList: function(){},
		// 全部清位订单
		AllClearList: function(){}
	};
})
// 临时订单
.factory("TempOrder", function(){
	var tempOrderStoreKey = "temp-order-store-key";

	return {
		// 创建临时订单
		Create: function(info){
			store.set(tempOrderStoreKey, JSON.stringify(info));
		},
		// 更新临时订单
		Extend: function(info){
			var data = this.Get();
			data = angular.extend(data, info);
			this.Create(data);
		},
		// 获取临时订单信息
		Get: function(){
			var data = store.get(tempOrderStoreKey);
			if(data){
				try{
					data = JSON.parse(data);
				}catch(e){
					data = {};
				}
			}
			return data || {};
		},
		// 清空临时订单
		Clear: function(){
			store.remove(tempOrderStoreKey);
		}
	};
});
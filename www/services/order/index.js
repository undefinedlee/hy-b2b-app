var store = require("mods:store");

angular.module('Services.Order', [])
.factory("Order", function(){
	return {
		List: function(filters){},
		Info: function(orderId){},
		ClearList: function(){},
		AllClearList: function(){},
		Booking: function(infos){}
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
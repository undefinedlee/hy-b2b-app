angular.module('Services.Order', [])
.factory("Order", function(){
	return {
		List: function(filters){},
		Info: function(orderId){},
		ClearList: function(){},
		AllClearList: function(){},
		Booking: function(infos){}
	};
});
angular.module('Services.User', [])
.factory("User", function(){
	return {
		Info: function(){},
		ContactsList: function(){},
		// 根据客户获取销售
		Sales: function(customerId, callback){
			setTimeout(function(){
				callback({
					code: 200,
					content: [{
						name: "张三",
						value: 1
					}, {
						name: "李四",
						value: 2
					}, {
						name: "王五",
						value: 3
					}, {
						name: "赵六",
						value: 4
					}, {
						name: "混蛋",
						value: 5
					}]
				});
			}, 1000);
		},
		// 根据销售获取客户
		Customers: function(salesId, callback){
			setTimeout(function(){
				callback({
					code: 200,
					content: [{
						name: "张三",
						value: 1
					}, {
						name: "李四",
						value: 2
					}, {
						name: "王五",
						value: 3
					}, {
						name: "赵六",
						value: 4
					}, {
						name: "混蛋",
						value: 5
					}]
				});
			}, 1000);
		}
	};
});
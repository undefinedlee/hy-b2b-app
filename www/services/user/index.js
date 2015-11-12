angular.module('Services.User', [])
.factory("User", function(){
	return {
		CheckLogin: function(callback){
			setTimeout(function(){
				callback({
					code: 200,
					content: {
						id: 1,
						name: "路飞",
						type: "customer"
					}
				});
			}, 1000);
		},
		Login: function(info, callback){
			setTimeout(function(){
				if(info.username && info.password){
					callback({
						code: 200,
						content: {
							id: 1,
							name: "路飞",
							type: "customer"
						}
					});
				}else{
					callback({
						code: 500,
						msg: "用户名/密码不能为空"
					});
				}
			}, 1000);
		},
		Info: function(userId, callback){
			setTimeout(function(){
				callback({
					code: 200,
					content: {
						id: 1,
						name: "路飞",
						type: "customer",
						sex: "男",
						company: "",
						department: ""
					}
				});
			}, 1000);
		},
		ContactsList: function(){},
		// 获取登录用户关联的销售或者客户
		LinkSalesOrCustomers: function(callback){
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
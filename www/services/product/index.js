angular.module('Services.Product', [])
.factory("Product", function(){
	return {
		List: function(filters, callback){
			console.log(filters);
			setTimeout(function(){
				callback({
					code: 200,
					content: {
						"page": 2,
						"pageCount": 6,
						"products": [{
							"id": 1,
							"name": "法瑞意德13天11晚（AZ）·金色山口+少女峰",
							"hasMore": true,
							"tours": [{
								"id": 1,
								"date": "11/21",
								"price": 12999,
								"num": 2
							}, {
								"id": 2,
								"date": "12/18",
								"price": 12999,
								"num": 2
							}]
						}, {
							"id": 2,
							"name": "法瑞意德13天11晚（AZ）·金色山口+少女峰",
							"hasMore": false,
							"tours": [{
								"id": 3,
								"date": "11/21",
								"price": 12999,
								"num": 2
							}, {
								"id": 4,
								"date": "12/18",
								"price": 12999,
								"num": 2
							}]
						}, {
							"id": 2,
							"name": "法瑞意德13天11晚（AZ）·金色山口+少女峰",
							"hasMore": false,
							"tours": [{
								"id": 3,
								"date": "11/21",
								"price": 12999,
								"num": 2
							}, {
								"id": 4,
								"date": "12/18",
								"price": 12999,
								"num": 2
							}]
						}, {
							"id": 2,
							"name": "法瑞意德13天11晚（AZ）·金色山口+少女峰",
							"hasMore": false,
							"tours": [{
								"id": 3,
								"date": "11/21",
								"price": 12999,
								"num": 2
							}, {
								"id": 4,
								"date": "12/18",
								"price": 12999,
								"num": 2
							}]
						}, {
							"id": 2,
							"name": "法瑞意德13天11晚（AZ）·金色山口+少女峰",
							"hasMore": false,
							"tours": [{
								"id": 3,
								"date": "11/21",
								"price": 12999,
								"num": 2
							}, {
								"id": 4,
								"date": "12/18",
								"price": 12999,
								"num": 2
							}]
						}, {
							"id": 2,
							"name": "法瑞意德13天11晚（AZ）·金色山口+少女峰",
							"hasMore": false,
							"tours": [{
								"id": 3,
								"date": "11/21",
								"price": 12999,
								"num": 2
							}, {
								"id": 4,
								"date": "12/18",
								"price": 12999,
								"num": 2
							}]
						}, {
							"id": 2,
							"name": "法瑞意德13天11晚（AZ）·金色山口+少女峰",
							"hasMore": false,
							"tours": [{
								"id": 3,
								"date": "11/21",
								"price": 12999,
								"num": 2
							}, {
								"id": 4,
								"date": "12/18",
								"price": 12999,
								"num": 2
							}]
						}, {
							"id": 2,
							"name": "法瑞意德13天11晚（AZ）·金色山口+少女峰",
							"hasMore": false,
							"tours": [{
								"id": 3,
								"date": "11/21",
								"price": 12999,
								"num": 2
							}, {
								"id": 4,
								"date": "12/18",
								"price": 12999,
								"num": 2
							}]
						}, {
							"id": 2,
							"name": "法瑞意德13天11晚（AZ）·金色山口+少女峰",
							"hasMore": false,
							"tours": [{
								"id": 3,
								"date": "11/21",
								"price": 12999,
								"num": 2
							}, {
								"id": 4,
								"date": "12/18",
								"price": 12999,
								"num": 2
							}]
						}, {
							"id": 2,
							"name": "法瑞意德13天11晚（AZ）·金色山口+少女峰",
							"hasMore": false,
							"tours": [{
								"id": 3,
								"date": "11/21",
								"price": 12999,
								"num": 2
							}, {
								"id": 4,
								"date": "12/18",
								"price": 12999,
								"num": 2
							}]
						}]
					}
				});
			}, 2000);
		}
	};
})
.factory("Tour", function(){
	return {
		Info: function(tourId){},
		Sales: function(){},
		SalesAll: function(){},
		Favorite: function(tourId){},
		FavoriteList: function(){}
	};
});
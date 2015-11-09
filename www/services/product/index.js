angular.module('Services.Product', [])
.factory("Product", function(){
	return {
		List: function(filters, callback){
			console.log(filters);
			setTimeout(function(){
				callback({
					code: 200,
					content: {
						"page": filters.page,
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
			}, 3000);
		}
	};
})
.factory("Tour", function(){
	return {
		Info: function(tourId, callback){
			setTimeout(function(){
				callback({
					code: 200,
					content: {
						id: 1,
						name: "五渔村+德法瑞意4国13天10晚（4钻）CZ FCO-CDG（华中区）",
						level: 3,
						startCity: "上海",
						num: 6,
						price: 12999,
						days: 12,
						features: ["免费wifi", "包机直飞"],
						tours: [{
							id: 1,
							date: "11/20"
						}, {
							id: 2,
							date: "12/10"
						}],
						summary: {}
					}
				});
			}, 1000);
		},
		Trips: function(tourId, callback){
			setTimeout(function(){
				callback({
					code: 200,
					content: [{
						day: 1,
						title: "北京 - 巴厘岛",
						flight: "MU780 PEK/DPS 16:00/00:50",
						meals: "中餐 晚餐",
						hotel: "待定",
						desc: "今日搭乘东航航空公司国际航班途径上海转机前往美国西部城市洛杉矶。\n抵达后导游接机，【好莱坞星光大道】（不少于20分钟）--是条沿着美国好莱坞大道与藤街伸展的人行道，影迷们可以追寻到点点星迹，星光布道上排列着2000多镶铜的五角星，内有姓名和不同的图案，代表明星在电影，电视，广播，唱片及舞台表演方面的成就；【中国戏院】（外观不少于10分钟）--好莱坞大道上最吸引人的地方，这座剧院据说是建造者心仪中国文化而得名。【华特•迪士尼音乐厅】外观拍照留念，可以进入音乐厅大门内，但不进表演大厅（不少于20分钟），【斯坎普中心】是NBA“洛杉矶湖人队““洛杉矶快船队”的主场，也是冰球“国王队”的主场（不少于20分钟），晚餐后入住酒店休息调整时差。"
					}, {
						day: 2,
						title: "巴厘岛",
						flight: "",
						meals: "早餐 中餐 晚餐",
						hotel: "待定",
						desc: "早餐后，酒店办理退房手续，继续行程前往长滩（Long  Beach），长滩是洛杉矶南部的一个港口城市，城市的名字来源于9公里长的海岸线，以疗养胜地而闻名。您可在码头包船出海，出海区域应以看到海豹海鸟等海洋生物。之后前往长滩水族馆，在这巨大的水族馆里，你可以亲眼目睹生活在17个不同环境的栖息地的12，000种海洋动物和550种海洋植物，之后返回洛杉矶前往杜比剧院又称柯达剧院（Kodak  Theatre）位于美国加州好莱坞的好莱坞大道  (Hollywood  Blvd.)上，2001年11月9日启用，是奥斯卡金像奖颁奖礼的举行地点，在2002年开始成为奥斯卡的永久举行地。  柯达剧院是专门为奥斯卡颁奖礼而设计，可容纳3,400名观众，设有全美国其中一个最大的舞台。\n全部团员汇合，在杜比剧院享用盛大的晚会。\n晚餐后返回酒店入住"
					}]
				});
			}, 1000);
		},
		ExtendInfo: function(tourId, callback){
			setTimeout(function(){
				callback({
					code: 200,
					content: {}
				});
			}, 1000);
		},
		TourList: function(productId, callback){
			setTimeout(function(){
				callback({
					code: 200,
					content: [{
						"id": 1,
						"date": "11/21",
						"price": 12999,
						"num": 2
					}, {
						"id": 2,
						"date": "12/18",
						"price": 12999,
						"num": 2
					}, {
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
				});
			}, 5000);
		},
		Sales: function(){},
		SalesAll: function(){},
		Favorite: function(tourId){},
		FavoriteList: function(){}
	};
});
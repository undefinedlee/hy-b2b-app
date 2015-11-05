angular.module('Services.Common', [])
.factory("Common", function(){
	return {
		StartCity: function(callback){
			return callback([]);
		},
		Dest: function(callback){
			return callback([{
				name: "热门",
				items: [{
					name: "希腊",
					value: 11
				},{
					name: "瑞士瑞",
					value: 12
				},{
					name: "瑞士瑞士",
					value: 13
				},{
					name: "瑞士瑞士瑞",
					value: 14
				},{
					name: "瑞士瑞士瑞士",
					value: 15
				},{
					name: "瑞士瑞士瑞士瑞",
					value: 16
				},{
					name: "瑞士瑞士瑞士瑞士",
					value: 17
				},{
					name: "瑞士",
					value: 18
				},{
					name: "瑞士",
					value: 19
				},{
					name: "瑞士",
					value: 110
				},{
					name: "瑞士",
					value: 111
				},{
					name: "瑞士",
					value: 112
				},{
					name: "瑞士",
					value: 113
				},{
					name: "瑞士",
					value: 114
				},{
					name: "瑞士",
					value: 115
				}]
			}, {
				name: "欧洲",
				items: [{
					name: "希腊",
					value: 21
				},{
					name: "瑞士",
					value: 22
				}]
			}, {
				name: "亚洲",
				items: [{
					name: "希腊",
					value: 31
				},{
					name: "瑞士",
					value: 32
				}]
			}, {
				name: "澳美非",
				items: [{
					name: "希腊",
					value: 41
				},{
					name: "瑞士",
					value: 42
				}]
			}, {
				name: "海岛",
				items: [{
					name: "希腊",
					value: 51
				},{
					name: "瑞士",
					value: 52
				}]
			}]);
		},
		LinePlay: function(callback){
			return callback([{
				name: "选项一",
				value: 1
			}, {
				name: "选项二",
				value: 2
			}, {
				name: "选项三",
				value: 3
			}, {
				name: "选项四",
				value: 4
			}, {
				name: "选项五",
				value: 5
			}]);
		},
		ProductFeature: function(callback){
			return callback([{
				name: "选项一",
				value: 1
			}, {
				name: "选项二",
				value: 2
			}, {
				name: "选项三",
				value: 3
			}, {
				name: "选项四",
				value: 4
			}, {
				name: "选项五",
				value: 5
			},{
				name: "选项六",
				value: 6
			}, {
				name: "选项七",
				value: 7
			}, {
				name: "选项八",
				value: 8
			}, {
				name: "选项九",
				value: 9
			}, {
				name: "选项十",
				value: 10
			}]);
		}
	};
});
require("./index.styl");
var template = require("./main.txt");

angular.module('mods.tool-panel', [])
.factory("toolPanel", function($compile, $rootScope, $templateRequest, $timeout, $document){
	var node, bg, container;
	
	function createPanel(){
		node = angular.element(template);
		$document[0].body.appendChild(node[0]);
		bg = angular.element(node[0].querySelector(".tool-panel-bg"));
		mod.container = container = angular.element(node[0].querySelector(".tool-panel-body"));
	}
	
	var mod = {
		container: null,
		onBeforeShow: function(){},
		onBeforeHide: function(){},
		show: function(options){
			if(!node){
				createPanel();
	
				bg.on("click", function(){
					mod.hide();
				});
			}
			
			var self = this;

			function view(options){
				container.html(options.template);
				$compile(container.contents())(options.scope || $rootScope.$new());
				
				node.removeClass("hide");
				self.onBeforeShow();
				$timeout(function(){
					node.addClass("tool-panel-show");
				}, 1, false);
			}
			
			if(options.templateUrl){
				$templateRequest(options.templateUrl, true).then(function(response) {
					view({
						template: response,
						scope: options.scope
					});
				});
			}else if(options.template){
				view({
					template: options.template,
					scope: options.scope
				});
			}
		},
		hide: function(){
			node.removeClass("tool-panel-show");
			var self = this;
			$timeout(function(){
				self.onBeforeHide();
				node.addClass("hide");
			}, 200, false);
		}
	};
	
	return mod;
});
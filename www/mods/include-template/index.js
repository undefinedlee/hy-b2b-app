angular.module('mods.include-template', [])
.factory("includeTemplateDelegate", function(){
	var listeners = {};

	return {
		ready: function(handle, listener){
			if(!listeners[handle]){
				listeners[handle] = [];
			}else if(listeners[handle] === true){
				listener();
				return;
			}
			listeners[handle].push(listener);
		},
		_trigger: function(handle){
			if(listeners[handle] === true){
				return;
			}

			if(listeners[handle]){
				listeners[handle].forEach(function(listener){
					listener();
				});
			}
			listeners[handle] = true;
		},
		reset: function(handle){
			if(listeners[handle] === true){
				listeners[handle] = [];
			}
		}
	};
})
.directive("includeTemplate", function($rootScope, $compile, $document, includeTemplateDelegate){
	return {
		restrict: "EA",
		scope: false,
		compile: function compile(element, attrs, linkFn) {
			var content = attrs["content"];
			var delegateHandle = attrs["delegateHandle"];
			
			return function(scope, element, attrs, controller){
				scope.$watch(content, function(value){
					element.html(value);

					var templateNodes = element.contents();
					$compile(templateNodes)(scope);

					if(delegateHandle){
						includeTemplateDelegate._trigger(delegateHandle);
					}
				});
			};
		}
	};
});
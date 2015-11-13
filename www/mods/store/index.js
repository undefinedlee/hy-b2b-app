var api               = {},
    win               = window,
    localStorageName  = 'localStorage',
    storage;

try{
    if (localStorageName in win && win[localStorageName]) {
        storage    = win[localStorageName];
        api.set    = function (key, val) { storage.setItem(key, val) };
        api.get    = function (key)      { return storage.getItem(key) };
        api.remove = function (key)      { storage.removeItem(key) };
        api.clear  = function ()         { storage.clear() };

    }
}catch(e){
    storage = {};
    api.set    = function (key, value) {
        storage[key] = value;
    };
    api.get    = function (key)        {
        return storage[key];
    };
    api.remove = function (key)        {
        delete storage[key];
    };
    api.clear  = function ()           {
        storage = {};
    };
}

module.exports = api;
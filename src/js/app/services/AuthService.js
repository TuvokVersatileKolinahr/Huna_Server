app.factory("AuthService", function($rootScope, CacheFactory) {
  var isAuthenticated = function() {
    console.log("check you");

    // Lazy load the cache
    if (!CacheFactory.get('userCache')) {
      userCache = CacheFactory.createCache('userCache', {
        // Cache will hold data in localStorage if available.
        // Data is not cleared when the page is refreshed
        storageMode: 'localStorage' 
      });
    }

    if ($rootScope.auth && $rootScope.auth.user) {
      return true;
    } else {
      //check the cache for a user
      var userCache = CacheFactory.get('userCache');
      if (userCache) {
        var user = userCache.get('auth');
        if (user) {
          $rootScope.auth = user;
          return true;
        } else {
          return false;
        }
      }
    }
  },

  saveLogin = function(user) {
    console.log("Saving ... ", user);

    // Lazy load the cache
    if (!CacheFactory.get('userCache')) {
      userCache = CacheFactory.createCache('userCache', {
        // Cache will hold data in localStorage if available.
        // Data is not cleared when the page is refreshed
        storageMode: 'localStorage' 
      });
    }

    var userCache = CacheFactory.get('userCache');
    userCache.put('auth', user);
    $rootScope.auth = user;
    return true;
  },

  clearLogin = function() {
    console.log("User in scope: ", $rootScope.auth.user);
    delete $rootScope.auth.user;
  },

  getToken = function() {
    return $rootScope.auth.user.token;
  };

  return {
    clearLogin: clearLogin,
    isAuthenticated: isAuthenticated,
    saveLogin: saveLogin
  };
});
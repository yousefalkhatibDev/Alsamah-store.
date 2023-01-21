var app = angular.module('myApp', []);
app.constant('puplicUrl', window.location.origin + '/api/ext/');
app.constant('secureUrl', window.location.origin + '/api/sec'); 
app.constant('baseUrl', window.location.origin);
/*app.service('dataService', function() {
  var dataService = this;
   dataService.nameTest= 1;
});*/
app.service('sharedProperties', function () {
        var property ;
        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
    });
app.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue || false;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key, defaultValue) {
      if($window.localStorage[key] != undefined){
          return JSON.parse($window.localStorage[key]);
      }else{
        return defaultValue || false;
      }
    },
    remove: function(key){
      $window.localStorage.removeItem(key);
    },
    clear: function(){
      $window.localStorage.clear();
    }
  }
}]);
app.controller('mainCtrl', function ($scope, baseUrl, $rootScope, $location, $http,puplicUrl,secureUrl, $sce,$httpParamSerializer,sharedProperties
                                     ,$localstorage,$window) {
    $rootScope.hasTopHeader = false;
    $rootScope.userIdLoggingIn = null;
    $rootScope.languages = [
        { name: 'English', value: 'en', id: "1" },
        { name: 'Arabic', value: 'ar', id: "2" }   
    ];
    
    $rootScope.Countries = [{
        "ID": "USA",
        "Description": "United States",
        "CurrencyID": "USD",
        "PhoneKey": "+1",
        "Image": "usa.svg",
        "DescriptionAr": "الولايات المتحدة",
        "DescriptionEn": "United States",
        "ISO": "US",
        "TaxPercentages": null
      },{
        "ID": "JOR",
        "Description": "Jordan",
        "CurrencyID": "JOD",
        "PhoneKey": "+962",
        "Image": "jordan.svg",
        "DescriptionAr": "الاردن",
        "DescriptionEn": "Jordan",
        "ISO": "JO",
        "TaxPercentages": "[{TaxPercentage':16.000}]"
      },{
        "ID": "SAU",
        "Description": "Saudi Arabia",
        "CurrencyID": "SR",
        "PhoneKey": "+966",
        "Image": "ksa.svg",
        "DescriptionAr": "المملكة العربية السعودية",
        "DescriptionEn": "Saudi Arabia",
        "ISO": "SA",
        "TaxPercentages": null
      },{
        "ID": "ARE",
        "Description": "United Arab Emirates",
        "CurrencyID": "USD",
        "PhoneKey": "+971",
        "Image": "uae.svg",
        "DescriptionAr": "الامارات العربية المتحدة",
        "DescriptionEn": "United Arab Emirates",
        "ISO": "AE",
        "TaxPercentages": null
      },{
        "ID": "EGY",
        "Description": "Egypt",
        "CurrencyID": "EGP",
        "PhoneKey": "+20",
        "Image": "egypt.svg",
        "DescriptionAr": "مصر",
        "DescriptionEn": "Egypt",
        "ISO": "EG",
        "TaxPercentages": null
      }
  ]
});

app.factory('BearerAuthInterceptor', function ($window, $q) {
    return {
        request: function(config) {
            if(config.url.includes("/api/sec")){
                config.headers = config.headers || {};
                if ($window.localStorage.getItem('UserData')) {
                    var access_token = JSON.parse($window.localStorage.getItem('UserData')).access_token
                    config.headers.Authorization = 'Bearer ' + access_token;
                }
            }
            return config || $q.when(config);
        },
        response: function(response) {
            if (response.status === 401) {
                localStorage.removeItem('UserData');
                if(route.Values.pagePath.match("Account") || route.Values.pagePath.match("subscription") || route.Values.pagePath.match("Payment")) {
                     location.href = "/"+route.Values.lang+"/Home"
                }
                else{
                    location.reload();
                } 
            }
            return response || $q.when(response);
        }
    };
    
});

app.controller("headerController", function ($scope, $rootScope, $http, $window, $httpParamSerializer, puplicUrl) {
  $rootScope.Countries;
  $rootScope.menuOpen = false;
  $rootScope.cartOpen = false;
  $rootScope.regionOpen = false;
  $rootScope.productOpen = true;
  $scope.shoppingCartItems;
  $scope.shoppingCartLength;
  $scope.linkProfileHref = "login"
  if($window.localStorage.getItem("currency")) {
      $rootScope.currency = $window.localStorage.getItem("currency")
  }
  $scope.isLoggedIn = function () {
      if($window.localStorage.getItem("userIdStorage")) {
         $scope.linkProfileHref = "hello-page"
      }
  }
  $scope.isLoggedIn()
  
  $scope.addToItemQty = function (item) {
      let shoppingCartArr = JSON.parse($window.localStorage.getItem("shoppingCart"))
      
      shoppingCartArr.map((obj, i) => {
           if( obj.ProductID === item.ProductID ) { 
               return shoppingCartArr[i].Qty += 1
           };
      });
      $window.localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartArr));
      $rootScope.getShoppingCartItems();
  }
    
  $scope.subtractFromItemQty = function (item) {
      let shoppingCartArr = JSON.parse($window.localStorage.getItem("shoppingCart"))
      
      shoppingCartArr.map((obj, i) => {
           if( obj.ProductID === item.ProductID ) { 
               if(shoppingCartArr[i].Qty <= 1) return;
               return shoppingCartArr[i].Qty -= 1
           };
      });
      $window.localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartArr));
      $rootScope.getShoppingCartItems();
  }
  
  $scope.openCart = function () {
    if ($rootScope.cartOpen == false) { $rootScope.cartOpen = true }
    else { $rootScope.cartOpen = false }
  }
  $scope.openMenu = function () {
    if ($rootScope.menuOpen == false) { $rootScope.menuOpen = true }
    else { $rootScope.menuOpen = false }
  }
  $scope.openRegion = function () {
    if ($rootScope.regionOpen == false) { $rootScope.regionOpen = true }
    else { $rootScope.regionOpen = false }
  }
  $scope.productOpenFunc = function () {
    if ($rootScope.productOpen == false) { $rootScope.productOpen = true }
    else { $rootScope.productOpen = false }
  }
  $http.get(puplicUrl + "EC_GetLanguages?CompanyID=1&UserID=1")
    .then(function (response) {
      if (response.data != null) {
        $scope.languagesData = response.data;
      }
      else {
        $scope.languagesData = []
      }
    });

  $scope.GetCategoriesFunc = function () {
    $http.get(puplicUrl + "EC_GetCategories?CompanyID=1&UserID=45&Query=NULL&Paging=NULL&LanguageID=1")
      .then(function (response) {
        if (response.data != null) {
          $rootScope.categoriseData = response.data;
        }
        else {
          $rootScope.categoriseData = []
        }
      });

  }

  $scope.GetCategoriesFunc.call();
  $rootScope.getShoppingCartItems = function () {
      $scope.shoppingCartItems = JSON.parse($window.localStorage.getItem("shoppingCart"));
      if($scope.shoppingCartItems) {
          $scope.shoppingCartLength = $scope.shoppingCartItems.length;
      } else {
          $scope.shoppingCartLength = 0;
      }
  };
  $rootScope.getShoppingCartItems();
    
  $scope.removeFromCart = function (item) {
      let shoppingCartItems = JSON.parse($window.localStorage.getItem("shoppingCart"));
      let filteredShoppingCartItems = shoppingCartItems.filter((obj) => {
          return JSON.stringify({...obj}) !== JSON.stringify({...item})
      });
      $window.localStorage.setItem("shoppingCart", JSON.stringify(filteredShoppingCartItems))
      $rootScope.getShoppingCartItems();
      // $window.localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartItems));
  };
  
  $scope.changeCurrency = function (currency) {
      $window.localStorage.setItem("currency", currency)
      $rootScope.currency = $window.localStorage.getItem("currency")
  }
    
  $rootScope.heartAnimation = function (event) {
       angular.element(event.target).addClass('heartAnimation');
       setTimeout(function() {
        angular.element(event.target).removeClass('heartAnimation');
       }, 500);
  }
    
  $rootScope.addToCartAnimation = function (event) {
       angular.element(event.target).addClass('addToCartAnimation');
       setTimeout(function() {
        angular.element(event.target).removeClass('addToCartAnimation');
       }, 500);
  }  
 /* $scope.addToCartFunc = function () {
    $rootScope.productAddToCartNumber = $rootScope.productAddToCartNumber + 1;

    var data = {
      "LanguageID": "1",
      "CompanyID": "1",
      "CountryID": "1",
      "UserID": "1",
      "Cart":
      {
        "RetailInvoiceID": null,
        "DiscountCodeID": 1,
        "CartItems": [
          {
            "RetailSalesInvoiceTransID": null,
            "ProductID": 1,
            "Qty": $rootScope.productAddToCartNumber,
            "SalesDiscount": 0,
            "SalesPrice": 150
          }
        ]
      }
    }
    $http({
      method: 'Post',
      url: puplicUrl + "EC_RetailSalesInvoice_Create",
      data: $httpParamSerializer(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function success(response) {
    }, function error(response) {
      $scope.msg = response.data
    });
  }
  $scope.DeleteProductFromCartFunc = function () {
    $http.get(puplicUrl + "EC_DeleteAccount?CompanyID=1&UserID=1&CountryID=1&LanguageID=1&Password=1234")
      .then(function (response) {
        if (response.data != null) {
        }
        else {
        }
      });

  }
  $scope.releaseFromCartFunc = function () {

    if ($rootScope.productAddToCartNumber > 0) {
      $rootScope.productAddToCartNumber = $rootScope.productAddToCartNumber - 1;
    }

    if ($rootScope.productAddToCartNumber == 0) {
      $scope.DeleteProductFromCartFunc();
    }
    var data = {
      "LanguageID": "1",
      "CompanyID": "1",
      "CountryID": "1",
      "CountryID": "1",
      "Cart":
      {
        "RetailInvoiceID": null,
        "DiscountCodeID": 1,
        "CartItems": [
          {
            "RetailSalesInvoiceTransID": null,
            "ProductID": 1,
            "Qty": $rootScope.productAddToCartNumber,
            "SalesDiscount": 0,
            "SalesPrice": 150
          }
        ]
      }
    }
    $http({
      method: 'Post',
      url: puplicUrl + "/EC_RetailSalesInvoice_Create",
      data: $httpParamSerializer(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function success(response) {
    }, function error(response) {
      $scope.msg = response.data
    });
  } */
});
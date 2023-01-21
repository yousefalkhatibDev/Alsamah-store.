app.controller("sharedController", function ($scope, $rootScope, $http,puplicUrl,$httpParamSerializer,sharedProperties,$window) {
  /*$rootScope.productAddToCartNumber = 1;
    $scope.addToCartFunc = function (item) {
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
            "ProductID": item.ProductID,
            "Qty": $rootScope.productAddToCartNumber,
            "SalesDiscount": 0,
            "SalesPrice": item.SalesPrice
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
        console.log(response.data)
    }, function error(response) {
      $scope.msg = response.data
      console.log(response.error)
    });
  } */ /*
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
      console.log(response.error)
    });
  } */
    
   /* $rootScope.addToMyCartFunc = function (product) {
        var isLoggingIn =  $window.localStorage.getItem('userIdStorage');
        if(isLoggingIn==null)
        {
             $scope.createalarm = function (alarm) {
 			$scope.alarms.push({
   				ProductID : product.ProductID , SalesPrice : product.SalesPrice , Description : product.Description 
 			});
            $window.localStorage['alarms'] = JSON.stringify($scope.alarms);
            $scope.setalarm.hide();};

              $scope.getalarms = function (){
                  $scope.alarms = JSON.parse(window.localStorage['alarms'] || '[]');
              };
            console.log($scope.alarms)
        }
    } */
});


app.controller("homeController", function ($scope, $rootScope, $httpParamSerializer, $http , $window, puplicUrl) {
  $rootScope.count = 1;
  $rootScope.hasTopHeader = true;
  $rootScope.sellerProductspageNumber = 0;
  $rootScope.productsOfferspageNumber = 0;
  $rootScope.productsNumbersToShow = 8; 
  $scope.bestSellerProducts;
  $rootScope.productsOffers;
  $rootScope.sliderCount = 4; 
  if($window.localStorage.getItem('userIdStorage')) {
      const userIdEncrypted = $window.localStorage.getItem('userIdStorage');
      const userIdDecrypted = CryptoJS.AES.decrypt(userIdEncrypted, "useridhash");
      $scope.userId = userIdDecrypted.toString(CryptoJS.enc.Utf8)
      $scope.isLoggedIn = $window.localStorage.getItem('userIdStorage');
  }
    
  $scope.addToCartFunc = function (item, imgSrc) {
      let shoppingCartArr = JSON.parse($window.localStorage.getItem("shoppingCart"));
      if(shoppingCartArr == null) shoppingCartArr = [];
      item['imgSrc'] = imgSrc;
      item.Qty = 1;
      let isReturn = false;
      shoppingCartArr.map(obj=>{
           if( obj.ProductID === item.ProductID ) { isReturn = true; };
      });
      if(isReturn === true) {
          return;
      }
      shoppingCartArr.push(item);
      $window.localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartArr));
      $rootScope.getShoppingCartItems();
  };
    
  $scope.showMore = function () {
    if($rootScope.productsLength >= 8 && $rootScope.productNumber < 10) {
      $rootScope.productNumber = $rootScope.productNumber + 2;
    }
  }
    
  $scope.showMoreProducts = function () {
     $rootScope.productsNumbersToShow = $rootScope.productsNumbersToShow + 4;
  };
  
  $scope.goProductsPage = function () {
     $window.location.href = 'https://mart.trio365.com:4433/en/products';
  };
    
  $scope.clickSlider = function () {
    if ($rootScope.count < 3) { $rootScope.count = $rootScope.count + 1; }
    else {
      $rootScope.count = 1;
    }
  };
    
  $scope.GetBestSellerProductsFunc = function () {
    $http.get(puplicUrl + "EC_GetBestSellerProducts?CompanyID=1&UserID=45&Query=null&LanguageID=1")
      .then(function (response) {
        if (response.data != null) {
          $scope.bestSellerProducts = response.data;
          $rootScope.lenghtOfBestSellerProducts = response.data.length;
        }
        else {
          $scope.bestSellerProducts = [];
        }
      });
  };
    
  $scope.GetProductsOffersFunc = function () {
    $http.get(puplicUrl + "EC_GetProductsOffers?CompanyID=1&UserID=1&CountryID=1&LanguageID=1")
      .then(function (response) {
        if (response.data != null) {
          $rootScope.productsOffers = response.data;
          $rootScope.lenghtOfProductsOffers = response.data.length;
        }
        else {
          $rootScope.productsOffers = [];
        }
      });
  };
  $scope.GetBestSellerProductsFunc();
  $scope.GetProductsOffersFunc();
    
  $scope.goToDetails = function (desc, longDesc, price, prodId) {
     if(longDesc == null) {
        location.href = `/en/product-details/${desc}/empty long description empty long description/${price}/${prodId}`
    } else {
        location.href = `/en/product-details/${desc}/${longDesc}/${price}/${prodId}`
    }
  }
  if($scope.isLoggedIn) {
       $scope.addToFavouriteFunc = function (prodId) {
        if(!$window.localStorage.getItem('userIdStorage')) return;
            var dataRegisteration = {
                "LanguageID": "1",
                "CompanyID" : "1",
                "UserID" : $scope.userId.toString(),
                "CountryID": "1" ,
                "ProductID": prodId 
            }
            $http({
                method: 'Post',
                url: puplicUrl + "EC_AddToFavorite",
                data: $httpParamSerializer(dataRegisteration),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function success(response) {
            }, function error(response) {
                $scope.msg= response.data
        });
      }
  } else {
      $scope.addToFavouriteFunc = function (item) {
          let favoritesLocalArr = JSON.parse($window.localStorage.getItem("favoritesLocal"));
          let isReturn = false;
          if(favoritesLocalArr == null) favoritesLocalArr = [];
          favoritesLocalArr.map(obj => {
              if( obj.ProductID === item.ProductID ) { 
                  favoritesLocalArr = favoritesLocalArr.filter((el) => {
                      return el.ProductID !== item.ProductID
                  });
                  $window.localStorage.setItem("favoritesLocal", JSON.stringify(favoritesLocalArr));
                  isReturn = true;
              };
          });
          if(isReturn === true) {
              return;
          }
          favoritesLocalArr.push(item);
          $window.localStorage.setItem("favoritesLocal", JSON.stringify(favoritesLocalArr));
      }
  }
    
  $scope.clickproductsOffersSliderRight = function () {
    if ($rootScope.lenghtOfProductsOffers > 4) { $rootScope.productsOfferspageNumber = $rootScope.productsOfferspageNumber + 4; }
  }
  $scope.clickproductsOffersSliderLeft = function () {
    if ($rootScope.productsOfferspageNumber > 0) { $rootScope.productsOfferspageNumber = $rootScope.productsOfferspageNumber - 4; }
  }
  $scope.clicksellerProductsSliderRight = function () {
    if ($rootScope.lenghtOfBestSellerProducts > 4) { $rootScope.sellerProductspageNumber = $rootScope.sellerProductspageNumber + 4; }
  }
  $scope.clicksellerProductsSliderLeft = function () {
    if ($rootScope.sellerProductspageNumber > 0) { $rootScope.sellerProductspageNumber = $rootScope.sellerProductspageNumber - 4; }
  }
});

app.controller("productController", function ($scope, $rootScope, $http, $location, $window, $httpParamSerializer,puplicUrl) {
  if($window.localStorage.getItem('userIdStorage')) {
      $scope.isLoggedIn = $window.localStorage.getItem('userIdStorage');
  }
  $scope.filterDrawerOpen = false;
  $scope.openFilterDrawer = function () {
    if ($scope.filterDrawerOpen == false) { $scope.filterDrawerOpen = true }
    else { $scope.filterDrawerOpen = false }
  }
  $rootScope.productNumber = 8;
  $scope.GetProductsFunc = function () {
    $http.get(puplicUrl + "EC_GetProducts?CompanyID=1&UserID=45&Query=null&LanguageID=1")
      .then(function (response) {
        if (response.data != null) {
          $scope.products = response.data;
          $rootScope.productsLength = response.data.length;
        }
        else {
          $scope.products = []
        }
      });
  }
  $scope.GetProductsFunc();
    
  $scope.addToCartFunc = function (item, imgSrc) {
      let shoppingCartArr = JSON.parse($window.localStorage.getItem("shoppingCart"));
      if(shoppingCartArr == null) shoppingCartArr = [];
      item['imgSrc'] = imgSrc;
      item.Qty = 1;
      let isReturn = false;
      shoppingCartArr.map(obj=>{
           if( obj.ProductID === item.ProductID ) { isReturn = true; };
      });
      if(isReturn === true) {
          return;
      }
      shoppingCartArr.push(item);
      $window.localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartArr));
      $rootScope.getShoppingCartItems();
  };  
  $scope.showMore = function () {
    if($rootScope.productsLength >= 8 && $rootScope.productNumber < 10) {
      $rootScope.productNumber = $rootScope.productNumber + 2;
    }
  }
    if($scope.isLoggedIn) {
       $scope.addToFavouriteFunc = function (prodId) {
        if(!$window.localStorage.getItem('userIdStorage')) return;
            var dataRegisteration = {
                "LanguageID": "1",
                "CompanyID" : "1",
                "UserID" : $scope.userId.toString(),
                "CountryID": "1" ,
                "ProductID": prodId 
            }
            $http({
                method: 'Post',
                url: puplicUrl + "EC_AddToFavorite",
                data: $httpParamSerializer(dataRegisteration),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function success(response) {
            }, function error(response) {
                $scope.msg= response.data
        });
      }
  } else {
      $scope.addToFavouriteFunc = function (item) {
          let favoritesLocalArr = JSON.parse($window.localStorage.getItem("favoritesLocal"));
          let isReturn = false;
          if(favoritesLocalArr == null) favoritesLocalArr = [];
          favoritesLocalArr.map(obj => {
              if( obj.ProductID === item.ProductID ) { 
                  favoritesLocalArr = favoritesLocalArr.filter((el) => {
                      return el.ProductID !== item.ProductID
                  });
                  $window.localStorage.setItem("favoritesLocal", JSON.stringify(favoritesLocalArr));
                  isReturn = true;
              };
          });
          if(isReturn === true) {
              return;
          }
          favoritesLocalArr.push(item);
          $window.localStorage.setItem("favoritesLocal", JSON.stringify(favoritesLocalArr));
      }
  }
    
  $scope.resetFilters = function () {
      location.reload()
  }  
    
  $scope.priceFilterFunc = function () {     
          $scope.products = $scope.products.filter((obj) => {
          if($scope.priceFilter == 10) {
              return obj.SalesPrice <= 10
          } else if($scope.priceFilter == 50) {
              return obj.SalesPrice <= 50
          } else if($scope.priceFilter == 51) {
              return obj.SalesPrice >= 51
          }
      })
      $rootScope.productsLength =  $scope.products.length
      if($scope.products.length <= 8) {
          $scope.productNumber = $scope.products.length
      }
      if($scope.filterDrawerOpen == true) {
          $scope.openFilterDrawer()
      }
  }
  $scope.azFilterFunc = function () {
      if($scope.azFilter == "A-Z") {
          $scope.products.sort((a, b) => a.Description.localeCompare(b.Description))
      } else {
          $scope.GetProductsFunc();
      }
      
      if($scope.filterDrawerOpen == true) {
          $scope.openFilterDrawer()
      }
  }
    
  $scope.goToDetails = function (desc, longDesc, price, prodId) {
    if(longDesc == null) {
        location.href = `/en/product-details/${desc}/empty long description empty long description/${price}/${prodId}`
    } else {
        location.href = `/en/product-details/${desc}/${longDesc}/${price}/${prodId}`
    }
  }
});

app.controller("productDetailsController", function ($scope, $rootScope, $location, $window, $http, $httpParamSerializer, puplicUrl) {
  $scope.productDescriptionHash = route.Values.param1
  $scope.productLongDescriptionHash = route.Values.param2
  $scope.productSalesPriceHash = route.Values.param3
  $scope.productIdHash = route.Values.param4
  
  $scope.productDescription;
  $scope.productLongDescription;
  $scope.productSalesPrice;
    
  $scope.addToCartNumber = 1;
  
  if($window.localStorage.getItem('userIdStorage')) {
      const userIdEncrypted = $window.localStorage.getItem('userIdStorage');
      const userIdDecrypted = CryptoJS.AES.decrypt(userIdEncrypted, "useridhash");
      $scope.userId = userIdDecrypted.toString(CryptoJS.enc.Utf8)
  }  
  $scope.isLoggedIn = $window.localStorage.getItem('userIdStorage');  
    
  $rootScope.AvailableQtyInStock;
  
    if($scope.isLoggedIn) {
       $scope.addToFavouriteFunc = function (prodId) {
        if(!$window.localStorage.getItem('userIdStorage')) return;
            var dataRegisteration = {
                "LanguageID": "1",
                "CompanyID" : "1",
                "UserID" : $scope.userId.toString(),
                "CountryID": "1" ,
                "ProductID": prodId 
            }
            $http({
                method: 'Post',
                url: puplicUrl + "EC_AddToFavorite",
                data: $httpParamSerializer(dataRegisteration),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function success(response) {
            }, function error(response) {
                $scope.msg= response.data
        });
      }
    } else {
      $scope.addToFavouriteFunc = function (item) {
          let favoritesLocalArr = JSON.parse($window.localStorage.getItem("favoritesLocal"));
          let isReturn = false;
          if(favoritesLocalArr == null) favoritesLocalArr = [];
          favoritesLocalArr.map(obj => {
              if( obj.ProductID === item.ProductID ) { 
                  favoritesLocalArr = favoritesLocalArr.filter((el) => {
                      return el.ProductID !== item.ProductID
                  });
                  $window.localStorage.setItem("favoritesLocal", JSON.stringify(favoritesLocalArr));
                  isReturn = true;
              };
          });
          if(isReturn === true) {
              return;
          }
          favoritesLocalArr.push(item);
          $window.localStorage.setItem("favoritesLocal", JSON.stringify(favoritesLocalArr));
      }
    }  
    
  $scope.GetProductsDetailsFunc = function () {
    $http.get(puplicUrl + `EC_GetProductInfo?CompanyID=1&UserID=45&Query=null&ProductID=${$scope.productIdHash}&LanguageID=1`)
      .then(function (response) {
        if (response.data != null) {
          $scope.productsInfo = response.data;
          $scope.productDescription = $scope.productsInfo[0].Description;
          if(!$scope.productsInfo[0].LongDescription == null) {
            $scope.productLongDescription = $scope.productsInfo[0].LongDescription
          } else {
            $scope.productLongDescription = "test long description test long description "
          };
          $scope.productSalesPrice = $scope.productsInfo[0].SalesPrice;  
          $rootScope.AvailableQtyInStock = response.data[0].AvailableQtyInStock;
        }
        else {
          $scope.productsInfo = []
        }
      });
  }
  $scope.GetProductsDetailsFunc();
  $scope.GetProductsFunc = function () {
    $http.get(puplicUrl + "EC_GetProducts?CompanyID=1&UserID=45&Query=null&LanguageID=1")
      .then(function (response) {
        if (response.data != null) {
          $scope.products = response.data;
          $rootScope.productsLength = response.data.length;
        }
        else {
          $scope.products = []
        }
      });
  }
  $scope.GetProductsFunc();
    
  $scope.addToCartFunc = function (imgSrc) {
      let shoppingCartArr = JSON.parse($window.localStorage.getItem("shoppingCart"));
      if(shoppingCartArr == null) shoppingCartArr = [];
      $scope.productsInfo[0]['imgSrc'] = imgSrc;
      $scope.productsInfo[0].Qty = $scope.addToCartNumber;
      let isReturn = false;
      shoppingCartArr.map(obj=>{
           if( obj.ProductID === $scope.productsInfo[0].ProductID ) { isReturn = true; };
      });
      if(isReturn === true) {
          return;
      }
      shoppingCartArr.push($scope.productsInfo[0]);
      $window.localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartArr));
      $rootScope.getShoppingCartItems();
  }
    
  $scope.goToDetails = function (desc, longDesc, price, prodId) {
     if(longDesc == null) {
        location.href = `/en/product-details/${desc}/empty long description empty long description/${price}/${prodId}`
    } else {
        location.href = `/en/product-details/${desc}/${longDesc}/${price}/${prodId}`
    }
  }
    
  $scope.addToCart = function (item, imgSrc) {
      let shoppingCartArr = JSON.parse($window.localStorage.getItem("shoppingCart"));
      if(shoppingCartArr == null) shoppingCartArr = [];
      item['imgSrc'] = imgSrc;
      item.Qty = 1;
      let isReturn = false;
      shoppingCartArr.map(obj=>{
           if( obj.ProductID === item.ProductID ) { isReturn = true; };
      });
      if(isReturn === true) {
          return;
      }
      shoppingCartArr.push(item);
      $window.localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartArr));
      $rootScope.getShoppingCartItems();
  };  
    
  $scope.addToFavouriteFunc = function () {
    if(!$window.localStorage.getItem('userIdStorage')) return;
     var dataRegisteration = {
        "LanguageID": "1",
        "CompanyID" : "1",
        "UserID" : $scope.userId.toString(),
        "CountryID": "1" ,
        "ProductID": $scope.productsInfo[0].ProductID
     }
      $http({
         method: 'Post',
         url: puplicUrl + "EC_AddToFavorite",
         data: $httpParamSerializer(dataRegisteration),
         headers: {
             "Content-Type": "application/x-www-form-urlencoded"
         }
      }).then(function success(response) {
      }, function error(response) {
         $scope.msg= response.data
      });
    }
    
    $scope.addToCartNumberFunc = function () {
        $scope.addToCartNumber++
    }

    $scope.subtractFromCartNumberFunc = function () {
        if($scope.addToCartNumber <= 1) return;
        $scope.addToCartNumber -= 1; 
    }
});

app.controller("searchProductsController", function ($scope, $rootScope, $http, $location, $window, $httpParamSerializer, puplicUrl) {
  if($window.localStorage.getItem('userIdStorage')) {
      const userIdEncrypted = $window.localStorage.getItem('userIdStorage');
      const userIdDecrypted = CryptoJS.AES.decrypt(userIdEncrypted, "useridhash");
      $scope.userId = userIdDecrypted.toString(CryptoJS.enc.Utf8)
      $scope.isLoggedIn = $window.localStorage.getItem('userIdStorage');
  }
    
  $rootScope.sellerProductspageNumber = 0;
  $rootScope.productsNumbersToShow = 8; 
  $scope.products;
  if(route.Values.pagePath === "search-products") {
      $scope.value = route.Values.param1
  }
  
  $scope.searchInputChange = function (val) {
      $scope.searchInputValue = val;
  } 
    
  $scope.submitSearchData = function () {
      if(!$scope.searchInputValue) return;
      $window.location.href = `/en/search-products/${$scope.searchInputValue}`
  }
   
   $scope.GetProductsFunc = function () {
    $http.get(puplicUrl + "EC_GetBestSellerProducts?CompanyID=1&UserID=45&Query=null&LanguageID=1")
      .then(function (response) {
        if (response.data != null) {
          $scope.products = response.data;
          $scope.products= $scope.products.filter((prod) => {
              return prod.Description.toLowerCase().includes($scope.value.toLowerCase())
          })
          $rootScope.lenghtOfProducts = response.data.length;
        }
        else {
          $scope.products = []
        }
      });
   }
   if(route.Values.pagePath === "search-products") {
      $scope.GetProductsFunc()
  }
  
   $scope.addToCartFunc = function (item, imgSrc) {
      let shoppingCartArr = JSON.parse($window.localStorage.getItem("shoppingCart"));
      if(shoppingCartArr == null) shoppingCartArr = [];
      item['imgSrc'] = imgSrc;
      item.Qty = 1;
      let isReturn = false;
      shoppingCartArr.map(obj=>{
           if( obj.ProductID === item.ProductID ) { isReturn = true; };
      });
      if(isReturn === true) {
          return;
      }
      shoppingCartArr.push(item);
      $window.localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartArr));
      $rootScope.getShoppingCartItems();
    }; 
    
   if($scope.isLoggedIn) {
       $scope.addToFavouriteFunc = function (prodId) {
        if(!$window.localStorage.getItem('userIdStorage')) return;
            var dataRegisteration = {
                "LanguageID": "1",
                "CompanyID" : "1",
                "UserID" : $scope.userId.toString(),
                "CountryID": "1" ,
                "ProductID": prodId 
            }
            $http({
                method: 'Post',
                url: puplicUrl + "EC_AddToFavorite",
                data: $httpParamSerializer(dataRegisteration),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function success(response) {
            }, function error(response) {
                $scope.msg= response.data
        });
      }
    } else {
      $scope.addToFavouriteFunc = function (item) {
          let favoritesLocalArr = JSON.parse($window.localStorage.getItem("favoritesLocal"));
          let isReturn = false;
          if(favoritesLocalArr == null) favoritesLocalArr = [];
          favoritesLocalArr.map(obj => {
              if( obj.ProductID === item.ProductID ) { 
                  favoritesLocalArr = favoritesLocalArr.filter((el) => {
                      return el.ProductID !== item.ProductID
                  });
                  $window.localStorage.setItem("favoritesLocal", JSON.stringify(favoritesLocalArr));
                  isReturn = true;
              };
          });
          if(isReturn === true) {
              return;
          }
          favoritesLocalArr.push(item);
          $window.localStorage.setItem("favoritesLocal", JSON.stringify(favoritesLocalArr));
      }
    }
   
  $scope.goToDetails = function (desc, longDesc, price, prodId) {
    if(longDesc == null) {
        location.href = `/en/product-details/${desc}/empty long description empty long description/${price}/${prodId}`
    } else {
        location.href = `/en/product-details/${desc}/${longDesc}/${price}/${prodId}`
    }
  }  

})

app.controller("offersController", function ($scope, $rootScope, $http, $window, $httpParamSerializer, puplicUrl, sharedProperties) {
    if($window.localStorage.getItem('userIdStorage')) {
      const userIdEncrypted = $window.localStorage.getItem('userIdStorage');
      const userIdDecrypted = CryptoJS.AES.decrypt(userIdEncrypted, "useridhash");
      $scope.userId = userIdDecrypted.toString(CryptoJS.enc.Utf8)
      $scope.isLoggedIn = $window.localStorage.getItem('userIdStorage');
    }
    $scope.getPoductOffers = function () {
        $http.get(puplicUrl + "EC_GetProductsOffers?CompanyID=1&UserID=45&Query=null&LanguageID=1")
          .then(function (response) {
             if(response.data !== null) {
                 $scope.productOffers = response.data;
                 $scope.productOffersLength = response.data.length;
             } else {
                 $scope.productOffers = [];
                 $scope.productOffersLength = 0;
             }
          }, function (response) {
              console.log(response.data);
          });
    }
    $scope.getPoductOffers()
    
    $scope.addToCartFunc = function (item, imgSrc) {
      let shoppingCartArr = JSON.parse($window.localStorage.getItem("shoppingCart"));
      if(shoppingCartArr == null) shoppingCartArr = [];
      item['imgSrc'] = imgSrc;
      item.Qty = 1;
      let isReturn = false;
      shoppingCartArr.map(obj=>{
           if( obj.ProductID === item.ProductID ) { isReturn = true; };
      });
      if(isReturn === true) {
          return;
      }
      shoppingCartArr.push(item);
      $window.localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartArr));
      $rootScope.getShoppingCartItems();
    };
    
    if($scope.isLoggedIn) {
       $scope.addToFavouriteFunc = function (prodId) {
        if(!$window.localStorage.getItem('userIdStorage')) return;
            var dataRegisteration = {
                "LanguageID": "1",
                "CompanyID" : "1",
                "UserID" : $scope.userId.toString(),
                "CountryID": "1" ,
                "ProductID": prodId 
            }
            $http({
                method: 'Post',
                url: puplicUrl + "EC_AddToFavorite",
                data: $httpParamSerializer(dataRegisteration),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function success(response) {
            }, function error(response) {
                $scope.msg= response.data
        });
      }
    } else {
      $scope.addToFavouriteFunc = function (item) {
          let favoritesLocalArr = JSON.parse($window.localStorage.getItem("favoritesLocal"));
          let isReturn = false;
          if(favoritesLocalArr == null) favoritesLocalArr = [];
          favoritesLocalArr.map(obj => {
              if( obj.ProductID === item.ProductID ) { 
                  favoritesLocalArr = favoritesLocalArr.filter((el) => {
                      return el.ProductID !== item.ProductID
                  });
                  $window.localStorage.setItem("favoritesLocal", JSON.stringify(favoritesLocalArr));
                  isReturn = true;
              };
          });
          if(isReturn === true) {
              return;
          }
          favoritesLocalArr.push(item);
          $window.localStorage.setItem("favoritesLocal", JSON.stringify(favoritesLocalArr));
      }
    }
    
    $scope.goToDetails = function (desc, longDesc, price, prodId) {
        if(longDesc == null) {
            location.href = `/en/product-details/${desc}/empty long description empty long description/${price}/${prodId}`
        } else {
            location.href = `/en/product-details/${desc}/${longDesc}/${price}/${prodId}`
        }
    }
})

app.controller("helloController", function ($scope, $rootScope, $http, $window, $httpParamSerializer, puplicUrl, sharedProperties) {
  if(!$window.localStorage.getItem("userIdStorage")) {
      setTimeout(() => location.href = "/" + route.Values.lang + '/login', 200)
  }
  $rootScope.openAccount = true;
  $rootScope.userIdLoggingIn = 1;
  $rootScope.openAccountFunc = function () {
    if ($rootScope.openAccount == false) {
      $rootScope.openAccount = true;
    }
    else {
      $rootScope.openAccount = false;
    }
  }
  /* Account */
  $rootScope.editInfo = false;
  $rootScope.editContant = false;
  $rootScope.editPassword = false;
  $rootScope.editInfoFunc = function () {
    if ($rootScope.editInfo == false) {
      $rootScope.editInfo = true;
      $rootScope.closeEditContantFunc();
      $rootScope.closeEditPasswordFunc();
    }
    else {
      $rootScope.editInfo = false;
    }
  }
  $rootScope.user = {};
  $rootScope.user.firstName;
  $rootScope.user.lastName;
  $rootScope.user.Email;
  $rootScope.user.Mobile;
  
  const userIdEncrypted = $window.localStorage.getItem('userIdStorage');
  const userIdDecrypted = CryptoJS.AES.decrypt(userIdEncrypted, "useridhash");
  $scope.userId = userIdDecrypted.toString(CryptoJS.enc.Utf8)

  $scope.showPassword = 'password'
  $scope.showPasswordCond = false;
  $scope.load = function () {
      $scope.passwordInput = angular.element(document.getElementsByClassName("password-input"))
      $scope.passwordInput.attr('type', $scope.showPassword);
  }
  
  $scope.showPasswordFunc = function () {
    $scope.showPasswordCond = !$scope.showPasswordCond;
    if($scope.showPasswordCond === false) {
        $scope.showPassword = "password"
        
    } else {
        $scope.showPassword = "text"
    }
  }
  
  $scope.saveEditInfoFunc = function () {
    var dataRegisteration = {
      "LanguageID": "1",
      "CompanyID": "1",
      "UserID": $scope.userId,
      "CountryID": "1",
      "UserInfo":
      {
        "FirstName": $rootScope.user.firstName,
        "LastName": $rootScope.user.lastName,
        "Email": $rootScope.user.Email,
        "Mobile": $rootScope.user.Mobile,
        "DateOfBirth": "2022-08-10 15:43:25.623",
        "Flag": 1
      }
    }

    $http({
      method: 'Post',
      url: puplicUrl + "/EC_UpdateUserInformation",
      data: $httpParamSerializer(dataRegisteration),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function success(response) {
    }, function error(response) {
      $scope.msg = response.data
    });
      
    $scope.GetUserInformationFunc();
    $rootScope.editInfoFunc();
  }
  $scope.saveEditContactInfoFunc = function () {
    var dataRegisteration = {
      "LanguageID": "1",
      "CompanyID": "1",
      "UserID": $scope.userId,
      "CountryID": "1",
      "UserInfo":
      {
        "FirstName": $rootScope.user.firstName,
        "LastName": $rootScope.user.lastName,
        "Email": $rootScope.user.Email,
        "Mobile":  $rootScope.user.Mobile,
        "DateOfBirth": "2022-08-10 15:43:25.623",
        "Flag": 0
      }
    }

    $http({
      method: 'Post',
      url: puplicUrl + "/EC_UpdateUserInformation",
      data: $httpParamSerializer(dataRegisteration),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function success(response) {
    }, function error(response) {
      $scope.msg = response.data
    });
    $scope.GetUserInformationFunc();
    $rootScope.editContantFunc();
  }
  $scope.resetPasswordFunc = function () {
    var dataRegisteration = {
      "CompanyID": "1",
      "LanguageID": "1",
      "UserID": $scope.userId.toString(),
      "OldPassword": $scope.user.oldPassword,
      "NewPassword": $scope.user.newPassword,
      "RepeatPassword": $scope.user.repeatPassword
    }
    $http({
      method: 'Post',
      url: puplicUrl + "EC_ChangePassword",
      data: $httpParamSerializer(dataRegisteration),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function success(response) {
    }, function error(response) {
      $scope.msg = response.data
    });
  }
$rootScope.editContantFunc = function () {
    if ($rootScope.editContant == false) {
      $rootScope.editContant = true;
      $rootScope.closeEditInfoFunc();
      $rootScope.closeEditPasswordFunc();
    }
    else {
      $rootScope.editContant = false;
    }
  }
  $rootScope.editPasswordFunc = function () {
    if ($rootScope.editPassword == false) {
      $rootScope.editPassword = true;
      $rootScope.closeEditInfoFunc();
      $rootScope.closeEditContantFunc();
    }
    else {
      $rootScope.editPassword = false;
    }
  }
  $rootScope.closeEditInfoFunc = function () {
    $rootScope.editInfo = false;
  }
  $rootScope.closeEditContantFunc = function () {
    $rootScope.editContant = false;
  }
  $rootScope.closeEditPasswordFunc = function () {
    $rootScope.editPassword = false;
  }
  $rootScope.userIdLoggingIn;
  $scope.GetUserInformationFunc = function () {
    $http.get(puplicUrl + "EC_GetUserInformation?CompanyID=1&UserID="+$scope.userId+"&CountryID=1&LanguageID=1")
      .then(function (response) {
        if (response.data != null) {
          $rootScope.userInfoData = response.data;
          $rootScope.user.firstName = response.data[0].FirstName;
          $rootScope.user.lastName = response.data[0].LastName;
          $rootScope.user.Email = response.data[0].Email;
          $rootScope.user.Mobile = response.data[0].Mobile;
        }
        else {
          $rootScope.userInfoData = []
        }
      });

  }
  $scope.GetUserInformationFunc();
  /* Setting */
  $rootScope.editSetting = false;
  $rootScope.removeAccount = false;

  $rootScope.editSettingFunc = function () {
    if ($rootScope.editSetting == false) {
      $rootScope.editSetting = true;
    }
    else {
      $rootScope.editSetting = false;
    }

  }
  $rootScope.removeAccountFunc = function () {
    if ($rootScope.removeAccount == false) {
      $rootScope.removeAccount = true;
    }
    else {
      $rootScope.removeAccount = false;
    }
  }
  //////////////////
$scope.deleteAcountFunc = function () {
    var dataRegisteration = {
        "LanguageID": "1",
        "CompanyID": "1",
        "UserID": $scope.userId.toString(),
        "CountryID": "1",
        "Password": $scope.user.Password
    }
    $http({
        method: 'Post',
        url: puplicUrl + "EC_DeleteAccount",
        data: $httpParamSerializer(dataRegisteration),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function success(response) {
        location.href = "/" + route.Values.lang + '/Home';
    }, function error(response) {
        $scope.msg = response.data
        console.log($scope.msg)
    });
}
    
$scope.logOut = function () {
    $window.localStorage.removeItem("userIdStorage")
    location.href = "/" + route.Values.lang + '/home'
}
});
app.controller("resetPasswordController", function ($scope, $rootScope,  $http , $httpParamSerializer ,puplicUrl) {
  $scope.user = {}; 
  $scope.user.password; 
  $scope.resetPasswordFunc = function () {
    console.log("called")
    var dataRegisteration = {
        "LanguageID": "1",
        "CompanyID" : "1",
        "Email" : $scope.user.email ,
        "Password" : $scope.user.password
    }
    $http({
        method: 'Post',
        url: puplicUrl + "EC_ResetPassword",
        data: $httpParamSerializer(dataRegisteration),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }

    }).then(function success(response) {
        location.href = "/" + route.Values.lang + '/Verification?email='+ $scope.user.email;
    }, function error(response) {
        $scope.msg= response.data
    });
  }
})
app.controller("createProfileController", function ($scope, $rootScope, $http, $httpParamSerializer , puplicUrl,sharedProperties,$window) {
     if($window.localStorage.getItem("userIdStorage")) {
        setTimeout(() => location.href = "/" + route.Values.lang + '/hello-page', 200)
    }
    $scope.user = {}; 
    $scope.user.lastName; 
    $scope.showPassword = 'password'
    $scope.showPasswordCond = false;
    if($scope.showPasswordCond === false) {
        $scope.showPassword = "password"
    } else {
        $scope.showPassword = "text"
    }
    $scope.passwordInput = angular.element(document.getElementById("password-input")) 
    $scope.passwordInput.attr('type', $scope.showPassword);
    $scope.showPasswordFunc = function () {
        $scope.showPasswordCond = !$scope.showPasswordCond;
        if($scope.showPasswordCond === false) {
            $scope.showPassword = "password"
        } else {
            $scope.showPassword = "text"
        }
        $scope.passwordInput.attr('type', $scope.showPassword);
    }
    $scope.SignUp = function () {
        var dataRegisteration = {
            "LanguageID": "1",
            "CompanyID": "1",
            "User": {
                "FirstName": $scope.user.firstName,
                "LastName": $scope.user.lastName,
                "Email": $scope.user.email,
                "Mobile": $scope.user.phone,
                "Password": $scope.user.password
            }
        }
        $http({
            method: 'Post',
            url: puplicUrl + "/EC_UserSignUp",
            data: $httpParamSerializer(dataRegisteration),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function success(response) {
            $window.localStorage.setItem('userIdStorage', response.data.UserID);
            $rootScope.encrypted = CryptoJS.AES.encrypt(response.data.UserID.toString(), "useridhash");
            $window.localStorage.setItem('userIdStorage', $rootScope.encrypted.toString());
            location.href = "/" + route.Values.lang + '/hello-page';
        }, function error(response) {
            $scope.msg = response.data
        });
    }
      console.log($window.localStorage.getItem('userIdStorage'));
})
app.controller("loginController", function ($scope, $rootScope, $http, $httpParamSerializer,puplicUrl,$window) {
    if($window.localStorage.getItem("userIdStorage")) {
        setTimeout(() => location.href = "/" + route.Values.lang + '/hello-page', 200)
    }
    $scope.user = {}; // Empty scope variable
    $scope.user.Email; 
    $scope.user.Password; 
    $scope.showPassword = 'password'
    $scope.showPasswordCond = false;
    if($scope.showPasswordCond === false) {
        $scope.showPassword = "password"
    } else {
        $scope.showPassword = "text"
    }
    $scope.showPasswordFunc = function () {
        $scope.showPasswordCond = !$scope.showPasswordCond;
        if($scope.showPasswordCond === false) {
            $scope.showPassword = "password"
        } else {
            $scope.showPassword = "text"
        }
    }
    $scope.SignIn = function () {
    $http.get(puplicUrl + "EC_UserSignIn?CompanyID=1&LanguageID=1&UserCode="+$scope.user.Email+"&CountryID=1&Password="+$scope.user.Password)
      .then(function (response) {
        if (response.data != undefined) {
         $rootScope.encrypted = CryptoJS.AES.encrypt(response.data[0].LoggedUserID.toString(), "useridhash");
         $window.localStorage.setItem('userIdStorage', $rootScope.encrypted.toString());
         location.href = "/" + route.Values.lang + '/hello-page'
         
         /* setTimeout(() => {
            location.href = "/" + route.Values.lang + '/hello-page';
         }, 5000)*/
        }
      }, function(response) {
        $scope.errorMsg = response.data
    });
    }
})
app.controller("orderPaymentController", function ($scope, $rootScope, $http, $window, $httpParamSerializer,puplicUrl) {
  if(!$window.localStorage.getItem("userIdStorage")) {
      setTimeout(() => location.href = "/" + route.Values.lang + '/login', 200)
  }
  $scope.data;
  $http.get(puplicUrl + "EC_GetReceiptMethods?CompanyID=1&UserID=45&CountryID=1&LanguageID=1")
    .then(function (response) {
        $scope.data = response.data;
    });
  
  $scope.getShoppingCartItems = function () {
     $scope.shoppingCartItems = JSON.parse($window.localStorage.getItem("shoppingCart"));
  };
  $scope.getShoppingCartItems();
    
  $rootScope.creditCardOpen = false;
  $rootScope.cashOpen = false;
  $scope.creditCardOpenFunc = function () {
    $rootScope.cashOpen = false;
    $scope.methodCash = false
    if ($rootScope.creditCardOpen == false) {
      $rootScope.creditCardOpen = true;
    }
    else { $rootScope.creditCardOpen = false }
  }
  $scope.cashOpenFunc = function () {
    $rootScope.creditCardOpen = false;
    $scope.methodCreditCard = false
    if ($rootScope.cashOpen == false) {
      $rootScope.cashOpen = true;
    }
    else { $rootScope.cashOpen = false }
  }
  $scope.orderData = {};
  $scope.retailPaymentFunc = function () {
    var dataRegisteration = {
      "LanguageID": "1",
      "CompanyID": "1",
      "CountryID": "1",
      "UserID": $rootScope.userIdLoggingIn,
      "Cart": {
        "RetailSalesInvoiceID": 1,
        "ReceiptMethodID": 1,
        "Amount": 1
      }
    }
    $http({
      method: 'Post',
      url: puplicUrl + "EC_RetailPayment",
      data: $httpParamSerializer(dataRegisteration),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function success(response) {
    }, function error(response) {
      $scope.msg = response.data
      console.log(response.error)
    });
    window.location.href = 'en/order-details-confirm';
  }
});

app.controller("OrderController", function ($scope, $rootScope, $http, $window, $httpParamSerializer,puplicUrl) {
  if(!$window.localStorage.getItem("userIdStorage")) {
      setTimeout(() => location.href = "/" + route.Values.lang + '/login', 200)
  }
  $scope.user = {};
  $scope.user.lastName;
  $scope.userId;
  $scope.shoppingCartItems;
  $scope.getShoppingCartItems = function () {
     $scope.shoppingCartItems = JSON.parse($window.localStorage.getItem("shoppingCart"));
  };
  $scope.getShoppingCartItems();
  $scope.continueOrderFunc = function () {
    var dataRegisteration = {
      "LanguageID": "1",
      "CompanyID": "1",
      "CountryID": "1",
      "GuestInfo": {
        "FirstName": $scope.user.firstName,
        "LastName": $scope.user.lastName,
        "Country": 1,
        "Address": $scope.user.address,
        "Apartment": $scope.user.apartment,
        "CityName": $scope.user.city,
        "Area": $scope.user.area,
        "Email": $scope.user.email,
        "Mobile": $scope.user.phone
      }
    }
    $http({
      method: 'Post',
      url:puplicUrl+ "EC_GuestSignUp",
      data: $httpParamSerializer(dataRegisteration),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function success(response) {
      $scope.userId = response.data.UserID; 
    }, function error(response) {
      $scope.msg = response.data
    });
    var data = {
      "UserID": "110",//$scope.userId,
      "LanguageID": "1",
      "CompanyID": "1",
      "CountryID": "1",
      "Cart":
      {
        "RetailInvoiceID": null,
        "DiscountCodeID": 1,
        "CartItems": [
          {
            "RetailSalesInvoiceTransID": null,
            "ProductID": 1,
            "Qty": 5,
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
     location.href = "/" + route.Values.lang + '/order-details';
  }
    
  /* $scope.setShippingStatus = function (status) {
      console.log("called")
      if(status === 'free') {
          angular.element(document.getElementById("paidShippingCheck").checked = false)
      } else {
          angular.element(document.getElementById("freeShippingCheck").checked = false)
      }
  } */
});

app.controller("favouriteController", function ($scope, $rootScope, $http, $window, $httpParamSerializer, puplicUrl) {
    if($window.localStorage.getItem('userIdStorage')) {
        const userIdEncrypted = $window.localStorage.getItem('userIdStorage');
        const userIdDecrypted = CryptoJS.AES.decrypt(userIdEncrypted, "useridhash");
        $scope.userId = userIdDecrypted.toString(CryptoJS.enc.Utf8)
    }
    $scope.isLoggedIn = $window.localStorage.getItem('userIdStorage');
    $scope.favouriteProducts = []
    $scope.favouriteProductsLength = 0
    $scope.getUserFavouriteProducts = function () {
       $http.get(puplicUrl + `EC_GetFavorite?CompanyID=1&UserID=${$scope.userId}&CountryID=1&LanguageID=1`).then(function succes(response) {
           $scope.favouriteProducts = response.data
           $scope.favouriteProductsLength = response.data.length
       }, function error(response) {
         $scope.msg = response.data
         console.log($scope.msg)
       })
    }
    if($scope.isLoggedIn) {
        $scope.getUserFavouriteProducts()
    }    
    
    $scope.GetProductsFunc = function () {
    $http.get(puplicUrl + "EC_GetProducts?CompanyID=1&UserID=45&Query=null&LanguageID=1")
      .then(function (response) {
        if (response.data != null) {
          $scope.products = response.data;
          
          for(let i = 0; i < $scope.favouriteProductsLength; i++) {
              for(let e = 0; e < $scope.products.length; e++) {
                  if($scope.products[e].ProductID == $scope.favouriteProducts[i].ProductID) {
                      $scope.products = $scope.products.filter((prod) => {
                          return prod.ProductID !== $scope.favouriteProducts[i].ProductID
                      })
                  }
              }
          } // Remove a product from the recommended products if a product matches any product from the favourite products
            
          $rootScope.productsLength = response.data.length;
        }
        else {
          $scope.products = []
        }
      });
    }
    $scope.GetProductsFunc();
    
    $rootScope.getFavoriteProductsLocal = function () {
      $scope.favoriteProductsLocal = JSON.parse($window.localStorage.getItem("favoritesLocal"));
      if($scope.favoriteProductsLocal) {
          $scope.favoriteProductsLocalLength = $scope.favoriteProductsLocal.length;
      } else {
          $scope.favoriteProductsLocalLength = 0;
      }
    };
    $rootScope.getFavoriteProductsLocal();
    
    $scope.addToCartFunc = function (item, imgSrc) {
      let shoppingCartArr = JSON.parse($window.localStorage.getItem("shoppingCart"));
      if(shoppingCartArr == null) shoppingCartArr = [];
      item['imgSrc'] = imgSrc;
      item.Qty = 1;
      shoppingCartArr.map(obj=>{
          if( JSON.stringify({...obj}) === JSON.stringify({...item}) )
          return;
      });
      shoppingCartArr.push(item);
      $window.localStorage.setItem("shoppingCart", JSON.stringify(shoppingCartArr));
      $rootScope.getShoppingCartItems();
    };  
    
    $scope.goToDetails = function (desc, longDesc, price, prodId) {
         if(longDesc == null) {
            location.href = `/en/product-details/${desc}/empty long description empty long description/${price}/${prodId}`
        } else {
            location.href = `/en/product-details/${desc}/${longDesc}/${price}/${prodId}`
        }
   }
    
    if($scope.isLoggedIn) {
       $scope.addToFavouriteFunc = function (prodId) {
        if(!$window.localStorage.getItem('userIdStorage')) return;
            var dataRegisteration = {
                "LanguageID": "1",
                "CompanyID" : "1",
                "UserID" : $scope.userId.toString(),
                "CountryID": "1" ,
                "ProductID": prodId 
            }
            $http({
                method: 'Post',
                url: puplicUrl + "EC_AddToFavorite",
                data: $httpParamSerializer(dataRegisteration),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function success(response) {
                $scope.getUserFavouriteProducts()
            }, function error(response) {
                $scope.msg= response.data
        });
      }
   } else {
      $scope.addToFavouriteFunc = function (item) {
          let favoritesLocalArr = JSON.parse($window.localStorage.getItem("favoritesLocal"));
          let isReturn = false;
          if(favoritesLocalArr == null) favoritesLocalArr = [];
          favoritesLocalArr.map(obj => {
              if( obj.ProductID === item.ProductID ) { 
                  favoritesLocalArr = favoritesLocalArr.filter((el) => {
                      return el.ProductID !== item.ProductID
                  });
                  $window.localStorage.setItem("favoritesLocal", JSON.stringify(favoritesLocalArr));
                  isReturn = true;
              };
          });
          if(isReturn === true) {
              return;
          }
          favoritesLocalArr.push(item);
          $window.localStorage.setItem("favoritesLocal", JSON.stringify(favoritesLocalArr));
          $rootScope.getFavoriteProductsLocal()
      }
   }
    
   $scope.removeFromFavorites = function (item) {
        let favoritesLocalArr = JSON.parse($window.localStorage.getItem("favoritesLocal"));
        if(favoritesLocalArr == null) favoritesLocalArr = [];
        favoritesLocalArr.map(obj => {
            if( obj.ProductID === item.ProductID ) { 
                favoritesLocalArr = favoritesLocalArr.filter((el) => {
                    return el.ProductID !== item.ProductID
                });
                $window.localStorage.setItem("favoritesLocal", JSON.stringify(favoritesLocalArr));
            };
        });
        
         var dataRegisteration = {
                "LanguageID": "1",
                "CompanyID" : "1",
                "UserID" : $scope.userId.toString(),
                "CountryID": "1" ,
                "ProductID": item.ProductID
            }
            $http({
                method: 'Post',
                url: puplicUrl + "EC_AddToFavorite",
                data: $httpParamSerializer(dataRegisteration),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function success(response) {
                $scope.getUserFavouriteProducts()
            }, function error(response) {
                $scope.msg= response.data
        });
        
   }
    
   $scope.removeFromFavoritesLocal = function (item) {
        let favoritesLocalArr = JSON.parse($window.localStorage.getItem("favoritesLocal"));
        if(favoritesLocalArr == null) favoritesLocalArr = [];
        favoritesLocalArr.map(obj => {
            if( obj.ProductID === item.ProductID ) { 
                favoritesLocalArr = favoritesLocalArr.filter((el) => {
                    return el.ProductID !== item.ProductID
                });
                $window.localStorage.setItem("favoritesLocal", JSON.stringify(favoritesLocalArr));
            };
        });
        $rootScope.getFavoriteProductsLocal();
   }
    
    if($scope.isLoggedIn && $scope.userId && $scope.favouriteProducts && $scope.favoriteProductsLocal) {
        let isReturn = false;
        if(isReturn === true) {
                return;
            }
        for(let i = 0; i < $scope.favoriteProductsLocalLength; i++) {
            
            $scope.favouriteProducts.map((el) => {
                if(el.ProductID === $scope.favoriteProductsLocal[i].ProductID) {
                    isReturn = true;
                }
            })
            
             var dataRegisteration = {
                "LanguageID": "1",
                "CompanyID" : "1",
                "UserID" : $scope.userId.toString(),
                "CountryID": "1" ,
                "ProductID": $scope.favoriteProductsLocal[i].ProductID
            }
            $http({
                method: 'Post',
                url: puplicUrl + "EC_AddToFavorite",
                data: $httpParamSerializer(dataRegisteration),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function success(response) {
            }, function error(response) {
                $scope.msg= response.data
            });
        }
        $scope.getUserFavouriteProducts()
    }
    
})

app.controller("footerController", function ($scope, $rootScope, $http) {
    $scope.backToTopFunction = function () {
      angular.element(document.documentElement.scrollTop = 0) // For Chrome, Firefox, IE and Opera
    }
});

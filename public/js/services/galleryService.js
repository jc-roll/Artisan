myApp.factory("productGalleryAdd", function() {
  var productService = [];
  function writeProductData(croppedDataUrl, picFile, productID, productInfo, price) {
    firebase.database().ref('products/' + productID)
      .add({
          URL : croppedDataUrl,
          fileName : picFile,
          productID : productID,
          productInfo : productInfo,
          price : price
        });
    }
    
  productService.addProduct = function() {

    if (data = !null) {
      writeProductData(data.croppedDataUrl, data.picFile, data.productID, data.productInfo, data.price);
        console.log(firebase.auth().currentUser.uid);
      } else {
        console.log("Login Failed");
      }
  };
    return productService;
});




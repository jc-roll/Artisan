// myApp.factory("productGalleryAdd", function() {
//   var productService = [];
//   function writeProductData(userId, name, email, photoURL) {
//     firebase.database().ref('users/' + userId)
//     .set({
//       username: name,
//       email: email,
//       photoURL: photoURL
//     });
// }

//   productService.upload = function() {

//     var facebookProvider = new firebase.auth.FacebookAuthProvider();

//     firebase.auth().signInWithPopup(facebookProvider);
//     firebase.auth().onAuthStateChanged(function(user) {
//       var user = firebase.auth().currentUser;
//       if (user) {
//       //Now we can call the write function to create and set the scope into the fb
//       writeProductData(user.uid, user.displayName, user.email, user.photoURL);
//         console.log(firebase.auth().currentUser.displayName);
//       } else {
//         console.log("Login Failed");
//       }
//     });
//   };
//     return productService;
// });
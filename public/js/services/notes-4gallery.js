<html ng-app="Gallery">
  <body ng-controller="GalleryController" ng-cloak>

    <div class="container">
      <div id="gallery" md-whiteframe="4">

        <div class="gallery-grid" ng-if="!imageShow.state">
          <md-grid-list md-cols="4"
                        md-row-height="1:1"
                        md-gutter="0.5em">
            <md-grid-tile ng-repeat="image in images"
                          ng-click="displayImage($index)"
                          class="img-wrapper">
              <div class="img-tile-div" style="background-image: url({{ image }})"></div>
            </md-grid-tile>
          </md-grid-list>
        </div>

        <div class="gallery-show" ng-if="imageShow.state">
          <div class="img-show-div" style="background-image: url({{ imageShow.image }})">
            <div class="img-toolbar" layout="row" layout-align="space-between">
              <md-button ng-click="displayGrid()" class="md-icon-button">
                <md-icon>arrow_back</md-icon>
              </md-button>
              <md-button ng-click="deleteImage(imageShow.imageIndex)" class="md-icon-button">
                <md-icon>delete</md-icon>
              </md-button>
            </div>
          </div>
        </div>

      </div>
    </div>
  
  </body>
</html>


<html ng-app="sampleApp">
<body ng-controller="MainController">
  
  <h1>Simple AngularFire App</h1>
  
  <h3>Editor</h3>
  <div class="editor">
    <label>Name</label>
    <input type="text" ng-model="product.name" placeholder="Enter a name here" ng-model-options="{ updateOn: 'default blur', debounce: {'default': 10, 'blur': 0} }">
    <label>Img</label>
    <input type="text" ng-model="product.img" placeholder="Enter img url here">
    <label>Price</label>
    <input type="text" ng-model="product.price" placeholder="Enter a price here">
  </div>
  
  <h3>Storefront</h3>
  <div class="storefront">
    <h1>{{product.name}}</h1>
    <img ng-src="{{product.img}}" /> 
    <h1>${{product.price}}</h1>
  </div>
  
  <h3>Debug</h3>
  <div class="debug">
    <p>Firebase Reference:</p>
    {{product}}
  </div>
   
 <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js"></script>
 <script src="https://cdn.firebase.com/js/client/1.0.21/firebase.js"></script>
 <script src="https://cdn.firebase.com/libs/angularfire/0.8.2/angularfire.min.js"></script>
</body>
</html>
myApp.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.upload = function (dataUrl, name) {
        Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: {
                file: Upload.dataUrltoBlob(dataUrl, name)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.result = response.data;
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    }

    var upload = Upload.http({
  url: '/server/upload/url',
  headers : {
    'Content-Type': file.type
  },
  data: file
})

// /* Set the default values for ngf-select and ngf-drop directives*/
// Upload.setDefaults({ngfMinSize: 20000, ngfMaxSize:20000000})

// // These two defaults could be decreased if you experience out of memory issues 
// // or could be increased if your app needs to show many images on the page.
// // Each image in ngf-src, ngf-background or ngf-thumbnail is stored and referenced as a blob url
// // and will only be released if the max value of the followings is reached.
// Upload.defaults.blobUrlsMaxMemory = 268435456 // default max total size of files stored in blob urls.
// Upload.defaults.blobUrlsMaxQueueSize = 200 // default max number of blob urls stored by this application.

// /* Convert a single file or array of files to a single or array of 
// base64 data url representation of the file(s).
// Could be used to send file in base64 format inside json to the databases */
// Upload.base64DataUrl(files).then(function(urls){...});

// /* Convert the file to blob url object or base64 data url based on boolean disallowObjectUrl value */
// Upload.dataUrl(file, boolean).then(function(url){...});

// /* Get image file dimensions*/
// Upload.imageDimensions(file).then(function(dimensions){console.log(dimensions.width, dimensions.height);});

// /* Get audio/video duration*/
// Upload.mediaDuration(file).then(function(durationInSeconds){...});

// /* Resizes an image. Returns a promise */
// // options: width, height, quality, type, ratio, centerCrop, resizeIf, restoreExif
// //resizeIf(width, height) returns boolean. See ngf-resize directive for more details of options.
// Upload.resize(file, options).then(function(resizedFile){...});

// /* returns boolean showing if image resize is supported by this browser*/
// Upload.isResizeSupported()
// /* returns boolean showing if resumable upload is supported by this browser*/
// Upload.isResumeSupported()

// /* returns a file which will be uploaded with the newName instead of original file name */
// Upload.rename(file, newName)
// /* converts the object to a Blob object with application/json content type 
// for jsob byte streaming support #359 (html5 only)*/
// Upload.jsonBlob(obj)
// /* converts the value to json to send data as json string. Same as angular.toJson(obj) */
// Upload.json(obj)
// /* converts a dataUrl to Blob object.*/
// var blob = upload.dataUrltoBlob(dataurl, name);
// /* returns true if there is an upload in progress. Can be used to prompt user before closing browser tab */
// Upload.isUploadInProgress() boolean
// /* downloads and converts a given url to Blob object which could be added to files model */
// Upload.urlToBlob(url).then(function(blob) {...});
// /* returns boolean to check if the object is file and could be used as file in Upload.upload()/http() */
// Upload.isFile(obj);
// /* fixes the exif orientation of the jpeg image file*/
// Upload.applyExifRotation(file).then(...)
}]);
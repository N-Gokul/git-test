//*****************************************  Jeeva 25-06-2023 Create Index.js file and Module.*****************************

// Module 
var app = angular.module("initialModule", []);

// Controller for index.html
app.controller("inittialCtrl", function ($scope) {
  $scope.form = {};
  $scope.master = []

  //Degree list
  $scope.deg = ['B.E', 'B.Tech']

  //max date 
  $scope.tillDate = `${new Date().getFullYear()-18}-0${new Date().getMonth()+1}-${new Date().getDate()}`
  $scope.tillJoinDate = `${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`

 

  $scope.vis = true;
  $scope.isfresh = true;


  $scope.agecal = function (date) {
    $scope.form.age = new Date().getFullYear() - date.getFullYear();
  }
  $scope.expCal = function (date) {
    $scope.form.exp = new Date().getFullYear() - date.getFullYear();
  }

  $scope.refresh = function () {
    // $scope.isfresh = false;/
    $scope.vis = true;
    $scope.isVisible = false;
    $scope.form = {};
  }

  $scope.submit = function () {
    $scope.master.push($scope.form)
    console.log($scope.master);
    $scope.refresh();
  }



  $scope.editButton = function (index) {
    $scope.isfresh = true;
    $scope.isVisible = true;
    $scope.vis = false;
    var row = $scope.master.indexOf(index);
    for (let key in $scope.master[row]) {
      $scope.form[key] = $scope.master[row][key];
    }
    $scope.update = function () {
      $scope.master[row] = $scope.form
      $scope.refresh()
    }
  }

  $scope.deleteButton = function (index) {
    var row = $scope.master.indexOf(index);
    console.log(row);
    $scope.master.splice(row, 1);
  }


})

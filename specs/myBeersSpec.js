'use strict';
 
describe('Controller: MyBeersCtrl', function () {

  var $scope, $rootScope, $location, MyBeersCtrl, BeerFactoryMock;

  // load the controller's module AND the main app module in this order
  beforeEach(module('app'));
  beforeEach(module('app.mybeers'));

   // mock out the service
  beforeEach(function () {
    BeerFactoryMock = {
      getMyBeers: function() {},
      removeFromMyBeers: function(){},
      navToDetail: function(){}
      };
  });

  beforeEach(inject(function(_$rootScope_, _$controller_, _$location_) {
      $rootScope = _$rootScope_;
      $location = _$location_;
      $scope = _$rootScope_.$new();

      MyBeersCtrl = _$controller_('MyBeersCtrl', {
        $scope: $scope, BeerFactory: BeerFactoryMock
      });
  }));

  it('should check if the path is active', function() {
    $location.path('/mybeers');
    expect($location.path()).toBe('/mybeers');
  });
  it('should have a method passSelectedBeer', function() {
      expect($scope.passSelectedBeer).toBeDefined();
      expect(typeof $scope.passSelectedBeer).toBe('function');
  });
    it('should have a method toggleEditMode', function() {
      expect($scope.toggleEditMode).toBeDefined();
      expect(typeof $scope.toggleEditMode).toBe('function');
  });
      it('should have a method deleteSelectedBeer', function() {
      expect($scope.deleteSelectedBeer).toBeDefined();
      expect(typeof $scope.deleteSelectedBeer).toBe('function');
  });
});


'use strict';

describe('Controller: Recommended Ctrl', function() {

  var $scope, $location, $rootScope, RecommendCtrl, BeerFactory, UtilFactory, UserFactory;

  // load the controller's module AND the main app module in this order
  beforeEach(module('app'));
  beforeEach(module('app.recommend'));

  // grab any services the controller uses
  beforeEach(inject(function($injector) {
    BeerFactory = $injector.get('BeerFactory');
    UtilFactory = $injector.get('UtilFactory');
    UserFactory = $injector.get('UserFactory');
  }));

  // mock out the services
  // beforeEach(function () {
  //   BeerFactoryMock = jasmine.createSpyObj(‘BeerFactoryMock’, [
  //     ‘sendRating’, 
  //     ‘addToQueue’, 
  //     ‘getMyBeers’, 
  //     ‘addToMyBeers’, 
  //     ‘removeFromMyBeers’,
  //     'getSelectedBeer',
  //     'navToDetail',
  //   ]);
  // });

  // beforeEach(function () {
  //   UserFactoryMock = jasmine.createSpyObj(‘UserFactoryMock’, [
  //   'updateTrainingBeer' 
  //   ]);
  //   // $provide registers the mocks so no need to inject
  //   $provide.value('BeerFactory', BeerFactoryMock);
  //   $provide.value('UserFactory', UserFactoryMock);
  // });

  // inject the required services and instantiate the controller
  beforeEach(inject(function($rootScope, _$controller_, _$location_) {
    $scope = $rootScope.$new();
    $location = _$location_;
    RecommendCtrl = _$controller_('RecommendCtrl', {
        $scope: $scope, BeerFactory: BeerFactory, UserFactory: UserFactory, UtilFactory: UtilFactory
    });
  }));
  it('should have a beers queue', function () {
    expect($scope.beers).not.toBe(null);
  })
  it('should check if the path is active', function() {
    $location.path('/recommend');
    expect($location.path()).toBe('/recommend');
  });
  it('should have a method cardSwiped', function() {
      expect($scope.cardSwiped).toBeDefined();
      expect(typeof $scope.cardSwiped).toBe('function');
  });
  it('should have a method cardDestroyed', function() {
      expect($scope.cardDestroyed).toBeDefined();
      expect(typeof $scope.cardDestroyed).toBe('function');
  });
  it('should have a method passSelectedBeer', function() {
      expect($scope.passSelectedBeer).toBeDefined();
      expect(typeof $scope.passSelectedBeer).toBe('function');
  });
  //change the functions to scope variables then we can test these
  // it('should add a beer to the queue', function() {
  //   var newBeer = {data: 'beerName'};
  //   $scope.addRecommendedBeer(newBeer);
  //   expect($scope.addRecommendedBeer).toHaveBeenCalled();
  //   expect($scope.beers).toContain(newBeer);
  // });
  // it('should keep track of training cards the user has swiped', function() {
  //   var swipedBeer = {trainingId: true};
  //   $scope.makeBeerReview(5);
  //   expect(UserFactory.updateTrainingBeer).toHaveBeenCalled();
  // });
  // it('should make a beer review', function() {
  //   var rating = 5;
  //   var swipedBeer = {trainingId: true};
  //   $scope.makeBeerReview();
  //   expect(beer_id).toEqual(swipedBeer.beer_id);
  //   expect(beer_rating).toEqual(rating);
  // });
  // it('should call sendRating when the user swipes a card', function() {
  //   var review = {beer: true};
  //   $scope.cardSwiped(1);
  //   expect(BeerFactory.sendRating).toHaveBeenCalled();
  // });
  it('should remove a beer from the queue when carDestroyed method is called', function() {
    var index = 1;
    $scope.cardDestroyed(index);
    expect($scope.beers[index]).toBe(null);
   });
  it('should pass a beer the user clicks on', function() {
    var beer = {beer_name: "beer"};
    spyOn(BeerFactory, 'navToDetail');
    $scope.passSelectedBeer(beer);
    expect(BeerFactory.navToDetail).toHaveBeenCalled();
  });
});


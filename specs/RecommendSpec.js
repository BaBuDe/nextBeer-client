describe('Recommended Ctrl', function() {

    var $scope, $location;


  // mock out your services
  var BeerFactoryMock = {
    trainingBeers: ["beer1", "beer2"],
    beerRecQueue: ["NattyLightOhYeah", "PBRforTheHipsters"]
  };

  // load the controller's module AND the main app module in this order
  beforeEach(module('app'));
  beforeEach(module('app.recommend'));

  // grab any services your controller uses
  beforeEach(inject(function($injector) {
    BeerFactory = $injector.get('BeerFactory');
    UtilFactory = $injector.get('UtilFactory');
    UserFactory = $injector.get('UserFactory');
  }));

  beforeEach(function () {
    BeerFactoryMock = jasmine.createSpyObj(‘BeerFactoryMock’, [
      ‘sendRating’, 
      ‘addToQueue’, 
      ‘getMyBeers’, 
      ‘addToMyBeers’, 
      ‘removeFromMyBeers’,
      'getSelectedBeer',
      'navToDetail',
  ]);

    // $provide registers this mock so you won't need to inject it in the controller below
    $provide.value('BeerFactory', BeerFactoryMock);
  });

  // inject the required services and instantiate the controller
  beforeEach(inject(function($_rootScope_, _$controller_, _$location_) {
    $scope = $_rootScope_.$new();
    $location = _$location_;
    RecommendCtrl = _$controller_('RecommendCtrl', {
        $scope: $scope;
    });
  }));


  it('should check if the path is active', function() {
    $location.path('/recommend');
    expect($location.path()).toBe('/recommend');
  });

  it('should have a method addRecommendedBeer', function() {
      expect($scope.addRecommendedBeer).toBeDefined();
      expect(typeof $scope.addRecommendedBeer).toBe('function');
  });
  it('should add a beer to the queue when addRecommendedBeer is called', function() {
    var newBeer = {data: 'beerName'};
    $scope.addRecommendedBeer(newBeer);
    expect($scope.addRecommendedBeer).toHaveBeenCalled();
    expect($scope.beers).toContain(newBeer);
  });
  it('should send a rating when the user swipes a card', function() {
    var beerReview = 1;
    $scope.cardSwiped();
    expect(BeerFactory.sendRating).toHaveBeenCalled();
  });
  it('should have a method cardSwiped', function() {
    expect($scope.cardSwiped).toBeDefined();
    expect(typeof $scope.cardSwiped).toBe('function');
  });
  it('should call the BeerFactory\'s addToMyBeers method when cardSwiped is called', function() {
    var beerObj = {beer: 'name'};
    spyOn(BeerFactory, 'addToMyBeers');
    $scope.cardSwiped(index);
    expect(BeerFactory.addToMyBeers).toHaveBeenCalled();
  });
  it('should call the BeerFactory\'s sendRating method when cardSwiped is called', function() {
    var beerReview = 1;
    spyOn(BeerFactory, 'sendRating');
    $scope.cardSwiped();
    expect(BeerFactory.sendRating).toHaveBeenCalled();
  });
  it('should have a method passSelectedBeer', function() {
    expect($scope.passSelectedBeer).toBeDefined();
    expect(typeof $scope.passSelectedBeer).toBe('function');
    spyOn(BeerFactory, 'passSelectedBeer');
  });
  it('should call the BeerFactory\'s passSelectedBeer method when passSelectedBeer is called', function() {
    var index = 2;
    $scope.passSelectedBeer(index);
    expect(BeerFactory.passSelectedBeer).toHaveBeenCalled();
    spyOn(BeerFactory, 'passSelectedBeer');
    $scope.passSelectedBeer(index);
    expect(BeerFactory.passSelectedBeer).toHaveBeenCalled();
  });
   it('should have a method cardDestroyed', function() {
    expect($scope.cardDestroyed).toBeDefined();
    expect(typeof $scope.cardDestroyed).toBe('function');
  });
   it('should remove a beer from the queue when carDestroyed method is called', function() {
    var index = 1;
    $scope.cardDestroyed();
    expect($scope.cardDestroyed).toHaveBeenCalled();
    expect($scope.beers[index]).toBe(null);
   });
  it('uses the BeerFactory method beerRecQueue to get cards', function () {
    expect($scope.cards.length).not.toBe(0);
  });
});
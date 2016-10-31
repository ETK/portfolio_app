app.filter('normalize', function($filter) {
    return function(input, fractionSize) {
        return $filter('number')(input / 10000, fractionSize);
    };
});

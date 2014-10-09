angular.module('app')
  .factory('CONSTANTS', function() {
    return {
      // default count of primes in a table
      DEFAULT_COUNT: 10,
      // maximum size of prime number - enough to calculate first 100k primes
      MAX_PRIME: 1299827

    };
  });
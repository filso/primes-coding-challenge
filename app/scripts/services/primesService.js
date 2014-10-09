angular.module('app')
  .factory('primesService', function(CONSTANTS) {

    // initialise primes with [1] to easily generate table - header and first column will show primes sequence
    var primes = [1];

    (function() {
      var max = CONSTANTS.MAX_PRIME;

      var sieve = [],
        i = 2,
        j;

      // We divide task of finding primes for iterations so that
      // main thread isn't blocked. Using Web worker would also
      // need dividing task on small parts.
      var start = new Date().getTime();
      
      function iteration() {
        if (!sieve[i]) {

          // i has not been marked -- it is prime
          primes.push(i);
          for (j = i << 1; j <= max; j += i) {
            sieve[j] = true;
          }
        }
        i += 1;
        if (i < max) {

          if (new Date().getTime() - start < 40 && i % 1000 != 0) {
            // if less then 10msec passed - find another one 
            // we need primes constraint (1000), or we'll exceed stack size (recurrency)
            iteration();
          } else {
            // every 50 msec give >= 10 msec for UI to refresh
            // run setTimeout instead of $timeout - no need to run digest cycle here
            setTimeout(function() {
              start = new Date().getTime();
              iteration();
            }, 10);
          }

        }
      }

      // run first iteration - next one will be called recurrently
      iteration();
    })();

    function isPrime(n) {
      if (n < 2 || n != Math.round(n)) {
        return false;
      }

      var isPrime = true;

      // Now check every whole number from 2 to the square root of n. If any of these divides n exactly, n cannot be prime.
      for (var i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
          isPrime = false;
        }
      }
      return isPrime;
    }


    return {
      primes: primes,
      isPrime: isPrime
    };

  });
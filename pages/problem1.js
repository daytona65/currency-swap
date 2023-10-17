/**
 * For loop
 * @param {integer} n - input
 * @returns {integer} The sum to n
 */
var sum_to_n_a = function(n) {
    let res = 0;
    for (let i = 1; i <=n; i++) {
      res += i;
    }
    return res;
  };
  
  /**
   * Summation Formula
   * @param {integer} n - input 
   * @returns {integer} The sum to n
   */
  var sum_to_n_b = function(n) {
    return (n / 2) * (n + 1);
  };
  
  /**
   * Recursive call
   * @param {integer} n - input
   * @returns {integer} The sum to n
   */
  var sum_to_n_c = function(n) {
    if (n <= 1) {
      return n;
    }
    return n + sum_to_n_c(n-1);
  };
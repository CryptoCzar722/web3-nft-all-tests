
//registers within local storage
//set
//localStorage.setItem('Timer', this.state.seconds)
//get
//localStorage.getItem('Timer')

const IP               = 0x00;
const PRIVATE_KEY      = 0x01;
const LIMIT_ORDERS     = 0x02;                     //MAX 24 LIMIT ORDERS
const ARBITRAGE_ORDERS = LIMIT_ORDERS + 24;        //MAX 24 ARBITRAGE ORDERS
const ACCUMULATION_ORDERS = ARBITRAGE_ORDERS + 24; // MAX 24 ACCULMATION ORDERS
const REGISTER_END = ACCUMULATION_ORDERS + 1;
const CHECK_SUM = IP +  PRIVATE_KEY 
+ LIMIT_ORDERS + ARBITRAGE_ORDERS + ACCUMULATION_ORDERS + REGISTER_END; 

export {CHECK_SUM};
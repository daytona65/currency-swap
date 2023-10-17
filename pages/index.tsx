import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

import Head from 'next/head';
import Navbar from './navbar';
import CurrencySelector from './currencyselector';
import styles from '../styles/Home.module.css';
import { IoIosSwap } from 'react-icons/io';

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  // Input value
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Output value
  const handleOutputChange = (e) => {
    setOutputValue(e.target.value);
  };

  // Currency From
  const [from, setFrom] = useState('ETH');
  const handleCurrencyFrom = (currency : string) => {
    setFrom(currency);
  };

  // Currency To
  const [to, setTo] = useState('ETH');
  const handleCurrencyTo = (currency : string) => {
    setTo(currency);
  }

  // Currency Selection
  const currencies = [
    "BLUR", "bNEO", "BUSD", "USD", "ETH", "GMX", "STEVMOS", "LUNA", 
    "RATOM", "STRD", "EVMOS", "IBCX", "IRIS", "ampLUNA", "KUJI", 
    "STOSMO", "USDC", "axlUSDC", "ATOM", "STATOM", "OSMO", "rSWTH", 
    "STLUNA", "LSI", "OKB", "OKT", "SWTH", "USC", "WBTC", "wstETH", 
    "YieldUSD", "ZIL"
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Fancy Form!</title>
        <meta
          content="currency swap"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Navbar/>
      <main className={styles.main}>
        <h1 className={styles.title}>
          swap!
        </h1>
        <div className={styles.swap__container}>
          <div className={styles.swap}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="You pay"
                className={styles.input}
              />
              <CurrencySelector onSelection={handleCurrencyFrom}/>
              
          </div>
          <button className={styles.swap__button}>
            <IoIosSwap size={75}/>
          </button>
          <div className={styles.swap}>
              <input
                type="text"
                value={outputValue}
                onChange={handleOutputChange}
                placeholder="You receive"
                className={styles.input}
              />
              <CurrencySelector onSelection={handleCurrencyTo} />
                
          </div>

        </div>
        

        <ConnectButton />
      </main>
    </div>
  );
};

export default Home;

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
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [USD, setUSD] = useState(0);

  // Input value
  const handleInputChange = (e) => {
    setFromValue(e.target.value);
    setToValue(handleConversion(from, to, e.target.value));
    setUSD(convertUSD(from, e.target.value));
  };

  // Output value
  const handleOutputChange = (e) => {
    setToValue(e.target.value);
    setFromValue(handleConversion(to, from, e.target.value));
    setUSD(convertUSD(to, e.target.value));
  };

  // Currency From
  const [from, setFrom] = useState('ETH');
  const handleCurrencyFrom = (currency : string) => {
    setFrom(currency);
    setToValue(handleConversion(currency, to, fromValue));
    setUSD(convertUSD(currency, fromValue));
  };

  // Currency To
  const [to, setTo] = useState('ETH');
  const handleCurrencyTo = (currency : string) => {
    setTo(currency);
    setFromValue(handleConversion(currency, from, toValue));
    setUSD(convertUSD(currency, toValue));
  };

  // Currency swap
  const handleCurrencySwap = () => {
    setFrom(to);
    setTo(from);
    setFromValue
(toValue);
    setToValue(fromValue);
  };

  // Exchange rates
  const url = "https://interview.switcheo.com/prices.json";
  var exchangeData;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      exchangeData = data;
      console.log(exchangeData);
    })
    .catch(error => console.error('Error fetching data', error));
  
  // Calculating exchange rates
  const handleConversion = (from:string, to:string, input:number) => {
    const fromCurrencyData = exchangeData.find(i => i.currency === from);
    const toCurrencyData = exchangeData.find(i => i.currency === to);

    if (!fromCurrencyData || !toCurrencyData) {
      return null; // Return null if either currency is not found
    }

    const fromPrice = fromCurrencyData.price;
    console.log(fromPrice);
    const toPrice = toCurrencyData.price;

    const convertedValue = (input * fromPrice) / toPrice;
    return convertedValue.toFixed(8);
  }

  const convertUSD = (curr:string, value:number) => {
    const currencyData = exchangeData.find(i => i.currency === curr);
    return (currencyData.price * value).toFixed(2);
  }

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
            <div className={styles.input__container}>
              <input
                type="number"
                min="0"
                max="1000000"
                step="0.01"
                value={fromValue}
                onChange={handleInputChange}
                placeholder="You pay"
                className={styles.input}
              />
              <p>${USD}</p>
              </div>
              <CurrencySelector setCurrency={from} onSelection={handleCurrencyFrom}/>
          </div>
          <button className={styles.swap__button} onClick={handleCurrencySwap}>
            <IoIosSwap size={75}/>
          </button>
          <div className={styles.swap}>
              <div className={styles.input__container}>
                <input
                  type="number"
                  min="0"
                  max="1000000"
                  step="0.01"
                  value={toValue}
                  onChange={handleOutputChange}
                  placeholder="You receive"
                  className={styles.input}
                />
                <p>${USD}</p>
              </div>
              
              <CurrencySelector setCurrency={to} onSelection={handleCurrencyTo} />
                
          </div>

        </div>
        

        {/* <ConnectButton/> */}
      </main>
    </div>
  );
};

export default Home;

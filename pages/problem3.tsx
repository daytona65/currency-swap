interface WalletBalance { // Missing blockchain property
    currency: string;
    amount: number;
      blockchain: string;
  }
  interface FormattedWalletBalance { // Missing blockchain property
    currency: string;
    amount: number;
      blockchain: string;
    formattedAmount: string; // Clearer naming of formatted to formattedAmount
  }
  
  class Datasource {
      url: string;
      constructor(url: string) {
          this.url = url;
      }
  
      async getPrices() {
      try {
        const response = await fetch(this.url);
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Error fetching prices');
      }
    }
  }
  
  interface Props extends BoxProps {
  
  }
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
      const [prices, setPrices] = useState({});
  
    useEffect(() => {
      const datasource = new Datasource("https://interview.switcheo.com/prices.json");
      datasource.getPrices().then(prices => {
        setPrices(prices);
      }).catch(error => {
        console.err(error);
      });
    }, []);
  
      /*
      * blockchain type changed to string from any
      */
      const getPriority = (blockchain: string): number => {
        switch (blockchain) {
          case 'Osmosis':
            return 100
          case 'Ethereum':
            return 50
          case 'Arbitrum':
            return 30
          case 'Zilliqa':
            return 20
          case 'Neo':
            return 20
          default:
            return -99
        }
      }
  
      /* sortedFormattedBalances (sortedBalances merged with formattedBalances)
      * lhsPriority not declared
      * balance.amount <= 0
      * filter and map combined to reduce to reduce time complexity
      * simplified branch code
      */
    const sortedFormattedBalances = useMemo(() => {
      return balances.reduce((result, balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
              if (balancePriority > -99 && balance.amount >= 0) {
                      result.push({
                          ...balance,
                          formattedAmount: balance.amount.toFixed()
                      });
              }
              return result;
          }, []).sort((lhs: WalletBalance, rhs: WalletBalance) => {
              const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            return rightPriority - leftPriority;
      });
    }, [balances, prices]);
  
    const rows = sortedFormattedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }
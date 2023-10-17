import { useState } from 'react';
import styles from '../styles/Selector.module.css';
import '../styles/Selector.module.css';
import { 
    Button,
    Modal
} from 'react-bootstrap';

const CurrencySelector = (props) => {
  
    const currencies = [
        "BLUR", "bNEO", "BUSD", "USD", "ETH", "GMX", "STEVMOS", "LUNA", 
        "RATOM", "STRD", "EVMOS", "IBCX", "IRIS", "ampLUNA", "KUJI", 
        "STOSMO", "USDC", "axlUSDC", "ATOM", "STATOM", "OSMO", "rSWTH", 
        "STLUNA", "LSI", "OKB", "OKT", "SWTH", "USC", "WBTC", "wstETH", 
        "YieldUSD", "ZIL"
    ];

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleSelection = (currency: string) => {
        handleClose();
        props.onSelection(currency);
    };


    return (
      <div className={styles.main}>
        <Button className={styles.selectorbutton} onClick={handleOpen}>
            <img src={`/tokens/${props.setCurrency}.svg`} alt={props.setCurrency} className={styles.icon}/>
            {props.setCurrency}
        </Button>

        <Modal 
            className={styles.modal} 
            show={show} 
            onHide={handleClose}
            centered
        >
            <Modal.Header className={styles.modal__header} closeButton>
            <Modal.Title>Choose Currency</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modal__body}>
                {currencies.map((currency, i) => (
                    <Button className={styles.card} key={i} onClick={() => handleSelection(currency)}>
                        <img src={`/tokens/${currency}.svg`} alt={currency} className={styles.icon}/>
                        <h3>{currency}</h3>
                    </Button>
                ))}
            </Modal.Body>
            <Modal.Footer className={styles.modal__footer}>
            </Modal.Footer>
        </Modal>
      </div>
    );
  };
  
  export default CurrencySelector;
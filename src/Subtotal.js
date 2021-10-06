import React from 'react';
import './subtotal.css';
import NumberFormat from 'react-number-format';
import { useStateValue } from './StateProvider';
import {getBasketTotal} from './reducer';
import { useHistory } from 'react-router-dom';


function Subtotal () {
    const [ {basket}, dispatch ] = useStateValue();
    const history = useHistory();

    return(
        <div className="subtotal">
            <NumberFormat 
                value={getBasketTotal( basket ) }
                className="subtotal__number__format"
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                decimalScale={2}
                renderText= { (value) => (
                    <>
                        <p>
                            Subtotal ( {basket?.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox"/>
                            This order contains a gift
                        </small>
                    </>
               )}
            />
            <button onClick={e => history.push('/payment')}> Proceed to checkout</button>
        </div>
    )
}
export default Subtotal;

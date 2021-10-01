export const initialState = {
    basket: []
};

//selector
export const getBasketTotal = (basket) => 
basket?.reduce((prevItem, currentItem) => prevItem + currentItem.price, 0);


const reducer = (state, action) => {
//    console.log("Action selected to be dispatched: ",action)
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state, 
                basket: [...state.basket, action.item]   
            };

        case "REMOVE_FROM_BASKET":
            const itemIndex = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id 
            );
            let newBasket = [...state.basket];
            if(itemIndex >= 0){
                newBasket.splice(itemIndex, 1);
            } else{
                console.warn(
                `Can not remove product ${action.id} as it is not in the basket`
                )
            }
            return {
                ...state,
                basket: newBasket
            }
    
        default:
            return state;
    }
};

export default reducer;






























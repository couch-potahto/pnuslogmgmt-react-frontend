import { ADD_TO_CART, ADD_QUANTITY, REMOVE_ITEM, SUB_QUANTITY, FIRST_NAME_FILLED_IN, CONTACT_FILLED_IN, SUBMIT_REQUEST, REQUEST_SUCCESS, REQUEST_FAILED } from '../actions/action-types/cart-actions'

const initState = {
    items: [],
    addedItems:[],
    total: 0,
    borrower_name: "",
    borrower_contact:"",
    transaction_ref:""
}
const cartReducer= (state = initState, action)=>{
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
        let addedItem = action.eq;
        addedItem.quantity = 1;
          //check if the action id exists in the addedItems
            //calculating the total
        let newTotal = state.total + addedItem.deposit;
        
        return{
            ...state,
            addedItems: [...state.addedItems, addedItem],
            total : newTotal
        }

    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.deposit * itemToRemove.quantity )
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.addedItems.find(item=> item.id === action.eq.id);
          addedItem.quantity += 1;
          let newTotal = state.total + addedItem.deposit
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.addedItems.find(item=> item.id === action.eq.id);
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.eq.id)
            let newTotal = state.total - addedItem.deposit
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.deposit
            return{
                ...state,
                total: newTotal
            }
        }
        
    }
    if(action.type === FIRST_NAME_FILLED_IN){
        
        return{
            ...state,
            borrower_name: action.val
        }
    }
    if(action.type === CONTACT_FILLED_IN){
       
        return{
            ...state,
            borrower_contact: action.val
        }
    }
    if(action.type === REQUEST_SUCCESS){
        return{
            ...state,
            transaction_ref: action.res.data
        }
    }
    return state
}

export default cartReducer
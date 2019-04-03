import { FETCH_ALL_AUCTIONS, CREATE_NEW_AUCTION, DELETE_AUCTION,FILTERED_AUCTIONS, UPDATE_AUCTION} from '../actions/auctionAction';

const initialState = {
    items: [],
    filter: ''
}

export default function auctionReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_AUCTIONS:
            return {
                ...state,
                items: action.payload
            }
        case CREATE_NEW_AUCTION:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case DELETE_AUCTION: 
        console.log(action);
            return {
                ...state,
                items: state.items.filter(a=>a.AuktionID !== action.AuktionID)
            }
        case FILTERED_AUCTIONS:
            return{
                ...state,
                filter: action.payload
            }
        case UPDATE_AUCTION:
            return{
                ...state
            }

        default: return state;
    }
}


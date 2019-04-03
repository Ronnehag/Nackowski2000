import {
    FETCH_ALL_AUCTIONS,
    CREATE_NEW_AUCTION,
    DELETE_AUCTION,
    FILTERED_AUCTIONS,
    FETCH_SINGLE_AUCTION,
    UPDATE_AUCTION

} from '../actions/auctionAction';

const initialState = {
    items: [],
    filter: '',
    auction: null,
    filteredList: []
}

export default function auctionReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_SINGLE_AUCTION:
            return {
                ...state,
                auction: action.payload
            }
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
            return {
                ...state,
                items: state.items.filter(a => a.AuktionID !== action.AuktionID)
            }
        case FILTERED_AUCTIONS:
            return {
                ...state,
                filteredList: state.items.filter(a => {
                    if (a.Titel.includes(action.payload))
                        return a;
                })
            }
        case UPDATE_AUCTION:
            let values = state.items.map(auction => auction.AuktionID === action.payload.AuktionID ? action.payload : auction);
            return {
                ...state,
                items: values
            }

        default: return state;
    }
}


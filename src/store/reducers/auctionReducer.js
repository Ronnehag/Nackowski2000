import {
    FETCH_ALL_AUCTIONS,
    CREATE_NEW_AUCTION,
    DELETE_AUCTION,
    FILTERED_AUCTIONS,
    FETCH_SINGLE_AUCTION,
    UPDATE_AUCTION,
    PLACE_BET

} from '../actions/auctionAction';

const initialState = {
    items: [],
    auction: null,
    filteredList: []
}

export default function auctionReducer(state = initialState, action) {
    console.log(action.payload);
    switch (action.type) {
        case PLACE_BET:
            let auction = state.items.find(a => a.AuktionID === action.payload.AuktionID);
            auction.Bud.push(action.payload);
            return {
                ...state,
                items: [...state.items.filter(a => a.AuktionID !== action.payload.Auktion), auction],
                auction: { ...state.auction, Bud: [...state.auction.Bud, action.payload] }
            }
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
        case DELETE_AUCTION:
            return {
                ...state,
                items: state.items.filter(a => a.AuktionID !== action.AuktionID)
            }
        case FILTERED_AUCTIONS:
            let searchvalue = action.payload.toLowerCase();
            return {
                ...state,
                filteredList: state.items.filter(a => {
                    let titelLower = a.Titel.toLowerCase();
                    return titelLower.includes(searchvalue)
                })
            }
        case UPDATE_AUCTION:
            let values = state.items.map(auction => auction.AuktionID === action.payload.AuktionID ? action.payload : auction);
            return {
                ...state,
                items: values
            }

        case CREATE_NEW_AUCTION:
        default:
            return state;
    }
}


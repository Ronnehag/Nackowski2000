import { FETCH_ALL_AUCTIONS, CREATE_NEW_AUCTION } from '../actions/auctionAction';

const initialState = {
    items: []
}

export default function auctionReducer(state = initialState, action) {
    console.log("Auctionreducer called!", action.type);
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

        default: return state;
    }
}


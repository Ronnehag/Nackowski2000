import { FETCH_ALL_AUCTIONS } from '../actions/auctionAction';

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

        default: return state;
    }
}


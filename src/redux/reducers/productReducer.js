import { ADD_ITEM, DELETE_ITEM } from "../actionsTypes/actionTypes";

const initialState = {
    products: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                products: [...state.products, action.payload]

            };

        case DELETE_ITEM:
            return {
                products: state.products.filter((elem, id) => id !== action.payload.indexOf(id))
            };
        default:
            return state;
    }
};

export default productReducer;
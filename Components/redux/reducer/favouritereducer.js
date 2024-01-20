import { ADD_TO_FAV, CLEAR_FAV, REMOVE_TO_FAV } from "../constant";

const initialStage = {
    favouriteItem: [],
    status: "pending",
    count: 0,
  };
  export const favouriteReducer = (state = initialStage, action) => {
    switch (action.type) {
      case ADD_TO_FAV:
        return {
          ...state,
          favouriteItem: [...state.favouriteItem, action.payload],
          status: "pending",
        };
  
      case REMOVE_TO_FAV:
        const updatedFavourites = state.favouriteItem.filter(
          (item) => item.id !== action.payload.id
        );
        return {
          ...state,
          favouriteItem: updatedFavourites,
          status: "pending",
        };
     
      case CLEAR_FAV:
        return {
          ...state,
          favouriteItem: [],
        };
      default:
        return state;
    }
  };
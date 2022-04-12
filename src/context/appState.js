export const appData = {
  dogName: '',
  gender: '',
  weight: '',
  age_years: '',
  age_months: '',
  weightType: 0,
  targetWeight: '',
  meatTypes: [],
  progressInPercent: 0,
};

export const appStateReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DOG_NAME': {
      return {
        ...state,
        dogName: action.payload,
      };
    }
    case 'ADD_PERCENT': {
      return {
        ...state,
        progressInPercent: action.payload,
      };
    }
    case 'ADD_GENDER': {
      return {
        ...state,
        gender: action.payload,
      };
    }
    case 'ADD_WEIGHT': {
      return {
        ...state,
        weight: action.payload,
      };
    }
    case 'ADD_AGE_YEAR': {
      return {
        ...state,
        age_years: action.payload,
      };
    }
    case 'ADD_AGE_MONTH': {
      return {
        ...state,
        age_months: action.payload,
      };
    }
    case 'ADD_WEIGHT_TYPE': {
      return {
        ...state,
        weightType: action.payload,
      };
    }
    case 'ADD_TARGET_WEIGHT': {
      return {
        ...state,
        targetWeight: action.payload,
      };
    }
    case 'SELECT_MEAT_TYPE': {
      console.log('Meat Type: ', action.payload);
      let meatTypesArray = state.meatTypes.concat(action.payload);
      return {
        ...state,
        meatTypes: meatTypesArray,
      };
    }
    case 'DELETE_TARGET_WEIGHT': {
      return {
        ...state,
        targetWeight: '',
      };
    }
    case 'DELETE_CURRENT_MEAT_TYPE': {
      const filteredTypes = state.meatTypes.filter(
        (item) => item !== action.payload
      );
      // console.log(filteredTypes);
      return {
        ...state,
        meatTypes: filteredTypes,
      };
    }
    case 'DELETE_MEAT_TYPES': {
      return {
        ...state,
        meatTypes: [],
      };
    }
    default:
      return state;
  }
};

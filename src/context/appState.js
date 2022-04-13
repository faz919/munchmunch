export const appData = {
  dogName: '',
  gender: '',
  weight: '',
  age_years: '',
  age_months: '',
  weightType: '',
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
      console.log('WeightType: ', action.payload)
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

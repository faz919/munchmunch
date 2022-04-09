export const appData = {
  dogName: '',
  gender: '',
  weight: '',
  age_years: '',
  age_months: '',
  weightType: '',
  targetWeight: '',
};

export const appStateReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DOG_NAME': {
      console.log('Name: ', action.payload);
      return {
        ...state,
        dogName: action.payload,
      };
    }
    default:
      return state;
  }
};

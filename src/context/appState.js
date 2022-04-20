export const appData = {
  redirected: false,
  dogName: '',
  gender: '',
  weight: '',
  age_years: '',
  age_months: '',
  weightType: '',
  targetWeight: '',
  healthProblems: [],
  meatTypes: [],
  shippingInfo: {},
  portionSize: 'full',
  success: false,
  billingPortal: '',
  progressInPercent: 0,
}

export const appStateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STATE': {
      switch (action.payload) {
        case 'default':
          return {
            redirected: false,
            dogName: '',
            gender: '',
            weight: '',
            age_years: '',
            age_months: '',
            weightType: '',
            targetWeight: '',
            healthProblems: [],
            meatTypes: [],
            shippingInfo: {},
            portionSize: 'full',
            success: false,
            billingPortal: '',
            progressInPercent: 0,
          }
        default:
          return action.payload
      }
    }
    case 'LOG_REDIRECT': {
      return {
        ...state,
        redirected: action.payload
      }
    }
    case 'ADD_DOG_NAME': {
      return {
        ...state,
        dogName: action.payload,
      }
    }
    case 'ADD_PERCENT': {
      return {
        ...state,
        progressInPercent: action.payload,
      }
    }
    case 'ADD_GENDER': {
      return {
        ...state,
        gender: action.payload,
      }
    }
    case 'ADD_WEIGHT': {
      return {
        ...state,
        weight: action.payload,
      }
    }
    case 'ADD_AGE_YEAR': {
      return {
        ...state,
        age_years: action.payload,
      }
    }
    case 'ADD_AGE_MONTH': {
      return {
        ...state,
        age_months: action.payload,
      }
    }
    case 'ADD_WEIGHT_TYPE': {
      return {
        ...state,
        weightType: action.payload,
      }
    }
    case 'ADD_TARGET_WEIGHT': {
      return {
        ...state,
        targetWeight: action.payload,
      }
    }
    case 'ADD_HEALTH_PROBLEM': {
      let healthProblemsArray = state.healthProblems.concat(action.payload)
      return {
        ...state,
        healthProblems: healthProblemsArray
      }
    }
    case 'SELECT_MEAT_TYPE': {
      let meatTypesArray = state.meatTypes.concat(action.payload)
      return {
        ...state,
        meatTypes: meatTypesArray,
      }
    }
    case 'ADD_SHIPPING_INFO': {
      return {
        ...state,
        shippingInfo: action.payload
      }
    }
    case 'DELETE_TARGET_WEIGHT': {
      return {
        ...state,
        targetWeight: '',
      }
    }
    case 'DELETE_CURRENT_MEAT_TYPE': {
      const filteredTypes = state.meatTypes.filter(
        (item) => item !== action.payload
      )
      return {
        ...state,
        meatTypes: filteredTypes,
      }
    }
    case 'DELETE_MEAT_TYPES': {
      return {
        ...state,
        meatTypes: [],
      }
    }
    case 'DELETE_CURRENT_HEALTH_PROBLEM': {
      const filteredProblems = state.healthProblems.filter(
        (item) => item !== action.payload
      )
      return {
        ...state,
        healthProblems: filteredProblems
      }
    }
    case 'DELETE_HEALTH_PROBLEMS': {
      return {
        ...state,
        healthProblems: []
      }
    }
    case 'CHANGE_PORTION_SIZE': {
      return {
        ...state,
        portionSize: action.payload
      }
    }
    case 'CHANGE_SUCCESS_STATE': {
      return {
        ...state,
        success: action.payload
      }
    }
    case 'SET_BILLING_PORTAL_URL': {
      return {
        ...state,
        billingPortal: action.payload
      }
    }
    default:
      return state
  }
}

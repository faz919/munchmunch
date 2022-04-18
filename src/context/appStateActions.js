export const SetState = (state) => ({
  type: 'SET_STATE',
  payload: state
})
export const AddDogName = (name) => ({
  type: 'ADD_DOG_NAME',
  payload: name,
})
export const AddPercent = (percent) => ({
  type: 'ADD_PERCENT',
  payload: percent,
})
export const AddGender = (gender) => ({
  type: 'ADD_GENDER',
  payload: gender,
})
export const AddWeight = (weight) => ({
  type: 'ADD_WEIGHT',
  payload: weight,
})
export const AddAgeYear = (year) => ({
  type: 'ADD_AGE_YEAR',
  payload: year,
})
export const AddAgeMonth = (month) => ({
  type: 'ADD_AGE_MONTH',
  payload: month,
})
export const AddWeightType = (weightType) => ({
  type: 'ADD_WEIGHT_TYPE',
  payload: weightType,
})
export const AddTargetWeight = (targetWeight) => ({
  type: 'ADD_TARGET_WEIGHT',
  payload: targetWeight,
})
export const AddHealthProblem = (healthProblem) => ({
  type: 'ADD_HEALTH_PROBLEM',
  payload: healthProblem
})
export const SelectMeatType = (meatType) => ({
  type: 'SELECT_MEAT_TYPE',
  payload: meatType,
})
export const AddShippingInfo = (shippingInfo) => ({
  type: 'ADD_SHIPPING_INFO',
  payload: shippingInfo
})
export const DeleteTargetWeight = () => ({
  type: 'DELETE_TARGET_WEIGHT',
})
export const DeleteCurrentMeatType = (meatType) => ({
  type: 'DELETE_CURRENT_MEAT_TYPE',
  payload: meatType,
})
export const DeleteMeatTypes = () => ({
  type: 'DELETE_MEAT_TYPES'
})
export const DeleteCurrentHealthProblem = (healthProblem) => ({
  type: 'DELETE_CURRENT_HEALTH_PROBLEM',
  payload: healthProblem
})
export const DeleteHealthProblems = () => ({
  type: 'DELETE-HEALTH-PROBLEMS'
})
export const ChangePortionSize = (size) => ({
  type: 'CHANGE_PORTION_SIZE',
  payload: size
})
export const ChangeSuccessState = (success) => ({
  type: 'CHANGE_SUCCESS_STATE',
  payload: success
})
export const SetBillingPortalUrl = (url) => ({
  type: 'SET_BILLING_PORTAL_URL',
  payload: url
})
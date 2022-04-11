export const AddDogName = (name) => ({
  type: 'ADD_DOG_NAME',
  payload: name,
});
export const AddGender = (gender) => ({
  type: 'ADD_GENDER',
  payload: gender,
});
export const AddWeight = (weight) => ({
  type: 'ADD_WEIGHT',
  payload: weight,
});
export const AddAgeYear = (year) => ({
  type: 'ADD_AGE_YEAR',
  payload: year,
});
export const AddAgeMonth = (month) => ({
  type: 'ADD_AGE_MONTH',
  payload: month,
});
export const AddWeightType = (weightType) => ({
  type: 'ADD_WEIGHT_TYPE',
  payload: weightType,
});
export const AddTargetWeight = (targetWeight) => ({
  type: 'ADD_TARGET_WEIGHT',
  payload: targetWeight,
});
export const SelectMeatType = (meatType) => ({
  type: 'SELECT_MEAT_TYPE',
  payload: meatType,
});
export const DeleteTargetWeight = () => ({
  type: 'DELETE_TARGET_WEIGHT',
});
export const DeleteMeatTypes = () => ({
  type: 'DELETE_MEAT_TYPES',
});

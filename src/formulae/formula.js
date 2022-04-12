const calculatePrice = (values) => {
  let daysBetweenEachOrder = 30;

  let kiloCalorieRequirement, factor;

  // conversion of kilocalories to weight in kgs
  let kCalToKg = {
    // values can be modified via environment variables in netlify site settings
    beef: parseInt(`${process.env.REACT_APP_BEEF_KCAL_TO_KG}`),
    chicken: parseInt(`${process.env.REACT_APP_CHICKEN_KCAL_TO_KG}`),
    lamb: parseInt(`${process.env.REACT_APP_LAMB_KCAL_TO_KG}`),
    turkey: parseInt(`${process.env.REACT_APP_TURKEY_KCAL_TO_KG}`),
    kangaroo: parseInt(`${process.env.REACT_APP_KANGAROO_KCAL_TO_KG}`),
  };

  // find factor by which calorie requiement is multiplied
  values.age_years < 1 && values.age_months <= 4
    ? (factor = 3)
    : values.age_years < 1 && values.age_months > 4
    ? (factor = 2)
    : values.age_years > 0 && values.weightType === 'inshape'
    ? (factor = 1.8)
    : values.age_years > 0 && values.weightType === 'overweight'
    ? (factor = 1.4)
    : values.age_years > 0 && values.weightType === 'underweight'
    ? (factor = 2)
    : (factor = 1);

  // find daily kCal requirement
  kiloCalorieRequirement = (factor * 70 * values.weight) ^ 0.75;

  // convert from kCals to kgs, depending on what user has entered
  let valuesSelected = 0,
    numSelected = 0,
    avgRatio;

  // find # of kgs per meat type
  let kgsPerMeatType = {};
  //   if (values.meatTypes) {
  //     for (const [key, value] of Object.entries(values.meatTypes)) {
  //       // denominator; number of total meat types selected
  //       value && numSelected++;

  //       // numerator; sum of kcaltokg values of each meat type selected
  //       value
  //         ? (valuesSelected = valuesSelected + kCalToKg[key])
  //         : (valuesSelected = valuesSelected);
  //     }
  //     avgRatio = valuesSelected / numSelected;
  //   }
  numSelected = values.meatTypes.length;
  for (let i = 0; i < numSelected; i++) {
    valuesSelected = valuesSelected + kCalToKg[values.meatTypes[i]];
  }
  avgRatio = valuesSelected / numSelected;

  // kgs per day required by the dog
  let kgsPerDay = kiloCalorieRequirement / avgRatio;

  // weight in kgs of each order
  let orderWeight = kgsPerDay * daysBetweenEachOrder;

  if (orderWeight) {
    // for (const [key, value] of Object.entries(values.meatTypes)) {
    //   // if the meat type is selected, find the ratio of that meat to total meat and multiply by total weight
    //   value
    //     ? (kgsPerMeatType[key] =
    //         (kCalToKg[key] / (avgRatio * numSelected)) * orderWeight)
    //     : (kgsPerMeatType[key] = 0);
    //   }

    for (let i = 0; i < numSelected; i++) {
      let meatTypeValue = values.meatTypes[i];
      kgsPerMeatType[meatTypeValue] =
        (kCalToKg[meatTypeValue] / (avgRatio * numSelected)) * orderWeight;
    }
  }

  // return the values
  return {
    dailyKCalRequirement: kiloCalorieRequirement,
    orderKCalRequirement: kiloCalorieRequirement * daysBetweenEachOrder,
    orderWeight,
    kgsPerMeatType,
    subtotal: orderWeight.toFixed(2),
  };
};

export default calculatePrice;

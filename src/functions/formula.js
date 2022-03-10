const calculatePrice = (values) => {
    let kiloCalorieRequirement, factor

    // conversion of kilocalories to weight in kgs
    let kCalToKg = {
        // known values
        beef: 1161,
        chicken: 1125,

        // estimated values
        lamb: 1000,
        turkey: 1000,
        kangaroo: 1000
    }

    // find factor by which calorie requiement is multiplied
    values.age_years < 1 && values.age_months <= 4 ? factor = 3 :
    values.age_years < 1 && values.age_months > 4 ? factor = 2 :
    values.age_years > 0 && values.weightType === 'inshape' ? factor = 1.8 :
    values.age_years > 0 && values.weightType === 'overweight' ? factor = 1.4 :
    values.age_years > 0 && values.weightType === 'underweight' ? factor = 2 : factor = 1

    // find daily kCal requirement
    kiloCalorieRequirement =  factor * 70 * values.weight^0.75

    // convert from kCals to kgs, depending on what user has entered
    let valuesSelected = 0, numSelected = 0, avgRatio
    if (values.meatTypes) {
        for (const [key, value] of Object.entries(values.meatTypes)) {

            // denominator; number of total meat types selected
            value && numSelected++

            // numerator; sum of kcaltokg values of each meat type selected
            value ? valuesSelected = valuesSelected + kCalToKg[key] : valuesSelected = valuesSelected
        }
        avgRatio = valuesSelected/numSelected
    }   

    let kgsPerDay = kiloCalorieRequirement/avgRatio

    // return the value
    return {
        dailyCalorieRequirement: kiloCalorieRequirement,
        subtotal: (kgsPerDay * 7).toFixed(2)
    }
}

export default calculatePrice
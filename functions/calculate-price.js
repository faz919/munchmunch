const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler = async (req) => {
  const { meatTypes, kgsPerMeatType } = JSON.parse(req.body)
    const items = meatTypes.map(async (meat) => {
      switch (meat) {
        case 'beef':
            const beef_price = await stripe.prices.retrieve(`${process.env.PRICE_ID_BEEF}`)
            const beef_quantity = kgsPerMeatType['beef'] / (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
          return beef_price['unit_amount'] * beef_quantity
        case 'chicken':
            const chicken_price = await stripe.prices.retrieve(`${process.env.PRICE_ID_CHICKEN}`)
            const chicken_quantity = kgsPerMeatType.chicken / (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
          return kgsPerMeatType.chicken
        case 'lamb':
            const lamb_price = await stripe.prices.retrieve(`${process.env.PRICE_ID_LAMB}`)
            const lamb_quantity = kgsPerMeatType.lamb / (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
          return kgsPerMeatType.lamb
        case 'turkey':
            const turkey_price = await stripe.prices.retrieve(`${process.env.PRICE_ID_TURKEY}`)
            const turkey_quantity = kgsPerMeatType['turkey'] / (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
          return turkey_price['unit_amount'] * turkey_quantity
        case 'kangaroo':
            const kangaroo_price = await stripe.prices.retrieve(`${process.env.PRICE_ID_KANGAROO}`)
            const kangaroo_quantity = kgsPerMeatType['kangaroo'] / (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
          return kangaroo_price['unit_amount'] * kangaroo_quantity
        default:
            return 'meat type not found'
      }
    })
    const total_unit_amount = items.reduce((partialSum, a) => partialSum + a, 0);
    return {
      statusCode: 200,
      body: JSON.stringify({
        something: kgsPerMeatType.chicken, 
        other_thing: kgsPerMeatType['chicken'],
        items,
        subtotal: total_unit_amount/100
      })
    }
}
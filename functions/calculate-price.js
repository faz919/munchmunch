const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler = async (req) => {
  try {
    const { meatTypes, kgsPerMeatType } = JSON.parse(req.body)
    const prices = {
      beef: await stripe.prices.retrieve(`${process.env.PRICE_ID_BEEF}`),
      chicken: await stripe.prices.retrieve(`${process.env.PRICE_ID_CHICKEN}`),
      lamb: await stripe.prices.retrieve(`${process.env.PRICE_ID_LAMB}`),
      turkey: await stripe.prices.retrieve(`${process.env.PRICE_ID_TURKEY}`),
      kangaroo: await stripe.prices.retrieve(`${process.env.PRICE_ID_KANGAROO}`)
    }
    const items = meatTypes.map((meat) => {
      let price, quantity
      switch (meat) {
        case 'beef':
          price = prices.beef.unit_amount
          quantity = kgsPerMeatType['beef'] / (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
          break
        case 'chicken':
          price = prices.chicken.unit_amount
          quantity = kgsPerMeatType['chicken'] / (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
          break
        case 'lamb':
          price = prices.lamb.unit_amount
          quantity = kgsPerMeatType['lamb'] / (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
          break
        case 'turkey':
          price = prices.turkey.unit_amount
          quantity = kgsPerMeatType['turkey'] / (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
          break
        case 'kangaroo':
          price = prices.kangaroo.unit_amount
          quantity = kgsPerMeatType['kangaroo'] / (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
          break
        default:
          break
      }
      return price * quantity
    })
    const total_unit_amount = items.reduce((partialSum, a) => partialSum + a, 0);
    return {
      statusCode: 200,
      body: JSON.stringify({
        subtotal: (total_unit_amount / 100).toFixed(2)
      })
    }
  } catch (e) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: e.message
      })
    }
  }
}
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler = async (req) => {
  const { meatTypes, kgsPerMeatType } = JSON.parse(req.body)
  const items = meatTypes.map(async (meat) => {
    let price, quantity
    switch (meat) {
      case 'beef':
        price = await stripe.prices.retrieve(`${process.env.PRICE_ID_BEEF}`)
        quantity = kgsPerMeatType['beef'] / (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
        break
      case 'chicken':
        price = await stripe.prices.retrieve(`${process.env.PRICE_ID_CHICKEN}`)
        quantity = kgsPerMeatType.chicken / (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
        break
      case 'lamb':
        price = await stripe.prices.retrieve(`${process.env.PRICE_ID_LAMB}`)
        quantity = kgsPerMeatType.lamb / (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
        break
      case 'turkey':
        price = await stripe.prices.retrieve(`${process.env.PRICE_ID_TURKEY}`)
        quantity = kgsPerMeatType['turkey'] / (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
        break
      case 'kangaroo':
        price = await stripe.prices.retrieve(`${process.env.PRICE_ID_KANGAROO}`)
        quantity = kgsPerMeatType['kangaroo'] / (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
        break
      default:
        price = {
          unit_amount: 2384732478
        }
        quantity = 9388
        break
    }
    return { price, quantity }
  })
  const test = meatTypes.map((meat) => `${meat} is cool`)
  const total_unit_amount = items.reduce((partialSum, a) => partialSum + a, 0);
  return {
    statusCode: 200,
    body: JSON.stringify({
      test,
      items,
      subtotal: total_unit_amount / 100
    })
  }
}
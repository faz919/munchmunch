// import React from 'react'
// import '../assets/bootstrap/bootstrap.min.css'
// import { ReactComponent as FacebookLogo } from '../assets/bootstrap5-plain-assets/socials/facebook.svg'
// import { ReactComponent as TwitterLogo } from '../assets/bootstrap5-plain-assets/socials/twitter.svg'
// import { ReactComponent as InstagramLogo } from '../assets/bootstrap5-plain-assets/socials/instagram.svg'

// const Home = () => {
//     return (
//         <div className>
//             <section className="pb-5">
//                 <nav className="navbar navbar-expand-lg navbar-light py-4">
//                     <div className="container">
//                         <a className="navbar-brand" href="#"><img src="https://static.shuffle.dev/uploads/files/13/13a73166e9b120df067c90fa43ef36203e9cd0ec/LogoExport.png" alt="" width={330} /></a>
//                         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#header01" aria-controls="header01" aria-expanded="false" aria-label="Toggle navigation">
//                             <span className="navbar-toggler-icon" />
//                         </button>
//                         <div className="collapse navbar-collapse" id="header01">
//                             <ul className="navbar-nav ms-auto mt-3 mt-lg-0 mb-3 mb-lg-0 me-4">
//                                 <li className="nav-item me-4"><a className="nav-link" href="#howitworks">How it Works</a></li>
//                                 <li className="nav-item me-4"><a className="nav-link" href="#mealinfo">Meal Info</a></li>
//                                 <li className="nav-item"><a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#signinmodal">Log in to your subscription</a></li>
//                             </ul>
//                             <div><a className="btn btn-primary btn-lg" href="https://start.munchmunch.com.au">Start now</a></div>
//                         </div>
//                     </div>
//                 </nav>
//                 <div className="container pt-5">
//                     <div className="row align-items-center mb-5">
//                         <div className="col-12 col-lg-5 mb-5 mb-lg-0 me-auto">
//                             <h2 className="display-4 fw-bold mb-5">Better + healthier fresh dog food in Sydney</h2>
//                             <p className="lead text-muted mb-5">Munch+Munch fresh dog food delivered to your door. Whole ingredients like sweet potato, beef mince, peas, quinoa, flaxseeds, fish oil, and much more. </p>
//                             <div className="d-flex flex-wrap"><a className="btn btn-primary btn-lg me-2 mb-2 mb-sm-0" href="https://start.munchmunch.com.au">Start now </a></div>
//                         </div>
//                         <div className="col-12 col-lg-6">
//                             <img className="img-fluid" src={require("../assets/images/Dog-with-Bowl-at-0-5x-copy.png")} alt="" />
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <section className="py-5">
//                 <div className="container">
//                     <div className="row align-items-center">
//                         <div className="col-12 col-lg-5 me-auto mb-5 mb-lg-0">
//                             <div>
//                                 <h2 className="display-5 mb-5 fw-bold">Joy and excitement with every bite</h2>
//                                 <div className="d-flex mb-4">
//                                     <div className="text-primary me-2">
//                                         <svg style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h4>Tastier food</h4>
//                                         <p className="text-muted">Fresh meat, vegetables and supplements that actually taste good. Would you eat dry kibble?</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex mb-4">
//                                     <div className="text-primary me-2">
//                                         <svg style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h4>Gleaming Coats</h4>
//                                         <p className="text-muted">The essential fatty acids, oils and fats in the meal boost  your dog's coat, giving it shine and softness.</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex">
//                                     <div className="text-primary me-2">
//                                         <svg style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h4>Healthier Poops</h4>
//                                         <p className="text-muted">Fresh food has all the natural fibre and goodness from fresh vegetables. This results in healthier bowel movements and a happier dog.</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex flex-row-reverse">
//                                     <div>
//                                         <div><a className="btn btn-primary btn-lg" href="https://start.munchmunch.com.au">Start now</a></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-12 col-lg-6">
//                             <img className="img-fluid" src={require("../assets/images/boywithdog.jpg")} alt="" />
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <section className="py-5">
//                 <div className="container">
//                     <div className="row align-items-center">
//                         <div className="col-12 col-lg-6 mb-5 mb-lg-0">
//                             <img className="img-fluid" src={require("../assets/images/bowloffood.jpeg")} alt="" />
//                         </div>
//                         <div className="col-12 col-lg-5 ms-auto">
//                             <div>
//                                 <h2 className="display-5 mb-5 fw-bold">Save hours on meal prep and shopping</h2>
//                                 <div className="d-flex mb-4">
//                                     <div className="text-primary me-2">
//                                         <svg style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h4>Human grade dog food</h4>
//                                         <p className="text-muted">We make food so fresh and tasty that you could eat it yourself. If you want to do that we recommend adding some salt as our meals are low-sodium.</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex mb-4">
//                                     <div className="text-primary me-2">
//                                         <svg style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h4>High quality fresh ingredients</h4>
//                                         <p className="text-muted">We source the freshest ingredients from farms all over Australia and the World, saving you the trip to Coles and Woolworths.</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex">
//                                     <div className="text-primary me-2">
//                                         <svg style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h4>Recipes based on science</h4>
//                                         <p className="text-muted">Meals are balanced and include the nutrients and minerals recommended by veterinary boards around the world for the optimum health of your pet.</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex flex-row-reverse">
//                                     <div>
//                                         <div><a className="btn btn-primary btn-lg" href="https://start.munchmunch.com.au">Start now</a></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <section className="py-5">
//                 <div className="container">
//                     <div className="row align-items-center">
//                         <div className="col-12 col-lg-5 me-auto mb-5 mb-lg-0">
//                             <div>
//                                 <h2 className="display-5 mb-5 fw-bold">Help fussy eating dogs and health issues</h2>
//                                 <div className="d-flex mb-4">
//                                     <div className="text-primary me-2">
//                                         <svg style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h4>Weight maintenance</h4>
//                                         <p className="text-muted">If your dog is underweight, overweight, or has trouble staying at a consistent weight - a tasty Munch+Munch meal will help. </p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex mb-4">
//                                     <div className="text-primary me-2">
//                                         <svg style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h4>Fussy eaters love it</h4>
//                                         <p className="text-muted">Ever pour out your bag of kibble only to see your dog look away from it in disgust? With Munch+Munch meals your pet will be eating out of the bowl before you finish pouring it out.</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex">
//                                     <div className="text-primary me-2">
//                                         <svg style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h4>Heaps of energy</h4>
//                                         <p className="text-muted">If you were fed the same meal for entire years of your life you might be lethargic too. Watch as your dog gains a new lease on life with our tasty meals. </p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex flex-row-reverse">
//                                     <div>
//                                         <div><a className="btn btn-primary btn-lg" href="https://start.munchmunch.com.au">Start now</a></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-12 col-lg-6">
//                             <img className="img-fluid" src={require("../assets/images/iStock-1342228992.jpg")} alt="" />
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <section className="py-5">
//                 <div className="container">
//                     <div className="row align-items-center">
//                         <div className="col-12 col-lg-5 mb-5">
//                             <img className="img-fluid" src={require("../assets/images/t-shirt-mockup-low-res.png")} alt="" />
//                         </div>
//                         <div className="col-12 col-lg-6 ms-auto">
//                             <div>
//                                 <a id="howitworks" />
//                                 <h2 className="display-5 fw-bold mb-5">Customised to your dog + delivered to your door</h2>
//                                 <div className="row">
//                                     <div className="col-12 col-md-6 mb-5">
//                                         <span className="d-flex mb-2 justify-content-center align-items-center rounded-circle bg-primary text-white" style={{ width: '48px', height: '48px' }}>1</span>
//                                         <p className="mt-3 mb-0 lead text-muted">Complete the <a href="https://start.munchmunch.com.au">online survey</a> that determines how much your dog needs to eat</p>
//                                     </div>
//                                     <div className="col-12 col-md-6 mb-5">
//                                         <span className="d-flex mb-2 justify-content-center align-items-center rounded-circle bg-primary text-white" style={{ width: '48px', height: '48px' }}>2</span>
//                                         <p className="mt-3 mb-0 lead text-muted">Decide if you want to feed your dog a 100% fresh food diet, or use our food as a "topper" as 50% of their diet.</p>
//                                     </div>
//                                     <div className="col-12 col-md-6 mb-5 mb-mb-0">
//                                         <span className="d-flex mb-2 justify-content-center align-items-center rounded-circle bg-primary text-white" style={{ width: '48px', height: '48px' }}>3</span>
//                                         <p className="mt-3 mb-0 lead text-muted">Place your order and receive your deliveries. The food arrives cooked and ready to serve.</p>
//                                     </div>
//                                     <div className="col-12 col-md-6">
//                                         <span className="d-flex mb-2 justify-content-center align-items-center rounded-circle bg-primary text-white" style={{ width: '48px', height: '48px' }}>4</span>
//                                         <p className="mt-3 mb-0 lead text-muted">Let us know if you want to pause or cancel at any time for no cost. We can also modify the meal if your pet is having issues with it.</p>
//                                         <p className="mt-3 mb-0 lead text-muted"><a href="https://start.munchmunch.com.au">Start Now!</a></p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <section className="py-5">
//                 <div className="container">
//                     <div className="row align-items-center">
//                         <div className="col-12 col-lg-6 mb-5 mb-lg-0">
//                             <img className="img-fluid" src={require("../assets/images/dog-bowl-lowres.png")} alt="" />
//                         </div>
//                         <div className="col-12 col-lg-5 ms-auto">
//                             <div>
//                                 <a id="mealinfo"> </a>
//                                 <h2 className="display-5 mb-5 fw-bold">Badass Beef Recipe</h2>
//                                 <div className="d-flex mb-4">
//                                     <div className="text-primary me-2">
//                                         <svg style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h4>High protein and tasty cuts</h4>
//                                         <p className="text-muted">Crafted to meet the nutritional levels established by the AAFCO Dog Food Nutritional Profile for all life stages. We have put in farm fresh beef mince, heart and liver for a balance of nutrients and taste, while keeping fats low.</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex mb-4">
//                                     <div className="text-primary me-2">
//                                         <svg style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h4>Grain Free - healthy carbs</h4>
//                                         <p className="text-muted">We focused on carbs that are nutritionally dense and provide other benefits - primarily sweet potato for its taste and flavonoids, with peas mixed in as well. Carrots and Cauliflower bulk up the fibre content and round out the vitamins in the mix.</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex">
//                                     <div className="text-primary me-2">
//                                         <svg style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h4>Loaded with Nutrients</h4>
//                                         <p className="text-muted">To top it off we toss in some kelp and spirulina, flaxseed oil and fish oil, ginger, spinach, sardines, and a few secret herbs and spices to ensure the meal hits all the requirements of your dog.</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex flex-row-reverse">
//                                     <div>
//                                         <div><a className="btn btn-primary btn-lg" href="https://start.munchmunch.com.au">Start now</a></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div></section>
//             <section className="py-5">
//                 <div className="container">
//                     <div className="row align-items-center">
//                         <div className="col-12 col-lg-5 me-auto mb-5 mb-lg-0">
//                             <div>
//                                 <h2 className="display-5 mb-5 fw-bold">Cheeky Chicken Recipe</h2>
//                                 <div className="d-flex mb-4">
//                                     <div className="text-primary me-2">
//                                         <svg style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h4>Tasty protein and organs</h4>
//                                         <p className="text-muted">Crafted to meet the nutritional levels established by the AAFCO Dog Food Nutritional Profile for all life stages. We have put in farm fresh chicken breast, heart and liver for a balance of nutrients and taste, while keeping fats low. There is also Egg included.</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex mb-4">
//                                     <div className="text-primary me-2">
//                                         <svg style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h4>Variety of fresh veggies</h4>
//                                         <p className="text-muted">Carrots, Cauliflower, Butternut Squash, Spinach, Shiitake Mushrooms. Tasty, full of fibre, vitamins, and nutrients.</p>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex">
//                                     <div className="text-primary me-2">
//                                         <svg style={{ width: '24px', height: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <h4>Herbs and seeds</h4>
//                                         <p className="text-muted">To top it off we toss in some kelp, flaxseed oil and fish oil, Psyllium seed husk, spinach, basil, and a few secret herbs and spices to ensure the meal hits all the requirements of your dog.</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-12 col-lg-6">
//                             <img className="img-fluid" src={require("../assets/images/food-packaginglowres.png")} alt="" />
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <section className="py-5">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-12 col-lg-6 p-2">
//                             <img className="img-fluid rounded" src={require("../assets/images/tyrrell-fitness-and-nutrition-jSQxj-Ug0H8-unsplash.jpg")} alt="" />
//                         </div>
//                         <div className="col-12 col-lg-6 p-2">
//                             <img className="img-fluid rounded" src={require("../assets/images/louis-hansel-2s9TCIxPesI-unsplash.jpg")} alt="" />
//                         </div>
//                         <div className="col-12 col-md-4 p-2">
//                             <img className="img-fluid rounded" src={require("../assets/images/bianca-ackermann-g0RmYGOrdPY-unsplash.jpg")} alt="" />
//                         </div>
//                         <div className="col-12 col-md-4 p-2">
//                             <img className="img-fluid rounded" src={require("../assets/images/deborah-rainford-3uJcymbLnYA-unsplash.jpg")} alt="" />
//                         </div>
//                         <div className="col-12 col-md-4 p-2">
//                             <img className="img-fluid rounded" src={require("../assets/images/max-delsid-oBwnHsjCx9A-unsplash.jpg")} alt="" />
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <section className="py-5">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-12 col-lg-6 mx-auto">
//                             <h2 className="display-5 mb-5 fw-bold">Frequently Asked Questions:</h2>
//                             <div className="accordion accordion-flush" id="faq03">
//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header" id="faq03-header1">
//                                         <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq03-answer1" aria-expanded="false" aria-controls="faq03-answer1">Why switch to Munch+Munch?</button>
//                                     </h2>
//                                     <div className="accordion-collapse collapse show" id="faq03-answer1" aria-labelledby="faq03-header1" data-bs-parent="#faq03">
//                                         <div className="accordion-body">Firstly, you don't have to switch outright. You can start by supplementing half of your dog's food with our fresh food. Secondly, our meals are made with high quality whole food ingredients, that are not processed heavily into dry nuggets like the food you can buy in the store. Every meal is made fresh and full of wholesome and healthy ingredients for your loved pets.</div>
//                                     </div>
//                                 </div>
//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header" id="flush-headingOne">
//                                         <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq03-answer2" aria-expanded="false" aria-controls="faq03-answer2">How does a subscription work?</button>
//                                     </h2>
//                                     <div className="accordion-collapse collapse" id="faq03-answer2" aria-labelledby="faq03-header2" data-bs-parent="#faq03">
//                                         <div className="accordion-body">You go through a brief survey so we can tailor and customise the meals we provide your dog. We deliver exactly the right amount of food to you so you don't have to worry about portion sizing. If you want less, you can opt for the half plan.</div>
//                                     </div>
//                                 </div>
//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header" id="flush-headingOne">
//                                         <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq03-answer3" aria-expanded="false" aria-controls="faq03-answer3">Can I order a sample to start?</button>
//                                     </h2>
//                                     <div className="accordion-collapse collapse" id="faq03-answer3" aria-labelledby="faq03-header3" data-bs-parent="#faq03">
//                                         <div className="accordion-body">We don't offer samples but instead we will give you 100% of your money back if you are not completely satisfied with your experience after your first order.</div>
//                                     </div>
//                                 </div>
//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header" id="flush-headingOne">
//                                         <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq03-answer4" aria-expanded="false" aria-controls="faq03-answer4">How do I transition my pup to fresh-cooked food?</button>
//                                     </h2>
//                                     <div className="accordion-collapse collapse" id="ffaq03-answer4" aria-labelledby="faq03-header4" data-bs-parent="#faq03">
//                                         <div className="accordion-body">Slowly start mixing in Munch+Munch food in with your existing pet food. One day one Munch+Munch should be around 1/4 of the total meal size. The next day it can be 1/2. The following day 3/4, and finally on the last day you can start feeding your dog 100% fresh Munch+Munch food.</div>
//                                     </div>
//                                 </div>
//                                 <div className="accordion-item">
//                                     <h2 className="accordion-header" id="flush-headingOne">
//                                         <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq03-answer5" aria-expanded="false" aria-controls="faq03-answer5">What is the difference between a full and a half plan?</button>
//                                     </h2>
//                                     <div className="accordion-collapse collapse" id="faq03-answer5" aria-labelledby="faq03-header5" data-bs-parent="#faq03">
//                                         <div className="accordion-body">If you want to feed your pup a fully fresh cooked and healthy diet then go with the 'full plan'. The half plan is to supplement your dry food with some fresh food and add some variety to what you are feeding your pup.</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <section className="py-5">
//                 <div className="container">
//                     <div className="row align-items-center">
//                         <div className="col-12 col-lg-5 me-auto mb-5">
//                             <img className="mx-auto img-fluid rounded" src={require("../assets/images/gsdlowres.jpg")} alt="" />
//                         </div>
//                         <div className="col-12 col-lg-6">
//                             <div>
//                                 <img className="img-fluid d-block mb-3" src="bootstrap5-plain-assets/images/quote.svg" alt="" />
//                                 <a id="testimonials" />
//                                 <h2 className="display-4 fw-bold mb-3">She is heaps happier, bounding around smiling!</h2>
//                                 <p className="lead text-muted mb-5">I cant believe I didn't do this sooner. I always wanted to prepare meals for her but never had the time. Munch+Munch is a lifesaver!</p>
//                                 <h4 className="fw-bold">Alex F</h4>
//                                 <p className="text-muted">Chilli's best friend</p>
//                             </div>
//                             <div className="d-flex flex-row-reverse">
//                                 <div>
//                                     <div><a className="btn btn-primary btn-lg" href="https://start.munchmunch.com.au">Start now</a></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div></section>
//             <section className="py-5">
//                 <div className="container mb-5">
//                     <div className="row">
//                         <div className="col-12 col-md-4 text-center mb-5 mb-md-0">
//                             <svg className="mx-auto mb-4" width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M25.6 22.9C25.7 23 25.8 23 26 23H33C33.6 23 34 22.6 34 22C34 21.8 34 21.7 33.9 21.6L30.4 14.6C30.1 14.1 29.5 13.9 29 14.2C28.9 14.3 28.7 14.4 28.6 14.6L25.1 21.6C24.9 22 25.1 22.6 25.6 22.9ZM29.5 17.2L31.4 21H27.6L29.5 17.2ZM18.5 14C16 14 14 16 14 18.5C14 21 16 23 18.5 23C21 23 23 21 23 18.5C23 16 21 14 18.5 14ZM18.5 21C17.1 21 16 19.9 16 18.5C16 17.1 17.1 16 18.5 16C19.9 16 21 17.1 21 18.5C21 19.9 19.9 21 18.5 21ZM22.7 25.3C22.3 24.9 21.7 24.9 21.3 25.3L18.5 28.1L15.7 25.3C15.3 24.9 14.7 24.9 14.3 25.3C13.9 25.7 13.9 26.3 14.3 26.7L17.1 29.5L14.3 32.3C13.9 32.7 13.9 33.3 14.3 33.7C14.7 34.1 15.3 34.1 15.7 33.7L18.5 30.9L21.3 33.7C21.7 34.1 22.3 34.1 22.7 33.7C23.1 33.3 23.1 32.7 22.7 32.3L19.9 29.5L22.7 26.7C23.1 26.3 23.1 25.7 22.7 25.3ZM33 25H26C25.4 25 25 25.4 25 26V33C25 33.6 25.4 34 26 34H33C33.6 34 34 33.6 34 33V26C34 25.4 33.6 25 33 25ZM32 32H27V27H32V32Z" fill="#3d8bfd" />
//                                 <circle cx={24} cy={24} r="23.5" stroke="#6ea8fe" />
//                             </svg>
//                             <p className="mb-1">WeWork, 5 Martin Pl, </p>
//                             <p className="mb-0">Sydney NSW 2000, Australia</p>
//                         </div>
//                         <div className="col-12 col-md-4 text-center mb-5 mb-md-0">
//                             <svg className="mx-auto mb-4" width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M25.6 22.9C25.7 23 25.8 23 26 23H33C33.6 23 34 22.6 34 22C34 21.8 34 21.7 33.9 21.6L30.4 14.6C30.1 14.1 29.5 13.9 29 14.2C28.9 14.3 28.7 14.4 28.6 14.6L25.1 21.6C24.9 22 25.1 22.6 25.6 22.9ZM29.5 17.2L31.4 21H27.6L29.5 17.2ZM18.5 14C16 14 14 16 14 18.5C14 21 16 23 18.5 23C21 23 23 21 23 18.5C23 16 21 14 18.5 14ZM18.5 21C17.1 21 16 19.9 16 18.5C16 17.1 17.1 16 18.5 16C19.9 16 21 17.1 21 18.5C21 19.9 19.9 21 18.5 21ZM22.7 25.3C22.3 24.9 21.7 24.9 21.3 25.3L18.5 28.1L15.7 25.3C15.3 24.9 14.7 24.9 14.3 25.3C13.9 25.7 13.9 26.3 14.3 26.7L17.1 29.5L14.3 32.3C13.9 32.7 13.9 33.3 14.3 33.7C14.7 34.1 15.3 34.1 15.7 33.7L18.5 30.9L21.3 33.7C21.7 34.1 22.3 34.1 22.7 33.7C23.1 33.3 23.1 32.7 22.7 32.3L19.9 29.5L22.7 26.7C23.1 26.3 23.1 25.7 22.7 25.3ZM33 25H26C25.4 25 25 25.4 25 26V33C25 33.6 25.4 34 26 34H33C33.6 34 34 33.6 34 33V26C34 25.4 33.6 25 33 25ZM32 32H27V27H32V32Z" fill="#3d8bfd" />
//                                 <circle cx={24} cy={24} r="23.5" stroke="#6ea8fe" />
//                             </svg>
//                             <p className="mb-0">hello@munchmunch.com.au</p>
//                         </div>
//                         <div className="col-12 col-md-4 text-center">
//                             <svg className="mx-auto mb-4" width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M25.6 22.9C25.7 23 25.8 23 26 23H33C33.6 23 34 22.6 34 22C34 21.8 34 21.7 33.9 21.6L30.4 14.6C30.1 14.1 29.5 13.9 29 14.2C28.9 14.3 28.7 14.4 28.6 14.6L25.1 21.6C24.9 22 25.1 22.6 25.6 22.9ZM29.5 17.2L31.4 21H27.6L29.5 17.2ZM18.5 14C16 14 14 16 14 18.5C14 21 16 23 18.5 23C21 23 23 21 23 18.5C23 16 21 14 18.5 14ZM18.5 21C17.1 21 16 19.9 16 18.5C16 17.1 17.1 16 18.5 16C19.9 16 21 17.1 21 18.5C21 19.9 19.9 21 18.5 21ZM22.7 25.3C22.3 24.9 21.7 24.9 21.3 25.3L18.5 28.1L15.7 25.3C15.3 24.9 14.7 24.9 14.3 25.3C13.9 25.7 13.9 26.3 14.3 26.7L17.1 29.5L14.3 32.3C13.9 32.7 13.9 33.3 14.3 33.7C14.7 34.1 15.3 34.1 15.7 33.7L18.5 30.9L21.3 33.7C21.7 34.1 22.3 34.1 22.7 33.7C23.1 33.3 23.1 32.7 22.7 32.3L19.9 29.5L22.7 26.7C23.1 26.3 23.1 25.7 22.7 25.3ZM33 25H26C25.4 25 25 25.4 25 26V33C25 33.6 25.4 34 26 34H33C33.6 34 34 33.6 34 33V26C34 25.4 33.6 25 33 25ZM32 32H27V27H32V32Z" fill="#3d8bfd" />
//                                 <circle cx={24} cy={24} r="23.5" stroke="#6ea8fe" />
//                             </svg>
//                             <p className="mb-0">+61 8 9467 9720</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div style={{ height: '350px', width: '100%', backgroundImage: `url(${require("../assets/images/ScreenShot-2022-04-19-at-11-35-45.png")}` }} />
//                 <div className="container" style={{ marginTop: '-96px' }}>
//                     <div className="row">
//                         <div className="col-12 col-lg-8 mx-auto">
//                             <div className="p-3 p-lg-5 text-center rounded border bg-light">
//                                 <span className="text-muted">We would love to hear from you!</span>
//                                 <h2 className="display-6 fw-bold mt-2 mb-5">Contact us for any questions.</h2>
//                                 <form data-netlify="true" name="contactus" method="post">
//                                     <input className="form-control mb-3" type="text" placeholder="Name" name="name" />
//                                     <input className="form-control mb-3" type="email" placeholder="E-mail" name="email" />
//                                     <textarea className="form-control mb-3" name="message" cols={30} rows={10} placeholder="Your Message..." defaultValue={""} />
//                                     <button className="btn btn-primary w-100">Send us a message</button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             {/*
// <section class="py-5">
//   <div class="container">
//     <div class="row align-items-center">
//       <div class="col-12 col-lg-8 mb-4 mb-lg-0">
//         <div class="d-flex align-items-center">
          
//           <div>
//             <h3 class="fw-bold">Sign up to our newsletter</h3>
//             <p class="text-muted mb-0">Get tips and tricks on how to feed and live with your dog once a month</p>
//           </div>
//         </div>
//       </div>
//       <div class="col-12 col-lg-4 ms-auto">
//         <form action="#">
//           <div class="d-flex">
//             <input class="form-control me-2" type="email" placeholder="Type your e-mail">
//             <button class="btn btn-primary">Subscribe</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// </section>
// */}
//             {/* Modal */}
//             <div className="modal fade" id="signinmodal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title" id="exampleModalLabel">Sign in to your Munch+Munch subscription</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
//                         </div>
//                         <div className="modal-body">
//                             <div className="mb-3">
//                                 <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
//                                 <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
//                                 <div id="emailHelp" className="form-text">We'll email you a link that you can use to login immediately.</div>
//                             </div>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                             <button type="button" className="btn btn-primary">Send</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <footer className="py-5">
//                 <div className="container">
//                     <div className="d-flex flex-wrap align-items-center justify-content-between border-bottom">
//                         <div className="mb-5">
//                             <a className="d-inline-block" href="#"><img src={require("../assets/images/LogoExport.png")} alt="Munch+Munch" width={96} /></a>
//                         </div>
//                         <div>
//                             <ul className="list-unstyled d-flex flex-wrap align-items-center">
//                                 <li className="me-4"><a className="link-secondary" href="#howitworks">How it Works</a></li>
//                                 <li className="me-4"><a className="link-secondary" href="#mealinfo">Meal Info</a></li>
//                                 <li className="me-4"><a className="link-secondary" href="#" data-bs-toggle="modal" data-bs-target="#signinmodal">Log into your subscription</a></li>
//                                 <li>
//                                 </li></ul>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="mb-5" />
//                 <div className="container">
//                     <div className="d-flex flex-wrap align-items-center justify-content-between">
//                         <p>All rights reserved © Munchmunch Pty Ltd.</p>
//                         <div>
//                             <a className="d-inline-block me-4" href="https://www.facebook.com/MunchMunch-100962012551367">
//                                 <FacebookLogo />
//                             </a>
//                             <a className="d-inline-block me-4" href="https://twitter.com/MunchMunchau">
//                                 <TwitterLogo />
//                             </a>
//                             <a className="d-inline-block me-4" href="https://www.instagram.com/munchmunchau/">
//                                 <InstagramLogo />
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     )
// }

// export default Home
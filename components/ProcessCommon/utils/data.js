import { Review } from '../json';

export const processes = [
  {
    name: 'Idea',
    description: `The Idea is the first step in the creation of any product.
                  It can come to your mind all of a sudden or after long and thorough thinking.
                  But after such a breakthrough a lot of questions arise. Will the product succeed on the market?
                  Does anybody need it at all? How to implement it the right way? We will answer all these questions and
                  more to help you make the final decision.`,
    link: '/process/idea',
    json: Review,
  },
  {
    name: 'Research',
    description: `We believe that only the market can truly validate the idea, 
                  but research is a necessary step to take.
                  It can be conducted on different levels, number and names may vary, 
                  but there is one goal – to ascertain the success of the final product. 
                  Here we together determine the chances that the project 
                  will survive on the market and the best instruments to create it.`,
    link: '/process/research',
    json: Review,
  },
  {
    name: 'Prototype',
    description: `Prototyping is the most crucial step in the whole development process 
                  (and the most underestimated one). 
                  A prototype is the skeleton of a future app that shows how it will work. 
                  This stage determines the product’s functionality 
                  and allows to make mistakes to avoid them in the future.`,
    link: '/process/prototype',
    json: Review,
  },
  {
    name: 'Design',
    description: `What do you like more: a strawberry ice cream or a home-made pizza?
                  And if you have to choose between the dark blue background of the app 
                  or the acid-pink one, what would you prefer? 
                  Everybody has different tastes, and that makes the design 
                  process very subjective. 
                  But having years of experience behind our back we know 
                  how to make the product both easy to use and good looking.`,
    link: '/process/design',
    json: Review,
  },
  {
    name: 'Develop',
    description: `Development is a complex process that requires a lot of expertise 
                  and contains many pitfalls. Over-engineering may take place if 
                  developers put too much effort to achieve a small-scale goal 
                  or vice versa, large projects can be done with ready-to-go methods. 
                  We know how to lead your project the right way and always find 
                  the perfect balance between your product and your budget.`,
    link: '/process/develop',
    json: Review,
  },
  {
    name: 'Review',
    description: `This stage is a crucial part of the development. As fans of GitFlow, 
                  we always use the cross-review technique to make sure that each 
                  update is as good as it can be.`,
    link: '/process/review',
    json: Review,
  },
  {
    name: 'Test',
    description: `Why testing stage is important? And which test type to use and when? 
                  There are manual and automated tests, integration tests, load tests, 
                  smoke tests, acceptance tests and so many more. 
                  We'll help you out here and recommend exactly what you need 
                  to make the release of your product flawless. `,
    link: '/process/test',
    json: Review,
  },
  {
    name: 'Launch',
    description: `Here we launch the final version of the product, fully developed and 
                  tested. We can also provide you with all the necessary packaging 
                  like landing pages and other marketing materials you may need 
                  for the release. But when the product is finally out in the wild 
                  we don't just put it in our portfolio and forget about it. 
                  We are always there for you to help with anything that 
                  you may need during post-release support.`,
    link: '/process/launch',
    json: Review,
  },
];

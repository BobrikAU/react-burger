const initialState = {
  allOrders: [
    {
      numberOrder: '034535',
      orderTime: 'Сегодня, 16:20 i-GMT+3',
      burgerName: 'Death Star Starship Main бургер',
      idIngredients: [
                      '60d3b41abdacab0026a733c7',
                      '60d3b41abdacab0026a733c8',
                      '60d3b41abdacab0026a733d2',
                      '60d3b41abdacab0026a733d0',
                      '60d3b41abdacab0026a733ce',
                     ],
      price: '480'
    },
    {
        numberOrder: '034534',
        orderTime: 'Сегодня, 13:20 i-GMT+3',
        burgerName: 'Interstellar бургер',
        idIngredients: [
                        '60d3b41abdacab0026a733c7',
                        '60d3b41abdacab0026a733c8',
                        '60d3b41abdacab0026a733d2',
                        '60d3b41abdacab0026a733d0',
                        '60d3b41abdacab0026a733ce',
                        '60d3b41abdacab0026a733d4',
                        '60d3b41abdacab0026a733d4',
                        '60d3b41abdacab0026a733d2',
                        '60d3b41abdacab0026a733d2'
                       ],
        price: '560'
      },
      {
        numberOrder: '034533',
        orderTime: 'Вчера, 13:50 i-GMT+3',
        burgerName: 'Black Hole Singularity острый бургер',
        idIngredients: [
                        '60d3b41abdacab0026a733c7',
                        '60d3b41abdacab0026a733c8',
                        '60d3b41abdacab0026a733d1',
                        '60d3b41abdacab0026a733ce',
                        '60d3b41abdacab0026a733d3',
                       ],
        price: '510'
      },{
        numberOrder: '034535',
        orderTime: 'Сегодня, 16:20 i-GMT+3',
        burgerName: 'Death Star Starship Main бургер',
        idIngredients: [
                        '60d3b41abdacab0026a733c7',
                        '60d3b41abdacab0026a733c8',
                        '60d3b41abdacab0026a733d2',
                        '60d3b41abdacab0026a733d0',
                        '60d3b41abdacab0026a733ce',
                       ],
        price: '480'
      },{
        numberOrder: '034535',
        orderTime: 'Сегодня, 16:20 i-GMT+3',
        burgerName: 'Death Star Starship Main бургер',
        idIngredients: [
                        '60d3b41abdacab0026a733c7',
                        '60d3b41abdacab0026a733c8',
                        '60d3b41abdacab0026a733d2',
                        '60d3b41abdacab0026a733d0',
                        '60d3b41abdacab0026a733ce',
                       ],
        price: '480'
      },{
        numberOrder: '034535',
        orderTime: 'Сегодня, 16:20 i-GMT+3',
        burgerName: 'Death Star Starship Main бургер',
        idIngredients: [
                        '60d3b41abdacab0026a733c7',
                        '60d3b41abdacab0026a733c8',
                        '60d3b41abdacab0026a733d2',
                        '60d3b41abdacab0026a733d0',
                        '60d3b41abdacab0026a733ce',
                       ],
        price: '480'
      }
  ],
  userOrders: {},
}

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
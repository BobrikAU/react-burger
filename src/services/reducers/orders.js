const initialState = {
  allOrders: {
    orders: [
      {
        ingredients: [
                        '60d3b41abdacab0026a733c7',
                        '60d3b41abdacab0026a733c8',
                        '60d3b41abdacab0026a733d2',
                        '60d3b41abdacab0026a733d0',
                        '60d3b41abdacab0026a733ce',
                       ],
        _id: '034535',
        status: 'pending',
        number: 134535,
        createdAt: '2022-05-23T14:43:22.587Z',
        updatedAt: '2021-06-23T14:43:22.587Z',
        name: 'Death Star Starship Main бургер',
        price: '480'
      },
      {
        ingredients: [
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
        _id: '034534',
        status: 'pending',
        number: 134534,
        createdAt: '2022-06-14T14:43:22.587Z',
        updatedAt: '2021-06-23T14:43:22.587Z',
        name: 'Interstellar бургер',
        price: '560'
      },
      {
        ingredients: [
                        '60d3b41abdacab0026a733c7',
                        '60d3b41abdacab0026a733c8',
                        '60d3b41abdacab0026a733d1',
                        '60d3b41abdacab0026a733ce',
                        '60d3b41abdacab0026a733d3',
                       ],
        _id: '034533',
        status: 'pending',
        number: 134533,
        createdAt: '2022-05-13T14:43:22.587Z',
        updatedAt: '2021-06-23T14:43:22.587Z',
        name: 'Black Hole Singularity острый бургер',
        price: '510'
      },
      {
        ingredients: [
                        '60d3b41abdacab0026a733c7',
                        '60d3b41abdacab0026a733c8',
                        '60d3b41abdacab0026a733d2',
                        '60d3b41abdacab0026a733d0',
                        '60d3b41abdacab0026a733ce',
                       ],
        _id: '034535',
        status: 'done',
        number: 134535,
        createdAt: '2022-04-12T14:43:22.587Z',
        updatedAt: '2021-06-23T14:43:22.587Z',
        name: 'Death Star Starship Main бургер',
        price: '480'
      },
      {
        ingredients: [
                        '60d3b41abdacab0026a733c7',
                        '60d3b41abdacab0026a733c8',
                        '60d3b41abdacab0026a733d2',
                        '60d3b41abdacab0026a733d0',
                        '60d3b41abdacab0026a733ce',
                       ],
        _id: '034535',
        status: 'done',
        number: 134535,
        createdAt: '2022-03-11T14:43:22.587Z',
        updatedAt: '2021-06-23T14:43:22.587Z',
        name: 'Death Star Starship Main бургер',
        price: '480'
      },
      {
        ingredients: [
                        '60d3b41abdacab0026a733c7',
                        '60d3b41abdacab0026a733c8',
                        '60d3b41abdacab0026a733d2',
                        '60d3b41abdacab0026a733d0',
                        '60d3b41abdacab0026a733ce',
                       ],
        _id: '034535',
        status: 'done',
        number: 134535,
        createdAt: '2022-02-10T14:43:22.587Z',
        updatedAt: '2021-06-23T14:43:22.587Z',
        name: 'Death Star Starship Main бургер',
        price: '480'
      }
    ],
    total: 28752,
    totalToday: 138
  },
  userOrders: {},
}

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
import moment from 'moment'

const expenses = [{
  id: '1',
  description: 'Gum',
  note: 'bought gum',
  amount: 195,
  createdAt: 0
}, {
  id: '2',
  description: 'Rent',
  note: '',
  amount: 10950,
  createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
  id: '3',
  description: 'Credit card',
  note: '',
  amount: 4500,
  createdAt: moment(0).add(4, 'days').valueOf()
}]

export default expenses
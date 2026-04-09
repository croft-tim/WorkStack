export interface Customer {
  id: number
  name: string
  address: string
  phone: string
  email: string
  notes: string
  rating: number
}

//     id: 1,
//     name: 'Jessie',
//     address: '69 place over there',
//     phone: '0210231212',
//     email: 'real@beanmail.com',
//     notes: '',
//     rating: 7.5,

export interface CustomerSearch {
  id?: string
}
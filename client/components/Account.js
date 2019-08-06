import React from 'react'
import OrderHistory from './OrderHistory'
import AccountUpdateForm from './AccountUpdateForm'

export default function Account() {
  return (
    <div>
      <AccountUpdateForm />
      <OrderHistory />
    </div>
  )
}

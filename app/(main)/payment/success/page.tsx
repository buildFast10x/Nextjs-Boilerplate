import React from 'react'
import Link from 'next/link'

export default function page() {
  return (
    <>
        <div>Payment Successful</div>
        <Link href={'/'}><p>Go to Home Page</p></Link>
    </>
  )
}

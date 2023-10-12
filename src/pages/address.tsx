import React from 'react'
import { getLayout } from '@/layouts/DefaultLayout'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

function Address() {
  const [customer, setCustomer] = useState({});
  const [step, setStep] = useState(1);
  const mockCustomer: { name: string, address: string[] } = {
    name: "Bob",
    address: ["123 Main St", "123 Pine St"]
  }
  const mockAddresses: { name: string, address: string, default: boolean }[] = [
    {name: "Bob",
    address: "123 Main St",
    default: false},
    {name: "Marky Mark",
    address: "123 King St", default: true}
  ]
  useEffect(() => {
    setCustomer(mockCustomer);
  }, [])
  // const addressMapper = (addressArray: string[]) => {
  //   return addressArray.map((address) => {
  //     return (<div><input type="radio" value={address} /> <label> {customer.name} {address} </label></div>)
  //   })
  // }
  const addressArrayMapper = (addressArray: { name: string, address: string, default: boolean }[]) => {
    return addressArray.map((address) => {
      return (<div className=""><input type="radio" value={address.address} /> <label className="font-bold"> 
       {address.name} </label> <label> {address.address} </label> <label className="text-primary font-bold"> 
        {address.default && (
      "Default address"
      )}
        </label>
      </div>)
    })
  }

  return (
    // <div className="bg-paleBlue h-screen w-screen pl-10 pt-24">
    <>
      <div>
        {/* <form>
          {customer.address && addressMapper(customer.address)}
        </form> */}
        <form>
          {addressArrayMapper(mockAddresses)}
        </form>
      </div>
      <Button className="bg-transparent hover:bg-transparent text-primary font-bold">+ Add a new address </Button>
      <span className="flex justify-between" >
        <Button className="bg-transparent hover:bg-transparent text-primary font-bold">← Back </Button>
        <Button className="next text-white font-bold"  > Next → </Button>
      </span>

    </>
    // </div>
  )
}
Address.getLayout = getLayout

export default Address

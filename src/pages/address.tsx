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
  useEffect(() => {
    setCustomer(mockCustomer);
  }, [])
  const addressMapper = (addressArray: string[]) => {
    return addressArray.map((x) => {
      return (<div><input type="radio" value={x} /> <label> {customer.name} {x} </label></div>)
    })
  }

  return (
    // <div className="bg-paleBlue h-screen w-screen pl-10 pt-24">
    <>
      <div>
        <form>

          {customer.address && addressMapper(customer.address)}
        </form>
        {/* <form>
          <input type="radio" id="html" value="HTML" />
          <label >HTML</label> <br></br>
          <input type="radio" id="css" value="CSS" />
          <label> css </label> <br></br>
          <input type="radio" id="javascript" value="JavaScript" />
          <label>JavaScript</label>
        </form> */}
      </div>
      <span className="flex justify-between" >
        <Button >← back </Button>
        <Button className="next text-white"  > next → </Button>
      </span>

    </>
    // </div>
  )
}
Address.getLayout = getLayout

export default Address

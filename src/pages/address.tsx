import React from 'react'
import { getLayout } from '@/layouts/DefaultLayout'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { input } from 'zod';

function Address() {
  const [addresses, setAddresses] = useState({});
  const [step, setStep] = useState(1);
  const [addAddress, setAddAddress] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');

  // Event handler for when a radio input is selected
  const handleRadioChange = (event: any) => {
    // console.log(event.target.value);
    // const parentNode = event.target.parentNode;
    // console.log(parentNode);
    setSelectedMethod(event.target.value);
    const form = document.getElementById("selectPickupMethod") as HTMLElement;
    if (form) {
      const radioInputs = form.querySelectorAll('input[type="radio"]');
      let selectedValue;

      radioInputs.forEach(function (input: any) {
        const parentDiv: HTMLElement = input.parentNode?.parentNode;
        console.log(parentDiv)
        if (parentDiv) {
          if (input.checked) {
            parentDiv?.classList.remove("border-brand");
            parentDiv?.classList.add("border-primary");
            parentDiv?.classList.remove("opacity-50")
          } else {
            parentDiv?.classList.add("border-brand");
            parentDiv?.classList.remove("border-primary");
            parentDiv?.classList.add("opacity-50")
          }
        }
      });

      setStep(2);
    }
    
  };
  const mockAddresses: { name: string, address: string, default: boolean }[] = [
    {
      name: "Bob",
      address: "123 Main St",
      default: false
    },
    {
      name: "Marky Mark",
      address: "123 King St", default: true
    }
  ]
  useEffect(() => {
    setAddresses(mockAddresses);
  }, [])
  const addNewAddress = (event: any) => {
    event.preventDefault();
    console.log(event.target[0].value);
    console.log(event.target[1].value);
  }
  const toggleAddressForm = () => {
    setAddAddress(!addAddress);
  }
  const handleAddressSelection = () => {
    const form = document.getElementById("selectAddressForm") ; 
    if (form) {
      const radioInputs = form.querySelectorAll('input[type="radio"]');
      let selectedValue;

      radioInputs.forEach(function (input: any) {
        if (input.checked) {
          selectedValue = input.value;
        }
      });
      console.log(selectedValue);

      setStep(2);
    }
  }
  // const addressMapper = (addressArray: string[]) => {
  //   return addressArray.map((address) => {
  //     return (<div><input type="radio" value={address} /> <label> {customer.name} {address} </label></div>)
  //   })
  // }
  const addressArrayMapper = (addressArray: { name: string, address: string, default: boolean }[]) => {
    return addressArray.map((address) => {
      return (<div className=""><input type="radio" key={addressArray.indexOf(address)} value={address.address} name="address" /> <label className="font-bold">
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
      <div className="text-largeText text-brand">
        Pickup Details
      </div>
      {step === 1 && (<div>
        <div className="text-brand">
          Select or add your pickup address
        </div>
        <div className="font-bold text-brand text-smallText mt-5">
          Your Addresses:
        </div>
        <div className="w-3/4 border-black border-t-2">

          <form id="selectAddressForm" className="mt-5">
            {addressArrayMapper(mockAddresses)}
          </form>
        </div>
        <Button className="bg-transparent hover:bg-transparent text-primary font-bold" onClick={toggleAddressForm}>+ Add a new address </Button>
        {addAddress && (<form className="flex flex-column justify-around w-1/3" onSubmit={(e) => addNewAddress(e)}>
          <div className="flex flex-row">
            <div>
              <label>Name</label> <label>Address</label>
            </div>
            <div>
              <input type="text" name="name" />
              <input type="text" name="address" />
            </div>
          </div>
          <div className="flex justify-around">
            <button className="text-primary" type="submit">Add new address</button>
          </div>
        </form>)}
        <span className="flex justify-between" >
          <Button className="bg-transparent hover:bg-transparent text-primary font-bold">← Back </Button>
          <Button className="next text-white font-bold" onClick={handleAddressSelection} > Next → </Button>
        </span>
      </div>)}


      <div className="text-brand">
        Which pickup method do you prefer?
      </div>
      <form id="selectPickupMethod" className="mt-5">
        <div className="flex flex-row justify-around mx-1/5 ">
          <div className="justify-center border-4 border-brand rounded-full py-2 px-4">
            <div className="flex justify-center font-bold">
              Direct Handoff </div>
            <div className="flex justify-center "> Hand the package directly to our specialist at your door </div>
            <div className="flex justify-center" >
              <input type="radio" key="handoff" value="handoff" name="pickupMethod" checked={selectedMethod === 'handoff'}
              onChange={handleRadioChange}/>
            </div>
          </div>
          <div className="justify-center border-4 border-brand rounded-full py-2 px-4">
            <div className="flex justify-center font-bold ">
              Leave on Doorstep </div>
            <div className="flex justify-center"> Place items outside your door ahead of your pick up window </div>
            <div className="flex justify-center">

              <input type="radio" key="doorstep" value="doorstep" name="pickupMethod" checked={selectedMethod === 'doorstep'}
              onChange={handleRadioChange} />
            </div>
          </div>
        </div>
      </form>
      

      <span className="flex justify-between" >
        <Button className="bg-transparent hover:bg-transparent text-primary font-bold" onClick={() => setStep(1)}>← Back </Button>
        <Button className="next text-white font-bold" onClick={() => console.log("step3")} > Next → </Button>
      </span>

    </>
    // </div>
  )
}
Address.getLayout = getLayout

export default Address

import React from 'react'
import { getLayout } from '@/layouts/DefaultLayout'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { input } from 'zod';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

function Address() {
  const [addresses, setAddresses] = useState({});
  const [step, setStep] = useState(1);
  const [addAddress, setAddAddress] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');

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
      name: "Bob Gunderson",
      address: "6500 Boulevard de Rome, Brossard, QC, J4Y 0B6, Canada",
      default: true
    },
    {
      name: "Marky Mark",
      address: "123 King St", default: false
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
    const form = document.getElementById("selectAddressForm");
    if (form) {
      const radioInputs = form.querySelectorAll('input[type="radio"]');
      let selectedValue;

      radioInputs.forEach(function (input: any) {
        if (input.checked) {
          selectedValue = input.value;
        }
      });
      console.log(selectedValue);

      if (selectedValue) {
        setStep(2);
      }

    }
  }
  // const addressMapper = (addressArray: string[]) => {
  //   return addressArray.map((address) => {
  //     return (<div><input type="radio" value={address} /> <label> {customer.name} {address} </label></div>)
  //   })
  // }
  const addressArrayMapper = (addressArray: { name: string, address: string, default: boolean }[]) => {
    return addressArray.map((address) => {
      return (<div className="w-full h-10 flex my-5 fontSize-large items-center"><Input type="radio" key={addressArray.indexOf(address)} value={address.address} name="address" className="h-6 w-8 mx-5"/> <label className="font-bold mx-2">
        {address.name} </label> <label> {address.address} </label> <label className="text-primary font-bold mx-2">
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
        <Separator className="w-3/4 border-black border-t-2" />
        <div>
          <form id="selectAddressForm" className="mt-5">
            {addressArrayMapper(mockAddresses)}
          </form>
        </div>
        <Button className="bg-transparent hover:bg-transparent text-primary font-bold" onClick={toggleAddressForm}>+ Add a new address </Button>
        {addAddress && (<form className="flex flex-column justify-around w-1/3" onSubmit={(e) => addNewAddress(e)}>
          <div className="flex flex-row">
            <div className="mr-5">
              <div className="mt-3">
                <label >Name</label>
              </div>
              <div className="mt-8">
                <label>Address</label>
              </div>
            </div>
            <div>
              <Input type="text" name="name" />
              <Input type="text" name="address" className="mt-5" />
            </div>
          </div>
          <div className="flex justify-around">
            <button className="text-primary" type="submit">Add new address</button>
          </div>
        </form>)}
        <span className="flex justify-between mt-5" >
          <Button className="bg-transparent hover:bg-transparent text-primary font-bold">← Back </Button>
          <Button className="next text-white font-bold" onClick={handleAddressSelection} > Next → </Button>
        </span>
      </div>)}

      {step === 2 && (<div><div className="text-brand">
        Which pickup method do you prefer?
      </div>
        <form id="selectPickupMethod" className="mt-5">
          <div className="flex flex-row justify-around mx-1/5 ">
            <div className="justify-center border-4 border-brand rounded-full py-2 px-4">
              <div className="flex justify-center font-bold">
                Direct Handoff </div>
              <div className="flex justify-center "> Hand the package directly to our specialist at your door </div>
              <div className="flex justify-center" >
                <Input type="radio" key="handoff" value="handoff" name="pickupMethod" checked={selectedMethod === 'handoff'}
                  onChange={handleRadioChange} />
              </div>
            </div>
            <div className="justify-center border-4 border-brand rounded-full py-2 px-4">
              <div className="flex justify-center font-bold ">
                Leave on Doorstep </div>
              <div className="flex justify-center"> Place items outside your door ahead of your pick up window </div>
              <div className="flex justify-center">

                <Input type="radio" key="doorstep" value="doorstep" name="pickupMethod" checked={selectedMethod === 'doorstep'}
                  onChange={handleRadioChange} />
              </div>
            </div>
          </div>
        </form>


        <span className="flex justify-between mt-5" >
          <Button className="bg-transparent hover:bg-transparent text-primary font-bold" onClick={() => setStep(1)}>← Back </Button>
          <Button className="next text-white font-bold" onClick={() => setStep(3)} > Next → </Button>
        </span></div>)}

    </>
    // </div>
  )
}
Address.getLayout = getLayout

export default Address

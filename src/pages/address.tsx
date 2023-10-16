import React from 'react'
import { getLayout } from '@/layouts/DefaultLayout'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import Router from 'next/router';
import { useToast } from '@/components/ui/use-toast';

function Address() {
  const [addresses, setAddresses] = useState({});
  const [step, setStep] = useState(1);
  const [addAddress, setAddAddress] = useState(false);
  const { toast } = useToast()
  // const [selectedMethod, setSelectedMethod] = useState('');

  // const handleRadioChange = (event: any) => {
  //   setSelectedMethod(event.target.value);
  //   const form = document.getElementById("selectPickupMethod") as HTMLElement;
  //   if (form) {
  //     const radioInputs = form.querySelectorAll('input[type="radio"]');
  //     let selectedValue;

  //     radioInputs.forEach(function (input: any) {
  //       const parentDiv: HTMLElement = input.parentNode?.parentNode;
  //       if (parentDiv) {
  //         if (input.checked) {
  //           parentDiv?.classList.remove("border-brand");
  //           parentDiv?.classList.add("border-primary");
  //           parentDiv?.classList.remove("opacity-50")
  //         } else {
  //           parentDiv?.classList.add("border-brand");
  //           parentDiv?.classList.remove("border-primary");
  //           parentDiv?.classList.add("opacity-50")
  //         }
  //       }
  //     });
  //     setStep(2);
  //   }

  // };
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
  const addressSchema = z.object({
    address: z.string().min(3).max(50),
    city: z.string().min(3).max(50),
    province: z.string().min(2).max(2),
  })
  const validateFormData = (inputs: unknown) => {
    const isValidData = addressSchema.parse(inputs);
    return isValidData;
  };
  const addressValidator = async (addressObj: object) => {
    try {
      const valid = validateFormData(addressObj);
      if(!valid) {
        return;
      }
      console.log(valid);
      console.log("adding new address to profile!");
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        description: "Please ensure that all fields are filled in and province field contains only two letters",
      })
    }
  };
  useEffect(() => {
    setAddresses(mockAddresses);
  }, [])
  const addNewAddress = (event: any) => {
    event.preventDefault();
    const addressToAdd: object = {
      address: event.target[1].value,
      city: event.target[2].value,
      province: event.target[3].value,
    } 
    addressValidator(addressToAdd);
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
        Router.push("/pickup")
      } else {
        toast({
          variant: "destructive",
          description: "Please select an address before proceeding.",
        })
      }
    }
  }
  const addressArrayMapper = (addressArray: { name: string, address: string, default: boolean }[]) => {
    return addressArray.map((address) => {
      return (<div className="w-full h-10 flex my-7 fontSize-large items-center "><Input type="radio" key={addressArray.indexOf(address)} value={address.address} name="address" className="h-6 w-8 mx-2 w-[10%]"/> <Label className="font-bold mx-2 w-[10%] break-all">
        {address.name} </Label> <Label className="w-[50%] my-2 py-2 break-all max-w-max"> {address.address} </Label> <Label className="text-primary font-bold mx-2 w-[10%]">
          {address.default && (
            "Default address"
          )}
        </Label>
      </div>)
    })
  }

  return (
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
        {addAddress && (<form className="flex flex-column justify-around w-3/4" onSubmit={(e) => addNewAddress(e)}>
          <div className="flex flex-column">
            <div className="items-center flex flex-row ">
            <div className="mr-5 items-center">
              <div className="my-2 flex items-center" >
                <Label className="w-1/3">Name:</Label>
                <Input type="text" name="name" className="my-2  w-3/4" />
              </div>
              <div className="my-2 flex items-center">
                <Label className="w-1/3">Address: </Label>
                <Input type="text" name="address" className="my-2  w-3/4" />
              </div>
              <div className="my-2 flex items-center">
                <Label className="w-1/3">City: </Label>
                <Input type="text" name="address" className="my-2 w-3/4" />
              </div>
              <div className="my-2 flex items-center">
                <Label className="w-1/3">Province: (e.g. ON) </Label>
                <Input type="text" name="address" className="my-2  w-3/4" />
              </div>
            </div>
            <div>
              
              
            </div>
            </div>
          </div>
          <div className="flex justify-around items-center">
            <button className="text-primary h-1/4" type="submit">Add new address</button>
          </div>
        </form>)}
        <span className="flex justify-between mt-5" >
          <Button className="bg-transparent hover:bg-transparent text-primary font-bold ">← Back </Button>
          <Button className="next text-white font-bold" onClick={handleAddressSelection} > Next → </Button>
        </span>
      </div>)}

      {/* {step === 2 && (<div><div className="text-brand">
        Which pickup method do you prefer?
      </div>
        <form id="selectPickupMethod" className="mt-5 flex justify-center">
          <div className="flex flex-row justify-center mx-1/5 w-3/4">
            <div className="justify-center border-4 border-brand rounded-[12px] mx-4  py-2 px-4 max-w-[40%]">
              <div className="flex justify-center text-smallText font-bold ">
                Direct Handoff </div>
              <div className="flex justify-center "> Hand the package directly to our specialist at your door </div>
              <div className="flex justify-center" >
                <Input type="radio" key="handoff" value="handoff" name="pickupMethod" checked={selectedMethod === 'handoff'}
                  onChange={handleRadioChange} />
              </div>
            </div>
            
            <div className="justify-center border-4 border-brand rounded-[12px] mx-4 py-2 px-4 max-w-[40%]">
              <div className="flex justify-center text-smallText font-bold ">
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
        </span></div>)} */}

    </>
    // </div>
  )
}
Address.getLayout = getLayout;

export default Address;
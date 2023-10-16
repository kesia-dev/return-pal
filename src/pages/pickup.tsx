import React from 'react'
import { getLayout } from '@/layouts/DefaultLayout'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Input } from '@/components/ui/input';
import Router from 'next/router';

function Pickup() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const handleRadioChange = (event: any) => {
    setSelectedMethod(event.target.value);
    const form = document.getElementById("selectPickupMethod") as HTMLElement;
    if (form) {
      const radioInputs = form.querySelectorAll('input[type="radio"]');
      let selectedValue;

      radioInputs.forEach(function (input: any) {
        const parentDiv: HTMLElement = input.parentNode?.parentNode;
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
    }

  };

  return (
    <div>
      <div className="text-largeText text-brand">
        Pickup Details
      </div><div className="text-brand">
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
        <Button className="bg-transparent hover:bg-transparent text-primary font-bold" onClick={() => Router.push("/address")}>← Back </Button>
        <Button className="next text-white font-bold" onClick={() => console.log(3)} > Next → </Button>
      </span></div>

  )
}

Pickup.getLayout = getLayout;

export default Pickup;
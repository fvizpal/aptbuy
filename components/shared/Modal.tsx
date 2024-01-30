'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addUserEmailToProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";

interface Props {
  productId: string
}

const Modal = ({ productId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await addUserEmailToProduct(productId, email);

    setIsSubmitting(false)
    setEmail('')
  }

  return (
    <Dialog>
      <DialogTrigger className="py-4 px-4 bg-secondary hover:bg-opacity-70 rounded-[30px] text-black text-lg font-semibold">Track</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Track the prices of your product and get alerts in your inbox</DialogTitle>
          <DialogDescription>
            <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <div>
                <input
                  required
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className='flex-1 pl-1 my-5 border-none text-gray-500 text-base focus:outline-none border border-gray-300 rounded-[27px] shadow-xs;'
                />
              </div>

              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <button type="submit"
                    className="px-5 py-3 text-black text-base font-semibold border border-secondary rounded-lg mt-8;"
                  >
                    {isSubmitting ? 'Submitting...' : 'Track'}
                  </button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
import React, { useState } from 'react'
import PaymentCard from '../payment/paymentCard';
import visacardImg from "@/app/assets/images/payment/visa.png"
import jazzcashImg from "@/app/assets/images/payment/jazzcash.png"
import { FaCreditCard } from 'react-icons/fa';

const PaymentMethod = () => {

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const handleChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
    }

    return (
        <div className='flex flex-col w-full space-y-3'>


            <div className="flex flex-col">
                <label
                    htmlFor="payment"
                    className="text-sm font-bold text-blue-600 flex items-center"
                >
                    <FaCreditCard className="mr-2" /> Select payment method
                </label>
            </div>

            <div className="w-full flex justify-between gap-4 flex-wrap md:flex-nowrap">
                <PaymentCard
                    selectedPayment={selectedPaymentMethod}
                    value={"visaCard"}
                    onChange={handleChange}
                    cardholderName={`Anus`}
                    cardNumber={"9999"}
                    cardImage={visacardImg}
                />
                <PaymentCard
                    selectedPayment={selectedPaymentMethod}
                    value={"masterCard"}
                    onChange={handleChange}
                    cardholderName={`M.Fahad`}
                    cardNumber={"8998"}
                    cardImage={jazzcashImg}
                />
            </div>
        </div>
    )
}

export default PaymentMethod
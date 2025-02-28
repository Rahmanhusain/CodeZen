'use client'
import React,{useState} from 'react'


const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="flex w-full justify-between items-center cursor-pointer text-left font-medium text-green-800 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span>{question}</span>
                <svg
                    className={`w-5 h-5 ml-2 transform ${isOpen ? 'rotate-180' : ''} transition-transform duration-200`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            <div
                className={`mt-2 text-gray-600 ${isOpen ? 'block max-h-96' : 'hidden max-h-0'
                    } transition-all duration-200 overflow-hidden`}
            >
                <p className="pb-4">{answer}</p>
            </div>
        </div>
    );
};

const Faq = ({ faqs }) =>  {
    return (
        <div className='text-center my-20'>
            <img src="/logo.png" alt="" className='h-14 m-auto' />
            <h1 className='text-4xl font-serif text-green-800'>FAQ</h1>
            <p className='text-green-800 mb-20'>Frequently Asked Question</p>
            
            <div className="max-w-3xl mx-auto  px-4 sm:px-6 lg:px-8">
                <div className="divide-y divide-gray-200 text-left ">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Faq;
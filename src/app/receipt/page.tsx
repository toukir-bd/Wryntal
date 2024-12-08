
import React from 'react';

const App = () => (
    <section className="py-16 w-full bg-slate-100">
        <div className="max-w-xl mx-auto w-full relative px-8">
            <div className="bg-white rounded-[15px] px-7 pt-5 pb-6 shadow-md">
                <h1 className="text-[22px] text-slate-700 font-semibold w-full border-b border-[#e9e9e9] mb-5">Confirmation Receipt</h1>
                <h3 className="text-[15px] text-slate-500 font-[400] w-full mb-5">Title of Listing Here</h3>
                <p className='text-[15px] text-slate-900 font-[500] pb-3'>Farhan Ullah</p>
                <p className='text-[13px] text-slate-900 font-[500] pb-3'><span className='text-slate-500'>Address:</span> Farhan Ullah, 3rd Street, Konodas, Gilgit, Pakistan</p>
                <div className='sm:flex block items-center justify-between text-[13px] text-slate-900 font-[500] pb-3'>
                    <p><span className='text-slate-500'>Ref #:</span> 000072</p>
                    <p><span className='text-slate-500'>Date:</span> 7/23/2023</p>
                </div>
                <div className='sm:flex block items-center justify-between text-[14px] text-slate-900 font-[500] pb-5'>
                    <p><span className='text-slate-500'>Date:</span> 7/23/2023</p>
                    <p><span className='text-slate-500'>End Date:</span> 8/23/2023</p>
                </div>
                <div className='border-t border-[#e9e9e9] space-y-3 py-3 text-[13px] font-[500] text-slate-500'>
                    <div className='flex justify-between items-center'>
                        <span>Rent Price</span>
                        <span className='text-[#2a3647]'>$94 ($48 x 2)</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span>Delivery Fee <span className='text-[#FF715B]'>(km)</span></span>
                        <span className='text-[#2a3647]'>$100</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span>Service Fee <span className='text-[#FF715B]'>(3%)</span></span>
                        <span className='text-[#2a3647]'>$100</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span>Tax <span className='text-[#FF715B]'>(13%)</span></span>
                        <span className='text-[#2a3647]'>$29</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span>Subtotal</span>
                        <span className='text-[#2a3647]'>$48</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span>Total Amount</span>
                        <span className='text-[#2a3647]'>$350</span>
                    </div>
                </div>
            </div>
            <p className='mt-5 text-center text-[13px] font-[500] text-slate-600'>If you have any question please contact: logoipsum@company.com</p>
        </div>
    </section>
);

export default App;

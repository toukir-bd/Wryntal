
'use client';
import React from 'react';
import { Tabs } from 'antd';
import RentalBox from "./components/RentalBox";

const generateRentalBoxes = (count: number) => {
    const boxes = [];
    for (let i = 0; i < count; i++) {
        boxes.push(<RentalBox key={i} />);
    }
    return boxes;
};

const App: React.FC = () => {
    return (
        <section className="md:py-16 py-[24px] w-full bg-slate-100">
            <div className="max-w-7xl mx-auto w-full relative md:px-8 px-[24px]">
                <h1 className='text-[25px] text-slate-600 font-[700] mb-3'>My Rentals</h1>
                <Tabs
                    defaultActiveKey="1"
                    items={[
                        {
                            label: 
                                <div className='tabButton'>
                                    Pending Pickup
                                    <span>4</span>
                                </div>
                            ,
                            key: '1',
                            children: 
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 auto-cols-min">
                                    {generateRentalBoxes(4)}
                                </div>
                            ,
                        },
                        {
                            label: 
                                <div className='tabButton'>
                                    Pending Delivery
                                    <span>2</span>
                                </div>
                            ,
                            key: '2',
                            children: 
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 auto-cols-min">
                                    {generateRentalBoxes(2)}
                                </div>
                            ,
                        },
                        {
                            label:
                                <div className='tabButton'>
                                    Active
                                    <span>3</span>
                                </div>
                            ,
                            key: '3',
                            children: 
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 auto-cols-min">
                                    {generateRentalBoxes(3)}
                                </div>
                            ,
                        },
                        {
                            label:
                                <div className='tabButton'>
                                    Awaiting Return
                                    <span>1</span>
                                </div>
                            ,
                            key: '4',
                            children: 
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 auto-cols-min">
                                    {generateRentalBoxes(1)}
                                </div>
                            ,
                        },
                    ]}
                />
            </div>
        </section>
    )
};


export default App;



                                                                                             

                                                                  


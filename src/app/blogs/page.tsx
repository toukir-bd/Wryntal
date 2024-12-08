
'use client';
import React from 'react';
import Image from "next/image";
import Items from "../../assets/auth.jpg";
import { Icon } from '@iconify/react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import { Input } from 'antd';
import { Button } from 'antd';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const App: React.FC = () => (
    <section className="py-16 w-full bg-slate-100">
        <div className="max-w-7xl mx-auto w-full relative px-8">
            <div className="grid grid-cols-2 auto-cols-min space-x-5">
                <div className="bg-white rounded-[15px] px-7 pt-5 pb-8 shadow-md">
                </div>
                <div className="bg-white rounded-[15px] px-7 pt-5 pb-8 shadow-md">
                </div>
            </div>
        </div>
    </section>
);

export default App;

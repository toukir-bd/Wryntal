
'use client';
import React from 'react';
import Image from "next/image";
import Items from "../../../assets/auth.jpg";
import { DownOutlined, InfoOutlined, TagOutlined, UserOutlined, MessageOutlined, DownloadOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Space, Button } from 'antd';


const items: MenuProps['items'] = [
    {
        label: 'This is an example for the price details dummy text',
        key: '0',
    }
];


const App: React.FC = () => {
    return (
        <div className="bg-white rounded-[15px] p-4 border-2 border-gray-200">
            <div className="grid sm:grid-cols-8 grid-cols-1 gap-3">
                <div className='sm:col-span-2 col-span-1 relative sm:w-full w-full sm:h-[100px] h-[150px] rounded-lg overflow-hidden sm:mb-0 mb-3'>
                    <Image src={Items} alt="hill" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className='sm:col-span-6 col-span-1 relative'>
                    <h2 className='text-[16px] leading-[20px] font-semibold text-slate-700 w-[75%] mb-1'>ibis ripmo v2 xt trail mountain bike xt trail mountain bike</h2>
                    <span className="text-slate-500 text-[13px] font-[500]">Rented For: 3 Days</span>
                    <div className="flex items-center justify-between mt-1">
                        <span className='flex items-center'>
                            <span className='text-[20px] font-semibold text-slate-700 me-1'>$48</span>
                            <span className='text-[13px] font-[500] text-slate-400'>/per day</span>
                        </span>
                        <Dropdown
                            menu={{ items }}
                            placement="bottomRight"
                            trigger={['click']}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space className='text-[12px] font-[600] text-slate-700 cursor-pointer hover:text-[#0094FF]'>
                                    Price Details
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                    <Space className='absolute top-0 right-0'>
                        <InfoOutlined className='w-[30px] h-[30px] rounded-full border-2 border-[#d3edff] flex items-center justify-center text-[14px] text-slate-900 hover:text-[#0094FF] cursor-pointer bg-slate-100' />
                        <TagOutlined className='w-[30px] h-[30px] rounded-full border-2 border-[#d3edff] flex items-center justify-center text-[14px] text-slate-900 hover:text-[#0094FF] cursor-pointer bg-slate-100' />
                    </Space>
                </div>
            </div>
            <div className="sm:flex items-center justify-between inline-block mt-3">
                <div className='flex items-center space-x-2 sm:mb-0 mb-3'>
                    <Avatar icon={<UserOutlined />} />
                    <span className='text-[13px] font-[600] text-slate-700'>Farhan Ullah</span>
                    <MessageOutlined className='text-[#FF715B]' />
                </div>
                <Button
                    type="primary"
                    shape="round"
                    className='sm:w-auto w-full bg-[#0094FF]/[.10] border-0 text-[#0094FF] text-[12px] font-[600]'
                    icon={<DownloadOutlined />} >
                    Download Receipt
                </Button>
            </div>
        </div>
    )
}

export default App;
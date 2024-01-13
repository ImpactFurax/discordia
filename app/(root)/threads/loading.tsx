import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <div className='w-full flex-center h-screen'>
      <Image src="/assets/icons/loading.png" alt='loading' width={100} height={100} className='animate-spin' />
    </div>
  );
};

export default Loading;
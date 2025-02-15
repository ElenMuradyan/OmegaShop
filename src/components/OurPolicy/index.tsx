import { SwapOutlined, SafetyCertificateOutlined, CustomerServiceOutlined } from '@ant-design/icons';

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <SwapOutlined style={{fontSize: '50px'}}/>
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hastle free exchange policy</p>
      </div>

      <div>
        <SafetyCertificateOutlined style={{fontSize: '50px'}}/>
        <p className='font-semibold'>Return policy</p>
        <p className='text-gray-400'>The product can be returned only at the time of delivery; after that, returns will not be accepted.</p>
      </div>

      <div>
        <CustomerServiceOutlined style={{fontSize: '50px'}}/>
        <p className='font-semibold'>Best customer support</p>
        <p className='text-gray-400'>We provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy;
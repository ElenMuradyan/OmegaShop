import { SwapOutlined, SafetyCertificateOutlined, CustomerServiceOutlined } from '@ant-design/icons';

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <SwapOutlined style={{fontSize: '50px'}} />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer a hassle-free exchange policy</p>
      </div>

      <div>
        <SafetyCertificateOutlined style={{fontSize: '50px'}} />
        <p className='font-semibold'>Return Policy</p>
        <p className='text-gray-400'>Orders cannot be returned. For issues, please contact us.</p>
      </div>

      <div>
        <CustomerServiceOutlined style={{fontSize: '50px'}} />
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy;

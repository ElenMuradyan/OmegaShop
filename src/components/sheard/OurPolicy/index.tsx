import { SwapOutlined, SafetyCertificateOutlined, CustomerServiceOutlined } from '@ant-design/icons';

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <SwapOutlined style={{fontSize: '50px'}}/>
        <p className='font-semibold'>Ամենադյուրին փոխանակման քաղաքականություն</p>
        <p className='text-gray-400'>Մենք առաջարկում ենք առանց խոչընդոտների փոխանակման քաղաքականություն</p>
      </div>

      <div>
        <SafetyCertificateOutlined style={{fontSize: '50px'}}/>
        <p className='font-semibold'>Վերադարձման քաղաքականություն</p>
        <p className='text-gray-400'>Պատվերը չի կարող վերադարձվել։ Խնդիրների դեպքում կապնվեք մեզ հետ:</p>
      </div>

      <div>
        <CustomerServiceOutlined style={{fontSize: '50px'}}/>
        <p className='font-semibold'>Լավագույն հաճախորդների աջակցություն</p>
        <p className='text-gray-400'>Մենք տրամադրում ենք 24/7 հաճախորդների աջակցություն</p>
      </div>
    </div>
  )
}

export default OurPolicy;
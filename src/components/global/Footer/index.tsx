import { Link } from 'react-router-dom';
import logo from '../../../utilis/Images/logo.png';
import { ROUTE_NAMES } from '../../../utilis/constants/constants';

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={logo} className='mb-5 w-32' alt='' />
          <p className='w-full md:w-2/3 text-gray-600'>
            Բարի գալուստ <b>OMEGA</b>՝ ձեր ունիվերսալ առցանց խանութը։ Մեզ մոտ կարող եք գտնել ամեն ինչ՝ հագուստից մինչև հիգիենայի միջոցներ։ Մենք առաջարկում ենք բարձրորակ ապրանքներ, արագ առաքում և հարմարավետ գնումների փորձ։ Գնեք հիմա և լրացրեք ձեր տան անհրաժեշտությունները։
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>Ընկերություն</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <Link to={ROUTE_NAMES.HOME}><li>Գլխավոր</li></Link>
            <Link to={ROUTE_NAMES.ABOUT}><li>Մեր մասին</li></Link>
            <Link to={ROUTE_NAMES.HELP}><li>Օգնություն</li></Link>
            <Link to={ROUTE_NAMES.SHARE}><li>Կիսվել</li></Link>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>ԿԱՊՆՎԵՔ ՄԵԶ ՀԵՏ</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+374-91-299-096</li>
            <li>muradyanelen506@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>© 2025 omega.com - Բոլոր իրավունքները պաշտպանված են։</p>
      </div>
    </div>
  )
}

export default Footer;

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
            Welcome to <b>OMEGA</b>, your all-in-one online store. Here you can find everything from clothing to hygiene products. We offer high-quality products, fast delivery, and a convenient shopping experience. Shop now and complete your home essentials.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>Company</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <Link to={ROUTE_NAMES.HOME}><li>Home</li></Link>
            <Link to={ROUTE_NAMES.ABOUT}><li>About Us</li></Link>
            <Link to={ROUTE_NAMES.HELP}><li>Help</li></Link>
            <Link to={ROUTE_NAMES.SHARE}><li>Share</li></Link>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>Contact Us</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+374-91-299-096</li>
            <li>muradyanelen506@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>© 2025 omega.com - All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer;

import { ROUTE_NAMES } from '../../../utilis/constants/constants';
import logotext from '../../../utilis/Images/logotext.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserOutlined, ShoppingOutlined, RightOutlined, MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { NavbarItems } from '../../../typescript/types/NavbarItems';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state-management/redux/store';
import ProfileDropDown from '../../sheard/DropDown';

const Navbar = () => {
  const { isAuth } = useSelector((store: RootState) => store.userData.authUserInfo);
  const { userOrders } = useSelector((store: RootState) => store.userData.authUserInfo);
  const [ menuOpen, setMenuOpen ] = useState(false);
  const navigate = useNavigate();
  const gotOrders = userOrders.filter(item => item.status === 'sentOrders' && item.returnedItemsDetails === null);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
        <img src={logotext} className='w-40' alt=''></img>

        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            {
                NavbarItems.map((value) => {                    
                    return (<NavLink key={value.label} className='flex flex-col items-center gap-1' to={value.path}>
                            <p>{value.label}</p>
                            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                        </NavLink> )
                    }
                )
            }
        </ul>

        <div className='flex items-center gap-6'>
            <ShoppingCartOutlined onClick={() => navigate(ROUTE_NAMES.CARD)}/>
            <div className='group relative'>
                {
                    isAuth ? <ProfileDropDown /> : <UserOutlined onClick={() => navigate(ROUTE_NAMES.LOGIN)}/>
                }
            </div>
            <Link to={ROUTE_NAMES.ORDERS} className='relative'>
            <ShoppingOutlined />
            {
                gotOrders.length > 0 && <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{gotOrders.length}</p>
            }
            </Link>

            <MenuOutlined onClick={() => setMenuOpen(true)} className='cursor-pointer sm:hidden'/> 
        </div>

{/* Small Screenes */}

        <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ease-in-out shadow-lg ${menuOpen ? 'w-full' : 'w-0'} flex flex-col`}>
            <div onClick={() => setMenuOpen(false)} className='flex items-center gap-2 px-4 py-3 text-gray-600 cursor-pointer hover:bg-gray-100'>
                <RightOutlined className='text-xl'/>
            </div>
            {
                NavbarItems.map((value) => {                    
                    return (<NavLink key={value.label} className='py-3 px-6 border-b text-gray-700 hover:bg-gray-50' to={value.path} onClick={() => setMenuOpen(false)}>
                            {value.label}
                        </NavLink> )
                    }
                )
            }
        </div>
    </div>
  )
}

export default Navbar;

import { BackwardOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTE_NAMES } from '../../../utilis/constants/constants';

const { Title, Text } = Typography;

const TermsAndConditions = () => {
    const navigate = localStorage.getItem('navigateAddress');
    const navigateTo = navigate || ROUTE_NAMES.REGISTER;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <Link to={navigateTo}>
        <Button><BackwardOutlined /></Button>
      </Link>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <Title level={3}>Terms and Conditions</Title>
        <Text>
          Welcome to our platform. By accessing and using this website, you agree to the following terms and conditions.
        </Text>
        <div className="mt-4 text-left">
          <Text strong>Terms from OMEGA SHOP:</Text>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>By using this site, you agree to these service terms. If you do not agree, please refrain from using the site.</li>
            <li>Users are responsible for ensuring their use of the site complies with applicable laws and regulations.</li>
            <li>All content on this site, including text, graphics, logos, and images, belongs to OMEGA SHOP or partners and is protected by copyright laws.</li>
            <li>OMEGA SHOP shall not be held liable for any damages resulting from the use of this site, including indirect or incidental damages.</li>
            <li>OMEGA SHOP reserves the right to modify these terms at any time. Updates will be posted on this page, and continued use signifies acceptance of the changes.</li>
            <li>If you have any questions regarding these terms, please contact us at {import.meta.env.VITE_CONTACT_EMAIL}.</li>
          </ul>
        </div>
        <Text className="mt-4 block text-gray-500">Last updated: March 20, 2025</Text>
      </div>
    </div>
  );
};

export default TermsAndConditions;

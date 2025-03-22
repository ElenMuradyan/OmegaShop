import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTE_NAMES } from '../../../utilis/constants/constants';
import { BackwardOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const BuyerContract = () => {
  return (
    <div className="p-8 min-h-screen">
        <Link to={ROUTE_NAMES.BUYERREGISTER}>
        <Button><BackwardOutlined /></Button>
        </Link>
        
      <div className="text-center mb-8">
        <Title level={2}>PURCHASE AND SERVICE AGREEMENT</Title>
        <Text>Before registering on our website and making purchases, please carefully read the terms below and agree to them.</Text>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <Text>
          <strong>1. Registration and Basic Terms of Use</strong>
          <ul>
            <li>1.1 The user must provide complete and accurate information, including their name, address, email, and phone number.</li>
            <li>1.2 By registering, the user agrees that their account information may be used solely for service provision and communication.</li>
            <li>1.3 The user is responsible for keeping their account password confidential and should not share it with third parties.</li>
          </ul>

          <strong>2. Security and Privacy</strong>
          <ul>
            <li>2.1 All user data and private information are handled in accordance with our privacy policy.</li>
            <li>2.2 We commit to keeping user data secure and will not disclose it without prior user consent.</li>
          </ul>

          <strong>3. Order Processing Terms</strong>
          <ul>
            <li>3.1 Orders will only be validated upon successful payment.</li>
            <li>3.2 Orders are fulfilled under the conditions presented on the website, which may be subject to change.</li>
            <li>3.3 Users must verify order details within the specified time frame.</li>
            <li>3.4 Each product has its own return and exchange policy, which can be found on the product page.</li>
          </ul>

          <strong>4. Pricing and Payment</strong>
          <ul>
            <li>4.1 Users are required to pay the price specified at the time of order using the accepted payment methods.</li>
            <li>4.2 In case of payment errors or technical issues, users should contact our support center immediately.</li>
          </ul>

          <strong>5. Additional Costs</strong>
          <ul>
            <li>5.1 Additional charges or taxes related to the purchase (such as shipping fees) may apply depending on the product's location and order status.</li>
            <li>5.2 Users acknowledge that product prices may change without prior notice.</li>
          </ul>

          <strong>6. Usage Terms</strong>
          <ul>
            <li>6.1 These terms apply to all services and products we provide. By accepting these terms, you confirm your agreement to use our website and services accordingly.</li>
          </ul>

          <strong>7. Payment and Order Review</strong>
          <ul>
            <li>7.1 These are the primary terms under which you agree to engage in transactions with us. You may request changes or review these terms at any time.</li>
          </ul>

          <strong>Disclaimer</strong>
          <ul>
            <li>These terms are subject to change at any time. Please stay informed about any updates.</li>
          </ul>

          <strong>Agreement</strong>
          <ul>
            <li>By agreeing to the stated terms, you confirm your willingness to proceed with registration and make purchases on the website.</li>
          </ul>
        </Text>
      </div>
    </div>
  );
};

export default BuyerContract;

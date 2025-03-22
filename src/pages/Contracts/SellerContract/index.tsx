import { Button, Typography } from 'antd';
import { ROUTE_NAMES } from '../../../utilis/constants/constants';
import { Link } from 'react-router-dom';
import { BackwardOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const SellerContract = () => {
  return (
    <div className="p-8 min-h-screen">
      <Link to={ROUTE_NAMES.SELLERREGISTER}>
        <Button><BackwardOutlined /></Button>
      </Link>

      <div className="text-center mb-8">
        <Title level={2}>SELLERS AND BUYERS CONTRACT</Title>
        <Text>
          Before becoming a seller or buyer on our platform and accepting orders, 
          please carefully review the terms outlined below and agree to them.
        </Text>
      </div>

      <div className="p-6 rounded-lg shadow-md">
        <section>
          <Title level={3}>1. SELLER TERMS</Title>
          <ul>
            <li><strong>Order Processing:</strong> You are required to fulfill all orders 
            on time and as per the buyer's requirements. If you fail to ship the order, 
            we reserve the right to remove your account from the system, and you will 
            lose access to orders.</li>
            <li><strong>Responsibility and Payment Transfer:</strong> If you do not process 
            orders on time, we will not transfer the payment to you. Omega Shop reserves 
            the right to withhold payments. Omega Shop charges a <strong>30%</strong> 
            commission on every sale.</li>
          </ul>
        </section>

        <section>
          <Title level={3}>2. BUYER TERMS</Title>
          <ul>
            <li><strong>Receiving Orders:</strong> The buyer must verify that the received 
            product matches the order description. If the product does not match the 
            provided description or has quality issues, the buyer can request a return 
            or replacement.</li>
            <li><strong>Payment for Purchases:</strong> Buyers must pay the full order amount 
            within the required time frame. If payment is not made, the order will be canceled.</li>
          </ul>
        </section>

        <section>
          <Title level={3}>3. REGISTRATION AND USAGE TERMS</Title>
          <ul>
            <li>3.1 The user must provide complete and accurate details, including name, 
              address, email, and phone number.
            </li>
            <li>3.2 Upon registration, the user agrees that their account data may only 
              be used for service provision and communication.
            </li>
            <li>3.3 Users must keep their account password confidential and not share 
              it with third parties.
            </li>
          </ul>
        </section>

        <section>
          <Title level={3}>4. SECURITY AND PRIVACY</Title>
          <ul>
            <li>4.1 All user data and private information are handled according to our 
              privacy policy.
            </li>
            <li>4.2 We commit to maintaining user data security and will not disclose 
              it without prior consent.
            </li>
          </ul>
        </section>

        <section>
          <Title level={3}>5. ORDER PROCESSING TERMS</Title>
          <ul>
            <li>5.1 Orders are validated only after successful payment.</li>
            <li>5.2 Orders are processed according to the terms stated on the website, 
              which may change from time to time.
            </li>
            <li>5.3 Users must review order details within the given time frame.</li>
            <li>5.4 Each product has its own return and replacement policy, available on 
              the product page.
            </li>
          </ul>
        </section>

        <section>
          <Title level={3}>6. PRICING AND PAYMENT</Title>
          <ul>
            <li>6.1 The user agrees to pay the amount stated at the time of order. Payment 
              must be made through accepted methods.
            </li>
            <li>6.2 In case of payment errors or technical issues, the user must contact 
              customer support immediately.
            </li>
          </ul>
        </section>

        <section>
          <Title level={3}>7. PRODUCT PRICING POLICY</Title>
          <ul>
            <li>7.1 Additional costs such as shipping fees may apply depending on the product's 
              location and order status.
            </li>
            <li>7.2 The user acknowledges that product prices may change without prior notice.</li>
          </ul>
        </section>

        <section>
          <Title level={3}>8. ACCEPTANCE AND AGREEMENT</Title>
          <ul>
            <li>These terms apply to all services and products provided by us. By accepting 
            these terms, you confirm that you agree to use our platform under the stated 
            conditions.</li>
          </ul>
        </section>

        <section>
          <Title level={3}>9. TELCELL TRANSACTIONS</Title>
          <ul>
            <li>9.1 Payments can be processed via <strong>TelCell</strong>, a secure and convenient 
              payment system.
            </li>
            <li>9.2 Users must ensure they enter the correct TelCell payment details to avoid 
              transaction issues.
            </li>
            <li>9.3 In case of failed or delayed TelCell transactions, users should contact 
              TelCell support and notify our customer service.
            </li>
            <li>9.4 Transaction fees may apply when using TelCell, depending on their policy.</li>
            <li>9.5 Refunds for TelCell payments will be processed according to our refund policy, 
              and users may be required to provide proof of payment.
            </li>
          </ul>
        </section>

        <section>
          <strong>Notice:</strong>
          <ul>
            <li>These terms may change at any time. Please stay updated with any modifications.</li>
          </ul>
        </section>

        <section>
          <strong>Agreement:</strong>
          <ul>
            <li>By accepting these terms, you agree to proceed with registration and purchases 
              on our platform.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SellerContract;

import { Button, Typography } from 'antd';
import { links } from '../../utilis/links';

const { Title, Text } = Typography;

const Links = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <Title level={2}>Stay Connected with Us</Title>
        <Text>Follow us on Instagram, Facebook, and Telegram for updates, news, and exclusive offers!</Text>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        

        {links.map((item) => {
            return(
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl p-6 text-center">
          <Title level={4} className="flex items-center justify-center text-xl font-semibold">
            {item.icon}
            {item.title}
          </Title>
          <Text className="text-gray-600">{item.label}</Text>
          <Button
            type="primary"
            className="mt-4 w-full hover:bg-[#c13584] text-white"
            icon={item.buttonIcon}
            onClick={() => {
              window.open(item.link, '_blank');
            }}
          >
            {item.buttonLabel}
          </Button>
        </div>
            )
        })}
      </div>
    </div>
  );
};

export default Links;
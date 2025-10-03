import { Layout, Typography } from 'antd';

const { Header } = Layout;

const HeaderBar: React.FC = () => (
  <Header className="bg-white shadow-md px-6">
    <Typography.Title level={3} className="text-black m-0">
      ☕️ Coffee Machine - Make your own coffee
    </Typography.Title>
  </Header>
);

export default HeaderBar;
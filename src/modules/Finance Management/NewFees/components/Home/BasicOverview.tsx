'use client';

import { Card, Row, Col } from 'antd';
import {
  DollarOutlined,
  UserOutlined,
  ArrowDownOutlined,
  WalletOutlined,
} from '@ant-design/icons';

const cardData = [
  {
    title: 'মোট সংগ্রহ',
    value: '৳২৪,৫৬,৮০০',
    subtitle: 'গত মাসের চেয়ে +১২%',
    icon: <DollarOutlined className="text-green-100 text-4xl" />,
    bg: 'from-green-500 to-emerald-500',
    textColor: 'text-green-100',
    trendIcon: <ArrowDownOutlined className="text-xs mr-1 rotate-180" />,
  },
  {
    title: 'সক্রিয় শিক্ষার্থী',
    value: '১,২৪৭',
    subtitle: 'ফি বকেয়া: ১৫৬ জন',
    icon: <UserOutlined className="text-blue-100 text-4xl" />,
    bg: 'from-blue-500 to-cyan-500',
    textColor: 'text-blue-100',
  },
  {
    title: 'মাসিক খরচ',
    value: '৳৮,৯৪,২০০',
    subtitle: 'গত মাসের চেয়ে -৫%',
    icon: <ArrowDownOutlined className="text-purple-100 text-4xl" />,
    bg: 'from-purple-500 to-violet-500',
    textColor: 'text-purple-100',
    trendIcon: <ArrowDownOutlined className="text-xs mr-1" />,
  },
  {
    title: 'অ্যাকাউন্ট ব্যালেন্স',
    value: '৳৫৬,৭৮,৯০০',
    subtitle: '৩টি অ্যাকাউন্ট জুড়ে',
    icon: <WalletOutlined className="text-orange-100 text-4xl" />,
    bg: 'from-orange-500 to-red-500',
    textColor: 'text-orange-100',
  },
];

const BasicOverview = () => {
  return (
    <Row gutter={[16, 16]} className="mb-8">
      {cardData.map((card, idx) => (
        <Col
          key={idx}
          xs={24}  
          sm={12} 
          md={12}  
          lg={8}   
          xl={6}  
          xxl={6}  
        >
          <Card
            bordered={false}
            className={`bg-gradient-to-r ${card.bg} text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="p-2 ">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${card.textColor} text-sm font-medium`}>{card.title}</p>
                  <p className="text-3xl font-bold">{card.value}</p>
                  <p className={`${card.textColor} text-xs mt-1 flex items-center`}>
                    {card.trendIcon}
                    {card.subtitle}
                  </p>
                </div>
                {card.icon}
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BasicOverview;

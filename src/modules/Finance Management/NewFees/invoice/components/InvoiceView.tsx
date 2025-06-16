import { useGetSingleInvoiceQuery } from "../api/invoiceEndPoints";
import { 
  Card, 
  Typography, 
  Divider, 
  Row, 
  Col, 
  Table, 
  Tag, 
  Space, 
  Descriptions,
  Badge,
  Spin
} from 'antd';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const InvoiceView = ({ record }: { record: string }) => {
  const { data, isLoading } = useGetSingleInvoiceQuery<any>(Number(record));

  if (isLoading) return <Spin size="large" />;
  if (!data) return <Text>Invoice not found</Text>;

  const invoice = data.data;
  const student = invoice?.collect_fee?.admission?.student;
  const institution = student?.user?.role?.institution;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid': return 'success';
      case 'partial': return 'warning';
      case 'unpaid': return 'error';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Particular',
      dataIndex: ['particular', 'name'],
      key: 'particular',
      render: (text: string) => <Text strong>{text?.trim()}</Text>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `৳${amount?.toFixed(2)}`,
    },
    {
      title: 'Paid',
      dataIndex: 'paid_amount',
      key: 'paid_amount',
      render: (paid: number) => `৳${paid?.toFixed(2)}`,
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: any, record: any) => (
        <Tag color={record.due_amount > 0 ? getStatusColor('partial') : getStatusColor('paid')}>
          {record.due_amount > 0 ? 'Partial' : 'Paid'}
        </Tag>
      ),
    },
  ];

  return (
    <Card>
      <Row justify="space-between" align="bottom" gutter={[16, 16]}>
        <Col>
          <Title level={3} style={{ marginBottom: 0 }}>
            {institution?.name}
          </Title>
          <Text type="secondary">{institution?.city}</Text>
        </Col>
        
        <Col>
          <Space direction="vertical" align="end">
            <Title level={4} style={{ marginBottom: 0 }}>INVOICE</Title>
            <Text>#{invoice?.invoice_number}</Text>
            <Text>Issued: {dayjs(invoice?.issue_date)?.format('MMM DD, YYYY')}</Text>
            <Text>Due: {dayjs(invoice?.due_date)?.format('MMM DD, YYYY')}</Text>
            <Badge 
              status={getStatusColor(invoice?.status)} 
              text={
                <Text strong style={{ textTransform: 'capitalize' }}>
                  {invoice?.status}
                </Text>
              } 
            />
          </Space>
        </Col>
      </Row>

      <Divider />

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Descriptions title="Bill To" column={1} bordered size="small">
            <Descriptions.Item label="Name">
              {student?.first_name} {student?.last_name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {student?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Class">
              {student?.current_grade_level?.name}, {student?.current_section?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Roll">
              {invoice?.collect_fee?.admission?.roll}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Descriptions title="Payment Summary" column={1} bordered size="small">
            <Descriptions.Item label="Total Amount">
              <Text strong>৳{invoice?.total_amount?.toFixed(2)}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Total Paid">
              <Text type="success">৳{invoice?.total_paid?.toFixed(2)}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Payment Date">
              {dayjs(invoice?.collect_fee?.payment_date)?.format('MMM DD, YYYY')}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <Divider />

      <Table
        columns={columns}
        dataSource={invoice?.items}
        rowKey="id"
        pagination={false}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={1}>
                <Text strong>TOTAL</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Text strong>৳{invoice?.total_amount?.toFixed(2)}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Text strong type="success">
                  ৳{invoice?.total_paid?.toFixed(2)}
                </Text>
              </Table.Summary.Cell>
             
              
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />

      <Divider />
    </Card>
  );
};

export default InvoiceView;
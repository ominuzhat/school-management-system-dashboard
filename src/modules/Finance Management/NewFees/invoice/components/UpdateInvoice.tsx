import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Form as AntForm,
  Col,
  Row,
  Input,
  DatePicker,
  InputNumber,

  Spin,
  message,
  Button
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Form } from "../../../../../common/CommonAnt";
import {
  useGetSingleInvoiceQuery,
  useUpdateInvoiceMutation,
} from "../api/invoiceEndPoints";

const UpdateInvoice = ({ record }: { record: string }) => {
  const [form] = AntForm.useForm();
  const { data, isLoading: isDataLoading } = useGetSingleInvoiceQuery<any>(Number(record));
  const [update, { isLoading: isUpdating, isSuccess }] = useUpdateInvoiceMutation();
  const [collectFeeName, setCollectFeeName] = useState("");
  const [admissionName, setAdmissionName] = useState("");

  useEffect(() => {
    if (data?.data) {
      const invoiceData = data.data;
      
      // Set display names
      const studentName = `${invoiceData?.collect_fee?.admission?.student?.first_name} ${invoiceData?.collect_fee?.admission?.student?.last_name}`;
      setCollectFeeName(`Fee for ${studentName} (${invoiceData?.collect_fee?.month})`);
      setAdmissionName(`${studentName} - ${invoiceData?.admission?.registration_number}`);

      // Set form values
      form.setFieldsValue({
        collect_fee: {
          id: invoiceData.collect_fee?.id,
          name: collectFeeName
        },
        admission: {
          id: invoiceData.admission?.id,
          name: admissionName
        },
        issue_date: dayjs(invoiceData.issue_date),
        due_date: dayjs(invoiceData.due_date),
        notes: invoiceData.notes,
        items: invoiceData.items?.length
          ? invoiceData.items.map((item: any) => ({
              particular_id: item.particular?.id,
              particular_name: item.particular?.name,
              amount: item.amount,
              paid_amount: item.paid_amount,
            }))
          : [{}],
      });
    }
  }, [data?.data, form, collectFeeName, admissionName]);

  const onFinish = (values: any): void => {
    const formattedValues = {
      collect_fee: data?.data?.collect_fee.id, // Send only ID to backend
      admission: values.admission.id,     // Send only ID to backend
      issue_date: dayjs(values.issue_date).format("YYYY-MM-DD"),
      due_date: dayjs(values.due_date).format("YYYY-MM-DD"),
      notes: values.notes,
      items: values.items.map((item: any) => ({
        particular_id: item.particular_id,
        amount: Number(item.amount),
        paid_amount: Number(item.paid_amount),
      })),
    };

    update({ id: Number(record), data: formattedValues })
      .unwrap()
      .then(() => message.success("Invoice updated successfully"))
      .catch(() => message.error("Failed to update invoice"));
  };

  if (isDataLoading) return <Spin size="large" />;
  if (!data) return <span>Invoice not found</span>;

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isUpdating}
        isSuccess={isSuccess}
        initialValues={{ items: [{}] }}
      >
        <Row gutter={[12, 12]}>
  

          {/* Admission - Display name but send ID */}
          <Col lg={12}>
            <AntForm.Item
              label="Admission"
              name={['admission', 'name']}
              rules={[{ required: true, message: "Admission is required!" }]}
            >
              <Input disabled />
            </AntForm.Item>
            <AntForm.Item name={['admission', 'id']} hidden>
              <InputNumber />
            </AntForm.Item>
          </Col>

          <Col lg={6}>
            <Form.Item
              label="Issue Date"
              name="issue_date"
              rules={[{ required: true, message: "Please select issue date!" }]}
            >
              <DatePicker format="YYYY-MM-DD" className="w-full" />
            </Form.Item>
          </Col>

          <Col lg={6}>
            <Form.Item
              label="Due Date"
              name="due_date"
              rules={[{ required: true, message: "Please select due date!" }]}
            >
              <DatePicker format="YYYY-MM-DD" className="w-full" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Notes"
              name="notes"
              rules={[{ required: true, message: "Please input notes!" }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <AntForm.List name="items">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={12} key={key} align="middle">
                      {/* Particular Name - Read Only */}
                      <Col lg={6}>
                        <AntForm.Item
                          {...restField}
                          name={[name, "particular_name"]}
                          label="Particular Name"
                        >
                          <Input className="w-full" disabled />
                        </AntForm.Item>
                      </Col>

                      {/* Amount */}
                      <Col lg={4}>
                        <AntForm.Item
                          {...restField}
                          name={[name, "amount"]}
                          label="Amount"
                          rules={[
                            { required: true, message: "Amount is required" },
                          ]}
                        >
                          <InputNumber
                            className="w-full"
                            placeholder="Amount"
                          />
                        </AntForm.Item>
                      </Col>

                      {/* Paid Amount */}
                      <Col lg={4}>
                        <AntForm.Item
                          {...restField}
                          name={[name, "paid_amount"]}
                          label="Paid Amount"
                          rules={[
                            { required: true, message: "Paid Amount is required" },
                          ]}
                        >
                          <InputNumber
                            className="w-full"
                            placeholder="Paid Amount"
                          />
                        </AntForm.Item>
                      </Col>

                      {/* Hidden field to send particular_id */}
                      <AntForm.Item
                        {...restField}
                        name={[name, "particular_id"]}
                        hidden
                      >
                        <InputNumber />
                      </AntForm.Item>

                      <Col lg={2}>
                        <Button
                          type="text"
                          danger
                          onClick={() => remove(name)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Form.Item name="add_item_button">
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add Item
                    </Button>
                  </Form.Item>
                </>
              )}
            </AntForm.List>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateInvoice;
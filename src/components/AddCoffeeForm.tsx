
import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Card } from 'antd';
//import type { Ingredients } from '../App';
import type { Recipe } from '../App';

interface AddCoffeeFormProps {
    //function prop qe merr object i cili permba coffee name, coffee,water,milk
  //addCoffee: (values: { name: string; coffee: number; water: number; milk: number }) => void;
   // addCoffee: (values: { name: string } & Ingredients) => void;
   addCoffee: (values: { name: string } & Recipe) => void;
    selectedCoffee: string;
    //recipes: Record<string, Ingredients>;
    recipes: Record<string, Recipe>;

}

const AddCoffeeForm: React.FC<AddCoffeeFormProps> = ({ addCoffee, selectedCoffee, recipes }) => {

  const [form] = Form.useForm();  //form instance prej Antd qe e kontrollon formen

    useEffect(() => {
        form.setFieldsValue({
            name: selectedCoffee,
            ...recipes[selectedCoffee]
        });
    }, [selectedCoffee, recipes, form]);

  const onFinish = (values: any) => {  //value vlera qe e jep useri
    console.log('Adding coffee with values:', values);
    addCoffee(values);  //e thirr funksionin per te shtu new coffee
    form.resetFields();  //i ben reset fushat pasi qe behet add
  };

  return (
    <Card title="Add New Coffee" className="my-6">
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ coffee: 0, water: 0, milk: 0 }} >

        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the coffee name' }]} >
          <Input placeholder="Enter Coffee" disabled={!!recipes[selectedCoffee]}/>
        </Form.Item>

        <Form.Item label="Coffee (g)" name="coffee" rules={[{ required: true, type: 'number', min: 0, message: 'Please enter coffee in grams' }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Water (ml)" name="water" rules={[{ required: true, type: 'number', min: 0, message: 'Please enter water in ml' }]}  >
          <InputNumber min={0} style={{ width: '100%' }}  />
        </Form.Item>

        <Form.Item label="Milk (ml)" name="milk" rules={[{ required: true, type: 'number', min: 0, message: 'Please enter milk in ml' }]}>
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Price ($)" name="price" rules={[{ required: true, type: 'number', min: 0, message: 'Please enter a valid price' }]}>
            <InputNumber min={0} step={0.1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Coffee
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddCoffeeForm;

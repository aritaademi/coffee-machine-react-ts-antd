import {Card,Form,InputNumber,Button} from 'antd';

type RestockFormProps = {
    restock: (vals: any) => void;  //e pranon nje objekt qe i permban ingredient amounts
}

const RestockForm:  React.FC<RestockFormProps> = ({restock}) => (

    <Card title="Restock Ingredients">
        <Form layout='inline' onFinish={restock}>
            <Form.Item name="coffee" label="Coffee (g)">
                <InputNumber min={0} defaultValue={0}/>
            </Form.Item>

            <Form.Item name="water" label="Water (ml)">
                <InputNumber min={0} defaultValue={0}/>
            </Form.Item>

            <Form.Item name="milk" label="Milk (ml)">
                <InputNumber min={0} defaultValue={0}/>
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit'>Restock</Button>
            </Form.Item>
        </Form>
    </Card>
);

export default RestockForm;
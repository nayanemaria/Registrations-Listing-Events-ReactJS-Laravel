import { Col, Row, Typography, Form, Space, Button } from 'antd';
import React, {useState, useEffect} from 'react';
import FieldsForm from '../../Components/FieldsForm';
import { ServiceUser } from '../../Services/serviceUser';
import { ServiceEvents } from '../../Services/serviceEvents';

export default function Home(){
  const { Title, Paragraph } = Typography;
  const [eventsList, setEventsList] = useState([]);
  const [form] = Form.useForm();

    useEffect(() => {
      getEvents();
    }, [!eventsList]);

    return (
      <Row className="row">
        <Col className="gutter-row" sm={6} md={6} lg={12}>
          <Typography>
            <Title className="title">Inscreva-se na WiseTech e conecte-se com grandes empresas e startups!</Title>
          </Typography>
          <Paragraph>
              Inscrições abertas para a WiseTech, evento virtual, 100% gratuito, que conecta talentos de tecnologia com empresas.
              Promovido pela Fundação Estudar, a primeira edição da WiseTech acontecerá neste mês.
          </Paragraph>
        </Col>
  
        <Col className="gutter-row row-form" sm={6} md={6} lg={12}>
        <Form ref={form} form={form} name="validateOnly" layout="vertical" onFinish={onFinish}>
          <FieldsForm form={form} eventsList={eventsList} />
          <Form.Item>
            <Space>
                <Button type="primary" htmlType="submit">
                    Inscrever-se
                </Button>
                <Button htmlType="reset">Apagar tudo</Button>
            </Space>
          </Form.Item>
         </Form>
        </Col>
      </Row>
    );

    function onFinish(values) {
      values.id_evento = parseInt(values.id_evento)
      ServiceUser.save(values)
      form.resetFields();
    }

    function getEvents() {
      ServiceEvents.getAll().then((events) => {
        setEventsList(events);
      });
    }
}
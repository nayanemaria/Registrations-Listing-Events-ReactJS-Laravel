import {Button, Modal, Row, Col, Form } from 'antd';
import { useState } from 'react';
import FieldsForm from './FieldsForm';
import {ServiceUser} from '../Services/serviceUser';

const ModalComponent = ({open, setOpen, userEdit, getData, eventsList}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
 
  const handleOk = () => {
    let values = form.getFieldsValue();
    values.id_evento = parseInt(values.id_evento)
    values.id = userEdit.id
    ServiceUser.uppdate(values)
  };

  const handleCancel = () => {
    setOpen(false);
    getData();
  };

  return (
    <>
      <Modal
        key={userEdit?.id}
        open={open}
        title="Atualizar Inscrição"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Atualizar
          </Button>,
        ]}
      >
       <Row gutter={24}>
        <Col span={24}>
         <Form ref={form} form={form} name="validateOnly" layout="vertical">
            <FieldsForm userEdit={userEdit} form={form} eventsList={eventsList}/>
          </Form>
        </Col>
       </Row>
      </Modal>
    </>
  );

};

export default ModalComponent;
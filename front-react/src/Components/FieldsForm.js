import React, { useEffect } from "react";
import dayjs from "dayjs";
import {Form, Select } from 'antd';
import InputComponent from './InputComponent';

export default function FieldsForm({userEdit, form, eventsList}){
    const { Option } = Select;
    
    useEffect(()=>{
        form.resetFields();
    },[])

    useEffect(()=>{
        if(userEdit?.id){
            form.setFieldsValue(
                {...userEdit}
            )
        }
    }, [userEdit])

    return(
        <>
            <InputComponent
                isRequired={true}
                nomeAtributo={"nome"}
                label={"Nome Completo"}
                placeholder="Nome Completo"
            />
            <InputComponent
                isRequired={true}
                type="email"
                nomeAtributo={"email"}
                label={"Email"}
                placeholder="example@example"
            />
            <InputComponent
                isRequired={true}
                nomeAtributo={"cpf"}
                label={"CPF"}
                maxLength={14}
                placeholder="XXX.XXX.XXX-XX"
                onKeyDown={handleOnKeyDown}
            />
            <Form.Item
            name="id_evento"
            label={(userEdit?.id) ? "Evento escolhido" : "Escolha o evento"}
            hasFeedback
            >
                <Select placeholder="Selecione um evento" disabled={userEdit?.id}>
                    {eventsList?.map((eventList) => (
                        <Option disabled={!eventList.status} value={eventList.id}>
                            {eventList.name} - ({dayjs(eventList.start_date).format("DD/MM/YYYY")} até {dayjs(eventList.end_date).format("DD/MM/YYYY")})
                        </Option>
                    ))}
                </Select>
            </Form.Item>
           
        </>
    );

    function handleOnKeyDown(e) {
        form.setFieldsValue({cpf: e.target.value.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')})
    }
}
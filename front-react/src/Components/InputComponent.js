import React from 'react';
import { Form, Input } from 'antd';

export default function InputComponent({
    nomeAtributo,
    label,
    type,
    maxLength,
    placeholder,
    isRequired,
    value,
    onChange,
    onKeyDown,
    disabled,
}){
 
    return(
        <Form.Item label={label} name={nomeAtributo} rules={[
            {
              required: isRequired,
              message: `Por favor, preencha o campo ${label}`,
            },
          ]}>
            <Input 
                name={nomeAtributo} 
                value={value} 
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                required={isRequired}
                maxLength={maxLength}
                onKeyDown={onKeyDown}
                disabled={disabled}
            />
        </Form.Item>
    );

};
import styled from 'styled-components';
import React from 'react';

const InputComp = (props) => {
    const Input = styled.input`
    padding: 1rem;
    border: 1px solid #999;
    margin-bottom: 1rem;
    font-size: 0.8rem;
    border-radius:5px;
    color:dark-grey;
    `;

    return(<Input/>)
}
export default InputComp;
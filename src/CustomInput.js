import React, { forwardRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Last } from "react-bootstrap/esm/PageItem";
import styled, { Input } from "style-components";

const CustomInput = forwardRef((props, ref) => {
  const { title, idText, currentValue } = props;

  const [value, setValue] = useState(currentValue ? currentValue : "");
  const inputChange = (e) => setValue(e.target.value);

  return (
    <Containe>
      <Label htmlFor={idText}>{title}</Label>
      <Inpu
        type="text"
        id={idText}
        ref={ref}
        onChange={inputChange}
        value={value}
      />
    </Containe>
  );
});
const Containe = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  margin-bottom: 5px;
`;

const Inpu = styled.input`
  height: 28px;
  padding: 5px 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.mint};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  transition: border-color 300ms ease-in-out;
  &:focus {
    border-color: ${({ theme }) => theme.colors.mainColor};
  }
`;

export default CustomInput;

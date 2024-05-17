import React from "react";
import styled from "styled-components";

const InputLabel = ({
  label,
  placeholder,
  name,
  register,
  errors,
  value = 1,
}) => {
  let minLength;

  name !== "email"
    ? (minLength = {
        value: value,
        message: `${name} length must be at least 1 character`,
      })
    : (minLength = {
        pattern: {
          value:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Enter a valid email",
        },
      });
  console.log(errors, "Error");
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name, {
          minLength,
          required: {
            value: true,
            message: `${name} is required`,
          },
        })}
        name={name}
        type="text"
        id={name}
        placeholder={placeholder}
      />
    </Container>
  );
};

export default InputLabel;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 360px;

  label {
    font-size: 16px;
    font-weight: 600;
    color: #041434;
    padding-bottom: 12px;
  }
  input {
    height: 50px;
    border-radius: 6px;
    border: 1px solid #041434;
    outline: none;
    font-size: 16px;
    padding: 0 10px;
    margin-bottom: 13px;
  }
  input::placeholder {
    color: #5a7184;
  }
`;

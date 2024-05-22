import React from "react";
import styled from "styled-components";

const InputLabel = ({
  label,
  placeholder,
  name,
  register,
  errors,
  value = 1,
  watch,
  type = "text",
  textMsg,
}) => {
  let minLength;
  let pattern;
  let validate;
  let text = textMsg || `${name} length must be at least ${value} character`;

  name === "email"
    ? (pattern = {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Enter a valid email",
      })
    : (minLength = {
        value: value,
        message: text,
      });

  let password;
  if (name === "confirmPassword") {
    password = watch("password");
    validate = (value) => {
      if (value !== password) {
        return "password do not match";
      }
    };
  }

  return (
    <Container className={errors[name]?.message}>
      <label htmlFor={name}>{label}</label>

      <input
        {...register(name, {
          minLength,
          required: {
            value: true,
            message: `${name} is required`,
          },
          pattern,
          validate,
        })}
        name={name}
        type={type}
        id={name}
        placeholder={placeholder}
        error={errors[name]?.message}
      />

      <p className="errorMessage">{errors[name]?.message}</p>
    </Container>
  );
};

export default InputLabel;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 360px;

  .errorMessage {
    color: red;
    padding-bottom: 13px;
  }

  label {
    font-size: 16px;
    font-weight: 600;
    color: #041434;
    padding-bottom: 12px;
  }
  input {
    height: 50px;
    border-radius: 6px;
    border: ${(props) =>
      props.className ? "1px solid red" : "1px solid #041434"};
    outline: none;
    font-size: 16px;
    padding: 0 10px;
    /* margin-bottom: 13px; */
    /* (props.error ? "1px solid red" : "1px solid #041434") */
  }
  input::placeholder {
    color: #5a7184;
  }
`;

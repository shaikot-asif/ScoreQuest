import React from "react";
import styled from "styled-components";
import { detectInputType } from "../../../utils/detectInputType";

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
    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>

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
        className={`${
          errors[name]?.message
            ? "border-primary-brightOrange"
            : "border-secondary-slateGray "
        } w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-accentColor-skyBlur `}
      />

      <p className="errorMessage">{errors[name]?.message}</p>
    </div>
  );
};

export default InputLabel;

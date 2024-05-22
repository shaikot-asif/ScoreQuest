import React from "react";
import styled from "styled-components";
import MainLayout from "../../components/MainLayout";
import Button from "../../components/shared/button/Button";
import InputLabel from "../../components/shared/inputandLabel/InputLabel";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/reducers/userReducer";
const RegisterPage = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onchange",
  });

  const handleSubmitData = (data) => {
    console.log(data, "form data");
    dispatch(userActions.setUserInfo(data));
    reset();
  };
  return (
    <MainLayout searchArea={false}>
      <Container>
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit(handleSubmitData)}>
          <InputLabel
            register={register}
            errors={errors}
            name="name"
            label={"Club / Area Name"}
            placeholder={"Enter Name"}
            value={2}
          />
          <InputLabel
            register={register}
            errors={errors}
            name={"email"}
            label={"Email Address"}
            placeholder={"Enter Email"}
            // type="email"
          />
          <InputLabel
            register={register}
            type="tel"
            errors={errors}
            name={"phone"}
            label={"Phone No."}
            placeholder={"Enter Phone"}
            value={11}
          />
          <InputLabel
            register={register}
            errors={errors}
            name={"password"}
            label={"Password"}
            placeholder={"Enter Password"}
            type="password"
            value={6}
            watch={watch}
          />
          <InputLabel
            register={register}
            errors={errors}
            name={"confirmPassword"}
            label={"Confirm Password"}
            placeholder={"Enter Password"}
            type="password"
            value={6}
            watch={watch}
          />

          <Button type={"submit"} btnName={"Register"} />
        </form>
        <p>
          Have you an account? <Link to={"/login"}>Login now</Link>{" "}
        </p>
      </Container>
    </MainLayout>
  );
};

export default RegisterPage;

const Container = styled.div`
  max-width: 360px;
  display: block;
  margin: auto;
  margin-top: 10rem;
  padding-bottom: 70px;

  h2 {
    color: #041434;
    text-align: center;
    padding-bottom: 24px;
  }
  Button {
    margin-top: 27px;
    margin-bottom: 20px;
  }
  p {
    color: #5a7184;
    font-size: 14px;
    font-weight: 400;
  }
  p a {
    text-decoration: none;
    color: #041434;
    font-weight: 900;
  }
`;

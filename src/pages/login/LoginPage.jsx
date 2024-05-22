import React from "react";
import styled from "styled-components";
import MainLayout from "../../components/MainLayout";
import InputLabel from "../../components/shared/inputandLabel/InputLabel";
import { useForm } from "react-hook-form";
import Button from "../../components/shared/button/Button";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      value: "",
      password: "",
    },
    mode: "onchange",
  });

  const handleSubmitData = (data) => {
    console.log(data, "form data");
  };
  return (
    <MainLayout searchArea={false}>
      <Container>
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit(handleSubmitData)}>
          <InputLabel
            register={register}
            errors={errors}
            name={"value"}
            label={"Email Or Phone"}
            placeholder={"Enter Email Or Phone"}
            textMsg=" "
            // type="email"
          />

          <InputLabel
            register={register}
            errors={errors}
            name={"password"}
            label={"Password"}
            placeholder={"Enter Password"}
            type="password"
            value={6}
            textMsg={"Password at least 6 character"}
          />
          <p className="forgetPassword">
            <Link className="forget" to={"/signup"}>
              Forget Password?
            </Link>
          </p>
          <Button type={"submit"} btnName={"Login"} />
        </form>
        <p className="RegisterNow">
          Don't have an account?{" "}
          <Link className="signUp" to={"/signup"}>
            Register now
          </Link>{" "}
        </p>
      </Container>
    </MainLayout>
  );
};

export default LoginPage;

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
  .RegisterNow {
    color: #5a7184;
    font-size: 14px !important;
    font-weight: 400;
  }
  .RegisterNow .signUp {
    text-decoration: none;
    color: #041434;
    font-weight: 900;
  }
  .forget {
    font-size: 14px;
    font-weight: 600;
    color: #041434;
    text-decoration: none;
  }
`;

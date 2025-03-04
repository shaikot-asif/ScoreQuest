import React from "react";
import InputLabel from "../../../../components/shared/inputandLabel/InputLabel";
import { Link } from "react-router-dom";
import MainLayout from "../../../../components/MainLayout";
import SecondaryButton from "../../../../components/shared/button/SecondaryButton";

const LoginCard = ({ handleSubmit, handleSubmitData, register, errors }) => {
  return (
    <MainLayout>
      <div className="flex px-4 sm:px-0 flex-col justify-center items-center mt-28">
        <div className="bg-primary-midNight p-8 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-natural-white">
            Login Your Club
          </h2>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(handleSubmitData)}
          >
            <InputLabel
              register={register}
              errors={errors}
              name={"value"}
              label={"Email Or Phone"}
              placeholder={"Enter Email Or Phone"}
              textMsg="Enter valid Email Or password"

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
            <p className="text-md text-natural-white [&>a]:hover:underline">
              <Link to={"/forgetPassword"}>Forget Password?</Link>
            </p>
            <SecondaryButton
              y={0}
              classes={"w-full"}
              text={"Login"}
              type="submit"
            />
          </form>
          <p className="mt-4 text-sm text-natural-white [&>a]:hover:underline text-center">
            Don't have an account?{" "}
            <Link className="signUp" to={"/signup"}>
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginCard;

import React from "react";
import InputLabel from "../../../../components/shared/inputandLabel/InputLabel";
import MainLayout from "../../../../components/MainLayout";
import SecondaryButton from "../../../../components/shared/button/SecondaryButton";
import { Link } from "react-router-dom";

const RegisterCard = ({
  handleSubmit,
  handleSubmitData,
  register,
  errors,
  watch,
}) => {
  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center mt-28 px-4 sm:px-0">
        <div className="bg-primary-midNight p-8 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-natural-white">
            Register Your Club
          </h2>

          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(handleSubmitData)}
          >
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

            <SecondaryButton
              classes={"w-full"}
              y={0}
              text={"Register"}
              type="submit"
            />
          </form>
          <p className="mt-4 text-sm text-natural-white  text-center">
            Already Have An Account?{" "}
            <Link className="hover:underline" to={"/login"}>
              Login now
            </Link>{" "}
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterCard;

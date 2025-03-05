import InputLabel from "../../../../../components/shared/inputandLabel/InputLabel";
import SecondaryButton from "../../../../../components/shared/button/SecondaryButton";
import Loading from "../../../../../components/shared/Loading/Loading";

const UpdateProfile = ({
  isLoading,
  handleSubmit,
  submitHandler,
  errors,
  register,
  data,
  cngPsw,
  setCngPsw,
  unregister,
  handleBtnClick,
  defaultImage,
  inputRef,
  uploadImageDisplay,
}) => {
  return (
    <div className="flex flex-col justify-center items-center   px-4 sm:px-0">
      <div className="bg-primary-midNight p-8 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] max-w-md w-full relative">
        {/* {isLoading && <Loading />} */}
        <h2 className="text-2xl font-bold text-center mb-6 text-natural-white">
          Update Club
        </h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-col gap-5">
            <InputLabel
              errors={errors}
              register={register}
              name="name"
              label={"Club / Area Name"}
              placeholder={"Enter Name"}
              value={data?.name}
            />
            <InputLabel
              errors={errors}
              register={register}
              type="email"
              name={"email"}
              label={"Email Address"}
              placeholder={"Enter Email"}
            />
            <InputLabel
              errors={errors}
              register={register}
              type="tel"
              name={"phone"}
              label={"Phone No."}
              placeholder={"Enter Phone"}
              value={11}
            />
            {!cngPsw ? (
              <span
                className="text-md text-secondary-goldenPoppy inline hover:underline cursor-pointer"
                onClick={() => setCngPsw(!cngPsw)}
              >
                Change Password
              </span>
            ) : (
              <div className="flex flex-col gap-5">
                <InputLabel
                  errors={errors}
                  register={register}
                  unregister={unregister}
                  valueFalse={true}
                  name={"currentPassword"}
                  label={"Current Password"}
                  placeholder={"Enter Current Password"}
                  type="password"
                />
                <InputLabel
                  errors={errors}
                  register={register}
                  unregister={unregister}
                  valueFalse={true}
                  name={"newPassword"}
                  label={"New Password"}
                  placeholder={"New Password"}
                  type="password"
                />
              </div>
            )}

            <div>
              <span className="block text-white text-sm font-bold mb-2 text-center">
                Upload Profile Photo
              </span>
              <button
                onClick={handleBtnClick}
                type="submit"
                className="block m-auto"
              >
                <img
                  title="Click here to change profile photo"
                  className="rounded-full  h-[70px] w-[70px]"
                  src={defaultImage}
                  alt=""
                />
              </button>
              <input
                type="file"
                id="file"
                ref={inputRef}
                onChange={uploadImageDisplay}
                hidden
              />
            </div>
          </div>
          <SecondaryButton
            text={"Submit"}
            type="submit"
            classes={"w-full mt-5"}
            y={0}
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;

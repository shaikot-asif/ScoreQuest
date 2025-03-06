import SecondaryButton from "../../../../components/shared/button/SecondaryButton";
import InputLabel from "../../../../components/shared/inputandLabel/InputLabel";

const AddAndUpdatePlayer = ({
  handleSubmit,
  submitHandle,
  register,
  errors,
  handleClick,
  AvatarUrl,
  profileUseRef,
  handleChange,
  buttonTitle,
  title,
}) => {
  return (
    <div className="max-w-lg mx-auto px-2 py-6 md:p-6 rounded-lg bg-primary-midNight text-white ">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
        {title}
      </h2>

      <form onSubmit={handleSubmit(submitHandle)} className="space-y-6">
        <div className="flex flex-row gap-2 justify-between">
          <InputLabel
            label="First Name"
            name="firstName"
            placeholder="Enter First Name"
            type="text"
            register={register}
            errors={errors}
            className="w-full "
            inputClass="text-primary-midNight"
          />
          <InputLabel
            label="Last Name"
            name="lastName"
            placeholder="Enter Last Name"
            type="text"
            register={register}
            errors={errors}
            className="w-full"
            inputClass="text-primary-midNight"
          />
        </div>
        <InputLabel
          label="Birthday (optional)"
          name="birthday"
          placeholder="30/01/2001"
          type="date"
          register={register}
          errors={errors}
          className="w-full"
          inputClass="text-primary-midNight"
        />

        <div className="flex space-x-4 mt-4">
          <span className="flex items-center space-x-2">
            <input
              {...register("role")}
              name="role"
              type="radio"
              id="batsman"
              value="Batsman"
              className="text-secondary-goldenPoppy focus:ring-secondary-goldenPoppy"
            />
            <label htmlFor="batsman" className="text-secondary-goldenPoppy">
              Batsman
            </label>
          </span>
          <span className="flex items-center justify-center space-x-2">
            <input
              {...register("role")}
              name="role"
              type="radio"
              id="bowler"
              value="Bowler"
              className="text-secondary-goldenPoppy focus:ring-secondary-goldenPoppy"
            />
            <label htmlFor="bowler" className="text-secondary-goldenPoppy">
              Bowler
            </label>
          </span>
          <span className="flex items-center space-x-2">
            <input
              {...register("role")}
              name="role"
              type="radio"
              id="allRounder"
              value="All-Rounder"
              className="text-secondary-goldenPoppy focus:ring-secondary-goldenPoppy"
            />
            <label htmlFor="allRounder" className="text-secondary-goldenPoppy">
              All-Rounder
            </label>
          </span>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <button
            type="button"
            onClick={handleClick}
            className="focus:outline-none block m-auto"
          >
            <img
              width={50}
              height={50}
              src={AvatarUrl}
              alt="profile"
              className="rounded-full h-12 w-12 border border-secondary-goldenPoppy"
            />
          </button>
          <input
            type="file"
            id="avatar"
            ref={profileUseRef}
            onChange={handleChange}
            accept="image/*"
            hidden
          />
        </div>

        <SecondaryButton
          y={0}
          text={buttonTitle}
          type="submit"
          classes={"w-full"}
        />
      </form>
    </div>
  );
};

export default AddAndUpdatePlayer;

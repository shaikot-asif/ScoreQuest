import PrimaryButton from "../../../components/shared/button/PrimaryButton";
import SecondaryButton from "../../../components/shared/button/SecondaryButton";

const CTA = () => {
  return (
    <div className="container block m-auto mt-[100px] sm:mt-[150px] ">
      <div className="bg-primary-darkNavy mx-5 lg:mx-auto lg:w-[70%] rounded-md px-2 py-4 lg:px-5 lg:py-10 ">
        <h3 className="text-natural-white text-[22px]  md:text-[28px] leading-[38px] md:leading-[48px] mt-8 text-center ">
          Ready to Transform Your Cricket Experience?
        </h3>
        <div className="flex gap-6 flex-col md:flex-row items-center justify-center my-8">
          <PrimaryButton text={"Sign Up For free"} />
          <SecondaryButton text={"Today Match"} />
        </div>
      </div>
    </div>
  );
};

export default CTA;

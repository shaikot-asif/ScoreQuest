import { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import InputLabel from "../../components/shared/inputandLabel/InputLabel";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducer";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup } from "../../service/user.js";
import SecondaryButton from "../../components/shared/button/SecondaryButton.jsx";
import RegisterCard from "./container/components/RegisterCard.jsx";
const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const { mutate } = useMutation({
    mutationFn: ({ name, email, phone, password }) => {
      return signup({ name, email, phone, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("userAccount", JSON.stringify(data));
      toast.success("Account created Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    mutationKey: ["userInfo"],
  });

  useEffect(() => {
    if (userState.userInfo) navigate("/");
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    const { name, email, phone, password } = data;
    mutate({ name, email, phone, password });

    reset();
  };
  return (
    <RegisterCard
      errors={errors}
      handleSubmit={handleSubmit}
      handleSubmitData={handleSubmitData}
      register={register}
      watch={watch}
    />
  );
};

export default RegisterPage;

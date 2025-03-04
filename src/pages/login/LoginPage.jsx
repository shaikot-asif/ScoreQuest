import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { detectInputType } from "../../utils/detectInputType";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../service/user";
import { userActions } from "../../store/reducers/userReducer";
import Loading from "../../components/shared/Loading/Loading";
import LoginCard from "./container/components/LoginCard";
const LoginPage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ valueType, value, password }) => {
      return login({ valueType, value, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("userAccount", JSON.stringify(data));
      toast.success("Account Login Successfully");
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
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      value: "",
      password: "",
    },
    mode: "onchange",
  });

  const handleSubmitData = (data) => {
    const { value, password } = data;
    const valueType = detectInputType(value);
    if (valueType === "invalid") {
      toast.error("please enter valid email or password");
      return;
    }

    mutate({ valueType, value, password });
    // reset();
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <LoginCard
      errors={errors}
      handleSubmit={handleSubmit}
      handleSubmitData={handleSubmitData}
      register={register}
    />
  );
};

export default LoginPage;

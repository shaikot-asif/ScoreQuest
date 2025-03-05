import { useMemo, useState, useRef, useEffect } from "react";

import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { getUser, updateUserProfile } from "../../../service/user";

import toast from "react-hot-toast";
import images from "../../../constants/images";
import stables from "../../../constants/stable";

import UpdateProfile from "./container/components/UpdateProfile";
import Loading from "../../../components/shared/Loading/Loading";

const Profile = () => {
  const [cngPsw, setCngPsw] = useState(false);
  const [defaultImage, setDefaultImage] = useState(images.Profile);
  const [uploadAvatar, setUploadAvatar] = useState();
  const userInfo = useSelector((state) => state.user.userInfo);
  const inputRef = useRef();
  const queryClient = useQueryClient();

  const { data, error, isLoading, isPending } = useQuery({
    queryFn: () => getUser({ userId: userInfo.id, token: userInfo.token }),
    queryKey: ["User"],
  });

  if (error) {
    toast.error(error?.message);
  }

  const { mutate } = useMutation({
    mutationFn: ({ formData, token }) => {
      return updateUserProfile({
        formData: formData,
        token: token,
      });
    },
    mutationKey: ["User"],
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(["User"]);
      toast.success("User update successfully");
    },
    onError: (error) => {
      toast(error);
    },
  });

  useEffect(() => {
    if (data) {
      setDefaultImage(
        data?.avatar
          ? stables.UPLOAD_FOLDER_BASE_URL + data?.avatar
          : images.Profile
      );
    }
  }, [data]);

  const {
    unregister,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      currentPassword: "",
      newPassword: "",
    },
    values: useMemo(() => {
      return {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        currentPassword: "",
        newPassword: "",
      };
    }, [data]),
  });

  const handleBtnClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("userId", userInfo.id);
    formData.append("userAvatar", uploadAvatar);
    formData.append("name", data?.name);
    formData.append("phone", data?.phone);
    formData.append("currentPassword", data?.currentPassword);
    formData.append("newPassword", data?.newPassword);

    mutate({ formData: formData, token: userInfo.token });
  };

  const uploadImageDisplay = async () => {
    const fileUploadImage = inputRef.current.files[0];
    setUploadAvatar(fileUploadImage);
    const cacheImageURL = URL.createObjectURL(fileUploadImage);
    setDefaultImage(cacheImageURL);
  };

  return (
    <div className="self-center block m-auto w-full lg:w-2/3 ">
      {isLoading ? (
        <Loading />
      ) : (
        <UpdateProfile
          cngPsw={cngPsw}
          data={data}
          defaultImage={defaultImage}
          errors={errors}
          handleBtnClick={handleBtnClick}
          handleSubmit={handleSubmit}
          inputRef={inputRef}
          isLoading={isLoading}
          register={register}
          setCngPsw={setCngPsw}
          submitHandler={submitHandler}
          unregister={unregister}
          uploadImageDisplay={uploadImageDisplay}
        />
      )}
    </div>
  );
};

export default Profile;

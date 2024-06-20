import React from "react";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import images from "../../../../constants/images";
import { useState } from "react";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { addPlayer } from "../../../../service/player";
import { useSelector } from "react-redux";
import AddAndManagePlayer from "../components/AddAndManagePlayer";
const AddPlayer = () => {
  const [AvatarUrl, setAvatarUrl] = useState(images.Profile);
  const [uploadProfile, setUploadProfile] = useState();

  const userState = useSelector((state) => state.user);

  const profileUseRef = useRef(null);

  const { mutate } = useMutation({
    mutationFn: ({ formData, token }) => {
      return addPlayer({
        formData,
        token,
      });
    },

    onSuccess: (data) => {
      console.log("mutation Data: ", data);
      reset();
      setAvatarUrl(images.Profile);
      toast.success("Player added successfully");
    },
    onError: (error) => {
      console.log("mutation error", error);
      toast.error(error);
    },
    mutationKey: ["player"],
  });

  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    firstName: "",
    lastName: "",
    birthday: "",
    role: "",
  });

  const handleClick = (event) => {
    event.preventDefault();
    profileUseRef.current.click();
  };

  const handleChange = () => {
    const uploadImage = profileUseRef.current.files[0];

    setUploadProfile(uploadImage);
    const cachedImageUrl = URL.createObjectURL(uploadImage);
    setAvatarUrl(cachedImageUrl);
  };

  const submitHandle = (data) => {
    const { firstName, lastName, birthday, role } = data;
    const formData = new FormData();
    formData.append("profilePicture", uploadProfile);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("birthday", birthday);
    formData.append("role", role);
    formData.append("userId", userState.userInfo._id);

    mutate({
      formData,
      token: userState.userInfo.token,
    });
  };

  return (
    <div>
      <AddAndManagePlayer
        AvatarUrl={AvatarUrl}
        buttonTitle={"Add Plyer"}
        errors={errors}
        handleChange={handleChange}
        handleClick={handleClick}
        handleSubmit={handleSubmit}
        profileUseRef={profileUseRef}
        register={register}
        submitHandle={submitHandle}
        title={"Add"}
      />
    </div>
  );
};

export default AddPlayer;

const Container = styled.div`
  width: 360px;
  display: block;
  margin: auto;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;

  h2 {
    text-align: center;
    padding-bottom: 20px;
  }

  .InputLabel {
    display: flex;
    flex-wrap: wrap;
    row-gap: 13px;
  }

  .radio {
    display: flex;
    flex-direction: row;
    gap: 15px;
    padding-bottom: 26px;
    padding-top: 13px;
  }
  .radio span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .radio input,
  .radio label {
    cursor: pointer;
    accent-color: #041434;
  }

  .photo {
    padding-bottom: 26px;
  }

  .btn {
    display: block;
    margin: auto;
    text-align: center;
    padding: 10px 0;
    width: 130px !important;
    height: 48px !important;
    border-radius: 30px;
    outline: none;
    background: transparent;
    border: 1px solid #041434;
    font-size: 18px;
    color: #041434;
    text-transform: capitalize;
    text-decoration: none;

    cursor: pointer;
  }

  .photo button {
    margin: auto;
    display: block;
    border: none;
    cursor: pointer;
    border-radius: 50px;
  }
  .photo button img {
    border-radius: 50px;
  }
`;

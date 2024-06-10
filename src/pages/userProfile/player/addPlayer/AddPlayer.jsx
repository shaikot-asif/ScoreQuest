import React from "react";
import styled from "styled-components";
import InputLabel from "../../../../components/shared/inputandLabel/InputLabel";
import { useForm } from "react-hook-form";
import images from "../../../../constants/images";
import { useState } from "react";
import { useRef } from "react";
const AddPlayer = () => {
  const [defaultImage, setDefaultImage] = useState(images.Shaikot);

  const profileUseRef = useRef(null);

  const {
    register,
    watch,
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
    const cachedImageUrl = URL.createObjectURL(uploadImage);
    setDefaultImage(cachedImageUrl);
  };

  const submitHandle = (data) => {
    console.log(data);
    console.log(defaultImage);
  };

  return (
    <Container>
      <div>
        <h2>Add Player Details</h2>
        <div>
          <form onSubmit={handleSubmit(submitHandle)}>
            <div className="InputLabel">
              <InputLabel
                className="InputLabel"
                label={"First Name"}
                name="firstName"
                placeholder={"Enter First Name"}
                type="text"
                register={register}
                errors={errors}
              />

              <InputLabel
                className="InputLabel"
                label={"Last Name"}
                name="lastName"
                placeholder={"Enter Last Name"}
                type="text"
                register={register}
                errors={errors}
              />

              <InputLabel
                className="InputLabel"
                label={"Birthday"}
                name="birthday"
                placeholder={"30/01/2001"}
                type="date"
                register={register}
                errors={errors}
              />
            </div>

            <div className="radio">
              <span>
                <input
                  {...register("role")}
                  name="role"
                  type="radio"
                  id="batsman"
                  value={"Batsman"}
                />
                <label htmlFor="batsman">Batsman</label>
              </span>
              <span>
                <input
                  {...register("role")}
                  name="role"
                  type="radio"
                  id="bowler"
                  value={"Bowler"}
                />
                <label htmlFor="bowler">Bowler</label>
              </span>
              <span>
                <input
                  {...register("role")}
                  name="role"
                  type="radio"
                  id="allRounder"
                  value={"All Rounder"}
                />
                <label htmlFor="allRounder">All Rounder</label>
              </span>
            </div>

            <div className="photo">
              <button type="submit" onClick={handleClick}>
                <img width={50} height={50} src={defaultImage} alt="profile" />
              </button>

              <input
                type="file"
                id="avatar"
                ref={profileUseRef}
                onChange={handleChange}
                hidden
              />
            </div>

            <button className="btn" type="submit">
              add player
            </button>
          </form>
        </div>
      </div>
    </Container>
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
  .radio input {
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

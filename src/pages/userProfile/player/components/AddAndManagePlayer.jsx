import React from "react";
import styled from "styled-components";
import InputLabel from "../../../../components/shared/inputandLabel/InputLabel";

const AddAndManagePlayer = ({
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
    <Container>
      <div>
        <h2>{title} Player Details</h2>
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
                  value={"All-Rounder"}
                />
                <label htmlFor="allRounder">All Rounder</label>
              </span>
            </div>

            <div className="photo">
              <button type="submit" onClick={handleClick}>
                <img width={50} height={50} src={AvatarUrl} alt="profile" />
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

            <button className="btn" type="submit">
              {buttonTitle}
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default AddAndManagePlayer;

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

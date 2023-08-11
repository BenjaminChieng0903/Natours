import { useDispatch, useSelector } from "react-redux";
import "./accountDetails.css";
import { selectorCurrentUser } from "../store/user/user.selector";
import AxiosApi from "./../../axiosApi/api";
import { useEffect, useState } from "react";
import {
  updateCurrentUser,
  updateCurrentUserToken,
} from "../store/user/user.action";

const AccountDetails = () => {
  const currentUser = useSelector(selectorCurrentUser);
  const dispatch = useDispatch();
  //   const photoUrl = `/img/users/${currentUser.photo}`;

  const [errMessage, setErrMessage] = useState(null);
  const [name, setName] = useState(undefined);
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const changeSetting = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    const photo = document.getElementById("photo").files[0];
    const cloudImgRepoKey = "6a5875b676ce1ed298be0cc75f969e27";

    console.log(photo);
    // if (newName) updateData.append("name", newName);
    // if (newEmail) updateData.append("email", newEmail);

    //photo updated
    if (photo) {
      // if indeed has update photo, we need to send request to cloud img server which consider photo field as required.
      updateData.append("image", photo);
      updateData.append("key", cloudImgRepoKey);
      //upload image to cloud server
      await AxiosApi.post(`https://api.imgbb.com/1/upload`, updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }).then(
        //change photo value in db
        async (res) => {
          await AxiosApi.patch("/users/account/updateMe", {
            id: currentUser._id,
            photo: res.data.data.image.url,
            name,
          }).then((res) => {
            console.log(res);
            alert("update successfully ");
          });
          //TODO NAME DUPLICATE ERROR
          // change currentUser photo value
          //if name not be updated, then just update photo, otherwise update both
          name
            ? dispatch(updateCurrentUser(res.data.data.image.url, name))
            : dispatch(updateCurrentUser(res.data.data.image.url));
        }
      );
    } else {
      console.log(name);
      //if name is not be updated, its default value is undefined which will not be shown on request body
      //then the back-end will throw error that catch by catch block.
      await AxiosApi.patch(
        "/users/account/updateMe",
        {
          id: currentUser._id,
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      )
        .then((res) => {
          console.log(res);
          alert("update  successfully");
        })
        .catch((err) => setErrMessage(err.response.data.message));
      //update currentUser
      //if name updates, update name in currentUser as well, otherwise do nothing
      name ? dispatch(updateCurrentUser(name)) : setName(undefined);
    }
  };
  useEffect(() => {
    if (errMessage != null) {
      alert(errMessage);
      setErrMessage(null);
    }
  }, [errMessage]);
  //   useEffect(() => {
  //     if (newPhoto != null) {
  //       formData.append("photo", newPhoto);
  //     }
  //   }, [newPhoto]);
  const updatePassword = async (e) => {
    e.preventDefault();
    await AxiosApi.patch(
      "users/account/updateMyPassword",
      {
        currentPassword,
        password: newPassword,
        passwordConfirm: confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        //changeTokenAfterChangePassword

        dispatch(updateCurrentUserToken(res.data.token));
        alert("update Password successfully");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrMessage(err.response.data.message);
      });
  };
  return (
    <>
      <main className="main">
        <div className="user-view">
          <nav className="user-view__menu">
            <ul className="side-nav">
              <li className="side-nav--active">
                <a href="#">
                  <svg>
                    <use href="img/icons.svg#icon-settings"></use>
                  </svg>
                  Settings
                </a>
              </li>
              <li>
                <a href="#">
                  <svg>
                    <use href="img/icons.svg#icon-briefcase"></use>
                  </svg>
                  My bookings
                </a>
              </li>
              <li>
                <a href="#">
                  <svg>
                    <use href="img/icons.svg#icon-star"></use>
                  </svg>
                  My reviews
                </a>
              </li>
              <li>
                <a href="#">
                  <svg>
                    <use href="img/icons.svg#icon-credit-card"></use>
                  </svg>
                  Billing
                </a>
              </li>
            </ul>
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                <li>
                  <a href="#">
                    <svg>
                      <use href="img/icons.svg#icon-map"></use>
                    </svg>
                    Manage tours
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg>
                      <use href="img/icons.svg#icon-users"></use>
                    </svg>
                    Manage users
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg>
                      <use href="img/icons.svg#icon-star"></use>
                    </svg>
                    Manage reviews
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg>
                      <use href="img/icons.svg#icon-briefcase"></use>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="user-view__content">
            <div className="user-view__form-container">
              <h2 className="heading-secondary ma-bt-md">
                Your account settings
              </h2>
              <form className="form form-user-data">
                <div className="form__group">
                  <label className="form__label" for="name">
                    Name
                  </label>
                  <input
                    className="form__input"
                    id="name"
                    type="text"
                    placeholder={currentUser.name}
                    required="required"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}

                    // onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div className="form__group ma-bt-md">
                  <label className="form__label" for="email">
                    Email address
                  </label>
                  <input
                    className="form__input"
                    id="email"
                    type="email"
                    value={currentUser.email}
                    required="required"
                    disabled
                    // onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
                <div className="form__group form__photo-upload">
                  <img
                    className="form__user-photo"
                    src={currentUser.photo}
                    alt="User photo"
                  />
                  {/* <a className="btn-text">Choose new photo</a> */}
                  {/* <form
                    action="http://localhost:8001/api/v1/users/account/upload"
                    method="post"
                    enctype="multipart/form-data"
                  > */}
                  <input
                    className="form__upload"
                    type="file"
                    name="photo"
                    id="photo"
                    accept="image/jpg, image/png, image/img"
                  ></input>
                  <label for="photo">Choose New Photo</label>
                  {/* <input type="submit"></input>
                  </form> */}
                </div>
                <div className="form__group right">
                  <button
                    className="btn btn--small btn--green"
                    onClick={changeSetting}
                  >
                    Save settings
                  </button>
                </div>
              </form>
            </div>
            <div className="line">&nbsp;</div>
            <div className="user-view__form-container">
              <h2 className="heading-secondary ma-bt-md">Password change</h2>
              <form className="form form-user-settings">
                <div className="form__group">
                  <label className="form__label" for="password-current">
                    Current password
                  </label>
                  <input
                    className="form__input"
                    id="password-current"
                    type="password"
                    placeholder="••••••••"
                    required="required"
                    minlength="8"
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="form__group">
                  <label className="form__label" for="password">
                    New password
                  </label>
                  <input
                    className="form__input"
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required="required"
                    minlength="8"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="form__group ma-bt-lg">
                  <label className="form__label" for="password-confirm">
                    Confirm password
                  </label>
                  <input
                    className="form__input"
                    id="password-confirm"
                    type="password"
                    placeholder="••••••••"
                    required="required"
                    minlength="8"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="form__group right">
                  <button
                    className="btn btn--small btn--green"
                    onClick={updatePassword}
                  >
                    Save password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AccountDetails;

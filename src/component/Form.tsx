import { useEffect, useState } from "react";
import "../form.css";
import { useTypedDispatch, useTypedSelector } from "../store";
import { setUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [data, setData] = useState({
    address: "",
    lastName: "",
    firstName: "",
  });
  const { user } = useTypedSelector((state: any) => state.authReducer.user);
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user && Object.keys(user).length) {
      navigate("/home");
    }
    //eslint-disable-next-line
  }, [user]);

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!data.firstName || !data.lastName) {
      setSuccess(false);
      setErrors({
        firstName: !data.firstName && true,
        lastName: !data.lastName && true,
      });
      return;
    }
    if (data.firstName) setErrors({ ...errors, firstName: false });
    if (data.firstName) setErrors({ ...errors, lastName: false });
    if (data.firstName && data.lastName) {
      const user = {
        address: data.address ?? "",
        lastName: data.firstName,
        firstName: data.lastName,
      };
      dispatch(setUser({ user }));
      navigate("/home");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        {success ? (
          <div className="success">Thanks for submitting the form</div>
        ) : (
          <>
            <div className="errors">
              {errors.firstName && <div>you need to enter a first name</div>}
              {errors.lastName && <div>you need to enter a last name</div>}
            </div>
            <form action="#" method="post" onSubmit={handleSubmit}>
              <div className="form">
                <div className={errors.firstName ? "error" : "form-group"}>
                  <label>
                    First Name <span className="asteric">*</span>
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="firstName"
                    value={data.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className={errors.lastName ? "error" : "form-group"}>
                  <label>
                    Last Name <span className="asteric">*</span>
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-submit">
                <button type="submit">Submit</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

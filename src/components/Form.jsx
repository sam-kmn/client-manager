import { useEffect, useState } from "react";
import { useContext } from "react/cjs/react.development";
import { ThemeContext } from "../App";

const Form = (props) => {
  const darkTheme = useContext(ThemeContext);
  const formClasses = `
    bg-${darkTheme ? "dark" : "light"}
    border-${darkTheme ? "dark" : "light"}
  `;
  const inputClasses = `form-control form-control-sm ${
    darkTheme ? "form-control-dark" : ""
  }`;
  const initState = {
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    address: "",
    zipCode: "",
  };
  const [input, setInput] = useState(initState);
  const [client, setClient] = useState(props.client);
  const isClient = () => (Object.keys(client).length ? true : false);
  useEffect(() => setClient(props.client), [props.client]);
  useEffect(
    () => (isClient() ? setInput(client) : setInput(initState)),
    [client]
  );
  const inputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const submit = (event) => {
    event.preventDefault();
    if (!Object.values(input).every((value) => value)) return;
    if (isClient()) {
      props.onEdit(input);
      setClient({});
    } else {
      props.onAdd(input);
      setInput(initState);
    }
  };

  return (
    <form
      className={`p-3 gap-3 d-flex flex-column border rounded shadow ${formClasses}`}
      onSubmit={submit}
    >
      {/* Header */}
      <div className="h2 text-center">
        {/* {`${Object.keys(client).length}`} */}
        {isClient() ? "Edit client" : "Add new client"}
        {/* <IoPersonAdd className="fs-4" /> */}
      </div>

      {/* First name, Last name */}
      <div className="d-flex justify-content-center gap-4">
        <div className="d-flex flex-column">
          <label>First name</label>
          <input
            name="firstName"
            value={input.firstName}
            onChange={inputChange}
            className={inputClasses}
            type="text"
            placeholder="John"
          />
        </div>

        <div className="d-flex flex-column">
          <label>Last name</label>
          <input
            name="lastName"
            value={input.lastName}
            onChange={inputChange}
            className={inputClasses}
            type="text"
            placeholder="Smith"
          />
        </div>
      </div>

      {/* Country, City */}
      <div className="d-flex justify-content-center gap-4">
        <div className="d-flex flex-column">
          <label>Country</label>
          <input
            name="country"
            value={input.country}
            onChange={inputChange}
            className={inputClasses}
            type="text"
            placeholder="Poland"
          />
        </div>

        <div className="d-flex flex-column">
          <label>City</label>
          <input
            name="city"
            value={input.city}
            onChange={inputChange}
            className={inputClasses}
            type="text"
            placeholder="Warasaw"
          />
        </div>
      </div>

      {/* Adress, Zip code */}
      <div className="d-flex justify-content-center gap-4">
        <div className="d-flex flex-column">
          <label>Adress</label>
          <input
            name="address"
            value={input.address}
            onChange={inputChange}
            className={inputClasses}
            type="text"
            placeholder="Piwna"
          />
        </div>

        <div className="d-flex flex-column">
          <label>Zip code</label>
          <input
            name="zipCode"
            value={input.zipCode}
            onChange={inputChange}
            className={inputClasses}
            type="text"
            placeholder="12-345"
          />
        </div>
      </div>

      {/* Submit (and Cancel) */}
      <div className="d-flex justify-content-center my-3 gap-3">
        {isClient() ? (
          <button
            className="btn btn-outline-danger rounded-pill px-4"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        ) : (
          ""
        )}
        <button
          className="btn btn-outline-primary rounded-pill px-4"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;

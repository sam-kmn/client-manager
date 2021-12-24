import { useContext } from "react";
import { ThemeContext } from "../App";
import { FiEdit } from "react-icons/fi";
import { MdRemoveCircleOutline } from "react-icons/md";

const Table = ({ data, onDelete, onEdit }) => {
  const darkTheme = useContext(ThemeContext);

  return (
    <div
      className={`table-responsive rounded shadow mb-2 bg-${
        darkTheme ? "dark" : "light"
      } `}
    >
      <table className={`table m-0 table-${darkTheme ? "dark" : "light"} `}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Country</th>
            <th scope="col">City</th>
            <th scope="col">Address</th>
            <th scope="col">Zip code</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((client) => (
            <tr key={client.id}>
              <th scope="row">{client.id}</th>
              <td>{client.firstName}</td>
              <td>{client.lastName}</td>
              <td>{client.country}</td>
              <td>{client.city}</td>
              <td>{client.address}</td>
              <td>{client.zipCode}</td>
              <td>
                <FiEdit
                  className="text-primary me-2"
                  onClick={() => onEdit(client)}
                />
                <MdRemoveCircleOutline
                  className="text-danger"
                  onClick={() => onDelete(client.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

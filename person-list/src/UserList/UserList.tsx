import React, { FC } from "react";
import "./UserList.css";
import {
  Persona,
  PersonaSize,
  PersonaPresence
} from "office-ui-fabric-react/lib/Persona";
import {User} from '../interfaces/User'

type UserListProps = {
  users: User[];
};

const UserList: FC<UserListProps> = props => {
  return (
    <table>
      <tbody>
        {props.users.map((user, id) => {
          return (
            <tr key={user.id}>
              <td className="person">
                <Persona
                  text={user.text}
                  presence={user.presence}
                  size={PersonaSize.regular}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserList;

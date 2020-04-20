import React, { FC } from 'react';
import './UserList.css';
import { Persona, PersonaSize, IPersonaSharedProps } from 'office-ui-fabric-react/lib/Persona';
import { User } from '../interfaces/User';
import { TestImages } from '@uifabric/example-data';

type UserListProps = {
  users: User[];
};

const UserList: FC<UserListProps> = (props) => {
  return (
    <table>
      <tbody>
        {props.users.map((user, id) => {
          return (
            <tr key={user.id}>
              <td className="person">
                <Persona
                  data-testid="person-list-persona"
                  text={user.text}
                  presence={user.presence}
                  size={PersonaSize.size40}
                  imageUrl={user.gender === 'female' ? TestImages.personaFemale : TestImages.personaMale}
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

import { IPersonaPresenceProps } from "office-ui-fabric-react";

export interface User extends IPersonaPresenceProps {
  id: string,
  text: string,
}

export type User = {
  id: string;
  displayName: string;
  presence: availability;
};

export enum availability {
  available = 'available',
  busy = 'budy',
}

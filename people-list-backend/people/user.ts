export type User = {
  id: string;
  displayName: string;
  presence: availability;
  gender?: string;
};

export enum availability {
  available = 'available',
  busy = 'busy',
  away = 'away',
}

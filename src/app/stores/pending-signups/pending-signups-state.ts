

export class PendingSignupsState {
  requests: {
    firstname: string,
    lastName: string,
    email: string,
    id: string,
    pending: boolean,
  }[] = [];
}

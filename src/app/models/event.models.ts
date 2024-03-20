export interface IMessageEvent {}
export interface IAlertEvent {}
export interface IRedemptionEvent {}

export interface IInitializeEvent {
  twitchUsername: string;
  twitchPassword: string;
  twitchChannel: string;
}
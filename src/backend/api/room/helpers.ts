export enum RoomPayloadType {
  CREATE = 'CREATE',
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
}

export interface RoomPayloadBase {
  type: RoomPayloadType;
}

export interface CreatePayload extends RoomPayloadBase {
  username: string;
}

export interface JoinPayload extends RoomPayloadBase {
  username: string;
}

export interface LeavePayload extends RoomPayloadBase {
  username: string;
}

export type RoomPayload = CreatePayload | JoinPayload | LeavePayload;

export const createCreatePayload = (username: string) => ({
  type: RoomPayloadType.CREATE,
  username,
});

export const createJoinPayload = (username: string) => ({
  type: RoomPayloadType.JOIN,
  username,
});

export const createLeavePayload = (username: string) => ({
  type: RoomPayloadType.LEAVE,
  username,
});

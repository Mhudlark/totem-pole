import type { NextApiRequest, NextApiResponse } from 'next';

import { createRoom } from '@/backend/api/room/methods/create';
import { RequestMethod } from '@/sharedUtils/api/request';
import type { RoomPayload } from '@/sharedUtils/api/request/room';

export type Handler = (req: NextApiRequest, res: NextApiResponse) => void;

const handler: Handler = async (req, res) => {
  try {
    const method = req.method as RequestMethod;
    const bodyObj = JSON.parse(req.body as string) as Object;

    // =============== POST ===============
    if (method === RequestMethod.POST) {
      const roomPayload = bodyObj as RoomPayload;
      const room = await createRoom(roomPayload);

      res.status(201).json({ room });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;

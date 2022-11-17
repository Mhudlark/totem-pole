import type { NextApiRequest, NextApiResponse } from 'next';

import { createRoom } from '@/backend/api/room/methods/create';
import { RequestMethod } from '@/sharedUtils/api/request';
import type { RoomPayload } from '@/sharedUtils/api/request/room';

export type Handler = (req: NextApiRequest, res: NextApiResponse) => void;

const handler: Handler = async (req, res) => {
  try {
    const method = req.method as RequestMethod;

    // =============== POST ===============
    if (method === RequestMethod.POST) {
      const roomPayload = req.body as RoomPayload;
      const room = createRoom(roomPayload);

      res.status(201).json({ room });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;

import type { NextApiRequest, NextApiResponse } from 'next';

import { RequestMethod } from '@/backend/api/helpers';
import type { RoomPayload } from '@/backend/api/room/helpers';
import { createRoom } from '@/backend/api/room/methods/create';

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

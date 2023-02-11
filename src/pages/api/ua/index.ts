import { NextApiRequest, NextApiResponse } from 'next';

import { connUkraineMeta } from '../../../../utils/connection';
import { ResponseFuncs } from '../../../../utils/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  // function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error });

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    // @ts-ignore
    GET: async (req2: NextApiRequest, res2: NextApiResponse) => {
      // @ts-ignore
      const { UkraineMeta } = await connUkraineMeta(); // connect to database
      // @ts-ignore
      const response = await UkraineMeta.find()
        .sort({ tokenId: -1 })
        .select('tokenId name image description')
        .catch(catcher);
      // res2.statusCode= 200;

      res2.status(200).json(response);
      // console.log(res2);
      // res2.send(response);
      // return res2;
    },
  };

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method];
  if (response) {
    response(req, res);
  } else {
    res.status(400).json({ error: 'No Response for This Request' });
  }
};

export default handler;

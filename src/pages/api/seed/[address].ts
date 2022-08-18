import { NextApiRequest, NextApiResponse } from 'next';

import { connection } from '../../../../utils/connection';
import { ResponseFuncs } from '../../../../utils/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  // function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error });

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req2: NextApiRequest, res2: NextApiResponse) => {
      const { address } = req2.query;
      // console.log('request query');
      // console.log(req2.query);
      const { Seed } = await connection(); // connect to database
      if (address) {
        // @ts-ignore
        const response = await Seed.find({ address }).catch(catcher);
        // res2.statusCode= 200;

        res2.json(response);
        // res2.send();
      } else {
        // @ts-ignore
        const response = await Seed.find().catch(catcher);
        res2.json(response);
        // res2.send();
      }
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

import { NextApiRequest, NextApiResponse } from 'next';

import { connection } from '../../../../utils/connection';
import { ResponseFuncs } from '../../../../utils/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const params = useParams();
  // const queryParams = new URLSearchParams(window.location.search);
  // const addrParam = queryParams.get('address');
  // console.log(addrParam);
  // capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  // function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error });

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req2: NextApiRequest, res2: NextApiResponse) => {
      console.log(req2);
      const address1 = req.headers.CurrAddress;
      // console.log(addrPa);
      // console.log(address1);
      const { Seed } = await connection(); // connect to database
      if (address1 !== undefined) {
        // @ts-ignore
        res2.json(await Seed.find({ address1 }).catch(catcher));
      } else {
        // @ts-ignore
        res2.json(await Seed.find().catch(catcher));
      }
    },
    // RESPONSE POST REQUESTS
    POST: async (req3: NextApiRequest, res3: NextApiResponse) => {
      const { Seed } = await connection(); // connect to database
      // @ts-ignore
      res3.json(await Seed.create(req3.body).catch(catcher));
    },
  };

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: 'No Response for This Request' });
};

export default handler;

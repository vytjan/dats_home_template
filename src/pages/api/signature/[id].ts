import { NextApiRequest, NextApiResponse } from 'next';

import { connSignatureMeta } from '../../../../utils/connection';
import { ResponseFuncs } from '../../../../utils/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  // function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error });

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req2: NextApiRequest, res2: NextApiResponse) => {
      const { id } = req2.query;
      // console.log('request query');
      // console.log(req2.query);
      const { SignatureMeta } = await connSignatureMeta(); // connect to database
      if (id) {
        // @ts-ignore
        const response = await SignatureMeta.find({ tokenId: id }).catch(
          catcher
        );
        // res2.statusCode= 200;

        res2.json(response);
        console.log(res2);
        // res2.send();
        return res2;
      }
      return null;
    },
    // RESPONSE POST REQUESTS
    POST: async (req3: NextApiRequest, res3: NextApiResponse) => {
      // @ts-ignore
      const { SignatureMeta } = await connSignatureMeta(); // connect to database
      // @ts-ignore
      // Data.create(dataObject, (err, data) => {
      //   if (err) {
      //   console.error(err);
      //   } else {
      //   console.log('Data saved successfully:', data);
      //   }
      //   });
      console.log(req3.body);
      // @ts-ignore
      res3.json(await SignatureMeta.create(req3.body).catch(catcher));
      res3.end();
      console.log(res3);
      return res3;
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

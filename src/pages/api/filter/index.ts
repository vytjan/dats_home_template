import { NextApiRequest, NextApiResponse } from 'next';

import { connectionMeta, connectionScore } from '../../../../utils/connection';
import { ResponseFuncs } from '../../../../utils/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  // function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error });

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req2: NextApiRequest, res2: NextApiResponse) => {
      const { filterName, search, distinct, sort, limit } = req2.query;
      if (filterName && search) {
        const { Meta } = await connectionMeta(); // connect to database
        // console.log(search.split(',').length);
        // let newSearch = [];
        if (Array.isArray(search) && search.length > 0) {
          // console.log(search);
          const queryArr = [];
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < search.length; i += 1) {
            // search = search[i].split(',');
            queryArr.push({
              'data.attributes.value': { $in: search[i]?.split(',') },
            });
          }
          console.log(search);

          // @ts-ignore
          const response = await Meta.find({ $and: queryArr })
            .sort({ tokenId: -1 })
            .select('tokenId name image description')
            .catch(catcher);
          res2.json(response);
          return res2;
        }
        if (typeof search === 'string') {
          console.log(typeof search);
          // const tmpQuery = [];
          // @ts-ignore
          const response = await Meta.find({
            'data.attributes.value': { $in: search.split(',') },
          })
            .sort({ tokenId: -1 })
            .select('tokenId name image description')
            .catch(catcher);
          res2.json(response);
          return res2;
        }
      }
      if (distinct && filterName) {
        const { Meta } = await connectionMeta(); // connect to database
        const agg = [
          {
            $unwind: {
              path: '$data.attributes',
              includeArrayIndex: 'string',
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $match: {
              'data.attributes.trait_type': filterName,
            },
          },
          {
            $project: {
              'data.attributes.value': 1,
            },
          },
          {
            $group: {
              _id: {
                value: '$data.attributes.value',
              },
            },
          },
        ];
        // get distinct values of the filter type
        // @ts-ignore
        const response = await Meta.aggregate(agg).catch(catcher);
        // console.log(response);
        res2.json(response);
        return res2;
      }
      if (sort && limit) {
        let sortType = -1;
        if (sort === 'asc') {
          sortType = 1;
        }
        const { Score } = await connectionScore(); // connect to database
        // @ts-ignore
        const response = await Score.find()
          .sort({ _id: 1, score: sortType })
          .limit(limit)
          .select('score tokenId')
          .catch(catcher);
        // console.log(response);
        res2.json(response);
        return res2;
      }
      return null;
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

import { S3Client } from '@aws-sdk/client-s3';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { ApiResponse } from '../../../models/ApiResponse';

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}
type ResponseData = ApiResponse<String[], String>;
type ResponseData2 = ApiResponse<Express.Multer.File[]>;

const oneMegabyteInBytes = 1500000;

const s3 = new S3Client({
  credentials: new aws.Credentials({
    accessKeyId: process.env.REACT_APP_ACCESS_ID!,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY!,
  }),
  region: process.env.REACT_APP_REGION!,
});

const upload = multer({
  limits: { fileSize: oneMegabyteInBytes * 2 },
  storage: multerS3({
    // eslint-disable-next-line
    s3: s3,
    acl: 'public-read',
    bucket: 'daturiansuploads',
    // contentType: multerS3.AUTO_CONTENT_TYPE,
    key(_req, _file, cb) {
      // console.log(file);
      cb(null, Date.now().toString()); // use Date.now() for unique file keys
    },
  }),
  // eslint-disable-next-line consistent-return
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

const apiRoute = nextConnect({
  onError(
    error,
    _req: NextConnectApiRequest,
    res: NextApiResponse<ResponseData>
  ) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
    // console.log(res);
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('theFiles'));

apiRoute.post(
  (req: NextConnectApiRequest, res: NextApiResponse<ResponseData2>) => {
    res.status(200).json({ data: req.files });
    // console.log(res);
  }
);

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
export default apiRoute;

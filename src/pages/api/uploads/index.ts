import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { ApiResponse } from '../../../models/ApiResponse';

interface NextConnectApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}
type ResponseData = ApiResponse<String[], String>;

const oneMegabyteInBytes = 1500000;
const outputFolderName = './public/uploads';

const upload = multer({
  limits: { fileSize: oneMegabyteInBytes * 2 },
  storage: multer.diskStorage({
    destination: outputFolderName,
    filename: (_req, file, cb) => cb(null, file.originalname),
  }),
  // eslint-disable-next-line consistent-return
  fileFilter: (_req, file, cb) => {
    // const acceptFile: boolean = ['image/jpeg', 'image/png'].includes(
    //   file.mimetype
    // );

    // cb(null, acceptFile);
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
  },
  onNoMatch(req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('theFiles'));

apiRoute.post(
  (req: NextConnectApiRequest, res: NextApiResponse<ResponseData>) => {
    // const filenames = fs.readdirSync(outputFolderName);
    // const images = filenames.map((name) => name);
    // console.log(req.files);
    const result = req.files.map((a) => a.filename);
    // console.log(result);
    res.status(200).json({ data: result });
  }
);

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
export default apiRoute;

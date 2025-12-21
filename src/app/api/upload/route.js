import { v2 as cloudinary } from 'cloudinary';
import uniqid from "uniqid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();

    if (formData.has('file')) {
      const file = formData.get('file');

      const randomId = uniqid();
      const ext = file.name.split('.').pop();
      const newFilename = randomId + '.' + ext;

      const chunks = [];
      for await (const chunk of file.stream()) {
        chunks.push(chunk);
      }

      const buffer = Buffer.concat(chunks);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            public_id: newFilename,
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(buffer);
      });

      const link = uploadResult.secure_url;

      return Response.json(link);
    }
  } catch (error) {
    console.error(error);
    return Response.json({error: 'An error occurred'}, {status: 500});
  }
}


import ftp from "basic-ftp";
import { Readable } from "stream";
import dotenv from "dotenv";

dotenv.config();

export default async function uploadFileUtil(files, name) {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false,
    });

    const file_urls = [];
    for (const file of files) {
      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null);

      const remotePath = process.env.FTP_REMOTE_PATH;

      const fileName = file.originalname;
      const fixedFileName = fileName.replace(/\s+/g, "-");
      const fullFileName = name + "-" + fixedFileName;

      await client.uploadFrom(stream, `${remotePath}/${fullFileName}`);
      file_urls.push(`${process.env.UPLOAD_URL}/${fullFileName}`);
    }

    return { isSuccess: true, file_urls: file_urls };
  } catch (error) {
    return { isSuccess: false, error: error };
  } finally {
    client.close();
  }
}

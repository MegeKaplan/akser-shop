import uploadFileUtil from "../utils/uploadFileUtil.js";
import { MESSAGES } from "../constants/messages.js";

export const uploadFile = async (req, res) => {
  const response = await uploadFileUtil(req.files);
  if (!response.isSuccess) {
    res
      .status(500)
      .json({ message: MESSAGES.FILE_UPLOAD_ERROR, error: response.error });
  } else {
    const file_urls = response.file_urls;
    res.status(200).json({
      message: MESSAGES.FILE_UPLOAD_SUCCESS,
      response: file_urls,
    });
  }
};
1;

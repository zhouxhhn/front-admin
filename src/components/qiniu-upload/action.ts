import isSuccess from '../../utils/is-success';
import webapi from '../../configs/webapi';

class QiniuAction {
  // params = {
  //   // mime_type=3 才可以传图片加视频, mime_type=1只传图片，=2只传视频
  //   mimeType: 1,
  // }
  getToken = async () => {
    const res: any = await webapi.files.upyunFileUpload;
    if (isSuccess(res)) {
      return res.data.uptoken;
    }

    return false;
  };

  createAttachment = async (file, createAttachmentParams) => {
    if (!createAttachmentParams || !isSuccess(file.response)) {
      return file;
    }
    // const params = {
    //   media_ids: [file.response.data.id],
    //   ...createAttachmentParams,
    // };
    // const res = await webapi.attachment.createAttachment(params);
    const res: any = {};
    if (isSuccess(res)) {
      return {
        ...file,
        attachment: res.data.length && res.data[0],
      };
    }
    // console.log(file);

    return file;
  };
}
export const qiniuAction = new QiniuAction();

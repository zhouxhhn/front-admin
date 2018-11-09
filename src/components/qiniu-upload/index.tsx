import * as React from 'react';
import { QiniuUpload } from '@sipin/siyue-admin-components';
import { UploadFile } from '@sipin/siyue-admin-components/dist/types/components/sortable-upload-list/upload-list';
import { qiniuAction } from './action';

export interface UploadProps {
  onChange?: (value: UploadFile[], file: UploadFile) => void;
  value?: UploadFile[];
  max?: number;
  params?: any;
  createAttachmentParams?: any;
}
export interface UploadState {
  token: string;
}
class Upload extends React.Component<UploadProps, UploadState> {
  state = {
    token: '',
  };
  async componentDidMount() {
    // const { params } = this.props;
    const token = await qiniuAction.getToken();
    if (token) {
      this.setState({
        token,
      });
    }
  }

  onChange = async ({ fileList, file }) => {
    const { onChange, createAttachmentParams } = this.props;
    if (file && file.status === 'done') {
      file = await qiniuAction.createAttachment(file, createAttachmentParams);
      fileList.map(item => {
        if (item.uid === item.uid) {
          item.attachment = file.attachment;
        }
      });
    }
    if (onChange) {
      onChange(fileList, file);
    }
  };
  render() {
    const { value, max = 1 } = this.props;
    const { token } = this.state;
    if (!token) {
      return <div className="u-color-main">Token不存在或已失效</div>;
    }

    return (
      <QiniuUpload
        fileList={value || []}
        onChange={this.onChange}
        token={token}
        max={max}
      />
    );
  }
}

export default Upload;

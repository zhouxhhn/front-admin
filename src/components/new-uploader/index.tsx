/**
 *  Updated at 2018.8.14
 *  --- New Uploader ---
 *  适用于传统上传途径（需配置action和data：token）
 *  支持antd upload所提供的三种list-type
 *
 */

import React, { Component } from 'react';
import { Modal, Upload, Icon, message, Button } from 'antd';
import { UploadProps } from 'antd/lib/upload';
import { isType } from '../../utils/tool-box';

interface UploaderProps extends UploadProps {
  max?: number;
  onChange?: any;
  value?: any;
}

export default class Uploader extends Component<UploaderProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      previewVisible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value: thisValue, listType } = this.props;
    const { value } = nextProps;
    if (value !== thisValue) {
      this.setState({
        fileList:
          value && value.length && isType(value, 'array')
            ? value.map((v, i) =>
                Object.assign(
                  {
                    uid: v.uid || v.id || i,
                    name: v.name || 'file',
                    status: v.status || 'done',
                    url: v.url || v.link || '',
                  },
                  listType !== 'text'
                    ? { thumbUrl: v.thumbUrl || v.url || '' }
                    : {}
                )
              )
            : [],
      });
    }
  }

  handleCancel = () => {
    this.setState({ previewVisible: false });
  };

  handleChange = (info, onChange) => {
    let { fileList } = info;
    const { max, listType } = this.props;
    if (info.file.status === 'done') {
      message.success('上传成功!');
      const image = info.file.response.data.url;
      const secret = info.file.response.data.secret;
      const indicator = '!';
      fileList = info.fileList.map(({ uid, name, status, thumbUrl }) =>
        Object.assign(
          {
            uid,
            name,
            status,
            url: image + indicator + secret,
          },
          listType !== 'text' ? { thumbUrl } : {}
        )
      );
    } else if (info.file.status === 'error') {
      message.error('上传失败，请稍后重试！');
      fileList = info.fileList.filter(file => info.file.uid !== file.uid);
    }

    fileList = fileList.slice(0, max);

    onChange && onChange(fileList);

    this.setState({
      fileList,
    });
  };

  handlePreview = (type, file) =>
    type === 'picture' || type === 'picture-card'
      ? this.setState({
          previewImage: file.url || '',
          previewVisible: true,
        })
      : window.open(file.url);

  handleRemove = (item, fileList, onChange) =>
    onChange(fileList.filter(file => file.uid !== item.uid));

  render() {
    const {
      onChange,
      value,
      name = 'file',
      type = 'select',
      listType = 'text',
      max = 1,
      multiple,
      ...restProps
    }: any = this.props;

    const { fileList, previewVisible, previewImage } = this.state;

    const newProps = {
      ...restProps,
      name,
      listType,
      multiple: max !== 1 && multiple,
      disabled: fileList.length >= max,
      fileList: fileList || [],
      onChange: info => this.handleChange(info, onChange),
      onPreview: file => this.handlePreview(listType, file),
      onRemove: item => this.handleRemove(item, fileList, onChange),
    };

    return (
      <>
        {type === 'drag' ? (
          <Upload.Dragger {...newProps}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或者拖动上传</p>
            <p className="ant-upload-hint">仅支持图片上传</p>
          </Upload.Dragger>
        ) : (
          <Upload {...newProps}>
            {listType !== 'picture-card' ? (
              <Button disabled={newProps.disabled}>
                <Icon type="upload" /> Upload
              </Button>
            ) : !newProps.disabled ? (
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
              </div>
            ) : null}
          </Upload>
        )}

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="preview-img" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

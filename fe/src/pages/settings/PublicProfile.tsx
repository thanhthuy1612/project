import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Select, Upload, message, Image } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../../api/upload';
import { updateUserApi } from '../../api/user';
import { IStatusCode } from '../../interface/IStatusCode';
import { updateNotification } from '../../lib/features/notification';
import { updateUser } from '../../lib/features/userSlice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import ImgCrop from 'antd-img-crop';
import { urlImg } from '../../api/url';
import { useNotification } from '../../utils/useNotification';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type FieldType = {
  username?: string;
  phone?: string;
  gender?: string;
  bio?: string;
  ava?: UploadFile[];
  banner?: UploadFile[];
  prefix?: string;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const optionsGender = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

const optionsPhone = [
  { value: '+84', label: '+84' },
]

const PublicProfile: React.FC = () => {
  const { username, phone, prefix, gender, bio, email, ava, banner } = useAppSelector(state => state.user);
  const { isLoadingPage } = useAppSelector(state => state.reload);

  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState('');
  const [fileListAva, setFileListAva] = React.useState<UploadFile[]>(
    ava ?
      [{
        uid: '-1',
        name: ava,
        status: 'done',
        url: ava,
      }]
      :
      []);
  const [fileListBanner, setFileListBanner] = React.useState<UploadFile[]>(
    banner ?
      [{
        uid: '-1',
        name: banner,
        status: 'done',
        url: banner,
      }]
      :
      []);
  const [isChangeAva, setIsChangeAva] = React.useState<boolean>(false);
  const [isChangeBanner, setIsChangeBanner] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { setNotification } = useNotification();

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const initData = async () => {
      if (ava) {
        setFileListAva([{
          uid: '-1',
          name: ava,
          status: 'done',
          url: ava,
        }])
      }
      if (banner) {
        setFileListBanner([{
          uid: '-1',
          name: banner,
          status: 'done',
          url: banner,
        }])
      }
    }
    initData()
    resetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, ava, banner])

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChangeAva: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileListAva(newFileList);
    setIsChangeAva(true)
  }

  const handleChangeBanner: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileListBanner(newFileList);
    setIsChangeBanner(true)
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return true
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return true
    }
    return false;
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const prefixSelector = (
    <Form.Item<FieldType> name="prefix" noStyle>
      <Select style={{ width: 70 }} options={optionsPhone}>
      </Select>
    </Form.Item>
  );

  const uploadImg = async (urlOld: string | undefined, isChange: boolean, fileList: UploadFile[]) => {
    let url: string | undefined = urlOld
    if (!isChange) {
      return urlOld?.split(urlImg)[1]
    }
    if (fileList.length > 0 && isChange) {
      const res = await uploadFile((fileList[0] as UploadFile).originFileObj as File)
      url = res?.data?.filename
      if (res?.statusCode !== IStatusCode.SUCCESS) {
        dispatch(updateNotification({
          type: 'fail',
          description: 'Update Fail'
        }))
        return 'Error';
      }
    }
    if (fileList.length === 0 && isChange) {
      url = undefined
    }
    return url
  }

  const onFinish = async (values: FieldType) => {
    setIsLoading(true);
    const urlAva = await uploadImg(ava, isChangeAva, fileListAva)
    const urlBanner = await uploadImg(banner, isChangeBanner, fileListBanner)
    if (urlAva === 'Error' || urlBanner === 'Error') {
      return
    }
    const res = await updateUserApi(
      {
        username: values.username,
        email,
        prefix: values.prefix,
        phone: values.phone,
        gender: values.gender,
        bio: values.bio,
        ava: urlAva,
        banner: urlBanner
      }
    )
    const onSuccess = () => {
      dispatch(updateUser(res.data))
      navigate('/')
    }
    setNotification(res, 'Register in successfully', onSuccess)
    setIsLoading(false)
  };

  const resetForm = () => {
    form.resetFields();
    setIsChangeAva(false);
    setIsChangeBanner(false);
  }

  return (
    <Form
      form={form}
      scrollToFirstError
      layout='vertical'
      style={{ maxWidth: 900 }}
      onFinish={onFinish}
      initialValues={{
        'username': username,
        'prefix': prefix ?? '+84',
        'phone': phone,
        'gender': gender,
        'bio': bio,
        'ava': fileListAva,
        'banner': fileListBanner,
      }}
    >
      <Flex className=' justify-between'>
        <Form.Item style={{ width: 500 }}>
          <Form.Item<FieldType>
            name="username"
            label="Username:"
            tooltip="What do you want others to call you?"
            validateStatus="validating"
            hasFeedback={isLoadingPage}
            rules={[
              { required: true, message: 'Please input your username!' },
              () => ({
                validator(_, value) {
                  if (value.replace(/[^a-z0-9]/gi, '') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Special characters are not allowed in this field.'));
                },
              }),
            ]}
          >
            <Input
              disabled={isLoadingPage || isLoading}
              placeholder="Input your username"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="phone"
            label="Phone Number:"
            validateStatus="validating"
            hasFeedback={isLoadingPage}
          >
            <Input
              disabled={isLoadingPage || isLoading}
              maxLength={9}
              placeholder="Input your phone"
              addonBefore={prefixSelector}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="gender"
            label="Gender:"
            validateStatus="validating"
            hasFeedback={isLoadingPage}
          >
            <Select
              disabled={isLoadingPage || isLoading}
              placeholder="Select your gender"
              options={optionsGender}
            />
          </Form.Item>

          <Form.Item
            name="bio"
            label="Bio:"
            validateStatus="validating"
            hasFeedback={isLoadingPage}
          >
            <Input.TextArea
              prefix=''
              disabled={isLoadingPage || isLoading}
              placeholder="Input your bio"
              rows={5}
            />
          </Form.Item>

        </Form.Item>
        <Form.Item>
          <Form.Item<FieldType>
            name="ava"
            label="Avatar:"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <ImgCrop rotationSlider>
              <Upload<FieldType>
                listType='picture-circle'
                onPreview={handlePreview}
                onChange={handleChangeAva}
                beforeUpload={beforeUpload}
                maxCount={1}
                disabled={isLoadingPage || isLoading}
                fileList={fileListAva}
              >
                {fileListAva.length ? null : uploadButton}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item<FieldType>
            name="banner"
            label="Banner:"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <ImgCrop rotationSlider>
              <Upload
                listType="picture-card"
                onPreview={handlePreview}
                onChange={handleChangeBanner}
                beforeUpload={beforeUpload}
                maxCount={1}
                disabled={isLoadingPage || isLoading}
                fileList={fileListBanner}
              >
                {fileListBanner.length ? null : uploadButton}
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Form.Item>
      </Flex>

      <Form.Item>
        <Flex gap="small">
          <Button
            loading={isLoading}
            disabled={isLoadingPage || isLoading}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
          <Button
            danger
            disabled={isLoadingPage || isLoading}
            onClick={resetForm}
          >
            Reset
          </Button>
        </Flex>
      </Form.Item>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </Form>
  )
}

export default PublicProfile
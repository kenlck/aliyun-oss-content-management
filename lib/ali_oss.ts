import OSS from 'ali-oss'
import { ALIYUN_ACCESS_KEY_ID, ALIYUN_ACCESS_KEY_SECRET, ALIYUN_OSS_BUCKET, ALIYUN_OSS_REGION } from './config'

export const ossClient = new OSS({
  region: ALIYUN_OSS_REGION,
  accessKeyId: ALIYUN_ACCESS_KEY_ID,
  accessKeySecret: ALIYUN_ACCESS_KEY_SECRET,
  bucket: ALIYUN_OSS_BUCKET,
})

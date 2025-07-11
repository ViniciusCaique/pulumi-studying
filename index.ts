

import { AwsS3Test } from './src/aws-s3-test'


const bucketTest = new AwsS3Test("bucket-test", {})

export const bucket = bucketTest.bucketId
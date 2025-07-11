

import { AwsS3Test } from './src/aws-s3-test'
import { AwsRDSTest } from './src/aws-rds'


const bucketTest = new AwsS3Test("bucket-test", {})
const rdsTest = new AwsRDSTest("rds-test", {})

export const bucket = bucketTest.bucketId
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.BucketV2("test-s3-bucket", {
  bucket: "test-something-cool",
  forceDestroy: false,
  tags: {
    Name: "test",
    Environment: "dev"
  }
});

const allowExternalAccess = aws.iam.getPolicyDocumentOutput({
  statements: [{
    principals: [{
      type: "AWS",
      identifiers: ["test-identifier"],
    }],
    actions: [
      "s3:GetObject",
    ],
    resources: [
      bucket.arn,
      pulumi.interpolate`${bucket.arn}/*`
    ]
  }]
})

new aws.s3.BucketPolicy("test_policy", {
  bucket: bucket.id,
  policy: allowExternalAccess.apply(allowExternalAccess => allowExternalAccess.json)
})

// Export the name of the bucket
export const bucketName = bucket.id;

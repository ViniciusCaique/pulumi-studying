import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

export class AwsS3Test extends pulumi.ComponentResource {
  public readonly bucketId: pulumi.Output<string>;

  constructor(name: string, _: any, opts?: pulumi.ComponentResourceOptions) {
    super("quickstart:index:s3", name, _, opts);

    // Create an AWS resource (S3 Bucket)
    const bucket = new aws.s3.BucketV2("test-s3-bucket", {
      bucket: "test-something-cool",
      forceDestroy: false,
      tags: {
        Name: "test",
        Environment: "dev"
      }
    }, {
      parent: this
    });

    // const allowExternalAccess = aws.iam.getPolicyDocumentOutput({
    //   statements: [{
    //     principals: [{
    //       type: "AWS",
    //       identifiers: ["test-identifier"],
    //     }],
    //     actions: [
    //       "s3:GetObject",
    //     ],
    //     resources: [
    //       bucket.arn,
    //       pulumi.interpolate`${bucket.arn}/*`
    //     ]
    //   }]
    // }, {
    //   parent: this
    // })

    // const publicPolicies = new aws.s3.BucketPublicAccessBlock("test_disable_block_public_access", {
    //   bucket: bucket.id,
    //   blockPublicAcls: false,
    //   blockPublicPolicy: false,
    //   ignorePublicAcls: false,
    //   restrictPublicBuckets: false
    // }, {
    //   parent: this
    // })

    // const policiesS3 = new aws.s3.BucketPolicy("test_policy", {
    //   bucket: bucket.id,
    //   policy: allowExternalAccess.apply(allowExternalAccess => allowExternalAccess.json)
    // }, {
    //   parent: this
    // })

    this.bucketId = bucket.id

// // Export the name of the bucket
// export const bucketName = bucket.id;
// export const bucketPolicies = policiesS3.id
// export const bucketBlockPublicAccess = publicPolicies.id

  }
}
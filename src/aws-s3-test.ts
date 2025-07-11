import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

export class AwsS3Test extends pulumi.ComponentResource {
  public readonly bucketId: pulumi.Output<string>;

  constructor(name: string, _: any, opts?: pulumi.ComponentResourceOptions) {
    super("quickstart:index:s3", name, _, opts);

    // Create an AWS resource (S3 Bucket)
    const bucket = new aws.s3.BucketV2(`${name}-test-s3-bucket`, {
      bucket: "test-something-cool-1",
      forceDestroy: false,
      tags: {
        Name: "test",
        Environment: "dev"
      }
    }, {
      parent: this,
      aliases: [
        { 
          name: "test-s3-bucket"
        }
      ]
    });

    const allowExternalAccess = aws.iam.getPolicyDocumentOutput({
      statements: [{
        principals: [{
          type: "AWS",
          identifiers: ["*"],
        }],
        actions: [
          "s3:GetObject",
        ],
        resources: [
          bucket.arn,
          pulumi.interpolate`${bucket.arn}/*`
        ]
      }]
    }, {
      parent: bucket
    })

    const publicPolicies = new aws.s3.BucketPublicAccessBlock(`${name}-test-disable-block-public-access`, {
      bucket: bucket.id,
      blockPublicAcls: false,
      blockPublicPolicy: false,
      ignorePublicAcls: false,
      restrictPublicBuckets: false
    }, {
      parent: bucket,
      aliases: [
        { 
          name: "test-s3-test_disable_block_public_access"
        }
      ]
    })

    const policiesS3 = new aws.s3.BucketPolicy(`${name}-test-policy`, {
      bucket: bucket.id,
      policy: allowExternalAccess.apply(allowExternalAccess => allowExternalAccess.json)
    }, {
      parent: bucket
    })

    this.bucketId = bucket.id

// // Export the name of the bucket
// export const bucketName = bucket.id;
// export const bucketPolicies = policiesS3.id
// export const bucketBlockPublicAccess = publicPolicies.id

  }
}
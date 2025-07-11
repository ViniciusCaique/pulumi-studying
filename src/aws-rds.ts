import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

export class AwsRDSTest extends pulumi.ComponentResource {

  constructor(name: string, _: any, opts?: pulumi.ComponentResourceOptions) {
    super("quickstart:index:s3", name, _, opts);

    // const secrets = aws.secretsmanager.getSecret({
    //   name: ""
    // })



    const rds = new aws.rds.Instance(`${name}-test`, {
      allocatedStorage: 10,
      instanceClass: aws.rds.InstanceType.T3_Micro,
      dbName: "mysqlname",
      engine: "mysql",
      engineVersion: "8.0",
      username: "test",
      password: "test",
      parameterGroupName: "default.mysql8.0"
    })
    
  }
}
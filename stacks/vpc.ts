import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

export class VPCStack extends cdk.Stack {
    public readonly vpc: ec2.IVpc;

    constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props);

        this.vpc = ec2.Vpc.fromLookup(this, 'VPC', {
            region: props.env!.region,
            vpcId: 'vpc-0842e13bff413f0f4',
            isDefault: false,
          });
    }
}
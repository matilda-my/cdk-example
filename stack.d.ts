import * as cdk from '@aws-cdk/core';
import * as eks from '@aws-cdk/aws-eks';
import * as ec2 from '@aws-cdk/aws-ec2';
export declare class MatildaClusterStack extends cdk.Stack {
    readonly cluster: eks.Cluster;
    constructor(scope: cdk.Construct, id: string, props: MatildaProps);
}
interface MatildaProps extends cdk.StackProps {
    vpc?: ec2.IVpc;
}
export {};

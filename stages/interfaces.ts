import * as cdk from '@aws-cdk/core';

export default interface StageProps extends cdk.StageProps {
    region: string;
}
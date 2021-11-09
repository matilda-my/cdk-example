#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MatildaClusterStack } from '../../stacks/ecs';


export class Apne1Dev extends cdk.Stage {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
        super(scope, id, props);

        const primaryRegion = { account: '268926652121', region: 'ap-northeast-1' };
        const stackProps: cdk.StackProps = { env: primaryRegion };

        const stack = new MatildaClusterStack(this, 'apne1-dev-stack', stackProps);
    }
}
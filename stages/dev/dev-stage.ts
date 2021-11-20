#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ECSStack } from '../../stacks/ecs';
import Account from '../../aws-config';
import StageProps from '../interfaces';

export class DevStage extends cdk.Stage {
    constructor(scope: cdk.Construct, id: string, props: StageProps) {
        super(scope, id, props);

        const env = { account: Account.valuepotion, region: props.region };

        const stack = new ECSStack(this, 'apne1-dev-stack', {env});
    }
}
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from "@aws-cdk/core";

import { DevStage } from './dev-stage';

const app = new cdk.App();
new DevStage(app, 'dev', {region: 'ap-northeast-1'});
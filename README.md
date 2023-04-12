# Book tracker app api

AWS serverless(lambda, dynamodb) using serverless framework.
Also configured dynamodb and serverless-offline for local development.

- For api docs: [Api docs](docs/README.md)

## Install and run locally

For development, you need to have serverless, npm and/or yarn globally installed.
I also prefer using NVM to manage my Node versions.
Tested in node v14.

Step1: Install serverless framework CLI

```shell
npm install -g serverless
```

Step2: Configure AWS
Setup AWS CLI if you have not already.
you can find useful article here [create and configure AWS credentials](https://levelup.gitconnected.com/configure-aws-for-development-and-deployment-ad822097fc22)

```shell
npm install
```
setp3: copy .env.example to .env
```
cp .env.example .env
```

step4: start local server

```shell
# install dynamodb-local
npm run dynamodb:install
```

If you get the error installing local dynamodb, Please delete package-lock.json and try to install package again.
For detail here is recent bug in [dunamodb local](https://github.com/99x/serverless-dynamodb-local/issues/294#issuecomment-1493389420)

```
# run serverless-offline
npm run start:offline
```

For lint

```
npm run lint
```

Tests: Jest is used for tests
Test setupEnv file is located in tests/lib/setupEnv.ts. You can change env variables as your need.

```
npm run test
```

### Deploy

First, set up your AWS settings and run the following command.

Serverless framework deploy lambda, api gateway, dynamodb and other resources.

```shell
npm run deploy:prod
```

### Further improvement
Due to time limitation and i am new to serverless, following things can be improved:
- use middy.js for request parsing
- set up AWS alarams for function errors
- refactor url endpoints to /books => for post and get all, /books/{id} => for delete and update
- setup CI/CD
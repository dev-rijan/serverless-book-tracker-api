# Book tracker app api

AWS serverless(lambda, dynamodb) using serverless framework.

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
```shell
npm install
```

### local

```shell
# install dynamodb-local
npm run dynamodb:install

# run serverless-offline
npm run start:offline
```

### AWS

First, set up your AWS settings and run the following command.

Serverless framework deploy lambda, api gateway, dynamodb and other resources.

```shell
npm run deploy:prod
```

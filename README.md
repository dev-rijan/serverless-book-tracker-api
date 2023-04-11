# Serverless example with typescript

AWS serverless(lambda, dynamodb) example(to-do list app) using serverless framework.

## Install

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

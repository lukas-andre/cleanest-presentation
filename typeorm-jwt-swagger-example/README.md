<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) + Typeorm + JWT + Swagger simple example

## Steps

```bash
$ yarn install
$ yarn add @nestjs/config
$ yarn add @nestjs/swagger
$ yarn add @nestjs/typeorm typeorm mysql
$ yarn  add @nestjs/jwt
$ yarn add class-validator
$ yarn add bcryptjs
```

## Dev the app

```bash
# development
$ nest g resource users
$ nest g mo auth # nest g module auth
$ nest g co auth # nest g controller auth
$ nest g s auth # nest g service auth
$ nest g mo global
```

## Run 
```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Authors
  - [Lucas Henry](https://www.linkedin.com/in/lucas-henryd/)
  - [Paul Diaz](https://www.linkedin.com/in/paul-diaz-figuera/)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).

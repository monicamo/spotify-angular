# AngularSpotifyClone

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.




## Aula 02 

Inicia com a inclusão da página de Login. Aqui ainda cria-se o módulo num arquivo separado, sendo que as novas versões de Angular podem ser colocados no próprio componente com standalone, mas nessa versão que foi ensinada o recurso não existia.

Após a criação do módulo de Login, foi necessário declará-lo no App.Module.Ts, e com isso a aplicação  mapeia esse módulo e consegue administrá-lo.

Essa estratégia de termos o modulo é que somente será carregado se ouver necessidade para instanciar o componente de login.

Na criação das rotas do angular, a rota principal esta no app.routes.ts, e as subrotas ficam em cada extensão da rota principal. Assim, o app.module tem o AppRotas, no caso somente carregando o LoginModule, e no LoginModule, temos as subrotas do loginmodule, com o LoginRotas.

Finalmente para todas as rotas funcionarem, em app.component.html precisamos colocar a tag de
<router-outlet> e seus imports


## Comando

Site : https://queuesite-2cd6b.web.app/login

# Firebase packeges


npm install firebase @angular/fire

npm install firebase

npm install -g firebase-tools

firebase login

firebase init

# Configurar o projeto Angulat to host firebase

firebase init hosting

# deploy do site 
firebase deploy --only hosting



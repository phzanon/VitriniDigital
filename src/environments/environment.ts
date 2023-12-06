// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'https://localhost:5001/v1/',
    apiLoginUrl: 'https://localhost:7016/api/Authenticate',
    apiEstabelecimentos: 'https://localhost:7016/api/Estabelecimento',
    signUpUrl: 'https://localhost:7016/api/Authenticate',
    apiUsuario: 'https://localhost:7016/api/Usuario',
    apiCupom: 'https://localhost:7016/api/Cupom',
    apiRecuperarSenhaUrl: 'https://localhost:7016/api/Usuario/ResetPassword'
  };

  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

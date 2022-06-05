// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyANlD5ZQtnixc9ZI3RIjMWeoVXYOW3YvGY",
    authDomain: "prestamos-banco.firebaseapp.com",
    databaseURL: "https://prestamos-banco-default-rtdb.firebaseio.com",
    projectId: "prestamos-banco",
    storageBucket: "prestamos-banco.appspot.com",
    messagingSenderId: "863604962719",
    appId: "1:863604962719:web:c43f65221598bf00eaf9aa",
    measurementId: "G-S86CX4J6LE"
  }

  // Initialize Firebase
  //const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

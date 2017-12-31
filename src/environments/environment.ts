// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB2f3fL1oxqjSViQ6NDayCN6OPFLpwbZ1E",
    authDomain: "power-my-ad.firebaseapp.com",
    databaseURL: "https://power-my-ad.firebaseio.com",
    projectId: "power-my-ad",
    storageBucket: "power-my-ad.appspot.com",
    messagingSenderId: "489071760127"
  }
};

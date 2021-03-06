// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	cookieDomain: 'https://admin.englishmonkapp.com/backend/', // -<< must be the domain of deployed app
	apiBaseUrl: 'https://admin.englishmonkapp.com/backend/web/index.php/v1',
	fileUrl: 'https://admin.englishmonkapp.com/backend/web/uploads/users/',
	fileVideoUrl: 'https://admin.englishmonkapp.com/backend/web/uploads/lesson/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

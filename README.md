# WIP

![lqbw](./lqbw刘备.jpg)

## TODO

* A better loading page

* use karma to run unit test

* cp server/logger/default_config to dist

* 右下角的小球 routerlink 动态更新的问题

* Unauthorized Access snackbar and redirect, just delete session to test

* https://github.com/dschnelldavis/angular2-json-schema-form or github.com/makinacorpus/angular2-schema-form

* pm2 startup, move pm2 conf to ./.pm2  https://wohugb.gitbooks.io/pm2/content/features/quick-start.html

### Roadmap

* Use Angular5
* Unit testing
* Login with github, google, facebook, etc.

## notes

nodejs version: v6.11.1

## dev

### start redis (TODO: You can't rely on it)

```
redis-server
```

### run server

```
npm run dev
```

### generate messages.xlf

```
./node_modules/.bin/ng-xi18n  --i18nFormat=xlf  --outFile=./client/locale/messages.xlf
```

### Known issues

* login/logout need refresh manually
* takeUntil not working!!!!!

## License

[AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.en.html)

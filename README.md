## TODO

* A better loading page
* use karma to run unit test

* cp server/logger/default_config to dist

* 右下角的小球 routerlink 动态更新的问题

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

### Konwn issues

* login/logout need refresh manually

## License

[AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.en.html)

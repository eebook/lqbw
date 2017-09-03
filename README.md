## TODO

* A better loading page
* use karma to run unit test

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
import * as Koa from 'koa';
import * as koaBodyParser from 'koa-bodyparser';
import * as koaMorgan from 'koa-morgan';
import * as koaViews from 'koa-views';
import * as koaStatic from 'koa-static';
import * as koaSession from 'koa-session';
import * as koaOnError from 'koa-onerror';
import * as koaQs from 'koa-qs';
import * as CSRF from 'koa-csrf';


import { authentication } from './common/middlewares'
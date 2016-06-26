#!/usr/bin/env python2
# -*- coding: utf-8 -*-

import os

from smtplib import SMTPServerDisconnected

from flask import Flask, render_template
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_mail import Mail, Message
from config import config
from celery import Celery

from .eebook.src.main import EEBook

app = Flask(__name__)

# Celery configuration
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'

bootstrap = Bootstrap()
mail = Mail()
db = SQLAlchemy()


login_manager = LoginManager()
login_manager.session_protection = 'strong'
login_manager.login_view = 'auth.login'


celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)


def create_app(config_name):
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    bootstrap.init_app(app)
    mail.init_app(app)
    login_manager.init_app(app)
    db.init_app(app)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/auth')

    return app


@celery.task
def send_async_email(msg):
    with app.app_context():
        from . import mail
        app.config.from_object(config[os.getenv('EEBOOK_CONFIG') or 'default'])
        config[os.getenv('EEBOOK_CONFIG') or 'default'].init_app(app)

        mail.init_app(app)
        mail.send(msg)


@celery.task(max_retries=2)
def send_async_email_with_book(recipe_kind, url, msg, book_path):
    with app.app_context():
        import sys
        reload(sys)
        # Python早期版本可以直接用sys.setdefaultencoding('utf-8')，新版本需要先reload一下
        sys.setdefaultencoding('utf-8')
        sys.setrecursionlimit(100000)  # 为BS解析知乎上的长答案增加递归深度限制
        
        game = EEBook(recipe_kind=recipe_kind, url=url, debug=False)
        file_name = game.begin()[0]
        ebooks_produced_path = book_path
        file_name += '.epub'

        with app.open_resource(ebooks_produced_path + file_name) as fp:
            msg.attach("book.epub", 'application/epub+zip', fp.read())

        try:
            send_async_email(msg)
        except SMTPServerDisconnected:
            send_async_email(msg)
        except:
            print u"发送失败"
            print u"url:" + str(url)
            print u"user.email:" + str(msg.body)

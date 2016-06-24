#!/usr/bin/env python2
# -*- coding: utf-8 -*-


from flask import render_template, flash, current_app
from flask_login import current_user
from flask_mail import Message
from .forms import UrlForm

from ..eebook.src.tools.match import Match
from ..eebook.src.exception import UnsupportTypeException
from app import send_async_email_with_book


def index():
    form = UrlForm()
    if form.validate_on_submit():
        if current_user.is_authenticated:
            url = form.url.data
            try:
                recipe_kind = Match.get_website_kind(url)
            except UnsupportTypeException:
                flash(u"Oops....不支持的网站类型")
                return render_template('index.html', form=form)
            flash(u"提交成功，稍后将以邮件的方式将电子书发给您，请注意查收")

            to = current_user.email
            subject = u"请查收电子书"
            template = 'auth/email/send_book'

            app = current_app._get_current_object()
            msg = Message(app.config['EEBOOK_MAIL_SUBJECT_PREFIX'] + ' ' + subject,
                          sender=app.config['EEBOOK_MAIL_SENDER'], recipients=[to])
            msg.body = render_template(template + '.txt', user=current_user)
            msg.html = render_template(template + '.html', user=current_user)

            send_async_email_with_book.delay(recipe_kind, url, msg=msg, book_path=app.config['BOOK_PATH'])
        else:
            flash(u"请登录后执行操作")
    return render_template('index.html', form=form)

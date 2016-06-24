#!/usr/bin/env python2
# -*- coding: utf-8 -*-


from app import send_async_email
from flask import render_template, redirect, request, url_for, flash, current_app
from flask_mail import Message
from flask_login import login_user, login_required, current_user, logout_user
from . import auth
from .. import db
from ..models import User
from .forms import LoginForm, RegistrationForm


@auth.before_app_request
def before_request():
    if current_user.is_authenticated \
            and not current_user.confirmed \
            and request.endpoint[:5] != 'auth.' \
            and request.endpoint != 'static':
        return redirect(url_for('auth.unconfirmed'))


def unconfirmed():
    if current_user.is_anonymous or current_user.confirmed:
        return redirect(url_for('main.index'))
    return render_template('auth/unconfirmed.html')


def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user, remember=True)
            return redirect(request.args.get('next') or url_for('main.index'))
        flash(u'用户名、密码 不匹配')

    return render_template('auth/login.html', form=form)


@login_required
def logout():
    logout_user()
    flash(u'您已经退出登录')
    return redirect(url_for('main.index'))


def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(email=form.email.data, username=form.username.data, password=form.password.data)
        db.session.add(user)
        db.session.commit()

        app = current_app._get_current_object()
        token = user.generate_confirmation_token()
        to = user.email
        subject = u"安全确认"
        template = 'auth/email/confirm'

        msg = Message(app.config['EEBOOK_MAIL_SUBJECT_PREFIX'] + ' ' + subject,
                      sender=app.config['EEBOOK_MAIL_SENDER'], recipients=[to])
        msg.body = render_template(template + '.txt', user=current_user, token=token)
        msg.html = render_template(template + '.html', user=current_user, token=token)

        send_async_email.delay(msg)
        flash(u"确认邮件已经发送到您的邮箱中，请查收。")
        return redirect(url_for('auth.login'))
    return render_template('auth/register.html', form=form)


@login_required
def confirm(token):
    if current_user.confirmed:
        return redirect(url_for('main.index'))
    if current_user.confirm(token):
        flash(u'您的账户已经得到安全确认')
    else:
        flash(u'确认链接无效或已经失效')
    return redirect(url_for('main.index'))


@login_required
def resend_confirmation():
    token = current_user.generate_confirmation_token()

    to = current_user.email
    subject = u"确认账户"
    template = 'auth/email/confirm'

    app = current_app._get_current_object()
    msg = Message(app.config['EEBOOK_MAIL_SUBJECT_PREFIX'] + ' ' + subject,
                  sender=app.config['EEBOOK_MAIL_SENDER'], recipients=[to])
    msg.body = render_template(template + '.txt', user=current_user, token=token)
    msg.html = render_template(template + '.html', user=current_user, token=token)

    send_async_email.delay(msg)
    flash(u'新的确认邮件已经发送到您的邮箱中')
    return redirect(url_for('main.index'))


#!/usr/bin/env python2
# -*- coding: utf-8 -*-


from flask import render_template, redirect, request, url_for, flash
from flask_login import login_user, login_required, current_user, logout_user
from . import auth
from .. import db
from ..models import User
from ..email import send_email
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
            login_user(user, form.remember_me.data)
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
        token = user.generate_confirmation_token()
        send_email(user.email, u'安全确认', 'auth/email/confirm', user=user, token=token)
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
    send_email(current_user.email, u'确认账户', 'auth/email/confirm', user=current_user, token=token)
    flash(u'新的确认邮件已经发送到您的邮箱中')
    return redirect(url_for('main.index'))


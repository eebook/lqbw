#!/usr/bin/env python2
# -*- coding: utf-8 -*-


from flask import render_template, redirect, request, url_for, flash
from flask_login import login_user, login_required, current_user
from .. import db
from ..models import User
from .forms import LoginForm, RegistrationForm


def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user, form.remember_me.data)
            return redirect(request.args.get('next') or url_for('main.index'))
        flash(u'用户名、密码 不匹配')

    return render_template('auth/login.html', form=form)


def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(email=form.email.data, username=form.username.data, password=form.password.data)
        db.session.add(user)
        db.session.commit()
        token = user.generate_confirmation_token()
        print u"token:" + str(token)
        flash(u"确认邮件已经发送到您的邮箱中，请查收。")
    return render_template('auth/register.html', form=form)

#!/usr/bin/env python2
# -*- coding: utf-8 -*-

from flask import Blueprint
auth = Blueprint('auth', __name__)

from . import views

auth.add_url_rule('/login/', 'login', views.login, methods=['GET', 'POST'])
auth.add_url_rule('/register/', 'register', views.register, methods=['GET', 'POST'])
auth.add_url_rule('/unconfirmed', 'unconfirmed', views.unconfirmed)
auth.add_url_rule('/logout', 'logout', views.logout)
auth.add_url_rule('/confirm/<token>', 'confirmtoken', views.confirm)
auth.add_url_rule('/confirm/', 'confirm', views.resend_confirmation)


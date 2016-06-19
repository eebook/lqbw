#!/usr/bin/env python2
# -*- coding: utf-8 -*-

from flask import Blueprint
from . import views

auth = Blueprint('auth', __name__)

auth.add_url_rule('/login/', 'login', views.login, methods=['GET', 'POST'])
auth.add_url_rule('/register/', 'register', views.register, methods=['GET', 'POST'])


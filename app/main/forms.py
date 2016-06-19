#!/usr/bin/env python2
# -*- coding: utf-8 -*-

from flask_wtf import Form
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class UrlForm(Form):
    url = StringField(u'请输入网址', validators=[DataRequired()])
    submit = SubmitField(u'开始制作')


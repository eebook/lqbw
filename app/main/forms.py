#!/usr/bin/env python2
# -*- coding: utf-8 -*-

from flask_wtf import Form
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class UrlForm(Form):
    url = StringField(u'', validators=[DataRequired()], render_kw={"placeholder": u"在这输入网址"})
    submit = SubmitField(u'开始制作', render_kw={"class": "btn btn-default pull-right"})


#!/usr/bin/env python2
# -*- coding: utf-8 -*-

from flask import render_template, redirect, url_for
from .forms import UrlForm
from . import main


@main.route('/', methods=['GET', 'POST'])
def index():
    form = UrlForm()
    if form.validate_on_submit():
        url = form.url.data
        print 'url' + str(url)
        return redirect(url_for('.index'))
    return render_template('index.html',
                           form=form)

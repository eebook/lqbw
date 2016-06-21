#!/usr/bin/env python2
# -*- coding: utf-8 -*-


from flask import render_template, send_from_directory, flash
from flask_login import current_user
from .forms import UrlForm

from ..eebook.src.main import EEBook
from ..eebook.src.tools.match import Match
from ..eebook.src.exception import UnsupportTypeException


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
            game = EEBook(recipe_kind=recipe_kind, url=url, debug=True)
            file_name = game.begin()[0]
            ebooks_produced_path = '/var/www/eebookorg/e-books_produced/'
            file_name += '.epub'
            return send_from_directory(ebooks_produced_path, file_name, as_attachment=True)
        else:
            flash(u"请登录后执行操作")
    return render_template('index.html', form=form)

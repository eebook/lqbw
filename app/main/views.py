#!/usr/bin/env python2
# -*- coding: utf-8 -*-

from flask import render_template, send_from_directory, flash
from .forms import UrlForm

from ..eebook.src.main import EEBook
from ..eebook.src.tools.match import Match
from ..eebook.src.exception import UnsupportTypeException


def index():
    form = UrlForm()
    if form.validate_on_submit():
        url = form.url.data
        try:
            recipe_kind = Match.get_website_kind(url)
        except UnsupportTypeException:
            flash(u"不支持的类型")
            return render_template('index.html', form=form)
        game = EEBook(recipe_kind=recipe_kind, url=url, debug=True)
        file_name = game.begin()[0]
        ebooks_produced_path = '/Users/Frank/Documents/Dev/Python/flask/eebookorg/e-books_produced/'
        file_name += '.epub'
        return send_from_directory(ebooks_produced_path, file_name, as_attachment=True)
    return render_template('index.html', form=form)




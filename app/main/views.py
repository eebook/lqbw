#!/usr/bin/env python2
# -*- coding: utf-8 -*-

from flask import render_template, redirect, url_for, send_from_directory
from .forms import UrlForm
from . import main

from ..eebook.src.main import EEBook
from ..eebook.src.tools.match import Match

import sys


@main.route('/', methods=['GET', 'POST'])
def index():
    form = UrlForm()
    if form.validate_on_submit():
        url = form.url.data
        print 'url' + str(url)
        recipe_kind = Match.get_website_kind(url)
        if recipe_kind == 'Unsupport type':
            print("Unsupported type!\n Please try again.")
            sys.exit()
        game = EEBook(recipe_kind=recipe_kind, url=url, debug=True)
        file_name = game.begin()[0]
        ebooks_produced_path = '/Users/Frank/Documents/Dev/Python/flask/eebookorg/e-books_produced/'
        print u"file_name:" + str(file_name)
        file_name += '.epub'
        return send_from_directory(ebooks_produced_path, file_name, as_attachment=True)
        # return redirect(url_for('.index'))
    return render_template('index.html', form=form)



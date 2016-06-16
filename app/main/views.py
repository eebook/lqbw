#!/usr/bin/env python2
# -*- coding: utf-8 -*-

from flask import render_template, redirect, url_for
from .forms import UrlForm
from . import main

from ..eebook.src.main import EEBook
from ..eebook.src.tools.debug import Debug
from ..eebook.src.constants import __version__
from ..eebook.src.utils import log
from ..eebook.src.tools.match import Match
from ..eebook.src.login import Login
from ..eebook.src.constants import url_info

import getopt
import sys  # 修改默认编码
import os   # 添加系统路径


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
        game.begin()
        return redirect(url_for('.index'))
    return render_template('index.html', form=form)

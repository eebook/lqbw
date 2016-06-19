#!/usr/bin/env python2
# -*- coding: utf-8 -*-

from flask import Flask, Blueprint
from . import views
from . import errors

main = Blueprint('main', __name__)

main.add_url_rule('/', 'index', views.index, methods=['GET', 'POST'])
main.errorhandler(404)(errors.page_not_found)
main.errorhandler(500)(errors.internal_server_error)

main.add_url_rule('/<path:invalid_path>', 'handle_unmatchable', errors.handle_unmatchable)
#!/usr/bin/env python2
# -*- coding: utf-8 -*-

import os
from app import create_app
from flask_script import Manager, Server

app = create_app(os.getenv('EEBOOK_CONFIG') or 'default')
manager = Manager(app)

# Turn os debugger by default and reloader
manager.add_command("runserver", Server(
    use_debugger=True,
    use_reloader=True,
    host='0.0.0.0',
    port=5003
))


if __name__ == '__main__':
    manager.run()

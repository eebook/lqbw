#!/usr/bin/env python2
# -*- coding: utf-8 -*-

import os
import sys
from app import create_app, db
from app.models import User, Role
from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand

reload(sys)
base_path = unicode(os.getcwd())

# Python早期版本可以直接用sys.setdefaultencoding('utf-8')，新版本需要先reload一下
sys.setdefaultencoding('utf-8')
sys.setrecursionlimit(100000)  # 为BS解析知乎上的长答案增加递归深度限制

app = create_app(os.getenv('EEBOOK_CONFIG') or 'default')
manager = Manager(app)
migrate = Migrate(app, db)


def make_shell_context():
    return dict(app=app, db=db, User=User, Role=Role)


# Turn os debugger by default and reloader
manager.add_command('runserver', Server(
    use_debugger=True,
    use_reloader=True,
    host='0.0.0.0',
    port=5003
))

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()

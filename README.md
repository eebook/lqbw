# eebookorg

见 [ee-book.org](http://ee-book.org)

[EE-Book](https://www.github.com/knarfeh/EE-Book)的网页版，基于 Flask 框架，使用[celery](http://docs.celeryproject.org/en/latest/)进行任务队列管理，目前支持的网站：  


| 名称 | 主页                               | 支持类型                          |
| :------ | ---------------------------------------- | ---------------------------------------- |
| 知乎      | [www.zhihu.com](http://www.zhihu.com)    | **问题：** `zhihu.com/question/{question_id}`<br/>**答案：** `zhihu.com/question/{question_id}/answer/{answer_id}`<br/>**话题：** `zhihu.com/topic/{topic_id}`<br/>**用户的全部回答：** `zhihu.com/people/{people_id}` or `zhihu.com/people/{people_id}/answers`<br/>**收藏夹：** `zhihu.com/collection/{collection_id}` <br/> **专栏：** `zhuanlan.zhihu.com/{zhuanlan_id}` |
| 简书      | [www.jianshu.com](http://www.jianshu.com) | **用户的所有文章：** `jianshu.com/users/{people_id}/latest_articles`<br/>**专题：** `jianshu.com/collection/{collection_id}`<br/>**文集：** `jianshu.com/notebooks/{notebooks_id}/latest` or `jianshu.com/notebooks/{notebooks_id}/top` |
| csdn博客  | [blog.csdn.net](http://blog.csdn.net)    | **用户的所有文章：** `blog.sina.com.cn/u/{people_id}` |
| 新浪博客   | [blog.sina.com.cn](http://blog.sina.com.cn/) | **用户的所有文章：** `blog.csdn.net/{people_id}` |
| 博客园     | [www.cnblogs.com/](http://www.cnblogs.com/) | **用户的所有文章：** `cnblogs.com/{people_id}/`  |
| 易百教程   | [www.yiibai.com](http://www.yiibai.com/) | **某个教程的文章：** `yiibai.com/{tutorial_kind}`|


# License

[GPL2](./LICENSE)

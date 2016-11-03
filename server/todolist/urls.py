from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),

    url(r'^api/save/todo$', views.save_todo, name='save_todo'),

    url(r'^api/get/tasks$', views.get_tasks, name='get_tasks'),
    url(r'^api/get/tags$', views.get_tags, name='get_tags'),

    url(r'^api/delete/todo$', views.delete_todo, name='delete_todo'),

    url(r'^api/edit/complete$', views.edit_complete, name='edit_complete'),
    url(r'^api/edit/todo$', views.edit_todo, name='edit_todo'),
]
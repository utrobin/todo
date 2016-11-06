from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from todolist.models import Todo, Tags
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Q
import json
import math


def all_tags(list):
    if len(list) != 0:
        return list
    else:
        for k in Tags.objects.all():
            list.append(k.title)
        return list


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


@csrf_exempt
def save_todo(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        if data['date'] == "":
            date = None
        else:
            date = data['date']

        if data['time'] == "":
            time = None
        else:
            time = data['time']

        to = Todo(
            title=data['title'],
            description=data['description'],
            dedline_date=date,
            dedline_time=time,
        )
        to.save()

        for tag in data['tags']:
            t = Tags.objects.all().filter(title=tag).first()
            if not t:
                t = Tags(title=tag)
                t.save()
            to.tags.add(t)
            to.save()

    return HttpResponse()


@csrf_exempt
def get_tasks(request):
    if request.method == 'POST':
        req = json.loads(request.body.decode('utf-8'))
        page = req['page']
        sort = req['sort']
        show = req['show']

        data = {}
        data['tasks'] = []

        if sort == "alphabetically":
            sort = "title"
        elif sort == "dedline":
            sort = "dedline_date"

        if show == "complete":
            show = [True]
        elif show == "uncomplete":
            show = [False]
        else:
            show = [True, False]

        data['page'] = math.ceil(Todo.objects.filter(
            Q(tags__title__in=all_tags(req['tags'])),
            Q(completed__in=show),
            Q(deleted=False)
        ).order_by(sort).order_by('dedline_time').distinct().count() / 7)

        for todo in Todo.objects.filter(
            Q(tags__title__in=all_tags(req['tags'])),
            Q(completed__in=show),
            Q(deleted=False)
        ).order_by('dedline_time').order_by(sort).distinct()[page * 7:(page + 1) * 7]:
            tags = []
            for tag in todo.tags.all():
                tags.append({
                    'title': tag.title,
                    'id': tag.id,
                    'active': False
                })

            data['tasks'].append({
                'id': todo.id,
                'title': todo.title,
                'description': todo.description,
                'completed': todo.completed,
                'date': todo.dedline_date,
                'time': todo.dedline_time,
                'tags': tags
            })

        return HttpResponse(json.dumps(data, cls=DjangoJSONEncoder), content_type="application/json")


@csrf_exempt
def edit_complete(request):
    if request.method == 'POST':
        req = json.loads(request.body.decode('utf-8'))

        t_id = req['id']
        todo = Todo.objects.get(id=t_id)
        todo.completed = req['completed']
        todo.save()

        return HttpResponse()


@csrf_exempt
def delete_todo(request):
    if request.method == 'POST':
        req = json.loads(request.body.decode('utf-8'))

        t_id = req['id']
        todo = Todo.objects.get(id=t_id)
        todo.deleted = True
        todo.save()

        return HttpResponse()

@csrf_exempt
def edit_todo(request):
    if request.method == 'POST':
        req = json.loads(request.body.decode('utf-8'))

        if req['date'] == "":
            date = None
        else:
            date = req['date']

        if req['time'] == "":
            time = None
        else:
            time = req['time']

        print(time, date)

        todo = Todo.objects.get(id=req['id'])
        todo.title=req['title']
        todo.description=req['description']

        if time != None:
            todo.dedline_time = time
        if date != None:
            todo.dedline_date = date

        todo.save()

        for tag in req['tags']:
            t = Tags.objects.all().filter(title=tag).first()
            if not t:
                t = Tags(title=tag)
                t.save()
            todo.tags.add(t)
            todo.save()

        return HttpResponse()


@csrf_exempt
def get_tags(request):
    if request.method == 'POST':
        data = []
        for tag in Tags.objects.all().distinct()[0:7]:
            data.append({
                'title': tag.title,
                'id': tag.id,
                'active': False
            })

        return HttpResponse(json.dumps(data, cls=DjangoJSONEncoder), content_type="application/json")
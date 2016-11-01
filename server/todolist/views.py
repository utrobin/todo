from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from todolist.models import Todo, Tags
from django.core.serializers.json import DjangoJSONEncoder
import json
import math


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
        data = {}
        data['tasks'] = []
        data['page'] = math.ceil(Todo.objects.all().count() / 10)
        for todo in Todo.objects.all().order_by('dedline_date', 'dedline_time').distinct()[page * 10:(page + 1) * 10]:
            tags = []
            for tag in todo.tags.all():
                tags.append(tag.title)

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

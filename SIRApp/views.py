import simplejson
import feedparser
from webpreview import web_preview
from django.http import HttpResponse

from SIRApp.models import Episode, Press

def get_episodes(request):
    limit = int(request.GET['limit'])
    episodes = Episode.objects.order_by('-published')[:limit]
    body = []
    for ep in episodes:
        ep_dict = {}
        ep_dict['track_id'] = ep.track_id
        ep_dict['description'] = ep.description
        ep_dict['title'] = ep.title
        body.append(ep_dict)

    data = {
        'headers' : {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        'body': body
    }
    return HttpResponse(simplejson.dumps(data))

def get_articles(request):
    limit = int(request.GET['limit'])
    articles = Press.objects.order_by('-id')[:limit]
    body = []

    for a in articles:
        art_dict = {}
        title = a.title
        description = a.description
        image = a.image
        site = a.site
        if not (title and description and image and site):
            title, description, image = web_preview(a.url)
            site = "/".join(a.url.split("/")[:3]) 
            try:
                if "http" not in image:
                    image = "{}/{}".format(site, image)
            except:
                pass
            a.title=title
            a.description=description
            a.site=site
            a.image=image
            a.save()

        
        art_dict['image'] = image
        print(a.url)
        art_dict['title'] = title
        art_dict['description'] = description
        art_dict['site'] = site.split("/")[-1]
        art_dict['url'] = a.url
        body.append(art_dict)

    data = {
        'headers' : {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        'body': body 
    }
    return HttpResponse(simplejson.dumps(data))

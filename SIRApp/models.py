import datetime
from django.db import models
import feedparser

class Episode(models.Model):
    url = models.URLField()
    track_id = models.IntegerField()
    description = models.TextField()
    title = models.CharField(max_length=800)
    published = models.DateField()

    RSS_URL = 'http://feeds.soundcloud.com/users/soundcloud:users:163755555/sounds.rss' 

    @classmethod
    def import_rss_feed(self):
        response = feedparser.parse(self.RSS_URL)
        tracks = response.entries
        latest_track = Episode.objects.order_by('id').last()

        sentinel_date = datetime.datetime(year=1992, month=5, day=9)
        if latest_track:
            sentinel_date = latest_track.published
        for track in tracks:
            track_published = datetime.datetime(*track.published_parsed[:6])
            if track_published > sentinel_date:
                track_id = track.id.split("/")[-1]
                import ipdb;ipdb.set_trace()
                Episode.objects.create(
                    title=track.title,
                    track_id=track_id,
                    description=track.summary,
                    published=track_published,
                    url=track.link
                )
            else:
                return


        

class Press(models.Model):
    url = models.URLField()
    image = models.URLField(null=True)
    title = models.CharField(max_length=800, null=True)
    description = models.CharField(max_length=800, null=True)
    site = models.URLField(null=True)

class Transcript():
    pass



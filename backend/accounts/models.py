from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class CATEGORIES(models.Model):
    name: str = models.CharField(max_length=100)
    img: str = models.CharField(max_length=100)

    def __str__(self):
        return self.name



class FREQUENTLY_INTERACTED(models.Model):
    username: str = models.CharField(max_length=100)
    img: str = models.CharField(max_length=100)



    def __str__(self):
        return self.username



class CREATORS(models.Model):
    username: str = models.CharField(max_length=100)
    img: str = models.CharField(max_length=100)
    display_name: str = models.CharField(max_length=100)
    username: str = models.CharField(max_length=100)
    category: str = models.CharField(max_length=100)
    bio = models.TextField(default="Hey there! I am using this app.")    
    sub_supporters: int = models.IntegerField()
    sub_fans: int = models.IntegerField()
    sub_super_fans: int = models.IntegerField()
    subscribers: models.JSONField =  models.JSONField(default=list)
    post_id: str = models.CharField(max_length=100) 

    def __str__(self):
        return self.username





class UserProfile(models.Model):
    # Link it to the default User
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    
    # Add your custom columns here
    name= models.CharField(max_length=100)
    photo = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username


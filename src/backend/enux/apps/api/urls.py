from django.urls import include, path


djoser_urls = [
    path('', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),
    path('', include('djoser.social.urls')),
]

api_v1_urls = [
    path('auth/', include(djoser_urls))
]

urlpatterns = [
    path('v1/', include(api_v1_urls))
]

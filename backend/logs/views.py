from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Trip, LogSheet
from .utils import compute_log_grid

class TripViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response([t.serialize() for t in Trip.objects.all()])
    def create(self, request):
        t=Trip.objects.create(**request.data)
        grid=compute_log_grid(t.cycle_used)
        l=LogSheet.objects.create(trip=t,grid=grid)
        resp=t.serialize();resp['log']=l.serialize()
        return Response(resp, status=status.HTTP_201_CREATED)
    def retrieve(self, request, pk=None):
        return Response(Trip.objects.get(pk=pk).serialize())
    @action(detail=True, methods=['get'])
    def log(self, request, pk=None):
        return Response(LogSheet.objects.get(trip__id=pk).serialize())

from django.db import models
class Trip(models.Model):
    current_location=models.CharField(max_length=255)
    pickup=models.CharField(max_length=255)
    dropoff=models.CharField(max_length=255)
    cycle_used=models.FloatField()
    def serialize(self):
        return {'id':self.id,'current_location':self.current_location,'pickup':self.pickup,'dropoff':self.dropoff,'cycle_used':self.cycle_used}
class LogSheet(models.Model):
    trip=models.ForeignKey(Trip,on_delete=models.CASCADE)
    date=models.DateField(auto_now_add=True)
    grid=models.JSONField()
    def serialize(self):
        return {'id':self.id,'trip':self.trip.id,'date':self.date.isoformat(),'grid':self.grid}

from django.db import models
from users.models import User
from django.core.exceptions import ValidationError
from category.models import Category


class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.start_date >= self.end_date:
            raise ValidationError("End date must be after start date")

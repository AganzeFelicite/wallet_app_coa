# from django.db import models
# from django.conf import settings
# from django.utils import timezone
# from django.db.models import Sum
# from users.models import User

# class Account(models.Model):
#     ACCOUNT_TYPES = [
#         ('BANK', 'Bank Account'),
#         ('MOBILE', 'Mobile Money'),
#         ('CASH', 'Cash'),
#     ]

#     user = models.ForeignKey(settings.AUTH_USER_MODEL,
#                              on_delete=models.CASCADE)
#     name = models.CharField(max_length=100)
#     account_type = models.CharField(max_length=10, choices=ACCOUNT_TYPES)
#     balance = models.DecimalField(max_digits=15, decimal_places=2, default=0)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)


# class Transaction(models.Model):
#     TRANSACTION_TYPES = (
#         ('INCOME', 'Income'),
#         ('EXPENSE', 'Expense'),
#     )

#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     account = models.ForeignKey(Account, on_delete=models.CASCADE,
#                                 related_name='transactions')
#     category = models.ForeignKey(Category, on_delete=models.CASCADE)
#     amount = models.DecimalField(max_digits=15, decimal_places=2)
#     transaction_type = models.CharField(
#         max_length=10, choices=TRANSACTION_TYPES)
#     description = models.TextField(blank=True)
#     date = models.DateTimeField(default=timezone.now)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def save(self, *args, **kwargs):
#         super().save(*args, **kwargs)
#         self.account.update_balance()
#         self.check_budget_alerts()

#     def check_budget_alerts(self):
#         """Check if transaction exceeds budget and create notification if needed"""
#         if self.transaction_type == 'EXPENSE':
#             budget = Budget.objects.filter(
#                 user=self.user,
#                 category=self.category,
#                 start_date__lte=self.date,
#                 end_date__gte=self.date
#             ).first()

#             if budget:
#                 total_expenses = Transaction.objects.filter(
#                     user=self.user,
#                     category=self.category,
#                     transaction_type='EXPENSE',
#                     date__range=[budget.start_date, budget.end_date]
#                 ).aggregate(total=Sum('amount'))['total'] or 0

#                 if total_expenses > budget.amount:
#                     Notification.objects.create(
#                         user=self.user,
#                         title='Budget Exceeded',
#                         message=f'Budget for {self.category.name} has been exceeded.'
#                     )

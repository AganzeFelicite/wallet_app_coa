# from rest_framework import viewsets
# from rest_framework.permissions import IsAuthenticated
# from .models import Account, Transaction
# from .serializers import AccountSerializer, TransactionSerializer
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from django.db.models import Sum
# from django_filters.rest_framework import DjangoFilterBackend


# class AccountViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     serializer_class = AccountSerializer

#     def get_queryset(self):
#         return Account.objects.filter(user=self.request.user)


# class TransactionViewSet(viewsets.ModelViewSet):
#     serializer_class = TransactionSerializer
#     filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
#     filterset_fields = ['account', 'category', 'transaction_type', 'date']
#     ordering_fields = ['date', 'amount']

#     def get_queryset(self):
#         return Transaction.objects.filter(user=self.request.user)

#     @action(detail=False, methods=['get'])
#     def summary(self, request):
#         """Get transaction summary with optional date range"""
#         start_date = request.query_params.get('start_date')
#         end_date = request.query_params.get('end_date')

#         transactions = self.get_queryset()
#         if start_date and end_date:
#             transactions = transactions.filter(
#                 date__range=[start_date, end_date])

#         summary = {
#             'total_income': transactions.filter(
#                 transaction_type='INCOME'
#             ).aggregate(total=Sum('amount'))['total'] or 0,

#             'total_expenses': transactions.filter(
#                 transaction_type='EXPENSE'
#             ).aggregate(total=Sum('amount'))['total'] or 0,

#             'by_category': transactions.values(
#                 'category__name'
#             ).annotate(total=Sum('amount')),

#             'by_account': transactions.values(
#                 'account__name'
#             ).annotate(total=Sum('amount'))
#         }

#         return Response(summary)

from django.contrib import admin
from django.urls import path, include
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from budget.views import BudgetViewSet
from transactions.views import TransactionViewSet, AccountViewSet
from category.views import CategoryViewSet
from notifications.views import NotificationViewSet


router = DefaultRouter()
router.register(r'accounts', AccountViewSet, basename='account')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'transactions', TransactionViewSet,
                basename='transaction')
router.register(r'budgets', BudgetViewSet, basename='budget')
router.register(r'notifications', NotificationViewSet,
                basename='notification')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.jwt')),
    # path('api/', include('wallet.urls')),
    path('api/wallet/', include(router.urls)),
]

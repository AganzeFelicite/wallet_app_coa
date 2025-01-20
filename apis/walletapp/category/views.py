from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Category
from .serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(
            user=self.request.user,
            parent=None  # Only get main categories
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

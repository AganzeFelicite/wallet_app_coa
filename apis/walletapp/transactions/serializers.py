from rest_framework import serializers
from .models import Account, Transaction

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'name', 'account_type', 'balance']


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'account', 'category', 'transaction_type',
                  'amount', 'description', 'date']

    def to_representation(self, instance):
        """Customize the representation for GET requests."""
        representation = super().to_representation(instance)
        request = self.context.get('request')

        # Add account_name and category_name only for GET requests
        if request and request.method == 'GET':
            representation['account_name'] = instance.account.name
            representation['category_name'] = instance.category.name
        return representation

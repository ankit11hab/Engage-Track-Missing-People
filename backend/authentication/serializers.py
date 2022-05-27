from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    police_station_uid = serializers.CharField(max_length=255)
    phone = serializers.CharField(max_length=10)
    password = serializers.CharField(max_length=80, min_length=5, write_only=True)
    password2 = serializers.CharField(max_length=80, min_length=5, write_only=True)

    class Meta:
        model = User
        fields = ['police_station_uid','phone', 'password','password2']

    def validate(self, attrs):
        if attrs['password']!=attrs['password2']:
            raise serializers.ValidationError({'password':('Passwords do not match!')})
        if User.objects.filter(police_station_uid=attrs['police_station_uid']).exists():
            raise serializers.ValidationError({'police_station_uid':('Police Station UID is already in use!')})
        return super().validate(attrs)

    def create(self, validated_data):
        validated_data.pop('password2')
        return User.objects.create_user(**validated_data)

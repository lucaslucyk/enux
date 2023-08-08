from __future__ import annotations
from typing import Any, Optional
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager
)
import os

# from apps.cart.models import Cart
# from apps.user_profile.models import UserProfile
# from apps.wishlist.models import WishList

class UserAccountManager(BaseUserManager):
    
    def create_user(
        self,
        email: str,
        password: Optional[str] = None,
        **kwargs
    ) -> Any:
        
        if not email:
            raise ValueError('Users must have an email address')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)

        user.set_password(password)
        user.save()

        # shopping_cart = Cart.objects.create(user=user)
        # shopping_cart.save()
        
        # profile = UserProfile.objects.create(user=user)
        # profile.save()
        
        # wishlist = WishList.objects.create(user=user)
        # wishlist.save()

        return user
    
    def create_superuser(self, email: str, password: str, **kwargs) -> Any:
        user = self.create_user(email=email, password=password, **kwargs)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self) -> str:
        return f'{self.first_name}, {self.last_name}'

    def get_short_name(self) -> str:
        return self.first_name

    def __str__(self) -> str:
        return self.email
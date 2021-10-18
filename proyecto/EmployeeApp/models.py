from django.db import models

# Create your models here.

class Departments(models.Model):
    DepartmentId = models.AutoField(primary_key=True)
    DepartmentName = models.CharField(max_length=500)

class SubAreas(models.Model):
    SubAreaId = models.AutoField(primary_key=True)
    SubAreaName = models.CharField(max_length=500)
    Department = models.CharField(max_length=500)

class Employees(models.Model):
    EmployeeId = models.AutoField(primary_key=True)
    EmployeeName = models.CharField(max_length=500)
    EmployeeLastName = models.CharField(max_length=500)
    Department = models.CharField(max_length=500)
    SubArea = models.CharField(max_length=500)
    DocumentType = models.CharField(max_length=500)
    DocumentNumber = models.CharField(max_length=500)

from rest_framework import serializers
from EmployeeApp.models import Departments,Employees,SubAreas

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Departments 
        fields=('DepartmentId','DepartmentName')

class SubAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model=SubAreas 
        fields=('SubAreaId','SubAreaName','Department')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employees 
        fields=('EmployeeId','EmployeeName','EmployeeLastName','Department','SubArea','DocumentType','DocumentNumber')
from .models import *
from rest_framework import serializers
from decimal import Decimal
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.contenttypes.models import ContentType

class StorageQuotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = StorageQuota
        fields = ['id', 'limit_gb']
        

class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'date_of_birth',
            'email',
            'role',
            'account_status',
        ]

    
     
class StaffSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    userID = serializers.CharField(read_only=True)
    account_status = serializers.CharField(read_only=True)
    assigend_class_name = serializers.SerializerMethodField()
    class Meta:
        model = Staff
        
        fields = [
            'id',
            'userID',
            'username',
            'first_name',
            'last_name',
            'date_of_birth',
            'email',
            'state_of_origin',
            'religion',
            'gender',
            'phone_number',
            'disability',
            'disability_note',
            'city_or_town',
            'home_address',
            'role',
            'department',
            'employment_type',
            'maritial_status',
            'years_of_experience',
            'computer_skills',
            'flsc',
            'waec_neco_nabteb_gce',
            'degree',
            'cv',
            'other_certificates',
            'staff_speech',
            'passport',
            'assigned_class',
            'assigend_class_name',
            'password',
            'account_status',
            'date_joined'
        ]
        
            
    def get_assigend_class_name(self, obj):
        assigned_class = obj.assigned_class
        serializer = ShortStudentClassSerializer(
            instance=assigned_class, many=False)
        return serializer.data
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        staff = Staff(**validated_data)
        if password:
            staff.set_password(password)
        staff.save()
        return staff  
        
        
class ShortStaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = [
            'userID',
            'first_name',
            'last_name',
            'role',
            'account_status',
            
        ]
        
class HRSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    userID = serializers.CharField(read_only=True)
    account_status = serializers.CharField(read_only=True)
    class Meta:
        model = HR
        
        fields = [
            'id',
            'userID',
            'username',
            'first_name',
            'last_name',
            'date_of_birth',
            'email',
            'gender',
            'state_of_origin',
            'religion',
            'phone_number',
            'disability',
            'disability_note',
            'city_or_town',
            'home_address',
            'role',
            'office_location',
            'qualification',
            'passport',
            'password',
            'account_status',
            'date_joined'
        ]
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        hr = HR(**validated_data)
        if password:
            hr.set_password(password)
        hr.save()
        return hr
        


        
class StudentSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    userID = serializers.CharField(read_only=True)
    account_status = serializers.CharField(read_only=True)
    student_class_name = serializers.SerializerMethodField()
    class Meta:
        model = Student
        fields = [
            'id',
            'userID',
            'username',
            'first_name',
            'last_name',
            'date_of_birth',
            'email',
            'father_name',
            'mother_name',
            'gurdian_name',
            'state_of_origin',
            'religion',
            'gender',
            'phone_number',
            'disability',
            'disability_note',
            'city_or_town',
            'home_address',
            'role',
            'admission_number',
            'student_class',
            'student_class_name',
            'passport',
            'password',
            'account_status',
            'date_joined'
        ]
        
    def get_student_class_name(self, obj):
        student_class = obj.student_class
        serializer = ShortStudentClassSerializer(
            instance=student_class, many=False)
        return serializer.data
        
        
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        student = Student(**validated_data)
        if password:
            student.set_password(password)
        student.save()
        return student  
        
class ShortStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            'userID',
            'first_name',
            'last_name',
            'email',
            'role',
            'passport',
            'account_status',
        ]   
        
        
class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = [
            'id',
            'name',
            'phone_number',
            'email',
            'image',
            'address',
            'children_name'
        ]       
#  --------------------------- Login  --------------------------------
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True, min_length=8)
    

class CustomTokenObtainSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data['role'] = user.role
        data['user_id'] = user.id
        
        return data
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        profile_id = None
        
        try:
            profile = UserProfile.objects.get(user=user)
            profile_id = profile.id
        except UserProfile.DoesNotExist:
            pass
        
        token['profile_id'] = profile_id
        token['role'] = user.role
        token['user_id'] = str(user.id)
        
        return token
    
    
class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = RefreshToken(attrs['refresh'])
        access = refresh.access_token
        
        data['refresh'] = str(refresh)
        data['access'] = str(access)
        user_id = refresh.get('user_id')
        
        
        
        if not user_id:
            raise AuthenticationFailed('Invalid token')
        
        try:
            user = Users.objects.get(id=user_id)
        except Users.DoesNotExist:
            raise AuthenticationFailed('User not found', code='user_not_found')
        
        profile_id = None
        
        try:
            profile = UserProfile.objects.get(user=user)
            profile_id = profile.id
        except UserProfile.DoesNotExist:
            pass
        
        data['user_id'] = str(user.id)
        data['role'] = user.role
        
        return data 
            
class RequestToChangePasswordFormSerializer(serializers.Serializer):
    username = serializers.CharField()
    
class RequestToChangePasswordSerializer(serializers.ModelSerializer):
    user_details = serializers.SerializerMethodField()
    class Meta:
        model = RequestToChangePassword
        fields = [
            'id',
            'user',
            'user_details',
            'request_date',
            'approved_status',
            'approved_date',
            'token',
            'token_expiry'
        ]
        
    def get_user_details(self, obj):
        user = obj.user
        serializer = UsersSerializer(instance=user, many=False)
        return serializer.data
        
class RequestToChangePasswordStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestToChangePassword
        fields = ['approved_status']
            
            
class ChangePasswordFormSerializer(serializers.Serializer):
    token = serializers.CharField()
    new_username = serializers.CharField()
    new_password = serializers.CharField()
  
  
class ChangeAdminPasswordFormSerializer(serializers.Serializer):
    username = serializers.CharField()
    new_username = serializers.CharField()
    new_password =serializers.CharField() 
    
class LogoutSerializer(serializers.Serializer):
    refresh_token  = serializers.CharField()
    
class DisableAccountSerializer(serializers.ModelSerializer):
    user_details = serializers.SerializerMethodField()
    class Meta:
        model = DisableAccount
        fields = [
            'id',
            'user',
            'user_details',
            'reason',
            'disabled_at',
        ]
        
    def get_user_details(self, obj):
        user = obj.user
        serializer = UsersSerializer(instance=user, many=False)
        return serializer.data
    
    
            
# Admin or HR Notification
class AdminorHRNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminorHRNotification
        fields = [
            'id',
            'text',
            'seen',
            'date'
        ]
        
# Email
class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = [
            'id',
            'to',
            'subject',
            'body',
            'delivery_status',
            'date',
        ]
       
class ContactUsSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField(max_length=100)
    subject = serializers.CharField(max_length=100)
    message = serializers.CharField()

        
        
#Subjects
class SubjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subjects
        fields = [
            'id',
            'name',
            'sections',
            'description',
            'created_at'
        ]
    
class ShortSubjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subjects
        fields = [
            'id',
            'name',
        ]
    
    
#Student Classes    
class StudentClassSerializer(serializers.ModelSerializer):
    subject_name = serializers.SerializerMethodField()
    class Meta:
        model = StudentClass
        fields = [
            'id',
            'name',
            'subjects',
            'subject_name'
        ]
        
        
    def get_subject_name(self, obj):
        subjects = obj.subjects.all()
        serializer = ShortSubjectsSerializer(subjects, many=True)
        return serializer.data
   
class ShortStudentClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentClass
        fields = [      
            'name',
        ] 
        

class UpdateStudentCurrentClassSerializer(serializers.Serializer):
    student = serializers.UUIDField()
    student_new_class = serializers.IntegerField()


# Terms
class TermSerializer(serializers.ModelSerializer):
    class Meta:
        model = Term
        fields = [
            'id',
            'name'
        ]
        
# Session
class SessionSerializer(serializers.ModelSerializer):
    term_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Session
        fields = [
            'id',
            'name',
            'term',
            'term_name'
        ]
        
    def get_term_name(self, obj):
        term = obj.term.all()
        serializer = TermSerializer(term, many=True)
        return serializer.data
   
class ShortSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = [
            'name',
        ]
        
# School Notification
class SchoolNotificationSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    class Meta:
        model = SchoolNotification
        fields = [
            'id',
            'subject',
            'text',
            'status',
            'date'
        ]
        
    def get_status(self, obj):
        user = self.context['request'].user
        content_type = obj._meta.model
        
        try:
            ct = ContentType.objects.get_for_model(content_type)
            # content_type = ContentType.objects.get_for_model(SchoolNotification)
            record = UserNotificationStatus.objects.get(
                user=user,
                content_type=ct,
                object_id= obj.id
            )
            return record.status
        except UserNotificationStatus.DoesNotExist:
            return 'unread'
        
        
        
# Staff Notification
class StaffNotificationSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    class Meta:
        model = StaffNotification
        fields = [
            'id',
            'subject',
            'text',
            'status',
            'date'
        ]
        
    def get_status(self, obj):
        user = self.context['request'].user
        
        try:
            content_type = ContentType.objects.get_for_model(StaffNotification)
            record = UserNotificationStatus.objects.get(
                user=user,
                content_type=content_type,
                object_id=obj.id
            )
            return record.status
        except UserNotificationStatus.DoesNotExist:
            return 'unread'
        
        
# class Notifcation
class ClassNotificationSerializer(serializers.ModelSerializer):
    teacher_name =  serializers.SerializerMethodField()
    student_class_name = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    class Meta:
        model = ClassNotification
        fields = [
            'id',
            'teacher',
            'teacher_name',
            'student_class',
            'student_class_name',
            'subject',
            'text',
            'status',
            'date',
        ]
    def get_student_class_name(self, obj):
        student_class = obj.student_class
        serializer = ShortStudentClassSerializer(
            instance=student_class, many=False)
        return serializer.data
        
    def get_teacher_name(self, obj):
        teacher = obj.teacher
        serializer = ShortStaffSerializer(
            instance=teacher, many=False)
        return serializer.data   
    
    def get_status(self, obj):
        user = self.context['request'].user
        content_type = obj._meta.model
        
        try:
            ct = ContentType.objects.get_for_model(content_type)
            # content_type = ContentType.objects.get_for_model(ClassNotification)
            record = UserNotificationStatus.objects.get(
                user=user,
                content_type=ct,
                object_id=obj.id
            )
            return record.status
        except UserNotificationStatus.DoesNotExist:
            return 'unread'
        
# School Events
class SchoolEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolEvent
        fields = [
            'id',
            'title',
            'description',
            'start_date',
            'end_date',
            'created_at',
        ]
        
        
# --------------------------------------------- Result ---------------------- #

# Generator of scratch Card 
class GenerateScratchCardSerializer(serializers.Serializer):
    amount = serializers.IntegerField(min_value=1, max_value=100, help_text="How many scratch cards to generate")

class ScratchCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScratchCard
        fields = [
            'id',
            'pin',
            'trials_left',
            'status',
            'is_active',
            'student',
            'created_at'
        ]
    
# Subject Result 
class SubjectResultSerializer(serializers.ModelSerializer):
    subject_name = serializers.SerializerMethodField()
    class Meta:
        model = SubjectResult
        fields = [
            'id',
            'student_result',
            'subject',
            'subject_name',
            'total_ca',
            'exam',
            'total',
            'grade',
            'position',
            # 'cgpa'
        ]
    
    def get_subject_name(self, obj):
        subject = obj.subject
        serializer = ShortSubjectsSerializer(instance=subject, many=False)
        return serializer.data
    
    
# Student Result
class StudentResultSerializer(serializers.ModelSerializer):
    subject_result = SubjectResultSerializer(many=True, required=False)
    student_name = serializers.SerializerMethodField()
    term_name = serializers.SerializerMethodField()
    session_name = serializers.SerializerMethodField()
    class_name = serializers.SerializerMethodField()
    
    class Meta:
        model = StudentResult
        fields = [
            'id',
            'student',
            'student_name',
            'student_class',
            'class_name',
            'term',
            'term_name',
            'session',
            'session_name',
            'total_marks_obtain',
            'student_average',
            'class_average',
            'total_students',
            'position',
            'decision',
            'agility',
            'caring',
            'communication',
            'loving',
            'puntuality',
            'seriousness',
            'socialization',
            'attentiveness',
            'handling_of_tools',
            'honesty',
            'leadership',
            'music',
            'neatness',
            'perserverance',
            'politeness',
            'tools',
            'teacher_comment',
            'principal_comment',
            'next_term_begins',
            'subject_result',   
            'created_at',
        ]
        
    def get_class_name(self, obj):
        student_class = obj.student_class
        serializer = ShortStudentClassSerializer(
            instance=student_class, many=False)
        return serializer.data
    
    def get_term_name(self, obj):
        term = obj.term
        serializer = TermSerializer(
            instance=term, many=False)
        return serializer.data
    
    def get_session_name(self, obj):
        session = obj.session
        serializer = ShortSessionSerializer(
            instance=session, many=False)
        return serializer.data
    
    def get_student_name(self, obj):
        student = obj.student
        serializer = ShortStudentSerializer(instance=student, context=self.context, many=False)
        return serializer.data
    
    def get_subject_result(self, obj):
        subject_result = SubjectResult.objects.filter(student_result=obj)
        serializer = SubjectResultSerializer(
            instance=subject_result, many=True)
        return serializer.data
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['subject_result'] = self.get_subject_result(instance)
        return representation
    
    def create(self, validated_data):
        subject_result_data = validated_data.pop('subject_result', [])
        result = StudentResult.objects.create(**validated_data)
        for subject_result_data in subject_result_data:
            subject_result_data['student_result_id'] = result.id
            SubjectResult.objects.create(**subject_result_data)
        return result
    
    
    def validate(self, data):
        student = data.get('student')
        student_class = data.get('student_class')
        term = data.get('term')
        session = data.get('session')
        
        if self.instance:
            if StudentResult.objects.filter(
                student=student,
                student_class=student_class,
                term=term,
                session=session,
            ).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError(
                    "A result for this student, class, term, and session already exists."
                )               
        else:
            if StudentResult.objects.filter(
                student=student,
                student_class=student_class,
                term=term,
                session=session
            ).exists():
                raise serializers.ValidationError(
                    "A result for this student, class, term, and session already exists.")
          
        return data
    
    
              
    def update(self, instance, validated_data):
        # Check if subject_result is explicitly passed
        if 'subject_result' in validated_data:
            subject_result_data = validated_data.pop('subject_result', [])         
            
            # Update the Student Result instance
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()
            
            # Handling SubjectResult updates
            existing_subject_result = {
                sr.id: sr for sr in instance.subjectresult_set.all()
            }
            
            for sr_data in subject_result_data:
                sr_id = sr_data.get('id')
                if sr_id and sr_id in existing_subject_result:
                    sr_instance = existing_subject_result.pop(sr_id)
                    for attr, value in sr_data.items():
                        setattr(sr_instance, attr, value)
                    sr_instance.save()
                else:
                    sr_data['student_result'] = instance
                    SubjectResult.objects.create(**sr_data)
            
            # Delete SubjectResults that were not in the update list
            for sr in existing_subject_result.values():
                sr.delete()
        else:
            # Only update the result fields, not subject results
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()
        
        return instance
    
    
class FilterStudentResultSerializer(serializers.Serializer):
    student_class = serializers.CharField(required=False, allow_blank=True)
    term = serializers.CharField(required=False, allow_blank=True)
    session = serializers.CharField(required=False, allow_blank=True)
   
    
    
    
    
# ---------------------------------------------- Student Evaluation (Weekly) ------------------------------------------- #
# Stores weekly scores per subject per term/session, with criteria (assignment, classwork, participation, etc.)
# and flags for strong subjects / subjects to improve.

class TeacherEvaluationFeaturesSerializer(serializers.ModelSerializer):
    teacher_details = serializers.SerializerMethodField()
    class Meta:
        model = TeacherEvaluationFeatures
        fields = [
            'id',
            'teacher',
            'teacher_details',
            'feature_name',
            'is_active',
            'created_at'
        ]
        
    def get_teacher_details(self, obj):
        teacher = obj.teacher
        serializer = ShortStaffSerializer(
            instance=teacher, many=False)
        return serializer.data
    
    
class SubjectFeatureScoreSerializer(serializers.ModelSerializer):
    feature_name = serializers.CharField(source='feature.feature_name')

    class Meta:
        model = SubjectFeatureScore
        fields = [
            'feature',
            'feature_name',
            'score',
            'created_at'
        ]
    

class SubjectWeeklyScoreSerializer(serializers.ModelSerializer):
    subject_name = serializers.SerializerMethodField()
    features = serializers.SerializerMethodField()
    class Meta:
        model = SubjectWeeklyScore
        fields = [
            'id',
            'student_evaluation',
            'subject',
            'subject_name', 
            'total_score',
            'features',
            'created_at',
        ]
        
    def get_subject_name(self, obj):
        subject = obj.subject
        serializer = ShortSubjectsSerializer(instance=subject, many=False)
        return serializer.data
    
    def get_features(self, obj):
        return [
            {
                fs.feature.feature_name: fs.score
            }
            for fs in obj.feature_scores.all()
        ]
    
    
class StudentEvaluationSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    subject_evaluation = SubjectWeeklyScoreSerializer(many=True, required=False)
    teacher_name = serializers.SerializerMethodField()
    term_name = serializers.SerializerMethodField()
    session_name = serializers.SerializerMethodField()
    class_name = serializers.SerializerMethodField()
    
    class Meta:
        model = StudentEvaluation
        fields = [
            'id',
            'student',
            'student_name',
            'teacher',
            'teacher_name',
            'student_class',
            'class_name',
            'term',
            'term_name',
            'session',
            'session_name',
            'week_number',
            'strong_subjects',
            'subjects_to_improve',
            'score_bench_mark',
            'subject_evaluation',
            'created_at',
            'updated_at',    
        ]
        
    def get_teacher_name(self, obj):
        teacher = obj.teacher
        serializer = ShortStaffSerializer(
            instance=teacher, many=False)
        return serializer.data
    
    
    def get_class_name(self, obj):
        student_class = obj.student_class
        serializer = ShortStudentClassSerializer(
            instance=student_class, many=False)
        return serializer.data
    
    def get_term_name(self, obj):
        term = obj.term
        serializer = TermSerializer(
            instance=term, many=False)
        return serializer.data
    
    def get_session_name(self, obj):
        session = obj.session
        serializer = ShortSessionSerializer(
            instance=session, many=False)
        return serializer.data
                                          
    def get_student_name(self, obj):
        student = obj.student
        serializer = ShortStudentSerializer(instance=student, context=self.context, many=False)
        return serializer.data
    
    def get_subject_evaluation(self, obj):
        subject_evaluation = SubjectWeeklyScore.objects.filter(student_evaluation=obj)
        serializer = SubjectWeeklyScoreSerializer(
            instance=subject_evaluation, many=True)
        return serializer.data
    
    
    def create(self, validated_data):
        subject_evaluation_data = validated_data.pop('subject_evaluation', [])
        evaluation = StudentEvaluation.objects.create(**validated_data)

        for subject_data in subject_evaluation_data:
            features_data = subject_data.pop('features', [])  # 👈 pop features out
            subject_data['student_evaluation_id'] = evaluation.id
            subject_score = SubjectWeeklyScore.objects.create(**subject_data)

            for feature_item in features_data:
                feature_id = feature_item.get('feature')
                score = feature_item.get('score')

                feature_obj = TeacherEvaluationFeatures.objects.get(id=feature_id)
                SubjectFeatureScore.objects.create(
                    subject_weekly_score=subject_score,
                    feature=feature_obj,
                    score=score
                )

        return evaluation
    
    def update(self, instance, validated_data):
        # 1️⃣ Update simple StudentEvaluation fields
        subject_evaluation_data = validated_data.pop('subject_evaluation', [])
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # 2️⃣ Update SubjectWeeklyScore & SubjectFeatureScore
        for subject_data in subject_evaluation_data:
            subject_id = subject_data.get('id')
            features_data = subject_data.pop('features', [])

            # Update SubjectWeeklyScore
            subject_score = SubjectWeeklyScore.objects.get(id=subject_id, student_evaluation=instance)
            for key, value in subject_data.items():
                setattr(subject_score, key, value)
            subject_score.save()

            # Update feature scores
            for feature_item in features_data:
                feature_id = feature_item.get('feature')
                score = feature_item.get('score')
                
                # Get TeacherEvaluationFeature instance
                feature_obj = TeacherEvaluationFeatures.objects.get(id=feature_id)

                # Update or create SubjectFeatureScore
                sub_feature_score, created = SubjectFeatureScore.objects.update_or_create(
                    subject_weekly_score=subject_score,
                    feature=feature_obj,
                    defaults={'score': score}
                )

        return instance
    
    
 
class ValidateStudentEvaluationParamtersSerializer(serializers.Serializer):
    student = serializers.CharField()
    student_class = serializers.CharField()
    term = serializers.CharField()
    session = serializers.CharField()
    week_number = serializers.CharField()
    
    





           
# E-result
class EResultSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    student_class_name = serializers.SerializerMethodField()
    term_name = serializers.SerializerMethodField()
    session_name = serializers.SerializerMethodField()
    
    class Meta:
        model = EResult
        fields = [
            'id',
            'student',
            'student_name',
            'student_class', 
            'student_class_name',
            'term',
            'term_name',
            'session',
            'session_name',
            'result',
            'date'
        ]
        
    def get_student_name(self, obj):
        student = obj.student
        serializer = ShortStudentSerializer(instance=student, context=self.context, many=False)
        return serializer.data
    
    def get_student_class_name(self, obj):
        student_class = obj.student_class
        serializer = ShortStudentClassSerializer(
            instance=student_class, many=False)
        return serializer.data
    
    def get_term_name(self, obj):
        term = obj.term
        serializer = TermSerializer(
            instance=term, many=False)
        return serializer.data
    
    def get_session_name(self, obj):
        session = obj.session
        serializer = ShortSessionSerializer(
            instance=session, many=False)
        return serializer.data


       
class SchemeOfWorkSerializer(serializers.ModelSerializer):
    subject_name = serializers.SerializerMethodField()
    term_name = serializers.SerializerMethodField()
    student_class_name = serializers.SerializerMethodField()
    teacher_name =  serializers.SerializerMethodField()
    class Meta:
        model = SchemeOfWork
        fields = [
            'id',
            'teacher',
            'teacher_name',
            'subject',
            'subject_name',
            'term',
            'term_name',
            'student_class', 
            'student_class_name',
            'scheme',
            'date',
        ]
        
    def get_subject_name(self, obj):
        subject = obj.subject
        serializer = ShortSubjectsSerializer(subject, many=False)
        return serializer.data
    
    def get_term_name(self, obj):
        term = obj.term
        serializer = TermSerializer(
            instance=term, many=False)
        return serializer.data
    
    def get_student_class_name(self, obj):
        student_class = obj.student_class
        serializer = ShortStudentClassSerializer(
            instance=student_class, many=False)
        return serializer.data
    
    def get_teacher_name(self, obj):
        teacher = obj.teacher
        serializer = ShortStaffSerializer(
            instance=teacher, many=False)
        return serializer.data   
    

class AssignmentSerializer(serializers.ModelSerializer):
    teacher_name =  serializers.SerializerMethodField()
    subject_name = serializers.SerializerMethodField()
    student_class_name = serializers.SerializerMethodField()
    class Meta:
        model = Assignment
        fields = [
            "id",
            'teacher',
            'teacher_name',
            'student_class',
            'student_class_name',
            'subject',
            'subject_name',
            'assignment_name',
            'assignment_code', 
            'instructions',
            'due_date',
            'points',
            'assignment_file',
            'assignment_photo',
            'date'
        ] 
        
        
    def get_subject_name(self, obj):
        subject = obj.subject
        serializer = ShortSubjectsSerializer(subject, many=False)
        return serializer.data
    
    
    def get_teacher_name(self, obj):
        teacher = obj.teacher
        serializer = ShortStaffSerializer(
            instance=teacher, many=False)
        return serializer.data   
    
    def get_student_class_name(self, obj):
        student_class = obj.student_class
        serializer = ShortStudentClassSerializer(
            instance=student_class, many=False)
        return serializer.data   
        

class AssignmentSubmissionSeralizer(serializers.ModelSerializer):
    teacher_name = serializers.SerializerMethodField()
    student_name = serializers.SerializerMethodField()
    subject_name = serializers.SerializerMethodField()
    class Meta:
        model = AssignmentSubmission
        fields = [
            'id',
            'teacher_assignment',
            'teacher_name',
            'subject',
            'subject_name',
            'assignment_note',
            'assignment_code',
            'student',
            'student_name',
            'date_submitted',
            'submission_file',
            'submission_photo',
            'grade',
            'feedback'
        ]
        
    def get_teacher_name(self, obj):
        teacher = obj.teacher_assignment
        serializer = ShortStaffSerializer(
            instance=teacher, many=False)
        return serializer.data 
        
    
    def get_student_name(self, obj):
        student = obj.student
        serializer = ShortStudentSerializer(
            instance=student, context=self.context, many=False)
        return serializer.data
    
    def get_subject_name(self, obj):
        subject = obj.subject
        serializer = ShortSubjectsSerializer(subject, many=False)
        return serializer.data
    

class UpdateAssignmentSubmissionSeralizer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentSubmission
        fields = [
            'student',
            'grade',
            'feedback',
        ]
        

class ClassTimetableSerializer(serializers.ModelSerializer):
    teacher_name = serializers.SerializerMethodField()
    student_class_name = serializers.SerializerMethodField()    
    
    class Meta:
        model = ClassTimetable
        fields = [
            'id',
            'student_class',
            'student_class_name',
            'teacher',
            'teacher_name',
            'class_timetable',
            'created_at',
        ]
    def get_teacher_name(self, obj):
        teacher = obj.teacher
        serializer = ShortStaffSerializer(
            instance=teacher, many=False)
        return serializer.data 
        
    def get_student_class_name(self, obj):
        student_class = obj.student_class
        serializer = ShortStudentClassSerializer(
            instance=student_class, many=False)
        return serializer.data



    
# ------------------------------------ Account --------------------------------------#
class InitializePaymentSerializer(serializers.Serializer):
    email = serializers.EmailField()
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)


class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = [
            'id',
            'name',
            'description'
        ]


class SchoolFeesSerializer(serializers.ModelSerializer):
    session_name = serializers.SerializerMethodField()
    term_name = serializers.SerializerMethodField()
    student_class_name = serializers.SerializerMethodField()
    
    class Meta:
        model = SchoolFees
        fields = [
            'id',
            'fee_choice',
            'amount',
            'student_class',
            'student_class_name',
            'session',
            'session_name',
            'term',
            'term_name',
            'description',
            'date'
        ]
    
    def get_student_class_name(self, obj):
        student_class = obj.student_class
        serializer = ShortStudentClassSerializer(
            instance=student_class, many=False)
        return serializer.data
    
    def get_term_name(self, obj):
        term = obj.term
        serializer = TermSerializer(
            instance=term, many=False)
        return serializer.data
    
    def get_session_name(self, obj):
        session = obj.session
        serializer = ShortSessionSerializer(
            instance=session, many=False)
        return serializer.data
    
class GetSchoolFeesAmountSerializer(serializers.Serializer):
    fee_type = serializers.CharField()
    session = serializers.CharField()
    term = serializers.CharField()
    student_class = serializers.CharField()


class PaymentSchoolFeesSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    fee_type_name = serializers.SerializerMethodField()
    payment_method_name = serializers.SerializerMethodField()
    
    class Meta:
        model = PaymentSchoolFees
        fields = [
            'id',
            'student',
            'student_name',
            'transaction_id',
            'fee_type',
            'fee_type_name',
            'payment_method',
            'payment_method_name',
            'fee_receipt',
            'status',
            'date'
        ]
    def get_student_name(self, obj):
        student = obj.student
        serializer = ShortStudentSerializer(instance=student, context=self.context, many=False)
        return serializer.data
    
    def get_fee_type_name(self, obj):
        fee_type = obj.fee_type
        serializer = SchoolFeesSerializer(instance=fee_type, many=False)
        return serializer.data
    
    def get_payment_method_name(self, obj):
        payment_method = obj.payment_method
        serializer = PaymentMethodSerializer(instance=payment_method, many=False)
        return serializer.data
    
class PaymentSchoolFeesUpdateStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentSchoolFees
        fields = [
            'status'
        ]
        
        
        
class BillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bills
        fields = [
            'id',
            'bill_name',
            'amount',
            'description',
            'created_at'
        ]
        
        
class GetBillsAmountSerializer(serializers.Serializer):
    bill_type = serializers.CharField()


class BillPaymentSerializer(serializers.ModelSerializer):
    bill_name = serializers.SerializerMethodField()
    student_name = serializers.SerializerMethodField()
    payment_method_name = serializers.SerializerMethodField()
    class Meta:
        model = BillPayment
        fields = [
            'id',
            'student',
            'student_name',
            'transaction_id',
            'bill',
            'bill_name',
            'payment_method',
            'payment_method_name',
            'status',
            'bill_receipt',
            'date'
        ]
    
    def get_payment_method_name(self, obj):
        payment_method = obj.payment_method
        serializer = PaymentMethodSerializer(instance=payment_method, many=False)
        return serializer.data
    def get_bill_name(self, obj):  
        bill = obj.bill
        serializer = BillsSerializer(instance=bill, many=False)
        return serializer.data
    
    def get_student_name(self, obj):
        student = obj.student
        serializer = ShortStudentSerializer(instance=student, context=self.context, many=False)
        return serializer.data
    
class BillPaymentUpdateStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillPayment
        fields = [
            'status'
        ]
        
class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = [
            'id',
            'bank_name',
            'account_number',
            'account_name',
            'bank_img',
            'is_active',
            'description',
        ]
        


        
# --------------------------------------------- E commerce ------------------------------------ #

class ECommerceFrontImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ECommerceFrontImage
        fields = [
            'id',
            'image',
            'created_at',
        ]
        
        
class SpecialProductSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()
    class Meta:
        model = SpecialProduct
        fields = [
            'id',
            'product',
            'product_name',
            'created_at'
        ]
        
    def get_product_name(self, obj):  
        product = obj.product
        serializer = ProductSerializer(instance=product, many=False, context=self.context)
        return serializer.data

class ProductMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductMeasurement
        fields = [
            'id',
            'measurement',
            'created_at'
        ]
        
        
        
class ShortProductMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductMeasurement
        fields = [
            'id',
            'measurement',
        ]


class ProductCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategories
        fields = [
            'id',
            'category_id',
            'name',
            'description',
            'is_active',
            'created_at'
        ]
        
class ShortProductCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategories
        fields = [
            'name',
            'is_active'
        ]
        
        
class ProductSerializer(serializers.ModelSerializer):
    categories_name = serializers.SerializerMethodField()
    measurement_name = serializers.SerializerMethodField()
    is_favourite = serializers.SerializerMethodField()
    
    
    
    class Meta:
        model = Product
        fields = [
            'id',
            'product_id',
            'categories',
            'categories_name',
            'name',
            'description',
            'price',
            'discount_price',
            'rating',
            'measurement',
            'measurement_name',
            'image',
            'image_two',
            'image_three',
            'is_active',
            'created_at',
            'is_favourite',
        ]
        
    def get_categories_name(self, obj):  
        categories = obj.categories
        serializer = ShortProductCategoriesSerializer(instance=categories, many=True)
        return serializer.data
    
    def get_measurement_name(self, obj):
        measurement = obj.measurement
        serializer = ShortProductMeasurementSerializer(instance=measurement, many=True)
        return serializer.data
    
    def get_is_favourite(self, obj):
        user = self.context["request"].user
        if not user.is_authenticated:
            return False

        return FavouriteProduct.objects.filter(user=user, product=obj).exists()


class FavouriteProductSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()
    
    class Meta:
        model = FavouriteProduct
        fields = [
            'id',
            'user',
            'product',
            'product_name',
            'created_at'
        ]
        
    def get_product_name(self, obj):  
        product = obj.product
        serializer = ProductSerializer(instance=product, many=False, context=self.context)
        return serializer.data
    
    
class RemoveFavouriteSerializer(serializers.Serializer):
    product_id = serializers.CharField()
    
    
class PopularProductSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()
    
    class Meta:
        model = PopularProduct
        fields = [
            'id',
            'product',
            'product_name',
            'created_at'
        ]
    def get_product_name(self, obj):  
        product = obj.product
        serializer = ProductSerializer(instance=product, many=False, context=self.context)
        return serializer.data
        
        
class CartSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()
    measurement_name = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = [
            'id',
            'user',
            'product',
            'product_name',
            'measurement',
            'measurement_name',
            'quantity',
            'total_price',
            'date',
        ]
        
        
    def get_product_name(self, obj):  
        product = obj.product
        serializer = ProductSerializer(instance=product, many=False, context=self.context)
        return serializer.data
    
    def get_measurement_name(self, obj):
        measurement = obj.measurement
        serializer = ShortProductMeasurementSerializer(instance=measurement, many=False)
        return serializer.data
    
    

class EditingCartItemSerializer(serializers.Serializer):
    product = serializers.IntegerField()
    
        
class OrderSerializer(serializers.ModelSerializer):
    user_details = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id',
            'user',
            'user_details',
            'products',
            'status',
            'reference',
            'created_at',
        ]
        
    def get_user_details(self, obj):
        user = obj.user
        serializer = UsersSerializer(instance=user, many=False)
        return serializer.data
    



class CreateOrderSerializer(serializers.Serializer):
    ids = serializers.ListField(
        child=serializers.IntegerField(),  # Use UUIDField if your ID is UUID
        allow_empty=False
    )
    
    
    
    
    
    
class DeleteMultipleIDSerializer(serializers.Serializer):
    ids = serializers.ListField(
        child=serializers.IntegerField(), 
        allow_empty=False
    )
    
    def validate_ids(self, value):
        if not value:
            raise serializers.ValidationError("This field may not be empty.")
        return value
    
    
class DeleteMultipleUUIDSerializer(serializers.Serializer):
    ids = serializers.ListField(
        child=serializers.UUIDField(),  # Use UUIDField if your ID is UUID
        allow_empty=False
    )
    
    def validate_ids(self, value):
        if not value:
            raise serializers.ValidationError("This field may not be empty.")
        return value
    

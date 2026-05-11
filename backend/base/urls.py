from django.urls import path
from . import views
from .utils  import storage_usage_view

app_name = 'base'

urlpatterns = [
    path('', views.endpoints, name='endpoints'),
    path('storage-usage/', storage_usage_view, name='storage-usage'),
    path('storage-quota/', views.StorageQuotaView.as_view(), name='storage-quota'),
    
    # ---------------------- User -------------------------- #
    path('users/', views.UsersView.as_view(), name='users'),
    
    #students
    path('students/', views.StudentView.as_view(), name='students'),
    path('students/<str:pk>/', views.StudentRetrieveUpdateDestroy.as_view(), name='indiviual_students'),
    path('delete-multiple-students/', views.DeleteMultipleStudentsView.as_view(), name='delete_multiple_students'),
    
    #Staff
    path('staff/', views.StaffView.as_view(), name='staff'),
    path('staff/<str:pk>/', views.StaffRetrieveUpdateDestroy.as_view(), name='indiviual_staff'),
    path('delete-multiple-staff/', views.DeleteMultipleStaffView.as_view(), name='delete_multiple_staff'),
    
    #Hr
    path('hr/', views.HRView.as_view(), name='hr'),
    path('hr/<str:pk>/', views.HRRetrieveUpdateDestroy.as_view(), name='hr'),
    path('delete-multiple-hr/', views.DeleteMultipleHRView.as_view(), name='delete_multiple_hr'),
    
    #Bursary
    path('bursary/', views.BursaryView.as_view(), name='bursary'),
    #store keeper
    path('store_keeper/', views.StoreKeeperView.as_view(), name='store_keeper'),
    #other staff
    path('other-staff/', views.OtherStaffView.as_view(), name='other_staff'),
    #teacher
    path('teachers/', views.TeachersView.as_view(), name='teachers'),
    #academic officer
    path('academic-officer/', views.AcademicOfficerView.as_view(), name='academic_officer'),
    #exam officer
    path('result_officer/', views.ResultOfficerView.as_view(), name='exam_officer'),
    #parents
    path('parents/', views.ParentViews.as_view(), name='parents'),
    path('parents/<str:pk>/', views.ParentRetrieveUpdateDestory.as_view(), name='parents'),
    path('delete-multiple-parents/', views.DeleteMultipleParentsView.as_view(), name='delete_multiple_parents'),
    
    #-------------------------- Authentication -------------------------- #
    #login
    path('login/', views.LoginView.as_view(), name='login'),
    
    # Resfresh
    path('token/refresh/', views.CustomRefreshTokenView.as_view(), name='refresh token'),
    
    # Change password
    path('request-to-change-password-form/', views.RequestToChangePasswordFormView.as_view(), name='request_to_change_password_form'),
    path('request-to-change-password/', views.RequestToChangePasswordView.as_view(), name='request_to_change_password'),
    path('request-to-change-password/<str:pk>/update-status/', views.RequestToChangePasswordStatusView.as_view(), name='request_to_change_password-update-status'),
    path('delete-multiple-request-to-change-password/', views.DeleteMultipleRequestToChangePasswordView.as_view(), name='delete_multiple_request_to_change_password' ),
    path('change-password/', views.ChangePasswordFormSerializer.as_view(), name='change_password'),
    path('change-admin-password/', views.ChangeAdminPasswordFormView.as_view(), name='change_password'),
    
    #login
    path('logout/', views.LogoutView.as_view(), name='logout'),
    
    # Disable Account
    path('disable-account/', views.DisableAccountView.as_view(), name='disable-account'), 
    path('disable-account/<str:pk>/', views.DisableAccountRetrieveDestory.as_view(), name='individual-disable-account'),

    #Email
    path('email/', views.EmailView.as_view(), name='Email' ),
    path('email/<str:pk>/', views.EmailRetrieveDestory.as_view(), name='indivicual_email' ),
    path('delete-multiple-email/', views.DeleteMultipleEmailsView.as_view(), name='delete_multiple_email' ),
    path('list-emails/<str:email_type>/',
         views.ListEmailAddressesAPIView.as_view(), name='list-emails'),
    path('contact-us/', views.ContactUsView.as_view(), name='contact-us' ),
        
        
    #Subjects
    path('subjects/', views.SubjectsView.as_view(), name='subjects' ),
    path('subjects/<str:pk>/', views.SubjectsRetriveUpdateDestory.as_view(), name='indiviual_subjects' ),
    path('delete-multiple-subjects/', views.DeleteMultipleSubjectsView.as_view(), name='delete_multiple_subjects' ),
    
    #classes
    path('student-class/', views.StudentClassView.as_view(), name='student_class' ),
    path('student-class/<str:pk>/', views.StudentClassRetriveUpdateDestory.as_view(), name='indiviual_student_class' ),
    path('delete-multiple-student-class/', views.DeleteMultipleStudentClassView.as_view(), name='delete_multiple_student_class' ),
    path('student-in-class/', views.StudentsInClassView.as_view(), name='student_in_class' ),
    path('update-student-current-class/', views.UpdateStudentCurrentClassView.as_view(), name='update_student_current_class' ),

    #terms
    path('term/', views.TermView.as_view(), name='term' ),
    path('term/<str:pk>/', views.TermRetriveUpdateDestory.as_view(), name='indiviual_term' ),
    path('delete-multiple-term/', views.DeleteMultipleTermView.as_view(), name='delete_multiple_term' ),
    
    #Sesions
    path('session/', views.SessionView.as_view(), name='session' ),
    path('session/<str:pk>/', views.SessionRetriveUpdateDestory.as_view(), name='indiviual_session' ),
    path('delete-multiple-session/', views.DeleteMultipleSessionView.as_view(), name='delete_multiple_session' ),
    
    #Admin or HR Notification
    path('admin-or-hr-notification/', views.AdminorHRNotificationView.as_view(), name='admin_or_hr_notification' ),
    path('admin-or-hr-notification/<str:pk>/', views.AdminorHRNotificationRetrieveUpdateDestroy.as_view(), name='indiviual_admin_or_hr_notification' ),
    path('delete-multiple-admin-or-hr-notification/', views.DeleteMultipleAdminorHRNotificationView.as_view(), name='delete_multiple_admin_or_hr_notification' ),
    
    # Update Notification
    path('update-notification/<str:model_name>/<int:pk>', views.UpdateNotificationView.as_view(), name='update_notification' ),
    
    #School Notification
    path('school-notification/', views.SchoolNotificationView.as_view(), name='school_notification' ),
    path('school-notification/<str:pk>/', views.SchoolNotificationRetrieveUpdateDestroy.as_view(), name='indiviual_school_notification' ),
    path('delete-multiple-school-notification/', views.DeleteMultipleSchoolNotificationView.as_view(), name='delete_multiple_school_notification' ),
    path('school-notification-read/', views.ReadSchoolNotificationView.as_view(), name='school_notification-read' ),
    path('school-notification-unread/', views.UnReadSchoolNotificationView.as_view(), name='school_notification-unread' ),
    
    #Staff Notification
    path('staff-notification/', views.StaffNotificationView.as_view(), name='school_notification' ),
    path('staff-notification/<str:pk>/', views.StaffNotificationRetrieveUpdateDestroy.as_view(), name='indiviual_school_notification' ),
    path('delete-multiple-staff-notification/', views.DeleteMultipleStaffNotificationView.as_view(), name='delete_multiple_school_notification' ),
    path('staff-notification-read/', views.ReadStaffNotificationView.as_view(), name='staff_notification-read' ),
    path('staff-notification-unread/', views.UnReadStaffNotificationView.as_view(), name='staff_notification-unread' ),
    
    
    #Class Notification
    path('class-notification/', views.ClassNotificationView.as_view(), name='class_notification' ),
    path('class-notification/<str:pk>/', views.ClassNotificationRetrieveUpdateDestroy.as_view(), name='indiviual_class_notification' ),
    path('delete-multiple-class-notification/', views.DeleteMultipleClassNotificationView.as_view(), name='delete_multiple_class_notification' ),
    # path('filtered-class-notification/', views.FilteredClassNotification.as_view(), name='filtered_class_notification' ),
    path('class-notification-read/', views.ReadClassNotificationView.as_view(), name='class_notification-read' ),
    path('class-notification-unread/', views.UnReadClassNotificationView.as_view(), name='class_notification-unread' ),
    
    #School Event
    path('school-event/', views.SchoolEventView.as_view(), name='school_event' ),
    path('school-event/<str:pk>/', views.SchoolEventRetrieveUpdateDestroy.as_view(), name='indiviual_school_event' ),
    path('delete-multiple-school-event/', views.DeleteMultipleSchoolEventView.as_view(), name='delete_multiple_school_event' ),
    
    # ---------------------- Results -------------------------- #
    path('generate-scratch-cards/', views.GenerateScratchCardView.as_view(), name='generate-scratch-cards'),
    path('scratch-cards/', views.ScratchCardListView.as_view(), name='scratch-cards'),
    path('scratch-cards/<str:pk>/', views.ScratchCardRetrieveUpdateDestroy.as_view(), name='indiviual_scratch_card'),
    path('delete-multiple-scratch-cards/', views.DeleteMultipleScratchCardView.as_view(), name='delete_multiple_scratch_cards'),
    path('student-result/', views.StudentResultListCreateApiView.as_view(), name='student_result'),
    path('student-result/<str:pk>/', views.StudentResultRetrieveUpdateDestroyApiView.as_view(), name='result-details'),
    path('check-result/', views.CheckStudentResultView.as_view(), name='check_result'),
    path('filter-result/', views.FilterResultView.as_view(), name='filter_result'),
    path('delete-multiple-student-result/', views.DeleteMultipleStudentResultView.as_view(), name='delete_multiple_student_result'),
    path('subject-result/', views.SubjectResultListCreateApiView.as_view(), name='subject_result'),
    path('subject-result/<str:pk>/', views.SubjectResultRetrieveUpdateDestroyApiView.as_view(), name='subject_result_details'),
    
    
    #E-result
    path('e-result/', views.EResultView.as_view(), name='e_result'),
    path('e-result/<str:pk>/', views.EResultRetrieveUpdateDestroyApiView.as_view(), name='indiviual_e_result'),
    path('delete-multiple-e-result/', views.DeleteMultipleEResultView.as_view(), name='delete_multiple_e_result'),
    path('check-e-result/', views.CheckEResultView.as_view(), name='check_e_result'),
    path('filter-e-result/', views.FilterEResultView.as_view(), name='filter_e_result'),

    # ---------------------- End -------------------------- #
    
    
    # TeacherEvaluationFeatures
    path('teacher-evaluation-features/', views.TeacherEvaluationFeatureListCreateView.as_view()),
    path('teacher-evaluation-features/<int:pk>/', views.TeacherEvaluationFeatureRetrieveUpdateDestroyView.as_view()),

    # SubjectWeeklyScore
    path('subject-weekly-scores/', views.SubjectWeeklyScoreListCreateView.as_view()),
    path('subject-weekly-scores/<int:pk>/', views.SubjectWeeklyScoreRetrieveUpdateDestroyView.as_view()),

    # SubjectFeatureScore
    path('subject-feature-scores/', views.SubjectFeatureScoreListCreateView.as_view()),
    path('subject-feature-scores/<int:pk>/', views.SubjectFeatureScoreRetrieveUpdateDestroyView.as_view()),

    # StudentEvaluation
    path('student-evaluations/', views.StudentEvaluationListCreateView.as_view()),
    path('student-evaluations/<uuid:pk>/', views.StudentEvaluationRetrieveUpdateDestroyView.as_view()),
    path('validate-student-evaluations/', views.ValidateStudentEvaluationParametersView.as_view()),
    
    #scheme of work
    path('scheme-of-work/', views.SchemeOfWorkView.as_view(), name='scheme_of_work' ),
    path('scheme-of-work/<str:pk>/', views.SchemeOfWorkRetrieveUpdateDestroy.as_view(), name='indiviual_scheme_of_work' ),
    path('delete-multiple-scheme-of-work/', views.DeleteMultipleSchemeOfWorkView.as_view(), name='delete_multiple_scheme_of_work' ),
    path('scheme-of-work-filter/', views.FilteredSchemeOfWorkView.as_view(), name='scheme_of_work' ),
    
    #assignment
    path('assignment/', views.AssignmentView.as_view(), name='assignment' ),
    path('assignment/<str:pk>/', views.AssignmentRetrieveUpdateDestroy.as_view(), name='indiviual_assignment' ),
    path('delete-multiple-assignment/', views.DeleteMultipleAssignmentView.as_view(), name='delete_multiple_assignment' ),
    
    #assignment submission
    path('assignment-submission/', views.AssignmentSubmissionView.as_view(), name='assignment_submission' ),
    path('assignment-submission/<str:pk>/', views.AssignmentSubmissionRetrieveUpdateDestroy.as_view(), name='indiviual_assignment_submission' ),
    path('assignment-submission/<str:pk>/update/', views.UpdateAssignmentSubmissionView.as_view(), name='assignment_update' ),
    path('delete-multiple-assignment-submssion/', views.DeleteMultipleAssignmentSubmssionView.as_view(), name='delete_multiple_assignment_submission' ),
    
    #class timetable
    path('class-timetable/', views.ClassTimetableView.as_view(), name='class_timetable' ),
    path('class-timetable/<str:pk>/', views.ClassTimetableRetrieveUpdateDestroy.as_view(), name='indiviual_class_timetable' ),
    path('delete-multiple-class-timetable/', views.DeleteMultipleClassTimetableView.as_view(), name='delete_multiple_class_timetable' ),
    
    
    # --------------------------------------- Account ------------------------------------
    #intializepayment
    path('initialize-payment/', views.InitializePaymentView.as_view(), name='initialize_payment' ),
    
    
    # payment method
    path('payment-method/', views.PaymentMethodView.as_view(), name='payment_method' ),
    path('payment-method/<str:pk>/', views.PaymentMethodRetrieveUpdateDestroy.as_view(), name='indiviual_payment_method' ),
    path('delete-multiple-payment-method/', views.DeleteMultiplePaymentMethodView.as_view(), name='delete_multiple_payment_method' ),
    
    #school fees
    path('school-fees/', views.SchoolFeesView.as_view(), name='school_fees' ),
    # path('school-fees/filter/', views.FilteredSchoolFees.as_view(), name='filter_school_fees' ),
    # path('school-fees/pta/filter/', views.FilteredSchoolFeesPTA.as_view(), name='filter_school_fees' ),
    # path('school-fees/acceptance/filter/', views.FilteredSchoolFeesAcceptance.as_view(), name='filter_school_fees' ),
    path('school-fees/<str:pk>/', views.SchoolFeesRetrieveUpdateDestroy.as_view(), name='indiviual_school_fees' ),
    path('delete-multiple-school-fees/', views.DeleteMultipleSchoolFeesView.as_view(), name='delete_multiple_school_fees' ),
   
    
    #Get School Fees Amount
    path('get-school-fees-amount/', views.GetSchoolFeesAmountView.as_view(), name='get_school_fees_amount' ),
    
    #payment school fees 
    path('payment-school-fees/', views.PaymentSchoolFeesView.as_view(), name='payment_school_fees' ),
    path('payment-school-fees/pending/', views.PendingPaymentSchoolFeesView.as_view(), name='pending_payment_school_fees' ),
    path('payment-school-fees/declined/', views.DeclinedPaymentSchoolFeesView.as_view(), name='declined_pending_payment_school_fees' ),
    path('payment-school-fees/approved/', views.ApprovedPaymentSchoolFeesView.as_view(), name='declined_pending_payment_school_fees' ),
    path('payment-school-fees/<str:pk>/', views.PaymentSchoolFeesRetrieveUpdateDestroy.as_view(), name='indiviual_payment_school_fees' ),
    path('delete-multiple-payment-school-fees/', views.DeleteMultiplePaymentSchoolFeesView.as_view(), name='delete_multiple_payment_school_fees' ),
    path('payment-school-fees/<str:pk>/update-status/', views.PaymentSchoolFeesUpdateView.as_view(), name='update_payment_school_fees_status' ), 
    
    #Bills
    path('bills/', views.BillsView.as_view(), name='bills' ),
    path('bills/<str:pk>/', views.BillsRetrieveUpdateDestroy.as_view(), name='indiviual_bills' ),
    path('delete-multiple-bills/', views.DeleteMultipleBillsView.as_view(), name='delete_multiple_bills' ),

    #bills payment
    path('bills-payment/', views.BillsPaymentView.as_view(), name='bills_payment' ),
    path('bills-payment/pending/', views.PendingBillsPaymentView.as_view(), name='pending_bills_payment' ),
    path('bills-payment/declined/', views.DeclinedBillsPaymentView.as_view(), name='declined_bills_payment' ),
    path('bills-payment/approved/', views.ApprovedBillsPaymentView.as_view(), name='approved_bills_payment' ),
    path('bills-payment/<str:pk>/', views.BillsPaymentRetrieveUpdateDestroy.as_view(), name='indiviual_bills_payment' ),
    path('delete-multiple-bills-payment/', views.DeleteMultipleBillsPaymentView.as_view(), name='delete_multiple_bills_payment' ),
    path('bills-payment/<str:pk>/update-status/', views.BillsPaymentUpdateView.as_view(), name='update_bills_payment_status' ),
    
    #Bank account
    path('bank-account/', views.BankAccountView.as_view(), name='bank_account' ),
    path('bank-account/active', views.ActiveBankAccountView.as_view(), name='active_bank_account' ),
    path('bank-account/<str:pk>/', views.BankAccountRetrieveUpdateDestory.as_view(), name='indiviual_bank_account' ),
    path('delete-multiple-bank-account/', views.DeleteMultipleBankAccountView.as_view(), name='delete_multiple_bank_account' ),
    
    # ------------------------------------------ E commerce ------------------------------------------ 
    #E-commerce image
    path('e-commerce-image/', views.ECommerceFrontImageView.as_view(), name='e-commerce-image'),
    path('e-commerce-image/<str:pk>/', views.ECommerceFrontImageRetrieveUpdateDestroy.as_view(), name='individual-e-commerce-image'),
    path('delete-multiple-e-commerce-image/', views.DeleteMultipleEcommerceFrontImage.as_view(), name='delete-multiple-e-commerce-image'),
    
    
    # Special product
    path('special-product/', views.SpecialProductView.as_view(), name='special-product'),
    path('special-product/<str:pk>/', views.SpecialProductRetrieveUpdateDestroy.as_view(), name='individual-special-product'),
    path('delete-multiple-special-product/', views.DeleteMultipleSpecialProduct.as_view(), name='delete-multiple-special-product'),
    
    
    # Product Measurement
    path('product-measurement/', views.ProductMeasurementView.as_view(), name='product-measurement'),
    path('product-measurement/<str:pk>/', views.ProductMeasurementRetrieveUpdateDestroy.as_view(), name='individual-product-measurement'),
    path('delete-multiple-product-measurement/', views.DeleteMultipleProductMeasurementView.as_view(), name='delete-multiple-product-measurement'),
    
    # Product Categories
    path('product-categories/', views.ProductCategoriesView.as_view(), name='product-categories'),
    path('product-categories/<str:pk>/', views.ProductCategoriesRetrieveUpdateDestroy.as_view(), name='individual-product-categories'),
    path('delete-multiple-product-categories/', views.DeleteMultipleProductCategoriesView.as_view(), name='delete-multiple-product-categories'),
    
    # Products
    path('product/', views.ProductView.as_view(), name='product'),
    path('product/<str:pk>/', views.ProductRetrieveUpdateDestroy.as_view(), name='individual-product'),
    path('delete-multiple-product/', views.DeleteMultipleProductView.as_view(), name='delete-multiple-product'),
    
    #Favorite Products
    path('favorite-products/', views.FavoriteProductsView.as_view(), name='favorite-products'),
    path('remove-favourite-product/', views.RemoveFavoriteProductView.as_view(), name='remove-favorite-products'),
    path('favorite-products/<str:pk>/', views.FavoriteProductsRetrieveUpdateDestroy.as_view(), name='individual-favorite-products'),
    
    #Popular Product
    path('popular-product/', views.PopularProductView.as_view(), name='popular-product'),
    path('popular-product/<str:pk>/', views.PopularProductRetrieveUpdateDestroy.as_view(), name='individual-popular-product'),
    path('delete-multiple-popular-product/', views.DeleteMultiplePopularProductView.as_view(), name='delete-multiple-popular-product'),
    
    
    #Cart
    path('cart/', views.CartView.as_view(), name='cart'),
    path('cart/<str:pk>/', views.CartRetrieveUpdateDestroy.as_view(), name='individual-cart'),
    path('increase-cart-product-quantity/', views.IncreaseCartProductQuantityView.as_view(), name='increase-cart-product-quantity'),
    path('decrease-cart-product-quantity/', views.DecreaseCartProductQuantityView.as_view(), name='decrease-cart-product-quantity'),
    path('remove-cart-product/', views.RemoveCartProductView.as_view(), name='remove-cart-product'),
    
    #Order
    path('webhook/paystack/', views.PaystackWebhookView.as_view(), name='paystack-webhook'),
    path('create-order/', views.CreateOrderView.as_view(), name='create-order'),
    path('order/', views.OrderView.as_view(), name='order'),
    
    #current User
    path('me/', views.CurrentUserView.as_view(), name='current-user'),
    
]
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/models/student_details.dart';
import 'package:mobile_app/session_active.dart';

class StudentDetailsNotifer extends StateNotifier<StudentDetails> {
  StudentDetailsNotifer() : super(StudentDetails.empty());

  Future<String> fetchStudentDetails(BuildContext context) async {
    final userId = await AuthService.getUserId();
    final token = await AuthService.getAccessToken();
    print(userId);

    try {
      final response = await http.get(
        Uri.parse('https://school.amanilightequity.com/api/students/$userId/'),
        headers: {'Authorization': 'Bearer $token'},
      );

      if(!mounted) return '';
      bool sessionActive = await SessionActive.handleSession(context, response);
      if(!sessionActive) return '';

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        state = StudentDetails.fromJson(data);
        return 'success';
      } else {
        final errorData = jsonDecode(response.body);
        final errorMessages = errorData.values.join(", ");
        print(errorMessages);
        return 'Failed to load student details... Try again';
      }
    } catch (e, stackTrace) {
      print('Unexpected error occurred: $e');
      print('Stack trace: $stackTrace');
      return 'Failed to load student details... Try again';
    }
  }

  Future<String> updateStudentDetails(Map<String, dynamic> details, BuildContext context) async {
    final userId = await AuthService.getUserId();
    final token = await AuthService.getAccessToken();

    try {
      final response = await http.patch(
        Uri.parse('https://school.amanilightequity.com/api/students/$userId/'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: json.encode(details),
      );

      if(!mounted) return '';
      bool sessionActive = await SessionActive.handleSession(context, response);
      if(!sessionActive) return '';


      if (response.statusCode == 200 || response.statusCode == 201) {
        final data = json.decode(response.body);
        state = StudentDetails.fromJson(data);
        print('success');
        return 'success';
      } else {
        final errorData = jsonDecode(response.body);
        final errorMessages = errorData.values.join(", ");
        print(errorMessages);
        return errorMessages;
      }
    } catch (e, stackTrace) {
      print('Unexpected error occurred: $e');
      print('Stack trace: $stackTrace');
      return 'Unexpected error occured';
    }
  }
}

final studentDetailsProvider =
    StateNotifierProvider<StudentDetailsNotifer, StudentDetails>((ref) {
      return StudentDetailsNotifer();
    });

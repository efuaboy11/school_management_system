import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/models/assignment_submission.dart';
import 'package:mobile_app/session_active.dart';

class AssignmentSubmissionNotifier extends StateNotifier<List<AssignmentSubmission>> {
  AssignmentSubmissionNotifier() : super([]);

  Future<String> fetchAssignmentSubmission(String query, BuildContext context) async {
    final token = await AuthService.getAccessToken();
    final String baseUrl =
        'https://school.amanilightequity.com/api/assignment-submission/?search=$query';

    try {
      final response = await http.get(
        Uri.parse(baseUrl),
        headers: {'Authorization': 'Bearer $token'},
      );

      if(!mounted) return '';
      bool sessionActive = await SessionActive.handleSession(context, response);
      if(!sessionActive) return '';

      if (response.statusCode == 200) {
        final List data = json.decode(response.body);

        data.sort((a, b) {
          final dateA = DateTime.parse(a['date_submitted']);
          final dateB = DateTime.parse(b['date_submitted']);
          return dateB.compareTo(dateA); // descending
        });


        state = data.map((json) => AssignmentSubmission.fromJson(json)).toList();
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
      return 'Failed to load student details... Try again';
    }
  } 

  Future<String> addAssignmentSubmission(
      String teacher,  
      String subject,
      String submissionNote,
      String assignemtCode,
      dynamic submissionPhoto,
      dynamic submissionFile,
      BuildContext context
    ) async {
    final token = await AuthService.getAccessToken();
    final userId = await AuthService.getUserId();

    try {
      var request = http.MultipartRequest(
        'POST',
        Uri.parse(
          'https://school.amanilightequity.com/api/assignment-submission/',
        ),
      );
      request.headers['Authorization'] = 'Bearer $token';
      print(teacher);
      print(subject);
      print(submissionNote);
      print(assignemtCode);

      request.fields['teacher_assignment'] = teacher;
      request.fields['subject'] = subject;
      request.fields['assignment_note'] = submissionNote;
      request.fields['assignment_code'] = assignemtCode;
      request.fields['student'] = userId.toString();
      request.fields['grade'] = '';
      request.fields['feedback'] = '';
      if (submissionPhoto != null) {
        request.files.add(await http.MultipartFile.fromPath(
          'submission_photo',
          submissionPhoto.path,
        ));
      }
      if (submissionFile != null) {
        request.files.add(await http.MultipartFile.fromPath(
          'submission_file',
          submissionFile.path,
        ));
      }

      var response = await request.send();
      var responseBody = await response.stream.bytesToString();

      if (response.statusCode == 201) {
        fetchAssignmentSubmission('', context);
        return 'success';
      } else {
        final errorData = jsonDecode(responseBody);
        final errorMessages = errorData.values.join(", ");
        print(errorMessages);
        return errorMessages;
      }

    } catch (e, stackTrace) {
      print('Unexpected error occurred: $e');
      print('Stack trace: $stackTrace');
      return 'Failed to add assignment submission... Try again';
    }

  }


  Future<String> deleteAssignmentSubmission(int id, BuildContext context) async {
    final token = await AuthService.getAccessToken();

    try {
      final response = await http.delete(
        Uri.parse('https://school.amanilightequity.com/api/assignment-submission/$id/'),
        headers: {'Authorization': 'Bearer $token'},
      );

      if(!mounted) return '';
      bool sessionActive = await SessionActive.handleSession(context, response);
      if(!sessionActive) return '';

      if (response.statusCode == 204) {
        fetchAssignmentSubmission('', context);
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
      return 'Failed to delete assignment submission... Try again';
    }
  }


  Future<String> updateAssignmentSubmission(
      String teacher,  
      String subject,
      String submissionNote,
      String assignemtCode,
      dynamic submissionPhoto,
      dynamic submissionFile,


      int id, 
      BuildContext context
    ) async {
    final token = await AuthService.getAccessToken();

    try {
      var request = http.MultipartRequest(
        'PATCH',
        Uri.parse(
          'https://school.amanilightequity.com/api/assignment-submission/$id/',
        ),
      );
      request.headers['Authorization'] = 'Bearer $token';

      request.fields['teacher'] = teacher;
      request.fields['subject'] = subject;
      request.fields['assignment_note'] = submissionNote;
      request.fields['assignment_code'] = assignemtCode;
      if (submissionPhoto != null) {
        request.files.add(await http.MultipartFile.fromPath(
          'submission_photo',
          submissionPhoto.path,
        ));
      }
      if (submissionFile != null) {
        request.files.add(await http.MultipartFile.fromPath(
          'submission_file',
          submissionFile.path,
        ));
      }


      var response = await request.send();
      var responseBody = await response.stream.bytesToString();

      if (response.statusCode == 200) {
        fetchAssignmentSubmission('', context);
        return 'success';
      } else {
        final errorData = jsonDecode(responseBody);
        final errorMessages = errorData.values.join(", ");
        print(errorMessages);
        return errorMessages;
      }
    } catch (e, stackTrace) {
      print('Unexpected error occurred: $e');
      print('Stack trace: $stackTrace');
      return 'Failed to update assignment submission... Try again';
    }
  } 
}

final assignmentSubmissionProvider =
    StateNotifierProvider<AssignmentSubmissionNotifier, List<AssignmentSubmission>>((ref) {
      return AssignmentSubmissionNotifier();
    });
 
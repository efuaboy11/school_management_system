import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/models/result.dart';
import 'package:mobile_app/session_active.dart';

class ResultNotifer extends StateNotifier<Result> {
  ResultNotifer() : super(Result.empty());

  Future<String> fetchResult(BuildContext context, String resultID) async {
    final token = await AuthService.getAccessToken();
    try {
      final response = await http.get(
        Uri.parse('https://school.amanilightequity.com/api/student-result/$resultID/'),
        headers: {'Authorization': 'Bearer $token'},
      );

      if(!mounted) return '';
      bool sessionActive = await SessionActive.handleSession(context, response);
      if(!sessionActive) return '';

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        state = Result.fromJson(data);
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

  
}

final resultProvider =
  StateNotifierProvider<ResultNotifer, Result>((ref) {
    return ResultNotifer();
  });

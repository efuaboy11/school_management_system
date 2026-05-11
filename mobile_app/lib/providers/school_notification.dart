import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/models/school_notification.dart';
import 'package:mobile_app/session_active.dart';

class SchoolNotificationNotifier extends StateNotifier<List<SchoolNotification>> {
  SchoolNotificationNotifier() : super([]);

  Future<String> fetchSchoolNotification(String query, BuildContext context, String type) async {
    final token = await AuthService.getAccessToken();
    print('fetching data');
    String baseUrl = 'https://school.amanilightequity.com/api/school-notification/?search=$query';

    if(type == 'read'){
      baseUrl = 'https://school.amanilightequity.com/api/school-notification-read/?search=$query';
    }else if(type == 'unread'){
      baseUrl = 'https://school.amanilightequity.com/api/school-notification-unread/?search=$query';
    }

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
          final dateA = DateTime.parse(a['date']);
          final dateB = DateTime.parse(b['date']);
          return dateB.compareTo(dateA); // descending
        });


        state = data.map((json) => SchoolNotification.fromJson(json)).toList();
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
}

final schoolNotificationProvider =
    StateNotifierProvider<SchoolNotificationNotifier, List<SchoolNotification>>((ref) {
      return SchoolNotificationNotifier();
    });
 
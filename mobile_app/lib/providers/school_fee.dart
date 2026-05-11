import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/models/school_fee.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/session_active.dart';

class SchoolFeeNotifier extends StateNotifier<List<SchoolFee>> {
  SchoolFeeNotifier() : super([]);

  Future<String> fetchSchoolFeesPayment(String query, BuildContext context, String type) async {
    final token = await AuthService.getAccessToken();
    String baseUrl =
      'https://school.amanilightequity.com/api/payment-school-fees/?search=$query';

    if(type == 'approved'){
      baseUrl =
        'https://school.amanilightequity.com/api/payment-school-fees/approved/?search=$query';
    }else if(type == 'pending'){
      baseUrl =
        'https://school.amanilightequity.com/api/payment-school-fees/pending/?search=$query';
    }else if(type == 'declined'){
      baseUrl =
        'https://school.amanilightequity.com/api/payment-school-fees/declined/?search=$query';
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


        state = data.map((json) => SchoolFee.fromJson(json)).toList();
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

  Future<double> getTotalSchoolFeesAmount(BuildContext context, String type) async {
    double total = 0.0;

    final token = await AuthService.getAccessToken();
    String baseUrl =
      'https://school.amanilightequity.com/api/payment-school-fees/';


    if(type == 'approved'){
      baseUrl =
        'https://school.amanilightequity.com/api/payment-school-fees/approved/';
    }else if(type == 'pending'){
      baseUrl =
        'https://school.amanilightequity.com/api/payment-school-fees/pending/';
    }else if(type == 'declined'){
      baseUrl =
        'https://school.amanilightequity.com/api/payment-school-fees/declined/';
    }
    try {
      final response = await http.get(
        Uri.parse(baseUrl),
        headers: {'Authorization': 'Bearer $token'},
      );

      if(response.statusCode == 200) {
        final List data = json.decode(response.body);

        for (var item in data) {
          total += double.tryParse(item['fee_type_name']['amount'].toString()) ?? 0.0;
        }

        return total;


      } else {
        final errorData = jsonDecode(response.body);
        final errorMessages = errorData.values.join(", ");
        print(errorMessages);
        return 0.00;
      }
      

    } catch (e, stackTrace) {
      print('Unexpected error occurred: $e');
      print('Stack trace: $stackTrace');
      return 0.00;
    }
  }
}

final schoolFeesProvider =
    StateNotifierProvider<SchoolFeeNotifier, List<SchoolFee>>((ref) {
      return SchoolFeeNotifier();
    });
 
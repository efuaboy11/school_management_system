import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/models/store/front_image.dart';
import 'package:mobile_app/session_active.dart';

class FrontImagesNotifier extends StateNotifier<List<FrontImages>> {
  FrontImagesNotifier() : super([]);

  Future<String> fetchFrontImages(String query, BuildContext context) async {
    final token = await AuthService.getAccessToken();
    String baseUrl =
      'https://school.amanilightequity.com/api/e-commerce-image/';
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
          final dateA = DateTime.parse(a['created_at']);
          final dateB = DateTime.parse(b['created_at']);
          return dateB.compareTo(dateA); // descending
        });


        state = data.map((json) => FrontImages.fromJson(json)).toList();
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
      return 'Failed to load  details... Try again';
    }
  } 

}

final frontImagesProvider =
    StateNotifierProvider<FrontImagesNotifier, List<FrontImages>>((ref) {
      return FrontImagesNotifier();
    });
 
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/models/store/product.dart';
import 'package:mobile_app/session_active.dart';

class ProductNotifier extends StateNotifier<List<Product>> {
  ProductNotifier() : super([]);

  Future<String> fetchProduct(String query, String category, BuildContext context) async {
    final token = await AuthService.getAccessToken();

    String baseUrl =
      'https://school.amanilightequity.com/api/product/?status=active&&product_category=$category';
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


        state = data.map((json) => Product.fromJson(json)).toList();
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

final productProvider =
    StateNotifierProvider<ProductNotifier, List<Product>>((ref) {
      return ProductNotifier();
    });
 
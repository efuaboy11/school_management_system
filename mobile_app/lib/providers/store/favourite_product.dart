import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/models/store/favourite_product.dart';
import 'package:mobile_app/session_active.dart';

class FavouriteProductNotifier extends StateNotifier<List<FavouriteProduct>> {
  FavouriteProductNotifier() : super([]);

  Future<String> fetchFavouriteProduct(String query, BuildContext context) async {
    final token = await AuthService.getAccessToken();
    String baseUrl =
      'https://school.amanilightequity.com/api/favorite-products/';
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


        state = data.map((json) => FavouriteProduct.fromJson(json)).toList();
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


  Future<String> addFavouriteProduct(String product)async{
    final token = await AuthService.getAccessToken();
    final userId = await AuthService.getUserId();

    final Map<String, dynamic> payLoad = {
      'user': userId,
      'product': product,

    };

    try{
      final response = await http.post(
        Uri.parse('https://school.amanilightequity.com/api/favorite-products/'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: json.encode(payLoad),
      );

      if(response.statusCode == 200 || response.statusCode == 201){
        return 'success';
      }else{
        final errorData = jsonDecode(response.body);
        final errorMessages = errorData.values.join(", ");
        print(errorMessages);
        return errorMessages;
      }
    }catch(e, stackTrace){
      print('Unexpected error occurred: $e');
      print('Stack trace: $stackTrace');
      return 'Failed to add to cart... Try again';
    }
  }



  Future<String> removeFavouriteProduct(String product)async{
    final token = await AuthService.getAccessToken();

    final Map<String, dynamic> payLoad = {
      'product_id': product,

    };

    try{
      final response = await http.post(
        Uri.parse('https://school.amanilightequity.com/api/remove-favourite-product/'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: json.encode(payLoad),
      );

      if(response.statusCode == 200 || response.statusCode == 201){
        return 'success';
      }else{
        final errorData = jsonDecode(response.body);
        final errorMessages = errorData.values.join(", ");
        print(errorMessages);
        return errorMessages;
      }
    }catch(e, stackTrace){
      print('Unexpected error occurred: $e');
      print('Stack trace: $stackTrace');
      return 'Failed to add to cart... Try again';
    }
  }

}

final favouriteProductProvider =
    StateNotifierProvider<FavouriteProductNotifier, List<FavouriteProduct>>((ref) {
      return FavouriteProductNotifier();
    });
 
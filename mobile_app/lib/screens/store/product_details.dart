import 'package:flutter/material.dart';

class ProductDetailScreen extends StatelessWidget {
  final String product;

  const ProductDetailScreen({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(product)),
      body: Center(
        child: Text(
          "Details for $product",
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}

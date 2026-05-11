import 'package:flutter/material.dart';
import 'package:flutter_paystack_plus/src/paystack.dart';

class PaymentButton extends StatelessWidget {
  final String email;
  final String amount;

  const PaymentButton({super.key, required this.email, required this.amount});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () async {
        try {
          if (!context.mounted) return;

          await FlutterPaystackPlus.openPaystackPopup(
            customerEmail: email,
            amount: (double.parse(amount) * 100).toInt().toString(),
            reference: 'TXN_${DateTime.now().millisecondsSinceEpoch}',
            secretKey: 'sk_test_511bdb056b1b1a109cc26e84531872c78d689ad1',
            publicKey: 'pk_test_2d74cfaa987ef3c33faa55144a77c169c697a02c',
            currency: 'NGN',
            callBackUrl:
                'https://school.amanilightequity.com/api/initialize-payment/',
            context: context,
            onClosed: () => print('Payment closed'),
            onSuccess: () => print('Payment successful'),
          );
        } catch (e) {
          print("Payment error: $e");
        }
      },
      child: const Text('Pay Now'),
    );
  }
}

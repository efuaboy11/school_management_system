import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/theme.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/utils.dart';

class BankAccount extends StatefulWidget {
  const BankAccount({super.key});

  @override
  State<BankAccount> createState() => _BankAccountState();
}

class _BankAccountState extends State<BankAccount> {
  List<dynamic> _bankAccountList = [];

  bool _isBankLoading = true;

  @override
  void initState() {
    super.initState();
    loadBankDetails();
  }

  void _showSnackbar(BuildContext context, String text) {
    ScaffoldMessenger.of(context).clearSnackBars();
    final snackBar = SnackBar(
      content: Text(text),
      duration: Duration(seconds: 3),
    );

    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  Future<void> loadBankDetails() async {
    final token = await AuthService.getAccessToken();

    try {
      final response = await http.get(
        Uri.parse('https://school.amanilightequity.com/api/bank-account/'),
        headers: {'Authorization': 'Bearer $token'},
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          _bankAccountList = data;
          _isBankLoading = false;
        });
      } else {
        final errorData = jsonDecode(response.body);
        final errorMessages = errorData.values.join(", ");

        if (!mounted) return;
        _showSnackbar(context, errorMessages);
      }
    } catch (e) {
      if (!mounted) return;
      _showSnackbar(context, 'Failed to load term');
      setState(() {
        _isBankLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final customColors = Theme.of(context).extension<CustomColors>()!;

    return Column(
      children: [
        SizedBox(height: 10),
        Text(
          'School Bank Account',
          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
        ),
        SizedBox(height: 10),
        Text(
          'Below are various school account where payment can be made',
          style: TextStyle(fontSize: 18),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 5),
        Text(
          'Note: After transfer or paying in bank you will bring the reciept to the bursary department so it can be uploaded in our database',
          style: TextStyle(color: customColors.lightText),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 20),

        if (_isBankLoading) Center(child: CircularProgressIndicator()),

        if (_bankAccountList.isEmpty && !_isBankLoading)
          Center(child: Text('No bank details avaliable')),

        ListView.builder(
          shrinkWrap: true,
          physics: NeverScrollableScrollPhysics(),
          itemCount: _bankAccountList.length,

          itemBuilder: (ctx, index) {
            final bank = _bankAccountList[index];

            return Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: SizedBox(
                width: double.infinity,
                child: Card(
                  child: Padding(
                    padding: const EdgeInsets.all(15),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisSize: MainAxisSize.min,
                          spacing: 20,
                          children: [
                            CircleAvatar(
                              radius: 30, // adjust as needed
                              backgroundImage: NetworkImage(bank['bank_img']),
                              backgroundColor: Colors.transparent, // optional
                            ),

                            Text(
                              '${bank['bank_name']} Bank',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 20,
                              ),
                            ),
                          ],
                        ),

                        SizedBox(height: 19),

                        Text.rich(
                          TextSpan(
                            text: 'Account Name:',
                            style: TextStyle(fontSize: 15),
                            children: [
                              TextSpan(
                                text: ' ${formatName(bank['account_name'])} ',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 17,
                                ),
                              ),
                            ],
                          ),
                        ),

                        Text.rich(
                          TextSpan(
                            text: 'Account Number:',
                            style: TextStyle(fontSize: 15),
                            children: [
                              TextSpan(
                                text: '${bank['account_number']}',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 17,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ],
    );
  }
}

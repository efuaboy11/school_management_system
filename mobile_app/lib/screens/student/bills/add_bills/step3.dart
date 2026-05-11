import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/screens/Auth/login.dart';
import 'package:mobile_app/screens/student/bills/add_bills/step4.dart';
import 'package:mobile_app/screens/student/school_fees/add_school_fees/step4.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/cupertino.dart';
import 'dart:io' show File, Platform;
import 'package:mobile_app/widgets/platform_back_button.dart';
import 'package:image_picker/image_picker.dart';

class BillsPaymentScreenThree extends ConsumerStatefulWidget {
  const BillsPaymentScreenThree({
    super.key,
    required this.userId,
    required this.billType,
    required this.paymentMethod,
  });

  final String userId;
  final int billType;
  final String paymentMethod;

  @override
  ConsumerState<BillsPaymentScreenThree> createState() =>
      _BillsPaymentScreenThreeState();
}

class _BillsPaymentScreenThreeState
    extends ConsumerState<BillsPaymentScreenThree> {
  final _formkey = GlobalKey<FormState>();

  final bool _isloading = false;
  File? _selectedImage;

  void _getPicture(String method) async {
    final imagePicker = ImagePicker();
    dynamic pickedImage;

    if (method == 'camera') {
      pickedImage = await imagePicker.pickImage(source: ImageSource.camera);
    } else {
      pickedImage = await imagePicker.pickImage(
        source: ImageSource.gallery,
        maxHeight: 600,
      );
    }

    if (pickedImage == null) {
      return;
    }

    setState(() {
      _selectedImage = File(pickedImage.path);
    });
  }

  void showLoadingDialog(BuildContext context) {
    showDialog(
      barrierDismissible: false, // prevent closing by tapping outside
      context: context,
      barrierColor: Colors.black.withValues(alpha: 0.5), // dim background
      builder: (context) => Center(
        child: Image.asset('assets/image/loading.gif', width: 120, height: 120),
      ),
    );
  }

  void hideLoadingDialog(BuildContext context) {
    Navigator.of(context, rootNavigator: true).pop();
  }

  void showPlatformDialog(BuildContext context, String message) {
    if (Platform.isIOS) {
      showCupertinoDialog(
        context: context,
        builder: (context) {
          return CupertinoAlertDialog(
            title: Text('Payment Successful'),
            content: Text(message),
            actions: [
              CupertinoDialogAction(
                child: Text('OK'),
                onPressed: () => Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (ctx) => BillsPaymentScreenFour())
                ),
              ),
            ],
          );
        },
      );
    } else {
      showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text('Payment Successful'),
            content: Text(message),
            actions: [
              TextButton(
                child: Text('OK'),
                onPressed: () => Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (ctx) => SchoolFeesPaymentScreenFour())
                ),
              ),
            ],
          );
        },
      );
    }
  }

  Future<void> payFee() async {
    print('clicked');
    if (_formkey.currentState!.validate()) {
      showLoadingDialog(context);
      print('validated');

      _formkey.currentState!.save();

      final token = await AuthService.getAccessToken();

      try {
        // Make sure image is selected
        if (_selectedImage == null) {
          if (!mounted) return;
          hideLoadingDialog(context);
          showPlatformDialog(context, 'Please upload payment proof.');
          return;
        }

        // Prepare multipart request
        var request = http.MultipartRequest(
          'POST',
          Uri.parse(
            'https://school.amanilightequity.com/api/bills-payment/',
          ),
        );

        // Add headers
        request.headers['Authorization'] = 'Bearer $token';

        // Add form fields
        request.fields['student'] = widget.userId.toString();
        request.fields['bill'] = widget.billType.toString();
        request.fields['payment_method'] = widget.paymentMethod.toString();
        request.fields['status'] = 'pending';

        // Attach image file
        request.files.add(
          await http.MultipartFile.fromPath(
            'bill_receipt', // must match the field name in your Django serializer
            _selectedImage!.path,
          ),
        );

        // Send the request
        var response = await request.send();

        // Get full response body
        var responseBody = await response.stream.bytesToString();
        print('Response: $responseBody');

        if (response.statusCode == 200 || response.statusCode == 201) {
          if (!mounted) return;
          hideLoadingDialog(context);

          showPlatformDialog(
            context,
            'Bill have been successfully paid.',
          );
        } else {
          final errorData = jsonDecode(responseBody);
          final errorMessages = errorData.values.join(", ");

          if (!mounted) return;
          hideLoadingDialog(context);

          showPlatformDialog(context, errorMessages);
        }
      } catch (e) {
        if (!mounted) return;
        hideLoadingDialog(context);
        print('Error: $e');

        showPlatformDialog(
          context,
          'Unexpected error occurred. Check internet connection.',
        );
      }
    }
  }

  @override
  void initState() {
    super.initState();
    AuthService.isTokenExpired().then((isExpired){
      if(isExpired) {
        if(!mounted) return;
        Navigator.of(context).pushReplacement(MaterialPageRoute(
          builder: (ctx) => LoginScreen())
        );
        AuthService.logout();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
    final customColors = Theme.of(context).extension<CustomColors>()!;

    if (_isloading) {
      return Scaffold(
        body: Center(
          child: Image.asset(
            'assets/image/loading.gif',
            width: 120,
            height: 120,
          ),
        ),
      );
    }

    Widget imgContent = Row(
      mainAxisAlignment: MainAxisAlignment.center,
      spacing: 10,
      children: [Icon(Icons.camera), Text('Select Image')],
    );

    if (_selectedImage != null) {
      imgContent = SizedBox(
        width: 100,
        height: 100,

        child: ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: Image.file(_selectedImage!, fit: BoxFit.cover),
        ),
      );
    }

    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(
        leading: IconButton(
          icon: PlatformBackButton(),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
        title: Text('Finalize bills payment', style: TextStyle(fontSize: 18)),
        actions: [
          IconButton(
            icon: Icon(Icons.menu),
            onPressed: () {
              scaffoldKey.currentState?.openDrawer();
            },
          ),
        ],

        // backgroundColor: Theme.of(context).colorScheme.primary , // 👈 fully transparent
        // 👈 removes shadow
      ),

      drawer: Drawer(child: MenuBarWidget()),

      body: Column(
        children: [
          SizedBox(height: 5),
          Expanded(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  vertical: 20,
                  horizontal: 15,
                ),
                child: SizedBox(
                  width: double.infinity,
                  child: Column(
                    children: [
                      Align(
                        alignment: Alignment.center,
                        child: Column(
                          children: [
                            Text(
                              'After your payment has been successful, the receipt sent to you email kindly upload it for further verification.',
                              textAlign: TextAlign.center,
                            ),
                            SizedBox(height: 5),
                          ],
                        ),
                      ),
                      SizedBox(height: 10),
                      Card(
                        child: Padding(
                          padding: EdgeInsetsGeometry.all(18),

                          child: Form(
                            key: _formkey,
                            child: Column(
                              spacing: 20,
                              children: [
                                PopupMenuButton<String>(
                                  onSelected: (value) {
                                    _getPicture(value);
                                  },
                                  itemBuilder: (BuildContext context) =>
                                      <PopupMenuEntry<String>>[
                                        const PopupMenuItem<String>(
                                          value: 'gallery',
                                          child: Text(
                                            'Select Image from gallery',
                                          ),
                                        ),
                                        const PopupMenuItem<String>(
                                          value: 'camera',
                                          child: Text('Take Picture'),
                                        ),
                                      ],
                                  child: Container(
                                    width: double.infinity,

                                    decoration: BoxDecoration(
                                      color: customColors.lightBorder,
                                    ),
                                    child: Padding(
                                      padding: const EdgeInsets.symmetric(
                                        vertical: 50,
                                      ),
                                      child: Align(
                                        alignment: Alignment.center,
                                        child: imgContent,
                                      ),
                                    ),
                                  ), // or use any widget as the trigger
                                ),

                                SizedBox(
                                  width: double.infinity,
                                  height: 50,
                                  child: ElevatedButton(
                                    onPressed: payFee,

                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: Theme.of(
                                        context,
                                      ).colorScheme.primary,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                    ),
                                    child: Text(
                                      "Submit",
                                      style: TextStyle(
                                        fontSize: 16,
                                        color: Colors.white,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

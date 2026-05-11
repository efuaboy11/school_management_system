import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_paystack_plus/src/paystack.dart';
import 'package:mobile_app/theme.dart';
import 'package:path/path.dart' as path;
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';



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

    void showLoadingDownload(BuildContext context) {
    showDialog(
      barrierDismissible: false, // prevent closing by tapping outside
      context: context,
      barrierColor: Colors.black.withValues(alpha: 0.9), // dim background
      builder: (context) => Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset('assets/image/loading.gif', width: 120, height: 120),
          SizedBox(height: 10,),
          Text('This might take a while...', style: Theme.of(context).textTheme.bodyMedium!,),

        ],
      )
    );
  }

  
  void hideLoadingDialog(BuildContext context) {
    Navigator.of(context, rootNavigator: true).pop();
  }

  void showPlatformDialog(BuildContext context, String title, String message, Function onOkPressed) {
    if (Platform.isIOS) {
      showCupertinoDialog(
        context: context,
        builder: (context) {
          return CupertinoAlertDialog(
            title: Text(title),
            content: Text(message),
            actions: [
              CupertinoDialogAction(
                child: Text('OK'),
                onPressed:() => onOkPressed(),
                 
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
            title: Text(title),
            content: Text(message),
            actions: [
              TextButton(
                child: Text('OK'),
                onPressed:() => onOkPressed(),
              ),
            ],
          );
        },
      );
    }
  }

  void showDeleteDialog(BuildContext context, String title, String message, Function onDeletePressed) {
    final customColors = Theme.of(context).extension<CustomColors>()!;
    if (Platform.isIOS) {
      showCupertinoDialog(
        context: context,
        builder: (context) {
          return CupertinoAlertDialog(
            title: Text(title),
            content: Text(message),
            actions: [
              CupertinoDialogAction(
                child: Text('Cancel'),
                onPressed: () => Navigator.of(context).pop(),
              ),
              CupertinoDialogAction(
                child: Text('Delete', style: TextStyle(color: Colors.red),),
                onPressed:() => onDeletePressed(),
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
            title: Text(title),
            content: Text(message),
            actions: [
              TextButton(
                child: Text('Cancel'),
                onPressed: () => Navigator.of(context).pop(),
              ),
              ElevatedButton.icon(
                onPressed: () => onDeletePressed(),
                icon: Icon(Icons.delete_outline, color: Colors.white),
                label: Text('Delete', style: TextStyle(color: Colors.white)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: customColors.declined,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                )
              ),
            ],
          );
        },
      );
    }
  }

  void showSnackbar(BuildContext context, String text) {
    ScaffoldMessenger.of(context).clearSnackBars();
    final snackBar = SnackBar(
      content: Text(text),
      duration: Duration(seconds: 3),
    );

    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }


Future<String> makePayement(
  BuildContext context,
  String email,
  String amount,
  Function onPaymentSuccessful,
  Function onPaymentCancel,
) async {
  final token = await AuthService.getAccessToken();
  try {
    final response = await http.post(
      Uri.parse("https://school.amanilightequity.com/api/initialize-payment/"),
      headers: {
  'Authorization': 'Bearer $token',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
},

      body: json.encode({
        // ✅ Encode the body as JSON
        'email': email,
        'amount': int.parse(double.parse(amount).toStringAsFixed(0)),
      }),
    );


    if (response.statusCode == 201 || response.statusCode == 200) {
      Map<String, dynamic> data = json.decode(response.body);

      final secretKey = data['private_key'] as String;
      final publicKey = data['public_key'] as String;

      await FlutterPaystackPlus.openPaystackPopup(
        customerEmail: email,
        amount: (double.parse(amount) * 100).toInt().toString(),
        reference: 'TXN_${DateTime.now().millisecondsSinceEpoch}',
        secretKey: secretKey,
        publicKey: publicKey,
        currency: 'NGN',
        callBackUrl:
            'https://school.amanilightequity.com/api/initialize-payment/',
        context: context,
        onClosed: () => onPaymentCancel(context),
        onSuccess: () => onPaymentSuccessful(context),
      );
    } else {
      final errorData = jsonDecode(response.body);
      final errorMessages = errorData.values.join(", ");
      print(errorMessages);
      return errorMessages;
      
    }
  } catch (e) {
    print(e);
  }

  return '';
}

String formatName(String name) {
  // Example implementation: capitalize the first letter
  if (name.isEmpty) return name;
  return name[0].toUpperCase() + name.substring(1);
}

String formatDate(String date) {
  final DateTime parsedDate = DateTime.parse(date);

  final formatter = DateFormat.yMMMMd();
  return formatter.format(parsedDate);
}

String formatDateTime(String date) {
  final DateTime parsedDate = DateTime.parse(date);

  // Example output: October 3, 2025 8:00 PM
  final formatter = DateFormat('MMMM d, y h:mm a');
  return formatter.format(parsedDate);
}

String formatCurrentDate(String dateString) {
  final DateTime date = DateTime.parse(dateString).toLocal();
  final DateTime now = DateTime.now();
  final Duration diff = now.difference(date);

  if (diff.inSeconds < 60) {
    return "${diff.inSeconds}s ago";
  } else if (diff.inMinutes < 60) {
    return "${diff.inMinutes}m ago";
  } else if (diff.inHours < 24) {
    return "${diff.inHours}h ago";
  } else if (diff.inDays == 1) {
    return "Yesterday";
  } else if (diff.inDays < 7) {
    // For example: “3 days ago”
    return "${diff.inDays}d";
  } else {
    // After one week or more → return formatted date like "October 1, 2025"
    final formatter = DateFormat("MMMM d, y");
    return formatter.format(date);
  }
}

String getTimeOfDayGreeting() {
  final now = DateTime.now();
  final hour = now.hour;

  if (hour >= 0 && hour < 12) {
    return 'Morning';
  } else if (hour >= 12 && hour < 16) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
}




String formatMoney(String amount) {
  try {
    // Convert to double first so values like "40.0" will parse successfully
    final double parsedDouble = double.parse(amount);

    // Strip off decimals by converting to int
    final int value = parsedDouble.toInt();

    // Format with commas
    final formatter = NumberFormat('#,###');
    return formatter.format(value);
  } catch (e) {
    return amount; // fallback if parsing fails
  }
}


String  getFileName(String url){
  final filename = path.basename(url);
  return filename;
}



Future<String> downloadFile(String url) async{
  final dio = Dio();

  try{
     if (Platform.isAndroid) {
      // For Android 11+ use MANAGE_EXTERNAL_STORAGE
      if (await Permission.manageExternalStorage.isGranted == false) {
        var status = await Permission.manageExternalStorage.request();
        if (!status.isGranted) {
          return 'Storage permission not granted';
        }
      }
    }

    Directory? dir;
    if(Platform.isAndroid){
      dir = Directory('/storage/emulated/0/Download');
      if(!await dir.exists()){
        dir = await getExternalStorageDirectory();
      }else{
        dir = await getApplicationDocumentsDirectory();

      }
    }


    String fileName = getFileName(url);
    String filePath = path.join(dir!.path, fileName);

    await dio.download(
      url, filePath,
      onReceiveProgress: (received, total){
        if(total != -1){
          final progress = '${(received / total * 100).toStringAsFixed(0)}%';
          print("Progress: $progress");
        }
      }
    );

    return'success';
  }catch(e){
    print('Error downloading file: $e');
    return 'Error downloading file: $e';

  }
}






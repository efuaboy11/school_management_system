
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/providers/student_details.dart';
import 'package:mobile_app/screens/student/bills/add_bills/step2.dart';
import 'package:mobile_app/session_active.dart';
// import 'package:mobile_app/theme.dart';
import 'package:mobile_app/widgets/student/tabs.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/platform_back_button.dart';
import 'dart:io' show Platform;
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;


class BillPaymentScreen extends ConsumerStatefulWidget{
  const BillPaymentScreen({super.key});

  @override
  ConsumerState<BillPaymentScreen> createState() => _BillPaymentScreenState();
}

class _BillPaymentScreenState extends ConsumerState<BillPaymentScreen> {
  final _formkey = GlobalKey<FormState>();

  String? _selectedPaymentMethod;
  String? _selectedBillType;

  List<dynamic>? _paymentMethod;
  List<dynamic>? _billType;
  bool _isloading = true;

  void _showLoadingDialog(BuildContext context) {
    showDialog(
      barrierDismissible: false, // prevent closing by tapping outside
      context: context,
      barrierColor: Colors.black.withValues(alpha: 0.5), // dim background
      builder: (context) => Center(
        child: Image.asset('assets/image/loading.gif', width: 120, height: 120),
      ),
    );
  }

  void _hideLoadingDialog(BuildContext context) {
    Navigator.of(context, rootNavigator: true).pop();
  }

  void _showPlatformDialog(BuildContext context, String errorMessage) {
    if (Platform.isIOS) {
      showCupertinoDialog(
        context: context,
        builder: (context) {
          return CupertinoAlertDialog(
            title: Text('Payment Error!'),
            content: Text(errorMessage),
            actions: [
              CupertinoDialogAction(
                child: Text('OK'),
                onPressed: () => Navigator.of(context).pop(),
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
            title: Text('Payment Error!'),
            content: Text(errorMessage),
            actions: [
              TextButton(
                child: Text('OK'),
                onPressed: () => Navigator.of(context).pop(),
              ),
            ],
          );
        },
      );
    }
  }


  void _showSnackbar(BuildContext context, String text) {
    ScaffoldMessenger.of(context).clearSnackBars();
    final snackBar = SnackBar(
      content: Text(text),
      duration: Duration(seconds: 3),
    );

    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }


  Future<void> verifyDetails() async {
    print('clicked');

    if (_formkey.currentState!.validate()) {
      _showLoadingDialog(context);
      print('validated');

      _formkey.currentState!.save();

      final token = await AuthService.getAccessToken();
      String? paymentMethod;

      if (_selectedPaymentMethod == '1') {
        paymentMethod = 'online_payment';
      } else if (_selectedPaymentMethod == '2') {
        paymentMethod = 'bank_payment';
      } else if (_selectedPaymentMethod == '3') {
        paymentMethod = 'cash_payment';
      } else {
        paymentMethod = 'error';
      }

      try {
        final response = await http.get(
          Uri.parse(
            'https://school.amanilightequity.com/api/bills/$_selectedBillType/',
          ),
          headers: {
            'Authorization': 'Bearer $token',
          },
          
        );

        if(!mounted) return;
        bool sessionActive = await SessionActive.handleSession(context, response);
        if(!sessionActive) return;




        if (response.statusCode == 200 || response.statusCode == 201) {
          final Map<String, dynamic> data = json.decode(response.body);
          if(!mounted) return;
          await ref.read(studentDetailsProvider.notifier).fetchStudentDetails(context);
          final studentDetails = ref.read(studentDetailsProvider);

          if (!mounted) return;
          _hideLoadingDialog(context);

          if (!mounted) return;
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (ctx) => BillPaymentScreenTwo(
                paymentDetails: data,
                userDetails: studentDetails,
                paymentMethod: paymentMethod!,
                paymentMethodId: _selectedPaymentMethod!,
              ),
            ),
          );
        } else {
          final errorData = jsonDecode(response.body);
          final errorMessages = errorData.values.join(", ");

          if (!mounted) return;
          _hideLoadingDialog(context);

          if (!mounted) return;
          _showPlatformDialog(context, errorMessages);
        }
      } catch (e) {
        if (!mounted) return;
        _hideLoadingDialog(context);

        if (!mounted) return;
        _showPlatformDialog(
          context,
          'Unexpected Error ocuured. Check internet connection.',
        );
      }
    }
  }


  Future<void> loadDetails(String type) async {
    final token = await AuthService.getAccessToken();
    try {
      final response = await http.get(
        Uri.parse('https://school.amanilightequity.com/api/$type/'),
        headers: {'Authorization': 'Bearer $token'},
      );

      if(!mounted) return;
      bool sessionActive = await SessionActive.handleSession(context, response);
      if(!sessionActive) return;

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          if (type == 'payment-method') {
            _paymentMethod = data;
          } else if (type == 'bills') {
            _billType = data;
          }
        });

        print('success');
      } else {
        final errorData = jsonDecode(response.body);
        final errorMessages = errorData.values.join(", ");
        print(errorMessages);
        if (!mounted) return;
        _showSnackbar(context, errorMessages);
      }
    } catch (e) {
      if (!mounted) return;
      _showSnackbar(context, 'Failed to load term');
      print(e);
    }
  }


  @override
  void initState() {
    super.initState();
    _loadAllDetails();

    AuthService.isTokenExpired().then((isExpired){
      if(isExpired) {
        if(!mounted) return;
        context.go('/login');
        AuthService.logout();
      }
    });

  }


  void _loadAllDetails() async {
    setState(() {
      _isloading = true;
    });

    await Future.wait([
      loadDetails('payment-method'),
      loadDetails('bills'),
    ]);

    if (!mounted) return;
    setState(() {
      _isloading = false;
    });
  }


  @override
  Widget build(BuildContext context) {
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
    // final customColors = Theme.of(context).extension<CustomColors>()!;
    
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
    
    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(
        leading: IconButton(
          icon: PlatformBackButton(),
          onPressed: (){
            context.pop();
          }
        ),
        title: Text('Bills Payment ', style: TextStyle(fontSize: 18)),
        actions: [
          IconButton(
            icon: Icon(Icons.menu,),
            onPressed: () {
              scaffoldKey.currentState?.openDrawer();
            },
          ),
        
        ],
        // backgroundColor: Theme.of(context).colorScheme.primary , // 👈 fully transparent
         // 👈 removes shadow

      ),

      drawer: Drawer(
        child: MenuBarWidget()
      ),

      body:
        Column(
          children: [
            SizedBox(height: 15,),
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 15),
                  child: SizedBox(
                    width: double.infinity,
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Card(
                          child: Padding(
                            padding: EdgeInsetsGeometry.all(18),
                            
                            child: Form(
                              key: _formkey,
                              child: Column(
                                spacing: 20,
                                children: [
                                  DropdownButtonFormField(
                                    hint: Text("Select payment method"),
                                    decoration: InputDecoration(
                                      contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                                      
                                      prefixIcon: Icon(Icons.payment),
                                      border: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(12.0),
                                      ),
                                      
                                      
                                    ),
                                    
                                    validator: (value){
                                      if(value == null){
                                        return 'Please select a payment method';
                                      }
                                      return null;
                                    },
                                    value: _selectedPaymentMethod,
                                    items:
                                      _paymentMethod
                                          ?.map<DropdownMenuItem<String>>(
                                            (data) => DropdownMenuItem<String>(
                                              value:
                                                  data['id']?.toString() ?? '',
                                              child: Text(
                                                data['name']?.toString() ?? '',
                                              ),
                                            ),
                                          )
                                          .toList() ??
                                      [],





                                    onChanged: (value){
                                      setState(() {
                                        _selectedPaymentMethod = value as String;
                                      });
                                    }
                                  ),
                        
                                  DropdownButtonFormField(
                                    hint: Text("Select bill type"),
                                    decoration: InputDecoration(
                                      contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                                      
                                      
                                      border: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(12.0),
                                      ),
                                      
                                      
                                    ),
                                    
                                    validator: (value){
                                      if(value == null){
                                        return 'Please select a fee type';
                                      }
                                      return null;
                                    },
                        
                                    value: _selectedBillType,
                                    items:
                                      _billType 
                                        ?.map<DropdownMenuItem<String>>(
                                          (data) => DropdownMenuItem<String>(
                                            value: data['id']?.toString() ?? '',
                                            child: Text(
                                              data['bill_name']?.toString() ?? '',
                                            ),
                                          )
                                        )
                                        .toList() ??
                                      [],
                                    onChanged: (value){
                                      setState(() {
                                        _selectedBillType = value as String;
                                      });
                                    }
                                  ),
                        
                                  
                                  SizedBox(
                                    width: double.infinity,
                                    height: 50,
                                    child: ElevatedButton(
                                      onPressed: verifyDetails,
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: Theme.of(context).colorScheme.primary,
                                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
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
                              )
                            )
                              
                            
                          ),
                          
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            )

            

            
        
          ],
        ),
      

      bottomNavigationBar: StudentTab(),
      
    );
  }
}
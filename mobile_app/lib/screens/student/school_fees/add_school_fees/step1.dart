import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/providers/student_details.dart';
import 'package:mobile_app/screens/student/school_fees/add_school_fees/step2.dart';
import 'package:mobile_app/session_active.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/student/tabs.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/cupertino.dart';
import 'dart:io' show Platform;
import 'package:mobile_app/widgets/platform_back_button.dart';

class SchoolFeesPaymentScreen extends ConsumerStatefulWidget {
  const SchoolFeesPaymentScreen({super.key});

  @override
  ConsumerState<SchoolFeesPaymentScreen> createState() =>
      _SchoolFeesPaymentScreenState();
}

class _SchoolFeesPaymentScreenState
  extends ConsumerState<SchoolFeesPaymentScreen> {
  final _formkey = GlobalKey<FormState>();


  

  bool _isloading = true;
  String? _selectedPaymentMethod;
  String? _selectedFeeType;
  String? _selectedStudentClass;
  String? _selectedSession;
  String? _selectedTerm;

  List<dynamic>? _paymentMethod;
  List<dynamic>? _studentclass;
  List<dynamic>? _session;
  List<dynamic>? _term;

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

  void showPlatformDialog(BuildContext context, String errorMessage) {
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
      showLoadingDialog(context);
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

      Map<String, dynamic> data = {
        'fee_type': _selectedFeeType,
        'session': _selectedSession,
        'term': _selectedTerm,
        'student_class': _selectedStudentClass,
      };

      print(_selectedFeeType);
      print(_selectedSession);
      print(_selectedTerm);
      print(_selectedStudentClass);

      try {
        final response = await http.post(
          Uri.parse(
            'https://school.amanilightequity.com/api/get-school-fees-amount/',
          ),
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
          body: json.encode(data),
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
          hideLoadingDialog(context);

          if (!mounted) return;
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (ctx) => SchoolFeesPaymentScreenTwo(
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
          hideLoadingDialog(context);

          if (!mounted) return;
          showPlatformDialog(context, errorMessages);
        }
      } catch (e) {
        if (!mounted) return;
        hideLoadingDialog(context);

        if (!mounted) return;
        showPlatformDialog(
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
          } else if (type == 'term') {
            _term = data;
          } else if (type == 'session') {
            _session = data;
          } else if (type == 'student-class') {
            _studentclass = data;
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
      loadDetails('term'),
      loadDetails('session'),
      loadDetails('student-class'),
    ]);

    if (!mounted) return;
    setState(() {
      _isloading = false;
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

    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(
        leading: IconButton(
          icon: PlatformBackButton(),
          onPressed: () {
            context.pop();
          },
        ),
        title: Text('School Fees Payment ', style: TextStyle(fontSize: 18)),
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
          SizedBox(height: 15),
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
                              'This step is to verify the fees details and ensure they are authentic.',
                              style: TextStyle(fontSize: 19),
                              textAlign: TextAlign.center,
                            ),
                            SizedBox(height: 5),
                            Text(
                              'Note: Please enter the verified details for the specific fee you intend to pay.',
                              style: TextStyle(color: customColors.lightText),
                              textAlign: TextAlign.center,
                            ),
                            SizedBox(height: 20),
                          ],
                        ),
                      ),
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
                                    contentPadding: EdgeInsets.symmetric(
                                      vertical: 10.0,
                                      horizontal: 12.0,
                                    ),

                                    prefixIcon: Icon(Icons.payment),
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                  ),

                                  validator: (value) {
                                    if (value == null) {
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

                                  onChanged: (value) {
                                    setState(() {
                                      _selectedPaymentMethod = value as String;
                                    });
                                  },
                                ),

                                DropdownButtonFormField(
                                  hint: Text("Select fee type"),
                                  decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(
                                      vertical: 10.0,
                                      horizontal: 12.0,
                                    ),

                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                  ),

                                  validator: (value) {
                                    if (value == null) {
                                      return 'Please select a fee type';
                                    }
                                    return null;
                                  },

                                  value: _selectedFeeType,
                                  items: [
                                    DropdownMenuItem(
                                      value: 'school fees',
                                      child: Text('School Fees'),
                                    ),

                                    DropdownMenuItem(
                                      value: 'P.T.A',
                                      child: Text('P.T.A payment'),
                                    ),
                                  ],
                                  onChanged: (value) {
                                    setState(() {
                                      _selectedFeeType = value;
                                    });
                                  },
                                ),

                                DropdownButtonFormField(
                                  hint: Text("Select student class"),
                                  decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(
                                      vertical: 10.0,
                                      horizontal: 12.0,
                                    ),

                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                  ),

                                  validator: (value) {
                                    if (value == null) {
                                      return 'Please select student class';
                                    }
                                    return null;
                                  },

                                  value: _selectedStudentClass,
                                  items:
                                      _studentclass
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

                                  onChanged: (value) {
                                    setState(() {
                                      _selectedStudentClass = value as String;
                                    });
                                  },
                                ),

                                DropdownButtonFormField(
                                  hint: Text("Select Session"),
                                  decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(
                                      vertical: 10.0,
                                      horizontal: 12.0,
                                    ),

                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                  ),

                                  validator: (value) {
                                    if (value == null) {
                                      return 'Please select session';
                                    }
                                    return null;
                                  },

                                  value: _selectedSession,
                                  items:
                                      _session
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

                                  onChanged: (value) {
                                    setState(() {
                                      _selectedSession = value as String;
                                    });
                                  },
                                ),

                                DropdownButtonFormField(
                                  hint: Text("Select Term"),
                                  decoration: InputDecoration(
                                    contentPadding: EdgeInsets.symmetric(
                                      vertical: 10.0,
                                      horizontal: 12.0,
                                    ),

                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                  ),

                                  validator: (value) {
                                    if (value == null) {
                                      return 'Please select term';
                                    }
                                    return null;
                                  },

                                  value: _selectedTerm,
                                  items:
                                      _term
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

                                  onChanged: (value) {
                                    setState(() {
                                      _selectedTerm = value as String;
                                    });
                                  },
                                ),

                                
                                
                                SizedBox(
                                  width: double.infinity,
                                  height: 50,
                                  child: ElevatedButton(
                                    onPressed: verifyDetails,
                                    // onPressed: () {
                                    //   // context.push('/student/pay-2');
                                    //   // Navigator.of(context).push(
                                    //   //   MaterialPageRoute(builder: (ctx) => SchoolFeesPaymentScreenTwo())
                                    //   // );

                                    //   verifyDetails();
                                    // },
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

      bottomNavigationBar: StudentTab(),
    );
  }
}

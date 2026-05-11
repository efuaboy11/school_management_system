
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/providers/result.dart';
import 'package:mobile_app/screens/student/check_result/check_resut_details.dart';
import 'package:mobile_app/session_active.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/student/tabs.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/platform_back_button.dart';
import 'package:http/http.dart' as http;

class CheckResultScreen extends ConsumerStatefulWidget{
  const CheckResultScreen({super.key});

  @override
  ConsumerState<CheckResultScreen> createState() => _CheckResultScreenState();
}

class _CheckResultScreenState extends ConsumerState<CheckResultScreen> {
  final _formkey = GlobalKey<FormState>();

  bool _isloading = true;
  String? _selectedStudentClass;
  String? _selectedSession;
  String? _selectedTerm;
  String? _pin;



  List<dynamic>? _studentclass;
  List<dynamic>? _session;
  List<dynamic>? _term;

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
          if (type == 'term') {
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
        showSnackbar(context, errorMessages);
      }
    } catch (e) {
      if (!mounted) return;
      showSnackbar(context, 'Failed to load term');
      print(e);
    }
  }

  Future<void> _verifyDetails() async{
    if(_formkey.currentState!.validate()){
      showLoadingDialog(context);

      _formkey.currentState!.save();
      final token = await AuthService.getAccessToken();
      final userId = await AuthService.getUserId();

      print(userId);
      print(_selectedStudentClass);
      print(_selectedSession);
      print(_selectedTerm);

      Map<String, dynamic> payLoad = {
        'student': userId,
        'pin': _pin,
        'student_class': _selectedStudentClass,
        'term': _selectedTerm,
        'session': _selectedSession,

      };

      try{
        final response = await http.post(
          Uri.parse(
            'https://school.amanilightequity.com/api/check-result/'
          ),
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
          body: json.encode(payLoad),
        );

        if(!mounted) return;
        bool sessionActive = await SessionActive.handleSession(context, response);
        if(!sessionActive) return;


        if(response.statusCode == 200 || response.statusCode == 201){
          final Map<String, dynamic> data = json.decode(response.body);

          if(!mounted) return;
          await ref.read(resultProvider.notifier).fetchResult(context, data['id'].toString());
          final result = ref.read(resultProvider);

          if (!mounted) return;
          hideLoadingDialog(context);

          if(!mounted) return;
          Navigator.of(context).push(
            MaterialPageRoute(builder: (ctx) => CheckResutDetailsScreen(resultDetails: result,))
          );
        }else{
          final errorData = jsonDecode(response.body);
          final errorMessages = errorData.values.join(", ");

          if (!mounted) return;
          hideLoadingDialog(context);

          if (!mounted) return;
          showPlatformDialog(
            context, 
            'Result Error', 
            errorMessages,
            (){
              Navigator.of(context).pop();
            }
          );
        }

      }catch(e){
        if (!mounted) return;
        hideLoadingDialog(context);

        if (!mounted) return;
          showPlatformDialog(
            context, 
            'Result Error', 
            'Unexpected Error ocuured. Check internet connection.',
            (){
              Navigator.of(context).pop();
            }
          );
          
      }
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
        title: Text('Check Result', style: TextStyle(fontSize: 18)),
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

                                  
                                
                                  TextFormField(
                                    decoration: InputDecoration(
                                      hintText: 'Scratch card pin',
                                      prefixIcon: Icon(Icons.code), // You can change this icon
                                      contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                                      border: OutlineInputBorder(
                                        borderRadius: BorderRadius.circular(12.0),
                                      ),
                                    ),
                                    validator: (value) {
                                      if (value == null || value.isEmpty) {
                                        return 'Please enter pin';
                                      }
                                      return null;
                                    },

                                    onSaved: (value) {
                                      _pin = value;
                                    },
                                    
                                  ),
                                  SizedBox(
                                    width: double.infinity,
                                    height: 50,
                                    child: ElevatedButton(
                                      onPressed: _verifyDetails,
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
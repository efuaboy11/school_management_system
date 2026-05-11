
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/providers/scheme.dart';
import 'package:mobile_app/providers/student_details.dart';
import 'package:mobile_app/screens/student/scheme_of_work/scheme_of_work.dart';
import 'package:mobile_app/session_active.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/student/tabs.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/platform_back_button.dart';
import 'package:http/http.dart' as http;

class SelectTermSchemeScreen extends ConsumerStatefulWidget{
  const SelectTermSchemeScreen({super.key});

  @override
  ConsumerState<SelectTermSchemeScreen> createState() => _SelectTermSchemeScreenState();
}

class _SelectTermSchemeScreenState extends ConsumerState<SelectTermSchemeScreen> {
  final _formkey = GlobalKey<FormState>();

  String? _selectedTerm;
  bool _isloading = true;
  String? _classId;
  String? _className;

  List<dynamic>? _term;



  Future<void> _loadStudentDetails() async{
    await ref.read(studentDetailsProvider.notifier).fetchStudentDetails(context);
    final studentDetails = ref.read(studentDetailsProvider);
    _classId = studentDetails.studentClassID;
    _className = studentDetails.studentClass;
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
          if(type == 'term'){
            _term = data;
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

  void _loadAllDetails() async {
    setState(() {
      _isloading = true;
    });

    await Future.wait([
      loadDetails('term'),
    ]);

    if (!mounted) return;
    setState(() {
      _isloading = false;
    });
  }


  Future<void> _verifyDetails() async{
    if(_formkey.currentState!.validate()){
      showLoadingDialog(context);

      _formkey.currentState!.save();
      print(_selectedTerm);


      try{
        final response = await ref.read(schemeProvider.notifier).fetchScheme(context, _classId!, _selectedTerm!);

        if(response == 'success'){
          final schemeData = ref.read(schemeProvider);
          if (!mounted) return;
          hideLoadingDialog(context);

          if(!mounted) return;
          Navigator.of(context).push(
            MaterialPageRoute(builder: (ctx) => SchemeOfWorkScreen(schemeDetails: schemeData,  className: _className!,))
          );
        }else{
          if (!mounted) return;
          hideLoadingDialog(context);

          if (!mounted) return;
          showPlatformDialog(
            context, 
            'Scheme Error', 
            response,
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
            'Scheme Error', 
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
    AuthService.isTokenExpired().then((isExpired){
      if(isExpired) {
        if(!mounted) return;
        context.go('/login');
        AuthService.logout();
      }
    });
    _loadStudentDetails();
    _loadAllDetails();
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
          onPressed: () => context.pop(),
        ),
        title: Text('Scheme of work', style: TextStyle(fontSize: 18)),
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

      body:Padding(
        padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 15),
        child: Center(
          child:
           Column(
            children: [
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(15.0),
                  child: Form(
                    key: _formkey,
                    child: Column(
                      spacing: 20,
                      children: [
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
                  ),
                ),
              ),
            ],
           )
          
        ),
      ),

      bottomNavigationBar: StudentTab(),
      
    );
  }
}

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/providers/assignment.dart';
import 'package:mobile_app/screens/student/assignment/assignment_details.dart';
import 'package:mobile_app/utils.dart';
// import 'package:mobile_app/theme.dart';
import 'package:mobile_app/widgets/student/tabs.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/platform_back_button.dart';

class AssignmentScreen extends ConsumerStatefulWidget{
  const AssignmentScreen({super.key});

  @override
  ConsumerState<AssignmentScreen> createState() => _AssignmentScreenState();
}

class _AssignmentScreenState extends ConsumerState<AssignmentScreen> {
  bool _loading = true;
  String? _error;
  final _searchController = TextEditingController();
  Timer? _debounce;


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

    _loadDetails('', context);
  }

  @override
  void dispose() {
    _searchController.dispose();
    _debounce?.cancel();
    super.dispose();
  }

  Future<void> _loadDetails(String query, context) async{
    try{
      final respose = await ref.read(assignmentProvider.notifier).fetchAssignmentPayment(query, context);
      if(respose != 'success'){
        _error = respose;
      }
    }finally{
      if(_loading){
        setState(() {
          _loading = false;
        });
      }
      
    }
  }






  @override
  Widget build(BuildContext context) {
    
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
    // final customColors = Theme.of(context).extension<CustomColors>()!;
    final assignments = ref.read(assignmentProvider);
    Widget content = Center(
      child: Text('Welcome'),
    );

    if(_loading){
      content = Center(
        child: Image.asset(
          'assets/image/loading.gif',
          width: 120,
          height: 120,
        )
      );
    }


    if(_error != null){
      content = Center(child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset(
            'assets/image/error.png',
            width: 300,
            height: 300,
          ),
          Text("Error: $_error", textAlign: TextAlign.center, style: Theme.of(context).textTheme.bodySmall,),
          SizedBox(height: 15,),
          ElevatedButton.icon(
            icon: Icon(Icons.dashboard),
            label: Text('Home'),
            onPressed: () {
              context.go('/student/home');
            },
          ),

        ],
      ));
    }


    if(!_loading && _error == null){
      content = Padding(
        padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 15),
        child: Column(
          children: [
            TextField(
              decoration: InputDecoration(
                contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                hintText: 'Search',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12.0),
                ),
                
              ),

              onChanged: (value) {
                if (_debounce?.isActive ?? false) _debounce!.cancel();

                _debounce = Timer(const Duration(milliseconds: 500), () {
                  _loadDetails(value, context);
                });
              },
              style: TextStyle(fontSize: 14.0), // smaller text
            ),

            SizedBox(height: 15,),
            

            Align(
              alignment: Alignment.center,
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(10),
                  child: Text('Total of ${assignments.length} assignment given'),
                ),
              ),
            ),

            SizedBox(height: 15,),

            Expanded(
              child: Consumer(
                builder: (context, ref, child){
                  final assignmentList = ref.watch(assignmentProvider);

                  if(assignmentList.isEmpty){
                    return  Center(child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Image.asset(
                            'assets/image/404.png',
                            width: 300,
                            height: 300,
                          ),
                          Text("oops... search not found", textAlign: TextAlign.center, style: Theme.of(context).textTheme.titleMedium,),
                          

                        ],
                      )
                    );
                  }

                  return ListView.builder(

                    itemCount: assignmentList.length,
                    itemBuilder: (ctx, index){
                      final assignment = assignmentList[index];

                      return InkWell(
                        onTap: () {
                          Navigator.of(context).push(
                            MaterialPageRoute(builder: (ctx) => AssignmentDetailsScreen(assignmentDetails: assignment)) 
                          );
                        },
                        child: Card(
                          elevation: 2,
                          margin: const EdgeInsets.all(12),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Container(
                            decoration: BoxDecoration(
                              border: Border(
                                left: BorderSide(
                                  color: Colors.blue, // 💡 Use your desired color or theme color
                                  width: 5,
                                ),
                              ),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Text(
                                '${formatName(assignment.teacherDetails['first_name'])} ${formatName(assignment.teacherDetails['last_name'])}, gave a ${formatName(assignment.assignmentTitle)} '
                                '(code: ${assignment.assignmentCode}) on ${formatDateTime(assignment.assignedDate)}, to be submitted on ${formatDateTime(assignment.dueDate)} promptly',
                                style: TextStyle(fontSize: 16),
                              ),
                            ),
                          ),
                        ),
                      );
                    },
                  );
                } 
              )
            )
        
          ],
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
        title: Text('Assignment', style: TextStyle(fontSize: 18)),
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

      body: content,

      bottomNavigationBar: StudentTab(),
      
    );
  }
}
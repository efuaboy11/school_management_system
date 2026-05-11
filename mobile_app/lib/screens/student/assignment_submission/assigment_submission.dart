
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/providers/assignment_submission.dart';
import 'package:mobile_app/screens/student/assignment_submission/assignment_submission_details.dart';
import 'package:mobile_app/utils.dart';
// import 'package:mobile_app/theme.dart';
import 'package:mobile_app/widgets/student/tabs.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/platform_back_button.dart';

class AssignmentSubmissionScreen extends ConsumerStatefulWidget{
  const AssignmentSubmissionScreen({super.key});

  @override
  ConsumerState<AssignmentSubmissionScreen> createState() => _AssignmentSubmissionScreenState();
}

class _AssignmentSubmissionScreenState extends ConsumerState<AssignmentSubmissionScreen> {

  bool _loading = true;
  String? _error;
  final _searchController = TextEditingController();
  Timer? _debounce;


  Future<void> _loadDetails(String query, context) async{
    try{
      final respose = await ref.read(assignmentSubmissionProvider.notifier).fetchAssignmentSubmission(query, context);
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





  @override
  Widget build(BuildContext context) {
    
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
    // final customColors = Theme.of(context).extension<CustomColors>()!;
    final assignmentSubmission = ref.read(assignmentSubmissionProvider);

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
            Align(
              alignment: Alignment.topRight,
              child: ElevatedButton.icon(
                onPressed: () {
                  context.push('/student/submit-assignment');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                icon: Icon(Icons.add, color: Colors.white,),
                label: Text(
                  "Submit assignment",
                  style: TextStyle(
                    fontSize: 16,
                    color: Colors.white,
                  ),
                ),
              ),
            ),

            SizedBox(height: 20,),

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
                  child: Text('Total of ${assignmentSubmission.length} assignment submitted'),
                ),
              ),
            ),

            SizedBox(height: 15,),

            Expanded(
              child: Consumer(
                builder: (context, ref, child){
                  final assignmentSubmissionList = ref.watch(assignmentSubmissionProvider);

                  if(assignmentSubmissionList.isEmpty){
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

                    itemCount: assignmentSubmissionList.length,
                    itemBuilder: (ctx, index){
                      final assignment = assignmentSubmissionList[index];

                      return InkWell(
                        onTap: () {
                          Navigator.of(context).push(
                            MaterialPageRoute(builder: (ctx) => AssignmentSubmisionDetailsScreen(assignmentDetails: assignment,)) 
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
                                  color: Theme.of(context).colorScheme.tertiary,  // 💡 Change to your theme color
                                  width: 5,
                                ),
                              ),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(16),
                              child: Text(
                                '${formatName(assignment.teacherDetails['first_name'])} ${formatName(assignment.teacherDetails['last_name'])},'
                                '(code: ${assignment.assignmentCode}) was submitted at ${formatDateTime(assignment.dateSubmitted)}.',
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
        title: Text('Assignment submission', style: TextStyle(fontSize: 18)),
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
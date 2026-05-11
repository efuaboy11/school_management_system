
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/models/assignment_submission.dart';
import 'package:mobile_app/providers/assignment_submission.dart';
import 'package:mobile_app/screens/Auth/login.dart';
import 'package:mobile_app/screens/student/assignment_submission/edit_assignment.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/platform_back_button.dart';

class AssignmentSubmisionDetailsScreen extends ConsumerStatefulWidget{
  const AssignmentSubmisionDetailsScreen({super.key, required this.assignmentDetails});

  // onPressed: () => context.pop(),
  final AssignmentSubmission assignmentDetails;

  @override
  ConsumerState<AssignmentSubmisionDetailsScreen> createState() => _AssignmentSubmisionDetailsScreenState();
}

class _AssignmentSubmisionDetailsScreenState extends ConsumerState<AssignmentSubmisionDetailsScreen> {
  Future<void> _onDownloadFile() async{
    showLoadingDownload(context);
    if(widget.assignmentDetails.submissionFile != null){
      final response = await downloadFile(widget.assignmentDetails.submissionFile!);
      if(!mounted) return;
      hideLoadingDialog(context);
      if(response == 'success'){
        showPlatformDialog(context, 'Download Successful', 'The file has been downloaded successfully.', (){
          Navigator.of(context).pop();
        });

      }else{
        showPlatformDialog(context, 'Download Failed', response, (){
          Navigator.of(context).pop();
        });
      }


    }
  }

  void _deleteAssignmentSubmission() async{
    showLoadingDialog(context);
    final response = await ref.read(assignmentSubmissionProvider.notifier).deleteAssignmentSubmission(
      widget.assignmentDetails.id, context
    );

    if(!mounted) return;
    hideLoadingDialog(context);

    if(response == 'success'){
      showSnackbar(context, 'Assignment submission deleted successfully');
      Navigator.of(context).pop();
      Navigator.of(context).pop();

    }else{
      showSnackbar(context, response);
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


    Widget assignmentFileContent = SizedBox(
      width: double.infinity,
      height: 100,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'No file attached',
            textAlign: TextAlign.center,
            style: TextStyle(color: customColors.lightText),
          
          ),
        ],
      )
    );

    if(widget.assignmentDetails.submissionFile != null){
      assignmentFileContent = InkWell(
        onTap: _onDownloadFile,
        child: SizedBox(
          width: double.infinity,
          height: 100,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                getFileName(widget.assignmentDetails.submissionFile),
                textAlign: TextAlign.center,
                style: TextStyle(color: customColors.lightText),
              
              ),
            ],
          )
        ),
      );
    }


    Widget assignmentImageContent = SizedBox(
      width: double.infinity,
      height: 100,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            'No file attached',
            textAlign: TextAlign.center,
            style: TextStyle(color: customColors.lightText),
          
          ),
        ],
      )
    );


    if(widget.assignmentDetails.submissionImage != null){
      assignmentImageContent = InkWell(
        onTap: _onDownloadFile,
        child: SizedBox(
          width: double.infinity,
          height: 100,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.network(
                widget.assignmentDetails.submissionImage!,
                width: 80,
                height: 80,
              )
            ],
          )
        ),
      );
    }

    void openEditOverlay(){
      showModalBottomSheet(useSafeArea: true, isScrollControlled: true, context: context, builder: (ctx) => EditAssignmentSubmissionScreen(
        id: widget.assignmentDetails.id,
        teacher: widget.assignmentDetails.teacherID, 
        subject: widget.assignmentDetails.subjectID, 
        assignmentCode: widget.assignmentDetails.assignmentCode, 
        assignmenNote: widget.assignmentDetails.assignmentNote, 
      ));

    }
    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(
        leading: IconButton(
          icon: PlatformBackButton(),
          onPressed: () {
            Navigator.of(context).pop();
          }
        ),
        title: Text('Submission details', style: TextStyle(fontSize: 18)),
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
            Expanded(
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 15),
                  child: SizedBox(
                    width: double.infinity,
                    child: Column(
                      spacing: 15,
                      children: [
                        Card(
                          child: Column(
                            children: [
                              Container(
                                width: double.infinity,
                                padding: EdgeInsets.all(15),
                                decoration: BoxDecoration(
                                  border: Border(
                                    bottom: BorderSide(
                                      color: customColors.lightBorder,
                                      width: 1.0
                                    )
                                  )
                                  
                                ),
                  
                                child: Text('Assignment File', textAlign: TextAlign.center,),
                              ),
                  
                              assignmentFileContent,
                  
                  
                  
                  
                            ],
                          ),
                        ),

                        Card(
                          child: Column(
                            children: [
                              Container(
                                width: double.infinity,
                                padding: EdgeInsets.all(15),
                                decoration: BoxDecoration(
                                  border: Border(
                                    bottom: BorderSide(
                                      color: customColors.lightBorder,
                                      width: 1.0
                                    )
                                  )
                                  
                                ),
                  
                                child: Text('Assignment Photo', textAlign: TextAlign.center,),
                              ),
                  
                              assignmentImageContent,
                   
                            ],
                          ),
                        ),



                        Card(
                          child: Column(
                            children: [
                              Container(
                                width: double.infinity,
                                padding: EdgeInsets.all(15),
                                decoration: BoxDecoration(
                                  border: Border(
                                    bottom: BorderSide(
                                      color: customColors.lightBorder,
                                      width: 1.0
                                    )
                                  )
                                  
                                ),
                  
                                child: Row(
                                  spacing: 10,
                                  mainAxisAlignment: MainAxisAlignment.end,
                                  children: [
                                      OutlinedButton.icon(
                                        onPressed: openEditOverlay,
                                        icon: Icon(Icons.edit, color: Theme.of(context).colorScheme.primary),
                                        label: Text('Edit', style: TextStyle(color: Theme.of(context).colorScheme.primary)),
                                        style: OutlinedButton.styleFrom(
                                          side: BorderSide(color: Theme.of(context).colorScheme.primary),
                                          shape: RoundedRectangleBorder(
                                            borderRadius: BorderRadius.circular(8),
                                          ),
                                        ),
                                      ),

                                      ElevatedButton.icon(
                                        onPressed: (){
                                          showDeleteDialog(
                                            context, 
                                            'Delete Assignment Submission', 
                                            'Are you sure you want to delete this assignment submission?',
                                            _deleteAssignmentSubmission,
                                            
                                          );
                                        },
                                        icon: Icon(Icons.delete_outline, color: Colors.white),
                                        label: Text('Delete', style: TextStyle(color: Colors.white)),
                                        style: ElevatedButton.styleFrom(
                                          backgroundColor: customColors.declined,
                                          shape: RoundedRectangleBorder(
                                            borderRadius: BorderRadius.circular(8),
                                          ),
                                        ),
                                      ),



                                    ],
                                  
                                ),
                              ),

                              ListTile(
                                title: Text('Teacher Name'),
                                trailing:  Text('${formatName(widget.assignmentDetails.teacherDetails['first_name'])} ${formatName(widget.assignmentDetails.teacherDetails['last_name'])}'),
                              ),

                             

                              ListTile(
                                title: Text('Subject'),
                                trailing: Text(formatName(widget.assignmentDetails.subjectName)),
                              ),

                              

                              ListTile(
                                title: Text('Assingment Code'),
                                trailing: Text(widget.assignmentDetails.assignmentCode),
                              ),

                              ListTile(
                                title: Text('Grade'),
                                trailing: Text(widget.assignmentDetails.grade != '' ? widget.assignmentDetails.grade : 'Not graded yet'),
                              ),  

                              ListTile(
                                title: Text('Submission date'),
                                trailing: Text(formatDateTime(widget.assignmentDetails.dateSubmitted)),
                              ),

                                         
                  
                            ],
                          ),
                        ),
                  


                        Card(
                          child: Column(
                            children: [
                              Container(
                                width: double.infinity,
                                padding: EdgeInsets.all(15),
                                decoration: BoxDecoration(
                                  border: Border(
                                    bottom: BorderSide(
                                      color: customColors.lightBorder,
                                      width: 1.0
                                    )
                                  )
                                  
                                ),
                  
                                child: Text('Assignemt submission note', textAlign: TextAlign.center, style: TextStyle(color: customColors.lightText),),
                              ),
                  
                              Padding(
                                padding: EdgeInsetsGeometry.all(10),
                                child: Text(widget.assignmentDetails.assignmentNote != '' ? widget.assignmentDetails.assignmentNote : 'No note added'),
                              )
                  
                  
                  
                  
                            ],
                          ),
                        ),

                        Card(
                          child: Column(
                            children: [
                              Container(
                                width: double.infinity,
                                padding: EdgeInsets.all(15),
                                decoration: BoxDecoration(
                                  border: Border(
                                    bottom: BorderSide(
                                      color: customColors.lightBorder,
                                      width: 1.0
                                    )
                                  )
                                  
                                ),
                  
                                child: Text('Assignemt submission feedback', textAlign: TextAlign.center, style: TextStyle(color: customColors.lightText),),
                              ),
                  
                              Padding(
                                padding: EdgeInsetsGeometry.all(10),
                                child: Text(widget.assignmentDetails.feedback != '' ? widget.assignmentDetails.feedback : 'No feedback added'),
                              )
                  
                  
                  
                  
                            ],
                          ),
                        ),
                        
                      ],
                  
                    )
                      
                    
                  ),
                ),
              ),
            )

            

            
        
          ],
        ),
      

      // bottomNavigationBar: StudentTab(),
      
    );
  }
}
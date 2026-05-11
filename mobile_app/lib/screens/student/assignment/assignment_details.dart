
import 'package:flutter/material.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/models/assignment.dart';
import 'package:mobile_app/screens/Auth/login.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/platform_back_button.dart';

class AssignmentDetailsScreen extends StatefulWidget{
  const AssignmentDetailsScreen({super.key, required this.assignmentDetails});

  final Assignment assignmentDetails;

  @override
  State<AssignmentDetailsScreen> createState() => _AssignmentDetailsScreenState();
}

class _AssignmentDetailsScreenState extends State<AssignmentDetailsScreen> {


  Future<void> _onDownloadFile() async{
    showLoadingDownload(context);
    if(widget.assignmentDetails.assignmentFile != null){
      final response = await downloadFile(widget.assignmentDetails.assignmentFile!);
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

    if(widget.assignmentDetails.assignmentFile != null){
      assignmentFileContent = InkWell(
        onTap: _onDownloadFile,
        child: SizedBox(
          width: double.infinity,
          height: 100,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                getFileName(widget.assignmentDetails.assignmentFile),
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

    if(widget.assignmentDetails.assignmentImage != null){
      assignmentImageContent = InkWell(
        onTap: _onDownloadFile,
        child: SizedBox(
          width: double.infinity,
          height: 100,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.network(
                widget.assignmentDetails.assignmentImage!,
                width: 80,
                height: 80,
              )
            ],
          )
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
          }
        ),
        title: Text('Assignment details', style: TextStyle(fontSize: 18)),
        actions: [
          IconButton(
            icon: Icon(Icons.menu,),
            onPressed: () {
              scaffoldKey.currentState?.openDrawer();
            },
          ),
        
        ],

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
                  
                                child: Text('Assignment Details', textAlign: TextAlign.center,),
                              ),

                              ListTile(
                                title: Text('Teacher name'),
                                trailing:  Text('${formatName(widget.assignmentDetails.teacherDetails['first_name'])} ${formatName(widget.assignmentDetails.teacherDetails['last_name'])}'),
                              ),

                              ListTile(
                                title: Text('Class'),
                                trailing: Text(formatName(widget.assignmentDetails.studentClassName)),
                              ),

                              ListTile(
                                title: Text('Subject'),
                                trailing: Text(formatName(widget.assignmentDetails.subjectName)),
                              ),

                              ListTile(
                                title: Text('Assinment Name'),
                                trailing: Text(formatName(widget.assignmentDetails.assignmentTitle)),
                              ),

                              ListTile(
                                title: Text('Assingment Code'),
                                trailing: Text(widget.assignmentDetails.assignmentCode),
                              ),

                              ListTile(
                                title: Text('Assingment Point'),
                                trailing: Text(widget.assignmentDetails.assignmentTitle),
                              ),

                              ListTile(
                                title: Text('Due date'),
                                trailing: Text(formatDate(widget.assignmentDetails.dueDate)),
                              ),

                              ListTile(
                                title: Text('Date given'),
                                trailing: Text(formatDateTime(widget.assignmentDetails.assignedDate)),
                              ),             
                  
                            ],
                          ),
                        ),
                  


                        Card(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
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
                  
                                child: Text('Instruction', textAlign: TextAlign.center,),
                              ),
                  
                              Padding(
                                padding: EdgeInsetsGeometry.all(10),
                                child: Text(formatName(widget.assignmentDetails.assignmentInstructions)),
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
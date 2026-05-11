import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/providers/assignment.dart';
import 'package:mobile_app/providers/class_notification.dart';
import 'package:mobile_app/providers/student_details.dart';
import 'package:mobile_app/providers/assignment_submission.dart';
import 'package:mobile_app/screens/student/school_fees/fee_details.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/carousel.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/student/tabs.dart';
import 'package:mobile_app/screens/student/class_notifications/class_notifcation_details.dart';
import 'package:mobile_app/screens/student/bills/bill_details.dart';
import 'package:mobile_app/providers/school_fee.dart';
import 'package:mobile_app/providers/billls.dart';
import 'package:http/http.dart' as http;

class StudentHomeScreen extends ConsumerStatefulWidget {
  const StudentHomeScreen({super.key});

  @override
  ConsumerState<StudentHomeScreen> createState() => _StudentHomeScreenState();
}

class _StudentHomeScreenState extends ConsumerState<StudentHomeScreen> {

  bool _loading = true;
  bool _notificationLoader = true;
  bool _schoolFeesLoader = true;
  bool _billsLoader = true;

  String? _error;

  String _assignemtLength = '0';
  String _assignmentSubmittedLength = '0';
  

  double _pendingFees = 0;
  double _declinedFees = 0;
  double _successfulFees = 0;
  double _schoolFeesTotal = 0;

  double _billsPending = 0;
  double _billsDeclined = 0;
  double _billsSuccessful = 0;
  double _billsTotal = 0;



  Future<void> _updateNotificationStatus(int notificationId, context) async{
    // Implement the logic to update notification status here
    // POST /notifications/schoolnotification/5/read/
    // POST /notifications/staffnotification/2/read/
    // POST /notifications/classnotification/9/read/

    print('updating notification status for id: $notificationId');

    final token = await AuthService.getAccessToken();

    try{
      final response = await http.post(
        Uri.parse(
          'https://school.amanilightequity.com/api/update-notification/classnotification/$notificationId'
        ),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        
      );

      if(response.statusCode == 200 || response.statusCode == 201){
        showSnackbar(context, 'Notification status updated successfully');
        print(response.body);
      }else{
        final errorData = jsonDecode(response.body);
        final errorMessages = errorData.values.join(", ");
        print(errorMessages);
        showSnackbar(context, errorMessages);
      }
    }catch(e){
      showSnackbar(context, 'Failed to update notification status');
      print(e);
    }
  }


  


  Future<void> _loadStudentDetails() async{
    try{
      final respose = await ref.read(studentDetailsProvider.notifier).fetchStudentDetails(context);
      if(respose != 'success'){
        _error = respose;
      }
    }finally{
      setState(() {
        _loading = false;
      });
    }
  }

  Future<void> _loadAssignment() async{

    final respose = await ref.read(assignmentProvider.notifier).fetchAssignmentPayment('', context);
    final assignmentDetails = ref.read(assignmentProvider);  
    _assignemtLength = assignmentDetails.length.toString();
    

      
    if(respose != 'success'){
      showSnackbar(context, 'respose');
    }
    
  }


  Future<void> _loadAssignmentSubmitted() async{

    final respose = await ref.read(assignmentSubmissionProvider.notifier).fetchAssignmentSubmission('', context);
    final assignmentSubmissionDetails = ref.read(assignmentSubmissionProvider);
    _assignmentSubmittedLength = assignmentSubmissionDetails.length.toString();

    if(respose != 'success'){
      showSnackbar(context, 'respose');
    }
    
  }

  Future <void> _totalSchoolFees() async{
    final respose = await ref.read(schoolFeesProvider.notifier).getTotalSchoolFeesAmount(context, '');
    _schoolFeesTotal = respose;
  }

  Future<void> _totalApprovedSchoolFees() async{
    final respose = await ref.read(schoolFeesProvider.notifier).getTotalSchoolFeesAmount(context, 'approved');
    _successfulFees = respose;
  }

  Future<void> _totalDeclinedSchoolFees() async{
    final respose = await ref.read(schoolFeesProvider.notifier).getTotalSchoolFeesAmount(context, 'declined');
    _declinedFees = respose;
  }

  Future<void> _totalPendingSchoolFees() async{
    final respose = await ref.read(schoolFeesProvider.notifier).getTotalSchoolFeesAmount(context, 'pending');
    _pendingFees = respose;
  }


  Future<void> _totalBills() async{
    final respose = await ref.read(billsProvider.notifier).getTotalBillsAmount(context, '');
    _billsTotal = respose;
  }

  Future<void> _totalApprovedBills() async{
    final respose = await ref.read(billsProvider.notifier).getTotalBillsAmount(context, 'approved');
    _billsSuccessful = respose;
  }

  Future<void> _totalDeclinedBills() async{
    final respose = await ref.read(billsProvider.notifier).getTotalBillsAmount(context, 'declined');
    _billsDeclined = respose;
  }

  Future<void> _totalPendingBills() async{
    final respose = await ref.read(billsProvider.notifier).getTotalBillsAmount(context, 'pending');
    _billsPending = respose;
  }


  Future<void> _loadAllNotification(String query, context) async{
    final respose = await ref.read(classNotificationProvider.notifier).fetchClassNotificationPayment(query, context, '');
    if(respose != 'success'){
      showSnackbar(context, respose);
    }
    if(_notificationLoader){
      setState(() {
        _notificationLoader = false;
      });
    }
    
  }

  Future<void> _loadFeesDetails(String query, context) async{
    try{
      final respose = await ref.read(schoolFeesProvider.notifier).fetchSchoolFeesPayment(query, context, '');
      if(respose != 'success'){
        showSnackbar(context, respose);
      }
    }finally{
      if(_schoolFeesLoader){
        setState(() {
          _schoolFeesLoader = false;
        });
      }
      
    }
  }

  Future<void> _loadBillaDetails(String query, context) async{
    try{
      final respose = await ref.read(billsProvider.notifier).fetchBillsPayment(query, context, '');
      if(respose != 'success'){
       showSnackbar(context, respose);
      }
    }finally{
      if(_billsLoader){
        setState(() {
          _billsLoader = false;
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
    _loadStudentDetails();
    _loadAssignment();
    _loadAssignmentSubmitted();
    _loadAllNotification('', context);
    _totalApprovedSchoolFees();
    _totalDeclinedSchoolFees();
    _totalPendingSchoolFees();
    _totalSchoolFees();
    _loadFeesDetails('', context);
    _totalApprovedBills();
    _totalDeclinedBills();
    _totalPendingBills();
    _totalBills();
    _loadBillaDetails('', context);
  }


  

  @override
  Widget build(BuildContext context) {
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
  final customColors = Theme.of(context).extension<CustomColors>()!;
  final studentDetails = ref.watch(studentDetailsProvider);

  void openEditOverlay(id, subject, body, teacherPosted, datePosted, status){
    showModalBottomSheet(useSafeArea: true, isScrollControlled: true, context: context, builder: (ctx) => 
      ClassNotificationDetails(subject: subject, body: body, teacherPosted: teacherPosted, datePosted: datePosted, status: status)
    );

    if(status == 'unread'){
      _updateNotificationStatus(id, context);

    }

  }

  


  Widget buildGridItem(BuildContext context, IconData icon, String label, String route, double width, {Color? iconColor}) {
    return SizedBox(
    width: width,
    child: InkWell(
      onTap: route.isNotEmpty ? () => context.push(route) : null,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: iconColor ?? Theme.of(context).colorScheme.primary),
          const SizedBox(height: 5),
          Text(label, textAlign: TextAlign.center, overflow: TextOverflow.ellipsis, maxLines: 1,),
        ],
      ),
    ),
  );
}
  
    if (_loading) {
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


    if (_error != null) {
      return Scaffold(
        body: Center(child: Column(
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
        )),
        bottomNavigationBar: StudentTab(),
      );
    }
    return Scaffold(
      key: scaffoldKey,
      drawer: Drawer(
        child: MenuBarWidget()
      ),

      appBar: AppBar(
        centerTitle: true,
        leading: IconButton(onPressed: (){
          context.go('/student/user-profile');
        }, icon: Icon(Icons.person_3_rounded), color: customColors.lightText,),
        title: Text('Good ${getTimeOfDayGreeting()}', style: TextStyle(fontSize: 15,)),

        actions: [
          IconButton(
            icon: Icon(Icons.menu,),
            onPressed: () {
              scaffoldKey.currentState?.openDrawer();
            },
          ),
        ],
      ),
      body: Column(
        children: [
          
         Expanded(
           child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.only(left: 10, right: 10, top: 20),
                child: Column(
                  // mainAxisAlignment: MainAxisAlignment.center,
            
                  children: [
                    Container(
                      padding: EdgeInsets.all(15),
                      decoration: BoxDecoration(
                        image: DecorationImage(
                          image: AssetImage('assets/image/background.png'), // or NetworkImage(...)
                          fit: BoxFit.cover, // Cover the entire container
                        ),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          
                          Row(
                            children: [
                              CircleAvatar(
                                radius: 25,
                                backgroundImage: NetworkImage(studentDetails.passport),
                              ),
                              SizedBox(width: 10),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text('Greetings ${formatName(studentDetails.firstName)}!', style: TextStyle(color: Colors.white, fontSize: 17)),
                                  Text('How can we be off help today?', style: TextStyle(color: Colors.white, fontSize: 14)),
                                ],
                              )
                            ],
                          ),
                          SizedBox(height: 15),
                          SizedBox(
                            width: double.infinity,
                            child: Card(
                              color: Theme.of(context).colorScheme.primaryContainer,
                              child: Padding(
                                padding: const EdgeInsets.symmetric(vertical: 10),
                                child: Text(
                                  '${formatName(studentDetails.studentClass)} ',
                                  style: TextStyle(
                                    color: Theme.of(context).colorScheme.onPrimaryContainer,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 18,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),

                    SizedBox(height: 25,),
                    CarouselWithDots(),
              
                    SizedBox(height: 25,),
           
                    SizedBox(
                      width: double.infinity,
                      child: Card(
                        child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 18.0, horizontal: 10),
                          child: 
                            LayoutBuilder(
                              builder: (context, constraints) {
                                double totalWidth = constraints.maxWidth;
                                int itemsPerRow; // Or 4 depending on screen size or design
           
                                if (totalWidth < 200) {
                                  itemsPerRow = 2;
                                } else if (totalWidth < 300) {
                                  itemsPerRow = 3;
                                } else {
                                  itemsPerRow = 4;
                                }
                                double spacing = 15;
                                double itemWidth = (totalWidth - (spacing * (itemsPerRow - 1))) / itemsPerRow;
           
                                return Wrap(
                                  spacing: spacing,
                                  runSpacing: spacing,
                                  children: [
                                    buildGridItem(context, Icons.money, 'Pay fees', '/student/fees-history', itemWidth),
                                    buildGridItem(context, Icons.monetization_on, 'Pay Bill', '/student/bills-history', itemWidth,  iconColor: Theme.of(context).colorScheme.tertiary),
                                    buildGridItem(context, Icons.book_rounded, 'Assignment', '/student/assignment', itemWidth,  iconColor: Theme.of(context).colorScheme.secondary),
                                    buildGridItem(context, Icons.assessment, 'Result', '/student/check-result', itemWidth),
                                    buildGridItem(context, Icons.monetization_on, 'Scheme', '/student/scheme/select-term', itemWidth, iconColor: Colors.orange),
                                    buildGridItem(context, Icons.calendar_today, 'Timetable', '/student/class-timetable', itemWidth, iconColor: Colors.orange),
                                    buildGridItem(context, Icons.event, 'Events', '/student/school-event', itemWidth),
                                    buildGridItem(context, Icons.notifications, 'Notice', '/student/class-notification', itemWidth),
                                  ],
                                );
                              },
                            ),
           
                          
                        ),
                      ),
                    ),
           
                    Padding(
                      padding: const EdgeInsets.symmetric(vertical: 10),
                      child: SizedBox(
                        width: double.infinity,
                        child: Row(
                          children: [
                            Expanded(
                               child: Card(
                                child: Padding(
                                  padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10, top: 10),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      CircleAvatar(
                                        backgroundColor: Theme.of(context).colorScheme.primary,
                                        // foregroundColor: ,
                                        child:Icon(Icons.person, color: Colors.white,)
                                      ),
                              
                                      SizedBox(height: 15,),
                              
                                      Text('Student ID',),
                                        
                                      Text(studentDetails.userID, style: TextStyle(fontSize: 18,),)
                                    ],
                                  ),
                                ),
                                                          
                              ),
                            ),
           
                            SizedBox(width: 10,),
                      
                            Expanded(
                              child: Card(
                                child: Padding(
                                  padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10, top: 10),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      CircleAvatar(
                                        backgroundColor: Theme.of(context).colorScheme.secondary,
                                        // foregroundColor: ,
                                        child:Icon(Icons.school, color: Colors.white,)
                                      ),
                              
                                      SizedBox(height: 15,),
                              
                                      Text('Class'),
                                        
                                      Text(formatName(studentDetails.studentClass), style: TextStyle(fontSize: 18,),)
                                    ],
                                  ),
                                ),
                                                          
                              ),
                            ),
                            
                          ],
                        ),
                      ),
                    ),
           
                    Row(
                      children: [
           
                        Expanded(
                          child: Card(
                            child: Padding(
                              padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10, top: 10),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  CircleAvatar(
                                    backgroundColor: Theme.of(context).colorScheme.tertiary,
                                    // foregroundColor: ,
                                    child:Icon(Icons.description, color: Colors.white,)
                                  ),
                          
                                  SizedBox(height: 15,),
                          
                                  Text(_assignemtLength, style: TextStyle(fontSize: 28),),
                                    
                                  Text('Assignment Given'),
                                ],
                              ),
                            ),
                                                      
                          ),
                        ),
           
                        SizedBox(width: 10,),
           
                        Expanded(
                          child: Card(
                            child: Padding(
                              padding: const EdgeInsets.only(left: 15, right: 15, bottom: 10, top: 10),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  CircleAvatar(
                                    backgroundColor: Theme.of(context).colorScheme.primary,
                                    // foregroundColor: ,
                                    child:Icon(Icons.task, color: Colors.white,)
                                  ),
                          
                                  SizedBox(height: 15,),
                          
                                  Text(_assignmentSubmittedLength, style: TextStyle(fontSize: 28),),
                                    
                                  Text('Assignment Done'),
                                ],
                              ),
                            ),
                                                      
                          ),
                        ),
                          
                      ],
                    ),
                    
              
                  
            
                    SizedBox(height: 15,),
            
            
                    Card(
                      child: Padding(
                        padding: const EdgeInsets.only(top: 15, left: 15, right: 15),
                        child: SizedBox(
                          // height: 400,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Recent Class Notification'),
                              SizedBox(height: 10,),

                              _notificationLoader ? 
                                Center(
                                  child: CircularProgressIndicator(),
                                )
                              :

                              Consumer(
                                builder: (context, ref, child) {
                                  final notificationList = ref.watch(classNotificationProvider);

                                  if (notificationList.isEmpty) {
                                    return Center(
                                      child: Column(
                                        mainAxisAlignment: MainAxisAlignment.center,
                                        children: [
                                          Text(
                                            "Ooops... data not found",
                                            textAlign: TextAlign.center,
                                            style: Theme.of(context).textTheme.titleMedium,
                                          ),
                                        ],
                                      ),
                                    );
                                  }

                                  // 🔹 Take only the first 5 items (most recent)
                                  final recentNotifications = notificationList.take(5).toList();

                                  return ListView.builder(
                                    shrinkWrap: true,
                                    physics: const NeverScrollableScrollPhysics(),
                                    itemCount: recentNotifications.length,
                                    itemBuilder: (ctx, index) {
                                      final notice = recentNotifications[index];

                                      return Container(
                                        decoration: BoxDecoration(
                                          border: Border(
                                            bottom: BorderSide(
                                              color: customColors.lightBorder,
                                              width: 1.0,
                                            ),
                                          ),
                                        ),
                                        child: ListTile(
                                          onTap: () {
                                            openEditOverlay(
                                              notice.id,
                                              notice.subject,
                                              notice.text,
                                              notice.teacherDetails,
                                              notice.date,
                                              notice.status,
                                            );
                                          },
                                          contentPadding: EdgeInsets.zero,
                                          leading: CircleAvatar(
                                            backgroundColor: customColors.lightBorder,
                                            child: Icon(
                                              notice.status == 'read'
                                                  ? Icons.notifications
                                                  : Icons.notifications_active_outlined,
                                            ),
                                          ),
                                          title: Text(formatName(notice.subject)),
                                          trailing: Text(
                                            formatCurrentDate(notice.date),
                                            style: TextStyle(color: customColors.lightText),
                                          ),
                                          subtitle: Text(
                                            formatName(notice.text),
                                            style: TextStyle(color: customColors.lightText),
                                            overflow: TextOverflow.ellipsis,
                                            maxLines: 2,
                                          ),
                                        ),
                                      );
                                    },
                                  );
                                },
                              ),

                            
                            ],
                          ),
                        ),
                      ),
                    ),
            
                    SizedBox(height: 15,),
            
                    Card(
                      child: Padding(
                        padding: EdgeInsetsGeometry.all(20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('School Fees', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),),
                            SizedBox(height: 2,),
                            Text('Current school fees chart', style: TextStyle(color: customColors.lightText),),
                            SizedBox(height: 15,),
                            
                            Wrap(
                              spacing: 15,
                              runSpacing: 15,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('$_schoolFeesTotal', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),),
                                    Text('All Fees')
                                  ],
                                ),
            
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('$_pendingFees', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),),
                                    Text('Pending')
                                  ],
                                ),
            
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('$_successfulFees', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),),
                                    Text('Successful')
                                  ],
                                ),
            
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('$_declinedFees', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),),
                                    Text('Declined')
                                  ],
                                ),
            
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('(NGN)', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),),
                                    
                                  ],
                                ),
                              ],
                            ),
            
                            SizedBox(height: 40,),
            
                              SizedBox(
                                width: double.infinity,
                                height: 200,
                                child:BarChart(
                                  BarChartData(
                                    alignment: BarChartAlignment.spaceAround,
                                    maxY: _schoolFeesTotal, // highest bar value + some space
                                    barTouchData: BarTouchData(enabled: true),
                                    titlesData: FlTitlesData(
                                      leftTitles: AxisTitles(
                                        sideTitles: SideTitles(showTitles: true, reservedSize: 40),
                                      ),
                                      rightTitles: AxisTitles(
                                        sideTitles: SideTitles(showTitles: false),
                                      ),
                                      topTitles: AxisTitles(
                                        sideTitles: SideTitles(showTitles: false),
                                      ),
                                      bottomTitles: AxisTitles(
                                        sideTitles: SideTitles(
                                          showTitles: true,
                                          getTitlesWidget: (value, meta) {
                                            switch (value.toInt()) {
                                              case 0:
                                                return Text("Pending");
                                              case 1:
                                                return Text("Declined");
                                              case 2:
                                                return Text("Successful");
                                              default:
                                                return Text("");
                                            }
                                          },
                                        ),
                                      ),
                                    ),
                                    borderData: FlBorderData(show: false),
                                    barGroups: [
                                      BarChartGroupData(
                                        x: 0,
                                        barRods: [
                                          BarChartRodData(toY: _pendingFees, color: Colors.orange, width: 20),
                                        ],
                                      ),
                                      BarChartGroupData(
                                        x: 1,
                                        barRods: [
                                          BarChartRodData(toY: _declinedFees, color: Colors.red, width: 20),
                                        ],
                                      ),
                                      BarChartGroupData(
                                        x: 2,
                                        barRods: [
                                          BarChartRodData(toY: _successfulFees, color: Colors.green, width: 20),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              )
                          ],
                        ),
                      ),
                    ),
            
                    SizedBox(height: 15,),
                    Card(
                      child: Padding(
                        padding: const EdgeInsets.only(top: 15, left: 15, right: 15),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Recent School Fees', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                            SizedBox(height: 5,),
                            Text('Note: Red means declined, yellow means pending, green means approved'),
                            SizedBox(height: 16,),
            
                            Consumer(
                              builder: (context, ref, child) {
                                final schoolFeesList = ref.watch(schoolFeesProvider);
                                if (schoolFeesList.isEmpty) {
                                  return  Center(child: Column(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        Icon(Icons.error_outline),
                                        Text("No fees available", textAlign: TextAlign.center, style: Theme.of(context).textTheme.titleMedium,),

                                      ],
                                    )
                                  );
                                }
                                final recentFees = schoolFeesList.take(5).toList();
                                return ListView.builder(
                                  shrinkWrap: true,
                                  physics: NeverScrollableScrollPhysics(),
                                  itemCount: recentFees.length,
                                  itemBuilder: (ctx, index){
                                    final fee = recentFees[index];
                                
                                    Widget status = CircleAvatar(
                                      backgroundColor: customColors.successful,
                                      child: Icon(Icons.check,  color: Colors.white,),
                                    );
                                
                                    if(fee.status == 'pending'){
                                      status = CircleAvatar(
                                        backgroundColor: customColors.pending,
                                        child: Icon(Icons.hourglass_top,  color: Colors.white,),
                                      );
                                    }
                                
                                    if(fee.status == 'declined'){
                                      status = CircleAvatar(
                                        backgroundColor: customColors.declined,
                                        child: Icon(Icons.cancel_outlined, color: Colors.white,),
                                      );
                                    }
                                    return Container(
                                      decoration: BoxDecoration(
                                        border: Border(
                                          bottom: BorderSide(
                                            color: customColors.lightBorder,
                                            width: 1.0
                                          )
                                        )
                                        
                                      ),
                                      child: ListTile(
                                        
                                        onTap: (){
                                          // context.push('/student/fees-history/detail/${fee.id}');
                                          Navigator.of(context).push(
                                            MaterialPageRoute(builder: (ctx) => SchoolFeesDetailScreen(feeDetails: fee,)) 
                                          );
                                        },
                                        contentPadding: EdgeInsets.zero,
                                      
                                        leading: status,
                                        title: Text(formatName(fee.feeTypeDetails['fee_choice'])),
                                        trailing: Text('${formatMoney(fee.feeTypeDetails['amount'].toString())} NGN', style: TextStyle(fontSize: 14),),
                                        subtitle: Text(formatDate(fee.date)),
                                      ),
                                    );
                                  },  
                                );
                              },
                                
                            ),
                          ],
                        ),
                      ),
                    ),
           
                    SizedBox(height: 15,),                     
                    
                    Card(
                      child: Padding(
                        padding: EdgeInsetsGeometry.all(20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Bills', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),),
                            SizedBox(height: 5,),
                            Text('Bills Chart'),
                            SizedBox(height: 15,),
                            
                            Wrap(
                              spacing: 15,
                              runSpacing: 15,
                              children: [
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('$_billsTotal', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),),
                                    Text('All Bills')
                                  ],
                                ),
            
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('$_billsPending', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),),
                                    Text('Pending')
                                  ],
                                ),
            
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('$_billsSuccessful', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),),
                                    Text('Success')
                                  ],
                                ),
            
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('$_billsDeclined', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),),
                                    Text('Declined')
                                  ],
                                ),
            
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text('(NGN)', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),),
                                    
                                  ],
                                ),
                              ],
                            ),
            
                            SizedBox(height: 55,),
            
                            SizedBox(
                              width: double.infinity,
                              height: 200,
                              child:PieChart(
                                PieChartData(
                                  sectionsSpace: 0, // no borders between sections
                                  centerSpaceRadius: 40, // empty circle in middle (optional)
                                  sections: [
                                    PieChartSectionData(
                                      value: _billsPending,
                                      title: "Pending",
                                      color: Colors.orange,
                                      radius: 100,
                                      titleStyle: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
                                    ),
                                    PieChartSectionData(
                                      value: _billsDeclined,
                                      title: "Declined",
                                      color: Colors.red,
                                      radius: 100,
                                      titleStyle: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
                                    ),
                                    PieChartSectionData(
                                      value: _billsSuccessful,
                                      title: "Success",
                                      color: Colors.green,
                                      radius: 100,
                                      titleStyle: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white),
                                    ),
                                  ],
                                ),
                              ),
                            ),
           
                            SizedBox(height: 60,)
                          ],
                        ),
                      ),
                    ),
           
                    SizedBox(height: 15,),
           
                    Card(
                      child: Padding(
                        padding: const EdgeInsets.only(top: 15, left: 15, right: 15),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Recent Bills', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                            SizedBox(height: 5,),
                            Text('Note: Red means declined, yellow means pending, green means approved'),
                            SizedBox(height: 16,),
            
                            Consumer(
                              builder: (context, ref, child) {
                                final billsList = ref.watch(billsProvider);
                                if (billsList.isEmpty) {
                                  return  Center(child: Column(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        Image.asset(
                                          'assets/image/404.png',
                                          width: 300,
                                          height: 300,
                                        ),
                                        Text("No matching bill found", textAlign: TextAlign.center, style: Theme.of(context).textTheme.titleMedium,),
                                        

                                      ],
                                    )
                                  );
                                }

                                final recentBills = billsList.take(5).toList();

                                
                                return ListView.builder(
                                  shrinkWrap: true,
                                  physics: NeverScrollableScrollPhysics(),
                                  itemCount: recentBills.length,
                                  itemBuilder: (ctx, index){
                                    final bill = recentBills[index];
                                
                                    Widget status = CircleAvatar(
                                      backgroundColor: customColors.successful,
                                      child: Icon(Icons.check,  color: Colors.white,),
                                    );
                                
                                    if(bill.status == 'pending'){
                                      status = CircleAvatar(
                                        backgroundColor: customColors.pending,
                                        child: Icon(Icons.hourglass_top,  color: Colors.white,),
                                      );
                                    }
                                
                                    if(bill.status == 'declined'){
                                      status = CircleAvatar(
                                        backgroundColor: customColors.declined,
                                        child: Icon(Icons.cancel_outlined, color: Colors.white,),
                                      );
                                    }
                                    return Container(
                                      decoration: BoxDecoration(
                                        border: Border(
                                          bottom: BorderSide(
                                            color: customColors.lightBorder,
                                            width: 1.0
                                          )
                                        )
                                        
                                      ),
                                      child: ListTile(
                                        
                                        onTap: (){
                                          Navigator.of(context).push(
                                            MaterialPageRoute(builder: (ctx) => BillsDetailScreen(billDetails: bill)) 
                                          );
                                        },
                                        contentPadding: EdgeInsets.zero,
                                      
                                        leading: status,
                                        title: Text(formatName(bill.billTypeDetails['bill_name'])),
                                        trailing: Text('${formatMoney(bill.billTypeDetails['amount'].toString())} NGN', style: TextStyle(fontSize: 14),),
                                        subtitle: Text(formatDate(bill.date)),
                                      ),
                                    );
                                  },  
                                );
                              },
                              
                              
                            )
                          ],
                        ),
                      ),
                    ),
                    
                    SizedBox(height: 15,),
                    Card(
                      child: Padding(
                        padding: EdgeInsetsGeometry.all(20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Image.asset(
                              'assets/image/support.png',
                              width: 200,
                              height: 200,
                            ),
                            SizedBox(
                              height: 15,
                            ),
                            Text(
                              'We’re here to help you!',
                              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                            ),
                            SizedBox(
                              height: 10,
                              
                            ),
           
                            Text('Ask a question or file a support ticket, manage request, report an issues. Our team support team will get back to you by email.'),
                            SizedBox(height: 17,),
                            SizedBox(
                              width: double.infinity,
                              height: 50,
                              child: ElevatedButton(
                                onPressed: () {
                                  context.push('/student/help');
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Theme.of(context).colorScheme.primary,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(12), 
                                  ),
                                ),
                                child: Text(
                                  "Get Support Now",
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
                    SizedBox(height: 40,)
                  ],
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

class TopCurveClipper extends CustomClipper<Path> {
   @override
  Path getClip(Size size) {
    const double radius = 0;

    Path path = Path();

    // Start at top-left
    path.moveTo(0, 0);

    // Line to top-right
    path.lineTo(size.width, 0);

    // Line to bottom-right before corner
    path.lineTo(size.width, size.height - radius);

    // Bottom-right arc
    path.quadraticBezierTo(
      size.width, size.height,
      size.width - radius, size.height,
    );

    // Line to bottom-left before corner
    path.lineTo(radius, size.height);

    // Bottom-left arc
    path.quadraticBezierTo(
      0, size.height,
      0, size.height - radius,
    );

    // Close the path back to top-left
    path.close();

    return path;
  }

  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) => false;
}

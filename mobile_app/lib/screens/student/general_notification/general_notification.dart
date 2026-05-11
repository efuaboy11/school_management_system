
import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/providers/school_notification.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/student/tabs.dart';
import 'package:mobile_app/screens/student/general_notification/general_notifcation_details.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/platform_back_button.dart';
import 'package:http/http.dart' as http;


class GeneralNotificationScreen extends ConsumerStatefulWidget{
  const GeneralNotificationScreen({super.key});

  @override
  ConsumerState<GeneralNotificationScreen> createState() => _GeneralNotificationScreenState();
}

class _GeneralNotificationScreenState extends ConsumerState<GeneralNotificationScreen> {

  String _currentPage = 'all';
  bool _loading = true;
  final _searchController = TextEditingController();
  Timer? _debounce;

  void _showAll(){
    showLoadingDialog(context);
    _loadAllNotificationTab('', context, 'load');

    setState(() {
      _currentPage ='all';
    });
  }

  void _showRead(){
    showLoadingDialog(context);
    _loadReadNotification('', context, 'load');
    setState(() {
      _currentPage = 'read';
    });

  }

  void _showUnRead(){
    showLoadingDialog(context);
    _loadUnreadNotification('', context, 'load');
    setState(() {
      _currentPage = 'unread';
    });

  }

  Future<void> _loadAllNotification(String query, context) async{
    final respose = await ref.read(schoolNotificationProvider.notifier).fetchSchoolNotification(query, context, '');
    if(respose != 'success'){
      showSnackbar(context, respose);
    }
    
  }

  Future<void> _loadAllNotificationTab(String query, context, String type) async{
    final respose = await ref.read(schoolNotificationProvider.notifier).fetchSchoolNotification(query, context, '');
    if(respose != 'success'){
      showSnackbar(context, respose);
    }
    if(type == 'load'){
      hideLoadingDialog(context);
    }
    
  }


  Future<void> _loadReadNotification(String query, context, String type) async{
    final respose = await ref.read(schoolNotificationProvider.notifier).fetchSchoolNotification(query, context, 'read');
    if(respose != 'success'){
      showSnackbar(context, respose);
    }
    if(type == 'load'){
      hideLoadingDialog(context);
    }
    
  }

  Future<void> _loadUnreadNotification(String query, context, String type) async{
    final respose = await ref.read(schoolNotificationProvider.notifier).fetchSchoolNotification(query, context, 'unread');
    if(respose != 'success'){
      showSnackbar(context, respose);
    }
    if(type == 'load'){
      hideLoadingDialog(context);
    }
    
  }


  Future<void> _loadNotification() async{
    await _loadAllNotification('', context);
    if(!mounted) return;
    if(_loading){
      setState(() {
        _loading = false;
      });
    }
    
    
  }

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
          'https://school.amanilightequity.com/api/update-notification/schoolnotification/$notificationId'
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

    _loadNotification();
  }

  @override
  void dispose() {
    _searchController.dispose();
    _debounce?.cancel();
    super.dispose();
  }


  @override
  Widget build(BuildContext context) {
    final customColors = Theme.of(context).extension<CustomColors>()!;
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
    final unreadCount = ref.watch(schoolNotificationProvider).where((notification) => notification.status == 'unread').length;
    void openEditOverlay(id, subject, body, datePosted, status){
      showModalBottomSheet(useSafeArea: true, isScrollControlled: true, context: context, builder: (ctx) => 
        GeneralNotificationDetails(subject: subject, body: body,  datePosted: datePosted, status: status)
      );

      if(status == 'unread'){
        _updateNotificationStatus(id, context);

      }

    }

    Widget pageTab = Row(
      spacing: 10,
      children: [
        InkWell(
          onTap: _showAll,
          child: Container(
            padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              color: _currentPage == 'all' ?Theme.of(context).colorScheme.primary : customColors.lightBorder
            ),
          
            child: Text('All', 
              style: TextStyle(color: _currentPage == 'all' ? Colors.white : null,),
            
            ),
          ),
        ),


        InkWell(
          onTap: _showRead,
          
          child: Container(
            padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(50),
              color: _currentPage == 'read' ? Theme.of(context).colorScheme.primary : customColors.lightBorder
            ),
            child: Text('Read',
              style: TextStyle(color: _currentPage == 'read' ? Colors.white : null,),
            
            ),
          ),
        ),

        InkWell(
          onTap: _showUnRead,
          child: Container(
            padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(50),
              color: _currentPage == 'unread' ? Theme.of(context).colorScheme.primary : customColors.lightBorder
            ),
            child: Text('Unread ($unreadCount)',
              style: TextStyle(color: _currentPage == 'unread' ? Colors.white : null,),
            
            ),
          ),
        ),

        
      ],
    );

    Widget listContent = Expanded(
      child: Consumer(
        builder: (context, ref, child) {
          final notificationList = ref.watch(schoolNotificationProvider);

          if(notificationList.isEmpty){
            return  Center(child: 
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image.asset(
                    'assets/image/404.png',
                    width: 300,
                    height: 300,
                  ),
                  Text("Ooops... data not found", textAlign: TextAlign.center, style: Theme.of(context).textTheme.titleMedium,),                  
                ],
              )
            );
          }

          return ListView.builder(
            itemCount: notificationList.length,
            itemBuilder: (ctx, index){
              final notice = notificationList[index];

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
                    openEditOverlay(
                      notice.id,
                      notice.subject,
                      notice.text,
                      notice.date,
                      notice.status
                    );
                  },
                  contentPadding: EdgeInsets.zero,
                  leading: CircleAvatar(
                    backgroundColor: customColors.lightBorder,
                    child: Icon(notice.status == 'read' ?  Icons.notifications : Icons.notifications_active_outlined,),
                  ),
                  title: Text(formatName(notice.subject)),
                  trailing: Text(formatCurrentDate(notice.date), style: TextStyle(color: customColors.lightText),),
                  subtitle: Text(formatName(notice.text), 
                                  style: TextStyle(color: customColors.lightText),
                                  overflow: TextOverflow.ellipsis, maxLines: 2
                                ),
                ),
              );
            }
          );
        }),    
    );



    Widget content = Padding(
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
                _loadAllNotificationTab(value, context, '');
              });
            },
            style: TextStyle(fontSize: 14.0), // smaller text
          ),

          SizedBox(height: 24,),

          pageTab,

          SizedBox(height: 15,),

          listContent,
      
        ],
      ),
    );


    if(_currentPage == 'read'){
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
                  _loadReadNotification(value, context, '');
                });
              },
              style: TextStyle(fontSize: 14.0), // smaller text
            ),

            SizedBox(height: 24,),

            pageTab,

            SizedBox(height: 15,),

            listContent,
        
          ],
        ),
      );
    }

    if(_currentPage == 'unread'){
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
                  _loadUnreadNotification(value, context, '');
                });
              },
              style: TextStyle(fontSize: 14.0), // smaller text
            ),

            SizedBox(height: 24,),

            pageTab,

            SizedBox(height: 15,),

            listContent,
        
          ],
        ),
      );
    }

    if(_loading){
      return Center(
        child: Image.asset(
          'assets/image/loading.gif',
          width: 120,
          height: 120,
        )
      );
    }

    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(
        leading: IconButton(
          icon: PlatformBackButton(),
          onPressed: () => context.pop(),
        ),
        title: Text('General Notifications', style: TextStyle(fontSize: 18)),
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
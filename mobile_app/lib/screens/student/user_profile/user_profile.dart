import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/models/student_details.dart';
import 'package:mobile_app/providers/student_details.dart';
import 'package:mobile_app/screens/student/user_profile/edit_user_contact_info.dart';
import 'package:mobile_app/screens/student/user_profile/edit_user_personal_information.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/student/tabs.dart';

class UserProfileScreen extends ConsumerStatefulWidget {
  const UserProfileScreen({super.key});

  @override
  ConsumerState<UserProfileScreen> createState() => _UserProfileScreenState();
}

class _UserProfileScreenState extends ConsumerState<UserProfileScreen> {
  bool _loading = true;
  String? _error;

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

  

  @override
  Widget build(BuildContext context) {
    final studentDetails = ref.watch(studentDetailsProvider);
    final customColors = Theme.of(context).extension<CustomColors>()!;
    void openEditPersonalInfoOverlay(StudentDetails studentDetails){
      showModalBottomSheet(useSafeArea: true, isScrollControlled: true, context: context, builder: (ctx) => EditUserPersonalInformation(studentDetails: studentDetails,));
    }
    void openEditContactInfoOverlay(StudentDetails studentDetails){
      showModalBottomSheet(useSafeArea: true, isScrollControlled: true, context: context, builder: (ctx) => EditUserContactInformation(studentDetails: studentDetails,));
    }
    Widget buildGridItem(BuildContext context, String text, String subText, double width){
      return SizedBox(
        width: width,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(text, style: Theme.of(context).textTheme.bodySmall!.copyWith(
              color: customColors.lightText
            ),),
            Text(subText)
          ],
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
      body: Column(
        children: [
          Stack(
            clipBehavior: Clip.none, // Allows profile image to overflow
            children: [
              // Background rectangle with image
              Container(
                width: double.infinity,
                height: 200,
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage('assets/image/background2.png'), // Replace with your image
                    fit: BoxFit.cover,
                  ),
                ),
              ),

              // Profile image at bottom center, half outside
              Positioned(
                bottom: -50, // Half of the circle will hang outside
                left: 0,
                right: 0,
                child: CircleAvatar(
                  radius: 60,
                  backgroundColor: Theme.of(context).colorScheme.inversePrimary,
                  child: CircleAvatar(
                    radius: 55,
                    backgroundImage: NetworkImage(studentDetails.passport), // Replace with user image
                  ),
                ),
              ),

              Positioned(
                bottom: -70, // Half of the circle will hang outside
                
                right: 20,
                
                child: Image.asset('assets/image/verified.png', height: 30, width: 30,)
              ),
            ],
          ),

          const SizedBox(height: 60), 
          Text('${formatName(studentDetails.lastName)} ${formatName(studentDetails.firstName)}', textAlign: TextAlign.center, style: Theme.of(context).textTheme.titleLarge,),
          Text(formatName(studentDetails.studentClass), textAlign: TextAlign.center, style: Theme.of(context).textTheme.titleMedium,),

          Expanded(
            child: SingleChildScrollView(
              child: Padding(
                padding: EdgeInsets.all(15),
                child: Column(
                  spacing: 10,
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
              
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('Personal Information'),
                                OutlinedButton.icon(
                                  onPressed: (){
                                    openEditPersonalInfoOverlay(studentDetails);
                                  },
                                  icon: Icon(Icons.edit, color: Theme.of(context).colorScheme.primary),
                                  label: Text('Edit', style: TextStyle(color: Theme.of(context).colorScheme.primary)),
                                  style: OutlinedButton.styleFrom(
                                    side: BorderSide(color: Theme.of(context).colorScheme.primary),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
              
                          Padding(
                            padding: const EdgeInsets.all(15),
                            child: LayoutBuilder(
                              builder:  (context, constraints){
                                double totalWidth = constraints.maxWidth;
                                int itemsPerRow = 2;
                                double spacing = 15;
                                double itemWidth = (totalWidth - (spacing * (itemsPerRow - 1))) / itemsPerRow;
                            
                                return Wrap(
                                  spacing: spacing,
                                  runSpacing: spacing,
                                  children: [
                                    buildGridItem(context, 'Student ID', studentDetails.userID, itemWidth),
                                    buildGridItem(context, 'D.0.B', formatDate(studentDetails.dateOfBirth), itemWidth),
                                    buildGridItem(context, 'Gender', formatName(studentDetails.gender), itemWidth),
                                    buildGridItem(context, 'Father Name', formatName(studentDetails.fatherName), itemWidth),
                                    buildGridItem(context, 'Mothers name', formatName(studentDetails.motherName), itemWidth),
                                    buildGridItem(context, 'Disability', formatName(studentDetails.disability), itemWidth),
                                    buildGridItem(context, 'Religion', formatName(studentDetails.religion), itemWidth),
                                  ],
                                );
                            
                            
                              }
                            ),
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
              
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('School Information'),
                                
                              ],
                            ),
                          ),
              
                          SizedBox(height: 15,),


                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 15),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('Account username:'),
                                Text(studentDetails.userName, style: Theme.of(context).textTheme.bodySmall!.copyWith(
                                  color: customColors.lightText
                                ),)
                              ],
                            ),
                          ),

                          SizedBox(height: 10,),

                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 15),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('Current class:'),
                                Text(formatName(studentDetails.studentClass), style: Theme.of(context).textTheme.bodySmall!.copyWith(
                                  color: customColors.lightText
                                ),)
                              ],
                            ),
                          ),


                          SizedBox(height: 10,),

                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 15),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('Admission number:'),
                                Text(studentDetails.admissionNumber, style: Theme.of(context).textTheme.bodySmall!.copyWith(
                                  color: customColors.lightText
                                ),)
                              ],
                            ),
                          ),


                          SizedBox(height: 10,),

                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 15),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('Account Status:'),
                                Text(formatName(studentDetails.accountStatus), style: Theme.of(context).textTheme.bodySmall!.copyWith(
                                  color: customColors.lightText
                                ),)
                              ],
                            ),
                          ),
                          
                          SizedBox(height: 20,)


                          
              
              
              
              
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
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('Contact Information'),
                                OutlinedButton.icon(
                                  onPressed: (){
                                    openEditContactInfoOverlay(studentDetails);
                                  },
                                  icon: Icon(Icons.edit, color: Theme.of(context).colorScheme.primary),
                                  label: Text('Edit', style: TextStyle(color: Theme.of(context).colorScheme.primary)),
                                  style: OutlinedButton.styleFrom(
                                    side: BorderSide(color: Theme.of(context).colorScheme.primary),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
              
                          SizedBox(height: 15,),


                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 15),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('State of Origin:'),
                                Text(formatName(studentDetails.stateOfOrigin), style: Theme.of(context).textTheme.bodySmall!.copyWith(
                                  color: customColors.lightText
                                ),)
                              ],
                            ),
                          ),

                          SizedBox(height: 10,),

                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 15),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('City/town:'),
                                Text(formatName(studentDetails.cityOrTown), style: Theme.of(context).textTheme.bodySmall!.copyWith(
                                  color: customColors.lightText
                                ),)
                              ],
                            ),
                          ),


                          SizedBox(height: 10,),

                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 15),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('House Address:'),
                                Text(formatName(studentDetails.homeAddres), style: Theme.of(context).textTheme.bodySmall!.copyWith(
                                  color: customColors.lightText
                                ),)
                              ],
                            ),
                          ),


                          SizedBox(height: 10,),

                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 15),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('Phone number:'),
                                Text(studentDetails.phoneNumber, style: Theme.of(context).textTheme.bodySmall!.copyWith(
                                  color: customColors.lightText
                                ),)
                              ],
                            ),
                          ),
                          
                          SizedBox(height: 20,)


                          
              
              
              
              
                        ],
                      ),
                    ),

                    
                  ],
                ),

              ),
            )
          )
          
          
        ],
      ),
      bottomNavigationBar: StudentTab(),

    );
  }
}
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { SwUpdate } from "@angular/service-worker";
import { MenuController, Platform, ToastController, ModalController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { Storage } from "@ionic/storage";
import { NotificationsService } from "./providers/communication.service";
import { Subscription } from "rxjs";
import { UserServices } from './providers/user.services';
import { Location } from '@angular/common';
// import { UserData } from './providers/user.services';
import * as io from "socket.io-client";
import { WebSocketService } from './web-socket.service'
import { ProductService } from './providers/product.services';
import { ThrowStmt } from '@angular/compiler';
// import { NativeAudio } from '@ionic-native/native-audio/index';
// import { BackgroundMode } from '@ionic-native/background-mode';
import { OrderIncomingPage } from "./modal/order-incoming";
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { UpdateOrderService } from "./providers/update-order";
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit {

public socket:any = null;
public orderList: any = [];
public newOrderList:any =[];

public totalCount =0;
public newTotalCount =0;




  public AdminName:String;
  public selectedTheme = 'light'
  appPages = [
    {
      title: "Notes",
      url: "/notemgnt",
      icon: "create-outline",
    },
    {
      title: "Goals",
      url: "/goalmgnt",
      icon: "golf-outline",
    },
    {
      title: "EMI Manager",
      url: "/emimgnt",
      icon: "receipt-outline",
    },

  ];
  loggedIn = false;
  dark = false;

  subscription: Subscription;
  backButtonSubscription

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private socialSharing: SocialSharing,
    private _notificationsService: NotificationsService,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    public _userService: UserServices,
    private location:Location,
    private _socketService:WebSocketService,
    private _ProductService: ProductService,
    public modalController: ModalController,
    private backgroundMode: BackgroundMode,
    private UpdateOrderService:UpdateOrderService,
    
    // public nativeAudio: NativeAudio ,
    // public backgroundMode:BackgroundMode,
    private vibration: Vibration,
    private push: Push
  ) {

    this.subscription = this._notificationsService.getData().subscribe((x) => {
      alert("x : " + x);
    });


    platform.ready().then(async () => {
      // console.log("background mode offff")
      // this.backgroundMode.enable();
      // console.log("background mode check",this.backgroundMode.isActive(), this.backgroundMode.isEnabled(),this.backgroundMode.isScreenOff);

      // // this.backgroundMode.enable();

      // console.log("-------------------->", this.backgroundMode.isEnabled());
      console.log("-------------------->", this.push);
      // this.backgroundMode.on("activate").subscribe(async ()=>{
      //   // alert("background mode activated")
      //   this.getLastestOrders()
      //   console.log("background mode on");

      //   setInterval(()=>{
      //     console.log("calling in 2 sec")
      //   }, 60000);
      // });

      this.push.hasPermission()
      .then((res: any) => {
    
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }
    
      });
      
        const options: PushOptions = {
          android: {
            senderID:"216514415613"
          },
          ios: {
              alert: 'true',
              badge: true,
              sound: 'false'
          },
    
       }
    
       const pushObject: PushObject = this.push.init(options);
       console.log(pushObject,"pushObject")
    
       pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    
       pushObject.on('registration').subscribe((deviceData: any) => {
         console.log('Device registered', deviceData);
         this._userService
         .updateAdminProfile( {
           device_token : deviceData.registrationId || ''
         },localStorage.getItem('adminId'))
         .subscribe(async (data: any) => {
           console.log("data", data);
          //  alert("success" + deviceData.registrationId )
    
         });
        });
    
       pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    

      // this.backgroundMode.on()
    });






    // this._socketService.listen('test event').subscribe((data) => {
    //   console.log("data : " + data);
    // });

    this.initializeApp();
  }

  trackPosition = () => {
    console.log("sdghjkjhgdghjkjhg")
  };



  async ngOnInit() {
    // this.openOrderIncomingModal(3);


  // this.getorderList();

    // this.nativeAudio.preloadSimple('audio1', '/assets/sound/order.mp3').then((msg)=>{
    //   console.log("message: " + msg);
    //   this.playAudio();
    // }, (error)=>{
    //   console.log("error: " + error);
    // });


    // alert("called")


    // Change global volume.
    // Howler.volume(0.5);

    // this.playAudio();
    // this.getLastestOrders()

    // const socket = new WebSocket('ws://http://13.127.184.151:4000');



//  console.log(socket,"socket connection")

//  socket.onopen(():any => {
//   socket.send('Hello!');
//   return
// });

// socket.onmessage(data => {
//   console.log(data);
// });
    // this.checkLoginStatus();
    // this.listenForLoginEvents();
    // this.swUpdate.available.subscribe(async res => {
    //   const toast = await this.toastCtrl.create({
    //     message: 'Update available!',
    //     position: 'bottom',
    //     buttons: [
    //       {
    //         role: 'cancel',
    //         text: 'Reload'
    //       }
    //     ]
    //   });
    //   await toast.present();
    //   toast
    //     .onDidDismiss()
    //     .then(() => this.swUpdate.activateUpdate())
    //     .then(() => window.location.reload());
    // });


  }


  pushsetup(){

  //   this.push.hasPermission()
  // .then((res: any) => {

  //   if (res.isEnabled) {
  //     console.log('We have permission to send push notifications');
  //   } else {
  //     console.log('We do not have permission to send push notifications');
  //   }

  // });
  
  //   const options: PushOptions = {
  //     android: {
  //       senderID:"35150350528"
  //     },
  //     ios: {
  //         alert: 'true',
  //         badge: true,
  //         sound: 'false'
  //     },

  //  }

  //  const pushObject: PushObject = this.push.init(options);

  //  pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

  //  pushObject.on('registration').subscribe((deviceData: any) => {
  //    console.log('Device registered', deviceData);
  //    this._userService
  //    .updateAdminProfile( {
  //      device_token : deviceData.registrationId || ''
  //    },localStorage.getItem('adminId'))
  //    .subscribe(async (data: any) => {
  //      console.log("data", data);
  //     //  alert("success" + deviceData.registrationId )

  //    });
  //   });

  //  pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }


   



 
  public page = {
    limit: 30,
    skip: 0,
  };

  uniqueByKeepLast(data, key) {
    return [...new Map(data.map((x) => [key(x), x])).values()];
  }

  getorderList() {
    this._ProductService
      .getOrderList(this.page, {
        filter: "none",
        search: "none",
      })
      .subscribe((response: any) => {

        let arr = response["OrderList"];
        if (arr.length > 0) {
          this.orderList = this.uniqueByKeepLast(arr, it=>it.orderId);
        }
        console.log(this.orderList, "orderList");
        this.totalCount = response["totalCount"];
      });
  }


 

  async openOrderIncomingModal(audio,newOrderCount) {
    const modal = await this.modalController.create({
      component: OrderIncomingPage,
      cssClass: 'small-modal',
      componentProps: {
        newOrderCount: newOrderCount,
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      audio.pause();
      audio.currentTime = 0;
      // alert("soped")
    });

    return await modal.present();
  }


  // playAudio(){
  //   let audio = new Audio();
  //   audio.src = "/assets/sound/order.mp3";
  //   audio.load();
  //   audio.play();
  // }



  public userName = 'Shashwat Gupta';
  public userImage = '';


  //
  message = '';
  messages = [];
  currentUser = '';

  sendMessage() {
    this.socket.emit('send-message', { text: this.message });
    this.message = '';
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#282b3d');
      this.statusBar.styleLightContent()
      // this.statusBar.overlaysWebView(true);
      this.splashScreen.hide();
      // this._userService.getAdminProfile(localStorage.getItem('adminId')).subscribe(async (data: any) => {
      //   console.log("data", data);
      //    let AdminProfile = data.data;
      //    this.AdminName = AdminProfile.fullName;
      //    this.userName = AdminProfile.fullName;
      //    this.userImage = AdminProfile.Image;
        //  alsert("called "+ this.userName)
        //  alert("AdminName"+this.AdminName)public modalController: ModalController,
      // });

      // this.pushsetup();
    });
  }

  ngAfterViewInit(): void {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      if(window.location.href.includes('analytics')){
          navigator['app'].exitApp();
      }else{
          this.location.back()
      }
  });
  }

  // checkLoginStatus() {
  //   return this.userData.isLoggedIn().then(loggedIn => {
  //     return this.updateLoggedInStatus(loggedIn);
  //   });
  // }

  share() {
    this.platform.ready().then(async () => {
      await this.socialSharing
        .share("https://www.badhaobusiness.in/")
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener("user:login", () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener("user:signup", () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener("user:logout", () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("AuthToken");
    return this.router.navigateByUrl("/login");
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set("ion_did_tutorial", false);
    this.router.navigateByUrl("/tutorial");
  }

  onActivate(componentReference) {
    console.log(componentReference,"componentReference");
    this.AdminName = componentReference.AdminProfile
      ? componentReference.AdminProfile.fullName
      : "";
      // alert("AdminName :" +this.AdminName)
  }

  // logout(){

  // }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
    this.backButtonSubscription.unsubscribe();
  }
}

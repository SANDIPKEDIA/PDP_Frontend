import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UserServices } from '../../providers/user.services'
import { TransectionDetailsPage } from "./components/transection-details/transection-details";
import { AddEditStockPageModel } from "./model/stock/add-edit-stock.page";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})

export class StockPage implements OnInit {

  myReactiveForm: FormGroup;
  isShow: boolean = false;
  isOn: boolean;
  editUserId;
  formData;
  public available:any;
   public id;
  public transectionData: any;

  public show: boolean = false;
  list: any;
  // public del: string;
  constructor(
    private user: UserServices,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController,
  ) { }

  getStockManagement() {
    this.user.getStock().subscribe((result) => {
      console.log("Stock result", result);
      this.list = result["response"];
    });
  }

  ngOnInit() {
    this.getStockManagement();

    this.myReactiveForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      quantity: new FormControl(''),

      totalItem_count: new FormControl(''),
      description: new FormControl(''),

    });
  }

  onSubmit() {

    this.isShow = false;
    console.log(this.myReactiveForm);
    this.user.saveStock(this.myReactiveForm.value).subscribe((data) => {
      this.myReactiveForm.reset();
      // this.presentToast("Stock added");
      this.getStockManagement();
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: "success",
    });
    toast.present();
  }

  deleteStockManagement(id) {
    this.user.deleteStock(id).subscribe((data) => {
      this.getStockManagement();
      this.presentToast("Stock Deleted");
    });
  }


  editStockManagement(data) {
    this.isShow = true;

    //automatic set
    this.myReactiveForm.patchValue(data);

    // manual set 
    this.myReactiveForm.get('id').setValue(data._id);
  }

  updateStockManagement(body) {
    //get value from form
    let id = this.myReactiveForm.get("id").value;

    this.user.editStock(body.value, id).subscribe((data) => {
      this.myReactiveForm.reset();
      this.isShow = false;
      // this.presentToast("Stock Updated");
      this.getStockManagement();
    });
  }

  async presentAlertConfirm(id) {
    let self = this;
    const alert = await this.alertController.create({
      header: 'Delete Stock',
      message: "Are you sure you want to delete?",
      buttons: [
        {
          text: 'Cancel',

          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Okay',
          handler: () => {
            self.deleteStockManagement(id)
          }
        }
      ]
    });

    await alert.present();
  }

  async openAddStockModal() {
    const modal = await this.modalController.create({
      component: AddEditStockPageModel,
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getStockManagement();
    });
    return await modal.present();
  }


  //transectiondetails
  async openDetailsStockModal(body) {
    const modal = await this.modalController.create({
      component: TransectionDetailsPage,
      componentProps: {
        data:body
      }
    });
    // debugger
    modal.onDidDismiss().then((dataReturned) => {
      this.getStockManagement();
    });
    return await modal.present();
  }
  fetchTransectionDetails(data) {
    this.id = this.user.getStockTransectionDetails(data)
    debugger
    this.user.getStockTransectionDetails(data).subscribe((result: any) => {
        this.transectionData = result.response[0];
        // debugger
        console.log("itemName", this.transectionData.itemName);

        console.log("useItem_count", this.transectionData.useItem_count);

        console.log("date", this.transectionData.date);

        console.log("quantityType", this.transectionData.quantityType);
      });
  }



  async openEditStockModal(body) {
    const modal = await this.modalController.create({
      component: AddEditStockPageModel,
      componentProps: {
        data: body
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      this.getStockManagement();
    });
    return await modal.present();
  }
  displayText() {
    this.show = !this.show
  }

  //alert

  async updateUseItemCount(stockData) {
   
    let self = this;
    
    const alert = await this.alertController.create({
      
      cssClass: 'my-custom-class',
      header: '',
      inputs: [
        {
          name: 'date',
          type: 'date',
          placeholder: 'Enter Date'
        },
        { 
         
          name: 'used_count',
          type: 'number',
          placeholder: 'Enter Value(Use-Items)'
        },
        // multiline input.
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
            self.updateUsedCount(data, stockData)
          }
        }
      ]
    });
    await alert.present();
  }
  updateUsedCount(data, stockData) {
    if(data.date==''){
      alert("Give date first");
    }
    else{
    this.user.editStock({
      useItem_count: parseInt(data.used_count) + stockData.useItem_count
    }, stockData._id).subscribe((res) => {
      this.saveStockTransection({
        rawMeterial_id: stockData._id,
        date: data['date'],
        useItem_count: parseInt(data['used_count']),
        totalItem_count:stockData.totalItem_count,
        itemName: stockData.name,
        quantityType: stockData.quantity
      });
    
// debugger
    });
    }
   
  }
  saveStockTransection(data) {
    this.user.saveStockTransection(data).subscribe((data) => {
      this.getStockManagement();
      alert('success');
    });
  }
 


  //updateTotalItem

  async updatetotalItemCount(stockData) {
   
    let self = this;
    
    const alert = await this.alertController.create({
      
      cssClass: 'my-custom-class',
      header: 'Update Total Item',
      inputs: [
        { 
         
          name: 'totalItem_count',
          type: 'number',
          placeholder: 'Enter Value(Total-Items)'
        },
        // multiline input.
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', data);
            self.updateTotalCount(data,stockData)
            // debugger     

          }
        }
      ]
    });
    await alert.present();
  }
  updateTotalCount(data, stockData) {
    this.user.editStock({
      totalItem_count: parseInt(data.totalItem_count) + stockData.totalItem_count
    }, stockData._id).subscribe((res) => {
      console.log("TotalItem Update succesfully",res);
      
      });

    }
}
